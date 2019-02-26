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

/* global TimeoutID */

import * as React from 'react';
import {Pressable} from 'react-webgl'; // eslint-disable-line no-unused-vars
import NativeModules from '../modules/NativeModules';

const LONG_PRESS_THRESHOLD = 500;

type EventHandler = () => void;
type Sound = string | {|uri: string|};

type Props = {|
  children: ?React.Node,
  disabled?: boolean,
  longClickDelayMS?: number,
  onClick?: EventHandler,
  onClickSound?: Sound,
  onDisableClickSound?: Sound,
  onEnter?: EventHandler,
  onEnterSound?: Sound,
  onExit?: EventHandler,
  onExitSound?: Sound,
  onLongClick?: EventHandler,
  style?: any,
|};

type State = {|
  hovered: boolean,
|};

export default class VrButton extends React.Component<Props, State> {
  _longPressTimeout: ?TimeoutID;

  constructor(props: Props) {
    super(props);

    this._longPressTimeout = null;

    this.state = {
      hovered: false,
    };
  }

  _playSound(source: Sound) {
    if ('AudioModule' in NativeModules) {
      // $FlowFixMe
      NativeModules.AudioModule.playOneShot({source});
    }
  }

  _enter() {
    if (this.props.onEnterSound) {
      this._playSound(this.props.onEnterSound);
    }
    if (this.props.onEnter) {
      this.props.onEnter();
    }
  }

  _exit() {
    this._cancelLongPressTimeout();
    if (this.props.onExitSound) {
      this._playSound(this.props.onExitSound);
    }
    if (this.props.onExit) {
      this.props.onExit();
    }
  }

  _disabledClick() {
    if (this.props.onDisableClickSound) {
      this._playSound(this.props.onDisableClickSound);
    }
  }

  _click() {
    if (this.props.onClickSound) {
      this._playSound(this.props.onClickSound);
    }
    if (this.props.onClick) {
      this.props.onClick();
    }
  }

  _cancelLongPressTimeout() {
    if (this._longPressTimeout != null) {
      clearTimeout(this._longPressTimeout);
      this._longPressTimeout = null;
    }
  }

  _handleLongPress = () => {
    this._longPressTimeout = null;
    if (this.props.onLongClick) {
      this.props.onLongClick();
    }
  };

  _onHoverIn = () => {
    this.setState({hovered: true});
    this._enter();
  };

  _onHoverOut = () => {
    this.setState({hovered: false});
    this._exit();
  };

  _onPressIn = () => {
    if (this.props.disabled) {
      return;
    }
    if (this._longPressTimeout) {
      this._cancelLongPressTimeout();
    }
    const longDelayMS = this.props.longClickDelayMS
      ? Math.max(this.props.longClickDelayMS, 10)
      : LONG_PRESS_THRESHOLD;
    this._longPressTimeout = setTimeout(this._handleLongPress, longDelayMS);
  };

  _onPress = () => {
    if (this.props.disabled) {
      this._disabledClick();
    } else {
      this._click();
    }
  };

  _onPressOut = () => {
    this._cancelLongPressTimeout();
  };

  componentDidUpdate(prevProps: Props, prevState: State) {
    // Handle transition states
    if (this.props.disabled !== prevProps.disabled) {
      // was disabled or enabled
      if (this.state.hovered) {
        // if the button is currently hovered, we need to simulate enter or exit events
        if (this.props.disabled) {
          this._exit();
        } else {
          this._enter();
        }
      }
    }
  }

  render() {
    const rest = {
      style: this.props.style,
    };
    return (
      <Pressable
        {...rest}
        onHoverIn={this._onHoverIn}
        onHoverOut={this._onHoverOut}
        onPress={this._onPress}
        onPressIn={this._onPressIn}
        onPressOut={this._onPressOut}>
        {this.props.children}
      </Pressable>
    );
  }
}
