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

import type {Camera} from 'three';
import type GuiSys from './OVRUI/UIView/GuiSys';

import type ReactExecutor from './Executor/ReactExecutor';
import ReactExecutorWebWorker from './Executor/ReactExecutorWebWorker';
import type Module from './Modules/Module';
import type {CustomView} from './Modules/UIManager';
import {ReactNativeContext, type ContextOptions} from './ReactNativeContext';

type RootViewOptions = {
  assetRoot?: string,
  bundle?: string,
  customViews?: Array<CustomView>,
  enableHotReload?: boolean,
  executor?: ReactExecutor,
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

/**
 * Contains the majority of the boilerplate needed to initialize a React context
 */
export default function createRootView(
  guisys: GuiSys,
  name: string,
  options: RootViewOptions = {},
): RootView {
  if (!guisys) {
    throw new Error('ReactVR Root View must attach to an OVRUI GUI!');
  }
  if (!name || typeof name !== 'string') {
    throw new Error('ReactVR Root View must have a module name to mount');
  }

  // If running in development mode, and the user has added ?devtools to the query
  // string, attempt to connect to standalone React Devtools on localhost:8097
  let enableDevTools = false;
  if (__DEV__) {
    if (DEVTOOLS_FLAG.test(location.search)) {
      enableDevTools = true;
      if (window.__REACT_DEVTOOLS_GLOBAL_HOOK__) {
        /* eslint-disable no-console */
        console.log(
          'We detected that you have the React Devtools extension installed. ' +
            'Please note that at this time, React VR is only compatible with the ' +
            'standalone Inspector (npm run devtools).',
        );
        /* eslint-enable no-console */
      }
    }
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

  const executor =
    options.executor ||
    new ReactExecutorWebWorker({
      enableDevTools: enableDevTools,
    });

  let bundleURL = options.bundle || '../index.bundle?platform=vr';
  // append the query param to make the RN packager wrap the components
  if (contextOptions.enableHotReload) {
    bundleURL += '&hot=true';
  }

  const rn = new ReactNativeContext(guisys, executor, contextOptions);
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
    rootTag: rootTag,
  };
}
