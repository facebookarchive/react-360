/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

jest.dontMock('../areStylePropsEqual');

const areStylePropsEqual = require('../areStylePropsEqual').default;

describe('areStylePropsEqual', () => {
  test('works for falsy values', () => {
    expect(areStylePropsEqual(null, null)).toBe(true);
    expect(areStylePropsEqual(false, false)).toBe(true);
    expect(areStylePropsEqual(null, false)).toBe(true);
    expect(areStylePropsEqual(false, {})).toBe(false);
  });

  test('works for the same object', () => {
    const styles = {top: 10};
    expect(areStylePropsEqual(styles, styles)).toBe(true);
    const frozen = Object.freeze(styles);
    expect(areStylePropsEqual(frozen, frozen)).toBe(true);
    const next = Object.freeze({bottom: 4});
    expect(areStylePropsEqual(frozen, next)).toBe(false);
    expect(areStylePropsEqual(next, frozen)).toBe(false);
  });

  test('works for arrays of styles', () => {
    expect(areStylePropsEqual([], [])).toBe(true);
    expect(areStylePropsEqual([false], [false])).toBe(true);
    const styles = {
      vertical: {top: 10, bottom: 10},
      horizontal: {left: 30, right: 30},
    };
    expect(areStylePropsEqual([styles.vertical], [styles.vertical])).toBe(true);
    expect(areStylePropsEqual([styles.vertical], [styles.horizontal])).toBe(false);
    expect(areStylePropsEqual([styles.horizontal], [styles.vertical])).toBe(false);
    expect(
      areStylePropsEqual([styles.vertical, styles.horizontal], [styles.vertical, styles.horizontal])
    ).toBe(true);
  });
});
