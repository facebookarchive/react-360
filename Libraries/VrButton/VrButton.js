/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule VrButton
 */

/* eslint-disable */
'use strict';

const PropTypes = require('prop-types');
const React = require('React');
const ReactNative = require('ReactNative');
const View = require('View');
const BatchedBridge = require('BatchedBridge');
const StyleSheetPropType = require('StyleSheetPropType');
const ViewStylePropTypes = require('ViewStylePropTypes');
const VrSoundEffects = require('VrSoundEffects');

const keyMirror = require('fbjs/lib/keyMirror');

const States = keyMirror({
  FOCUS_OUT: null,
  FOCUS_IN: null,
  FOCUS_OUT_DISABLE: null,
  FOCUS_IN_DISABLE: null,
  FOCUS_IN_PRESS: null,
  FOCUS_IN_LONG_PRESS: null,
  ERROR: null,
});

/**
 * Quick lookup for states that are considered to be "pressing"
 */
const IsPressingIn = {
  FOCUS_IN_PRESS: true,
  FOCUS_IN_LONG_PRESS: true,
};

/**
 * Quick lookup for states that are considered to be "long pressing"
 */
const IsLongPressingIn = {
  FOCUS_IN_LONG_PRESS: true,
};

/**
 * Quick lookup for states that are considered to be "disabled"
 */
const IsDisabled = {
  FOCUS_OUT_DISABLE: true,
  FOCUS_IN_DISABLE: true,
};

/**
 * Quick lookup for states that are considered to be "focused"
 */
const IsFocused = {
  FOCUS_IN: true,
  FOCUS_IN_DISABLE: true,
  FOCUS_IN_PRESS: true,
  FOCUS_IN_LONG_PRESS: true,
};

/**
 * Inputs to the state machine.
 */
const Signals = keyMirror({
  ENTER: null,
  EXIT: null,
  DISABLE: null,
  ENABLE: null,
  KEY_PRESSED: null,
  KEY_RELEASED: null,
  LONG_PRESS_DETECTED: null,
});

/**
 * Mapping from States x Signals => States
 */
const Transitions = {
  FOCUS_OUT: {
    ENTER: States.FOCUS_IN,
    EXIT: States.FOCUS_OUT,
    DISABLE: States.FOCUS_OUT_DISABLE,
    ENABLE: States.FOCUS_OUT,
    KEY_PRESSED: States.FOCUS_OUT,
    KEY_RELEASED: States.FOCUS_OUT,
    LONG_PRESS_DETECTED: States.ERROR,
  },
  FOCUS_IN: {
    ENTER: States.FOCUS_IN,
    EXIT: States.FOCUS_OUT,
    DISABLE: States.FOCUS_IN_DISABLE,
    ENABLE: States.FOCUS_IN,
    KEY_PRESSED: States.FOCUS_IN_PRESS,
    KEY_RELEASED: States.FOCUS_IN,
    LONG_PRESS_DETECTED: States.ERROR,
  },
  FOCUS_OUT_DISABLE: {
    ENTER: States.FOCUS_IN_DISABLE,
    EXIT: States.FOCUS_OUT_DISABLE,
    DISABLE: States.FOCUS_OUT_DISABLE,
    ENABLE: States.FOCUS_OUT,
    KEY_PRESSED: States.FOCUS_OUT_DISABLE,
    KEY_RELEASED: States.FOCUS_OUT_DISABLE,
    LONG_PRESS_DETECTED: States.ERROR,
  },
  FOCUS_IN_DISABLE: {
    ENTER: States.FOCUS_IN_DISABLE,
    EXIT: States.FOCUS_OUT_DISABLE,
    DISABLE: States.FOCUS_IN_DISABLE,
    ENABLE: States.FOCUS_IN,
    KEY_PRESSED: States.FOCUS_IN_DISABLE,
    KEY_RELEASED: States.FOCUS_IN_DISABLE,
    LONG_PRESS_DETECTED: States.ERROR,
  },
  FOCUS_IN_PRESS: {
    ENTER: States.FOCUS_IN_PRESS,
    EXIT: States.FOCUS_OUT,
    DISABLE: States.FOCUS_IN_DISABLE,
    ENABLE: States.FOCUS_IN_PRESS,
    KEY_PRESSED: States.FOCUS_IN_PRESS,
    KEY_RELEASED: States.FOCUS_IN,
    LONG_PRESS_DETECTED: States.FOCUS_IN_LONG_PRESS,
  },
  FOCUS_IN_LONG_PRESS: {
    ENTER: States.FOCUS_IN_LONG_PRESS,
    EXIT: States.FOCUS_OUT,
    DISABLE: States.FOCUS_IN_DISABLE,
    ENABLE: States.FOCUS_IN_LONG_PRESS,
    KEY_PRESSED: States.FOCUS_IN_LONG_PRESS,
    KEY_RELEASED: States.FOCUS_IN,
    LONG_PRESS_DETECTED: States.FOCUS_IN_LONG_PRESS,
  },
  ERROR: {
    ENTER: States.FOCUS_IN,
    EXIT: States.FOCUS_OUT,
    DISABLE: States.FOCUS_OUT_DISABLE,
    ENABLE: States.FOCUS_OUT,
    KEY_PRESSED: States.FOCUS_OUT,
    KEY_RELEASED: States.FOCUS_OUT,
    LONG_PRESS_DETECTED: States.FOCUS_OUT,
  },
};

