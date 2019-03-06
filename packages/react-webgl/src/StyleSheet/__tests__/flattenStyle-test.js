/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

jest.dontMock('../flattenStyle');

const flattenStyle = require('../flattenStyle').default;

describe('flattenStyle', () => {
  test('does not break for empty prop', () => {
    expect(flattenStyle()).toBe(undefined);
    expect(flattenStyle(null)).toBe(null);
    expect(flattenStyle([null])).toEqual({});
  });

  test('has no effect on an object', () => {
    expect(flattenStyle({top: 4, left: 12})).toEqual({top: 4, left: 12});
  });

  test('combines unlike keys', () => {
    expect(flattenStyle([{top: 4, bottom: 5}, {left: 10, right: 20}])).toEqual({
      top: 4,
      bottom: 5,
      left: 10,
      right: 20,
    });
  });

  test('combines matching keys', () => {
    expect(flattenStyle([{top: 4, left: 10}, {left: 20, right: 40}])).toEqual({
      top: 4,
      left: 20,
      right: 40,
    });
  });
});
