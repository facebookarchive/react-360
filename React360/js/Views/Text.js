/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

/**
 * RCTText applies text, textColor, etc. attributes to view inside of updateView.
 * Includes properties such as fontSize, hAlign, etc.
 * @class RCTText
 * @extends RCTBaseView
 * @flow
 */

/* eslint-disable */

import RCTBaseView from './BaseView';
import * as SDFFont from '../OVRUI/SDFFont/SDFFont';
import UIView from '../OVRUI/UIView/UIView';
import merge from '../Utils/merge';
import * as Flexbox from '../Utils/FlexboxImplementation';

import type GuiSys from '../OVRUI/UIView/GuiSys';

// Mappings from react definitions to OVRUI
const ALIGN_MAP = {
  auto: 'left',
  left: 'left',
  right: 'right',
  center: 'center_line',
  justify: 'left',
};

const ALIGN_VERTICAL_MAP = {
  auto: 'top',
  top: 'top',
  bottom: 'bottom',
  center: 'center',
};

const NAMED_FONT_WEIGHT = {
  normal: 200,
  bold: 600,
};

function snapUp(value: number, step: number) {
  const inv = 1.0 / step;
  return Math.ceil(value * inv) / inv;
}

export default class RCTText extends RCTBaseView {
  guiSys: GuiSys;
  isTextNode: boolean;
  _visualTextDirty: boolean;
  _textDirty: boolean;
  _isOnLayer: boolean;
  _fontWeight: number;
  _fontBorderSize: number;
  _fontSize: number;
  _text: string;
  previousWidth: number;
  previousHeight: number;
  textChildren: Array<any>;
  /**
   * constructor: allocates the required resources and sets defaults
   */
  constructor(guiSys: GuiSys, rnctx: any, inSurfaceContext: boolean) {
    super();
    this.view = new UIView(guiSys);
    this.view.clippingEnabled = true;
    this.guiSys = guiSys;
    this.isTextNode = true;
    this.inSurfaceContext = inSurfaceContext;
    this._textDirty = true;
    this._visualTextDirty = true;
    this._fontBorderSize = 0;
    this._fontWeight = 0;
    this._isOnLayer = false;
    this.textChildren = [];

    // custom measure function for the flexbox layout
    this.YGNode.setMeasureFunc((width, widthMeasureMode, height, heightMeasureMode) =>
      this.measure(width, widthMeasureMode, height, heightMeasureMode)
    );

    // make use of getters and setters to directly apply the values to view when they change
    Object.defineProperty(
      this.props,
      'numberOfLines',
      ({
        set: value => {
          if (value === null) {
            value = 0;
          }
          this.props._numberOfLines = value;
          this._textDirty = true;
          this.markTextDirty();
          this.makeDirty();
        },
      }: Object)
    );
    Object.defineProperty(
      this.props,
      'isOnLayer',
      ({
        set: value => {
          if (value === null) {
            value = false;
          }
          this._isOnLayer = value;
          this.view.clippingEnabled = value;
          this._textDirty = true;
          this.markTextDirty();
          this.makeDirty();
        },
      }: Object)
    );
    Object.defineProperty(
      this.props,
      'hitSlop',
      ({
        set: value => {
          if (value === null) {
            value = 0;
          }
          if (typeof value === 'number') {
            this.view.setHitSlop(value, value, value, value);
          } else {
            this.view.setHitSlop(value.left, value.top, value.right, value.bottom);
          }
        },
      }: Object)
    );
    // setup the setters from React parameters to internal state
    Object.defineProperty(
      this.style,
      'color',
      ({
        set: value => {
          if (value === null) {
            value = 0xffffffff;
          }
          this.style._textColor = value;
          this.markTextDirty();
          this.makeDirty();
        },
      }: Object)
    );
    Object.defineProperty(
      this.style,
      'fontSize',
      ({
        set: value => {
          if (value === null) {
            value = this.inSurfaceContext ? 20 : 0.1;
          }
          this.view.setTextSize(value);
          this._fontSize = value;
          this._textDirty = true;
          this.markTextDirty();
          this.makeDirty();
        },
        get: () => {
          return this._fontSize;
        },
      }: Object)
    );
    // Map the fontWeight attribute into the SDF font parameters
    Object.defineProperty(
      this.style,
      'fontWeight',
      ({
        set: value => {
          if (value === null) {
            value = 'normal';
          }
          // lookup font weight if is named (eg normal or bold)
          const namedWeight = NAMED_FONT_WEIGHT[value];
          const intValue = parseInt(namedWeight ? namedWeight : value, 10);
          this._fontWeight = intValue;
          // leave a constant alpha edge but vary the threshold for edge of the font
          // the higher the value for ColorCenter the thinner the font
          this.view.setTextAlphaCenter(0.54 - this._fontBorderSize - this._fontWeight / 10000.0);
          this.view.setTextColorCenter(0.54 - this._fontWeight / 10000.0);
        },
      }: Object)
    );
    Object.defineProperty(
      this.style,
      'textShadowRadius',
      ({
        set: value => {
          if (value === null) {
            value = 0;
          }
          this._fontBorderSize = value;
          this.view.setTextAlphaCenter(0.54 - this._fontBorderSize - this._fontWeight / 10000.0);
          this.view.setTextColorCenter(0.54 - this._fontWeight / 10000.0);
        },
      }: Object)
    );
    Object.defineProperty(
      this.style,
      'textAlign',
      ({
        set: value => {
          if (value === null) {
            value = 'auto';
          }
          this.markTextDirty();
          this.view.setTextHAlign(ALIGN_MAP[value]);
        },
      }: Object)
    );
    Object.defineProperty(
      this.style,
      'textAlignVertical',
      ({
        set: value => {
          if (value === null) {
            value = 'auto';
          }
          this.markTextDirty();
          this.view.setTextVAlign(ALIGN_VERTICAL_MAP[value]);
        },
      }: Object)
    );
    // defaults
    this.style.fontWeight = '200';
    this.style.fontSize = this.inSurfaceContext ? 20 : 0.1;
    this.style.textAlign = 'auto';
    this.style.textAlignVertical = 'auto';
    this.props.numberOfLines = 0;
    // undefine the text color so that parent color will be used unless explicitly set
    this.style._textColor = undefined;
  }

