# Basic DOM Overlay sample

The code here contains a very trivial sample showing the usage of DOM Overlay. While simple, it requires a bit of boilerplate code that is spread among numerous files, so below are the steps to set this up on your app.

The description below will cover some of the basics, but you can also dive straight into the code and keep an eye out for all the comments starting with *`// ...`* explaining what is being done and why.

### Dependencies:

Ensure you add `react-dom` to your `package.json` dependencies. It is important that the version of `react-dom` you use matches the version of `react` that is already defined in your project. Note that it needs to match `react`, **not** `react-vr`.

### Defining the DOM Overlay Native Module:

In order to render to the DOM, you will need a Native Module bridging that functionality to React VR.

For details about Native Modules, check the following links:

* [Native Modules Docs](https://facebook.github.io/react-vr/docs/native-modules.html)
* [Native Modules Sample](https://github.com/facebook/react-vr/tree/master/Examples/NativeModules)

### Setting up the module in React VR:

Check the `client.js` file for the following steps:

1. Importing and creating the module instance.
2. Registering the module via `nativeModules: [...]` when creating VRInstance.
3. Creating the DOM element where the overlay will be rendered (`div`) and adding it to the DOM.
4. Initializing the DOM Overlay module.

Additionally, you will need to import the `process.js` file declared in the project. This file is a hacky workaround for React not finding the `process` declaration in the context of React VR, which would in turn lead to an error during initialization.

### TextboxOverlay.js and TextboxVr.js

These files contain the overlay and VR version of a simple textbox, respectively. Both display a bunch of text, but the `TextboxOverlay` version makes use of traditional web components, whereas `TextboxVr` employs React VR's api.

In practice, this will repeat for every high level component you would like to display in the overlay. Overlay components are rendered by the DOM Overlay, whereas their VR counterparts are rendered as per usual.

### Querying whether user is in VR?

[VrHeadModel](https://facebook.github.io/react-vr/docs/vrheadmodel.html) has an `inVR()` API call that is self explanatory. See its usage in `index.vr.js` in the sample, used to determine which version of the Textbox to render.
