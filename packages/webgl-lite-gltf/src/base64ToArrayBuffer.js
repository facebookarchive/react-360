/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @flow strict
 */

export default function base64ToArrayBuffer(b64: string): ArrayBuffer {
  if (!b64 || typeof b64 !== 'string') {
    return new ArrayBuffer(0);
  }
  const decoded = atob(b64);
  const data = new Uint8Array(decoded.length);
  for (let i = 0, length = decoded.length; i < length; i++) {
    data[i] = decoded.charCodeAt(i);
  }
  return data.buffer;
}
