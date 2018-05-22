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
  measure(font, size, text) {
    const glyphMetrics = [];
    for (const glyph of text) {
      if (glyph.match(/[\r\n]/)) {
        continue;
      }
      glyphMetrics.push({
        ascend: 18,
        descend: 0,
        lineHeight: 24,
        width: 14,
      });
    }
    return {
      glyphMetrics,
      maxAscend: 18,
      maxDescend: 0,
      width: 14 * glyphMetrics.length,
    };
  },
};

describe('wrapText', () => {
  it('ignores unbroken lines of text', () => {
    const text = 'One unbroken line of text';
    const wrapped = wrapText(monospaceTextImpl, '', 20, text, undefined, {
      forcePolyfill: true,
    });
    expect(wrapped.length).toBe(1);
    expect(wrapped[0].text).toBe(text);
    expect(wrapped[0].dimensions.width).toBe(text.length * 14);
    expect(wrapped[0].dimensions.glyphMetrics.length).toBe(text.length);
  });

  it('works with unicode', () => {
    const text = 'With emoji 😎!';
    const wrapped = wrapText(monospaceTextImpl, '', 20, text, undefined, {
      forcePolyfill: true,
    });
    expect(wrapped.length).toBe(1);
    expect(wrapped[0].text).toBe(text);
    expect(wrapped[0].dimensions.width).toBe(13 * 14);
    expect(wrapped[0].dimensions.glyphMetrics.length).toBe(13);
  });

  it('wraps text when width is limited', () => {
    const text = 'Long sentence for multiple lines';
    const wrapped = wrapText(monospaceTextImpl, '', 20, text, 18 * 14, {
      forcePolyfill: true,
    });
    expect(wrapped.length).toBe(2);
    expect(wrapped[0].text).toBe('Long sentence for ');
    expect(wrapped[0].dimensions.width).toBe(18 * 14);
    expect(wrapped[1].text).toBe('multiple lines');
    expect(wrapped[1].dimensions.width).toBe(14 * 14);
  });

  it('forces a wrap on a newline', () => {
    const text = 'Multi-line text\n  should be split';
    const wrapped = wrapText(monospaceTextImpl, '', 20, text, undefined, {
      forcePolyfill: true,
    });
    expect(wrapped.length).toBe(2);
    expect(wrapped[0].text).toBe('Multi-line text');
    expect(wrapped[1].text).toBe('  should be split');
  });

  it('forces multiple newlines', () => {
    const text = 'Multi-line text\n\n\n  should be split';
    const wrapped = wrapText(monospaceTextImpl, '', 20, text, undefined, {
      forcePolyfill: true,
    });
    expect(wrapped.length).toBe(4);
    expect(wrapped[0].text).toBe('Multi-line text');
    expect(wrapped[1].text).toBe('');
    expect(wrapped[2].text).toBe('');
    expect(wrapped[3].text).toBe('  should be split');
  });
});
