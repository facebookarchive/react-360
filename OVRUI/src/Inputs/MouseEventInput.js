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

const MOUSE_EVENTS = [
  'mousedown',
  'mouseup',
  'click',
  'dblclick',
  'mousemove',
  'mouseenter',
  'mouseleave',
  'wheel',
];

export type MouseInputEvent = {
  eventType: string,
  altKey: boolean,
  button: number,
  buttons: number,
  ctrlKey: boolean,
  metaKey: boolean,
  shiftKey: boolean,
  viewportX: number,
  viewportY: number,
};

function getDocumentBounds() {
  return {
    top: 0,
    left: 0,
    width: document.body ? document.body.clientWidth : 0,
    height: document.body ? document.body.clientHeight : 0,
  };
}

export default class MouseEventInput extends EventInput {
  _batchedEvents: Array<MouseInputEvent>;
  _target: Document | Element;

  constructor(target?: Document | Element) {
    super('MouseInputEvent');
    this._batchedEvents = [];
    this._target = target || document;
    (this: any)._onMouseEvent = this._onMouseEvent.bind(this);

    this._addEventListeners();
  }

  getTarget() {
    return this._target;
  }

  setTarget(target: Document | Element) {
    if (this._target) {
      this._removeEventListeners();
    }
    this._target = target;
    this._addEventListeners();
  }

  _addEventListeners() {
    for (const type of MOUSE_EVENTS) {
      this._target.addEventListener(type, this._onMouseEvent, true);
    }
  }

  _removeEventListeners() {
    for (const type of MOUSE_EVENTS) {
      this._target.removeEventListener(type, this._onMouseEvent, true);
    }
  }

  _onMouseEvent(e: MouseEvent) {
    const target = e.currentTarget;
    if (target && target === this._target) {
      const viewport =
        typeof target.getBoundingClientRect === 'function'
          ? target.getBoundingClientRect()
          : getDocumentBounds();
      const viewportX = (e.clientX - viewport.left) / viewport.width * 2 - 1;
      const viewportY = -((e.clientY - viewport.top) / viewport.height) * 2 + 1;
      const event = {
        type: this.getEventType(),
        eventType: e.type,
        altKey: e.altKey,
        button: e.button,
        buttons: e.buttons,
        ctrlKey: e.ctrlKey,
        metaKey: e.metaKey,
        shiftKey: e.shiftKey,
        viewportX: viewportX,
        viewportY: viewportY,
      };
      // New event fields
      if (e.type === 'mousedown') {
        event.action = 'down';
      } else if (e.type === 'mouseup') {
        event.action = 'up';
      }
      if (e.button === 0) {
        event.buttonClass = 'confirm';
      }
      this._batchedEvents.push(event);
    }
  }

  getEvents(): null | Array<MouseInputEvent> {
    const events = this._batchedEvents;
    if (events.length < 1) {
      return null;
    }
    this._batchedEvents = [];
    return events;
  }
}
