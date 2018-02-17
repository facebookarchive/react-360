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

type Touch = {
  identifier: number,
  target: EventTarget,
  viewportX: number,
  viewportY: number,
};

export type TouchInputEvent = {
  eventType: string,
  altKey: boolean,
  changedTouches: Array<Touch>,
  ctrlKey: boolean,
  metaKey: boolean,
  shiftKey: boolean,
  targetTouches: Array<Touch>,
  touches: Array<Touch>,
};

const TOUCH_EVENTS = ['touchcancel', 'touchend', 'touchmove', 'touchstart'];

function getDocumentBounds() {
  return {
    top: 0,
    left: 0,
    width: document.body ? document.body.clientWidth : 0,
    height: document.body ? document.body.clientHeight : 0,
  };
}

function createTouchList(rawList, viewport) {
  const touchList = [];
  for (let i = 0; i < rawList.length; i++) {
    const touch = rawList[i];
    const viewportX = (touch.clientX - viewport.left) / viewport.width * 2 - 1;
    const viewportY = -((touch.clientY - viewport.top) / viewport.height) * 2 + 1;
    touchList.push({
      identifier: touch.identifier,
      target: touch.target,
      viewportX: viewportX,
      viewportY: viewportY,
    });
  }

  return touchList;
}

export default class TouchEventInput extends EventInput {
  _batchedEvents: Array<TouchInputEvent>;
  _target: Document | Element;
  _immediateListener: ?(event: TouchInputEvent) => any;

  constructor(target?: Document | Element) {
    super('TouchInputEvent');
    this._batchedEvents = [];
    this._target = target || document;
    (this: any)._onTouchEvent = this._onTouchEvent.bind(this);

    this._addEventListeners();
    this._immediateListener = null;
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

  setImmediateListener(listener: (e: TouchInputEvent) => any) {
    this._immediateListener = listener;
  }

  _addEventListeners() {
    for (const type of TOUCH_EVENTS) {
      this._target.addEventListener(type, this._onTouchEvent, true);
    }
  }

  _removeEventListeners() {
    for (const type of TOUCH_EVENTS) {
      this._target.removeEventListener(type, this._onTouchEvent, true);
    }
  }

  _onTouchEvent(e: TouchEvent) {
    e.preventDefault();
    const target = e.currentTarget;
    if (target && target === this._target) {
      const viewport = typeof target.getBoundingClientRect === 'function'
        ? target.getBoundingClientRect()
        : getDocumentBounds();
      const touchEvent: Object = {
        type: this.getEventType(),
        eventType: e.type,
        altKey: e.altKey,
        changedTouches: createTouchList(e.changedTouches, viewport),
        ctrlKey: e.ctrlKey,
        metaKey: e.metaKey,
        shiftKey: e.shiftKey,
        targetTouches: createTouchList((e: any).targetTouches, viewport),
        touches: createTouchList(e.touches, viewport),
        buttonClass: 'confirm',
      };
      // New event fields
      if (e.type === 'touchstart') {
        touchEvent.action = 'down';
      } else if (e.type === 'touchend' || e.type === 'touchcancel') {
        touchEvent.action = 'up';
      }
      this._batchedEvents.push(touchEvent);
      if (this._immediateListener) {
        this._immediateListener(touchEvent);
      }
    }
  }

  getEvents() {
    const events = this._batchedEvents;
    if (events.length < 1) {
      return null;
    }
    this._batchedEvents = [];
    return events;
  }
}
