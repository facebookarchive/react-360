---
id: components-props-and-state
title: Components, Props and State
layout: docs
category: The Basics
permalink: docs/components-props-and-state.html
next: layout-and-style
previous: reactvr-overview
---

Components, props, and state are key concepts of the React Native framework
that are also valid for React VR.


### Props & State

There are two types of data that control a component: props and state. Props are set by the parent and they are fixed throughout the lifetime of a component. For data that is going to change, we have to use state.

#### Props

Most components can be customized with different parameters when they are created. These creation parameters are called `props`.

Your own components can also use props. This lets you make a single component that is used in many different places in your app, with slightly different properties in each place. Refer to `this.props` in your render function:

```
import React, { Component } from 'react';
import { AppRegistry, asset, Pano, Text, View } from 'react-vr';

class Greeting extends Component {
  render() {
    return (
      <Text>Hello {this.props.name}!</Text>
    );
  }
}

class LotsOfGreetings extends Component {
  render() {
    return (
      <View>
        <Pano source={asset('chess-world.jpg')}/>
        <View style={{transform: [{translate: [0, 0, -3]}]}}>
          <Greeting name='Rexxar' />
          <Greeting name='Jaina' />
          <Greeting name='Valeera' />
        </View>
      </View>
    );
  }
}

AppRegistry.registerComponent('LotsOfGreetings', () => LotsOfGreetings);
```

Using name as a prop lets us customize the Greeting component, so we can reuse that component for each of our greetings.

#### State

In general, you should initialize state in the constructor, and then call setState when you want to change it.

```
import React, { Component } from 'react';
import { AppRegistry, asset, Pano, Text, View } from 'react-vr';

class Blink extends Component {
  constructor(props) {
    super(props);
    this.state = {showText: true};

    // Toggle the state every second
    setInterval(() => {
      this.setState({ showText: !this.state.showText });
    }, 1000);
  }

  render() {
    let display = this.state.showText ? this.props.text : ' ';
    return (
      <Text>{display}</Text>
    );
  }
}

class BlinkApp extends Component {
  render() {
    return (
      <View>
        <Pano source={asset('chess-world.jpg')}/>
        <View style={{transform: [{translate: [0, 0, -3]}]}}>
          <Blink text='I love to blink' />
          <Blink text='Yes blinking is so great' />
          <Blink text='Why did they ever take this out of HTML' />
          <Blink text='Look at me look at me look at me' />
        </View>
      </View>
    );
  }
}

AppRegistry.registerComponent('BlinkApp', () => BlinkApp);
```

State works the same way as it does in React, so for more details on handling state, you can look at the [React.Component API](https://facebook.github.io/react/docs/react-component.html).
