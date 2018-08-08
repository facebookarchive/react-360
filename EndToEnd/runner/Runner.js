/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import fs from 'fs';
import jsdom from 'jsdom';
import path from 'path';
import MockBlob from './MockBlob';
import * as MockURL from './MockURL';
import MockWorker from './MockWorker';

export default class Runner {
  constructor(html, filemap) {
    const resourceLoader = function(resource, callback) {
      const pathname = resource.url.pathname.replace(/^http:\/\/localhost:8081\//, '');
      if (filemap[pathname]) {
        callback(null, filemap[pathname]);
      } else {
        callback(null, fs.readFileSync(path.resolve('.', pathname.replace(/^\//, '')), 'utf8'));
      }
    };
    this.loaded = new Promise((resolve) => {
      this.dom = jsdom.env({
        html: html,
        url: 'http://localhost:8081/',
        created: function(err, win) {
          win.Blob = MockBlob;
          win.URL = MockURL;
          win.Worker = MockWorker(resourceLoader);

          // Polyfill rAF
          (function(w) {
            if (w.requestAnimationFrame) {
              return;
            }
            let lastTime = 0;
            w.requestAnimationFrame = function(cb) {
              const now = new Date().getTime();
              const delta = Math.max(0, 16 - (now - lastTime));
              const id = window.setTimeout(() => cb(now + delta), delta);
              lastTime = now + delta;
              return id;
            };
            w.cancelAnimationFrame = function(id) {
              clearTimeout(id);
            };
          }(win));
        },
        done: function(err, win) {
          resolve(win);
        },
        resourceLoader: resourceLoader,
        virtualConsole: jsdom.createVirtualConsole().sendTo(console),
        features: {
          FetchExternalResources: ['script'],
          ProcessExternalResources: ['script'],
          SkipExternalResources: false,
        },
      });
    });
  }
}
