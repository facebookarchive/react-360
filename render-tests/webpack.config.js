/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

const path = require('path');

const PACKAGES_DIR = path.resolve(__dirname, '../packages');

module.exports = {
  entry: './tests/render-tests.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'render-tests.js',
  },

  resolve: {
    alias: {
      'webgl-lite': path.resolve(PACKAGES_DIR, 'webgl-lite'),
      'webgl-ui': path.resolve(PACKAGES_DIR, 'webgl-ui'),
    },
  },
};
