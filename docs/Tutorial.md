---
id: tutorial
title: Hello World
layout: docs
category: The Basics
permalink: docs/tutorial.html
next: reactvr-overview
previous: getting-started
---


In accordance with the ancient traditions of our people, our first React VR project doesn't do much other than display "hello" over a panorama. You can look at its source code file `index.vr.js` in the starter project folder. This file is the entry point for your React VR application.

```
'use strict';
import React from 'react';
import { AppRegistry, asset, Pano, Text, View } from 'react-vr';

class WelcomeToVR extends React.Component {
  render() {
    // Displays "hello" text on top of a loaded 360 panorama image.
    // Text is 0.8 meters in size and is centered three meters in front of you.
    return (
      <View>
        <Pano source={asset('chess-world.jpg')}/>
        <Text
          style={{
            backgroundColor: '#777879',
            fontSize: 0.8,
            layoutOrigin: [0.5, 0.5],
            paddingLeft: 0.2,
            paddingRight: 0.2,
            textAlign: 'center',
            textAlignVertical: 'center',
            transform: [{translate: [0, 0, -3]}],
          }}>
          hello
        </Text>
      </View>
    );
  }
};

AppRegistry.registerComponent('WelcomeToVR', () => WelcomeToVR);
```

React applications are divided into components – structural elements that define the rendering of parts of your application and update themselves in response to changes in input.
This code declares your top-level component, `WelcomeToVR`, and determines how to render it.

Our code begins by importing dependencies. Next, it declares the `WelcomeToVR` component, including how it renders. Our code ends by registering with the `AppRegistry`. This last part is only necessary for the top-level component in your application and you can safely ignore it otherwise.

You might notice that the contents of the `return` statement are not exactly JavaScript.
Declarations such as `<View>`, `<Pano>`, and `<Text>` make use of JSX, a syntax for embedding XML-like structures within JavaScript.
JSX tags allow you to cleanly describe your UI; we talk more about them below.

Let's examine the structure of our component. We return a `View` component, which has two children: a `Pano` and a `Text`:

* `Pano` creates a box around your world that renders a 360 photo.
It is this component that renders the environment you see when you look around this sample.
* `Text` renders strings in 3D space. This particular `Text` tag has been styled to place a large word in the middle of your world. We cover the style attribute in more detail elsewhere.
* `View` components are typically used as containers; they hold other components and can be used to provide the spacing and style your UI needs.
Our component creates a `Pano` and a `Text` wrapped in a `View`.

Each React component must return a single element when it renders, so our component with two children needs to wrap them in a `View`.

With a better understanding of what this code does, you can make some changes.
In [Getting Started](docs/getting-started.html), we created a project called WelcomeToVR, so let's change the greeting from “hello” to “welcome.”
Nested between the opening and closing `<Text>` tags is the text string that gets rendered. Change this to “welcome”.
Assuming that npm is running, you can refresh your web page to see the results.



## JSX and ES6 - What's going on?

Modern web development relies heavily on tools that parse and preprocess JavaScript. This is done for a number of reasons,
such as to package multiple JavaScript files together or to implement new language features. This is exactly what the React command line
interface does, translating it to implement JSX and ES6:

* **JSX** extends JavaScript with XML-like tags, allowing you to organize your document as a nested set of components in a fashion
similar to HTML. JSX makes writing React applications much easier. You can read more about it on [React's web site](https://facebook.github.io/react/docs/jsx-in-depth.html).
If you absolutely want to stick to strict JavaScript in your application, it is possible to [use React without JSX](https://facebook.github.io/react/docs/react-without-jsx.html) too.
* **ES6**, also known as ES2015, stands for ECMA Script 6, which is a set of language improvements to JavaScript. It is now a part of the official standard,
but not yet supported by all browsers, so a translation step is often necessary.
React Native ships with ES2015 support, so you can use it without worrying about compatibility.
`import`, `from`, `class`, `extends`, and the `() =>` syntax in the example above are all ES2015 features.
[This page](https://babeljs.io/docs/learn-es2015/) has a good overview of ES2015 features.

The statements such as `<Text style={{ fontSize: 0.8, ...}}>hello</Text>` above make use of JSX, which is ultimately translated into JavaScipt. For more information, see [React VR Overview](docs/react-vroverview.html).

## AppRegistry

Our Hello World sample defines `WelcomeToVR` as a new `Component` and registers it with the `AppRegistry`. The `AppRegistry` tells React VR which component is the root for the whole application.
You don't need to think about `AppRegistry` a lot, as there will probably just be one call to `AppRegistry.registerComponent` in the whole app.
It is included above so that you can paste the whole thing into your `index.vr.js` file and get it running.

When you're building a React VR app, you'll be making lots of new components. Anything you see on the screen is some sort of component. A component can be very simple; the only thing that's required is a `render` function that returns some JSX to render.