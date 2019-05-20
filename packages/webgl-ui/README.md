# WebGL UI

`webgl-ui` is a low-level set of primitives and utilities that can be used to build 2D interfaces in WebGL contexts.
They can be drawn directly to canvas, or drawn to texture to create a surface that can be positioned in a larger, 3D WebGL environment.

The primitives found in `webgl-ui` support a wide set of CSS-like styling, and can be arranged using the Flexbox layout system.

The library provides the functionality to construct and compose components, and provides many hooks for richer behavior, but leaves you to actually implement those in your own application. Many functions are meant to be run on a frame loop – there is an example boilerplate application provided in the `examples` directory.

## Constructing layout in a Surface

Most interfaces begin on a `Surface`, a frame or document which organizes a tree of UI elements. It is responsible for adjusting Flexbox layout, recomputing geometries, adjusting the rendering order of elements, and handling events.

To properly render the contents of a `Surface`, you'll also need to set the viewport size. The viewport is a window into the scene, and determines the size of UI elements when rendered to a canvas or texture. For example, if you wanted to fill a texture that was 400px x 600px, you would call `.setViewport(400, 600)`.

```js
import {Surface} from 'webgl-ui';

const canvas = document.getElementById('canvas');
const gl = canvas.getContext('webgl');
const surface = new Surface(gl);
surface.setViewport(400, 600);
```

Once a `Surface` has been constructed, you can begin adding UI elements to it. The types of elements you can create are covered below. To add a tree of elements to your `Surface`, set the root of the tree as the `Surface`'s root. Each `Surface` can only have a single root node.

```js
const root = surface.createView();
surface.setRootNode(root);
```

The `Surface` needs to updated and drawn continuously, typically on a frame loop.

```js
function frame() {
  // Recompute any dirty Flexbox layout
  // If any nodes have changed size, they will rebuild
  // their geometries to reflect the new layout
  surface.updateGeometry();
  // Check if the surface is dirty before re-rendering
  // This is useful to avoid overdrawing
  if (surface.isDirty()) {
    // Convenience method to clear the color buffer
    surface.clear();
    // Draw the UI to the current GL context
    surface.draw();
  }
}
requestAnimationFrame(frame);
```

## Creating UI elements

`webgl-ui` gives you three core primitives to use when creating your interfaces. From these, you can compose larger and richer elements for your application.

### View

```js
const view = surface.createView();
```

View draws a rectangle. It supports all Flexbox layout properties, and its appearance can be configured by setting the background color, border size and color, and corner radii.

### Text

Text is used for rendering strings to the surface. Before text can be constructed, a TextImplementation must have been set on the parent Surface. The TextImplementation determines how to render a string. Out of the box, we provide a default SDF Text Implementation that supports basic Latin characters. We also provide a class for constructing bitmap font implementations, and you can create your own implementations by following the interface.

```js
import {Surface, SDFTextImplementation} from 'webgl-ui';

const surface = new Surface(gl);
surface.useTextImplementation(new SDFTextImplementation(gl));
const text = surface.createText();
const labelText = surface.createTextNode('Count: ');
const countText = surface.createTextNode('5');
text.appendChild(labelText);
text.appendChild(countText);
```

When adding content to a Text element, you don't directly set a string value. Instead, you add one or more RawText nodes as children, typically created by calling `createTextNode`. This allows you to update variable substrings without having to re-compose the entire text string.

### Image

Image is very similar to View, with the added ability to display a texture across the rectangle. Before an Image instance is constructed, a `TextureManager` must have been set on the parent surface. The TextureManager coordinates loading textures, so that two images can reference the same source without needing to load the image twice.

```js
import {Surface, TextureManager, setStyle} from 'webgl-ui';

const surface = new Surface(gl);
surface.useTextureManager(new TextureManager(gl));
const image = surface.createImage();
image.setSource({uri: 'http://example.net/image_3.jpg'});
setStyle(image, {
  width: 350,
  height: 200,
});
```

