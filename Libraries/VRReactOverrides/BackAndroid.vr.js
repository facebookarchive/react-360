/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule BackAndroid
 */

'use strict';

const DeviceEventManager = require('NativeModules').DeviceEventManager;
const RCTDeviceEventEmitter = require('RCTDeviceEventEmitter');

const DEVICE_BACK_EVENT = 'hardwareBackPress';

type BackPressEventName = $Enum<{
  backPress: string,
}>;

const _backPressSubscriptions = new Set();

RCTDeviceEventEmitter.addListener(DEVICE_BACK_EVENT, function() {
  const backPressSubscriptions = new Set(_backPressSubscriptions);
  let invokeDefault = true;
  backPressSubscriptions.forEach(subscription => {
    if (subscription()) {
      invokeDefault = false;
    }
  });
  if (invokeDefault) {
    BackAndroid.exitApp();
  }
});

/**
 * Detect hardware back button presses, and programmatically invoke the default back button
 * functionality to exit the app if there are no listeners or if none of the listeners return true.
 *
 * Example:
 *
 * ```js
 * BackAndroid.addEventListener('hardwareBackPress', function() {
 *   if (!this.onMainScreen()) {
 *     this.goBack();
 *     return true;
 *   }
 *   return false;
 * });
 * ```
 */
const BackAndroid = {
  exitApp: function() {
    DeviceEventManager.invokeDefaultBackPressHandler();
  },

  addEventListener: function(
    eventName: BackPressEventName,
    handler: Function
  ): {remove: () => void} {
    _backPressSubscriptions.add(handler);
    return {
      remove: () => BackAndroid.removeEventListener(eventName, handler),
    };
  },

  removeEventListener: function(eventName: BackPressEventName, handler: Function): void {
    _backPressSubscriptions.delete(handler);
  },
};

module.exports = BackAndroid;
