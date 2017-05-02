/**
 * Copyright (c) 2016-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import RayCaster from './RayCaster';

const ORIGIN = [0, 0, 0];

export default class MouseRayCaster extends RayCaster {
  constructor() {
    super();
    this._lastX = null;
    this._lastY = null;
    this._lastOrientation = null;
    this.touchReleaseDelay = 300;

    this._active = true;

    this._handleMouseEvent = this._handleMouseEvent.bind(this);
    this._handleTouchEvent = this._handleTouchEvent.bind(this);
    this._handleTouchEnd = this._handleTouchEnd.bind(this);
    this._resetLastReading = this._resetLastReading.bind(this);

    document.addEventListener('mousemove', this._handleMouseEvent);
    document.addEventListener('touchstart', this._handleTouchEvent);
    document.addEventListener('touchmove', this._handleTouchEvent);
    document.addEventListener('touchend', this._handleTouchEnd);
    document.addEventListener('touchcancel', this._handleTouchEnd);
    window.addEventListener('vrdisplaypresentchange', e => {
      // Disable the mouse when in headset, re-enable when leaving
      this._active = !e.display.isPresenting;
    });
  }

  _handleMouseEvent(e) {
    if (!this._active) {
      return;
    }
    const width = document.body ? document.body.clientWidth : 0;
    const height = document.body ? document.body.clientHeight : 0;
    const x = e.clientX / width * 2 - 1;
    const y = -(e.clientY / height) * 2 + 1;
    if (this._lastX !== x || this._lastY !== y) {
      this._lastOrientation = null;
    }
    this._lastX = x;
    this._lastY = y;
  }

  _handleTouchEvent(e) {
    if (!this._active) {
      return;
    }
    const targetTouches = e.targetTouches;
    if (targetTouches && targetTouches.length > 0) {
      const width = document.body ? document.body.clientWidth : 0;
      const height = document.body ? document.body.clientHeight : 0;
      const rawTouch = e.targetTouches[0];
      const x = rawTouch.clientX / width * 2 - 1;
      const y = -(rawTouch.clientY / height) * 2 + 1;
      if (this._lastX !== x || this._lastY !== y) {
        this._lastOrientation = null;
      }
      this._lastX = x;
      this._lastY = y;
    } else {
      this._endTouch();
    }
  }

  _handleTouchEnd(e) {
    if (!this._active) {
      return;
    }
    this._endTouch();
  }

  _endTouch() {
    if (this._touchReleaseTimeout) {
      clearTimeout(this._touchReleaseTimeout);
    }
    this._touchReleaseTimeout = setTimeout(this._resetLastReading, this.touchReleaseDelay);
  }

  _resetLastReading() {
    this._lastX = null;
    this._lastY = null;
    this._lastOrientation = null;
  }

  _clearTouchReleaseTimeout() {
    if (this._touchReleaseTimeout) {
      clearTimeout(this._touchReleaseTimeout);
    }
    this._touchReleaseTimeout = null;
  }

  getType() {
    return 'mouse';
  }

  getRayOrigin() {
    if (!this._active) {
      return null;
    }
    return ORIGIN;
  }

  getRayDirection(camera) {
    if (!this._active) {
      return null;
    }
    if (this._lastOrientation) {
      return this._lastOrientation;
    }
    if (this._lastX === null || this._lastY === null) {
      return null;
    }
    const fov = camera.fov * Math.PI / 180;
    const tan = Math.tan(fov / 2);
    const x = camera.aspect * tan * this._lastX;
    const y = tan * this._lastY;
    const mag = Math.sqrt(1 + x * x + y * y);
    this._lastOrientation = [x / mag, y / mag, -1 / mag];
    return this._lastOrientation;
  }

  drawsCursor() {
    return false;
  }
}
