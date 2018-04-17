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

import {RayCaster} from 'ovrui';
import * as THREE from 'three';
import {createControllerMesh} from './ControllerRenderer';

const LEFT_STATIC_ORIGIN = [-0.3, -0.5, -0.3];
const RIGHT_STATIC_ORIGIN = [0.3, -0.5, -0.3];

type HandType = 'left' | 'right';

type ValidOptions = {
  color?: string,
  hand?: ?HandType,
  scene?: THREE.Scene,
};

// Fallback for browsers that don't support a getGamepads interface
const getGamepads: () => Array<Gamepad> = typeof navigator.getGamepads === 'function'
  ? navigator.getGamepads.bind(navigator)
  : () => [];

export default class ControllerRayCaster extends RayCaster {
  constructor(options: ValidOptions = {}) {
    super();

    const {hand, scene, color} = options;

    if (hand && hand !== 'left' && hand !== 'right') {
      throw new Error('Unsupported controller hand: ' + hand);
    }
    this._hand = hand || null;
    this._gamepadID = null;
    this._gamepadIndex = -1;
    this._type = 'controller';
    if (hand) {
      this._type += '-' + hand;
    }
    this._scene = scene;

    // Preallocate THREE objects
    this._vector = new THREE.Vector3();
    this._controllerQuaternion = new THREE.Quaternion();
    this._cameraQuaternion = new THREE.Quaternion();
    this._mesh = createControllerMesh(color || '#fff');

    const initialGamepads = getGamepads();
    for (let i = 0; i < initialGamepads.length; i++) {
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
    if (!gamepad || this._gamepadID !== null) {
      return;
    }

    if (this._hand) {
      if (this._hand === gamepad.hand) {
        this._setGamepad(gamepad);
      }
    } else if (gamepad.pose) {
      this._setGamepad(gamepad);
    }
  }

  _setGamepad(gamepad: ?Gamepad) {
    if (!gamepad) {
      this._gamepadID = null;
      this._gamepadIndex = -1;
      if (this._scene && this._mesh) {
        this._scene.remove(this._mesh);
      }
      return;
    }

    this._gamepadID = gamepad.id;
    this._gamepadIndex = gamepad.index;
    if (this._scene && this._mesh) {
      if (!gamepad.pose || !gamepad.pose.position) {
        const position = gamepad.hand === 'left' ? LEFT_STATIC_ORIGIN : RIGHT_STATIC_ORIGIN;
        this._mesh.position.set(position[0], position[1], position[2]);
      }
      this._scene.add(this._mesh);
    }
  }

  _getGamepad() {
    const gamepads = getGamepads();
    return gamepads[this._gamepadIndex];
  }

  setColor(color: string) {
    if (this._mesh && this._mesh.material) {
      this._mesh.material.color.set(color);
    }
  }

  getType() {
    return this._type;
  }

  /**
   * Each frame, update the rendered controller in VR space to match the latest
   * orientation data from the gamepad.
   */
  frame() {
    if (!this._gamepadID) {
      return;
    }
    const gamepad = this._getGamepad();
    if (gamepad && gamepad.pose && gamepad.pose.orientation) {
      const orientation = gamepad.pose.orientation;
      const position = gamepad.pose.position;
      if (position) {
        this._mesh.position.set(position[0], position[1], position[2]);
      }
      if (orientation) {
        this._mesh.quaternion.set(orientation[0], orientation[1], orientation[2], orientation[3]);
      }
    }
  }

  getRayOrigin(camera: THREE.Camera) {
    if (!this._gamepadID) {
      return null;
    }
    const gamepad = this._getGamepad();
    if (!gamepad) {
      return null;
    }
    if (gamepad.pose && gamepad.pose.position) {
      const pos = gamepad.pose.position;
      return [pos[0] - camera.position.x, pos[1] - camera.position.y, pos[2] - camera.position.z];
    } else {
      if (gamepad.hand === 'left') {
        return LEFT_STATIC_ORIGIN;
      } else if (gamepad.hand === 'right') {
        return RIGHT_STATIC_ORIGIN;
      }
    }
  }

  getRayDirection(camera: THREE.Camera) {
    if (!this._gamepadID) {
      return null;
    }
    const gamepad = this._getGamepad();
    if (!gamepad) {
      return null;
    }
    if (gamepad.pose && gamepad.pose.orientation) {
      const orientation = gamepad.pose.orientation;
      // Rotate <0, 0, -1> by the controller pose quaternion
      this._vector.set(0, 0, -1);
      this._controllerQuaternion.set(orientation[0], orientation[1], orientation[2], orientation[3]);
      this._cameraQuaternion.copy(camera.quaternion);
      this._cameraQuaternion.inverse();

      this._vector.applyQuaternion(this._controllerQuaternion);
      this._vector.applyQuaternion(this._cameraQuaternion);
      return [this._vector.x, this._vector.y, this._vector.z];
    } else {
      return null;
    }
  }

  drawsCursor() {
    return this._gamepadID != null;
  }
}
