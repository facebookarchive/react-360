/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @flow strict
 */

/* global $Values */

import GamepadState, {type EventType as InputEventType} from './GamepadState';
import * as InputEventTypes from './InputEventTypes';

const SourceEventTypes = Object.freeze({
  INPUT_SOURCES_CHANGE: 'inputsourceschange',
  ACTIVE_SOURCE_CHANGE: 'activesourcechange',
});

type GamepadEvent = {gamepadIndex: number};

type SourceEventType = $Values<typeof SourceEventTypes>;
type Callback = (e: GamepadEvent) => void;

const getGamepads = (navigator.getGamepads
  ? navigator.getGamepads
  : navigator.webkitGetGamepads
    ? navigator.webkitGetGamepads
    : () => []
).bind(navigator);

export default class VRInputSource {
  _activeSource: ?GamepadState;
  _gamepads: Array<?GamepadState>;
  _callbacks: {[event: InputEventType | SourceEventType]: Array<Callback>};

  constructor() {
    this._gamepads = [];
    this._activeSource = null;
    const gamepads = getGamepads();
    for (let i = 0; i < gamepads.length; i++) {
      if (gamepads[i] && gamepads[i].pose) {
        const state = new GamepadState(gamepads[i]);
        this._activeSource = state;
        this._gamepads[i] = state;
        this._addGamepadListeners(state);
      } else {
        this._gamepads[i] = null;
      }
    }
    this._callbacks = {};
    for (const key in InputEventTypes) {
      const event = InputEventTypes[key];
      this._callbacks[event] = [];
    }
    for (const key in SourceEventTypes) {
      const event = SourceEventTypes[key];
      this._callbacks[event] = [];
    }

    window.addEventListener('gamepadconnected', e => {
      const gamepad = e.gamepad;
      if (!gamepad.pose) {
        return;
      }
      const state = new GamepadState(gamepad);
      this._addGamepadListeners(state);
      this._gamepads[gamepad.index] = state;
      this._fireCallbacks(SourceEventTypes.INPUT_SOURCES_CHANGE, {gamepadIndex: gamepad.index});
    });
    window.addEventListener('gamepaddisconnected', e => {
      const gamepad = e.gamepad;
      const state = this._gamepads[gamepad.index];
      if (state) {
        state.update(null);
        if (this._activeSource === state) {
          this.setActiveSource(-1);
        }
        this._gamepads[gamepad.index] = null;
        this._fireCallbacks(SourceEventTypes.INPUT_SOURCES_CHANGE, {gamepadIndex: gamepad.index});
      }
    });
  }

  _addGamepadListeners(gamepad: GamepadState) {
    for (const key in InputEventTypes) {
      const event = InputEventTypes[key];
      gamepad.addEventListener(event, e => {
        this._fireCallbacks(event, e);
      });
    }
  }

  _fireCallbacks(event: InputEventType | SourceEventType, payload: GamepadEvent) {
    const callbacks = this._callbacks[event];
    for (const cb of callbacks) {
      cb(payload);
    }
    if (event === InputEventTypes.PRESS_START) {
      this.setActiveSource(payload.gamepadIndex);
    }
  }

  addEventListener(event: SourceEventType | InputEventType, cb: Callback) {
    if (event in this._callbacks) {
      this._callbacks[event].push(cb);
    }
  }

  getGamepadState(index: number): ?GamepadState {
    return this._gamepads[index];
  }

  setActiveSource(index: number) {
    if (index < 0) {
      if (this._activeSource) {
        this._activeSource = null;
        this._fireCallbacks(SourceEventTypes.ACTIVE_SOURCE_CHANGE, {gamepadIndex: -1});
      }
    }
    const source = this._gamepads[index];
    if (source) {
      if (this._activeSource === source) {
        return;
      }
      this._activeSource = source;
      this._fireCallbacks(SourceEventTypes.ACTIVE_SOURCE_CHANGE, {gamepadIndex: index});
    }
  }

  /**
   * Return the GamepadState that is currently considered active (last used)
   * If there is no connected VR gamepad, this will return null
   */
  getActiveSource() {
    return this._activeSource;
  }

  /**
   * Detect gamepad changes since last update. This should be called every frame
   */
  update() {
    const gamepads = getGamepads();
    for (let i = 0; i < gamepads.length; i++) {
      if (this._gamepads[i]) {
        this._gamepads[i].update(gamepads[i]);
      }
    }
  }
}