An image needs its size to be set – it will not automatically take the size of its source like an `img` tag in HTML does, because that may take some time to load, and will trigger a reflow of content when the image finishes loading.

Image supports a number of resize modes that determine how the raw image source is displayed within the rectangular bounds of the Image element: `'cover'`, `'contain'`, `'center'`, and `'stretch'` (the default).

TextureManager also allows you to register custom protocols that can run custom logic whenever an image is requested. By default, each TextureManager instance starts with a custom `texture://` protocol registered that lets you point an Image at any local Image or Canvas element:

```js
import {TextureManager} from 'webgl-ui';

const myCanvas = document.getElementById('myCanvas');

const manager = new TextureManager();
// Register the canvas element with a unique identifier
manager.registerLocalTextureSource('myTex', myCanvas);

const image = surface.createImage();
// Draw the canvas to the image:
image.setSource({uri: 'texture://myTex'});
```

### Applying Styles

Each primitive has its own style properties that determine its appearance.
These are very similar to CSS properties, and often share names with their
CSS counterparts. Flexbox layout, borders, corner radii, font size, image resize mode, and other such properties are controlled through style attributes.

To set the style 'foo' on a view, you would call `view.__setStyle__foo(newValue)`.

> The `__setStyle_X` format may look odd, but it's designed to be
> unique and avoid conflict with any other member method names

We provide a utility function for setting a bunch of styles at once:

```js
import {setStyle, View} from 'webgl-ui';

const view = new View();
setStyle(view, {
  margin: 10,
  width: 200,
  height: 100,
  justifyContent: 'space-between',
  alignItems: 'center',
});
```

## Event Handling

Surface is capable of collecting various events and passing them to individual UI elements. In order to figure out where to send events, Surface needs to track the user's cursor. This can be derived from a mouse, a touchscreen, a ray cast into a 3D scene, or any other source that provides a `(x, y)` position. When the Surface is updated, it recomputes which nodes are hit by the current cursor. This current set of hits is used to send events to individual views.

Sometimes a cursor may leave a surface. To clear the cursor so that the hit set is emptied, you can call `clearCursor`.

```js
canvas.addEventListener('mousemove', e => {
  surface.setCursor(e.offsetX, e.offsetY);
});

canvas.addEventListener('mouseexit', () => {
  surface.clearCursor();
});
```

To send an event to any views that are currently in the hit set, you can call `dispatchEvent` on the Surface. Any views in the set that have matching event handlers will have their callbacks called. An optional payload can also be sent to the event callbacks.

```js
canvas.addEventListener('click', e => {
  surface.dispatchEvent(
    'click', // event name
    {x: e.offsetX, y: e.ofsetY} // optional payload
  );
});
```

Event callbacks are attached to elements with `addEventListener(event, callback)`. Inversely, calling `removeEventListener(event, callback)` will remove the callback. You can also remove all callbacks associated with an event name by calling `clearEventListeners()`.

```js
let count = 0;
text.addEventListener('click', () => {
  count++;
  countText.setText(String(count));
});
```

For the most part, events are meaningless. Dispatching an even with a specific name will trigger all callbacks associated with that name in the current hit set. There are two exceptions: `'enter'` and `'exit'`. These special events are not meant to be dispatched externally. Instead, they occur when a view enters or exits the hit set. When a view enters the hit set, any `enter` callbacks will be triggered; when it exits the hit set, any `exit` callbacks will be triggered. This is useful for changing appearance on hover.

```js
// Highlight border on hover
view.addEventListener('enter', () => {
  setStyle(view, {borderColor: 'rgba(255, 255, 255, 1)'});
});
view.addEventListener('exit', () => {
  setStyle(view, {borderColor: 'rgba(255, 255, 255, 0.5)'});
});
```

## Drawing to Texture

When `draw()` is called on a Surface, it runs its shaders with the current GL Context settings. To draw to a GL Texture that has been bound to a framebuffer, you only need to set up the framebuffer before calling `draw()`, and tear it down when you're done.

```js
gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
surface.draw();
gl.bindFramebuffer(gl.FRAMEBUFFER, null);
```
