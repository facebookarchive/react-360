/**
 * This example gathers input from gamepad devices. It displays a set of button
 * states for each connected controller, using the number of buttons and axes
 * from each controller to display their current positions.
 *
 * This demonstrates how to gather gamepad input, as well as determine which
 * gamepads are connected and listen to connect / disconnect events.
 */

import React from 'react';
import {AppRegistry, asset, NativeModules, Pano, StyleSheet, Text, View} from 'react-vr';

const RCTDeviceEventEmitter = require('RCTDeviceEventEmitter');

class PressState extends React.Component {
  constructor() {
    super();
    this.state = {hasFocus: false};
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.pressed !== this.props.pressed) {
      return true;
    }
    return nextState.hasFocus !== this.state.hasFocus;
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          backgroundColor: this.state.hasFocus ? '#333333' : 'black',
        }}
        onEnter={() => this.setState({hasFocus: true})}
        onExit={() => this.setState({hasFocus: false})}
      >
        <View style={{width: 0.5, height: 0.1}}>
          <Text style={{fontSize: 0.08, textAlign: 'center'}}>
            {this.props.id}
          </Text>
        </View>
        <View
          style={{
            width: 0.1,
            height: 0.1,
            backgroundColor: this.props.pressed ? 'blue' : 'black',
          }}
        />
      </View>
    );
  }
}

class SliderState extends React.Component {
  constructor() {
    super();
    this.state = {hasFocus: false};
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.value !== this.props.value) {
      return true;
    }
    return nextState.hasFocus !== this.state.hasFocus;
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          backgroundColor: this.state.hasFocus ? '#333333' : 'black',
        }}
        onEnter={() => this.setState({hasFocus: true})}
        onExit={() => this.setState({hasFocus: false})}
      >
        <View style={{width: 0.5, height: 0.1}}>
          <Text style={{fontSize: 0.08, textAlign: 'center'}}>
            {this.props.id}
          </Text>
        </View>
        <View style={{width: 0.4, height: 0.1}}>
          <View
            style={{
              width: 0.4 * (this.props.value + 1) / 2,
              height: 0.1,
              backgroundColor: 'yellow',
            }}
          />
        </View>
      </View>
    );
  }
}

class ControllerState extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      buttons: [],
      axes: [],
    };

    RCTDeviceEventEmitter.addListener('onReceivedInputEvent', e => {
      if (e.type !== 'GamepadInputEvent' || this.props.controller.index !== e.gamepad) {
        return;
      }
      if (e.eventType === 'keydown') {
        const buttons = this.state.buttons.concat([]);
        buttons[e.button] = true;
        this.setState({buttons});
      } else if (e.eventType === 'keyup') {
        const buttons = this.state.buttons.concat([]);
        buttons[e.button] = false;
        this.setState({buttons});
      } else if (e.eventType === 'axismove') {
        const axes = this.state.axes.concat([]);
        axes[e.axis] = e.value;
        this.setState({axes});
      }
    });
  }

  render() {
    const style = {
      flex: 1,
      flexDirection: 'column',
      marginLeft: 0.1,
      marginRight: 0.1,
    };
    const buttons = [];
    for (let i = 0; i < this.props.controller.buttons; i++) {
      buttons.push(
        <PressState key={'btn' + i} id={'Btn ' + i} pressed={this.state.buttons[i] || false} />
      );
    }
    const axes = [];
    for (let i = 0; i < this.props.controller.axes; i++) {
      axes.push(<SliderState key={'axis' + i} id={'Axis ' + i} value={this.state.axes[i] || 0} />);
    }
    return (
      <View style={style}>
        {buttons}
        {axes}
      </View>
    );
  }
}

const ControllerList = controllers => {
  if (controllers.length < 1) {
    return (
      <View style={{backgroundColor: 'black', padding: 0.2}}>
        <Text>No controllers</Text>
      </View>
    );
  }
  return controllers.map(c => <ControllerState key={c.index} controller={c} />);
};

class ControllerDemo extends React.Component {
  constructor() {
    super();

    this.state = {
      controllers: null,
    };

    NativeModules.ControllerInfo.getControllers().then(controllers => {
      this.setState({controllers: controllers});
    });

    RCTDeviceEventEmitter.addListener('controllerConnected', e => {
      console.log('controller', e);
      let added = false;
      const nextControllers = this.state.controllers.map(c => {
        if (c.index === e.index) {
          added = true;
          return e;
        } else {
          return c;
        }
      });
      if (!added) {
        nextControllers.push(e);
      }
      this.setState({controllers: nextControllers});
    });
  }

  render() {
    const controllers = this.state.controllers === null
      ? <Text style={styles.waiting}>Waiting...</Text>
      : <View style={styles.controllers}>
          {ControllerList(this.state.controllers)}
        </View>;
    return (
      <View style={{layoutOrigin: [0.5, 0.5]}}>
        <Pano source={asset('chess-world.jpg')} />
        {controllers}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  waiting: {
    backgroundColor: 'black',
    fontSize: 0.3,
    layoutOrigin: [0.5, 0.5],
    paddingLeft: 0.2,
    paddingRight: 0.2,
    textAlign: 'center',
    textAlignVertical: 'center',
    transform: [{translate: [0, 0, -3]}],
  },
  controllers: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    transform: [{translate: [0, 0, -3]}],
  },
});

AppRegistry.registerComponent('ControllerDemo', () => ControllerDemo);
