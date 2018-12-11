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
 * Wrapper class for an element indexing buffer, designed to hide boilerplate
 * for setting and binding the buffer
 */
export default class IndexBuffer {
  _buffer: WebGLBuffer;
  _gl: WebGLRenderingContext;

  constructor(gl: WebGLRenderingContext) {
    this._gl = gl;
    this._buffer = gl.createBuffer();
  }

  /**
   * Store uint index data in the backing GL buffer
   */
  bufferData(data: Uint16Array) {
    const gl = this._gl;
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._buffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, data, gl.DYNAMIC_DRAW);
  }

  /**
   * Attach the index buffer to the element array buffer
   */
  bindToElements() {
    const gl = this._gl;
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._buffer);
  }
}
