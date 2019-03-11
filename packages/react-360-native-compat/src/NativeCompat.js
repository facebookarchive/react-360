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

import VrButton from './components/VrButton';
import AsyncLocalStorage from './modules/AsyncLocalStorage';
import AudioModule from './modules/AudioModule';
import ControllerInfoModule from './modules/ControllerInfo';
import EnvironmentModule from './modules/EnvironmentModule';
import NativeModules from './modules/NativeModules';
import VideoModule from './modules/VideoModule';
import AsyncStorage from './utilities/AsyncStorage';
import ControllerInfo from './utilities/ControllerInfo';
import Environment from './utilities/Environment';

NativeModules.register('AsyncLocalStorage', AsyncLocalStorage);
NativeModules.register('AudioModule', AudioModule);
NativeModules.register('ControllerInfo', ControllerInfoModule);
NativeModules.register('EnvironmentModule', EnvironmentModule);
NativeModules.register('VideoModule', VideoModule);

export {AsyncStorage, ControllerInfo, Environment, NativeModules, VrButton};
