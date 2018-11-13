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

/**
 * Supply an appropriate default value for a uniform, based on its type
 */
export default function defaultValueForUniform(gl: WebGLRenderingContext, type: number) {
  switch (type) {
    case gl.FLOAT:
      return 0;
    case gl.FLOAT_VEC2:
      return [0, 0];
    case gl.FLOAT_VEC3:
      return [0, 0, 0];
    case gl.FLOAT_VEC4:
      return [0, 0, 0, 0];
    case gl.INT:
      return 0;
    case gl.INT_VEC2:
      return [0, 0];
    case gl.INT_VEC3:
      return [0, 0, 0];
    case gl.INT_VEC4:
      return [0, 0, 0, 0];
    case gl.FLOAT_MAT2:
      return [0, 0, 0, 0];
    case gl.FLOAT_MAT3:
      return [0, 0, 0, 0, 0, 0, 0, 0, 0];
    case gl.FLOAT_MAT4:
      return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    case gl.SAMPLER_2D:
      return null;
    default:
      return null;
  }
}
