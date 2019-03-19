/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

export default function assertColorEqual(a, b) {
  if (!Array.isArray(a) || !Array.isArray(b)) {
    throw new Error('Colors must be RGBA arrays');
  }
  for (let i = 0; i < 4; i++) {
    if (a[i] !== b[i]) {
      throw new Error(`Color channel ${i} is not equal (${a[i]} !== ${b[i]})`);
    }
  }
}
