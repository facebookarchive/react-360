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

export type CacheOptions = {
  queueSize?: number,
};

const DEFAULT_QUEUE_SIZE = 20;

/**
 * RefCountCache is a basic cache that stores entries as long as there is an
 * external reference to them. References are maintained manually in code. When
 * an entry is no longer referenced, it is placed in a queue for ejection. If it
 * is pushed off of that queue, the cache entry will be removed.
 */
export default class RefCountCache<T> {
  _cache: {[path: string]: CacheEntry<T>};
  _cleanup: ?CacheCleanupMethod<T>;
  _queue: Array<string>;
  _queueSize: number;

  constructor(cleanup: ?CacheCleanupMethod<T>, options?: CacheOptions = {}) {
    this._cleanup = cleanup;
    this._cache = {};
    this._queue = [];
    this._queueSize = Math.max(0, options.queueSize || DEFAULT_QUEUE_SIZE);
  }

  /**
   * Ensure the queue remains within its max size, deleting the oldest elements
   * as needed. Each deleted element is passed to the cleanup method.
   */
  _checkQueue() {
    if (this._queue.length < this._queueSize) {
      return;
    }
    while (this._queue.length > this._queueSize) {
      const path = this._queue.pop();
      const entry = this._cache[path];
      delete this._cache[path];
      if (entry && typeof this._cleanup === 'function') {
        this._cleanup(path, entry.state);
      }
    }
  }

  /**
   * Check if the object referenced by a specific string is currently stored in
   * the cache. This method will still return true if the object is in the
   * ejection queue.
   */
  has(path: string): boolean {
    return path in this._cache;
  }

  /**
   * Get the object referenced by a specific string path. If no such path is
   * stored, it will return undefined.
   */
  get(path: string): void | T {
    const entry = this._cache[path];
    if (!entry) {
      return undefined;
    }
    return entry.state;
  }

  /**
   * Store a value in the cache. Each entry in the cache is referenced by a
   * unique string path that can be used to retrieve the object later.
   * If the path has already been used to store an object, it will be replaced
   * with the newer value.
   * Adding an entry to the cache assumes it has now been referenced in code,
   * and initializes its reference count to 1. This is to mantains the guarantee
   * that  entries with a reference count of zero are found in the ejection
   * queue.
   */
  addEntry(path: string, state: T) {
    const prev = this._cache[path];
    if (prev) {
      prev.state = state;
      return;
    }
    this._cache[path] = {
      refs: 1,
      state: state,
    };
  }

  /**
   * Increase the reference count for a specific path. The new reference count
   * will be returned.
   * If the path is not found in the cache, a value of zero will be returned.
   */
  addReference(path: string): number {
    const prev = this._cache[path];
    if (!prev) {
      return 0;
    }
    if (prev.refs < 1) {
      for (let i = 0; i < this._queue.length; i++) {
        if (this._queue[i] === path) {
          this._queue.splice(i, 1);
          break;
        }
      }
    }
    prev.refs++;
    return prev.refs;
  }

  /**
   * Decrease the reference count for a specific path. The new reference count
   * will be returned.
   * If the reference count reaches zero, the entry will be placed on the
   * ejection queue. The queue will be checked to ensure it hasn't exceeded its
   * max size – if it has, the oldest elements in the queue will be released,
   * and their cleanup methods will be called.
   */
  removeReference(path: string): number {
    const prev = this._cache[path];
    if (!prev) {
      return 0;
    }
    if (prev.refs < 1) {
      return 0;
    }
    prev.refs--;
    if (prev.refs <= 0) {
      prev.refs = 0;
      this._queue.unshift(path);
    }
    this._checkQueue();
    return prev.refs;
  }
}