const SOUND_PROP_NAMES = [
  'onClickSound',
  'onDisableClickSound',
  'onLongClickSound',
  'onEnterSound',
  'onExitSound',
];

const LONG_PRESS_THRESHOLD = 500;
const MAX_MS_PLAYSOUND_AFTER_CLICK = 100;

function shouldPlaySound(event) {
  let timeStamp = 0;
  if (event && event.nativeEvent && event.nativeEvent.timeStamp) {
    timeStamp = event.nativeEvent.timeStamp;
  } else if (event && event.timeStamp) {
    timeStamp = event.timeStamp;
  } else {
    return false;
  }
  const deltaTime = Date.now() - timeStamp;
  return deltaTime >= 0 && deltaTime < MAX_MS_PLAYSOUND_AFTER_CLICK;
}

/**
 * The React Native resolver has made this package internal, but it is
 * registered with the batched bridge in order for native components to be
 * able to call into it.
 * This method passes fake events into the event emitter, simulating input
 * from the UI layer. This allows us to control focus when a component is
 * enabled / disabled.
 */
function maybeEmitMockEvent(node, eventType, nativeEvent) {
  const emitter = BatchedBridge.getCallableModule('RCTEventEmitter');
  if (!emitter) {
    return;
  }
  emitter.receiveEvent(node, eventType, nativeEvent);
}

/**
 * This Component is a helper for managing the interaction state machine for a gaze button.
 * By default, a VrButton has no appearance and only acts as a wrapper to
 * capture events, but it can be styled in the same ways as a View.
 *
 *```
 * <VrButton
 *   style={{width: 0.7}}
 *   onClick={()=>this._onViewClicked()}>
 *   <Image style={{width:1, height:1}}
 *     source={{uri:'../../Assets/Images/gaze_cursor_cross_hi.png'}}
 *     inset={[0.2,0.2,0.2,0.2]}
 *     insetSize={[0.05,0.45,0.55,0.15]} >
 *   </Image>
 * </VrButton>
 *```
 *
 * The State Machine for button state:
 * ```
 * +-------------+
 * |  FOCUS_OUT  | <---------------------------------------------------------+
 * +-------------+ <--------------------+                                    |
 *   +        ^                         |                                    |
 *   | ENTER  | EXIT                    | EXIT                           EXIT|
 *   v        +                         +                                    +
 * +-----------+  KEY_PRESSED  +----------------+ LONG DELAY+---------------------+
 * | FOCUS_IN  | +-----------> | FOCUS_IN_PRESS | +-------> | FOCUS_IN_LONG_PRESS |
 * +-----------+               +----------------+           +---------------------+
 *   ^        ^                         +                                    +
 *   |        |     KEY_RELEASED        |                                    |
 *   |        +-------------------------+          KEY_RELEASED              |
 *   +-----------------------------------------------------------------------+
 *
 * Standard component dispatching click events
 * These input events are considered primary keys and handled by VrButton:
 *  - Button A on XBOX Gamepad
 *  - Space button on keyboard
 *  - Left click on Mouse
 *  - Touch on screen
 * ```
 *
 * VrButton can trigger sound effects when the user interacts with it.
 * These sounds are asset() statements, or resource declaration in the form
 * `{uri: 'PATH'}`. Since different browsers support different audio formats,
 * you can also supply a map of formats to their corresponding resource objects,
 * and React VR can select the sound supported by the browser:
 * ```
 * <VrButton
 *   onClickSound={{
 *    ogg: asset('click.ogg'),
 *    mp3: asset('click.mp3'),
 *   }}>
 * ```
 * You can read more about supported audio formats in the docs for the
 * [Sound Effects](docs/vrsoundeffects.html) API.
 */

