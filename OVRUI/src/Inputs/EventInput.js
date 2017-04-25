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

export default class EventInput {
  _eventType: string;

  constructor(eventType: string) {
    this._eventType = eventType;
  }

  getEventType(): string {
    return this._eventType;
  }
}
