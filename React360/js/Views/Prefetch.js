/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

/**
 * RCTPrefetch: Description here
 * @class RCTPrefetch
 * @extends RCTBaseView
 */

import * as THREE from 'three';
import UIView from '../OVRUI/UIView/UIView';
import merge from '../Utils/merge';
import RCTBaseView from './BaseView';

export default class RCTPrefetch extends RCTBaseView {
  /**
   * constructor: allocates the required resources and sets defaults
   */
  constructor(guiSys, rnctx) {
    super();

    this.view = new UIView(guiSys);

    Object.defineProperty(this.props, 'source', {
      set: value => {
        const key = RCTPrefetch.uriKey(value);
        if (this.props._sourceKey) {
          if (this.props._sourceKey === key) {
            // source doesn't change
            return;
          }
          RCTPrefetch.removeKeyFromCache(this.props._sourceKey);
        }
        this.prefetch(value);
        this.props._sourceKey = key;
      },
    });
  }

  /**
   * prefetch
   * Request a load and then add to cache
   */
  prefetch(uri) {
    if (uri == null) {
      return;
    }

    if (Array.isArray(uri)) {
      // Cubemap, check proper format
      if (uri.length !== 6 || !uri[0].uri) {
        console.warn(
          'Prefetch expected cubemap source in format [{uri: http..}, {uri: http..}, ... ]',
        );
        return;
      }
      // Transform the input array into an array of url strings for threejs to load.
      const urls = uri.map(RCTPrefetch.getUri);

      const loader = new THREE.CubeTextureLoader();
      loader.setCrossOrigin('Access-Control-Allow-Origin');
      loader.load(
        urls,
        texture => RCTPrefetch.addToCache(uri, texture),
        () => {},
        () => {},
      );
    } else {
      // Panorama
      const url = RCTPrefetch.getUri(uri);
      const loader = new THREE.TextureLoader();
      loader.setCrossOrigin('Access-Control-Allow-Origin');
      loader.load(
        url,
        texture => RCTPrefetch.addToCache(uri, texture),
        () => {},
        () => {},
      );
    }
  }

  static getUri(uri) {
    return !uri || typeof uri === 'string' ? uri : uri.uri;
  }

  static uriKey(uri) {
    if (Array.isArray(uri)) {
      // Cubemap, check proper format
      if (uri.length === 6) {
        const urls = uri.map(RCTPrefetch.getUri);
        return urls.join(',');
      } else {
        return null;
      }
    }
    return RCTPrefetch.getUri(uri);
  }

  /**
   * addToCache
   * Add a texture in the cache
   */
  static addToCache(uri, texture) {
    if (!RCTPrefetch.cache) {
      RCTPrefetch.cache = {};
    }

    const key = RCTPrefetch.uriKey(uri);
    if (!RCTPrefetch.cache[key]) {
      texture.__prefetchKey = key;
      RCTPrefetch.cache[key] = {
        refs: 1,
        texture: texture,
      };
    } else {
      RCTPrefetch.cache[key].refs++;
    }
  }

  /**
   * isCached
   */
  static isCached(uri) {
    return (
      RCTPrefetch.cache &&
      RCTPrefetch.cache.hasOwnProperty(RCTPrefetch.uriKey(uri))
    );
  }

  /**
   * isCachedTexture
   */
  static isCachedTexture(texture) {
    if (texture.__prefetchKey) {
      if (RCTPrefetch.cache && RCTPrefetch.cache[texture.__prefetchKey]) {
        return (
          RCTPrefetch.cache[texture.__prefetchKey].texture.id === texture.id
        );
      }
    }
    return false;
  }

  /**
   * getFromCache
   * Prefetch is doing reference counting, if get a texture from
   * Prefetch via getFromCache, must also call removeFromCache or
   * removeTextureFromCache when the releasing the texture.
   */
  static getFromCache(uri) {
    const key = RCTPrefetch.uriKey(uri);
    if (RCTPrefetch.cache && RCTPrefetch.cache[key]) {
      RCTPrefetch.cache[key].refs++;
      return RCTPrefetch.cache[key].texture;
    }
    return null;
  }

  /**
   * removeFromCache
   */
  static removeFromCache(uri) {
    RCTPrefetch.removeKeyFromCache(RCTPrefetch.uriKey(uri));
  }

  /**
   * removeTextureFromCache
   */
  static removeTextureFromCache(texture) {
    if (texture.__prefetchKey) {
      RCTPrefetch.removeKeyFromCache(texture.__prefetchKey);
    }
  }

  /**
   * removeKeyFromCache
   * Prefetch is doing reference counting, every <Prefetch> hold
   * a reference, and any usage of getFromCache hold a reference
   */
  static removeKeyFromCache(key) {
    if (RCTPrefetch.cache && RCTPrefetch.cache[key]) {
      RCTPrefetch.cache[key].refs--;
      if (RCTPrefetch.cache[key].refs <= 0) {
        RCTPrefetch.cache[key].texture.dispose();
        delete RCTPrefetch.cache[key];
      }
    }
  }

  /**
   * Dispose of any associated resources
   */
  dispose() {
    super.dispose();
    if (this.props._sourceKey) {
      RCTPrefetch.removeKeyFromCache(this.props._sourceKey);
    }
  }

  /**
   * Describes the properties representable by this view type and merges
   * with super type
   */
  static describe() {
    return merge(super.describe(), {
      // declare the native props sent from react to runtime
      NativeProps: {
        source: 'string',
      },
    });
  }
}
