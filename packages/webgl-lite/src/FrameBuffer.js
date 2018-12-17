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

import Texture from './Texture';

export default class FrameBuffer {
  _fb: WebGLFramebuffer;
  _gl: WebGLRenderingContext;
  _height: number;
  _texture: Texture;
  _width: number;

  constructor(gl: WebGLRenderingContext, width: number, height: number) {
    this._gl = gl;
    this._width = width;
    this._height = height;
    // Create the texture that we will render to the framebuffer
    this._texture = new Texture(gl, {source: null, width, height});
    // Instantiate the framebuffer and attach the texture
    this._fb = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, this._fb);
    gl.framebufferTexture2D(
      gl.FRAMEBUFFER,
      gl.COLOR_ATTACHMENT0,
      gl.TEXTURE_2D,
      this._texture.getGLTexture(),
      0
    );
    // Clean up binding, so that future rendering goes back to the main canvas buffer
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  }

  resize(width: number, height: number) {
    this._width = width;
    this._height = height;
    const rawTexture = this._texture.getGLTexture();
    const gl = this._gl;
    gl.bindTexture(gl.TEXTURE_2D, rawTexture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
  }

  release() {
    this._texture.release();
    this._gl.deleteFramebuffer(this._fb);
  }

  drawToBuffer(fn: () => void) {
    const gl = this._gl;
    gl.bindFramebuffer(gl.FRAMEBUFFER, this._fb);
    gl.viewport(0, 0, this._width, this._height);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    fn();
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  }

  getTexture() {
    return this._texture;
  }

  getWidth() {
    return this._width;
  }

  getHeight() {
    return this._height;
  }
}
