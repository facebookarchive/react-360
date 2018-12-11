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

import {type Attribute} from './Program';

type SizeAndType = {
  size: number,
  type: number,
};

/**
 * Given extracted attribute info, return the number of elements, and the type
 * of those elements. If normalized, FLOAT types will be converted to
 * UNSIGNED_BYTE.
 */
export default function getAttributeSizeAndType(
  gl: WebGLRenderingContext,
  attr: Attribute,
  normalize: boolean
): SizeAndType {
  const type = normalize ? gl.UNSIGNED_BYTE : gl.FLOAT;
  switch (attr.type) {
    case gl.FLOAT:
      return {type, size: 1};
    case gl.FLOAT_VEC2:
      return {type, size: 2};
    case gl.FLOAT_VEC3:
      return {type, size: 3};
    case gl.FLOAT_VEC4:
      return {type, size: 4};
    case gl.FLOAT_MAT2:
      return {type, size: 4};
    case gl.FLOAT_MAT3:
      return {type, size: 9};
    case gl.FLOAT_MAT4:
      return {type, size: 16};
  }
  throw new Error('Unsupported type');
}
