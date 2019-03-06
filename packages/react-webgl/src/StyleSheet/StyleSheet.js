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

import flattenStyle from './flattenStyle';
import type {ViewStyles} from '../Primitives';

export type IndividualStyle = ViewStyles;
export type StyleObject = null | void | IndividualStyle | Array<IndividualStyle>;
export type StyleMap = {[name: string]: StyleObject};

const absoluteFillObject = {
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
};

const StyleSheet = {
  create(styles: StyleMap) {
    const frozen = {};
    for (const name in styles) {
      frozen[name] = Object.freeze(styles[name]);
    }
    return frozen;
  },
  flatten: flattenStyle,
  absoluteFill: absoluteFillObject,
  absoluteFillObject,
  hairlineWidth: 1,
};

export default StyleSheet;
