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

export default class KeyboardInputChannel implements InputChannel {
  _batchedEvents: Array<ButtonEvent>;
  _mapping: Array<?string>;

  constructor(customMapping: Array<?string> = []) {
    this._batchedEvents = [];
    this._mapping = [];
    this._mapping[13] = 'confirm'; // Enter
    this._mapping[32] = 'confirm'; // Spacebar
    for (let key = 0, len = customMapping.length; key < len; key++) {
      if (key in customMapping) {
        this._mapping[key] = customMapping[key];
      }
    }
    (this: any)._onKeyDown = this._onKeyDown.bind(this);
    (this: any)._onKeyUp = this._onKeyUp.bind(this);

    window.addEventListener('keydown', this._onKeyDown, true);
    window.addEventListener('keyup', this._onKeyUp, true);
  }

  _onKeyDown(e: KeyboardEvent) {
    const code = e.keyCode;
    if (!code) {
      return;
    }
    const event: ButtonEvent = {
      type: 'button',
      button: code,
      action: e.repeat ? 'repeat' : 'down',
      source: 'keyboard',
    };
    const buttonClass = this._mapping[code];
    if (buttonClass) {
      event.buttonClass = buttonClass;
    }
    this._batchedEvents.push(event);
  }

  _onKeyUp(e: KeyboardEvent) {
    const code = e.keyCode;
    if (!code) {
      return;
    }
    const event: ButtonEvent = {
      type: 'button',
      button: code,
      action: 'up',
      source: 'keyboard',
    };
    const buttonClass = this._mapping[code];
    if (buttonClass) {
      event.buttonClass = buttonClass;
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
