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

import EventInput from './EventInput';

const KEYBOARD_EVENTS = ['keydown', 'keypress', 'keyup'];

export type KeyboardInputEvent = {
  eventType: string,
  altKey: boolean,
  code: string,
  ctrlKey: boolean,
  key: string,
  keyCode: number,
  metaKey: boolean,
  repeat: boolean,
  shiftKey: boolean,
};

export default class KeyboardEventInput extends EventInput {
  _batchedEvents: Array<KeyboardInputEvent>;

  constructor() {
    super('KeyboardInputEvent');
    this._batchedEvents = [];
    (this: any)._onKeyboardEvent = this._onKeyboardEvent.bind(this);

    this._addEventListeners();
  }

  _addEventListeners() {
    for (const type of KEYBOARD_EVENTS) {
      window.addEventListener(type, this._onKeyboardEvent, true);
    }
  }

  _removeEventListeners() {
    for (const type of KEYBOARD_EVENTS) {
      window.removeEventListener(type, this._onKeyboardEvent, true);
    }
  }

  _onKeyboardEvent(e: KeyboardEvent) {
    this._batchedEvents.push({
      type: this.getEventType(),
      eventType: e.type,
      altKey: e.altKey,
      code: e.code,
      ctrlKey: e.ctrlKey,
      key: e.key,
      keyCode: e.keyCode,
      metaKey: e.metaKey,
      repeat: e.repeat,
      shiftKey: e.shiftKey,
    });
  }

  getEvents(): null | Array<KeyboardInputEvent> {
    const events = this._batchedEvents;
    if (events.length < 1) {
      return null;
    }
    this._batchedEvents = [];
    return events;
  }
}
