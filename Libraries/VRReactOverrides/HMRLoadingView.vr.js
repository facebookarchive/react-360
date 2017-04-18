/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule HMRLoadingView
 * @flow
 */
'use strict';

class HMRLoadingView {
  static _showing: boolean;

  static showMessage(message: string) {
    if (HMRLoadingView._showing) {
      return;
    }
    console.log('HMR Start');
    console.log(message);
    HMRLoadingView._showing = true;
    setTimeout(() => {
      HMRLoadingView._showing = false;
      console.log('HMR End');
    }, 2000);
  }

  static hide() {
    // noop
  }
}

module.exports = HMRLoadingView;
