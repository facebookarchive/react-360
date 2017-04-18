/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

/**
 * Generate Media Events for React VR, only useful subset of attributes
 * of a HTMLMediaEvent will be extracted.
 * @constructor
 * @param {event} Event - the original media event
 */

export default class MediaEvent {
  constructor(event: Object) {
    this.type = event.type;
    this.timeStamp = event.timeStamp;
    if (event.target) {
      this.target = {};
      this.target.currentTime = event.target.currentTime;
      this.target.duration = event.target.duration;
      this.target.ended = event.target.ended;
      this.target.error = event.target.error;
    }
  }
}
