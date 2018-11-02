/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ControllerInfo
 * @flow
 */

'use strict';

const RCTControllerInfo = require('NativeModules').ControllerInfo;

/**
 * ControllerInfo exposes information about connected gamepads and controllers.
 * It should be used to respond to controller connect / disconnect events, and
 * extracting static information about controllers (unique identifiers, button
 * and axis counts, left vs right hand, etc).
 * For controller button states and poses, rely on React VR's input events and
 * ray caster systems.
 */
class ControllerInfo {
  /**
 * Get the current information from all connected controllers.
 * Resolves with an array of controller information objects.
 * Returns a promise
 */
  getControllers(): Promise<any> {
    return RCTControllerInfo.getControllers();
  }
}

const ControllerInfoInst = new ControllerInfo();
module.exports = ControllerInfoInst;
