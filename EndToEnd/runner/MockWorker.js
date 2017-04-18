/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import fs from 'fs';
import path from 'path';
import vm from 'vm';
import {_getObjectFromURL} from './MockURL';

export default function(resourceLoader) {
  return class {
    constructor(source) {
      let src;
      const sandbox = {
        console: {
          log: console.log,
          warn: console.warn,
          error: console.error,
        },
      };
      this.sandbox = sandbox;

      const importScripts = function(...scripts) {
        for (let i = 0; i < scripts.length; i++) {
          resourceLoader({
            url: {pathname: scripts[i]},
            defaultFetch(cb) {},
          }, function(err, code) {
            vm.runInContext(code, sandbox);
          });
        }
      };
      const postMessage = (data) => {
        if (typeof this.onmessage === 'function') {
          this.onmessage({data});
        }
      };
      sandbox.self = sandbox;
      sandbox.window = sandbox;
      sandbox.importScripts = importScripts;
      sandbox.postMessage = postMessage;

      vm.createContext(sandbox);

      if (typeof source === 'string') {
        if (source.match(/^blob:/)) {
          src = _getObjectFromURL(source).__value;
        } else {
          resourceLoader({
            url: {pathname: source},
            defaultFetch(cb) {},
          }, function(err, code) {
            vm.runInContext(code, sandbox);
          });
        }
      }

      if (src) {
        vm.runInContext(src, sandbox);
      }
    }

    postMessage(data) {
      if (typeof this.sandbox.onmessage === 'function') {
        this.sandbox.onmessage({data});
      }
    }

    terminate() {

    }
  }
}
