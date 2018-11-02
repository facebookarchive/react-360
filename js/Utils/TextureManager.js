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

import RefCountCache from './RefCountCache';

import {Texture, TextureLoader} from 'three';

export type LocalTextureOptions = {
  updateOnFrame?: boolean,
};

/**
 * TextureManager manages remote and in-memory Textures, and makes sure that
 * they are shared among meshes and images when appropriate.
 *
 * The caching strategy is twofold:
 *   - Any textures that are currently in use are kept in a ref-counting cache.
 *     When no more references to that resource remain, the texture is removed
 *     from that cache but not yet disposed.
 *   - From there, it moves to a queue of fixed size. As new entries come
 *     in, older entries are ejected, and the underlying Texture is finally
 *     disposed.
 * This makes sure that textures in use are always available, but also covers
 * cases where a single reference to a texture is unmounted and soon remounted.
 */
export default class TextureManager {
  _customTextureLoads: {[url: string]: (Texture) => void};
  _customTexturesWithUpdates: Array<Texture>;
  _ejectionQueue: Array<string>;
  _pendingTextures: {[url: string]: Promise<Texture>};
  _queueSize: number;
  _refCountCache: RefCountCache<boolean>;
  _textureMap: {[url: string]: Texture};

  constructor(queueSize: number = 10) {
    this._queueSize = queueSize;
    // Map of URL to Textures
    this._textureMap = {};
    // Map of URL to Promises that will be resolved when the texture loads
    this._pendingTextures = {};
    // Queue of recently-used Textures waiting to be ejected
    this._ejectionQueue = [];
    // Promise resolvers for requests that occur before a source is registered
    this._customTextureLoads = {};
    // Array of textures that need to be updated each frame
    this._customTexturesWithUpdates = [];
    // Reference-counting cache of Textures in use
    this._refCountCache = new RefCountCache(
      // cleanup method
      path => {
        // move texture to queue
        this._ejectionQueue.push(path);
        if (this._ejectionQueue.length > this._queueSize) {
          const ejected = this._ejectionQueue.shift();
          const tex = this._textureMap[ejected];
          delete this._textureMap[ejected];
          if (tex) {
            tex.dispose();
          }
        }
      }
    );
  }

  /**
   * Status methods, mostly for testing purposes
   */
  isTextureCached(url: string) {
    return url in this._textureMap;
  }

  isTextureLoading(url: string) {
    return url in this._pendingTextures;
  }

  isTextureReferenced(url: string) {
    return this._refCountCache.has(url);
  }

  isTextureInEjectionQueue(url: string) {
    return this._ejectionQueue.indexOf(url) > -1;
  }

  /**
   * Load a Texture, returning a promise that is resolved when the Texture
   * is ready. This method does not manage any reference counting - the
   * component using the Texture should handle that as part of its lifecycle.
   * If a texture has been cached, it immediately resolves.
   * If other components are already waiting on the texture, hang on that Promise
   * Else, create a Promise that will be resolved when the texture is loaded
   */
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
      const promise = new Promise((resolve, reject) => {
        this._customTextureLoads[url] = resolve;
      });
      this._pendingTextures[url] = promise;
      return promise;
    }
    // Network texture
    const promise = new Promise((resolve, reject) => {
      const loader = new TextureLoader();
      loader.setCrossOrigin('anonymous');
      loader.load(
        url,
        texture => {
          this._textureMap[url] = texture;
          delete this._pendingTextures[url];
          resolve(texture);
        },
        undefined,
        error => {
          reject(error);
        }
      );
    });
    this._pendingTextures[url] = promise;
    return promise;
  }

  addReference(url: string): void {
    if (url.startsWith('texture://')) {
      // We don't refcount in-memory textures
      return;
    }
    if (this._refCountCache.has(url)) {
      this._refCountCache.addReference(url);
    } else {
      const index = this._ejectionQueue.indexOf(url);
      if (index > -1) {
        // Promote it from the ejection queue
        this._ejectionQueue.splice(index, 1);
      }
      this._refCountCache.addEntry(url, true);
    }
  }

  removeReference(url: string): void {
    if (url.startsWith('texture://')) {
      // We don't refcount in-memory textures
      return;
    }
    if (this._refCountCache.has(url)) {
      this._refCountCache.removeReference(url);
    }
  }

  /**
   * Register a local (in-memory) texture source with a unique identifier.
   */
  registerLocalTextureSource(name: string, source: Element, options: LocalTextureOptions = {}) {
    if (source instanceof HTMLCanvasElement) {
      const tex = new Texture(source);
      tex.needsUpdate = true;
      const url = 'texture://' + name;
      this._textureMap[url] = tex;
      if (options.updateOnFrame) {
        this._customTexturesWithUpdates.push(tex);
      }
      delete this._pendingTextures[url];
      if (this._customTextureLoads[url]) {
        this._customTextureLoads[url](tex);
        delete this._customTextureLoads[url];
      }
    } else {
      throw new Error('Unsupported texture source');
    }
  }

  /**
   * Run updates once per frame
   */
  frame() {
    const textures = this._customTexturesWithUpdates;
    for (let i = 0, length = textures.length; i < length; i++) {
      textures[i].needsUpdate = true;
    }
  }
}
