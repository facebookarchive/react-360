/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import MockBlob from './MockBlob';

const objMapping = {};
let objCount = 0;

export function _getObjectFromURL(url) {
  return objMapping[url];
}

export function createObjectURL(obj) {
  let url;
  if (obj instanceof MockBlob) {
    url = 'blob:' + objCount;
    objCount++;
  } else {
    throw new Error('Unsupported object type');
  }
  objMapping[url] = obj;
  return url;
}

export function revokeObjectURL(url) {
  if (objMapping[url]) {
    delete objMapping[url];
  }
}
