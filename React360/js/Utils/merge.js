/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

/**
 * Merges the properties of two objects into one
 */
export default function merge(foo, bar) {
  const merged = {};
  for (const each in bar) {
    if (foo.hasOwnProperty(each) && bar.hasOwnProperty(each)) {
      if (typeof foo[each] === 'object' && typeof bar[each] === 'object') {
        merged[each] = merge(foo[each], bar[each]);
      } else {
        merged[each] = bar[each];
      }
    } else if (bar.hasOwnProperty(each)) {
      merged[each] = bar[each];
    }
  }
  for (const each in foo) {
    if (!(each in bar) && foo.hasOwnProperty(each)) {
      merged[each] = foo[each];
    }
  }
  return merged;
}
