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
const isDirectory = require('./isDirectory');

function listGenerators(source, currentPath) {
  return new Promise((resolve, reject) => {
    fs.readdir(source, (err, files) => {
      if (err) {
        return reject(err);
      }
      resolve(files);
    });
  })
    .then(files => Promise.all(files.map(file => isDirectory(file, path.join(source, file)))))
    .then(info => {
      const dirs = [];
      const files = [];
      for (let i = 0; i < info.length; i++) {
        if (info[i].isDirectory) {
          dirs.push({
            path: info[i].name,
            fullpath: path.join(source, info[i].name),
          });
        } else {
          files.push({
            path: currentPath || '',
            fullpath: path.join(source, info[i].name),
          });
        }
      }
      return Promise.all(
        dirs.map(dir =>
          listGenerators(dir.fullpath, currentPath ? path.join(currentPath, dir.path) : dir.path)
        )
      ).then(dirs => {
        let dirFiles = [];
        for (let i = 0; i < dirs.length; i++) {
          dirFiles = dirFiles.concat(dirs[i]);
        }
        return dirFiles.concat(files);
      });
    });
}

module.exports = listGenerators;
