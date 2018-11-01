# React WebGL

`react-webgl` is an **experimental**, synchronous React-to-WebGL renderer that
works directly with the React Reconciler to draw 2D interface components to a
WebGL context. From there, you can composite the constructed interface directly
to a browser Canvas, or to a texture in a larger 3D scene.

React WebGL is built on top of `webgl-ui`, a set of primitives that provide
flexible configuration and layout of 2D interfaces in WebGL. It contains its
own shaders and transformation logic. At the moment, `webgl-ui` (and by
extension `react-webgl`) relies on Three.js for rendering, but it is actively
being shifted away from this dependency because it uses so little of Three's
internals.

## Core Components

React WebGL comes with three core primitives. While this may not seem like much,
it's enough to create a wide range of interfaces and applications. They are
nearly identical to the React Primitives first established by React Native:
`View`, `Text`, and `Image`.

### View / Quad

View (or Quad) is a style-able rectangle that can be used for both layout and
rendering of boxes and borders. It supports Flexbox layout, and most CSS styling
properties, passed directly as props.

At the moment, colors are only supported as 0xARGB numbers. We will support
strings in the future.

```js
import {View} from 'react-webgl-experimental';

const RedSquare = () => (
  <View width={100} height={100} backgroundColor={0xffff0000} />
);
```

### Text

Text renders strings using the current Text Implementation (see `webgl-ui` for
more information about these).

```js
import {Text} from 'react-webgl-experimental';

const LargeWhiteCenteredText = ({label}) => (
  <Text
    fontSize={40}
    color={0xffffffff}
    textAlign={'center'}>
    {label}
  </Text>
);
```

### Image

Image components can render a texture, including support for image resize modes
and all the spacing / border styles of View. Despite its name, Image isn't only
limited to static images, though. Using your root's Texture Manager (see
`webgl-ui` for more information about this), you can draw the contents of
videos or other canvases to the image. You can even project a 3D scene onto an
image this way.

For example, you can use `<Image>` tags to play videos using the
`react-webgl-video-manager` package.

```js
import {Image} from 'react-webgl-experimental';

const RoundProfilePicture = ({imagePath}) => (
  <Image
    backgroundColor={0xff000000}
    borderColor={0xffffffff}
    borderWidth={2}
    borderRadius={40}
    height={80}
    width={80}
    resizeMode={'cover'}
    source={{uri: imagePath}}
  />
);
```

## Rendering to Canvas (2D)

You can build 2D interfaces that are rendered inline with other DOM components.

```js
import * as ReactWGL from 'react-webgl-experimental';

const root = new ReactWGL.CanvasRoot({
  width: 300,
  height: 300,
});

const CanvasDemo = () => (
  <ReactWGL.View
    width={300}
    height={300}
    backgroundColor={0xff000000}
    justifyContent={'space-between'}>
    <ReactWGL.View
      width={60}
      height={60}
      backgroundColor={0xff0000ff}
    />
    <ReactWGL.View
      width={60}
      height={60}
      backgroundColor={0xff0000ff}
    />
    <ReactWGL.View
      width={60}
      height={60}
      backgroundColor={0xff0000ff}
    />
  </ReactWGL.View>
);

ReactWGL.render(<CanvasDemo />, root);
document.body.appendChild(root.getRenderer().domElement);

// per-frame updates
function frame() {
  root.update();
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
```

## Rendering to a WebGL Texture

If you have a larger 2D or 3D WebGL scene, you can render your React components
to a render target that can be used as a texture in your scene. This is handy
for interfaces that exist in 3D and VR.

```js
import * as ReactWGL from 'react-webgl-experimental';

const root = new ReactWGL.RenderTargetRoot();

const RenderTargetDemo = () => (
  <ReactWGL.View
    width={300}
    height={300}
    backgroundColor={0xff000000}
    justifyContent={'space-between'}>
    <ReactWGL.View
      width={60}
      height={60}
      backgroundColor={0xff0000ff}
    />
    <ReactWGL.View
      width={60}
      height={60}
      backgroundColor={0xff0000ff}
    />
    <ReactWGL.View
      width={60}
      height={60}
      backgroundColor={0xff0000ff}
    />
  </ReactWGL.View>
);

ReactWGL.render(<RenderTargetDemo />, root);

const renderer = new THREE.WebGLRenderer();
const surfaceCamera = new THREE.OrthographicCamera(0, 300, 0, 300, -1000, 1000);
// per-frame updates
function frame() {
  root.update();

  // render the React root to a render target, assuming it's used as a material
  // in your scene
  renderer.render(
    root.getScene(),
    surfaceCamera,
    renderTarget,
    true
  );
  // render your 3D scene
  renderer.render(yourScene, yourCamera);

  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
```
