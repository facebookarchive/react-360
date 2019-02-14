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

export type Metrics = {
  ascend: number,
  descend: number,
  width: number,
};

/**
 * Measurement utilities for individual font glyphs.
 * Browsers do not make it easy to extract font dimensions. FontMeasure uses a
 * few techniques to make a best guess at a glyph's width and ascender/descender
 * size.
 * At the moment, the text measurement API only provides width information, and
 * even that isn't perfect. We determine estimated line height / max height by
 * placing two glyphs in an invisible div, and measuring half of the height.
 * From there, we render the glyph to a canvas and measure colored pixels to
 * accurately detect the maximum ascender and descender sizes. This process is
 * typically efficient enough to work for rendering text on demand, even for
 * mobile chipsets, and the results are highly cacheable.
 */
export default class FontMeasure {
  _canvas: HTMLCanvasElement;
  _context: CanvasRenderingContext2D;
  _fontFamily: string;
  _fontSize: number;
  _lineMetrics: HTMLDivElement;
  _lineOne: Text;
  _lineTwo: Text;

  constructor(fontSize: number, fontFamily: string) {
    this._fontSize = fontSize;
    this._fontFamily = fontFamily;

    this._canvas = document.createElement('canvas');
    this._context = this._canvas.getContext('2d');
    this._context.fillStyle = '#000';
    this._context.font = `${fontSize}px ${fontFamily}`;
    this._lineMetrics = document.createElement('div');
    this._lineMetrics.style.fontFamily = fontFamily;
    this._lineMetrics.style.fontSize = `${fontSize}px`;
    this._lineMetrics.style.margin = '0';
    this._lineMetrics.style.padding = '0';
    this._lineMetrics.style.position = 'absolute';
    this._lineMetrics.style.opacity = '0';
    this._lineMetrics.style.top = '-9999px';
    this._lineMetrics.style.left = '-9999px';
    this._lineOne = document.createTextNode('');
    this._lineTwo = document.createTextNode('');
    this._lineMetrics.appendChild(this._lineOne);
    this._lineMetrics.appendChild(document.createElement('br'));
    this._lineMetrics.appendChild(this._lineTwo);
    document.body.appendChild(this._lineMetrics);
  }

  measureGlyph(glyph: string) {
    this._lineOne.data = glyph;
    this._lineTwo.data = glyph;
    const lineHeight = this._lineMetrics.offsetHeight / 2;
    this._canvas.height = lineHeight * 2;
    this._canvas.width = this._lineMetrics.offsetWidth;
    this._context.font = `${this._fontSize}px ${this._fontFamily}`;
    const width = Math.ceil(this._context.measureText(glyph).width);
    if (lineHeight < 1 || width < 1) {
      return {
        ascend: 0,
        descend: 0,
        width: 0,
      };
    }
    // whitespace check
    if (glyph.length === 1 && glyph.charCodeAt(0) === 32) {
      return {
        ascend: 0,
        descend: 0,
        width,
      };
    }
    this._context.fillText(glyph, 0, lineHeight);
    const imageData = this._context.getImageData(0, 0, width, lineHeight * 2).data;
    let top = -1;
    let bottom = -1;
    for (let y = 0; y < lineHeight * 2; y++) {
      for (let x = 0; x < width; x++) {
        const pixel = y * width + x;
        const index = pixel * 4;
        const alpha = imageData[index + 3];
        if (alpha > 0) {
          if (top < 0) {
            top = y;
          }
          bottom = y;
        }
      }
    }
    if (bottom < 0) {
      bottom = lineHeight * 2;
    }
    const ascend = Math.max(lineHeight - top, 0);
    const descend = Math.max(bottom - lineHeight, 0) + 1;
    return {
      ascend,
      descend,
      width,
    };
  }
}