class VrButton extends React.Component {
  static propTypes = {
    ...View.propTypes,
    style: StyleSheetPropType(ViewStylePropTypes),

    /**
     * If `true`, this component can't be interacted with.
     */
    disabled: PropTypes.bool,

    /**
     * If `true`, long-press will not trigger `onLongClick` or `onClick`.
     * Default=`false`
     */
    ignoreLongClick: PropTypes.bool,

    /**
     * Invoked on short click event or if there is no long click handler
     */
    onClick: PropTypes.func,

    /**
     * Invoked on long click event
     */
    onLongClick: PropTypes.func,

    /**
     * Custom duration to define long click (milliseconds)
     */
    longClickDelayMS: PropTypes.number,

    /**
     * Invoked when button hit enters
     */
    onEnter: PropTypes.func,

    /**
     * Invoked when button hit exits
     */
    onExit: PropTypes.func,

    /**
     * Invoked when button is focused and key pressed
     */
    onButtonPress: PropTypes.func,

    /**
     * Invoked when button is focused and key released
     */
    onButtonRelease: PropTypes.func,

    /**
     * Sound resource to play when the button is clicked
     */
    onClickSound: PropTypes.oneOfType([
      PropTypes.shape({
        uri: PropTypes.string,
      }),
      PropTypes.number,
    ]),

    /**
     * Sound resource to play when the button is clicked while disabled
     */
    onDisableClickSound: PropTypes.oneOfType([
      PropTypes.shape({
        uri: PropTypes.string,
      }),
      PropTypes.number,
    ]),

    /**
     * Sound resource to play when the button is long-clicked
     */
    onLongClickSound: PropTypes.oneOfType([
      PropTypes.shape({
        uri: PropTypes.string,
      }),
      PropTypes.number,
    ]),

    /**
     * Sound resource to play when gaze or cursor enters the button
     */
    onEnterSound: PropTypes.oneOfType([
      PropTypes.shape({
        uri: PropTypes.string,
      }),
      PropTypes.number,
    ]),

    /**
     * Sound resource to play when gaze or cursor exits the button
     */
    onExitSound: PropTypes.oneOfType([
      PropTypes.shape({
        uri: PropTypes.string,
      }),
      PropTypes.number,
    ]),
  };

  static defaultProps = {
    disabled: false,
    ignoreLongClick: false,
  };

  state = {
    buttonState: this.props.disabled
      ? States.FOCUS_OUT_DISABLE
      : States.FOCUS_OUT,
  };

