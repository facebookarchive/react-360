---
id: surfaces
title: Surfaces
sidebar_label: Surfaces
---

Surfaces allow you to add 2D interfaces in 3D space, letting you work in pixels instead of physical dimensions. They are optimized for legibility, and rely on the same principles that Oculus uses for its user interfaces. Surfaces are defined in terms of the height and width of their pixel content, as well as the density of those pixels in physical space. React 360 takes all of this information and produces a 3D object with the appropriate dimensions. Currently there are two different shapes of Surfaces: Cylinder and Flat.

## Cylinder Surface

A Cylinder Surface takes your 2D content and projects it onto the inside of a cylinder with a 4 meter radius. A cylinder is great for displaying 2D content, because no matter which way you turn, you are always looking at the content straight-on.

```
// To construct a new Cylinder Surface in your app runtime:
import {Surface} from 'react-360-web';
const myCylinderSurface = new Surface(
  1000, /* width */
  600, /* height */
  Surface.SurfaceShape.Cylinder /* shape */
);
```

Depending on the size of your content, it likely won't wrap around the full interior of the cylinder – instead it'll cover only part, centered in front of the user. As you increase the width of the Surface, the content will cover more and more of the cylinder. The angle covered is a function of the Surface's width and density. To be specific, density is measured in pixels per 360 degrees: a Cylinder Surface with width equal to half of the density will cover half of the cylinder. The default density is 4680, a value that looks good on a variety of display. This means that a Surface with a width of 1170 pixels (4680 divided by 4) will cover exactly a 90-degree arc in front of the user. **One thing to note:** due to limitations of WebGL, the data for a Surface's content can only be at most 4096 pixels! If you really need to cover the entirety of a cylinder with your surface, reduce its density to 4096.

We recommend that you use a maximum Cylinder height of 720 – anything beyond that will be difficult for your user to see.

## Flat Surface

A Flat Surface places your 2D interface on a flat plane in space, like a virtual screen. Though a Cylinder Surface is always positioned in front of the user, a Flat Surface can be moved around in space – this is useful for scenarios where you want to have multiple panels arranged around the user, like a multi-monitor setup in virtual space.

```
// To construct a new Flat Surface in your app runtime:
import {Surface} from 'react-360-web';
const myFlatSurface = new Surface(
  300, /* width */
  600, /* height */
  Surface.SurfaceShape.Flat /* shape */
);
```

Flat Surfaces are positioned on the outside of an imaginary sphere, 4 meters in radius – this puts them at the same distance as the Cylinder Surface. The location of the Surface on that sphere can be controlled through three angles:
 - `yaw` - Rotate the surface location left and right
 - `pitch` - Rotate the surface location up and down
 - `roll` - Rotate the surface itself
The `roll` angle is optional, only use it if you have specific requirement such as making a billboard surface.

```
// To rotate a panel 90 degrees to your left:
leftPanel.setAngle(
  -Math.PI / 2, /* yaw angle */
  0 /* pitch angle */
);

// To rotate a panel 30 degrees below the horizon:
lowPanel.setAngle(
  0, /* yaw angle */
  -Math.PI / 6 /* pitch angle */
);

// To place a panel 45 degrees to the right, 45 degrees above the horizon:
highPanel.setAngle(
  Math.PI / 4, /* yaw angle */
  Math.PI / 4 /* pitch angle */
);

// Optionaly, you can also provide a roll angle
rotatedPanel.setAngle(
  Math.PI / 4, /* yaw angle */
  Math.PI / 4, /* pitch angle */
  Math.PI / 4 /* roll angle */
);
```

You can also use pass in a Quaternion of camera to re-center the surface on the user's viewport. The option for recenter is
 - `yaw` - only match the yaw angle of camera
 - `yaw-pitch` - match both yaw and pitch angle of camera
 - `all` - match all angles of the camera

```
const cameraQuat = r360.getCameraQuaternion();
subtitleSurface.recenter(cameraQuat, 'all');
```

## Rendering to a Surface

Surfaces are used to render the 2D interfaces of your app into 3D space. To attach a React component to a Surface, it must be registered with the AppRegistry. If you look at the bottom of your `index.js` file, you'll find a line that looks like the following:

```
AppRegistry.registerComponent('MyAppName', () => MyAppName);
```

This tells the runtime that your component can be identified by this string ID. The corresponding code that attaches your React component to an application surface is found in `client.js`.

```
r360.renderToSurface(
  r360.createRoot('MyAppName'),
  r360.getDefaultSurface(),
  'default' /* optional, a name to reference the surface */
);
```

By optionally specifying a surface name, you can reference the surface in Environment to attach [screen](environment.md#setscreenscreenid-string-handle-string-surfaceid-string-x-number-y-number-width-number-height-number) in Environment.

This instructs the runtime to attach the component we referenced above to the application's default surface. This default surface is just a Surface instance that's already created for you – you can mutate it the same way as the Surfaces described above. You can also create your own surface and render a React component to it, as long as that React component has been added to the `AppRegistry`.

## Modifying a Surface

You can change the properties of a Surface that has already been created, allowing you to dynamically reshape and resize it. To change the shape, call `setShape(newShape)` on your existing surface – it uses the same `SurfaceShape` constants used at creation time. To change the height and width of the surface, you can call `resize(newWidth, newHeight)`. The most common use of this is to modify the default surface at initialization time.

```js
// Modify the default surface to be a 200 x 200 Flat surface
const s = r360.getDefaultSurface();
s.setShape(Surface.SurfaceShape.Flat);
s.resize(200, 200);
```

## Using Multiple Surfaces

There are times when you'll want to add multiple surfaces to your app, such as having a series of flat panels arranged around the user. If you register multiple React components with the AppRegistry, you can attach each one to a different surface. You can also mount multiple copies of the same component to different surfaces – useful when the rendering logic is identical, but the initial properties passed to each surface are different.

```
// Mounting different components to different surfaces
r360.renderToSurface(
  r360.createRoot('ComponentOne'),
  firstSurface,
);
r360.renderToSurface(
  r360.createRoot('ComponentTwo'),
  secondSurface,
);

// Mounting the same component to different surfaces
r360.renderToSurface(
  r360.createRoot('SharedComponent', { /* initial props for first panel */ }),
  firstSurface,
);
r360.renderToSurface(
  r360.createRoot('SharedComponent', { /* initial props for second panel */ }),
  secondSurface,
);
```

In this setup, how do you share data between the different React components? They run in a shared JavaScript environment, so any global store (such as Redux) is shared between all components. You can use this technique to synchronize data between different 2D and 3D aspects of your app. A version of this is demonstrated in the [multi-surface example](/react-360/docs/example-multisurface.html).

## Detaching a surface

You can detach the rendering of a root view from a surface:

```
// When calling renderToSurface, it will return a tag for the root view
const root1 = r360.renderToSurface(
  r360.createRoot('Root1'),
  surface,
  "testSurface"
);

// You can detach the root view and hide surface when you don't need it any more
r360.detachRoot(root1);

// You can also render a new root view on same surface after detached.
const root2 = r360.renderToSurface(
  r360.createRoot('Root2'),
  surface,
  "testSurface",
);
```
