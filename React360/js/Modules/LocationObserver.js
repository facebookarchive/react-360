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

import Module from './Module';

import type {ReactNativeContext} from '../ReactNativeContext';


type GeoOptions = {
  timeout?: number,
  maximumAge?: number,
  enableHighAccuracy?: bool,
};

function encodePosition({coords, timestamp}) {
  return {
    coords: {
      latitude: coords.latitude,
      longitude: coords.longitude,
      altitude: coords.altitude,
      accuracy: coords.accuracy,
      altitudeAccuracy: coords.altitudeAccuracy,
      heading: coords.heading,
    },
    timestamp,
  };
}

/**
 * LocationObserver Native Module
 * @class LocationObserver
 * @extends Module
 */
export default class LocationObserver extends Module {

  _rnctx: ReactNativeContext;
  _watchID: number | null;

  constructor(rnctx: ReactNativeContext) {
    super('LocationObserver');
    this._rnctx = rnctx;
    this._watchID = null;
  }

  requestAuthorization() {
    // Request the current position with no callback in order to trigger the
    // permissions popup
    navigator.geolocation.getCurrentPosition(() => {});
  }

  getCurrentPosition(options: GeoOptions, onSuccess: number, onError: number) {
    if (!navigator.geolocation) {
      this._rnctx.invokeCallback(onError, [])
    }
    const watchOptions = {};
    if (typeof options.enableHighAccuracy === 'boolean') {
      watchOptions.enableHighAccuracy = options.enableHighAccuracy;
    }
    if (typeof options.maximumAge === 'number') {
      watchOptions.maximumAge = options.maximumAge;
    }
    if (typeof options.timeout === 'number') {
      watchOptions.timeout = options.timeout;
    }
    navigator.geolocation.getCurrentPosition((pos) => {
      this._rnctx.invokeCallback(onSuccess, [encodePosition(pos)]);
    }, (err) => {
      const {code, message} = err;
      this._rnctx.invokeCallback(onError, [{code, message}]);
    }, watchOptions);
  }

  startObserving(options: GeoOptions) {
    if (this._watchID === null) {
      const watchOptions = {};
      if (typeof options.enableHighAccuracy === 'boolean') {
        watchOptions.enableHighAccuracy = options.enableHighAccuracy;
      }
      if (typeof options.maximumAge === 'number') {
        watchOptions.maximumAge = options.maximumAge;
      }
      if (typeof options.timeout === 'number') {
        watchOptions.timeout = options.timeout;
      }
      this._watchID = navigator.geolocation.watchPosition((pos) => {
        this._rnctx.callFunction(
          'RCTDeviceEventEmitter',
          'emit',
          ['geolocationDidChange', encodePosition(pos)]
        );
      }, ({code, message}) => {
        this._rnctx.callFunction(
          'RCTDeviceEventEmitter',
          'emit',
          ['geolocationError', {code, message}]
        );
      }, watchOptions);
    }
  }

  stopObserving() {
    if (this._watchID !== null) {
      navigator.geolocation.clearWatch(this._watchID);
    }
  }
}
