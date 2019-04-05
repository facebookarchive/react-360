---
id: objects
title: 3D Objects
sidebar_label: 3D Objects
---

React 360 applications are not restricted to 2D panels in space – you can also bring in 3D elements. Pre-built objects that have been created in 3D modeling or sculpting software can be brought into your application. React 360 intentionally does not contain primitive elements like boxes and spheres – instead, it is designed to import prepared objects. You can build larger scenes from these elements.

## Entity

To bring 3D objects into your scene, you can use the `<Entity>` component. Entity allows you to bring in 3D models, and transform and scale them. Entity has a `source` attribute which takes an object that points to a GLTF2 or OBJ model.

```js
// to reference a GLTF2 model
<Entity source={{gltf2: asset('myModel.gltf')}} />

// to reference an untextured OBJ model
<Entity source={{obj: asset('myModel.obj')}} />

// to reference an OBJ with matching MTL file
<Entity source={{obj: asset('myModel.obj'), mtl: asset('myModel.mtl')}} />
```

You can set the position of an Entity relative to its parent with the `transform` style attribute, as described [here](/react-360/docs/layout.html).

## Locations

### Mounting 3D Objects

3D objects can't be added to Surfaces; those are restricted to 2D content. To mount a 3D React tree to your scene, you need to mount to a `Location` instead. Locations represent origins in physical space, from which your 3D scenes can extend. Mounting to a Location in your `client.js` code is very similar to mounting to a Surface.

```js
r360.renderToLocation(
  r360.createRoot('React3DView'),
  r360.getDefaultLocation(),
);
```

Your elements will be laid out relative to this location, and use a meter-based measurment system. The default location is at (0, 0, 0), which is the default location of the camera. Laying out content around this position allows you to lay out elements around the user, but you can also positions objects relative to other origins.

### Creating Locations

You can create your own Location for mounting 3D scenes with the `Location` constructor. It takes a single argument, a three-element array describing the position of the origin in 3D space.

```js
import {Location} from 'react-360-web';

// Create a location two meters in front of the user, and one meter down
const location = new Location([0, -1, -2]);

// Render to this location
r360.renderToLocation(
  r360.createRoot('My3DView'),
  location,
);
```

The scene mounted to a location can also be given an initial rotation as a second argument. It is an array representing the rotation, in radians, around the x, y, and z axes.

```js
// Create a location two meters out,
// which is rotated 90 degrees around the y-axis
new Location([0, 0, -2], [0, Math.PI / 2, 0]);
```

### Moving Locations

Locations are intended to be movable. This allows you to creat effects like scenes whose origin moves in a pre-defined pattern, or follows a constantly-updated value like the position of a VR controller. This can be done with the `setWorldPosition(x, y, z)` and `setWorldRotation(x, y, z)` methods, which update the parameters provided at construction time. Using these, you can change the position of your 3D scene efficiently, without making a pass through your React code.
