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

type TextureSource = Image | ImageBitmap;

const ImageBitmap =
  self.ImageBitmap ||
  class ImageBitmap {
    width: number;
    height: number;
  };

/**
 * Generate a method to slice a single image into cubemap faces
 */
const sliceImage = (function() {
  // createImageBitmap is a faster, asynchronous method to extract image subdata
  if (typeof self.createImageBitmap === 'function') {
    return function(source: TextureSource, widthSegments: number, heightSegments: number) {
      const width = source instanceof Image ? source.naturalWidth : source.width;
      const height = source instanceof Image ? source.naturalHeight : source.height;
      const wSize = width / widthSegments;
      const hSize = height / heightSegments;
      const slices = [];
      for (let j = 0; j < heightSegments; j++) {
        for (let i = 0; i < widthSegments; i++) {
          slices.push(self.createImageBitmap(source, i * wSize, j * hSize, wSize, hSize));
        }
      }
      return Promise.all(slices);
    };
  }
  let canvas = null;
  let context = null;
  // if createImageBitmap is not available, fall back to drawing individual
  // faces to an invisible canvas, then extracting the data from them
  return function(source: TextureSource, widthSegments: number, heightSegments: number) {
    if (!canvas) {
      canvas = document.createElement('canvas');
      context = canvas.getContext('2d');
    }
    if (!context) {
      return Promise.reject();
    }
    const width = source instanceof Image ? source.naturalWidth : source.width;
    const height = source instanceof Image ? source.naturalHeight : source.height;
    const wSize = width / widthSegments;
    const hSize = height / heightSegments;
    canvas.width = wSize;
    canvas.height = hSize;
    const slices = [];
    for (let j = 0; j < heightSegments; j++) {
      for (let i = 0; i < widthSegments; i++) {
        context.drawImage(source, i * wSize, j * hSize, wSize, hSize, 0, 0, wSize, hSize);
        slices.push(context.getImageData(0, 0, wSize, hSize));
      }
    }
    return Promise.resolve(slices);
  };
})();

function extractFaces(source: TextureSource, widthSegments: number, heightSegments: number) {
  if (Array.isArray(source)) {
    return Promise.resolve(source);
  }
  return sliceImage(source, widthSegments, heightSegments);
}

export default class CubemapTexture {
  _gl: WebGLRenderingContext;
  _renderGroups: Set<RenderGroup>;
  _source: ?TextureSource;
  _texture: WebGLTexture;

  constructor(gl: WebGLRenderingContext) {
    this._gl = gl;
    this._renderGroups = new Set();
    this._texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_CUBE_MAP, this._texture);
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
    gl.texImage2D(
      gl.TEXTURE_CUBE_MAP_POSITIVE_X,
      0,
      gl.RGBA,
      1,
      1,
      0,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      new Uint8Array([0, 0, 0, 0])
    );
    gl.texImage2D(
      gl.TEXTURE_CUBE_MAP_NEGATIVE_X,
      0,
      gl.RGBA,
      1,
      1,
      0,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      new Uint8Array([0, 0, 0, 0])
    );
    gl.texImage2D(
      gl.TEXTURE_CUBE_MAP_POSITIVE_Y,
      0,
      gl.RGBA,
      1,
      1,
      0,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      new Uint8Array([0, 0, 0, 0])
    );
    gl.texImage2D(
      gl.TEXTURE_CUBE_MAP_NEGATIVE_Y,
      0,
      gl.RGBA,
      1,
      1,
      0,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      new Uint8Array([0, 0, 0, 0])
    );
    gl.texImage2D(
      gl.TEXTURE_CUBE_MAP_POSITIVE_Z,
      0,
      gl.RGBA,
      1,
      1,
      0,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      new Uint8Array([0, 0, 0, 0])
    );
    gl.texImage2D(
      gl.TEXTURE_CUBE_MAP_NEGATIVE_Z,
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

  getGLTexture() {
    return this._texture;
  }

  setSource(source: TextureSource, widthSegments: number, heightSegments: number) {
    this._source = source;
    const gl = this._gl;
    extractFaces(source, widthSegments, heightSegments).then(faces => {
      gl.bindTexture(gl.TEXTURE_CUBE_MAP, this._texture);
      gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, faces[0]);
      gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_X, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, faces[1]);
      gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_Y, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, faces[2]);
      gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, faces[3]);
      gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_Z, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, faces[4]);
      gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_Z, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, faces[5]);
      gl.generateMipmap(gl.TEXTURE_CUBE_MAP);

      for (const rg of this._renderGroups) {
        rg.setNeedsRender(true);
      }
    });
  }

  bindToSlot(slot: number) {
    const gl = this._gl;
    gl.activeTexture(gl.TEXTURE0 + slot);
    gl.bindTexture(gl.TEXTURE_CUBE_MAP, this._texture);
  }

  addRenderGroup(rg: RenderGroup) {
    this._renderGroups.add(rg);
  }

  release() {
    this._source = null;
    this._gl.deleteTexture(this._texture);
  }
}
