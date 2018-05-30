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

import type {ButtonEvent, InputEvent, InputChannel} from './Types';

type GamepadEvent = {gamepad: Gamepad};

type GamepadState = {
  axes: Array<number>,
  buttons: Array<{pressed: boolean, startTime: number}>,
};

type Mapping = Array<?string>;

const getGamepads = (navigator.getGamepads
  ? navigator.getGamepads
  : navigator.webkitGetGamepads
    ? navigator.webkitGetGamepads
    : () => []
).bind(navigator);

const LONG_PRESS_TIME = 500;

// Touch controller buttons: thumbstick, trigger, grip, A/X, B/Y
const MAPPING_SHARED_TOUCH = [
  undefined,
  'confirm',
  undefined,
  'confirm',
  'back',
];
// MS Mixed Reality controller buttons: thumbstick, trigger, grip, menu, trackpad
const MAPPING_SHARED_MSMR = [
  undefined,
  'confirm',
  undefined,
  undefined,
  'confirm',
];
const WELL_KNOWN_MAPPINGS = {
  // Gear VR HMD Touchpad
  'Gear VR Touchpad': ['confirm'],
  // Gear VR Controller
  'Gear VR Controller': ['confirm', 'confirm'],
  // Oculus Go Controller
  'Oculus Go Controller': ['confirm', 'confirm'],
  // Daydream Controller
  'Daydream Controller': ['confirm'],
  // Oculus Touch
  'Oculus Touch (Left)': MAPPING_SHARED_TOUCH,
  'Oculus Touch (Right)': MAPPING_SHARED_TOUCH,
  // Standard MS Mixed Reality
  'Spatial Controller (Spatial Interaction Source) 045E-065B': MAPPING_SHARED_MSMR,
  // Samsung Odyssey
  'Spatial Controller (Spatial Interaction Source) 045E-065D': MAPPING_SHARED_MSMR,
  // TODO: Vive Wand mapping
};

export const STANDARD_MAPPING = [
  'confirm',
  'back',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  'up',
  'down',
  'left',
  'right',
];

const DEFAULT_MAPPING = ['confirm'];

export default class GamepadInputChannel implements InputChannel {
  _customMapping: {[id: string]: Mapping};
  _mappingCache: Array<?Mapping>;
  _previousState: Array<GamepadState>;

  constructor(customMapping: {[id: string]: Mapping} = {}) {
    this._mappingCache = [];
    this._previousState = [];
    this._customMapping = customMapping;

    (this: any)._onGamepadConnected = this._onGamepadConnected.bind(this);
    (this: any)._onGamepadDisconnected = this._onGamepadDisconnected.bind(this);

    window.addEventListener('gamepadconnected', this._onGamepadConnected);
    window.addEventListener('gamepaddisconnected', this._onGamepadDisconnected);
  }

  _getMapping(gamepad: Gamepad, button: number): ?string {
    const index = gamepad.index;
    let cacheEntry = this._mappingCache[index];
    if (!cacheEntry) {
      cacheEntry = this._updateCacheEntry(gamepad);
    }
    return cacheEntry[button] || null;
  }

  mappingLookup(gamepad: Gamepad): Mapping {
    let mapping = this._customMapping[gamepad.id];
    if (mapping) {
      return mapping;
    }
    if (gamepad.mapping === 'standard') {
      return STANDARD_MAPPING;
    }
    mapping = WELL_KNOWN_MAPPINGS[gamepad.id];
    if (mapping) {
      return mapping;
    }
    return DEFAULT_MAPPING;
  }

  _updateCacheEntry(gamepad: Gamepad): Mapping {
    const mapping = this.mappingLookup(gamepad);
    const cacheEntry = new Array(mapping.length);
    for (let btn = 0, len = mapping.length; btn < len; btn++) {
      if (mapping[btn]) {
        cacheEntry[btn] = mapping[btn];
      }
    }
    this._mappingCache[gamepad.index] = cacheEntry;
    return cacheEntry;
  }

  _onGamepadConnected(e: GamepadEvent) {
    this._updateCacheEntry(e.gamepad);
  }

  _onGamepadDisconnected(e: GamepadEvent) {
    const gamepad = e.gamepad;
    this._mappingCache[gamepad.index] = null;
  }

  getEvents(acc: Array<InputEvent>): void {
    const now = Date.now();
    const gamepads = getGamepads();
    for (let id = 0; id < gamepads.length; id++) {
      const source = `gamepad_${id}`;
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
          const pressed =
            typeof buttons[btn] === 'object'
              ? buttons[btn].pressed
              : buttons[btn] === 1.0;
          if (buttonState.pressed !== pressed) {
            if (pressed) {
              buttonState.pressed = true;
              buttonState.startTime = now;
              const event: ButtonEvent = {
                type: 'button',
                button: btn,
                action: 'down',
                source: source,
              };
              const buttonClass = this._getMapping(gamepads[id], btn);
              if (buttonClass) {
                event.buttonClass = buttonClass;
              }
              acc.push(event);
            } else {
              buttonState.pressed = false;
              const event: ButtonEvent = {
                type: 'button',
                button: btn,
                action: 'up',
                source: source,
              };
              const buttonClass = this._getMapping(gamepads[id], btn);
              if (buttonClass) {
                event.buttonClass = buttonClass;
              }
              acc.push(event);
            }
          } else if (pressed && now - buttonState.startTime > LONG_PRESS_TIME) {
            const event: ButtonEvent = {
              type: 'button',
              button: btn,
              action: 'repeat',
              source: source,
            };
            const buttonClass = this._getMapping(gamepads[id], btn);
            if (buttonClass) {
              event.buttonClass = buttonClass;
            }
            acc.push(event);
          }
        }

        // TODO: consider fetching axes change events
      } else {
        if (this._previousState[id]) {
          delete this._previousState[id];
        }
      }
    }
  }
}
