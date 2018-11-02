/**
 * Copyright (c) 2016-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

export const GuiSysEventType = {
  HIT_CHANGED: 'HIT_CHANGED',
  INPUT_EVENT: 'INPUT_EVENT',
};

export class GuiSysEvent {
  constructor(eventType, args) {
    this.type = 'GuiSysEvent';
    this.eventType = eventType;
    this.args = args;
  }
}

export const UIViewEventType = {
  FOCUS_LOST: 'FOCUS_LOST',
  FOCUS_GAINED: 'FOCUS_GAINED',
};

export class UIViewEvent {
  constructor(view, eventType, args) {
    this.type = 'UIViewEvent';
    this.view = view;
    this.eventType = eventType;
    this.args = args;
  }
}
