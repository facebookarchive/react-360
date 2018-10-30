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

/* eslint-disable camelcase, no-param-reassign */

import * as Flexbox from '../vendor/Yoga.bundle';
import type {Transform} from '../Math';

export type Dispatcher = {[prop: string]: (any) => mixed};

const MAP_CSS_ALIGN = {
  auto: Flexbox.ALIGN_AUTO,
  'flex-start': Flexbox.ALIGN_FLEX_START,
  center: Flexbox.ALIGN_CENTER,
  'flex-end': Flexbox.ALIGN_FLEX_END,
  stretch: Flexbox.ALIGN_STRETCH,
  baseline: Flexbox.ALIGN_BASELINE,
};

const MAP_CSS_DISPLAY = {
  flex: Flexbox.DISPLAY_FLEX,
  none: Flexbox.DISPLAY_NONE,
};

const MAP_CSS_FLEX_DIRECTION = {
  column: Flexbox.FLEX_DIRECTION_COLUMN,
  'column-reverse': Flexbox.FLEX_DIRECTION_COLUMN_REVERSE,
  row: Flexbox.FLEX_DIRECTION_ROW,
  'row-reverse': Flexbox.FLEX_DIRECTION_ROW_REVERSE,
};

const MAP_CSS_JUSTIFY = {
  'flex-start': Flexbox.JUSTIFY_FLEX_START,
  center: Flexbox.JUSTIFY_CENTER,
  'flex-end': Flexbox.JUSTIFY_FLEX_END,
  'space-between': Flexbox.JUSTIFY_SPACE_BETWEEN,
  'space-around': Flexbox.JUSTIFY_SPACE_AROUND,
};

const MAP_CSS_OVERFLOW = {
  visible: Flexbox.OVERFLOW_VISIBLE,
  hidden: Flexbox.OVERFLOW_HIDDEN,
  scroll: Flexbox.OVERFLOW_SCROLL,
};

const MAP_CSS_POSITION = {
  relative: Flexbox.POSITION_TYPE_RELATIVE,
  absolute: Flexbox.POSITION_TYPE_ABSOLUTE,
};

const MAP_CSS_WRAP = {
  nowrap: Flexbox.WRAP_NO_WRAP,
  wrap: Flexbox.WRAP_WRAP,
};

export default class ShadowView {
  _transform: Transform;
  _transformDirty: boolean;
  children: Array<ShadowView>;
  parent: ?ShadowView;
  rootTag: number;
  tag: number;
  YGNode: any;

  constructor() {
    this.children = [];
    this.parent = null;
    this.rootTag = 0;
    this.tag = 0;
    this._transformDirty = false;
    this.YGNode = Flexbox.Node.create();
  }

  dispose() {
    Flexbox.Node.destroy(this.YGNode);
  }

  addChild(index: number, child: ShadowView) {
    this.children.splice(index, 0, child);
    this.YGNode.insertChild(child.YGNode, index);
    child.setParent(this);
  }

  setParent(parent: ?ShadowView) {
    this.parent = parent;
  }

  getChild(index: number): ?ShadowView {
    return this.children[index];
  }

  getChildCount(): number {
    return this.children.length;
  }

  getChildTag(index: number): number {
    const child = this.children[index];
    if (!child) {
      return -1;
    }
    return child.getTag();
  }

  getIndexOf(child: ShadowView): number {
    return this.children.indexOf(child);
  }

  getTag(): number {
    return this.tag;
  }

  getParent(): ?ShadowView {
    return this.parent;
  }

  removeChild(index: number) {
    const child = this.children[index];
    this.YGNode.removeChild(this.YGNode.getChild(index));
    this.children.splice(index, 1);
    child.setParent(null);
  }

  makeDirty() {
    // No-op, for compatibility
  }

  calculateLayout() {
    this.YGNode.calculateLayout(Flexbox.UNDEFINED, Flexbox.UNDEFINED, Flexbox.DIRECTION_LTR);
  }

  _setBorderWidth(edge: number, value: string | number) {
    if (value == null) {
      value = Flexbox.UNDEFINED;
    }
    this.YGNode.setBorder(edge, value);
  }

  _setMargin(edge: number, value: string | number) {
    if (value == null) {
      value = Flexbox.UNDEFINED;
    }
    if (typeof value === 'string') {
      this.YGNode.setMarginPercent(edge, parseFloat(value));
    } else {
      this.YGNode.setMargin(edge, value);
    }
  }

