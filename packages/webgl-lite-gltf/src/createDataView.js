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

/* global $TypedArray */

export default function createDataView(
  data: ArrayBuffer,
  offset: number,
  length: number,
  type: number
): $TypedArray {
  switch (type) {
    case 0x1400: // BYTE
      return new Int8Array(data, offset, length);
    case 0x1401: // UNSIGNED_BYTE
      return new Uint8Array(data, offset, length);
    case 0x1402: // SHORT
      return new Int16Array(data, offset, length / 2);
    case 0x1403: // UNSIGNED_SHORT
      return new Uint16Array(data, offset, length / 2);
    case 0x1404: // INT
      return new Int32Array(data, offset, length / 4);
    case 0x1405: // UNSIGNED_INT
      return new Uint32Array(data, offset, length / 4);
    case 0x1406: // FLOAT
      return new Float32Array(data, offset, length / 4);
    default:
      throw new Error(`Unsupported GL component type: ${type}`);
  }
}
