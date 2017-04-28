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
 * History exposes the browser history stack to React
 * @class History
 * @extends Module
 */
export default class History extends Module {
  _rnctx: ReactNativeContext;

  /**
   * Constructs a History with a specific React Native Context
   * It also begins listening to any history popstate events, and fires them
   * through the native event emitter
   */
  constructor(rnctx: ReactNativeContext) {
    super('History');
    this._rnctx = rnctx;

    window.addEventListener('popstate', event => {
      this._rnctx.callFunction('RCTDeviceEventEmitter', 'emit', [
        'historyPopState',
        {state: event.state},
      ]);
      this._rnctx.callFunction('RCTDeviceEventEmitter', 'emit', [
        'url',
        window.location.toString(),
      ]);
    });
  }

  /**
   * Returns a Promise that is resolved with the current history length
   * @param success - ID of success call back
   */
  $length(success: number) {
    this._rnctx.invokeCallback(success, [window.history.length]);
  }

  /**
   * Returns a Promise that is resolved with the current history state
   * @param success - ID of success call back
   */
  $state(success: number) {
    this._rnctx.invokeCallback(success, [window.history.state]);
  }

  /**
   * Returns a Promise that is resolved after the history is moved back
   * @param success - ID of success call back
   */
  $back(success: number) {
    window.history.back();
    this._rnctx.invokeCallback(success, [true]);
  }

  /**
   * Returns a Promise that is resolved after the history is moved forward
   * @param success - ID of success call back
   */
  $forward(success: number) {
    window.history.forward();
    this._rnctx.invokeCallback(success, [true]);
  }

  /**
   * Takes a number of steps, and moves the history by that delta. Returns a
   * Promise that is resolved after the move is completed.
   * @param delta - The number of steps to move the current history state. A
   *   positive number moves the history forward, a negative number moves the
   *   history back.
   * @param success - ID of success call back
   */
  $go(delta: number, success: number) {
    window.history.go(delta);
    this._rnctx.invokeCallback(success, [true]);
  }

  /**
   * Push a new state onto the history stack. The first argument is the state
   * object to push onto the stack; the second argument is the new title
   * for the window. An optional third argument is the new URL to display
   * in the navigation bar.
   * @param state - An object to push onto the stack
   * @param title - A string to set as the window title
   * @param url (optional) - The URL to show in the navigation bar
   * @param success - ID of success call back
   * @param fail - ID of failure call back
   */
  $pushState(...args: Array<any>) {
    if (args.length < 4) {
      this._rnctx.invokeCallback(args[args.length - 1], [
        new Error('pushState requires at least two arguments'),
      ]);
      return;
    }
    const state = args[0];
    const title = args[1];
    const success = args[args.length - 2];
    const fail = args[args.length - 1];
    const url = args.length === 4 ? undefined : args[2];
    try {
      window.history.pushState(state, title, url);
      this._rnctx.callFunction('RCTDeviceEventEmitter', 'emit', [
        'url',
        window.location.toString(),
      ]);
      this._rnctx.invokeCallback(success, [true]);
    } catch (e) {
      this._rnctx.invokeCallback(fail, [e]);
    }
  }

  /**
   * Replace the top state onto the history stack. The first argument is the
   * state object to place at the top of the stack; the second argument is the
   * new title for the window. An optional third argument is the new URL to
   * display in the navigation bar.
   * @param state - An object to push onto the stack
   * @param title - A string to set as the window title
   * @param url (optional) - The URL to show in the navigation bar
   * @param success - ID of success call back
   * @param fail - ID of failure call back
   */
  $replaceState(...args: Array<any>) {
    if (args.length < 4) {
      this._rnctx.invokeCallback(args[args.length - 1], [
        new Error('replaceState requires at least two arguments'),
      ]);
      return;
    }
    const state = args[0];
    const title = args[1];
    const success = args[args.length - 2];
    const fail = args[args.length - 1];
    const url = args.length === 4 ? undefined : args[2];
    try {
      window.history.pushState(state, title, url);
      this._rnctx.invokeCallback(success, [true]);
    } catch (e) {
      this._rnctx.invokeCallback(fail, [e]);
    }
  }
}
