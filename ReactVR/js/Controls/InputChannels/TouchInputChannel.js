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

import type {ButtonEvent, InputEvent, InputChannel} from './Types';

export default class TouchInputChannel implements InputChannel {
  _batchedEvents: Array<ButtonEvent>;

  constructor(target: HTMLElement) {
    this._batchedEvents = [];
    (this: any)._onTouchStart = this._onTouchStart.bind(this);
    (this: any)._onTouchEnd = this._onTouchEnd.bind(this);

    target.addEventListener('touchstart', this._onTouchStart, true);
    target.addEventListener('touchend', this._onTouchEnd, true);
    target.addEventListener('touchcancel', this._onTouchEnd, true);
  }

  _onTouchStart(e: TouchEvent) {
    const event: ButtonEvent = {
      type: 'button',
      button: 0,
      action: 'down',
      source: 'touch',
      buttonClass: 'confirm',
    };
    this._batchedEvents.push(event);
  }

  _onTouchEnd(e: TouchEvent) {
    const event: ButtonEvent = {
      type: 'button',
      button: 0,
      action: 'up',
      source: 'mouse',
      buttonClass: 'confirm',
    };
    this._batchedEvents.push(event);
  }

  getEvents(acc: Array<InputEvent>): void {
    const events = this._batchedEvents;
    for (let i = 0, len = events.length; i < len; i++) {
      acc.push(events[i]);
    }
    events.length = 0;
  }
}
