/**
 * Copyright (c) 2016-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @flow
 */

import EventInput from './EventInput';

type GamepadState = {
  buttons: Array<{pressed: boolean, startTime: number}>,
  axes: Array<number>,
};

export type GamepadButtonPressEvent = {
  eventType: 'keydown',
  button: number,
  gamepad: number,
  repeat: boolean,
};
export type GamepadButtonReleaseEvent = {
  eventType: 'keyup',
  button: number,
  gamepad: number,
};
export type GamepadAxisMoveEvent = {
  eventType: 'axismove',
  axis: number,
  gamepad: number,
  value: number,
};
export type GamepadButtonEvent = GamepadButtonPressEvent | GamepadButtonReleaseEvent;
export type GamepadInputEvent = GamepadButtonEvent | GamepadAxisMoveEvent;

const getGamepads = (navigator.getGamepads
  ? navigator.getGamepads
  : navigator.webkitGetGamepads ? navigator.webkitGetGamepads : () => []).bind(navigator);

const LONG_PRESS_TIME = 500;
const AXIS_EPSILON = 0.001; // Smallest axis change needed to record a change event

const TOUCH_RE = /Oculus Touch/;
function getButtonClass(gamepad, button) {
  if (TOUCH_RE.test(gamepad.id)) {
    switch (button) {
      case 1: // index trigger
      case 3: // primary button
        return 'confirm';
      case 4:
        return 'back';
    }
    return null;
  } else if (gamepad.mapping === 'standard') {
    switch (button) {
      case 0:
        return 'confirm';
      case 1:
        return 'back';
    }
    return null;
  }
  switch (button) {
    case 0:
    case 1:
      return 'confirm';
  }
  return null;
}

export default class GamepadEventInput extends EventInput {
  _previousState: Array<GamepadState>;

  constructor() {
    super('GamepadInputEvent');
    this._previousState = [];
  }

  getEvents(): Array<GamepadInputEvent> {
    const now = Date.now();
    const gamepads = getGamepads();
    const events: Array<GamepadInputEvent> = [];
    for (let id = 0; id < gamepads.length; id++) {
      if (gamepads[id]) {
        if (!this._previousState[id]) {
          this._previousState[id] = {
            buttons: [],
            axes: [],
          };
        }
        const state = this._previousState[id];
        const buttons = gamepads[id].buttons;
        for (let btn = 0; btn < buttons.length; btn++) {
          let buttonState = state.buttons[btn];
          if (!buttonState) {
            buttonState = {
              pressed: false,
              startTime: -1,
            };
            state.buttons[btn] = buttonState;
          }
          const pressed = typeof buttons[btn] === 'object'
            ? buttons[btn].pressed
            : buttons[btn] === 1.0;
          if (buttonState.pressed !== pressed) {
            if (pressed) {
              buttonState.pressed = true;
              buttonState.startTime = now;
              const event: Object = {
                type: this.getEventType(),
                eventType: 'keydown',
                button: btn,
                gamepad: id,
                repeat: false,
                action: 'down',
              };
              const buttonClass = getButtonClass(gamepads[id], btn);
              if (buttonClass) {
                event.buttonClass = buttonClass;
              }
              events.push(event);
            } else {
              buttonState.pressed = false;
              const event: Object = {
                type: this.getEventType(),
                eventType: 'keyup',
                button: btn,
                gamepad: id,
                action: 'up',
              };
              const buttonClass = getButtonClass(gamepads[id], btn);
              if (buttonClass) {
                event.buttonClass = buttonClass;
              }
              events.push(event);
            }
          } else if (pressed && now - buttonState.startTime > LONG_PRESS_TIME) {
            const event: Object = {
              type: this.getEventType(),
              eventType: 'keydown',
              button: btn,
              gamepad: id,
              repeat: true,
              action: 'repeat',
            };
            const buttonClass = getButtonClass(gamepads[id], btn);
            if (buttonClass) {
              event.buttonClass = buttonClass;
            }
            events.push(event);
          }
        }

        const axes = gamepads[id].axes;
        if (axes) {
          for (let axis = 0; axis < axes.length; axis++) {
            const oldValue = state.axes[axis];
            const newValue = axes[axis];
            if (typeof oldValue !== 'number') {
              // initialization should not be a change
              state.axes[axis] = newValue;
              continue;
            }
            if (Math.abs(newValue - oldValue) > AXIS_EPSILON) {
              events.push({
                type: this.getEventType(),
                eventType: 'axismove',
                axis: axis,
                gamepad: id,
                value: newValue,
              });
            }
            state.axes[axis] = newValue;
          }
        }
      } else {
        if (this._previousState[id]) {
          delete this._previousState[id];
        }
      }
    }
    return events;
  }
}
