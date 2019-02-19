/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

jest.dontMock('../RefCountCache');

const RefCountCache = require('../RefCountCache').default;

describe('RefCountCache', () => {
  test('insertion', () => {
    const cache = new RefCountCache();
    const obj = {};
    expect(cache.has('obj')).toBe(false);
    cache.addEntry('obj', obj);
    expect(cache.has('obj')).toBe(true);
    expect(cache.get('obj')).toBe(obj);
  });

  test('override', () => {
    const cache = new RefCountCache();
    const a = {};
    const b = {};
    cache.addEntry('path', a);
    expect(cache.get('path')).toBe(a);
    cache.addEntry('path', b);
    expect(cache.get('path')).toBe(b);
  });

  test('reference counting', () => {
    const cache = new RefCountCache();
    cache.addEntry('a', {});
    expect(cache.addReference('a')).toBe(2);
    expect(cache.addReference('a')).toBe(3);
    expect(cache.removeReference('a')).toBe(2);
    expect(cache.removeReference('a')).toBe(1);
  });

  test('getting value on queue', () => {
    const cache = new RefCountCache();
    const a = {};
    cache.addEntry('a', a);
    expect(cache.removeReference('a')).toBe(0);
    expect(cache.get('a')).toBe(a);
  });

  test('ejection', () => {
    const ejected = [];
    const cache = new RefCountCache(
      function(path) {
        ejected.push(path);
      },
      {queueSize: 2}
    );
    cache.addEntry('a', {});
    cache.addEntry('b', {});
    cache.addEntry('c', {});
    cache.removeReference('b');
    cache.removeReference('c');
    // Cache should be able to hold two elements
    expect(ejected).toEqual([]);
    cache.removeReference('a');
    expect(ejected).toEqual(['b']);
    cache.addEntry('d', {});
    cache.removeReference('d');
    expect(ejected).toEqual(['b', 'c']);
  });

  test('count does not go below zero', () => {
    const cache = new RefCountCache();
    cache.addEntry('a', {});
    expect(cache.removeReference('a')).toBe(0);
    expect(cache.removeReference('a')).toBe(0);
  });

  test('ejected entries cannot be queued twice', () => {
    const ejected = [];
    const cache = new RefCountCache(
      function(path) {
        ejected.push(path);
      },
      {queueSize: 2}
    );
    cache.addEntry('a', {});
    cache.addEntry('b', {});
    cache.addEntry('c', {});
    cache.addEntry('d', {});
    cache.addEntry('e', {});
    cache.removeReference('a');
    cache.removeReference('b');
    cache.removeReference('b');
    cache.removeReference('b');
    cache.removeReference('c');
    expect(ejected).toEqual(['a']);
    cache.removeReference('d');
    cache.removeReference('e');
    expect(ejected).toEqual(['a', 'b', 'c']);
  });

  test('resurrection from queue', () => {
    const ejected = [];
    const cache = new RefCountCache(
      function(path) {
        ejected.push(path);
      },
      {queueSize: 2}
    );
    cache.addEntry('a', {});
    cache.addEntry('b', {});
    cache.addEntry('c', {});
    cache.addEntry('d', {});
    cache.addEntry('e', {});
    cache.removeReference('b'); // queue is ['b']
    cache.removeReference('d'); // queue is ['d', 'b']
    cache.removeReference('c'); // queue is ['c', 'd']
    expect(ejected).toEqual(['b']);
    expect(cache.addReference('d')).toBe(1); // queue is ['c']
    cache.removeReference('e'); // queue is ['e', 'c']
    cache.removeReference('a'); // queue is ['a', 'e']
    expect(ejected).toEqual(['b', 'c']);
  });
});
