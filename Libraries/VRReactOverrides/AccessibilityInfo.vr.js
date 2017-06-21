/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule AccessibilityInfo
 */

'use strict';

const AccessibilityInfo = {
  fetch(): Promise {
    return new Promise((resolve, reject) => {
      resolve(false);
    });
  },

  addEventListener(eventName: string, handler: Function): void {
    // no-op
  },

  removeEventListener(eventName: string, handler: Function): void {
    // no-op
  },
};

module.exports = AccessibilityInfo;
