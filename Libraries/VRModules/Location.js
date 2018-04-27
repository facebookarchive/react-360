/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule Location
 * @flow
 */

'use strict';

const RCTLocation = require('NativeModules').Location;

/**
 * Location implements window.location for the React context
 */
class Location {
  /**
   * Reload the current page. The optional boolean parameter determines whether
   * the cache is bypassed.
   * @param forceReload - If true, the cache will be ignored on reload
   */
  reload(forceReload: boolean) {
    RCTLocation.reload(forceReload);
  }

  /**
   * Replace the current location, without affecting the History stack.
   * @param replace - The location to navigate to
   */
  replace(url: string) {
    RCTLocation.replace(url);
  }
}

const LocationInst = new Location();
module.exports = LocationInst;
