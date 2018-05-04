// Copyright 2004-present Facebook. All Rights Reserved.

import {Module} from 'react-360-web';

/**
 * Demonstration of a custom Native Module, used to send browser information
 * to the React application.
 */
export default class BrowserInfoModule extends Module {
  constructor(ctx) {
    super('BrowserInfo');
    this._rnctx = ctx;
    this.userAgent = navigator.userAgent;
  }

  /**
   * Example of a method that doesn't require a response.
   * Calling this method will set the window title to a specific string,
   * behavior that is not available in the Web Worker.
   */
  setTitle(title) {
    document.title = title;
  }

  /**
   * Example of a method that sends back a repsonse via a callback.
   * React calls this method with a callback, ie:
   *
   *   BrowserInfoModule.getBatteryLevel(level => {
   *     // ... do something with battery level
   *   });
   *
   * Once data is available, it is passed by React by invoking the original
   * callback method, which will be executed with the provided arguments.
   */
  getBatteryLevel(cb) {
    const getBattery = navigator.mozGetBattery || navigator.getBattery;
    getBattery
      .call(navigator)
      .then(
        battery => {
          // extract the level and return it
          return battery.level;
        },
        e => {
          // if an error occurs, return null
          return null;
        }
      )
      .then(level => {
        if (this._rnctx) {
          // trigger the callback
          // the first argument is the callback identifier,
          // the second is an array of arguments
          this._rnctx.invokeCallback(cb, [level]);
        }
      });
  }

  /**
   * Similar to the last method\, but exposes a Promise on the React side.
   * Prefixing a method with a dollar sign will automatically create two
   * callback arguments to resolve or reject the Promise.
   * On the React side, the method is called BrowserInfoModule.getConfirmation,
   * without the dollar sign. Calling it returns a Promise that is eventually
   * resolved or rejected, depending on which callback is invoked from this side.
   */
  $getConfirmation(message, resolve, reject) {
    const result = window.confirm(message);
    if (this._rnctx) {
      if (result) {
        this._rnctx.invokeCallback(resolve, []);
      } else {
        // When rejecting a Promise, a message should be provided to populate
        // the Error object on the React side
        this._rnctx.invokeCallback(reject, [{message: 'Canceled the dialog'}]);
      }
    }
  }
}
