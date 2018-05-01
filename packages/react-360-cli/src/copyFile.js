/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
'use strict';

const fs = require('fs');

function copyFile(source, target) {
  return new Promise(function(resolve, reject) {
    const rejectCleanup = function(err) {
      wr.end();
      reject(err);
    };
    const rd = fs.createReadStream(source);
    rd.on('error', rejectCleanup);
    const wr = fs.createWriteStream(target);
    wr.on('error', rejectCleanup);
    wr.on('finish', resolve);
    rd.pipe(wr);
  });
}

module.exports = copyFile;
