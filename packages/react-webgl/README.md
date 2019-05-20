# React WebGL

`react-webgl` is an **experimental**, synchronous React-to-WebGL renderer that
works directly with the React Reconciler to draw 2D interface components to a
WebGL context. From there, you can composite the constructed interface directly
to a browser Canvas, or to a texture in a larger 3D scene.

React WebGL is built on top of `webgl-ui`, a set of primitives that provide
flexible configuration and layout of 2D interfaces in WebGL. It contains its
own shaders and transformation logic, all drawn using a lightweight WebGL library.

React WebGL takes advantage of the reusable React architecture introduced in
React 16. With it, components can hook directly

## Core Components

React WebGL comes with three core primitives. While this may not seem like much,
it's enough to create a wide range of interfaces and applications. They are
nearly identical to the React Primitives first established by React Native:
`View`, `Text`, and `Image`.

### View

View is a style-able rectangle that can be used for both layout and rendering of
boxes and borders. It supports Flexbox layout, and most CSS styling properties,
passed directly as props.

```js
import {View} from 'react-webgl';

const RedSquare = () => (
  <View style={{width: 100, height: 100, backgroundColor: '#ff0000'}} />
);
```

### Text

Text renders strings using the current Text Implementation (see `webgl-ui` for
more information about these). You can configure color, font size, line height,
 and more.

```js
import {Text} from 'react-webgl';

const LargeWhiteCenteredText = ({label}) => (
  <Text style={{fontSize: 40, color: '#ffffff', textAlign: 'center'}}>
    {label}
  </Text>
);
```

### Image

Image components can render a texture, including support for image resize modes
and all the spacing / border styles of View. Despite its name, Image isn't only
limited to static images, though. Using your content root's Texture Manager (see
`webgl-ui` for more information about this), you can draw the contents of
videos or other canvases to the image. You can even project a 3D scene onto an
image this way.

For example, you can use `<Image>` tags to play videos using the
`react-webgl-video-manager` package.

```js
import {Image} from 'react-webgl';

const RoundProfilePicture = ({imagePath}) => (
  <Image style={{
    backgroundColor: '#000000',
    borderColor: '#ffffff',
    borderWidth: 2,
    borderRadius: 40,
    height: 80,
    width: 80,
    resizeMode: 'cover',
    source: {uri: imagePath},
  />
);
```

## Rendering to Canvas (2D)

You can build 2D interfaces that are rendered inline with other DOM components.

```js
import * as ReactWGL from 'react-webgl';

const CanvasDemo = () => (
  <ReactWGL.View
    style={{
      width: 300,
      height: 300,
      backgroundColor: '#000000',
      justifyContent: 'space-between',
    }}>
    <ReactWGL.View
      style={{
        width: 60,
        height: 60,
        backgroundColor: '#0000ff',
      }}
    />
    <ReactWGL.View
      style={{
        width: 60,
        height: 60,
        backgroundColor: '#0000ff',
      }}
    />
    <ReactWGL.View
      style={{
        width: 60,
        height: 60,
        backgroundColor: '#0000ff',
      }}
    />
  </ReactWGL.View>
);

// A root is a container for a React WebGL tree
const root = new ReactWGL.CanvasRoot({
  width: 300,
  height: 300,
});
ReactWGL.render(<CanvasDemo />, root);
document.body.appendChild(root.getCanvas());

// per-frame updates
function frame() {
  root.update();
  requestAnimationFrame(frame);
  // perform any other actions you want each frame
}
// start rendering the surface
requestAnimationFrame(frame);
```

## Rendering to a WebGL Texture

If you have a larger 2D or 3D WebGL scene, you can render your React components
to a render target that can be used as a texture in your scene. This is handy
for interfaces that exist in 3D and VR.

```js
import * as ReactWGL from 'react-webgl';

const RenderTargetDemo = () => (
  <ReactWGL.View
    style={{
      width: 300,
      height: 300,
      backgroundColor: '#000000',
      justifyContent: 'space-between',
    }}>
    <ReactWGL.View
      style={{
        width: 60,
        height: 60,
        backgroundColor: '#0000ff',
      }}
    />
    <ReactWGL.View
      style={{
        width: 60,
        height: 60,
        backgroundColor: '#0000ff',
      }}
    />
    <ReactWGL.View
      style={{
        width: 60,
        height: 60,
        backgroundColor: '#0000ff',
      }}
    />
  </ReactWGL.View>
);

const root = new ReactWGL.RenderTargetRoot();
ReactWGL.render(<RenderTargetDemo />, root);

// per-frame updates
function frame() {
  root.update();

  // Render the React root's FrameBuffer texture to your scene
  // depending on your 3D rendering setup.
  //
  // tex will be a raw WebGL Texture reference
  const tex = root.getFrameBuffer().getTexture().getGLTexture();
  // do something with tex

  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
```
