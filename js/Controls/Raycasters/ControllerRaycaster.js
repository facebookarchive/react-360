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

import {rotateByQuaternion} from '../../Utils/Math';
import {type Quaternion, type Vec3} from '../Types';
import {type Raycaster} from './Types';

const TYPE = 'controller';

// Fallback for browsers that don't support a getGamepads interface
const getGamepads: () => Array<Gamepad> =
  typeof navigator.getGamepads === 'function' ? navigator.getGamepads.bind(navigator) : () => [];

const armModelVector = [0, 0, -1];
function basicArmModel(origin: Vec3, orientation: Quaternion, hand: ?string) {
  armModelVector[0] = 0;
  armModelVector[1] = 0;
  armModelVector[2] = -0.4;
  rotateByQuaternion(armModelVector, orientation);

  origin[0] = armModelVector[0] + (hand === 'left' ? -0.3 : 0.3);
  origin[1] = armModelVector[1] - 0.3;
  origin[2] = armModelVector[2];
}

export default class ControllerRaycaster implements Raycaster {
  _enabled: boolean;
  _gamepadID: null | string;
  _gamepadIndex: number;

  constructor() {
    this._enabled = true;
    this._gamepadID = null;
    this._gamepadIndex = -1;

    const initialGamepads = getGamepads();
    // Iterate backwards to pick up the "newest" controller first
    /* eslint-disable-next-line */
    for (let i = initialGamepads.length; i--; ) {
      this._setGamepadIfValid(initialGamepads[i]);
    }

    window.addEventListener('gamepadconnected', e => {
      this._setGamepadIfValid(e.gamepad);
    });
    window.addEventListener('gamepaddisconnected', e => {
      if (this._gamepadID && e.gamepad.id === this._gamepadID) {
        this._setGamepad(null);
      }
    });
  }

  _setGamepadIfValid(gamepad: ?Gamepad) {
    if (!gamepad || this._gamepadID != null) {
      return;
    }
    if (gamepad.pose) {
      this._setGamepad(gamepad);
    }
  }

  _setGamepad(gamepad: ?Gamepad) {
    if (!gamepad) {
      this._gamepadID = null;
      this._gamepadIndex = -1;
      return;
    }

    this._gamepadID = gamepad.id;
    this._gamepadIndex = gamepad.index;
  }

  _getGamepad() {
    const gamepads = getGamepads();
    return gamepads[this._gamepadIndex];
  }

  enable() {
    this._enabled = true;
  }

  disable() {
    this._enabled = false;
  }

  getType(): string {
    return TYPE;
  }

  getMaxLength(): number {
    return Infinity;
  }

  fillDirection(direction: Vec3): boolean {
    if (!this._enabled) {
      return false;
    }
    if (!this._gamepadID) {
      return false;
    }
    const gamepad = this._getGamepad();
    if (!gamepad) {
      return false;
    }
    if (!gamepad.pose || !gamepad.pose.orientation) {
      return false;
    }
    const orientation: Quaternion = (gamepad.pose.orientation: any);
    direction[0] = 0;
    direction[1] = 0;
    direction[2] = -1;
    rotateByQuaternion(direction, orientation);
    return true;
  }

  fillOrigin(origin: Vec3): boolean {
    if (!this._enabled) {
      return false;
    }
    if (!this._gamepadID) {
      return false;
    }
    const gamepad = this._getGamepad();
    if (!gamepad) {
      return false;
    }
    if (!gamepad.pose) {
      return false;
    }
    const pose = gamepad.pose;
    if (!pose.position) {
      if (pose.orientation) {
        basicArmModel(origin, (pose.orientation: any), gamepad.hand);
        return true;
      }
      return false;
    }
    const position = pose.position;
    origin[0] = position[0];
    origin[1] = position[1];
    origin[2] = position[2];
    return true;
  }

  drawsCursor() {
    return true;
  }

  hasAbsoluteCoordinates() {
    return true;
  }
}
