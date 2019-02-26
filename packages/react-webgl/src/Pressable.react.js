/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @flow
 */

import * as React from 'react';
import {View, type ViewStyles} from './Primitives'; // eslint-disable-line no-unused-vars

type GLEvent = {
  action?: 'up' | 'down',
  buttonClass?: string,
};

type EventHandler = (?GLEvent) => void;

type Props = {|
  children: React.Node | (State => React.Node),
  onHoverIn?: EventHandler,
  onHoverOut?: EventHandler,
  onPress?: EventHandler,
  onPressIn?: EventHandler,
  onPressOut?: EventHandler,
  style?: ViewStyles,
|};

type State = {|
  hovered: boolean,
  pressed: boolean,
|};

export default class Pressable extends React.PureComponent<Props, State> {
  state = {hovered: false, pressed: false};

  _onInput = event => {
    if (event.buttonClass !== 'confirm') {
      return;
    }
    if (this.state.pressed) {
      if (event.action === 'up') {
        this.setState({pressed: false});
        if (this.props.onPress) {
          this.props.onPress(event);
        }
        if (this.props.onPressOut) {
          this.props.onPressOut(event);
        }
      }
    } else {
      if (event.action === 'down') {
        this.setState({pressed: true});
        if (this.props.onPressIn) {
          this.props.onPressIn(event);
        }
      }
    }
  };

  _onEnter = () => {
    this.setState({hovered: true});
    if (this.props.onHoverIn) {
      this.props.onHoverIn();
    }
  };

  _onExit = () => {
    if (this.state.pressed) {
      if (this.props.onPressOut) {
        this.props.onPressOut();
      }
    }
    this.setState({hovered: false, pressed: false});
    if (this.props.onHoverOut) {
      this.props.onHoverOut();
    }
  };

  render() {
    const {children, style} = this.props;
    const currentState = {
      hovered: this.state.hovered,
      pressed: this.state.pressed,
    };
    return (
      <View style={style} onEnter={this._onEnter} onExit={this._onExit} onInput={this._onInput}>
        {typeof children === 'function' ? children(currentState) : children}
      </View>
    );
  }
}
