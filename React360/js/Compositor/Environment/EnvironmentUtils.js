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

export function panoEyeOffsetsForStereoFormat(format: ?string) {
  if (format === '3DTB') {
    return [[0, 0, 1, 0.5], [0, 0.5, 1, 0.5]];
  } else if (format === '3DBT') {
    return [[0, 0.5, 1, 0.5], [0, 0, 1, 0.5]];
  } else if (format === '3DLR') {
    return [[0, 0, 0.5, 1], [0.5, 0, 0.5, 1]];
  } else if (format === '3DRL') {
    return [[0.5, 0, 0.5, 1], [0, 0, 0.5, 1]];
  } else {
    return [[0, 0, 1, 1]];
  }
}
