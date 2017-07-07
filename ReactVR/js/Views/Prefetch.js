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

import RCTBaseView from './BaseView';
import merge from '../Utils/merge';
import * as THREE from 'three';
import * as OVRUI from 'ovrui';

export default class RCTPrefetch extends RCTBaseView {
  /**
   * constructor: allocates the required resources and sets defaults
   */
  constructor(guiSys, rnctx) {
    super();

    this.view = new OVRUI.UIView(guiSys);

    Object.defineProperty(this.props, 'source', {
      set: value => {
        if (Array.isArray(value)) {
          this.prefetch(value);
        } else {
          this.prefetch(value.uri);
        }
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
          'Prefetch expected cubemap source in format [{uri: http..}, {uri: http..}, ... ]'
        );
        return;
      }
      // Transform the input array into an array of url strings for threejs to load.
      const urls = uri.map(function(x) {
        return x.uri;
      });

      const loader = new THREE.CubeTextureLoader();
      loader.setCrossOrigin('Access-Control-Allow-Origin');
      loader.load(urls, texture => RCTPrefetch.addToCache(urls, texture), () => {}, () => {});
    } else {
      // Panorama
      const loader = new THREE.TextureLoader();
      loader.setCrossOrigin('Access-Control-Allow-Origin');
      loader.load(uri, texture => RCTPrefetch.addToCache(uri, texture), () => {}, () => {});
    }
  }

  /**
   * addToCache
   * Add a texture in the cache
   */
  static addToCache(uri, texture) {
    if (!RCTPrefetch.cache) {
      RCTPrefetch.cache = {};
    }

    RCTPrefetch.cache[uri] = texture;
  }

  /**
   * isCached
   */
  static isCached(uri) {
    return RCTPrefetch.cache && RCTPrefetch.cache.hasOwnProperty(uri);
  }

  /**
   * getFromCache
   */
  static getFromCache(uri) {
    return RCTPrefetch.cache && RCTPrefetch.cache[uri];
  }

  /**
   * removeFromCache
   */
  static removeFromCache(uri) {
    if (RCTPrefetch.cache) {
      delete RCTPrefetch.cache[uri];
    }
  }

  /**
   * Dispose of any associated resources
   */
  dispose() {
    super.dispose();
    RCTPrefetch.removeFromCache(this.props.source);
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