  _setPadding(edge: number, value: string | number) {
    if (value == null) {
      value = Flexbox.UNDEFINED;
    }
    if (typeof value === 'string') {
      this.YGNode.setPaddingPercent(edge, parseFloat(value));
    } else {
      this.YGNode.setPadding(edge, value);
    }
  }

  _setPosition(edge: number, value: string | number) {
    if (value == null) {
      value = Flexbox.UNDEFINED;
    }
    if (typeof value === 'string') {
      this.YGNode.setPositionPercent(edge, parseFloat(value));
    } else {
      this.YGNode.setPosition(edge, value);
    }
  }

  /* style setters */

  __setStyle_alignContent(value: $Keys<typeof MAP_CSS_ALIGN>): void {
    this.YGNode.setAlignContent(value != null ? MAP_CSS_ALIGN[value] : Flexbox.ALIGN_AUTO);
  }

  __setStyle_alignItems(value: $Keys<typeof MAP_CSS_ALIGN>): void {
    this.YGNode.setAlignItems(value != null ? MAP_CSS_ALIGN[value] : Flexbox.ALIGN_AUTO);
  }

  __setStyle_alignSelf(value: $Keys<typeof MAP_CSS_ALIGN>): void {
    this.YGNode.setAlignSelf(value != null ? MAP_CSS_ALIGN[value] : Flexbox.ALIGN_AUTO);
  }

  __setStyle_aspectRatio(value: ?number): void {
    if (value == null) {
      value = Flexbox.UNDEFINED;
    }
    this.YGNode.setAspectRatio(value);
  }

  __setStyle_backgroundColor(value: any) {
    if (__DEV__) {
      /* eslint-disable-next-line no-console */
      console.warn('setBackgroundColor is not implemented on this view');
    }
  }

  __setStyle_borderBottomWidth(value: string | number): void {
    this._setBorderWidth(Flexbox.EDGE_BOTTOM, value);
  }

  __setStyle_borderLeftWidth(value: string | number): void {
    this._setBorderWidth(Flexbox.EDGE_LEFT, value);
  }

  __setStyle_borderRightWidth(value: string | number): void {
    this._setBorderWidth(Flexbox.EDGE_RIGHT, value);
  }

  __setStyle_borderTopWidth(value: string | number): void {
    this._setBorderWidth(Flexbox.EDGE_TOP, value);
  }

  __setStyle_borderWidth(value: string | number): void {
    this._setBorderWidth(Flexbox.EDGE_ALL, value);
  }

  __setStyle_bottom(value: string | number): void {
    this._setPosition(Flexbox.EDGE_BOTTOM, value);
  }

  __setStyle_display(value: $Keys<typeof MAP_CSS_DISPLAY>): void {
    this.YGNode.setDisplay(value != null ? MAP_CSS_DISPLAY[value] : Flexbox.DISPLAY_FLEX);
  }

  __setStyle_flex(value: ?number): void {
    if (value == null) {
      value = Flexbox.UNDEFINED;
    }
    this.YGNode.setFlex(value);
  }

  __setStyle_flexBasis(value: ?number | string): void {
    if (value == null) {
      value = Flexbox.UNDEFINED;
    }
    if (typeof value === 'string') {
      this.YGNode.setFlexBasisPercent(parseFloat(value));
    } else {
      this.YGNode.setFlexBasis(value);
    }
  }

  __setStyle_flexDirection(value: $Keys<typeof MAP_CSS_FLEX_DIRECTION>): void {
    this.YGNode.setFlexDirection(value != null ? MAP_CSS_FLEX_DIRECTION[value] : Flexbox.UNDEFINED);
  }

  __setStyle_flexGrow(value: ?number): void {
    if (value == null) {
      value = Flexbox.UNDEFINED;
    }
    this.YGNode.setFlexGrow(value);
  }

  __setStyle_flexShrink(value: ?number): void {
    if (value == null) {
      value = Flexbox.UNDEFINED;
    }
    this.YGNode.setFlexShrink(value);
  }

  __setStyle_flexWrap(value: $Keys<typeof MAP_CSS_WRAP>): void {
    this.YGNode.setFlexWrap(value != null ? MAP_CSS_WRAP[value] : Flexbox.UNDEFINED);
  }

  __setStyle_height(value: ?number | string): void {
    if (value == null) {
      value = Flexbox.UNDEFINED;
    }
    if (typeof value === 'string') {
      this.YGNode.setHeightPercent(parseFloat(value));
    } else {
      this.YGNode.setHeight(value);
    }
  }

  __setStyle_justifyContent(value: $Keys<typeof MAP_CSS_JUSTIFY>): void {
    this.YGNode.setJustifyContent(
      value != null ? MAP_CSS_JUSTIFY[value] : Flexbox.JUSTIFY_FLEX_START
    );
  }

