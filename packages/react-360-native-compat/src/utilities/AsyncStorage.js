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

import NativeModules, {type ModuleMap} from '../modules/NativeModules';

class AsyncStorage {
  _modules: ModuleMap;

  constructor(modules: ModuleMap) {
    this._modules = modules;
  }

  _getStorageModule() {
    const {AsyncLocalStorage} = this._modules;
    if (!AsyncLocalStorage) {
      throw new Error('AsyncLocalStorage not found, have Native Modules been initialized?');
    }
    return AsyncLocalStorage;
  }

  getItem(
    key: string,
    callback?: ?(error: ?Error, result: ?string) => void
  ): Promise<?[string, ?string]> {
    return new Promise((resolve, reject) => {
      this._getStorageModule().multiGet([key], (errors, result) => {
        const value = result && result[0] && result[0][1] ? result[0][1] : null;
        if (callback) {
          callback(errors, value);
        }
        if (errors) {
          reject(errors);
        } else {
          resolve(value);
        }
      });
    });
  }

  setItem(key: string, value: string, callback?: ?(error: ?Error) => void): Promise<void> {
    return new Promise((resolve, reject) => {
      this._getStorageModule().multiSet([[key, value]], errors => {
        if (callback) {
          callback(errors);
        }
        if (errors) {
          reject(errors);
        } else {
          resolve();
        }
      });
    });
  }

  removeItem(key: string, callback?: ?(error: ?Error) => void): Promise<void> {
    return new Promise((resolve, reject) => {
      this._getStorageModule().multiRemove([key], errors => {
        if (callback) {
          callback(errors);
        }
        if (errors) {
          reject(errors);
        } else {
          resolve();
        }
      });
    });
  }

  clear(callback?: ?(error: ?Error) => void): Promise<void> {
    return new Promise((resolve, reject) => {
      this._getStorageModule().clear(errors => {
        if (callback) {
          callback(errors);
        }
        if (errors) {
          reject(errors);
        } else {
          resolve();
        }
      });
    });
  }

  getAllKeys(callback?: ?(error: ?Error, keys: ?Array<string>) => void): Promise<Array<string>> {
    return new Promise((resolve, reject) => {
      this._getStorageModule().getAllkeys((errors, keys) => {
        if (callback) {
          callback(errors, keys);
        }
        if (errors) {
          reject(errors);
        } else {
          resolve(keys);
        }
      });
    });
  }
}

const AsyncStorageSingleton = new AsyncStorage(NativeModules);
export default AsyncStorageSingleton;
