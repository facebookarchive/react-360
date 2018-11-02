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

export default class MouseInputChannel implements InputChannel {
  _batchedEvents: Array<ButtonEvent>;

  constructor(target: HTMLElement) {
    this._batchedEvents = [];
    (this: any)._onMouseDown = this._onMouseDown.bind(this);
    (this: any)._onMouseUp = this._onMouseUp.bind(this);

    target.addEventListener('mousedown', this._onMouseDown, true);
    target.addEventListener('mouseup', this._onMouseUp, true);
  }

  _onMouseDown(e: MouseEvent) {
    const event: ButtonEvent = {
      type: 'button',
      button: e.button,
      action: 'down',
      source: 'mouse',
    };
    if (e.button === 0) {
      event.buttonClass = 'confirm';
    }
    this._batchedEvents.push(event);
  }

  _onMouseUp(e: MouseEvent) {
    const event: ButtonEvent = {
      type: 'button',
      button: e.button,
      action: 'up',
      source: 'mouse',
    };
    if (e.button === 0) {
      event.buttonClass = 'confirm';
    }
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
