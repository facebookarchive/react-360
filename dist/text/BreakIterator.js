/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

/* global Iterator */
const TRAILING_WHITESPACE = /^\S*[ \t]*\r?\n?/;
export default class BreakIterator {
  constructor(locale, text, options = {}) {
    this._text = text;
    this._bi = null;

    if (!options.forcePolyfill) {
      if (window.Intl !== undefined && window.Intl.v8BreakIterator) {
        this._bi = new window.Intl.v8BreakIterator(locale, {
          type: 'line'
        });

        this._bi.adoptText(text);
      }
    }

    this._pos = 0;
  } // $FlowFixMe - Computed properties not supported


  ['@@iterator']() {
    return this;
  } // $FlowFixMe - Computed properties not supported


  [Symbol.iterator]() {
    return this;
  }

  next() {
    const bi = this._bi;

    if (bi) {
      this._pos = bi.next();

      if (this._pos < 0) {
        return {
          done: true
        };
      }
    } else {
      if (this._pos >= this._text.length) {
        return {
          done: true
        };
      }

      const chunk = this._text.slice(this._pos).match(TRAILING_WHITESPACE);

      if (!chunk) {
        // Shouldn't occur
        return {
          done: true
        };
      }

      this._pos += chunk[0].length;
    }

    return {
      done: false,
      value: this._pos
    };
  }

  current() {
    return this._pos;
  }

}