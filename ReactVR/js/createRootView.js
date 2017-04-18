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

import {ReactNativeContext} from './ReactNativeContext';

import type Module from './Modules/Module';
import type {GuiSys} from 'ovrui';
import type {ContextOptions} from './ReactNativeContext';
import type {Camera} from 'three';
import type {CustomView} from './Modules/UIManager';

type RootViewOptions = {
  assetRoot?: string,
  bundle?: string,
  customViews?: Array<CustomView>,
  enableHotReload?: boolean,
  initialProps?: {[prop: string]: any},
  isLowLatency?: boolean,
  nativeModules?: Array<Module>,
};

export type RootView = {
  context: ReactNativeContext,
  frame: (camera: Camera) => void,
};

const DEVTOOLS_FLAG = /\bdevtools\b/;
const HOTRELOAD_FLAG = /\bhotreload\b/;

// Supplying the bootstrap code as a Blob allows us to reduce the minimum number
// of files from 3 (client, bridge, React) to just two (client and React)
let BRIDGE_CODE = `
var Status = undefined;

onmessage = function(e) {
  var msg = JSON.parse(e.data);
  if (!msg || !msg.cmd) {
    return;
  }
  if (msg.cmd === 'moduleConfig' ) {
    __fbBatchedBridgeConfig = msg.moduleConfig;
    Status = 'moduleConfig';
  } else
  if (msg.cmd === 'bundle' && Status === 'moduleConfig') {
    try {
      importScripts(msg.bundleName);
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
        postMessage({cmd: 'exec', results: results});
      } catch (e) {
        console.warn(e);
        console.warn(msg);
        console.warn(JSON.stringify(results))
      }
    } else
    if (msg.cmd === 'invoke') {
      var results = __fbBatchedBridge.invokeCallbackAndReturnFlushedQueue.apply(null, [msg.id, msg.args]);
      try {
        postMessage({cmd: 'exec', results: results});
      } catch (e) {
        console.warn(e);
        console.warn(msg);
        console.warn(JSON.stringify(results))
      }
    } else
    if (msg.cmd === 'flush') {
      var results = __fbBatchedBridge.flushedQueue.apply(null);
      try {
        postMessage({cmd: 'exec', results: results});
      } catch (e) {
        console.warn(e);
        console.warn(msg);
        console.warn(JSON.stringify(results))
      }
    }
  }
}
`;

// If running in development mode, and the user has added ?devtools to the query
// string, attempt to connect to standalone React Devtools on localhost:8097
if (__DEV__) {
  if (DEVTOOLS_FLAG.test(location.search)) {
    BRIDGE_CODE += '__DEVTOOLS__ = true;\n';
    if (window.__REACT_DEVTOOLS_GLOBAL_HOOK__) {
      console.log(
        'We detected that you have the React Devtools extension installed. ' +
          'Please note that at this time, React VR is only compatible with the ' +
          'standalone React Native Inspector that ships with Nuclide.'
      );
    }
  }
}

/**
 * Contains the majority of the boilerplate needed to initialize a React context
 */
export default function createRootView(
  guisys: GuiSys,
  name: string,
  options: RootViewOptions = {}
): RootView {
  if (!guisys) {
    throw new Error('ReactVR Root View must attach to an OVRUI GUI!');
  }
  if (!name || typeof name !== 'string') {
    throw new Error('ReactVR Root View must have a module name to mount');
  }

  const initialProps = options.initialProps || {};
  const contextOptions: ContextOptions = {
    isLowLatency: !!options.isLowLatency,
    customViews: options.customViews,
  };
  if (options.assetRoot) {
    contextOptions.assetRoot = options.assetRoot;
  }
  if (HOTRELOAD_FLAG.test(location.search)) {
    contextOptions.enableHotReload = true;
  }
  if (options.enableHotReload) {
    contextOptions.enableHotReload = options.enableHotReload;
  }

  let bundleURL = options.bundle || '../index.bundle?platform=vr';
  // append the query param to make the RN packager wrap the components
  if (contextOptions.enableHotReload) {
    bundleURL += '&hot=true';
  }

  const bridgeCodeBlob = new Blob([BRIDGE_CODE]);
  const rn = new ReactNativeContext(guisys, URL.createObjectURL(bridgeCodeBlob), contextOptions);
  if (Array.isArray(options.nativeModules)) {
    for (const module of options.nativeModules) {
      rn.registerModule(module);
    }
  }
  rn.init(bundleURL);
  const rootTag = rn.createRootView(name, initialProps);

  return {
    context: rn,
    frame(camera: Camera) {
      rn.frame(camera, rootTag);
    },
  };
}
