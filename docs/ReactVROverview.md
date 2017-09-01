---
id: reactvr-overview
title: React VR Overview
layout: docs
category: The Basics
permalink: docs/reactvr-overview.html
next: components-props-and-state
previous: tutorial
---

React is an open-source JavaScript library from Facebook that makes it easy to create interactive User Interfaces. React VR takes it to the next level, creating UIs and 3D scenes in virtual reality.

In this section, we highlight some of key benefits and concepts of React VR.


### JSX and Declarative UIs

One feature that makes React appealing is that it combines declarative UI elements with code that manipulates them in an elegant way.
UI elements are described by component tags that look similar to HTML. For example, the tag **`<Greeting name='Joe'/>`** may describe a greeting
UI component that also takes a name as a parameter. These tags are inserted directly into JavaScript with the help of JSX.

[JSX](https://facebook.github.io/react/docs/introducing-jsx.html) is a syntax extension to JavaScript;
it is pre-processed in the React Native packager to become JavaScript.
JSX allows describing UI more elegantly than would be possible with direct code.

```
<MyButton color="blue" shadowSize={2}>
  Click Me
</MyButton>
```

compiles into:

```
React.createElement(
  MyButton,
  {color: 'blue', shadowSize: 2},
  'Click Me'
)
```

While using JSX is not mandatory, it is recommended for readability.
The React website contains [further details on JSX](https://facebook.github.io/react/docs/jsx-in-depth.html).



### Key React Concepts

Working with React requires knowledge of some terminology and key concepts. Here is a quick summary of
the most important concepts and how they interact:

* **Components** - Components are reusable UI elements that can be used in tags, such as **`<Greeting/>`**. React Native provides built-in
components such as **`Text`** and **`Image`**. Additional components are declared by deriving a class from **`React.Component`**. Each user
component has an implementation that includes a **`render()`** function which returns a set of child sub-components that fully
describe its contents.

* **Props** - Components can take arguments such as a **`name`** in **`<Greeting name='Rexxar'/>`**. Such arguments are known as properties or *props* and are accessed through the **`this.props`** variable. **`name`**, from the above example, is accessible as **`{this.props.name}`**.
You can read more about this interaction under [Components, Props and State](docs/components-props-and-state.html).

* **State** - Components can maintain an internal state that affects component display. When state data changes, the component re-renders itself. By React convention, all modifiable state is organized inside of a **`this.state`** object within the component and can only be modified through
a dedicated **`setState`** function, for example:
        this.setState({myStateVariableCounter : 10})

* **Events** - Components can generate events that are raised when certain UI action occur. For example, the **`View`** component generates
**`onEnter`** and **`onExit`** events when the cursor enters and exits its area, respectively. Such events can be handled within the
component declaration to properly processes the interaction, for example:
        <View onEnter={() => this.setState({hasFocus: true})}>

* **Layout** - React uses the flexbox algorithm and layout rules to automatically position components within a 2D plane. This layout
considers component dimensions, which are either computed or specified through width and height, as well as control style attributes
such as **`alignItems`**. This is further described in [Layout and Style](docs/layout-and-style.html).

* **Style** - Style objects control the look and layout of the component. They are generally specified through a style object. For example:
        <View style={{width: 100, height: 100, backgroundColor: 'skyblue'}}/>
Instead of specifying all component attributes inline,
style objects can be pulled out and declared externally with the help of **StyleSheet.create**. Such external stylesheets simplify component
reuse. Although React StyleSheet objects share some attribute names with CSS, they are not directly related.

The following sections describe these items in more detail.


 ### React Ecosystem

While originally developed to simplify development for the web, the React ecosystem has grown to include several varieties:

* **[React](https://facebook.github.io/react/)** - the original library, which is used to target the web by creating DOM rendered by the browser.
* **[React Native](https://facebook.github.io/react-native/)** - targets developing native applications on iOS and Android through the use of native components. React Native builds on top of core parts of React.
* **React VR** - the new library that we are talking about here, which enables developing UIs in VR. React VR builds on top of React Native frameworks.

Although it runs in the browser, React VR has structurally more in common with React Native than React, as it supports many of the same tags such as <View> and <Text>.  In addition to the 2D layout, it also introduces the concepts of 3D scenes, transformations, and panoramas, allowing objects to be placed in 3D space and rendered in VR.

Technology wise, React VR uses a simple OVRUI library, which makes use of a popular [Three.js](https://threejs.org/) JavaScript 3D engine.
Three.js runs inside of the browser and renders the scene through WebGL.  Access to VR headsets is provided through the Web VR API, which enables display on the Rift, GearVR or other devices.
React VR does not, however, require a VR headset to run - it can also be used to create interactive 360 experiences that run in the browser or on a mobile phone.

Key concepts of the React Native framework are also valid for React VR. Here are some of these key concepts and links to further, more detailed information.


#### React Native Packager

React JavaScript code is preprocessed before it is run by the browser. This pre-processing is performed by the React Native packager. It is a project similar in scope to [Browserify](http://browserify.org/) and [Webpack](https://webpack.github.io/), and provides a CommonJS-like module system, JavaScript compilation (ES6, Flow, JSX), bundling, and asset loading.

For React VR we use two key commands.

* **bundle** : process, transform and amalgamate the JavaScript files into a single static file of JavaScript

* **start** : launch the react native package to act as a web server and a dynamic transformer of JavaScript files into transformed bundles files.

**npm start** starts the packager. This is a shortcut for the following command:

```
node node_modules/react-native/local-cli/cli.js start
```

In this mode, the packager behaves like a local webserver for the majority of content, with the important addition that it transforms React and JSX code into the JavaScript code required by web browsers. You can see the transformed output by running **npm start** in one of your own projects and then browsing to http://localhost:8081/index.vr.bundle?platform=vr.

For static websites, you need save the generated content. [`npm run bundle`](docs/publishing.html)  accomplishes this with a command similar to:

```
node node_modules/react-native/local-cli/cli.js bundle --entry-file
index.vr.js --platform vr --dev false --bundle-output
index.vr.bundle
```

The resultant index.vr.bundle file contains JavaScript code that can be directly fetched and executed by an HTML **`script`** tag.

Due to the scope of the project, we only discuss our usage. For more general information on the Packager, see [React Native Packager](https://github.com/facebook/metro-bundler).

#### Networking

React VR uses the Fetch API for fetching resources across a network. If you have used **`XMLHttpRequest`** or other networking APIs before, Fetch will seem familiar.

For information and examples about using Fetch with React Native, see [Networking](https://facebook.github.io/react-native/docs/network.html).

For the full list of Fetch properties, see [the Fetch Request documentation](https://developer.mozilla.org/en-US/docs/Web/API/Request).

For general information about Fetch, see [the Fetch API documentation](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API).
