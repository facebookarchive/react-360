/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

jest.dontMock('../colorStringToARGB');

const colorStringToARGB = require('../colorStringToARGB').default;

describe('colorStringToARGB', () => {
  test('invalid', () => {
    expect(colorStringToARGB('blah')).toBe(0);
    expect(colorStringToARGB('#12')).toBe(0);
    expect(colorStringToARGB('#1243')).toBe(0);
    expect(colorStringToARGB('rgb(11,22,55')).toBe(0);
  });

  test('short hex', () => {
    expect(colorStringToARGB('#fff')).toBe(0xffffffff);
    expect(colorStringToARGB('#35d')).toBe(0xff3355dd);
    expect(colorStringToARGB('#000')).toBe(0xff000000);
  });

  test('long hex', () => {
    expect(colorStringToARGB('#ffffff')).toBe(0xffffffff);
    expect(colorStringToARGB('#000000')).toBe(0xff000000);
    expect(colorStringToARGB('#c0ffee')).toBe(0xffc0ffee);
    expect(colorStringToARGB('#cafe55')).toBe(0xffcafe55);
  });

  test('rgb', () => {
    expect(colorStringToARGB('rgb(255, 255, 255)')).toBe(0xffffffff);
    expect(colorStringToARGB('rgb(0, 32, 100)')).toBe(0xff002064);
  });

  test('rgba', () => {
    expect(colorStringToARGB('rgba(0, 0, 0, 1)')).toBe(0xff000000);
    expect(colorStringToARGB('rgba(5, 6, 7, 0.5)')).toBe(0x7f050607);
  });
});
