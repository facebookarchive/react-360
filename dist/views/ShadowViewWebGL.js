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

/* eslint-disable camelcase, no-param-reassign */
import * as Flexbox from '../vendor/Yoga.bundle';
import ShadowView from './ShadowView';
import recursiveLayout from '../recursiveLayout';
export default class ShadowViewWebGL extends ShadowView {
  constructor(viewCreator) {
    super();
    this._borderRadiusDirty = false;
    this._cursor = null;
    this._eventHandlers = {};
    this._hasCursorEvent = false;
    this._hasOnLayout = false;
    this._layoutOrigin = [0, 0];
    this._zIndex = 0;
    this._renderOrder = 0;
    this.view = viewCreator();
  }

  addChild(index, child) {
    super.addChild(index, child);

    if (child instanceof ShadowViewWebGL) {
      this.view.getNode().add(child.view.getNode());
      child.setParentTransform(this.view.getWorldTransform());
    } else {
      this.view.getNode().add(child.view);
    }
  }

  removeChild(index) {
    const child = this.children[index];

    if (child instanceof ShadowViewWebGL) {
      this.view.getNode().remove(child.view.getNode());
    } else {
      this.view.getNode().remove(child.view);
    }

    super.removeChild(index);
  }

  getZIndex() {
    return this._zIndex;
  }

  getRenderOrder() {
    return this._renderOrder;
  }

  presentLayout() {
    let childrenNeedUpdate = false;

    if (this.YGNode.getHasNewLayout()) {
      this.YGNode.setHasNewLayout(false);
      const left = this.YGNode.getComputedLeft();
      const top = this.YGNode.getComputedTop();
      const width = this.YGNode.getComputedWidth();
      const height = this.YGNode.getComputedHeight();
      const x = -this._layoutOrigin[0] * width;
      const y = -this._layoutOrigin[1] * height;
      const layoutHook = this._onLayoutHook;

      if (this._hasOnLayout && layoutHook) {
        layoutHook(this.getTag(), {
          x: x + left,
          y: y + top,
          width: width,
          height: height
        });
      }

      this.view.setVisible(this.YGNode.getDisplay() !== Flexbox.DISPLAY_NONE);
      this.view.setBorderWidth(this._getBorderValue(Flexbox.EDGE_TOP), this._getBorderValue(Flexbox.EDGE_RIGHT), this._getBorderValue(Flexbox.EDGE_BOTTOM), this._getBorderValue(Flexbox.EDGE_LEFT));
      this.view.setFrame(x + left, -(y + top), width, height);
      childrenNeedUpdate = true;
    }

    if (this._transformDirty) {
      this.view.setLocalTransform(this._transform);
      childrenNeedUpdate = true;
      this._transformDirty = false;
    }

    if (this._borderRadiusDirty) {
      const borderRadius = typeof this._borderRadiusAll === 'number' && this._borderRadiusAll > 0 ? this._borderRadiusAll : 0;
      this.view.setBorderRadius(typeof this._borderTopLeftRadius === 'number' && this._borderTopLeftRadius > 0 ? this._borderTopLeftRadius : borderRadius, typeof this._borderTopRightRadius === 'number' && this._borderTopRightRadius > 0 ? this._borderTopRightRadius : borderRadius, typeof this._borderBottomRightRadius === 'number' && this._borderBottomRightRadius > 0 ? this._borderBottomRightRadius : borderRadius, typeof this._borderBottomLeftRadius === 'number' && this._borderBottomLeftRadius > 0 ? this._borderBottomLeftRadius : borderRadius);
      this._borderRadiusDirty = false;
    }

    this.view.update();

    if (childrenNeedUpdate) {
      for (const c of this.children) {
        if (c instanceof ShadowViewWebGL) {
          c.setParentTransform(this.view.getWorldTransform());
          const width = this.view.getWidth();
          const height = this.view.getHeight();
          c.view.setOffset(-width / 2, -height / 2);
        }
      }
    }
  }

  updateLayoutAndGeometry() {
    this.calculateLayout();
    recursiveLayout(this);
  }

  frame() {}

  setOnLayout(value) {
    this._hasOnLayout = !!value;
  }

  setOnLayoutHook(hook) {
    this._onLayoutHook = hook;
  }

  setRenderOrder(order) {
    this._renderOrder = order;

    if (this.view) {
      this.view.getNode().renderOrder = order;
    }
  }

  setParentTransform(transform) {
    this.view.setParentTransform(transform);
  }

  getCursor() {
    return this._cursor;
  }

  hasCursorEvent() {
    return this._hasCursorEvent;
  }

  setEventHandler(event, callback) {
    if (!callback) {
      delete this._eventHandlers[event];
    } else {
      this._eventHandlers[event] = callback;
    }

    this._hasCursorEvent = this._cursor != null || Object.keys(this._eventHandlers).length > 0;
  }

  fireEvent(event, payload) {
    const callback = this._eventHandlers[event];

    if (callback) {
      callback(payload);
    }
  }

  containsPoint(x, y) {
    return this.view.containsPoint(x, y);
  }

  _getBorderValue(edge) {
    const value = this.YGNode.getBorder(edge);
    const allValue = this.YGNode.getBorder(Flexbox.EDGE_ALL);
    return Number.isNaN(value) ? Number.isNaN(allValue) ? 0 : allValue : value;
  }
  /* style setters */


  __setStyle_backgroundColor(color) {
    if (color == null) {
      color = 0;
    }

    this.view.setBackgroundColor(color);
  }

  __setStyle_borderBottomLeftRadius(radius) {
    if (radius == null) {
      radius = 0.0;
    }

    this._borderBottomLeftRadius = radius;
    this._borderRadiusDirty = true;
  }

  __setStyle_borderBottomRightRadius(radius) {
    if (radius == null) {
      radius = 0.0;
    }

    this._borderBottomRightRadius = radius;
    this._borderRadiusDirty = true;
  }

  __setStyle_borderColor(color) {
    if (color == null) {
      color = 0xff000000;
    }

    this.view.setBorderColor(color);
  }

  __setStyle_borderRadius(radius) {
    if (radius == null) {
      radius = 0.0;
    }

    this._borderRadiusAll = radius;
    this._borderRadiusDirty = true;
  }

  __setStyle_borderTopLeftRadius(radius) {
    if (radius == null) {
      radius = 0.0;
    }

    this._borderTopLeftRadius = radius;
    this._borderRadiusDirty = true;
  }

  __setStyle_borderTopRightRadius(radius) {
    if (radius == null) {
      radius = 0.0;
    }

    this._borderTopRightRadius = radius;
    this._borderRadiusDirty = true;
  }

  __setStyle_cursor(cursor) {
    this._cursor = cursor;

    if (cursor) {
      this._hasCursorEvent = true;
    } else {
      this._hasCursorEvent = Object.keys(this._eventHandlers).length > 0;
    }
  }

  __setStyle_layoutOrigin(origin) {
    this._layoutOrigin[0] = origin[0];
    this._layoutOrigin[1] = origin[1];
  }

  __setStyle_opacity(opacity) {
    if (opacity == null) {
      opacity = 0;
    }

    this.view.setOpacity(opacity);
  }

  __setStyle_zIndex(z) {
    if (z == null) {
      z = 0;
    }

    this._zIndex = z;
  }

  static registerBindings(dispatch) {
    super.registerBindings(dispatch);
    dispatch.onLayout = this.prototype.setOnLayout;
  }

}