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

jest.dontMock('../BreakIterator').dontMock('../wrapText');

const wrapText = require('../wrapText').default;

const monospaceTextImpl = {
  extractGlyphs(font, size, text) {
    const glyphs = [];
    for (const glyph of text) {
      if (glyph.match(/[\r\n]/)) {
        continue;
      }
      glyphs.push({
        code: glyph,
        attributes: {},
        color: 0xffffffff,
        metrics: {
          ascend: 18,
          descend: 0,
          lineHeight: 24,
          width: 14,
        },
      });
    }
    return {
      glyphs,
      maxAscend: 18,
      maxDescend: 0,
      totalWidth: 14 * glyphs.length,
    };
  },
};

describe('wrapText', () => {
  it('ignores unbroken lines of text', () => {
    const text = 'One unbroken line of text';
    const wrapped = wrapText(monospaceTextImpl, '', 20, text, undefined, {
      forcePolyfill: true,
    });
    const lines = wrapped.lines;
    expect(lines.length).toBe(1);
    expect(lines[0].width).toBe(text.length * 14);
    expect(lines[0].glyphs.map(g => g.code)).toEqual([...text]);
  });

  it('works with unicode', () => {
    const text = 'With emoji 😎!';
    const wrapped = wrapText(monospaceTextImpl, '', 20, text, undefined, {
      forcePolyfill: true,
    });
    const lines = wrapped.lines;
    expect(lines.length).toBe(1);
    expect(lines[0].width).toBe(13 * 14);
    expect(lines[0].glyphs.length).toBe(13);
    expect(lines[0].glyphs.map(g => g.code)).toEqual([...text]);
  });

  it('wraps text when width is limited', () => {
    const text = 'Long sentence for multiple lines';
    const wrapped = wrapText(monospaceTextImpl, '', 20, text, 18 * 14, {
      forcePolyfill: true,
    });
    const lines = wrapped.lines;
    expect(lines.length).toBe(2);
    expect(lines[0].glyphs.map(g => g.code)).toEqual([...'Long sentence for ']);
    expect(lines[0].width).toBe(18 * 14);
    expect(lines[1].glyphs.map(g => g.code)).toEqual([...'multiple lines']);
    expect(lines[1].width).toBe(14 * 14);
  });

  it('forces a wrap on a newline', () => {
    const text = 'Multi-line text\n  should be split';
    const wrapped = wrapText(monospaceTextImpl, '', 20, text, undefined, {
      forcePolyfill: true,
    });
    const lines = wrapped.lines;
    expect(lines.length).toBe(2);
    expect(lines[0].glyphs.map(g => g.code)).toEqual([...'Multi-line text']);
    expect(lines[1].glyphs.map(g => g.code)).toEqual([...'  should be split']);
  });

  it('forces multiple newlines', () => {
    const text = 'Multi-line text\n\n\n  should be split';
    const wrapped = wrapText(monospaceTextImpl, '', 20, text, undefined, {
      forcePolyfill: true,
    });
    const lines = wrapped.lines;
    expect(lines.length).toBe(4);
    expect(lines[0].glyphs.map(g => g.code)).toEqual([...'Multi-line text']);
    expect(lines[1].glyphs).toEqual([]);
    expect(lines[2].glyphs).toEqual([]);
    expect(lines[3].glyphs.map(g => g.code)).toEqual([...'  should be split']);
  });
});
