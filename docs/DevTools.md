---
id: dev-tools
title: Dev Tools
layout: docs
category: The Basics
permalink: docs/dev-tools.html
---

## Hot Reloading

Iteration is a key factor in any developer experience. VR is no exception and we would argue it is even more important here. While React VR facilitates reloading the whole page and scene, this has the side effect of resetting the state of the running application, which can cause issues as the size of the application increases. For this reason, React VR supports *hot reloading* of individual JavaScript modules. This goes a long way towards keeping the iteration experience incremental and rapid.

Hot reloading is built into React VR, enabled by a startup flag (`enableHotReload`) when creating a VRInstance. For example:

```
  const vr = new VRInstance(bundle, 'CubeSample', parent, {
    scene: scene,
    nativeModules: [ cubeModule ],
    enableHotReload: true,
  });
```

You can also use `hotreload` as a query parameter to enable hot reloading should the application not set a preference.

```
http://localhost:8081/vr/?hotreload
```


Hot reloading makes use of the React Native Packager to watch the local file system and notify the runtime regarding file changes. File changes trigger a reload of that module by the React VR runtime systems. For more information about using hot reloading and some nuances of the system, see [Introducing Hot Reloading](https://facebook.github.io/react-native/blog/2016/03/24/introducing-hot-reloading.html) in the React Native Blog.

## React Dev Tools Inspector

In the React Dev tools for Nuclide is the Element Inspector that allows developers to view and alter properties of components within a running application. To use the Inspector you must install [Nuclide](https://nuclide.io/)

To make use of the Inspector, the bundle must be enabled with `dev=true`. This is the default setting for applications created by the react-vr CLI but you can confirm it by searching for the ReactVR.init function and looking for the `dev=true` query parameter.

```
      ReactVR.init(
        // When you're ready to deploy your app, update this line to point to
        // your compiled index.bundle.js
        '../index.vr.bundle?platform=vr&dev=true',
        // Attach it to the body tag
        document.body
      );
```

Once confirmed, you should follow the instructions for [loading a React Native Project](https://nuclide.io/docs/platforms/react-native/#loading-a-react-native-project). This will allow you to [start the React Native Packager](https://nuclide.io/docs/platforms/react-native/#running-applications__react-native-packager) from within Nuclide.

Now the application, Nuclide and the React Native Packager are configured you should browse to the location of your React VR project index.html with the query param `devtools` for example:

```
http://localhost:8081/vr/?devtools
```

Now selecting the `React Inspector` tab should present a window similar to
![](img/inspector.jpg)

Note: Because React VR makes extensive use of data types (such as Transforms) that are not in common use within React and React Native, certain properties are not displayed in their optimal form.
