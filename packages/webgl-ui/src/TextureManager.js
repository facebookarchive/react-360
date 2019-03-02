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

import {Texture} from 'webgl-lite';

type CustomProtocolTransform = string => Promise<Image | HTMLCanvasElement>;

const PROTOCOL = /^([a-zA-Z]+):/;

function loadTextureFromURL(gl, url): Texture {
  const tex = new Texture(gl);
  const imageRequest =
    typeof self.createImageBitmap === 'function'
      ? new Promise((resolve, reject) => {
          fetch(url, {mode: 'cors'})
            .then(response => response.blob())
            .then(blob => {
              return self.createImageBitmap(blob);
            })
            .then(resolve, err => {
              // Network or bitmap error occurred, try img fallback
              resolve(imgPromise(url));
            });
        })
      : imgPromise(url);
  imageRequest.then(image => {
    tex.setSource(image);
  });
  return tex;
}

function imgPromise(src): Promise<Image> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = () => {
      resolve(img);
    };
    img.src = src;
  });
}

export default class TextureManager {
  _customProtocols: {[protocol: string]: CustomProtocolTransform};
  _gl: WebGLRenderingContext;
  _textureMap: {[url: string]: Texture};

  constructor(gl: WebGLRenderingContext) {
    this._customProtocols = {};
    this._gl = gl;
    this._textureMap = {};
  }

  getGLContext() {
    return this._gl;
  }

  getTextureForURL(url: string): Texture {
    if (this._textureMap[url]) {
      // Already registered source, return the texture
      return this._textureMap[url];
    }
    const protocolMatch = url.match(PROTOCOL);
    if (protocolMatch) {
      const protocol = protocolMatch[1];
      const transform = this._customProtocols[protocol];
      if (transform) {
        const loader = transform(url);
        if (loader instanceof Texture) {
          this._textureMap[url] = loader;
          return loader;
        } else if (loader instanceof Promise) {
          const tex = new Texture(this._gl);
          loader.then(img => {
            tex.setSource(img);
          });
          this._textureMap[url] = tex;
          return tex;
        }
        throw new Error('Custom texture protocol returned unsupported type');
      }
    }
    // Network texture
    const tex = loadTextureFromURL(this._gl, url);
    this._textureMap[url] = tex;
    return tex;
  }

  registerLocalTextureSource(name: string, source: Element) {
    if (source instanceof HTMLCanvasElement || source instanceof Image) {
      const tex = new Texture(this._gl, {source});
      const url = `texture://${name}`;
      this._textureMap[url] = tex;
    } else {
      throw new Error('Unsupported texture source');
    }
  }

  registerCustomProtocol(protocol: string, transform: CustomProtocolTransform) {
    this._customProtocols[protocol] = transform;
  }
}
