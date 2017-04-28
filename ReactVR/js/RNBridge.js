/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

/* eslint-disable */

// Declares global onmessage() event function for web worker.
// Parses arg JSON and handles 'moduleConfig', 'bundle' (load new script) and 'exec' calls.

var Status = undefined;

onmessage = function(e) {
  var msg = JSON.parse(e.data);
  if (!msg || !msg.cmd) {
    return;
  }
  if (msg.cmd === 'moduleConfig') {
    __fbBatchedBridgeConfig = msg.moduleConfig;
    Status = 'moduleConfig';
  } else if (msg.cmd === 'bundle' && Status === 'moduleConfig') {
    try {
      importScripts(msg.bundleName);
      Status = 'bundle';
    } catch (e) {
      // display the exception and also attempt to further understand the problem by making the request again
      // and beautifying the more common reports (such as filename where file:/// is attempted to be appended)
      // and displaying them
      console.warn(e);
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.open('GET', msg.bundleName, true);
      xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4) {
          var result = JSON.parse(xmlhttp.responseText);
          if (result) {
            if (result.type === 'UnableToResolveError' || result.type === 'NotFoundError') {
              console.warn(result.message);
            } else {
              if (result.snippet) {
                // remove all color characters and split the lines for improved clarity
                result.snippet = result.snippet.replace(/\u001b\[.*?m/g, '').split('\n');
              }
              if (result.filename && result.filename.indexOf(':') <= 2) {
                result.filename = 'file:///' + result.filename;
              }
              if (result.errors) {
                for (var i = 0; i < result.errors.length; i++) {
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
      };
      xmlhttp.send(null);
    }
  } else if (Status === 'bundle') {
    if (msg.cmd === 'exec') {
      var results = __fbBatchedBridge.callFunctionReturnFlushedQueue.apply(null, [
        msg.module,
        msg.function,
        msg.args,
      ]);
      try {
        postMessage({cmd: 'exec', results: results});
      } catch (e) {
        console.warn(e);
        console.warn(msg);
        console.warn(JSON.stringify(results));
      }
    } else if (msg.cmd === 'invoke') {
      var results = __fbBatchedBridge.invokeCallbackAndReturnFlushedQueue.apply(null, [
        msg.id,
        msg.args,
      ]);
      try {
        postMessage({cmd: 'exec', results: results});
      } catch (e) {
        console.warn(e);
        console.warn(msg);
        console.warn(JSON.stringify(results));
      }
    } else if (msg.cmd === 'flush') {
      var results = __fbBatchedBridge.flushedQueue.apply(null);
      try {
        postMessage({cmd: 'exec', results: results});
      } catch (e) {
        console.warn(e);
        console.warn(msg);
        console.warn(JSON.stringify(results));
      }
    }
  }
};
