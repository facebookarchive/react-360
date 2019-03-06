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

import type {StyleObject} from './StyleSheet';

/**
 * Used to avoid recomputing styles if the `style={}` prop has not changed
 * When developers use StyleSheet.create to produce frozen objects, this will
 * lead to improved performance.
 */
export default function areStylePropsEqual(prev: StyleObject, next: StyleObject): boolean {
  if (!prev && !next) {
    return true;
  }
  if (Array.isArray(prev)) {
    if (!Array.isArray(next)) {
      return false;
    }
    if (prev.length !== next.length) {
      return false;
    }
    for (let i = 0; i < prev.length; i++) {
      if (!areStylePropsEqual(prev[i], next[i])) {
        return false;
      }
    }
    return true;
  }
  if (Array.isArray(next)) {
    return false;
  }
  return prev === next;
}
