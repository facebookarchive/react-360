/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule History
 */

'use strict';

const RCTHistory = require('NativeModules').History;

/**
 * History exposes the browser history stack to React
 */
class History {
  /**
   * Returns a Promise that is resolved with the current history length
   */
  length(): Promise<any> {
    return RCTHistory.length();
  }

  /**
   * Returns a Promise that is resolved with the current history state
   */
  state(): Promise<any> {
    return RCTHistory.state();
  }

  /**
   * Returns a Promise that is resolved after the history is moved back
   */
  back(): Promise<any> {
    return RCTHistory.back();
  }

  /**
   * Returns a Promise that is resolved after the history is moved forward
   */
  forward(): Promise<any> {
    return RCTHistory.forward();
  }

  /**
   * Takes a number of steps, and moves the history by that delta. Returns a
   * Promise that is resolved after the move is completed.
   *
   * @param delta - The number of steps to move the current history state. A
   *   positive number moves the history forward, a negative number moves the
   *   history back.
   */
  go(delta: number): Promise<any> {
    return RCTHistory.go(delta);
  }

  /**
   * Push a new state onto the history stack. The first argument is the state
   * object to push onto the stack; the second argument is the new title
   * for the window. An optional third argument is the new URL to display
   * in the navigation bar.
   *
   * @param state - An object to push onto the stack
   * @param title - A string to set as the window title
   * @param url (optional) - The URL to show in the navigation bar
   */
  pushState(state: any, title: any, url: ?any): Promise<any> {
    return RCTHistory.pushState(state, title, url);
  }

  /**
   * Replace the top state onto the history stack. The first argument is the
   * state object to place at the top of the stack; the second argument is the
   * new title for the window. An optional third argument is the new URL to
   * display in the navigation bar.
   *
   * @param state - An object to push onto the stack
   * @param title - A string to set as the window title
   * @param url (optional) - The URL to show in the navigation bar
   */
  replaceState(state: any, title: any, url: ?any): Promise<any> {
    return RCTHistory.replaceState(state, title, url);
  }
}

const HistoryInst = new History();
module.exports = HistoryInst;
