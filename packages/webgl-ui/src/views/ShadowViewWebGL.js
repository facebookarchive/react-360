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

import type {GLViewCompatible} from '../primitives/GLView';
import type {Transform} from '../Math';
import * as Flexbox from '../vendor/Yoga.bundle';
import ShadowView, {type Dispatcher} from './ShadowView';
import recursiveLayout from '../recursiveLayout';
import colorStringToARGB from '../colorStringToARGB';

type LayoutHook = (number, {height: number, width: number, x: number, y: number}) => mixed;

export default class ShadowViewWebGL<T: GLViewCompatible> extends ShadowView {
  _borderRadiusAll: ?number;
  _borderRadiusDirty: boolean;
  _borderTopLeftRadius: ?number;
  _borderTopRightRadius: ?number;
  _borderBottomRightRadius: ?number;
  _borderBottomLeftRadius: ?number;
  _cursor: ?string;
  _eventHandlers: {[event: string]: any};
  _hasCursorEvent: boolean;
  _hasOnLayout: boolean;
  _layoutOrigin: [number, number];
  _onLayoutHook: ?LayoutHook;
  _zIndex: number;
  _renderOrder: number;
  view: T;

  constructor(viewCreator: () => T) {
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

  addChild(index: number, child: ShadowView) {
    super.addChild(index, child);
    if (child instanceof ShadowViewWebGL) {
      this.view.getNode().add(child.view.getNode());
      child.setParentTransform(this.view.getWorldTransform());
    } else {
      this.view.getNode().add((child: any).view);
    }
  }

  removeChild(index: number) {
    const child = this.children[index];
    if (child instanceof ShadowViewWebGL) {
      this.view.getNode().remove(child.view.getNode());
    } else {
      this.view.getNode().remove((child: any).view);
    }
    super.removeChild(index);
  }

  getZIndex(): number {
    return this._zIndex;
  }

  getRenderOrder(): number {
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
          height: height,
        });
      }

      this.view.setVisible(this.YGNode.getDisplay() !== Flexbox.DISPLAY_NONE);
      this.view.setBorderWidth(
        this._getBorderValue(Flexbox.EDGE_TOP),
        this._getBorderValue(Flexbox.EDGE_RIGHT),
        this._getBorderValue(Flexbox.EDGE_BOTTOM),
        this._getBorderValue(Flexbox.EDGE_LEFT)
      );
      this.view.setFrame(x + left, -(y + top), width, height);
      childrenNeedUpdate = true;
    }

    if (this._transformDirty) {
      this.view.setLocalTransform(this._transform);
      childrenNeedUpdate = true;
      this._transformDirty = false;
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
          : borderRadius
      );
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

  setOnLayout(value: any) {
    this._hasOnLayout = !!value;
  }

  setOnLayoutHook(hook: ?LayoutHook) {
    this._onLayoutHook = hook;
  }

  setRenderOrder(order: number) {
    this._renderOrder = order;
    if (this.view) {
      this.view.getNode().renderOrder = order;
    }
  }

  setParentTransform(transform: Transform) {
    this.view.setParentTransform(transform);
  }

  getCursor(): ?string {
    return this._cursor;
  }

  hasCursorEvent(): boolean {
    return this._hasCursorEvent;
  }

  setEventHandler(event: string, callback: any) {
    if (!callback) {
      delete this._eventHandlers[event];
    } else {
      this._eventHandlers[event] = callback;
    }
    this._hasCursorEvent = this._cursor != null || Object.keys(this._eventHandlers).length > 0;
  }

  fireEvent(event: string, payload?: any) {
    const callback = this._eventHandlers[event];
    if (callback) {
      callback(payload);
    }
  }

  containsPoint(x: number, y: number): boolean {
    return this.view.containsPoint(x, y);
  }

  _getBorderValue(edge: number): number {
    const value = this.YGNode.getBorder(edge);
    const allValue = this.YGNode.getBorder(Flexbox.EDGE_ALL);
    return Number.isNaN(value) ? (Number.isNaN(allValue) ? 0 : allValue) : value;
  }

  /* style setters */

  __setStyle_backgroundColor(color: ?number | string) {
    if (color == null) {
      color = 0;
    }
    const colorNumber = typeof color === 'number' ? color : colorStringToARGB(color);
    this.view.setBackgroundColor(colorNumber);
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

  __setStyle_borderColor(color: ?number | string) {
    if (color == null) {
      color = 0xff000000;
    }
    const colorNumber = typeof color === 'number' ? color : colorStringToARGB(color);
    this.view.setBorderColor(colorNumber);
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

  __setStyle_cursor(cursor: ?string) {
    this._cursor = cursor;
    if (cursor) {
      this._hasCursorEvent = true;
    } else {
      this._hasCursorEvent = Object.keys(this._eventHandlers).length > 0;
    }
  }

  __setStyle_gradientColorA(color: ?number | string) {
    if (color == null) {
      color = 0xff000000;
    }
    const colorNumber = typeof color === 'number' ? color : colorStringToARGB(color);
    this.view.setGradientStart(colorNumber);
  }

  __setStyle_gradientColorB(color: ?number | string) {
    if (color == null) {
      color = 0xff000000;
    }
    const colorNumber = typeof color === 'number' ? color : colorStringToARGB(color);
    this.view.setGradientEnd(colorNumber);
  }

  __setStyle_gradientAngle(angle: ?string) {
    if (angle == null) {
      angle = '0deg';
    }
    let rad = 0;
    if (angle.endsWith('rad')) {
      rad = Number(angle.substr(0, angle.length - 3));
    } else if (angle.endsWith('deg')) {
      const deg = Number(angle.substr(0, angle.length - 3));
      rad = (deg * Math.PI) / 180;
    }
    if (isNaN(rad)) {
      rad = 0;
    }
    this.view.setGradientAngle(rad);
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

  __setStyle_zIndex(z: ?number) {
    if (z == null) {
      z = 0;
    }
    this._zIndex = z;
  }

  static registerBindings(dispatch: Dispatcher) {
    super.registerBindings(dispatch);
    dispatch.onLayout = this.prototype.setOnLayout;
  }
}
