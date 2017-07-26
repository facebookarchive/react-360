/**
 * The examples provided by Oculus are for non-commercial testing and
 * evaluation purposes only.
 *
 * Oculus reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL
 * OCULUS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN
 * AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import {Module} from 'react-vr-web';

// Native Modules subclass `Module` from the npm package.
//
// This example module will demonstrate how to expose constants, methods,
// methods with callbacks, and methods that return Promises.
export default class BrowserInfo extends Module {
  constructor() {
    // Pass the module's name to the superclass constructor
    // On the React side, this module will be available at
    // `NativeModules.BrowserInfo`
    super('BrowserInfo');

    // Expose constant values
    this.userAgent = navigator.userAgent;
  }

  // To trigger events or method calls on the React side, we need a reference
  // to our application's React Native Context.
  // This information is not available until the vr instance has been created,
  // so we need to pass it to our native module after the fact.
  _setRNContext(rnctx) {
    this._rnctx = rnctx;
  }

  // Class methods can be called from the React side

  // Some methods require no feedback when they are done.
  // These are the simplest to implement.
  //
  // This method takes a string, and sets the browser's title bar to that value
  setTitle(title) {
    document.title = title;
  }

  // Some methods trigger a callback method on the React side when complete.
  // When the method is called from React, it passes a callback identifier as
  // an argument. This can be used to trigger the callback on the React side.
  // Note: a callback can only be called once. Triggering it more than once will
  // throw an exception.
  //
  // This method attempts to get the battery level via a browser API, and sends
  // it back to the callback when ready.
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

  // Methods prefixed with a $ return a Promise on the React side.
  // Here in the native module, the last two arguments are callback identifiers
  // to resolve or reject that Promise.
  //
  // This method creates an annoying confirmation dialog that will resolve the
  // Promise if you accept it, and reject it if you cancel the dialog.
  // It is available at `NativeModules.BrowserInfo.getConfirmation()`
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
