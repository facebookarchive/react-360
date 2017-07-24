---
id: native-modules
title: Native Modules and Views
layout: docs
category: Guides
permalink: docs/native-modules.html
next: TBD
previous: TBD
---

If React VR doesn't support a feature that you need, you can build it yourself.

Perhaps an app needs access to a platform API that React VR doesn't have a corresponding module for yet. Maybe you want to reuse some existing JavaScript code without having to re-implement it in the React context. Or, you want to write some high performance, multi-threaded code for image processing, a database, or other advanced extensions.

This is a more advanced feature and while we don't expect it to be part of the usual development process, it is essential you know that it exists.

## Cube Example
One example of using Native Modules is to support interaction between a React VR UI element and a custom Three.js object that you've added to your scene. For example, a geometric cube similar to the one in the [Three.js README](https://github.com/mrdoob/three.js).

### Setting up the Scene
The React VR framework can handle the camera and renderer setup for you, so you only need to focus on adding objects to your scene and animating them. First, we create the scene in the `init` function of `vr/client.js` (one of the files provided as part of the Starter Project) and provide it as an option to the `VRInstance` constructor.  We also create `CubeModule`, a Native Module described later in this section.
```
  const scene = new THREE.Scene();
  const cubeModule = new CubeModule();

  const vr = new VRInstance(bundle, 'CubeSample', parent, {
    cursorVisibility: 'visible',
    nativeModules: [ cubeModule ],
    scene: scene,
  });
```
Next, we create the cube mesh and add it to the scene.  We use the same Three.js operations as we normally would, with a couple modifications which are often necessary to make Three.js objects appear correctly in React VR.

* React VR uses units of 1 meter, so we use cube dimensions of 1 instead of 100.
* The VRInstance camera is at the origin, so we change the z position of the cube so it is visible.

```
  const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial()
  );
  cube.position.z = -4;
  scene.add(cube);
  cubeModule.init(cube);
```
Above, we also initialize the `cubeModule` with a handle to the cube.  Finally, add the per-frame update logic into the `vr.render` method.
```
  vr.render = function(timestamp) {
    const seconds = timestamp / 1000;
    cube.position.x = 0 + (1 * (Math.cos(seconds)));
    cube.position.y = 0.2 + (1 * Math.abs(Math.sin(seconds)));
  };
```
### Using the Native Module
Let's say we want the cube to change color based on UI interaction such as a button click.  Here is a Native Module that implements the `changeCubeColor` function, which is called asynchronously across the React Native bridge.  The `constructor` and `init` methods are called directly in `client.js` to setup the module, as shown above.
```
export default class CubeModule extends Module {
  constructor() {
    super('CubeModule');
  }
  init(cube) {
    this.cube = cube;
  }
  changeCubeColor(color) {
    this.cube.material.color = new THREE.Color(color);
  }
}
```
Now we can call the `changeCubeColor` method from `index.vr.js`, for example in an `onClick` handler.
```
import NativeModules from 'react-vr';
...
const CubeModule = NativeModules.CubeModule;
...
render() {
...
  <VrButton
    onClick={()=>CubeModule.changeCubeColor(hexColor)}>
  ...
  </VrButton>
..

```

See the `CubeSample` for the full code of this example.

### Creating Native Views

By implementing a native view, you can control how the properties specified in your React VR code interact with the runtime code. This can include visual representations and even sound.

To create a native view, you need to import the main module `react-vr-web`

```
import * as ReactVR from 'react-vr-web';
```

Then, create a class that extends the `RCTBaseView`. The constructor should create the `OVRUI.UIView` and register getters and setters on any properties.

The class also implements a static `describe` function the runtime uses to determine which properties to send from the React VR code to the runtime. These are the runtime implementation of the PropTypes.

```
class RCTTestLight extends ReactVR.RCTBaseView {
  constructor(guiSys: GuiSys) {
    super();
    const light = new THREE.AmbientLight();
    this.view = new OVRUI.UIView(guiSys);
    this.view.add(light);

    Object.defineProperty(
      this.props,
      'intensity',
      {
        set: value => {
          light.intensity = value;
        },
      }
    );

    this.props.intensity = 1;
  }

  static describe() {
    return merge(super.describe(), {
      // declare the native props sent from react to runtime
      NativeProps: {
        intensity: 'number',
      },
    });
  }
}
```

Finally, the custom views must be registered to the React VR context. This is handled by providing a list of available `customViews` when creating `ReactVR.VRInstance`

```
const vr = new ReactVR.VRInstance(bundlePath, appName, document.body, {
  customViews: [{name: 'TestLight', view: RCTTestLight}],
  ...options,
});
```


To make this `TestLight` component available to React VR code, it is necessary to register a component that makes use of `NativeMethodsMixin`. Set the `propTypes` to enable the propTypes to be handled by the React VR core. `viewConfig` is used to support the `Animated` modules. The `render` function should return a component created using the `requireNativeComponent` utility function.

```
const TestLight = React.createClass({
  mixins: [NativeMethodsMixin],

  propTypes: {
    ...View.propTypes,
    style: StyleSheetPropType(LayoutAndTransformPropTypes),
    intensity: PropTypes.number,
  },

  viewConfig: {
    uiViewClassName: 'AmbientLight',
    validAttributes: {
      ...ReactNativeViewAttributes.RCTView,
      intensity: true,
    },
  },

  getDefaultProps: function() {
    return {};
  },

  render: function() {
    return (
      <RKTestLight
        {...props}>
      </RKTestLight>
    );
  },
});

const RKTestLight = requireNativeComponent('TestLight', TestLight, {
  nativeOnly: {},
});

module.exports = TestLight;
```
