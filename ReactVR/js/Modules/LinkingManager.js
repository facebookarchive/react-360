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

/**
 * LinkingManager implements linking behavior that can be triggered from React
 * the input.
 * This module isn't designed to be call directly but internally via the React
 * code
 * @class LinkingManager
 * @extends Module
 */

const initialURL = location.href;

export default class LinkingManager extends Module {
  _rnctx: ReactNativeContext;

  /**
   * Constructs a LinkingManager with a specific React Native Context
   */
  constructor(rnctx: ReactNativeContext) {
    super('LinkingManager');
    this._rnctx = rnctx;
  }

  /**
   * Trivially sets the window location to a new value.
   * An asynchronous function that resolves a Promise on the other side of the
   * bridge.
   * the `$' start of the function denotes that the function should be described to
   * the React code as a async function in which the final 2 paramaters will be the callback
   * IDs for success and fail
   * @param url - string of url
   * @param success - ID of success call back
   * @param fail - ID of fail call back
   */
  $openURL(url: string, success: number, fail: number) {
    window.location = new URL(url, window.location).toString();
    this._rnctx.invokeCallback(success, [true]);
  }

  /**
   * Trivially accepts all URLs
   * An asynchronous function that resolves a Promise on the other side of the
   * bridge.
   * the `$' start of the function denotes that the function should be described to
   * the React code as a async function in which the final 2 paramaters will be the callback
   * IDs for success and fail
   * @param url - string of url
   * @param success - ID of success call back
   * @param fail - ID of fail call back
   */
  $canOpenURL(url: string, success: number, fail: number) {
    this._rnctx.invokeCallback(success, [true]);
  }

  /**
   * Get the original URL that the page was opened to.
   * Returns a Promise that is resolved with the string of the initial URL.
   * @param success - ID of success callback
   */
  $getInitialURL(success: number, fail: number) {
    this._rnctx.invokeCallback(success, [initialURL]);
  }
}
