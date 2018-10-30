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

import {Math as GLMath} from 'webgl-ui';
import {type Quaternion, type Vec3} from '../Types';
import {type CameraController} from './Types';
const {
  quaternionMultiply,
  quaternionPremultiply,
  setQuatFromEuler,
  setQuatFromXRotation,
  setQuatFromYRotation,
  setQuatFromZRotation,
} = GLMath;

const DEFAULT_FOV = Math.PI / 6;
const DEG_TO_RAD = Math.PI / 180;
const HALF_PI = Math.PI / 2;
const TWO_PI = Math.PI * 2;
const SCREEN_ROTATION = [-Math.sqrt(0.5), 0, 0, Math.sqrt(0.5)];

type DeviceOrientationEvent = {
  absolute: boolean,
  alpha: number,
  beta: number,
  gamma: number,
};

function getScreenOrientation(): number {
  const orientation = screen.orientation || screen.mozOrientation || screen.msOrientation || {};
  const angle = orientation.angle || window.orientation || 0;
  return ((angle: any): number) * DEG_TO_RAD;
}

function isSupported() {
  return (
    'DeviceOrientationEvent' in window &&
    /Mobi/i.test(navigator.userAgent) &&
    !/OculusBrowser/i.test(navigator.userAgent)
  );
}

/**
 * Camera controls linked to device orientation.
 * Allows a "Magic Window" effect, where users rotate a mobile device to see
 * different parts of a 360 world.
 * Additionally, it listens to touches, and updates an orientation offset
 * based on those touches.
 */
export default class DeviceOrientationCameraController implements CameraController {
  _alpha: null | number;
  _beta: null | number;
  _dragging: boolean;
  _enabled: boolean;
  _frame: HTMLElement;
  _gamma: null | number;
  _lastX: number;
  _lastY: number;
  _offsetPitch: number;
  _offsetPitchQuat: Quaternion;
  _offsetYaw: number;
  _offsetYawQuat: null | Quaternion;
  _screenOrientation: Quaternion;
  _verticalFov: number;

  constructor(frame: HTMLElement, fov: number = DEFAULT_FOV) {
    this._alpha = null;
    this._beta = null;
    this._dragging = false;
    this._gamma = null;
    this._enabled = isSupported();
    this._frame = frame;
    this._lastX = 0;
    this._lastY = 0;
    this._screenOrientation = [0, 0, 0, 1];
    this._onOrientationChange(); // Set initial screen orientation quat
    this._verticalFov = fov;
    this._offsetYaw = 0;
    this._offsetPitch = 0;
    this._offsetYawQuat = null;
    this._offsetPitchQuat = [0, 0, 0, 1];
    setQuatFromXRotation(this._offsetPitchQuat, 0);

    (this: any)._onOrientationChange = this._onOrientationChange.bind(this);
    (this: any)._onDeviceOrientation = this._onDeviceOrientation.bind(this);
    (this: any)._onTouchStart = this._onTouchStart.bind(this);
    (this: any)._onTouchMove = this._onTouchMove.bind(this);
    (this: any)._onTouchEnd = this._onTouchEnd.bind(this);

    window.addEventListener('orientationchange', this._onOrientationChange);
    window.addEventListener('deviceorientation', this._onDeviceOrientation);
    this._frame.addEventListener('touchstart', this._onTouchStart);
    this._frame.addEventListener('touchmove', this._onTouchMove);
    this._frame.addEventListener('touchcancel', this._onTouchEnd);
    this._frame.addEventListener('touchend', this._onTouchEnd);
  }

  _onOrientationChange() {
    const angle = getScreenOrientation();
    // build a quaternion that accounts for screen orientation ("top" is
    // different from physical top of device), and for the transform necessary
    // to rotate the device top into a screen normal
    setQuatFromZRotation(this._screenOrientation, -angle);
    quaternionPremultiply(this._screenOrientation, SCREEN_ROTATION);
  }

  _onDeviceOrientation(event: DeviceOrientationEvent) {
    const alpha = event.alpha * DEG_TO_RAD;
    const beta = event.beta * DEG_TO_RAD;
    const gamma = event.gamma * DEG_TO_RAD;
    if (this._offsetYawQuat == null) {
      const alphaOffset = getScreenOrientation() - alpha;
      this._offsetYawQuat = [0, 0, 0, 1];
      this._offsetYaw = alphaOffset;
    }
    this._alpha = alpha;
    this._beta = beta;
    this._gamma = gamma;
  }

  _onTouchStart(e: TouchEvent) {
    if (!this._enabled) {
      return;
    }
    this._dragging = true;
    this._lastX = e.changedTouches[0].clientX;
    this._lastY = e.changedTouches[0].clientY;
    e.preventDefault();
  }

  _onTouchMove(e: TouchEvent) {
    if (!this._enabled || !this._dragging) {
      return;
    }
    const x = e.changedTouches[0].clientX;
    const y = e.changedTouches[0].clientY;
    const dx = x - this._lastX;
    const dy = y - this._lastY;
    this._lastX = x;
    this._lastY = y;
    const width = this._frame.clientWidth;
    const height = this._frame.clientHeight;
    const aspect = width / height;
    if (Math.abs(dx) >= Math.abs(dy)) {
      // Horizontal pan
      this._offsetYaw += (dx / width) * this._verticalFov * aspect;
      if (this._offsetYaw > TWO_PI) {
        this._offsetYaw -= TWO_PI;
      } else if (this._offsetYaw < 0) {
        this._offsetYaw += TWO_PI;
      }
    } else {
      // Vertical pan
      this._offsetPitch += (dy / height) * this._verticalFov;
      if (this._offsetPitch > HALF_PI) {
        this._offsetPitch = HALF_PI;
      } else if (this._offsetPitch < -HALF_PI) {
        this._offsetPitch = -HALF_PI;
      }
    }
    e.preventDefault();
  }

  _onTouchEnd(e: TouchEvent) {
    if (!this._enabled) {
      return;
    }
    this._dragging = false;
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

    const alpha = this._alpha;
    const beta = this._beta;
    const gamma = this._gamma;

    if (alpha == null || beta == null || gamma == null) {
      // No device orientation event has been received yet
      return false;
    }

    setQuatFromEuler(rotation, beta || 0, alpha || 0, -(gamma || 0));
    setQuatFromXRotation(this._offsetPitchQuat, this._offsetPitch);
    quaternionMultiply(rotation, this._offsetPitchQuat);
    const yawQuat = this._offsetYawQuat;
    if (yawQuat) {
      setQuatFromYRotation(yawQuat, this._offsetYaw);
      quaternionPremultiply(rotation, yawQuat);
    }
    quaternionMultiply(rotation, this._screenOrientation);
    return true;
  }
}
