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

import type RenderGroup from './RenderGroup';

type TextureSource = HTMLCanvasElement | HTMLVideoElement | Image | ImageBitmap;

const ImageBitmap =
  self.ImageBitmap ||
  class ImageBitmap {
    width: number;
    height: number;
  };

type TextureOptions = {
  height?: number,
  source?: ?TextureSource,
  width?: number,
};

export default class Texture {
  _gl: WebGLRenderingContext;
  _height: number;
  _renderGroups: Set<RenderGroup>;
  _source: ?TextureSource;
  _texture: WebGLTexture;
  _width: number;

  constructor(gl: WebGLRenderingContext, options: TextureOptions = {}) {
    this._gl = gl;
    this._renderGroups = new Set();
    this._texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, this._texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    this._width = options.width || 0;
    this._height = options.height || 0;
    if ('source' in options) {
      const source = options.source;
      if (source == null) {
        gl.texImage2D(
          gl.TEXTURE_2D,
          0,
          gl.RGBA,
          this._width,
          this._height,
          0,
          gl.RGBA,
          gl.UNSIGNED_BYTE,
          source
        );
      } else {
        this.setSource(source);
      }
    } else {
      // Placeholder 1x1 black image
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        1,
        1,
        0,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        new Uint8Array([0, 0, 0, 0])
      );
    }
  }

  getWidth(): number {
    return this._width;
  }

  getHeight(): number {
    return this._height;
  }

  getGLTexture() {
    return this._texture;
  }

  setSource(source: TextureSource) {
    this._source = source;
    const gl = this._gl;
    gl.bindTexture(gl.TEXTURE_2D, this._texture);
    if (source instanceof Image) {
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 0);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source);
      this._width = source.naturalWidth;
      this._height = source.naturalHeight;
    } else if (source instanceof ImageBitmap) {
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 0);
      // $FlowFixMe - ImageBitmap polyfill won't be compatible with texImage2D
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source);
      this._width = source.width;
      this._height = source.height;
    } else if (source instanceof HTMLCanvasElement) {
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 0);
      gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, 1);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source);
      this._width = source.width;
      this._height = source.height;
    } else if (source instanceof HTMLVideoElement) {
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 0);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, source);
      this._width = source.videoWidth;
      this._height = source.videoHeight;
    }
    for (const rg of this._renderGroups) {
      rg.setNeedsRender(true);
    }
  }

  bindToSlot(slot: number) {
    const gl = this._gl;
    gl.activeTexture(gl.TEXTURE0 + slot);
    gl.bindTexture(gl.TEXTURE_2D, this._texture);
  }

  update() {
    const gl = this._gl;
    const source = this._source;
    if (source) {
      gl.bindTexture(gl.TEXTURE_2D, this._texture);
      if (source instanceof HTMLCanvasElement) {
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 0);
        gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, gl.RGBA, gl.UNSIGNED_BYTE, source);
      } else if (source instanceof HTMLVideoElement) {
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 0);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, source);
      }
    }
    for (const rg of this._renderGroups) {
      rg.setNeedsRender(true);
    }
  }

  addRenderGroup(rg: RenderGroup) {
    this._renderGroups.add(rg);
  }

  release() {
    this._source = null;
    this._gl.deleteTexture(this._texture);
  }
}