  __setStyle_left(value: string | number): void {
    this._setPosition(Flexbox.EDGE_LEFT, value);
  }

  __setStyle_margin(value: string | number): void {
    this._setMargin(Flexbox.EDGE_ALL, value);
  }

  __setStyle_marginBottom(value: string | number): void {
    this._setMargin(Flexbox.EDGE_BOTTOM, value);
  }

  __setStyle_marginHorizontal(value: string | number): void {
    this._setMargin(Flexbox.EDGE_HORIZONTAL, value);
  }

  __setStyle_marginLeft(value: string | number): void {
    this._setMargin(Flexbox.EDGE_LEFT, value);
  }

  __setStyle_marginRight(value: string | number): void {
    this._setMargin(Flexbox.EDGE_RIGHT, value);
  }

  __setStyle_marginTop(value: string | number): void {
    this._setMargin(Flexbox.EDGE_TOP, value);
  }

  __setStyle_marginVertical(value: string | number): void {
    this._setMargin(Flexbox.EDGE_VERTICAL, value);
  }

  __setStyle_maxHeight(value: ?number | string): void {
    if (value == null) {
      value = Flexbox.UNDEFINED;
    }
    if (typeof value === 'string') {
      this.YGNode.setMaxHeightPercent(parseFloat(value));
    } else {
      this.YGNode.setMaxHeight(value);
    }
  }

  __setStyle_maxWidth(value: ?number | string): void {
    if (value == null) {
      value = Flexbox.UNDEFINED;
    }
    if (typeof value === 'string') {
      this.YGNode.setMaxWidthPercent(parseFloat(value));
    } else {
      this.YGNode.setMaxWidth(value);
    }
  }

  __setStyle_minHeight(value: ?number | string): void {
    if (value == null) {
      value = Flexbox.UNDEFINED;
    }
    if (typeof value === 'string') {
      this.YGNode.setMinHeightPercent(parseFloat(value));
    } else {
      this.YGNode.setMinHeight(value);
    }
  }

  __setStyle_minWidth(value: ?number | string): void {
    if (value == null) {
      value = Flexbox.UNDEFINED;
    }
    if (typeof value === 'string') {
      this.YGNode.setMinWidthPercent(parseFloat(value));
    } else {
      this.YGNode.setMinWidth(value);
    }
  }

  __setStyle_overflow(value: $Keys<typeof MAP_CSS_OVERFLOW>): void {
    this.YGNode.setOverflow(value != null ? MAP_CSS_OVERFLOW[value] : Flexbox.OVERFLOW_VISIBLE);
  }

  __setStyle_padding(value: string | number): void {
    this._setPadding(Flexbox.EDGE_ALL, value);
  }

  __setStyle_paddingBottom(value: string | number): void {
    this._setPadding(Flexbox.EDGE_BOTTOM, value);
  }

  __setStyle_paddingHorizontal(value: string | number): void {
    this._setPadding(Flexbox.EDGE_HORIZONTAL, value);
  }

  __setStyle_paddingLeft(value: string | number): void {
    this._setPadding(Flexbox.EDGE_LEFT, value);
  }

  __setStyle_paddingRight(value: string | number): void {
    this._setPadding(Flexbox.EDGE_RIGHT, value);
  }

  __setStyle_paddingTop(value: string | number): void {
    this._setPadding(Flexbox.EDGE_TOP, value);
  }

  __setStyle_paddingVertical(value: string | number): void {
    this._setPadding(Flexbox.EDGE_VERTICAL, value);
  }

  __setStyle_position(value: string): void {
    this.YGNode.setPositionType(
      value != null ? MAP_CSS_POSITION[value] : Flexbox.POSITION_TYPE_RELATIVE
    );
  }

  __setStyle_right(value: string | number): void {
    this._setPosition(Flexbox.EDGE_RIGHT, value);
  }

  __setStyle_top(value: string | number): void {
    this._setPosition(Flexbox.EDGE_TOP, value);
  }

  __setStyle_transform(value: Transform): void {
    if (value == null) {
      this._transform = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
    } else {
      this._transform = value;
    }
    this._transformDirty = true;
  }

  __setStyle_width(value: ?number | string): void {
    if (value == null) {
      value = Flexbox.UNDEFINED;
    }
    if (typeof value === 'string') {
      this.YGNode.setWidthPercent(parseFloat(value));
    } else {
      this.YGNode.setWidth(value);
    }
  }

  static registerBindings(dispatch: Dispatcher) {
    // No-op
  }
}
