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
const path = require('path');
const copyFile = require('./copyFile');

function copyAssets(binDir, dest) {
  const assets = path.join(binDir, 'static_assets');
  const assetsDest = path.join(dest, 'static_assets');
  fs.mkdirSync(assetsDest);
  fs.readdir(assets, (err, files) => {
    if (!err) {
      files.map(file => {
        if (!file.isDirectory) {
          const fileSrc = path.join(assets, file);
          const fileDest = path.join(assetsDest, file);
          copyFile(fileSrc, fileDest);
        }
      });
    }
  });
}

module.exports = copyAssets;
