/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @flow
 */

import ResourceManager from './ResourceManager';

export default function createRemoteImageManager(
  queueSize?: number,
): ResourceManager<Image> {
  return new ResourceManager(
    (url, options) =>
      new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'Anonymous';
        img.onload = function() {
          resolve(img);
        };
        img.onerror = function(err: any) {
          reject(err);
        };

        img.src = url;
      }),
    null,
    queueSize,
  );
}
