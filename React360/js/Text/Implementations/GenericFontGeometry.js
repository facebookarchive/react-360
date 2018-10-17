/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import {Align} from '../FontGeometry';

export type FontOptions = {
  size?: number,
  weight?: number,
};

export default class GenericFontGeometry {
  _align: string;
  _alignWidth: void | number; // Width of the span the alignment is relative to
  _geometryDirty: boolean; // Tracks whether geometry needs to be recomputed
  _info: TextRenderInfo; // Layout information
  _infoDirty: boolean; // Tracks whether layout information is dirty
  _lineHeight: number; // Distance from one baseline to the next
  _maxWidth: void | number; // Maximum width the text can fill before breaking
  _size: number; // Font size, in pixels
  _text: string; // Text string to display

  constructor(text: string, options: FontOptions = {}) {
    this._align = options.align || Align.auto;
    this._geometryDirty = true;
    this._infoDirty = false;
    this._maxWidth = undefined;
    this._size = options.size || 20;
    this._lineHeight = Math.ceil(this._size * 1.4);
    this._text = text;
  }

  setAlign(align: string) {
    this._align = align;
    this._geometryDirty = true;
  }

  setAlignWidth(width: number | void) {
    this._alignWidth = width;
  }

  setMaxWidth(width: number | void) {
    if (this._maxWidth !== width) {
      this._infoDirty = true;
    }
    this._maxWidth = width;
  }

  setSize(size: number) {
    this._size = Math.max(1, size);
    this._infoDirty = true;
  }

  setText(text: string) {
    this._text = text;
    this._infoDirty = true;
  }

  getWidth() {
    const lines = this._info.lines;
    let width = 0;
    for (let i = 0; i < lines.length; i++) {
      const lineWidth = lines[i].width;
      if (lineWidth > width) {
        width = lineWidth;
      }
    }
    return width;
  }

  getHeight() {
    const lines = this._info.lines;
    return this._lineHeight * lines.length;
  }

  recomputeGeometry() {
    // Override this in implementations
  }

  update() {
    if (this._infoDirty) {
      this._info = wrapText(this._impl, '', this._size, this._text, this._maxWidth);
      this._geometryDirty = true;
      this._infoDirty = false;
    }
    if (this._geometryDirty) {
      this.recomputeGeometry();
      this._geometryDirty = false;
    }
  }
}
