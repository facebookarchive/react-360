---
id: from-react-vr
title: Migrating from React VR
sidebar_label: Legacy React VR Apps
---

If you've built an application under React VR, you can port it to the new React 360 runtime to get some of the performance benefits. The first thing to do is go through your code and replace all references to the `react-vr` package with the new `react-360` package. For now, the package still exports all of the legacy components, though this may change in the future.

## Mounting a Legacy App in the New Runtime

You will need to update to use the new runtime. It is recommended that you create a new React 360 project with the CLI, and then copy over your React code into the generated `index.js`. Since all React VR code is built in a 3D coordinate system oriented around (0, 0, 0), you should mount your legacy app to the system's default 3D location.

```js
r360.renderToLocation(
  r360.createRoot('MyLegacyApp'),
  r360.getDefaultLocation(),
);
```

This will give you the benefit of the improved rendering path and configurable input schemes. Once you have this working, We recommend taking things further, and migrating your application's UI to use Surfaces.

## Moving to Surfaces

If you used to lay out your UI using Views and Text in space, with everything measured in meters, you will find Surfaces easier to work with. They allow you to think in pixels, and simplify the process of laying out content around the user. For example, Surfaces and their content are always oriented towards the user, so you no longer need to think about rotations in space.

Surfaces are currently implemented at a fixed distance of four meters, with an initial pixel density intended to optimize for clarity. Density can be tweaked, but we recommend using the default for most situations.

### Common Patterns

With earlier versions of React VR, it was common for developers to build the concept of interconnected rooms by placing links or doorways at specific positions around a 360 photo. You can still achieve this same effect by extending a Cylinder Surface to wrap around the scene, and place the links using `absolute` positioning.
