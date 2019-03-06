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

type StyleMap = {[prop: string]: number | string};

export default function flattenStyle(styles: StyleMap | Array<StyleMap>): StyleMap {
  if (!styles) {
    return styles;
  }
  if (Array.isArray(styles)) {
    const merged = {};
    for (let i = 0; i < styles.length; i++) {
      const flat = flattenStyle(styles[i]);
      if (!flat) {
        continue;
      }
      for (const prop in flat) {
        merged[prop] = flat[prop];
      }
    }
    return merged;
  }
  return styles;
}
