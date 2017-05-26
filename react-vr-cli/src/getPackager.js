/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
'use strict';

const child_process = require('child_process');

let packager = null;
function getPackager() {
  if (packager !== null) {
    return packager;
  }
  try {
    child_process.execSync(
      /^win/.test(process.platform) ? 'yarn --version 2> NUL' : 'yarn --version 2>/dev/null'
    );
    packager = 'yarn';
  } catch (e) {
    packager = 'npm';
  }
  return packager;
}

module.exports = getPackager;
