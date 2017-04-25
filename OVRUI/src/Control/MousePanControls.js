/**
 * Copyright (c) 2016-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

const HALF_PI = Math.PI / 2;
const RADIAN_CONVERT = Math.PI / 180;

/**
 * MousePanControls allows manipulation of the camera through clicking and
 * dragging the mouse on a desktop
 */
export default class MousePanControls {
  /**
   * Create a MousePanControls instance, and attaches the necessary event
   * listeners
   * @param camera - A Three.js Camera to control
   * @param target - An optional DOM element to attach the mouse events to.
   *   Defaults to the `window` object.
   */
  constructor(camera, target) {
    this.yaw = camera.rotation.y;
    this.pitch = camera.rotation.x;
    this.camera = camera;
    this.enabled = true;
    this.tracking = false;
    this.target = target || window;

    // Ensure that event handlers are bound to this object
    this.mouseDownHandler = this.mouseDownHandler.bind(this);
    this.mouseMoveHandler = this.mouseMoveHandler.bind(this);
    this.mouseUpHandler = this.mouseUpHandler.bind(this);

    this.connect();
  }

  connect() {
    this.target.addEventListener('mousedown', this.mouseDownHandler);
    window.addEventListener('mousemove', this.mouseMoveHandler);
    window.addEventListener('mouseup', this.mouseUpHandler);
    this.enabled = true;

    // Should start untracked.
    this.tracking = false;
  }

  disconnect() {
    this.target.removeEventListener('mousedown', this.mouseDownHandler);
    window.removeEventListener('mousemove', this.mouseMoveHandler);
    window.removeEventListener('mouseup', this.mouseUpHandler);
    this.enabled = false;
  }

  mouseDownHandler(e) {
    this.tracking = true;
    this.lastX = e.screenX;
    this.lastY = e.screenY;
  }

  mouseUpHandler() {
    this.tracking = false;
  }

  mouseMoveHandler(e) {
    if (!this.tracking) {
      return;
    }

    let width = window.innerWidth;
    let height = window.innerHeight;
    if (this.target !== window) {
      width = this.target.clientWidth;
      height = this.target.clientHeight;
    }
    const deltaX = e.screenX - this.lastX;
    const deltaY = e.screenY - this.lastY;
    this.lastX = e.screenX;
    this.lastY = e.screenY;
    this.yaw += deltaX / width * this.camera.fov * this.camera.aspect * RADIAN_CONVERT;
    this.pitch += deltaY / height * this.camera.fov * RADIAN_CONVERT;
    this.pitch = Math.max(-HALF_PI, Math.min(HALF_PI, this.pitch));
  }

  resetRotation(x, y, z) {
    this.yaw = y;
    this.pitch = x;
  }

  update() {
    if (!this.enabled) {
      return;
    }
    this.camera.rotation.set(this.pitch, this.yaw, 0, 'YXZ');
  }
}
