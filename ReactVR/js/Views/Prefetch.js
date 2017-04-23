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
          // TODO: Handle cubemaps
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

    const onTextureLoad = texture => {
      RCTPrefetch.addToCache(uri, texture);
    };

    const onError = () => {};

    const loader = new THREE.TextureLoader();
    loader.load(uri, onTextureLoad, undefined, () => onError()); // onProgress
  }

  /**
   * addToCache
   * Add a texture in the cache
   */
  static addToCache(uri, texture) {
    if (!RCTPrefetch.cache) {
      RCTPrefetch.cache = [];
    }

    RCTPrefetch.cache[uri] = texture;
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
      RCTPrefetch.cache[uri] = null;
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
