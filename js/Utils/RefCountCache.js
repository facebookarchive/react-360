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

type CacheEntry<T> = {
  refs: number,
  state: T,
};

export type CacheCleanupMethod<T> = (path: string, entry: T) => void;

/**
 * RefCountCache is a basic cache that stores entries as long as there is an
 * external reference to them. When no objects remain referencing the cached
 * value, the entry is ejected.
 */
export default class RefCountCache<T> {
  _cleanup: ?CacheCleanupMethod<T>;
  _stateCache: {[path: string]: CacheEntry<T>};

  constructor(cleanup: ?CacheCleanupMethod<T>) {
    this._cleanup = cleanup;
    this._stateCache = {};
  }

  has(path: string): boolean {
    return !!this._stateCache[path];
  }

  get(path: string): T {
    const entry = this._stateCache[path];
    if (!entry) {
      throw new Error(`RefCountCache entry for ${path} not found`);
    }
    return entry.state;
  }

  addEntry(path: string, state: T) {
    const prev = this._stateCache[path];
    if (prev) {
      return;
    }
    this._stateCache[path] = {
      refs: 1,
      state: state,
    };
  }

  addReference(path: string): number {
    const prev = this._stateCache[path];
    if (!prev) {
      return 0;
    }
    prev.refs++;
    return prev.refs;
  }

  removeReference(path: string): number {
    const prev = this._stateCache[path];
    if (!prev) {
      return 0;
    }
    prev.refs--;
    if (prev.refs <= 0) {
      if (this._cleanup) {
        this._cleanup(path, prev.state);
      }
      delete this._stateCache[path];
    }
    return Math.max(0, prev.refs);
  }
}
