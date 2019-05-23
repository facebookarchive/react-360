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

import type VRInputSource from 'vr-input-source';
import {Math as GLMath} from 'webgl-ui';
const {rotateByQuaternion} = GLMath;

const TYPE = 'controller';

export default class ControllerRaycaster {
  _enabled: boolean;
  _gamepadID: null | string;
  _gamepadIndex: number;
  _inputSource: VRInputSource;

  constructor(inputSource: VRInputSource) {
    this._inputSource = inputSource;
    this._enabled = true;
    this._gamepadID = null;
    this._gamepadIndex = -1;
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

  fillDirection(direction: [number, number, number]): boolean {
    if (!this._enabled) {
      return false;
    }
    const source = this._inputSource.getActiveSource();
    if (!source) {
      return false;
    }
    const orientation = source.getOrientation();
    direction[0] = 0;
    direction[1] = 0;
    direction[2] = -1;
    rotateByQuaternion(direction, orientation);
    return true;
  }

  fillOrigin(origin: [number, number, number]): boolean {
    if (!this._enabled) {
      return false;
    }
    const source = this._inputSource.getActiveSource();
    if (!source) {
      return false;
    }
    const position = source.getPosition();
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
