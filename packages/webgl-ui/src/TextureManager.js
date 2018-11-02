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

import {ClampToEdgeWrapping, LinearFilter, Texture, UVMapping} from 'three';

type CustomProtocolTransform = string => Promise<Image | HTMLCanvasElement>;

const PROTOCOL = /^([a-zA-Z]+):/;

function loadTextureFromURL(url): Promise<Texture> {
  if (typeof self.createImageBitmap === 'function') {
    return fetch(url)
      .then(response => response.blob())
      .then(blob => self.createImageBitmap(blob, {imageOrientation: 'flipY'}))
      .then(imageBitmap => {
        const tex = new Texture(imageBitmap);
        tex.needsUpdate = true;
        return tex;
      });
  }
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const tex = new Texture(img);
      tex.needsUpdate = true;
      resolve(tex);
    };
    img.src = url;
  });
}

export default class TextureManager {
  _customProtocols: {[protocol: string]: CustomProtocolTransform};
  _pendingTextures: {[url: string]: Promise<Texture>};
  _textureMap: {[url: string]: Texture};
  _textureResolvers: {[url: string]: (Texture) => mixed};

  constructor() {
    this._customProtocols = {};
    this._pendingTextures = {};
    this._textureMap = {};
    this._textureResolvers = {};
  }

  getTextureForURL(url: string): Promise<Texture> {
    if (this._textureMap[url]) {
      // Already registered source, return the texture
      return Promise.resolve(this._textureMap[url]);
    }
    if (this._pendingTextures[url]) {
      // Other components are waiting on the source, wait on the same Promise
      return this._pendingTextures[url];
    }

    if (url.startsWith('texture://')) {
      // Local texture
      const promise = new Promise(resolve => {
        this._textureResolvers[url] = resolve;
      });
      this._pendingTextures[url] = promise;
      return promise;
    }
    const protocolMatch = url.match(PROTOCOL);
    if (protocolMatch) {
      const protocol = protocolMatch[1];
      const transform = this._customProtocols[protocol];
      if (transform) {
        const promise = transform(url).then(img => {
          let tex = img;
          if (!(tex instanceof Texture)) {
            tex = new Texture(
              img,
              UVMapping,
              ClampToEdgeWrapping,
              ClampToEdgeWrapping,
              LinearFilter,
              LinearFilter
            );
          }
          tex.needsUpdate = true;
          this._textureMap[url] = tex;
          delete this._pendingTextures[url];
          return tex;
        });
        this._pendingTextures[url] = promise;
        return promise;
      }
    }
    // Network texture
    const promise = loadTextureFromURL(url)
      .then(tex => {
        this._textureMap[url] = tex;
        delete this._pendingTextures[url];
        return tex;
      })
      .catch(err => {
        console.log(err);
      });
    this._pendingTextures[url] = promise;
    return promise;
  }

  registerLocalTextureSource(name: string, source: Element) {
    if (source instanceof HTMLCanvasElement || source instanceof Image) {
      const tex = new Texture(source);
      tex.needsUpdate = true;
      const url = `texture://${name}`;
      this._textureMap[url] = tex;
      delete this._pendingTextures[url];
      if (this._textureResolvers[url]) {
        this._textureResolvers[url](tex);
        delete this._textureResolvers[url];
      }
    } else {
      throw new Error('Unsupported texture source');
    }
  }

  registerCustomProtocol(protocol: string, transform: CustomProtocolTransform) {
    this._customProtocols[protocol] = transform;
  }
}
