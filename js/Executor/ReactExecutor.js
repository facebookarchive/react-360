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

export type ExecutorOptions = {
  enableDevTools?: boolean,
};

export default class ReactExecutor {
  _messageQueue: Array<*>;

  constructor() {
    this._messageQueue = [];
  }

  /**
   * Fetch the first message in the queue; if no message is available, returns null
   */
  poll() {
    const length = this._messageQueue.length;
    if (length === 0) {
      return null;
    }
    return this._messageQueue.shift();
  }

  moduleConfig(moduleDescription: Array<any>) {
    // override
  }

  setConstant(key: string, value: void | null | boolean | number | string) {
    // override
  }

  exec(url: string) {
    // override
  }

  call(module: string, fn: string, args: Array<any>) {
    // override
  }

  invoke(id: number, args: Array<any>) {
    // override
  }

  flush() {
    // override
  }

  /**
   * replaceHiddenAttributes is a callback function used by the JSON.stringify,
   * the purpose is to prevent the serialization of any key that starts in '_' as
   * these are denoted to be private to the class
   **/
  static replaceHiddenAttributes<T>(key: string, value: T): T | void {
    if (key.charAt && key.charAt(0) === '_') {
      return undefined;
    } else {
      return value;
    }
  }

  static BRIDGE_HANDLER_CODE = `
var msg = JSON.parse(e.data);
if (!msg || !msg.cmd) {
  return;
}
if (msg.cmd === 'setConstant') {
  self[msg.key] = self[msg.value];
} else
if (msg.cmd === 'moduleConfig' ) {
  __fbBatchedBridgeConfig = msg.moduleConfig;
  Status = 'moduleConfig';
} else
if (msg.cmd === 'bundle' && Status === 'moduleConfig') {
  try {
    __loadBundle(msg.bundleName);
    Status = 'bundle';
  } catch (e) {
    console.warn(e);
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", msg.bundleName, true);
    xmlhttp.onreadystatechange=function() {
      if (xmlhttp.readyState == 4) {
        var result = JSON.parse(xmlhttp.responseText);
        if (result) {
          if (result.type === 'UnableToResolveError' || result.type === 'NotFoundError') {
            console.warn(result.message);
          } else {
            if (result.snippet) {
              // remove all color characters and split the lines for improved clarity
              result.snippet = result.snippet.replace(/\\u001b\\[.*?m/g, '').split('\\n');
            }
            if (result.filename && result.filename.indexOf(':') <= 2) {
              result.filename = 'file:///' + result.filename;
            }
            if (result.errors) {
              for (var i=0; i<result.errors.length; i++) {
                var error = result.errors[i];
                if (error.filename && error.filename.indexOf(':') <= 2) {
                  error.filename = 'file:///' + error.filename;
                }
              }
            }
            console.warn(JSON.stringify(result, undefined, 2));
          }
        }
      }
    }
    xmlhttp.send(null);
  }
} else if (Status === 'bundle') {
  if (msg.cmd === 'exec') {
    var results = __fbBatchedBridge.callFunctionReturnFlushedQueue.apply(null, [msg.module, msg.function, msg.args]);
    try {
      __postMessage({cmd: 'exec', results: results});
    } catch (e) {
      console.warn(e);
      console.warn(msg);
      console.warn(JSON.stringify(results))
    }
  } else
  if (msg.cmd === 'invoke') {
    var results = __fbBatchedBridge.invokeCallbackAndReturnFlushedQueue.apply(null, [msg.id, msg.args]);
    try {
      __postMessage({cmd: 'exec', results: results});
    } catch (e) {
      console.warn(e);
      console.warn(msg);
      console.warn(JSON.stringify(results))
    }
  } else
  if (msg.cmd === 'flush') {
    var results = __fbBatchedBridge.flushedQueue.apply(null);
    try {
      __postMessage({cmd: 'exec', results: results});
    } catch (e) {
      console.warn(e);
      console.warn(msg);
      console.warn(JSON.stringify(results))
    }
  }
}`;
}
