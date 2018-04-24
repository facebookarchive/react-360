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

import {type Vec3} from '../Types';
import {type Raycaster} from './Types';

const TYPE = 'touch';
const TOUCH_RELEASE_DELAY = 300;

export default class TouchRaycaster implements Raycaster {
  _enabled: boolean;
  _fov: number;
  _frame: HTMLElement;
  _lastX: number | null;
  _lastY: number | null;
  _touchReleaseTimeout: null | TimeoutID;

  constructor(frame: HTMLElement, fov: number = 60) {
    this._enabled = true;
    this._fov = fov;
    this._frame = frame;
    this._lastX = null;
    this._lastY = null;
    this._touchReleaseTimeout = null;

    (this: any)._onTouchMove = this._onTouchMove.bind(this);
    (this: any)._onTouchEnd = this._onTouchEnd.bind(this);
    (this: any)._resetLastReading = this._resetLastReading.bind(this);

    frame.addEventListener('touchstart', this._onTouchMove);
    frame.addEventListener('touchmove', this._onTouchMove);
    frame.addEventListener('touchend', this._onTouchEnd);
    frame.addEventListener('touchcancel', this._onTouchEnd);
  }

  _onTouchMove(e: TouchEvent) {
    if (!this._enabled) {
      return;
    }
    const {targetTouches} = e;
    if (!targetTouches || targetTouches.length < 1) {
      this._endTouch();
      return;
    }
    const width = this._frame.clientWidth;
    const height = this._frame.clientHeight;
    const rawTouch = e.targetTouches[0];
    let localX = rawTouch.pageX;
    let localY = rawTouch.pageY;
    let frame = this._frame;
    while (frame && frame instanceof HTMLElement) {
      localX -= frame.offsetLeft;
      localY -= frame.offsetTop;
      frame = frame.parentNode;
    }
    const x = localX / width * 2 - 1;
    const y = -(localY / height) * 2 + 1;
    this._lastX = x;
    this._lastY = y;
  }

  _onTouchEnd(e: TouchEvent) {
    if (!this._enabled) {
      return;
    }
    this._endTouch();
  }

  _endTouch() {
    if (this._touchReleaseTimeout) {
      clearTimeout(this._touchReleaseTimeout);
    }
    // Set a timeout before clearing the last position. This accounts for the
    // finger briefly leaving the screen.
    this._touchReleaseTimeout = setTimeout(
      this._resetLastReading,
      TOUCH_RELEASE_DELAY,
    );
  }

  _resetLastReading() {
    this._lastX = null;
    this._lastY = null;
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
    const lastX = this._lastX;
    const lastY = this._lastY;
    if (lastX === null || lastY === null) {
      return false;
    }

    const fov = this._fov * Math.PI / 180;
    const tan = Math.tan(fov / 2);
    const aspect = this._frame.clientWidth / this._frame.clientHeight;
    const x = aspect * tan * lastX;
    const y = tan * lastY;
    const mag = Math.sqrt(1 + x * x + y * y);
    direction[0] = x / mag;
    direction[1] = y / mag;
    direction[2] = -1 / mag;

    return true;
  }

  fillOrigin(origin: Vec3): boolean {
    if (!this._enabled) {
      return false;
    }
    origin[0] = 0;
    origin[1] = 0;
    origin[2] = 0;

    return true;
  }

  drawsCursor() {
    return false;
  }

  hasAbsoluteCoordinates() {
    return false;
  }
}
