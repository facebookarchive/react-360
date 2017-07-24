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
'use strict';

const PropTypes = require('prop-types');
const React = require('React');
const View = require('View');
const StyleSheetPropType = require('StyleSheetPropType');
const ViewStylePropTypes = require('ViewStylePropTypes');
const VrSoundEffects = require('VrSoundEffects');

const createReactClass = require('create-react-class');
const keyMirror = require('fbjs/lib/keyMirror');

const States = keyMirror({
  FOCUS_OUT: null,
  FOCUS_IN: null,
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
 * Inputs to the state machine.
 */
const Signals = keyMirror({
  ENTER: null,
  EXIT: null,
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
    KEY_PRESSED: States.FOCUS_OUT,
    KEY_RELEASED: States.FOCUS_OUT,
    LONG_PRESS_DETECTED: States.ERROR,
  },
  FOCUS_IN: {
    ENTER: States.FOCUS_IN,
    EXIT: States.FOCUS_OUT,
    KEY_PRESSED: States.FOCUS_IN_PRESS,
    KEY_RELEASED: States.FOCUS_IN,
    LONG_PRESS_DETECTED: States.ERROR,
  },
  FOCUS_IN_PRESS: {
    ENTER: States.FOCUS_IN_PRESS,
    EXIT: States.FOCUS_OUT,
    KEY_PRESSED: States.FOCUS_IN_PRESS,
    KEY_RELEASED: States.FOCUS_IN,
    LONG_PRESS_DETECTED: States.FOCUS_IN_LONG_PRESS,
  },
  FOCUS_IN_LONG_PRESS: {
    ENTER: States.FOCUS_IN_LONG_PRESS,
    EXIT: States.FOCUS_OUT,
    KEY_PRESSED: States.FOCUS_IN_LONG_PRESS,
    KEY_RELEASED: States.FOCUS_IN,
    LONG_PRESS_DETECTED: States.FOCUS_IN_LONG_PRESS,
  },
  ERROR: {
    ENTER: States.FOCUS_IN,
    EXIT: States.FOCUS_OUT,
    KEY_PRESSED: States.FOCUS_OUT,
    KEY_RELEASED: States.FOCUS_OUT,
    LONG_PRESS_DETECTED: States.FOCUS_OUT,
  },
};

const SOUND_PROP_NAMES = ['onClickSound', 'onLongClickSound', 'onEnterSound', 'onExitSound'];

const LONG_PRESS_THRESHOLD = 500;

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

const VrButton = createReactClass({
  propTypes: {
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
    onClickSound: PropTypes.object,

    /**
     * Sound resource to play when the button is long-clicked
     */
    onLongClickSound: PropTypes.object,

    /**
     * Sound resource to play when gaze or cursor enters the button
     */
    onEnterSound: PropTypes.object,

    /**
     * Sound resource to play when gaze or cursor exits the button
     */
    onExitSound: PropTypes.object,
  },

  getDefaultProps: function() {
    return {
      disabled: false,
      ignoreLongClick: false,
    };
  },

  getInitialState: function() {
    return {
      buttonState: States.FOCUS_OUT,
    };
  },

  componentWillMount: function() {
    // Cache any sounds attached to this button.
    for (const name of SOUND_PROP_NAMES) {
      const resource = this.props[name];
      if (resource) {
        VrSoundEffects.load(resource);
      }
    }
    if (this.props.ignoreLongClick && this.props.onLongClick) {
      console.warn('VrButton ignoring onLongClick property since ignoreLongClick is true');
    }
  },

  componentWillReceiveProps: function(nextProps) {
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
  },

  componentWillUnmount: function() {
    this.longPressDelayTimeout && clearTimeout(this.longPressDelayTimeout);
    // Unload any sounds used by this button.
    for (const name of SOUND_PROP_NAMES) {
      const resource = this.props[name];
      resource && VrSoundEffects.unload(resource);
    }
  },

  /**
   * Verify whether a input event is a key released event for VrButton
   *
   * @param event - the input event
   */
  _isKeyReleased: function(event) {
    // Currently WebVR can only recognize XboxController as 'standard' mapping. But it seems key 0 is the primary key
    // for most gamepad controller. We should revisit this once the functionality of mapping is fully implemented.
    return (
      (event.type === 'GamepadInputEvent' && event.button === 0 && event.eventType === 'keyup') ||
      (event.type === 'KeyboardInputEvent' &&
        event.code === 'Space' &&
        event.eventType === 'keyup') ||
      (event.type === 'MouseInputEvent' && event.button === 0 && event.eventType === 'mouseup') ||
      (event.type === 'TouchInputEvent' && event.eventType === 'touchend')
    );
  },

  /**
   * Verify whether a input event is a key pressed event for VrButton
   *
   * @param event - the input event
   */
  _isKeyPressed: function(event) {
    // Currently WebVR can only recognize XboxController as 'standard' mapping. But it seems key 0 is the primary key
    // for most gamepad controller. We should revisit this once the functionality of mapping is fully implemented.
    return (
      (event.type === 'GamepadInputEvent' &&
        event.button === 0 &&
        event.eventType === 'keydown' &&
        !event.repeat) ||
      (event.type === 'KeyboardInputEvent' &&
        event.code === 'Space' &&
        event.eventType === 'keydown' &&
        !event.repeat) ||
      (event.type === 'MouseInputEvent' && event.button === 0 && event.eventType === 'mousedown') ||
      (event.type === 'TouchInputEvent' &&
        (event.eventType === 'touchstart' || event.eventType === 'touchmove'))
    );
  },

  _onInput: function(event) {
    if (this.props.disabled) {
      return;
    }

    if (this._isKeyReleased(event.nativeEvent.inputEvent)) {
      this._receiveSignal(Signals.KEY_RELEASED, event);
    } else if (this._isKeyPressed(event.nativeEvent.inputEvent)) {
      this._receiveSignal(Signals.KEY_PRESSED, event);
    }
  },

  _onEnter: function(event) {
    if (this.props.disabled) {
      return;
    }

    this._receiveSignal(Signals.ENTER, event);
    this.props.onEnter && this.props.onEnter(event);
    const resource = this.props.onEnterSound;
    resource && VrSoundEffects.play(resource);
  },

  _onExit: function(event) {
    if (this.props.disabled) {
      return;
    }

    this._receiveSignal(Signals.EXIT, event);
    this.props.onExit && this.props.onExit(event);
    const resource = this.props.onExitSound;
    resource && VrSoundEffects.play(resource);
  },

  _cancelLongPressDelayTimeout: function() {
    this.longPressDelayTimeout && clearTimeout(this.longPressDelayTimeout);
    this.longPressDelayTimeout = null;
  },

  _handleLongDelay: function(event) {
    this.longPressDelayTimeout = null;
    const curState = this.state.buttonState;
    if (!IsPressingIn[curState]) {
      console.error(
        'Attempted to transition from state `' +
          curState +
          '` to `' +
          States.FOCUS_IN_LONG_PRESS +
          '`, which is not supported. This is ' +
          'most likely due to `VrButton.longPressDelayTimeout` not being canceled.'
      );
    } else {
      this._receiveSignal(Signals.LONG_PRESS_DETECTED, event);
    }
  },

  /**
   * Receives a state machine signal, performs side effects of the transition
   * and stores the new state. Validates the transition as well.
   *
   * @param signal - State machine signal.
   */
  _receiveSignal: function(signal, event) {
    const curState = this.state.buttonState;
    const nextState = Transitions[curState] && Transitions[curState][signal];
    if (!nextState) {
      console.error('Unrecognized signal `' + signal + '` or state `' + curState);
    }
    if (nextState === States.ERROR) {
      console.error('VrButton cannot transition from `' + curState + '` to `' + signal);
    }
    if (curState !== nextState) {
      this._performSideEffectsForTransition(curState, nextState, signal, event);
      this.state.buttonState = nextState;
    }
  },

  /**
   * Perform side effects for transition between button states
   *
   * @param curState - Current Touchable state.
   * @param nextState - Next Touchable state.
   * @param signal - Signal that triggered the transition.
   * @param event - Native event.
   */
  _performSideEffectsForTransition: function(curState, nextState, signal, event) {
    // Cancel long press timeout if lost focus or key released.
    const isFinalSignal = signal === Signals.EXIT || signal === Signals.KEY_RELEASED;
    if (isFinalSignal) {
      this._cancelLongPressDelayTimeout();
    }

    // Set long press timeout
    if (!IsPressingIn[curState] && IsPressingIn[nextState] && signal === Signals.KEY_PRESSED) {
      this._cancelLongPressDelayTimeout();
      const longDelayMS = this.props.longClickDelayMS
        ? Math.max(this.props.longClickDelayMS, 10)
        : LONG_PRESS_THRESHOLD;
      this.longPressDelayTimeout = setTimeout(this._handleLongDelay.bind(this, event), longDelayMS);
    }

    // Dispatch click events
    if (IsPressingIn[curState] && signal === Signals.KEY_RELEASED) {
      if (IsLongPressingIn[curState] && (this.props.onLongClick || this.props.ignoreLongClick)) {
        if (!this.props.ignoreLongClick) {
          this.props.onLongClick(event);
          const resource = this.props.onLongClickSound;
          resource && VrSoundEffects.play(resource);
        }
      } else {
        this.props.onClick && this.props.onClick(event);
        const resource = this.props.onClickSound;
        resource && VrSoundEffects.play(resource);
      }
      // Dispatch onButtonReleased event
      this.props.onButtonRelease && this.props.onButtonRelease(event);
    }
    // Dispatch onButtonPressed event
    if (!IsPressingIn[curState] && IsPressingIn[nextState] && signal === Signals.KEY_PRESSED) {
      this.props.onButtonPress && this.props.onButtonPress(event);
    }
  },

  /**
   * Reset button state to FOCUS_OUT if button is disabled
   */
  _resetButtonState: function() {
    this._cancelLongPressDelayTimeout();
    this.state.buttonState = States.FOCUS_OUT;
  },

  render: function() {
    if (this.props.disabled) {
      this._resetButtonState();
    }
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
  },
});

module.exports = VrButton;
