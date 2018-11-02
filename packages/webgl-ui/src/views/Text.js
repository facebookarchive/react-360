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

/* eslint-disable camelcase, no-bitwise, no-param-reassign */

import {matrixMultiply4} from '../Math';
import GLView from '../primitives/GLView';
import * as Flexbox from '../vendor/Yoga.bundle';
import type {Transform} from '../Math';
import type FontGeometry from '../text/FontGeometry';
import type {TextImplementation} from '../text/TextTypes';
import colorStringToARGB from '../colorStringToARGB';
import ShadowViewWebGL from './ShadowViewWebGL';
import RawText from './RawText';

const FONT_WEIGHTS = {
  light: 200,
  normal: 400,
  bold: 700,
};

/**
 * Implementation of Text backed by the new GLView & Text
 */
export default class RCTText extends ShadowViewWebGL<GLView> {
  textChildren: Array<RCTText | RawText>;
  _cachedText: string;
  _geometryDirty: boolean;
  _text: FontGeometry;
  _textColor: ?number;
  _textDirty: boolean;

  constructor(impl: TextImplementation) {
    super(() => new GLView());
    this.textChildren = [];
    this._textColor = null;
    this._textDirty = true;
    this._geometryDirty = false;
    this._cachedText = '';
    this._text = impl.createText('', {
      weight: 200,
      size: 20,
      align: 'auto',
    });
    this.view.getNode().add(this._text.getNode());
    this.__setStyle_cursor('text');

    this.YGNode.setMeasureFunc((width, widthMeasureMode, height, heightMeasureMode) =>
      this.measure(width, widthMeasureMode, height, heightMeasureMode)
    );
  }

  _updateTextTransform() {
    const offX = -this.YGNode.getComputedWidth() / 2;
    const offY = -this.YGNode.getComputedHeight() / 2;
    // prettier-ignore
    const transform = [
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      offX, offY, 0, 1,
    ];
    matrixMultiply4(transform, this.view.getWorldTransform());
    this._text.getNode().material.uniforms.u_transform.value.fromArray(transform);
  }

  __setStyle_color(color: number | string) {
    const colorNumber = typeof color === 'number' ? color : colorStringToARGB(color);
    this._textColor = colorNumber;
    this._textDirty = true;
  }

  __setStyle_fontSize(size: number) {
    if (size == null) {
      size = 20;
    }
    this._text.setSize(size);
    this.YGNode.markDirty();
    this._geometryDirty = true;
  }

  __setStyle_fontWeight(weight: string) {
    let numericWeight = Number(weight);
    if (isNaN(numericWeight)) {
      numericWeight = FONT_WEIGHTS[weight];
    }
    if (!numericWeight) {
      numericWeight = 400;
    }
    this._text.setWeight(numericWeight);
    this._geometryDirty = true;
  }

  __setStyle_textAlign(align: string) {
    this._text.setAlign(align);
    this._geometryDirty = true;
  }

  addChild(index: number, child: any) {
    this.textChildren.splice(index, 0, child);
    child.setParent(this);
    this.markTextDirty();
  }

  removeChild(index: number) {
    this.textChildren.splice(index, 1);
    this.markTextDirty();
  }

  getChildCount(): number {
    return this.textChildren.length;
  }

  setRenderOrder(order: number) {
    super.setRenderOrder(order);
    this._text.getNode().renderOrder = order;
  }

  measure(width: number, widthMeasureMode: number, height: number, heightMeasureMode: number) {
    if (
      widthMeasureMode !== Flexbox.MEASURE_MODE_EXACTLY ||
      heightMeasureMode !== Flexbox.MEASURE_MODE_EXACTLY
    ) {
      this._text.setMaxWidth(width);
      this._text.setAlignWidth(
        widthMeasureMode === Flexbox.MEASURE_MODE_EXACTLY ? width : undefined
      );
      this._text.update();
      if (widthMeasureMode !== Flexbox.MEASURE_MODE_EXACTLY) {
        width = this._text.getWidth();
      }
      if (heightMeasureMode !== Flexbox.MEASURE_MODE_EXACTLY) {
        height = this._text.getHeight();
      }
    } else {
      width = width || 0;
      height = height || 0;
    }
    return {width, height};
  }

  markTextDirty() {
    this._textDirty = true;
  }

  getTextString(parentColor: number): string {
    if (!this._textDirty) {
      return this._cachedText;
    }
    const color = this._textColor == null ? parentColor : this._textColor;
    const colorString =
      String.fromCharCode(0) +
      String.fromCharCode((color >>> 16) & 0xff) +
      String.fromCharCode((color >>> 8) & 0xff) +
      String.fromCharCode(color & 0xff) +
      String.fromCharCode((color >>> 24) & 0xff);
    this._cachedText = '';
    for (let i = 0; i < this.textChildren.length; i++) {
      const child = this.textChildren[i];
      if (child instanceof RawText && child.text.length > 0) {
        this._cachedText += colorString + child.text;
      } else if (child instanceof RCTText) {
        this._cachedText += child.getTextString(color);
      }
    }
    this._textDirty = false;
    this._geometryDirty = true;
    return this._cachedText;
  }

  setParentTransform(transform: Transform) {
    super.setParentTransform(transform);
    this._updateTextTransform();
  }

  presentLayout() {
    let transformDirty = false;
    if (this.YGNode.getHasNewLayout() || this._transformDirty) {
      transformDirty = true;
    }
    super.presentLayout();
    if (this._textDirty || this._geometryDirty) {
      const textString = this.getTextString(0xff000000);
      this._text.setText(textString);
      this._text.update();
      this.YGNode.markDirty();

      this._geometryDirty = false;
    }
    if (transformDirty) {
      this._updateTextTransform();
    }
  }
}
