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
import NativeModules from './modules/NativeModules';
import AsyncStorage from './utilities/AsyncStorage';

NativeModules.register('AsyncLocalStorage', AsyncLocalStorage);
NativeModules.register('AudioModule', AudioModule);

export {AsyncStorage, NativeModules, VrButton};
