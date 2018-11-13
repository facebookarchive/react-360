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
 * Provide a method that can be used to set a specific uniform on a GL context.
 * For multi-value uniform types, we always use the array variant of the setter.
 */
export default function createUniformSetter(
  gl: WebGLRenderingContext,
  loc: WebGLUniformLocation,
  type: number
) {
  switch (type) {
    case gl.FLOAT:
      return gl.uniform1f.bind(gl, loc);
    case gl.FLOAT_VEC2:
      return gl.uniform2fv.bind(gl, loc);
    case gl.FLOAT_VEC3:
      return gl.uniform3fv.bind(gl, loc);
    case gl.FLOAT_VEC4:
      return gl.uniform4fv.bind(gl, loc);
    case gl.INT:
      return gl.uniform1i.bind(gl, loc);
    case gl.INT_VEC2:
      return gl.uniform2iv.bind(gl, loc);
    case gl.INT_VEC3:
      return gl.uniform3iv.bind(gl, loc);
    case gl.INT_VEC4:
      return gl.uniform4iv.bind(gl, loc);
    case gl.FLOAT_MAT2:
      return gl.uniformMatrix2fv.bind(gl, loc, false);
    case gl.FLOAT_MAT3:
      return gl.uniformMatrix3fv.bind(gl, loc, false);
    case gl.FLOAT_MAT4:
      return gl.uniformMatrix4fv.bind(gl, loc, false);
    case gl.SAMPLER_2D:
      return gl.uniform1i.bind(gl, loc);
    default:
      return function() {
        throw new Error('This uniform type is not supported');
      };
  }
}
