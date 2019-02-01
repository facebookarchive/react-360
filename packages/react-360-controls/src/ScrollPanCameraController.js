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

import {type Quaternion, type Vec3, type CameraController} from './ControlsTypes';

const DEFAULT_FOV = Math.PI / 3;
const HALF_PI = Math.PI / 2;

export default class ScrollPanCameraController implements CameraController {
  _deltaYaw: number;
  _deltaPitch: number;
  _enabled: boolean;
  _frame: HTMLElement;
  _lastX: number;
  _lastY: number;
  _verticalFov: number;

  constructor(frame: HTMLElement, fov: number = DEFAULT_FOV) {
    this._deltaYaw = 0;
    this._deltaPitch = 0;
    this._enabled = true;
    this._frame = frame;
    this._lastX = 0;
    this._lastY = 0;
    this._verticalFov = fov;

    (this: any)._onWheel = this._onWheel.bind(this);
    this._frame.addEventListener('wheel', this._onWheel);
  }

  _onWheel(e: WheelEvent) {
    if (!this._enabled) {
      return;
    }
    const width = this._frame.clientWidth;
    const height = this._frame.clientHeight;
    const aspect = width / height;
    const deltaX = e.deltaX;
    const deltaY = e.deltaY;
    this._deltaPitch += (deltaX / width) * this._verticalFov * aspect;
    this._deltaYaw += (deltaY / height) * this._verticalFov;
    this._deltaYaw = Math.max(-HALF_PI, Math.min(HALF_PI, this._deltaYaw));
    e.preventDefault();
  }

  enable() {
    this._enabled = true;
  }

  disable() {
    this._enabled = false;
  }

  fillCameraProperties(position: Vec3, rotation: Quaternion): boolean {
    if (!this._enabled) {
      return false;
    }

    if (this._deltaPitch === 0 && this._deltaYaw === 0) {
      return false;
    }

    // premultiply the camera rotation by the horizontal (pitch) rotation,
    // then multiply by the vertical (yaw) rotation

    const cp = Math.cos(this._deltaPitch / 2);
    const sp = Math.sin(this._deltaPitch / 2);
    const cy = Math.cos(this._deltaYaw / 2);
    const sy = Math.sin(this._deltaYaw / 2);

    const x1 = rotation[0];
    const y1 = rotation[1];
    const z1 = rotation[2];
    const w1 = rotation[3];

    const x2 = cp * x1 + sp * z1;
    const y2 = cp * y1 + sp * w1;
    const z2 = cp * z1 - sp * x1;
    const w2 = cp * w1 - sp * y1;

    const x3 = w2 * sy + x2 * cy;
    const y3 = y2 * cy + z2 * sy;
    const z3 = -y2 * sy + z2 * cy;
    const w3 = w2 * cy - x2 * sy;

    rotation[0] = x3;
    rotation[1] = y3;
    rotation[2] = z3;
    rotation[3] = w3;

    this._deltaPitch = 0;
    this._deltaYaw = 0;
    return true;
  }
}
