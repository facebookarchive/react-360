# WebGL UI

`webgl-ui` is a low-level set of primitives and utilities that can be used to build 2D interfaces in WebGL contexts.
They can be drawn directly to canvas, or drawn to texture to create a surface that can be positioned in a larger, 3D WebGL environment.

The primitives found in `webgl-ui` support a wide set of CSS-like styling, and can be arranged using the Flexbox layout system.

The library provides the functionality to construct and compose components, and provides many hooks for richer behavior, but leaves you to actually implement those in your own application. Many functions are meant to be run on a frame loop – there is an example boilerplate application provided in the `examples` directory.

## Primitives

`webgl-ui` gives you three core primitives to use when creating your interfaces. From these, you can compose larger and richer elements for your application.

### View

```js
import {View} from 'webgl-ui';

const view = new View();
```

View draws a rectangle. It supports all Flexbox layout properties, and its appearance can be configured by setting the background color, border size and color, and corner radii.

### Text

```js
import {Text, RawText, SDFTextImplementation} from 'webgl-ui';

const impl = new SDFTextImplementation();
const text = new Text(impl);
const labelText = new RawText();
const countText = new RawText();
labelText.setText('Count: ');
countText.setText('5');
text.addChild(0, labelText);
text.addChild(1, countText);
```

Text is used for rendering strings to the surface. Any time a Text instance is constructed, it must have a TextImplementation passed to its constructor. The TextImplementation determines how to render a string. Out of the box, we provide a default SDF Text Implementation that supports basic Latin-style characters. We also provide a class for constructing bitmap font implementations.

When adding content to a Text instance, you don't directly set a string value. Instead, you add one or more RawText nodes as children. This allows you to update variable substrings without having to re-compose the entire text string.

### Image

```js
import {Image, TextureManager, setStyle} from 'webgl-ui';

const manager = new TextureManager();
const image = new Image(manager);
image.setSource({uri: 'http://example.net/image_3.jpg'});
setStyle(image, {
  width: 350,
  height: 200,
});
```

Image is very similar to View, with the added ability to display a texture across the rectangle. Any time an Image instance is constructed, it must have a TextureManager passed to its constructor. The TextureManager coordinates loading textures, so that two images can reference the same source without needing to load the image twice.

An image needs its size to be set – it will not take the size of its source like an `img` tag in HTML does, because that may take some time to load, and will trigger a reflow of content when the image finishes loading.

Image supports a number of resize modes that determine how the raw image source is displayed within the rectangular bounds of the Image element: `'cover'`, `'contain'`, `'center'`, and `'stretch'` (the default).

TextureManager also allows you to register custom protocols that can run custom logic whenever an image is requested. By default, each TextureManager instance starts with a custom `texture://` protocol registered that lets you point an Image at any local Image or Canvas element:

```js
import {Image, TextureManager} from 'webgl-ui';

const myCanvas = document.getElementById('myCanvas');

const manager = new TextureManager();
// Register the canvas element with a unique identifier
manager.registerLocalTextureSource('myTex', myCanvas);

const image = new Image();
// Draw the canvas to the image:
image.setSource({uri: 'texture://myTex'});
```

### Applying Styles

Each primitive has its own style properties that determine its appearance.
These are very similar to CSS properties, and often share names with their
CSS counterparts. Flexbox layout, borders, corner radii, font size, image resize mode, and other such properties are controlled through style attributes.

To set the style 'foo' on a view, you would call `view.__setStyle__foo(newValue)`.

> The `__setStyle_X` format may look odd, but it's designed to be
> unique and avoid conflict with

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

## Layout

Layout is managed with a JS build of Facebook's Yoga library, which implements the Flexbox layout algorithm. Components may depend on their parent or their children in order to determine their size, so the entire tree needs to be laid out whenever some part of it changes. To recompute the layout and geometry of any tree, call `.updateLayoutAndGeometry()` on the root node. This runs the Flexbox algorithm and determines the size of each component. Since Yoga avoids recomputing work, you can reliably run this method every frame to ensure your components are always up-to-date.

```js
import {View} from 'webgl-ui';

const rootView = new View();

// run each frame
function frame() {
  // Update the geometry of any view that was resized
  rootView.updateLayoutAndGeometry();

  // render to surface...
}
```

## Rendering Order

`webgl-ui` supports CSS-style z indexing, and implements Stacking Contexts similar to those outlined in the browser spec. This means that rendering order needs to be computed on a tree basis, and should be done whenever a child has been added or moved, or a node has had its z-index changed.

> Restacking views is relatively cheap. You may not even need to check
> if the tree is dirty, but it is recommended.

```js
import {restack, View} from 'webgl-ui';

const rootView = new View();

let orderIsDirty = true;

// run each frame
function frame() {
  // ...
  if (orderIsDirty) {
    restack(rootView);
    orderIsDirty = false;
  }

  // render to surface...
}
```

## Hit Detection

Given a set of coordinates, you can check whether it intersects with a given view. Combined with a raycaster, this can provide hit detection and allow you to update components when the cursor intersects with them.

```js
if (myView.containsPoint(x, y)) {
  // do something
}
```

This is the rawest functionality, but a complex hit tracker can be instrumented with only a few lines of code.
