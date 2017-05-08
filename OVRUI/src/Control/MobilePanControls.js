/**
 * Copyright (c) 2016-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import THREE from '../ThreeShim';

// Unit vector
const Y_UNIT = new THREE.Vector3(0, 1, 0);

// Preallocated Quaternion to use each frame.
const rotation = new THREE.Quaternion();

// Emperically determined multiplier
const PAN_SPEED = 0.5;

/**
 * MobilePanControls allows manipulation of the camera with touch on mobile.
 */
export default class MobilePanControls {
  /**
   * Create a MobilePanControls instance, and attaches the necessary event
   * listeners
   * @param camera - A Three.js Camera to control
   * @param target - An optional DOM element to attach the mouse events to.
   *   Defaults to the `window` object.
   */
  constructor(camera, target) {
    this._camera = camera;
    this._target = target || window;

    this.enabled = true;

    this._panStart = new THREE.Vector2();
    this._panEnd = new THREE.Vector2();
    this._panDelta = new THREE.Vector2();
    this._theta = 0;
    this._tracking = false;

    // Ensure that event handlers are bound to this object
    this._downHandler = this._downHandler.bind(this);
    this._moveHandler = this._moveHandler.bind(this);
    this._upHandler = this._upHandler.bind(this);

    this.connect();
  }

  connect() {
    this._target.addEventListener('touchstart', this._downHandler);
    window.addEventListener('touchmove', this._moveHandler);
    window.addEventListener('touchend', this._upHandler);
    this.enabled = true;

    // Should start untracked.
    this._tracking = false;
  }

  disconnect() {
    this._target.removeEventListener('touchstart', this._downHandler);
    window.removeEventListener('touchmove', this._moveHandler);
    window.removeEventListener('touchend', this._upHandler);
    this.enabled = false;
  }

  _downHandler(e) {
    // Ignore if multiple touches
    if (e.touches.length !== 1) {
      return;
    }
    const touch = e.touches[0];
    this._panStart.set(touch.pageX, touch.pageY);
    this._tracking = true;
  }

  _upHandler() {
    this._tracking = false;
  }

  _moveHandler(e) {
    if (!this._tracking) {
      return;
    }

    const touch = e.touches[0];
    this._panEnd.set(touch.pageX, touch.pageY);
    this._panDelta.subVectors(this._panEnd, this._panStart);
    this._panStart.copy(this._panEnd);

    // Invert rotation so we pan in correct direction
    this._panDelta.x *= -1;

    const element = document.body;
    this._theta += 2 * Math.PI * this._panDelta.x / element.clientWidth * PAN_SPEED;
  }

  update() {
    if (!this.enabled) {
      return;
    }

    // Update the camera rotation quaternion
    const quaternion = this._camera.quaternion;
    rotation.setFromAxisAngle(Y_UNIT, -this._theta);
    quaternion.premultiply(rotation);
  }
}
