/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
'use strict';

const path = require('path');

function makeModulePath(relativeOrFull) {
  if (path.parse(relativeOrFull).root) {
    // Full path, return without modification
    return relativeOrFull;
  }
  return '.' + path.sep + relativeOrFull;
}

module.exports = makeModulePath;
