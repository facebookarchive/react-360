/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';

jest.dontMock('../RefCountCache');

const RefCountCache = require('../RefCountCache').default;

describe('RefCountCache', () => {
  it('can add entries with an initial reference', () => {
    const cache = new RefCountCache();
    const obj = {};
    cache.addEntry('objpath', obj);
    expect(cache.has('objpath')).toBe(true);
    expect(cache.get('objpath')).toBe(obj);
    expect(cache._stateCache['objpath'].refs).toBe(1);
  });

  it('can add references to an existing entry', () => {
    const cache = new RefCountCache();
    const obj = {};
    cache.addEntry('objpath', obj);
    expect(cache.addReference('objpath')).toBe(2);
  });

  it('can remove references from an existing entry', () => {
    const cache = new RefCountCache();
    expect(() => cache.removeReference('objpath')).not.toThrow();
    const obj = {};
    cache.addEntry('objpath', obj);
    expect(cache.addReference('objpath')).toBe(2);
    expect(cache.removeReference('objpath')).toBe(1);
    expect(cache.has('objpath')).toBe(true);
    expect(cache.get('objpath')).toBe(obj);
    expect(cache.removeReference('objpath')).toBe(0);
    expect(cache.has('objpath')).toBe(false);
    expect(() => cache.get('objpath')).toThrow();
  });

  it('runs cleanup methods on removed references', () => {
    const cleaned = {};
    const cache = new RefCountCache((path, entry) => (cleaned[path] = entry));
    const obj = {};
    cache.addEntry('objpath', obj);
    cache.addReference('objpath');
    cache.removeReference('objpath');
    expect(cleaned).toEqual({});
    cache.removeReference('objpath');
    expect(cleaned.objpath).toBe(obj);
    expect(cache.has('objpath')).toBe(false);
  });
});
