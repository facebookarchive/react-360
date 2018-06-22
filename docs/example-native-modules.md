---
id: example-native-modules
title: Example: Native Modules
sidebar_label: Native Modules
---

A demonstration of how to pass data back and forth between the main window and your React code using Native Modules.

## Exploring the Sample

The code for this sample is found [here](https://github.com/facebook/react-360/tree/master/Samples/NativeModules). To test it out for yourself, create a new project with the React 360 CLI, and copy over the files from the repository into your project directory. When you start up the server and load http://localhost:8081/index.html, you should see a panel containing some buttons and information.

## The Code

The sample Native Module is found at `BrowserInfoModule.js`. It demonstrates the different ways to communicate between the main window to React, as described in the [Native Module documentation](/react-360/docs/native-modules.html).

The first field is the user agent string, a constant that is generated when the module is constructed, and attached to the `userAgent` property of the module. When the module is registered, this value is passed directly over to React; any future changes to this value will not be seen on the React side.

The second example is a method which has no feedback: `setTitle()` takes a string, and places it in the window's title bar.

The rest of the examples show how to send data back to React once a method has been called. When `getBatteryLevel()` is called on the React side, the developer passes a callback that will be triggered when data is available – this is a fairly standard asynchronous JavaScript structure. Within the Native Module, the requested data is generated and passed back to React by invoking the callback. You can pass any number of arguments to the callback by placing them in the array.

While callbacks are one way to handle asynchronous behavior, many modern JavaScript programs prefer to use Promises to create organized, readable chains of asynchronous logic. Native Modules contain the ability to generate methods that return Promises. Within the Native Module, you can prefix a method with a dollar sign ($) to expose this behavior. `$getConfirmation()` demonstrates this – it is available as `getConfirmation()` on the React side, and immediately returns a Promise. When triggered, this particular example presents the user with a confirmation dialog, and either resolves or rejects that Promise based on the result.
