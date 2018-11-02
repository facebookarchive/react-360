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
import wrapText from './wrapText';
import * as THREE from 'three';
export const Align = {
  auto: 'left',
  left: 'left',
  right: 'right',
  center: 'center',
  justify: 'left'
};
export default class FontGeometry {
  // Width of the span the alignment is relative to
  // Specify the font to use, if supported by implementation
  // Tracks whether geometry needs to be recomputed
  // Layout information
  // Tracks whether layout information is dirty
  // Distance from one baseline to the next
  // Maximum width the text can fill before breaking
  // Font size, in pixels
  // Text string to display
  constructor(impl, text, options = {}) {
    this._align = options.align || Align.auto;
    this._fontFamily = '';
    this._geometryDirty = true;
    this._impl = impl;
    this._infoDirty = false;
    this._maxWidth = undefined;
    this._size = options.size || 20;
    this._lineHeight = Math.ceil(this._size * 1.4);
    this._text = text;
    this._info = wrapText(this._impl, this._fontFamily, this._size, this._text);
    this._geometry = new THREE.BufferGeometry();
    this._material = this._impl.createMaterial();

    this._impl.updateGeometryAndMaterial(this._geometry, this._material, this._info, this.getParams());

    this._node = new THREE.Mesh(this._geometry, this._material);
  }

  getParams() {
    // Override this method in your subclass to provide extra parameters like
    // font width, etc.
    return {
      align: this._align,
      alignWidth: this._alignWidth
    };
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

  getNode() {
    return this._node;
  }

  markGeometryDirty() {
    this._geometryDirty = true;
  }

  setAlign(align) {
    this._align = align;
    this._geometryDirty = true;
  }

  setAlignWidth(width) {
    this._alignWidth = width;
  }

  setLineHeight(height) {
    if (this._lineHeight !== height) {
      this._infoDirty = true;
    }

    this._lineHeight = height;
  }

  setMaxWidth(width) {
    if (this._maxWidth !== width) {
      this._infoDirty = true;
    }

    this._maxWidth = width;
  }

  setSize(size) {
    this._size = Math.max(1, size);
    this._infoDirty = true;
  }

  setText(text) {
    this._text = text;
    this._infoDirty = true;
  }

  setWeight(numericWeight) {// no-op
  }

  update() {
    if (this._infoDirty) {
      this._info = wrapText(this._impl, this._fontFamily, this._size, this._text, this._maxWidth);
      this._geometryDirty = true;
      this._infoDirty = false;
    }

    if (this._geometryDirty) {
      this._impl.updateGeometryAndMaterial(this._geometry, this._material, this._info, this.getParams());

      this._geometryDirty = false;
    }
  }

}