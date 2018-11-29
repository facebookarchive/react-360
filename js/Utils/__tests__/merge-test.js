/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';

jest.dontMock('../merge');

const merge = require('../merge').default;

describe('merge', () => {
  it('combines unshared properties', () => {
    const a = {a: 1, c: 3};
    const b = {b: 2, d: 4};
    const merged = merge(a, b);
    expect(merged).toEqual({a: 1, b: 2, c: 3, d: 4});
  });

  it('combines nested properties', () => {
    const a = {obj: {b: 2}, c: 3};
    const b = {obj: {a: 1}, d: 4};
    const merged = merge(a, b);
    expect(merged).toEqual({obj: {a: 1, b: 2}, c: 3, d: 4});
  });
});
