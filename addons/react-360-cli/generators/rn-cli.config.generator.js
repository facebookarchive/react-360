/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

module.exports = config => ({
  filename: 'rn-cli.config.js',
  contents: `'use strict';

var path = require('path');
var blacklist = require('metro/src/blacklist');

var config = {
  getProjectRoots() {
    return getRoots();
  },

  getBlacklistRE() {
    return blacklist([
    ]);
  },

  getAssetExts() {
    return ['obj', 'mtl'];
  },

  getPlatforms() {
    return ['vr'];
  },

  getProvidesModuleNodeModules() {
    return ['react-native', 'react-360'];
  },
};

function getRoots() {
  var root = process.env.REACT_NATIVE_APP_ROOT;
  if (root) {
    return [path.resolve(root)];
  }
  return [path.resolve(__dirname)];
}

module.exports = config;`,
});
