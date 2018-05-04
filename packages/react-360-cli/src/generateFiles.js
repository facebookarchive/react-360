/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
'use strict';

const createFile = require('./createFile');
const listGenerators = require('./listGenerators');
const makeModulePath = require('./makeModulePath');

function createFiles(dest, files) {
  return Promise.all(files.map(file => createFile(dest, file)));
}

function generateFiles(source, dest, config) {
  return listGenerators(source).then(genPaths => {
    const generators = genPaths.map(paths => require(makeModulePath(paths.fullpath)));
    const files = generators.map((gen, i) => {
      const fileData = gen(config);
      fileData.path = genPaths[i].path;
      return fileData;
    });
    return createFiles(dest, files);
  });
}

module.exports = generateFiles;
