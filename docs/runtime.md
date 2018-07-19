---
id: runtime
title: Runtime
sidebar_label: Runtime
---

## What is the Runtime?

Each React 360 application is made up of two pieces: your React application, and the code that turns your React components into 3D elements on the screen. We refer to this second piece as the “runtime.” This division of roles is borrowed directly from React Native, and is employed for very similar reasons.

We separate your app code from the rendering code for one key purpose: web browsers are single-threaded, and any blocking behavior in the app could cause rendering to stall. This is especially problematic for users viewing your 360 experience on a VR headset, where significant rendering latency can break the sense of immersion. By running your app code in a separate context, we allow the rendering loop to consistently update at a high frame rate.

When your React code creates new elements, it instructs the runtime to add them to the 3D scene. When the user provides input, it is passed back to React as an event. The two pieces cooperate to create one cohesive system. If you want to pass other data between the systems, you can rely on [Native Modules](/react-360/docs/native-modules.html).

## Executors

Executors are pieces of the runtime that run your React application in a separate process from the main browser window. React 360 ships with two different executors, but chances are good that you don't need to worry about configuring this.

### Web Worker Executor

Web Workers are a modern browser feature that allows code to run outside of the main window context. This is ideal for high-cost operations, or in our case, running code without interrupting the requestAnimationFrame loop. By default, React 360 uses a Web Worker to execute your React code. That means that any code found in your `index.js` runs inside a Web Worker environment, not the standard browser window. Because of this, you may find that certain APIs like `window.location` are inaccessible – this can be easily resolved with Native Modules. In fact, many common APIs like Location and History have already been provided for you.

### Iframe Executor

There may be times when your environment does not support Web Workers. While this is unlikely, we provide a workaround that simulates a separate execution environment via an `<iframe>`. To use this instead of a Web Worker, initialize a `ReactExecutorIframe` and supply it at initialization time.

```
import {ReactExecutorIframe} from 'react-360-web';

const r360 = new ReactInstance(bundle, parent, {
  executor: new ReactExecutorIframe(),
  ...options,
});

```

