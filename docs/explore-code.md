---
id: explore-code
title: Exploring the Code
sidebar_label: Exploring the Code
---

## The Parts of your Project

When you open up the directory containing your project, you'll see a few files already created for you. We'll explore what each file does, and how it fits into the whole.

### `index.js`

This is the main code of your application, it is where all of your React code lives. This is the code that makes your application unique, and determines how it looks. Any code imported by `index.js` will also become a part of your app, allowing you to organize your app into many different files.

### `client.js`

This is the code that connects your browser to your React application – the [Runtime](/react-360/docs/runtime.html). This file does three things. First, it creates a new instance of React 360, loading your React code and attaching it to a specific place in the DOM. This is also where your application can pass a variety of initialization options, which will be discussed later.

Next, the file actually places your React code into the scene. The mount point declared in `index.js` is attached to the Default Surface of your app – a cylindrical layer on which a 2D UI can be placed.

Finally, the starter project immediately adds a 360 background photo. This part is optional, but allows the photo to show while your React code is still loading, letting the user see something as soon as possible.

### `index.html`

This is the web page you load when viewing your application. All it does is provide a point to mount your JavaScript code. This is intentional. Most functionality is left out of HTML, so that you can easily integrate your React 360 application into server-render pages or existing web apps.

### `NonBlobBridge.js`

This is the bridge code to start react-360 executor. It runs a bridge in web worker to handle messages sending between `client.js` and `index.js`. Generally you don't need to touch any code in this file.

**Important**

`NonBlobBridge.js` doesn't exist in `react-360`(< 1.1.1), we were using an inline blob URL as the bridge code. But this may cause a security issue in the Chrome Browser that makes your app not work when hosted in a high secured CDN server. If you are using `react-360-cli`(>= 1.1.1), it will automatically use `NonBlobBridge.js` in the new project. If you have project created via `react-360-cli`(< 1.1.1), upgrading your `react-360` and `react-360-web` version won't break your app, and you can run the following code to migrate to use `NonBlobBridge.js`:
```
node node_modules/react-360/scripts/install-bridge.js
```

## Exploring the Starter Project

Digging into `index.js`, we can see how the contents viewed on your screen are composed in React code. If you're not yet familiar with how React works, you should first read through the documentation at https://reactjs.org/.

### `View` and `Text`

`index.js` is split into a few distinct sections. The main piece creates a new React component that is used as the top-level element of your app. It contains two `<View>` elements, and a `<Text>` element. The first View fills the entire panel, which has a default size of 1000px x 600px. These Surfaces can be [configured into multiple sizes and shapes](/react-360/docs/surfaces.html). The second View provides a border and background for the text it contains. The innermost Text element turns a string into characters rendered on the screen, welcoming you to React 360 for the first time.

At this point, you can change the contents of `<Text>` to your own message. Change the `'Welcome to React 360'` string to something else, save the file, and refresh the web page to see your changes.

View and Text are two of the simplest tools React 360 gives you in interface development. Views are used to either group content, or provide visual boxes on the screen. You can use them to provide layout without actually rendering anything, or they can be used to create the kinds of border and background effects seen in this sample application.

Text is for drawing characters to the screen. If you're creating a 2D UI, this is a critical element for surfacing information to the user, labeling UI elements, and more.

### Styling Content

The next block of code creates the styles applied to the code above. `StyleSheet` is a concept taken directly from [React Native](http://facebook.github.io/react-native/docs/style.html). React 360 supports the same style attributes as React Native, and its documentations should be used to understand the available options. The fields of the `style` object created at the bottom are referenced directly in the React code.

### Exposing the React Component

The final line of the starter project registers the component with the AppRegistry, which allows React 360 to mount it onto a surface. The string identifier used here is the same one found in `client.js`, when it mounts your component to the default surface.

## Adding State

React excels at defining apps that depend on a changing state, and the most compelling experiences will use this in some way.

### Creating a Simple Counter

State can be entirely app-driven, coming from timers or some network connection. We can create a basic example of this by rewriting our app to display a simple counter that is gradually increased on an interval. Replace the contents of your main component with the following code to see this in action:

```js
// Our component will keep track of this state
state = {
  count: 0,
};

// This method increments our count, triggering a re-render
_incrementCount = () => {
  this.setState({count: this.state.count + 1});
};

// Once the component mounts, run the increment method every second
componentDidMount() {
  setInterval(this._incrementCount, 1000);
}

render() {
  // Reference the count in our UI
  return (
    <View style={styles.panel}>
      <View style={styles.greetingBox}>
        <Text style={styles.greeting}>
          {`Count: ${this.state.count}`}
        </Text>
      </View>
    </View>
  );
}
```

Refresh your project, and you should see the count increasing every second. This is React in action - each time state changes, your UI is re-rendered.

### Adding User Input

Most state changes aren't automatic, though, and come from user interaction. Let's change our app to only increment the count when the user clicks the counter. To collect user clicks, we'll use a new component, `VrButton`. VrButton encodes the concept of "clicking" to work across desktop, mobile, and VR experiences, and is the core building block of user interaction in React 360.

To use this element, add VrButton to the values imported from the 'react-360' package.

```js
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  VrButton,
} from 'react-360';
```

Next, remove the `componentDidMount()` method from your component. We will not longer be using the interval timer. Instead, modify the contents of your `render()` method to use the new VrButton.

```js
render() {
  return (
    <View style={styles.panel}>
      <VrButton
        onClick={this._incrementCount}
        style={styles.greetingBox}>
        <Text style={styles.greeting}>
          {`Count: ${this.state.count}`}
        </Text>
      </VrButton>
    </View>
  );
}
```

Refresh your app, and try clicking the button. The count should increase each time you click the button. You could further extend this by highlighting the button when your cursor moves over it, leveraging the `onEnter` and `onExit` events available to most components. With all of these tool, you can start to build a complex, interactive application.
