/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @flow
 */

type Callback = (...any) => void;

type Subscription = {name: string, callback: Callback};

export default class DeviceEventEmitter {
  _callbacks: {[name: string]: Array<Callback>} = {};

  addListener(name: string, callback: Callback): Subscription {
    if (!this._callbacks[name]) {
      this._callbacks[name] = [];
    }
    this._callbacks[name].push(callback);
    return {name, callback};
  }

  removeAllListeners(name: string) {
    this._callbacks[name] = [];
  }

  removeSubscription(subscription: Subscription) {
    const callbacks = this._callbacks[subscription.name];
    if (!callbacks) {
      return;
    }
    const index = callbacks.indexOf(subscription.callback);
    if (index < 0) {
      return;
    }
    callbacks.splice(index, 1);
  }

  emit(name: string, data?: ?Object) {
    const callbacks = this._callbacks[name] || [];
    for (const cb of callbacks) {
      cb(data);
    }
  }
}
