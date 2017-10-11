# 3dof / 6dof Controller Raycaster for React VR

This package allows you to connect external controllers to your React VR
application. Controllers that track position (like Oculus Touch) or orientation
(like the Gear VR Controller) are both supported, and will give your users more
precise control when viewing your scene in VR.

## Adding to your application

To use the raycaster in your project, install it by adding the npm package to
your app:

```
yarn add react-vr-controller-raycaster

# OR

npm install --save react-vr-controller-raycaster
```

One the package has been installed, you need to use it at initialization time,
in the code found at `vr/client.js`.

React VR raycasters act as a cascade: the app walks through the list until it
encounters a raycaster that returns a value. This package is designed with this
in mind; it only activates when a controller is connected. That way, it can be
used alongside other raycasters like the default Mouse / Touchscreen input used
by new React VR applications. This cascade is implemented as an array of
different raycasters, passed to a `raycasters` key in the initializer:

```
import * as OVRUI from 'ovrui';
import ControllerRayCaster from 'react-vr-controller-raycaster';

function init(bundle, parent, options) {
  const scene = new THREE.Scene(); // Create a Scene object, more on this below

  const vr = new VRInstance(bundle, 'StarterProject', parent, {
    // specify your list of raycasters
    raycasters: [
      new ControllerRayCaster({scene, color: '#ff0000'}),
      new OVRUI.MouseRayCaster(),
    ],

    scene: scene,
    cursorVisibility: 'visible',
    ...options,
  });

  // ....
```

The constructor for `ControllerRayCaster` takes an object with a number of
initialization options: `hand`, `scene`, and `color` are currently supported,
and are described in detail below.

## `scene` option

In order to render the controller visualization, it needs access to the Three.js
`Scene` used by your React VR application. The best way to do this is to
construct a single scene and pass it to both the raycaster and your React VR
application, as demonstrated in the example code above.

## `hand` option

By default, the raycaster will attach to the first gamepad that has any
position or orientation tracking. However, some systems like Oculus Touch come
in pairs, and you may want to explicitly attach to a specific controller. If
you pass a `hand` option to the constructor, the raycasters will ONLY attach
to gamepads that expose a `hand` equal to the one you specified. Currently the
only supported values are `"left"` and `"right"`.

## `color` option

The beam cast by the controller is white by default. You can color it by passing
a string containing a hex color to the constructor. In the example above, the
beam will be colored bright red because the value has been set to `"#ff0000"`.

Additionally, you can dynamically change the color of the beam by calling
`.setColor(color)` on your ControllerRayCaster instance. This can be combined
with other events to create interesting effects.