  /**
   * Measure the dimensions of the text associated
   * callback for css-layout
   * @param: width - input width extents
   * @param: widthMeasureMode - mode to constrain width CSS_MEASURE_MODE_EXACTLY, CSS_MEASURE_MODE_UNDEFINED
   * @param: height - input height extents
   * @param: heightMeasureMode - mode to constrain height CSS_MEASURE_MODE_EXACTLY, CSS_MEASURE_MODE_UNDEFINED
   * @return: object containing measured width and height
   */
  measure(width: number, widthMeasureMode: number, height: number, heightMeasureMode: number): any {
    const text = this.getText(this.style._textColor || 0xffffffff);
    if (text) {
      if (
        widthMeasureMode !== Flexbox.MEASURE_MODE_EXACTLY ||
        heightMeasureMode !== Flexbox.MEASURE_MODE_EXACTLY
      ) {
        let wordWrapped;
        if (widthMeasureMode !== Flexbox.MEASURE_MODE_UNDEFINED) {
          wordWrapped = SDFFont.wrapLines(
            this.guiSys.font,
            text,
            this._fontSize,
            width,
            undefined, // maxHeight
            this.props._numberOfLines
          );
        } else {
          wordWrapped = text;
        }
        const dim = SDFFont.measureText(this.guiSys.font, wordWrapped, this._fontSize);
        if (widthMeasureMode !== Flexbox.MEASURE_MODE_EXACTLY) {
          width = dim.maxWidth;
        }
        if (heightMeasureMode !== Flexbox.MEASURE_MODE_EXACTLY) {
          height = dim.maxHeight;
        }
        // as we can vary between spaces this is a reasonable way to determine a snapping value
        // to ensure we don't have rounding issues when computing text dimensions
        const snap = this._fontSize / 100;
        width = snapUp(width, snap);
        height = snapUp(height, snap);
      }
    } else {
      width = width || 0;
      height = height || 0;
    }
    return {
      width: width,
      height: height,
    };
  }

  // children of text are held within textChildren
  // this is to avoid them being used as part of the layout pass
  addChild(index: number, child: any) {
    // mark the view as needing new layout
    this.makeDirty();
    this.textChildren.splice(index, 0, child);
  }

  removeChild(index: number) {
    // mark the view as needing new layout
    this.makeDirty();
    this.textChildren.splice(index, 1);
  }

  // return the cached result or if the text is dirty calculate the concentated results
  // TODO: encapsulate fonr properties into output
  getText(parentTextColor: number): string {
    if (!this._textDirty) {
      return this._text;
    }
    const textColor = this.style._textColor ? this.style._textColor : parentTextColor;
    let allText = '';
    for (let i = 0; i < this.textChildren.length; i++) {
      const child = this.textChildren[i];
      if (child.isRawText && child.props.text && child.props.text.length) {
        allText +=
          String.fromCharCode(SDFFont.SDFFONT_MARKER_COLOR) +
          String.fromCharCode((textColor >> 16) & 0xff) + // red
          String.fromCharCode((textColor >> 8) & 0xff) + // green
          String.fromCharCode((textColor >> 0) & 0xff) + // blue
          String.fromCharCode((textColor >> 24) & 0xff) + // alpha
          child.props.text;
      } else if (child.isTextNode) {
        allText += child.getText(textColor);
      }
    }
    this._text = allText;
    this._textDirty = false;
    // make sure the visual representation is resubmitted
    this._visualTextDirty = true;
    return this._text;
  }

  /**
   * Customised present layout so that the border settings can be updated
   */
  presentLayout() {
    super.presentLayout();
    const val = this.YGNode.getBorder(Flexbox.EDGE_LEFT);
    this.view.setBorderWidth(Number.isNaN(val) ? 0 : val);
    if (
      this._textDirty ||
      this._visualTextDirty ||
      this.YGNode.getComputedWidth() !== this.previousWidth ||
      this.YGNode.getComputedHeight() !== this.previousHeight
    ) {
      const wordWrapped = SDFFont.wrapLines(
        this.guiSys.font,
        this.getText(this.style._textColor || 0xffffffff),
        this._fontSize,
        this.YGNode.getComputedWidth(),
        this.YGNode.getComputedHeight(),
        this.props._lineCount,
        this._isOnLayer
      );
      this.view.setText(wordWrapped);
      this._visualTextDirty = false;
      this.previousWidth = this.YGNode.getComputedWidth();
      this.previousHeight = this.YGNode.getComputedHeight();
    }
  }

  markTextDirty() {
    this.YGNode.markDirty();
    this._textDirty = true;
  }

  /**
   * Describes the properties representable by this view type and merges
   * with super type
   */
  static describe(): any {
    return merge(super.describe(), {
      // declare properties sent from react to runtime
      NativeProps: {
        numberOfLines: 'number',
        hitSlop: 'number',
        isOnLayer: 'number',
      },
    });
  }
}
