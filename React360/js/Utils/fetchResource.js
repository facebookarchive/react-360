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

export type FetchResourceOptions = {
  responseType?: 'string' | 'arraybuffer',
};

/**
 * Promise wrapper around a simple GET request, ideal for fetching external
 * text and binary resources.
 */
export default function fetchResource(
  url: string,
  options: FetchResourceOptions = {},
): Promise<any> {
  return new Promise((resolve, reject) => {
    const req = new XMLHttpRequest();
    req.addEventListener('load', () => {
      const response = req.response;
      if (req.status === 200) {
        resolve(response);
      } else {
        reject(response);
      }
    });

    req.open('GET', url);
    if (options.responseType === 'arraybuffer') {
      req.responseType = 'arraybuffer';
    }
    req.send();
  });
}
