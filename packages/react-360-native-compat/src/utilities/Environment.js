/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import NativeModules from '../modules/NativeModules';

class Environment {
  constructor(modules) {
    this._modules = modules;
  }

  _getEnvironmentModule() {
    const {EnvironmentModule} = this._modules;
    if (!EnvironmentModule) {
      throw new Error('EnviromentModule not found, have Native Modules been initialized?');
    }
    return EnvironmentModule;
  }

  clearBackground() {
    this._getEnvironmentModule().loadScene({type: 'black'});
  }

  setBackgroundImage(resource, options = {}) {
    const scene: Object = {
      type: 'photo',
      url: typeof resource === 'object' ? resource.uri : resource,
      stereo: options.format,
    };
    if ('rotate' in options) {
      scene.rotate = options.rotate;
    }
    const transition: Object = {
      transition: options.transition,
      fadeLevel: options.fadeLevel,
    };
    this._getEnvironmentModule().loadScene(scene, transition);
  }
}

const EnvironmentSingleton = new Environment(NativeModules);
export default EnvironmentSingleton;
