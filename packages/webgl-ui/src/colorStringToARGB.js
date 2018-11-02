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

export default function colorStringToARGB(color: string) {
  if (color.startsWith('#')) {
    if (color.length === 4) {
      const hex = color.substr(1);
      return parseInt('ff' + hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2], 16);
    } else if (color.length === 7) {
      const hex = color.substr(1);
      return parseInt('ff' + hex, 16);
    }
    return 0;
  }
  if (color.startsWith('rgb') && color.endsWith(')')) {
    const pieces = color.substring(color.startsWith('rgba') ? 5 : 4, color.length - 1).split(',');
    const red = (Number(pieces[0]) || 0) & 255;
    const green = (Number(pieces[1]) || 0) & 255;
    const blue = (Number(pieces[2]) || 0) & 255;
    const alpha = ((pieces[3] === undefined ? 1 : Number(pieces[3]) || 0) * 255) | 0;
    return alpha * 16777216 + (red << 16) + (green << 8) + blue;
  }
  return 0;
}
