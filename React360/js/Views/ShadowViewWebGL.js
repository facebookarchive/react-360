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

import GLView from '../Runtime/Renderer/GLView';
import ShadowView from './ShadowView';
import type UIManager from '../Modules/UIManager';
import * as Flexbox from '../Utils/FlexboxImplementation';

export default class ShadowViewWebGL extends ShadowView {
  _borderRadiusAll: ?number;
  _borderRadiusDirty: boolean;
  _borderTopLeftRadius: ?number;
  _borderTopRightRadius: ?number;
  _borderBottomRightRadius: ?number;
  _borderBottomLeftRadius: ?number;
  _layoutOrigin: [number, number];
  view: GLView;
  UIManager: UIManager;

  constructor(uiManager: UIManager) {
    super();

    this.UIManager = uiManager;
    this._borderRadiusDirty = false;
    this._layoutOrigin = [0, 0];
    this.view = new GLView();
  }

  presentLayout() {
    if (this.YGNode.getHasNewLayout()) {
      this.YGNode.setHasNewLayout(false);

      const left = this.YGNode.getComputedLeft();
      const top = this.YGNode.getComputedTop();
      const width = this.YGNode.getComputedWidth();
      const height = this.YGNode.getComputedHeight();
      const x = -this._layoutOrigin[0] * width;
      const y = -this._layoutOrigin[1] * height;

      this.view.setVisible(this.YGNode.getDisplay() !== Flexbox.DISPLAY_NONE);
      this.view.setBorderWidth(
        this._getBorderValue(Flexbox.EDGE_TOP),
        this._getBorderValue(Flexbox.EDGE_RIGHT),
        this._getBorderValue(Flexbox.EDGE_BOTTOM),
        this._getBorderValue(Flexbox.EDGE_LEFT),
      );
      this.view.setFrame(x + left, -(y + top), width, height);
    }

    if (this._transformDirty) {
    }

    if (this._borderRadiusDirty) {
      const borderRadius =
        typeof this._borderRadiusAll === 'number' && this._borderRadiusAll > 0
          ? this._borderRadiusAll
          : 0;
      this.view.setBorderRadius(
        typeof this._borderTopLeftRadius === 'number' && this._borderTopLeftRadius > 0
          ? this._borderTopLeftRadius
          : borderRadius,
        typeof this._borderTopRightRadius === 'number' && this._borderTopRightRadius > 0
          ? this._borderTopRightRadius
          : borderRadius,
        typeof this._borderBottomRightRadius === 'number' && this._borderBottomRightRadius > 0
          ? this._borderBottomRightRadius
          : borderRadius,
        typeof this._borderBottomLeftRadius === 'number' && this._borderBottomLeftRadius > 0
          ? this._borderBottomLeftRadius
          : borderRadius,
      );
      this._borderRadiusDirty = false;
    }

    this.view.update();
  }

  _getBorderValue(edge: number): number {
    const value = this.YGNode.getBorder(edge);
    const allValue = this.YGNode.getBorder(Flexbox.EDGE_ALL);
    return Number.isNaN(value)
      ? Number.isNaN(allValue)
        ? 0
        : allValue
      : value;
  }

  /* style setters */

  __setStyle_backgroundColor(color: ?number) {
    if (color == null) {
      color = 0;
    }
    this.view.setBackgroundColor(color);
  }

  __setStyle_borderBottomLeftRadius(radius: ?number) {
    if (radius == null) {
      radius = 0.0;
    }
    this._borderBottomLeftRadius = radius;
    this._borderRadiusDirty = true;
  }

  __setStyle_borderBottomRightRadius(radius: ?number) {
    if (radius == null) {
      radius = 0.0;
    }
    this._borderBottomRightRadius = radius;
    this._borderRadiusDirty = true;
  }

  __setStyle_borderColor(color: ?number) {
    if (color == null) {
      color = 0xff000000;
    }
    this.view.setBorderColor(color);
  }

  __setStyle_borderRadius(radius: ?number) {
    if (radius == null) {
      radius = 0.0;
    }
    this._borderRadiusAll = radius;
    this._borderRadiusDirty = true;
  }

  __setStyle_borderTopLeftRadius(radius: ?number) {
    if (radius == null) {
      radius = 0.0;
    }
    this._borderTopLeftRadius = radius;
    this._borderRadiusDirty = true;
  }

  __setStyle_borderTopRightRadius(radius: ?number) {
    if (radius == null) {
      radius = 0.0;
    }
    this._borderTopRightRadius = radius;
    this._borderRadiusDirty = true;
  }

  __setStyle_layoutOrigin(origin: [number, number]) {
    this._layoutOrigin[0] = origin[0];
    this._layoutOrigin[1] = origin[1];
  }

  __setStyle_opacity(opacity: ?number) {
    if (opacity == null) {
      opacity = 0;
    }
    this.view.setOpacity(opacity);
  }
}
