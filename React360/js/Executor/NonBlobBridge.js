/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

let Status;

self.__DEVTOOLS__ = false;

self.__postMessage = postMessage;

self.__loadBundle = function(bundle) {
  self.importScripts(bundle);
};

onmessage = function(e) {
  const msg = JSON.parse(e.data);
  if (!msg || !msg.cmd) {
    return;
  }
  if (msg.cmd === 'setConstant') {
    self[msg.key] = msg.value;
  } else if (msg.cmd === 'moduleConfig') {
    self.__fbBatchedBridgeConfig = msg.moduleConfig;
    Status = 'moduleConfig';
  } else if (msg.cmd === 'bundle' && Status === 'moduleConfig') {
    try {
      self.__loadBundle(msg.bundleName);
      Status = 'bundle';
    } catch (error) {
      console.warn(error);
      const xmlhttp = new XMLHttpRequest();
      xmlhttp.open('GET', msg.bundleName, true);
      xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState === 4) {
          const result = JSON.parse(xmlhttp.responseText);
          if (result) {
            if (result.type === 'UnableToResolveError' || result.type === 'NotFoundError') {
              console.warn(result.message);
            } else {
              if (result.snippet) {
                // remove all color characters and split the lines for improved clarity
              }
              if (result.filename && result.filename.indexOf(':') <= 2) {
                result.filename = 'file:///' + result.filename;
              }
              if (result.errors) {
                for (let i = 0; i < result.errors.length; i++) {
                  const resultError = result.errors[i];
                  if (resultError.filename && resultError.filename.indexOf(':') <= 2) {
                    resultError.filename = 'file:///' + resultError.filename;
                  }
                }
              }
              console.warn(JSON.stringify(result, undefined, 2));
            }
          }
        }
      };
      xmlhttp.send(null);
    }
  } else if (Status === 'bundle') {
    if (msg.cmd === 'exec') {
      const results = self.__fbBatchedBridge.callFunctionReturnFlushedQueue.apply(null, [
        msg.module,
        msg.function,
        msg.args,
      ]);
      try {
        self.__postMessage({cmd: 'exec', results: results});
      } catch (error) {
        console.warn(error);
        console.warn(msg);
        console.warn(JSON.stringify(results));
      }
    } else if (msg.cmd === 'invoke') {
      const results = self.__fbBatchedBridge.invokeCallbackAndReturnFlushedQueue.apply(null, [
        msg.id,
        msg.args,
      ]);
      try {
        self.__postMessage({cmd: 'exec', results: results});
      } catch (error) {
        console.warn(error);
        console.warn(msg);
        console.warn(JSON.stringify(results));
      }
    } else if (msg.cmd === 'flush') {
      const results = self.__fbBatchedBridge.flushedQueue.apply(null);
      try {
        self.__postMessage({cmd: 'exec', results: results});
      } catch (error) {
        console.warn(error);
        console.warn(msg);
        console.warn(JSON.stringify(results));
      }
    }
  }
};
