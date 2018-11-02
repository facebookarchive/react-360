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

export type DisposeMethod<T> = (res: T) => mixed;
export type ForEachCallback<T> = (url: string, res: T) => mixed;
export type LoadMethod<T> = (url: string, options?: Object) => Promise<T>;

/**
 * ResourceManager manages arbitrary resources, and makes sure that they are
 * shared among reference points when appropriate.
 *
 * The caching strategy is twofold:
 *   - Any resources that are currently in use are kept in a ref-counting cache.
 *     When no more references to that resource remain, it is removed from that
 *     cache but not yet disposed.
 *   - From there, it moves to a queue of fixed size. As new entries come
 *     in, older entries are ejected, and the underlying resource is finally
 *     disposed.
 * This makes sure that resources in use are always available, but also covers
 * cases where a single reference to a resource is unmounted and soon remounted.
 *
 * The resource manager is only intended as an abstract data structure that does
 * not contain any logic specific to any resource type. Given the ability to
 * provide custom loaders, disposers, and iterators, many effects can be
 * implemented on top of this class.
 */
export default class ResourceManager<T> {
  _disposeMethod: ?DisposeMethod<T>;
  _ejectionQueue: Array<string>;
  _loadMethod: LoadMethod<T>;
  _pendingResources: {[url: string]: Promise<T>};
  _queueSize: number;
  _refCountCache: RefCountCache<boolean>;
  _resourceMap: {[url: string]: T};

  constructor(
    load: LoadMethod<T>,
    dispose?: ?DisposeMethod<T>,
    queueSize: number = 10,
  ) {
    // Optional method used to clean up a resource when it is ejected
    this._disposeMethod = dispose;
    // Queue of recently-used Textures waiting to be ejected
    this._ejectionQueue = [];
    // Method used to load a resource
    this._loadMethod = load;
    // Map of URL to Promises that will be resolved when the texture loads
    this._pendingResources = {};
    // Length of ejection queue
    this._queueSize = queueSize;
    // Reference-counting cache of resources in use
    this._refCountCache = new RefCountCache(
      // cleanup method
      path => {
        // move resource to queue
        this._ejectionQueue.push(path);
        if (this._ejectionQueue.length > this._queueSize) {
          const ejected = this._ejectionQueue.shift();
          const res = this._resourceMap[ejected];
          delete this._resourceMap[ejected];
          if (this._disposeMethod && res) {
            this._disposeMethod(res);
          }
        }
      },
    );
    // Map of url to resources
    this._resourceMap = {};
  }

  /**
   * Status methods, mostly for testing purposes
   */
  isResourceCached(url: string) {
    return url in this._resourceMap;
  }

  isResourceLoading(url: string) {
    return url in this._pendingResources;
  }

  isResourceReferenced(url: string) {
    return this._refCountCache.has(url);
  }

  isResourceInEjectionQueue(url: string) {
    return this._ejectionQueue.indexOf(url) > -1;
  }

  getResourceForURL(url: string, options?: Object): Promise<T> {
    if (this._resourceMap[url]) {
      // Already registered, return the resource
      return Promise.resolve(this._resourceMap[url]);
    }
    if (this._pendingResources[url]) {
      // Other components are waiting on the resource, wait on the same Promise
      return this._pendingResources[url];
    }
    const promise = new Promise((resolve, reject) => {
      this._loadMethod(url, options).then(
        res => {
          this._resourceMap[url] = res;
          delete this._pendingResources[url];
          resolve(res);
        },
        err => {
          reject(err);
        },
      );
    });
    this._pendingResources[url] = promise;
    return promise;
  }

  addReference(url: string): void {
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
    if (this._refCountCache.has(url)) {
      this._refCountCache.removeReference(url);
    }
  }

  forEach(cb: ForEachCallback<T>) {
    for (const url in this._resourceMap) {
      cb(url, this._resourceMap[url]);
    }
  }
}