  componentWillMount() {
    this._ensureDisableState(this.props);
    // Cache any sounds attached to this button.
    for (const name of SOUND_PROP_NAMES) {
      const resource = this.props[name];
      if (resource) {
        VrSoundEffects.load(resource);
      }
    }
    if (__DEV__) {
      if (this.props.ignoreLongClick && this.props.onLongClick) {
        console.warn(
          'VrButton ignoring onLongClick property since ignoreLongClick is true',
        );
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    this._ensureDisableState(nextProps);
    // Cache any new sounds.
    for (const name of SOUND_PROP_NAMES) {
      const resource = VrSoundEffects.getSupportedResource(this.props[name]);
      const nextResource = VrSoundEffects.getSupportedResource(nextProps[name]);
      const uri = resource ? resource.uri : null;
      const nextUri = nextResource ? nextResource.uri : null;
      if (uri !== nextUri) {
        nextResource && VrSoundEffects.load(nextResource);
        resource && VrSoundEffects.unload(resource);
      }
    }
  }

  componentWillUnmount() {
    this.longPressDelayTimeout && clearTimeout(this.longPressDelayTimeout);
    // Unload any sounds used by this button.
    for (const name of SOUND_PROP_NAMES) {
      const resource = this.props[name];
      if (resource) {
        VrSoundEffects.unload(resource);
      }
    }
  }

  /**
   * This is called at any time props changed to ensure
   * button state is sync with props.disabled
   */
  _ensureDisableState = props => {
    if (props.disabled) {
      this._cancelLongPressDelayTimeout();
      this._receiveSignal(Signals.DISABLE, {});
    } else {
      this._receiveSignal(Signals.ENABLE, {});
    }
  };

  /**
   * Verify whether a input event is a key released event for VrButton
   *
   * @param event - the input event
   */
  _isKeyReleased = event => {
    if (event.buttonClass) {
      return event.buttonClass === 'confirm' && event.action === 'up';
    }
  };

  /**
   * Verify whether a input event is a key pressed event for VrButton
   *
   * @param event - the input event
   */
  _isKeyPressed = event => {
    if (event.buttonClass) {
      return event.buttonClass === 'confirm' && event.action === 'down';
    }
  };

  _onInput = event => {
    if (this._isKeyReleased(event.nativeEvent.inputEvent)) {
      this._receiveSignal(Signals.KEY_RELEASED, event);
    } else if (this._isKeyPressed(event.nativeEvent.inputEvent)) {
      this._receiveSignal(Signals.KEY_PRESSED, event);
    }
  };

  _onEnter = event => {
    this._receiveSignal(Signals.ENTER, event);

    if (this.props.disabled) {
      return;
    }

    if (this.props.onEnterSound && shouldPlaySound(event)) {
      VrSoundEffects.play(this.props.onEnterSound);
    }
    this.props.onEnter && this.props.onEnter(event);
  };

  _onExit = event => {
    this._receiveSignal(Signals.EXIT, event);

    if (this.props.disabled) {
      return;
    }

    if (this.props.onExitSound && shouldPlaySound(event)) {
      VrSoundEffects.play(this.props.onExitSound);
    }
    this.props.onExit && this.props.onExit(event);
  };

  _cancelLongPressDelayTimeout = () => {
    this.longPressDelayTimeout && clearTimeout(this.longPressDelayTimeout);
    this.longPressDelayTimeout = null;
  };

  _handleLongDelay = event => {
    this.longPressDelayTimeout = null;
    const curState = this.state.buttonState;
    if (!IsPressingIn[curState]) {
      console.error(
        `Attempted to transition from state '${curState}' to '${States.FOCUS_IN_LONG_PRESS}', which is not supported. ` +
          `This is most likely due to VrButton.longPressDelayTimeout not being cancelled.`,
      );
    } else {
      this._receiveSignal(Signals.LONG_PRESS_DETECTED, event);
    }
  };

  /**
   * Receives a state machine signal, performs side effects of the transition
   * and stores the new state. Validates the transition as well.
   *
   * @param signal - State machine signal.
   */
  _receiveSignal = (signal, event) => {
    const curState = this.state.buttonState;
    const nextState = Transitions[curState] && Transitions[curState][signal];
    if (!nextState) {
      console.error(`Unrecognized signal \`${signal}\` or state \`${curState}`);
    }
    if (nextState === States.ERROR) {
      console.error(
        `VrButton cannot transition from \`${curState}\` to \`${signal}`,
      );
    }
    if (curState !== nextState) {
      this._performSideEffectsForTransition(curState, nextState, signal, event);
      this.state.buttonState = nextState;
    }
    // Sound for disable click
    if (
      curState === States.FOCUS_IN_DISABLE &&
      signal === Signals.KEY_PRESSED
    ) {
      if (this.props.onDisableClickSound && shouldPlaySound(event)) {
        VrSoundEffects.play(this.props.onDisableClickSound);
      }
    }
  };

  /**
   * Perform side effects for transition between button states
   *
   * @param curState - Current Touchable state.
   * @param nextState - Next Touchable state.
   * @param signal - Signal that triggered the transition.
   * @param event - Native event.
   */
  _performSideEffectsForTransition = (curState, nextState, signal, event) => {
    // Cancel long press timeout if lost focus or key released.
    const isFinalSignal =
      signal === Signals.EXIT || signal === Signals.KEY_RELEASED;
    if (isFinalSignal) {
      this._cancelLongPressDelayTimeout();
    }

    // Set long press timeout
    if (
      !IsPressingIn[curState] &&
      IsPressingIn[nextState] &&
      signal === Signals.KEY_PRESSED
    ) {
      this._cancelLongPressDelayTimeout();
      const longDelayMS = this.props.longClickDelayMS
        ? Math.max(this.props.longClickDelayMS, 10)
        : LONG_PRESS_THRESHOLD;
      this.longPressDelayTimeout = setTimeout(
        this._handleLongDelay.bind(this, event),
        longDelayMS,
      );
    }

    // Dispatch click events
    if (IsPressingIn[curState] && signal === Signals.KEY_RELEASED) {
      if (
        IsLongPressingIn[curState] &&
        (this.props.onLongClick || this.props.ignoreLongClick)
      ) {
        if (!this.props.ignoreLongClick) {
          if (this.props.onLongClickSound) {
            VrSoundEffects.play(this.props.onLongClickSound);
          }
          this.props.onLongClick(event);
        }
      } else {
        if (this.props.onClickSound && shouldPlaySound(event)) {
          VrSoundEffects.play(this.props.onClickSound);
        }
        this.props.onClick && this.props.onClick(event);
      }
      // Dispatch onButtonReleased event
      this.props.onButtonRelease && this.props.onButtonRelease(event);
    }
    // Dispatch onButtonPressed event
    if (
      !IsPressingIn[curState] &&
      IsPressingIn[nextState] &&
      signal === Signals.KEY_PRESSED
    ) {
      this.props.onButtonPress && this.props.onButtonPress(event);
    }

    // Dispatch mock Enter/Exit events for enable
    if (IsDisabled[curState] !== IsDisabled[nextState]) {
      if (IsFocused[nextState]) {
        const node = ReactNative.findNodeHandle(this);
        const nativeEvent = {
          target: node,
          timeStamp: Date.now(),
        };
        if (signal === Signals.ENABLE) {
          // Fire a mock enter when the button is focused and re-enabled
          // setTimeout delays it until the button is no longer disabled
          setTimeout(
            () => maybeEmitMockEvent(node, 'topEnter', nativeEvent),
            0,
          );
        } else if (signal === Signals.DISABLE) {
          // Fire a mock exit when the button is focused and disabled
          maybeEmitMockEvent(node, 'topExit', nativeEvent);
        }
      }
    }
  };

  mockClick = () => {
    const node = ReactNative.findNodeHandle(this);
    const nativeEvent = {
      target: node,
      timeStamp: Date.now(),
    };
    maybeEmitMockEvent(node, 'topClick', nativeEvent);
  };

  render() {
    return (
      <View
        {...this.props}
        onInput={this._onInput}
        onEnter={this._onEnter}
        onExit={this._onExit}
        testID={this.props.testID}>
        {this.props.children}
      </View>
    );
  }
}

module.exports = VrButton;
