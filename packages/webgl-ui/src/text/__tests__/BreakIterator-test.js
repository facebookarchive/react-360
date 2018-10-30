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

/* eslint-disable import/no-commonjs */

jest.dontMock('../BreakIterator');

const BreakIterator = require('../BreakIterator').default;

describe('BreakIterator', () => {
  it('breaks at the end of whitespace', () => {
    const bi = new BreakIterator('en', 'firstchunk   secondchunk ', {
      forcePolyfill: true,
    });
    expect(bi.next().value).toBe(13);
  });

  it('breaks on newlines', () => {
    const bi = new BreakIterator('en', 'firstchunk \n  secondchunk ', {
      forcePolyfill: true,
    });
    expect(bi.next().value).toBe(12);
  });

  it('exposes a true iterator', () => {
    const text = 'aaa bbb. ccc ddd';
    const bi = new BreakIterator('en', text, {forcePolyfill: true});
    const chunks = [];
    let cursor = bi.current();
    for (const breakpoint of bi) {
      chunks.push(text.slice(cursor, breakpoint));
      cursor = breakpoint;
    }
    expect(chunks).toEqual(['aaa ', 'bbb. ', 'ccc ', 'ddd']);
  });
});
