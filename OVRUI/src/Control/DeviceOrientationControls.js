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

/**
 * DeviceOrientationControls allows manipulation of the camera through a
 * mobile device's inner IMU.
 */

import THREE from '../ThreeShim';
import MobilePanControls from './MobilePanControls';

import type {Camera} from 'three';

type DeviceOrientation = {
  alpha?: number,
  beta?: number,
  gamma?: number,
};

type DeviceOrientationEvent = {
  alpha: number,
  beta: number,
  gamma: number,
  absolute: boolean,
};

type DeviceOrientationControlsOptions = {
  disableTouchPanning?: boolean,
};

// Unit vectors
const Y_UNIT = new THREE.Vector3(0, 1, 0);
const Z_UNIT = new THREE.Vector3(0, 0, 1);

// -Pi/2 rotation around the X-axis
const SCREEN_ROTATION = new THREE.Quaternion(-Math.sqrt(0.5), 0, 0, Math.sqrt(0.5));
// Preallocated Quaternion and Euler to use each frame.
const rotation = new THREE.Quaternion();
const euler = new THREE.Euler();

// Return the current screen orientation (landscape, potrait, etc.)
function getScreenOrientation() {
  const orientation = screen.orientation || screen.mozOrientation || screen.msOrientation || {};
  const angle = orientation.angle || window.orientation || 0;
  return THREE.Math.degToRad(angle);
}

export default class DeviceOrientationControls {
  camera: Camera;
  deviceOrientation: DeviceOrientation;
  enabled: boolean;
  mobilePanControls: MobilePanControls;
  screenOrientation: number;
  _initialAlpha: number | null;

  constructor(
    camera: Camera,
    target: Element | void,
    options: DeviceOrientationControlsOptions = {}
  ) {
    this.camera = camera;
    this.enabled = true;
    this.mobilePanControls = new MobilePanControls(camera, target);

    // Allow touch panning unless explicitly disabled.
    if (options.disableTouchPanning) {
      this.mobilePanControls.enabled = false;
    }

    // Screen orientation (potrait, landscape, etc.), in radians
    this.screenOrientation = getScreenOrientation();
    // Device orientation (alpha, beta, gamma axes), in radians
    this.deviceOrientation = {};

    // Ensure that event handlers are bound to this object
    (this: any).orientationChangeHandler = this.orientationChangeHandler.bind(this);
    (this: any).deviceOrientationHandler = this.deviceOrientationHandler.bind(this);

    this._initialAlpha = null;

    this.connect();
  }

  static isSupported() {
    // CONSIDER: Detecting non-mobile scenarios where device orientation can be used (laptops, some tablets)
    return (
      'DeviceOrientationEvent' in window &&
      /Mobi/i.test(navigator.userAgent) &&
      !/OculusBrowser/i.test(navigator.userAgent)
    );
  }

  connect() {
    this.screenOrientation = getScreenOrientation();
    window.addEventListener('orientationchange', this.orientationChangeHandler);
    window.addEventListener('deviceorientation', this.deviceOrientationHandler);
    this.enabled = true;
  }

  disconnect() {
    window.removeEventListener('orientationchange', this.orientationChangeHandler);
    window.removeEventListener('deviceorientation', this.deviceOrientationHandler);
    this.enabled = false;
  }

  orientationChangeHandler() {
    this.screenOrientation = getScreenOrientation();
  }

  deviceOrientationHandler(event: DeviceOrientationEvent) {
    const alpha = THREE.Math.degToRad(event.alpha);
    const beta = THREE.Math.degToRad(event.beta);
    const gamma = THREE.Math.degToRad(event.gamma);
    if (this._initialAlpha === null) {
      this._initialAlpha = alpha - getScreenOrientation();
    }
    this.deviceOrientation.alpha = alpha;
    this.deviceOrientation.beta = beta;
    this.deviceOrientation.gamma = gamma;
  }

  resetRotation(x: number, y: number, z: number) {
    // No-op
  }

  update() {
    if (!this.enabled) {
      return;
    }
    const alpha = this.deviceOrientation.alpha || 0;
    const beta = this.deviceOrientation.beta || 0;
    const gamma = this.deviceOrientation.gamma || 0;
    const orient = this.screenOrientation;

    // Update the camera rotation quaternion
    const quaternion = this.camera.quaternion;
    euler.set(beta, alpha, -gamma, 'YXZ');
    quaternion.setFromEuler(euler);
    if (this._initialAlpha !== null) {
      rotation.setFromAxisAngle(Y_UNIT, -this._initialAlpha);
      quaternion.premultiply(rotation);
    }
    quaternion.multiply(SCREEN_ROTATION); // rotate from device top to a screen normal
    rotation.setFromAxisAngle(Z_UNIT, -orient);
    quaternion.multiply(rotation); // Account for system-level screen rotation

    if (this.mobilePanControls.enabled) {
      this.mobilePanControls.update();
    }
  }
}
