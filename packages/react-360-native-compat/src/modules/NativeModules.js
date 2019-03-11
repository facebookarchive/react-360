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

import DeviceEventEmitter from './DeviceEventEmitter';

type Module = any;
type ModuleClass = Class<Module>;
export type ModuleMap = {[name: string]: Module};

/**
 * Global registry of modules that need to be instantiated any time a
 * native modules instance is initialized
 */
const registry = {};

/**
 * Register a module constructor with the name that will be used to fetch it
 */
function register(name: string, module: ModuleClass) {
  registry[name] = module;
}

/**
 * Create a new instance of native modules. This may be necessary when multiple
 * React 360 instances using Native Modules exist in the same JS application
 */
function createNativeModules(container: any, emitter: DeviceEventEmitter): ModuleMap {
  const modules = {};
  for (const name in registry) {
    modules[name] = new registry[name](container, emitter);
  }
  modules.DeviceEventEmitter = emitter;
  return modules;
}

/**
 * Singleton instance of Native Modules, simulating behavior of React Native.
 * Before using Native Modules, they must be initialized with your React 360
 * container, so that they know where to find the multimedia, environment, and
 * surface controls.
 *
 * At application start time, call `NativeModules.init(container)`, and the
 * modules will be available to your React 360 application.
 */
const NativeModules = {
  init(container: any) {
    const emitter = new DeviceEventEmitter();
    const modules = createNativeModules(container, emitter);
    for (const name in modules) {
      NativeModules[name] = modules[name];
    }
  },

  createNativeModules,
  register,
};

export default NativeModules;
