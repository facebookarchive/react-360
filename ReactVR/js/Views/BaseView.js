/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

/**
 * Defines RTCBaseView which maintains an array of children, style, and properties.
 * Provides methods to manage children and do layout, including presentLayout,
 * which essentially assigns position/rotation/frame).
 * @class RCTBaseView
 * @flow
 */

import isPositive from '../Utils/isPositive';
import * as Yoga from '../Utils/Yoga.bundle';
import UIManager from '../Modules/UIManager';

import type {UIView, GuiSys} from 'ovrui';

const INTERACTION_CALLBACKS = [
  'onEnter',
  'onExit',
  'onInput',
  'onChange',
  'onHeadPose',
  'onChangeCaptured',
  'onInputCaptured',
  'onHeadPoseCaptured',
  'onMove',
];
// For now the sets are the same, but any future events that are mouse-only can
// be added to this set.
const IS_MOUSE_INTERACTION_CALLBACKS = {
  onEnter: true,
  onExit: true,
  onInput: true,
  onChange: true,
  onHeadPose: true,
  onChangeCaptured: true,
  onInputCaptured: true,
  onHeadPoseCaptured: true,
  onMove: true,
};

const MAP_CSS_WRAP = {
  nowrap: Yoga.WRAP_NO_WRAP,
  wrap: Yoga.WRAP_WRAP,
};

const MAP_CSS_FLEX_DIRECTION = {
  column: Yoga.FLEX_DIRECTION_COLUMN,
  'column-reverse': Yoga.FLEX_DIRECTION_COLUMN_REVERSE,
  row: Yoga.FLEX_DIRECTION_ROW,
  'row-reverse': Yoga.FLEX_DIRECTION_ROW_REVERSE,
};

const MAP_CSS_JUSTIFY = {
  'flex-start': Yoga.JUSTIFY_FLEX_START,
  center: Yoga.JUSTIFY_CENTER,
  'flex-end': Yoga.JUSTIFY_FLEX_END,
  'space-between': Yoga.JUSTIFY_SPACE_BETWEEN,
  'space-around': Yoga.JUSTIFY_SPACE_AROUND,
};

const MAP_CSS_ALIGN = {
  auto: Yoga.ALIGN_AUTO,
  'flex-start': Yoga.ALIGN_FLEX_START,
  center: Yoga.ALIGN_CENTER,
  'flex-end': Yoga.ALIGN_FLEX_END,
  stretch: Yoga.ALIGN_STRETCH,
  baseline: Yoga.ALIGN_BASELINE,
};

const MAP_CSS_POSITION = {
  relative: Yoga.POSITION_TYPE_RELATIVE,
  absolute: Yoga.POSITION_TYPE_ABSOLUTE,
};

const MAP_CSS_OVERFLOW = {
  visible: Yoga.OVERFLOW_VISIBLE,
  hidden: Yoga.OVERFLOW_HIDDEN,
  scroll: Yoga.OVERFLOW_SCROLL,
};

const MAP_CSS_DISPLAY = {
  flex: Yoga.DISPLAY_FLEX,
  none: Yoga.DISPLAY_NONE,
};

// Use negative command id so the command id will
// not overlap with Subclasses's command id
const COMMAND_SET_IMMEDIATE_ON_TOUCH_END = -1;

function _isPercent(value) {
  if (typeof value === 'string') {
    return true;
  }
  return undefined;
}

export default class RCTBaseView {
  _borderRadius: any;
  _borderTopLeftRadius: any;
  _borderTopRightRadius: any;
  _borderBottomLeftRadius: any;
  _borderBottomRightRadius: any;
  _borderRadiusDirty: boolean;
  props: any;
  style: any;
  tag: number;
  rootTag: number;
  interactableCount: number;
  mouseInteractableCount: number;
  YGNode: any;
  UIManager: UIManager;
  parent: ?RCTBaseView;
  children: Array<RCTBaseView>;
  view: UIView;
  isDirty: boolean;
  _transformDirty: boolean;
  receivesMoveEvent: boolean;
  /**
   * constructor: sets defaults for all views
   */
  constructor(guisys: GuiSys) {
    this._borderRadius = null;
    this._borderTopLeftRadius = null;
    this._borderTopRightRadius = null;
    this._borderBottomLeftRadius = null;
    this._borderBottomRightRadius = null;
    this._borderRadiusDirty = false;
    this._transformDirty = true;
    this.YGNode = Yoga.Node.create();
    /* $FlowFixMe */
    this.UIManager = null;
    this.tag = 0;
    this.rootTag = 0;
    this.children = [];
    this.parent = null;
    this.props = {};
    this.style = {
      layoutOrigin: [0, 0],
    };
    this.interactableCount = 0;
    this.mouseInteractableCount = 0;
    this.isDirty = true;
    this.receivesMoveEvent = false;
    // renderGroup style property mapping to three.js view
    // as style is declared in the base class with properties,
    // defining of setters must be accomplished with Object.defineProperty
    Object.defineProperty(
      (this.style: any),
      'backgroundColor',
      ({
        set: value => {
          if (value == null) {
            value = 0;
          }
          this.view.setBackgroundColor(value);
        },
      }: Object)
    );
    Object.defineProperty(
      (this.style: any),
      'opacity',
      ({
        configurable: true,
        set: value => {
          if (value == null) {
            value = 1.0;
          }
          this.view.setOpacity(value);
        },
      }: Object)
    );
    Object.defineProperty(
      (this.style: any),
      'borderColor',
      ({
        set: value => {
          if (value == null) {
            value = 0xff000000;
          }
          this.view.setBorderColor(value);
        },
      }: Object)
    );
    Object.defineProperty(
      (this.style: any),
      'borderRadius',
      ({
        set: value => {
          if (value == null) {
            value = 0.0;
          }
          this._borderRadius = value;
          this._borderRadiusDirty = true;
        },
      }: Object)
    );
    Object.defineProperty(
      (this.style: any),
      'borderTopLeftRadius',
      ({
        set: value => {
          if (value == null) {
            value = 0.0;
          }
          this._borderTopLeftRadius = value;
          this._borderRadiusDirty = true;
        },
      }: Object)
    );
    Object.defineProperty(
      (this.style: any),
      'borderTopRightRadius',
      ({
        set: value => {
          if (value == null) {
            value = 0.0;
          }
          this._borderTopRightRadius = value;
          this._borderRadiusDirty = true;
        },
      }: Object)
    );
    Object.defineProperty(
      (this.style: any),
      'borderBottomLeftRadius',
      ({
        set: value => {
          if (value == null) {
            value = 0.0;
          }
          this._borderBottomLeftRadius = value;
          this._borderRadiusDirty = true;
        },
      }: Object)
    );
    Object.defineProperty(
      (this.style: any),
      'borderBottomRightRadius',
      ({
        set: value => {
          if (value == null) {
            value = 0.0;
          }
          this._borderBottomRightRadius = value;
          this._borderRadiusDirty = true;
        },
      }: Object)
    );
    Object.defineProperty(
      (this.style: any),
      'renderGroup',
      ({
        set: value => {
          if (value == null) {
            value = false;
          }
          this.view && (this.view.renderGroup = value);
        },
      }: Object)
    );
    INTERACTION_CALLBACKS.forEach(element => {
      Object.defineProperty(
        this.props,
        element.toString(),
        ({
          set: value => {
            if (this.props['_' + element] !== value) {
              this.interactableCount += value ? 1 : -1;
              if (IS_MOUSE_INTERACTION_CALLBACKS[element]) {
                this.mouseInteractableCount += value ? 1 : -1;
                this.view && this.view.setIsMouseInteractable(this.mouseInteractableCount > 0);
              }
              if (element === 'onMove') {
                this.receivesMoveEvent = !!value;
              }
              this.view && this.view.setIsInteractable(this.interactableCount > 0);
              this.view && this.view.forceRaycastTest(this.interactableCount > 0);
              this.props['_' + element] = value;
            }
          },
        }: Object)
      );
    });
    this.view = null;
  }

  /**
   * Returns react tag that this view is associated with
   */
  getTag(): number {
    return this.tag;
  }

  /**
   * Returns the index of child
   * @param child - child to find return -1 for not present
   */
  getIndexOf(child: RCTBaseView): number {
    return this.children.indexOf(child);
  }

  /**
   * Returns the parent view
   */
  getParent(): ?RCTBaseView {
    return this.parent;
  }

  /**
   * Add a child view at a specific index
   * @param index - index to add at
   * @param child - view to add
   */
  addChild(index: number, child: RCTBaseView) {
    this.children.splice(index, 0, child);
    this.YGNode.insertChild(child.YGNode, index);
    this.view.add(child.view);
  }

  /**
   * Sets the parent view
   * @param parent - view to set
   */
  setParent(parent: ?RCTBaseView) {
    this.parent = parent;
  }

  /**
   * Remove a child a specific index
   * @param index - index within child to remove, will also child view
   *                from three.js scene
   */
  removeChild(index: number) {
    this.view.remove(this.children[index].view);
    this.YGNode.removeChild(this.YGNode.getChild(index));
    this.children.splice(index, 1);
  }

  /**
   * Returns the child at index
   * @param index - index within children Array to return
   */
  getChild(index: number) {
    return this.children[index];
  }

  /**
   * Returns the number of children attached to this view
   */
  getChildCount(): number {
    return this.children.length;
  }

  /**
   * Mark this view as dirty as well as parents, this will cause this view
   * to be relayed out
   */
  makeDirty(): void {
    let view = this;
    while (view) {
      view.isDirty = true;
      view = view.getParent();
    }
  }

  /**
   * Subclasses may use this method to receive events/commands directly from JS through the
   * {@link UIManager}.
   *
   * @param commandId code of the command
   * @param commandArgs optional arguments for the command
   */
  receiveCommand(commandId: number, commandArgs: any) {
    switch (commandId) {
      case COMMAND_SET_IMMEDIATE_ON_TOUCH_END:
        const cancel = commandArgs.length < 4;
        if (cancel) {
          this.view && this.view.setImmediateListener(null);
        } else {
          const immediateEventType = commandArgs[0];
          const immediateTag = commandArgs[1];
          const immediateCommandId = commandArgs[2];
          const immediateCommandArgs = commandArgs[3];
          this.view &&
            this.view.setImmediateListener({
              eventType: immediateEventType,
              callback: () =>
                this.UIManager.dispatchViewManagerCommand(
                  immediateTag,
                  immediateCommandId,
                  immediateCommandArgs
                ),
            });
        }
        break;
    }
  }

  /**
   * dispose of any associated resource
   */
  dispose(): void {
    RCTBaseView.disposeThreeJSObject(this.view);
    Yoga.Node.destroy(this.YGNode);
    this.view = null;
  }

  /**
   * Per Frame update for view
   */
  frame(timeStamp: number, deltaTime: number): void {
    // TODO query why this isn't a setter
    if (this.style.opacity !== undefined) {
      this.view.setOpacity(this.style.opacity);
    }
  }

  /*
   * The following functions map react attributes of the
   * same name minus _ to the values in Yoga
   */

  _left(value: any): void {
    if (value === null) {
      value = Yoga.UNDEFINED;
    }
    if (_isPercent(value)) {
      this.YGNode.setPositionPercent(Yoga.EDGE_LEFT, parseFloat(value));
    } else {
      this.YGNode.setPosition(Yoga.EDGE_LEFT, value);
    }
  }

  _top(value: any): void {
    if (value === null) {
      value = Yoga.UNDEFINED;
    }
    if (_isPercent(value)) {
      this.YGNode.setPositionPercent(Yoga.EDGE_TOP, parseFloat(value));
    } else {
      this.YGNode.setPosition(Yoga.EDGE_TOP, value);
    }
  }

  _right(value: any): void {
    if (value === null) {
      value = Yoga.UNDEFINED;
    }
    if (_isPercent(value)) {
      this.YGNode.setPositionPercent(Yoga.EDGE_RIGHT, parseFloat(value));
    } else {
      this.YGNode.setPosition(Yoga.EDGE_RIGHT, value);
    }
  }

  _bottom(value: any): void {
    if (value === null) {
      value = Yoga.UNDEFINED;
    }
    if (_isPercent(value)) {
      this.YGNode.setPositionPercent(Yoga.EDGE_BOTTOM, parseFloat(value));
    } else {
      this.YGNode.setPosition(Yoga.EDGE_BOTTOM, value);
    }
  }

  _margin(value: any): void {
    if (value === null) {
      value = Yoga.UNDEFINED;
    }
    if (_isPercent(value)) {
      this.YGNode.setMarginPercent(Yoga.EDGE_ALL, parseFloat(value));
    } else {
      this.YGNode.setMargin(Yoga.EDGE_ALL, value);
    }
  }

  _marginVertical(value: any): void {
    if (value === null) {
      value = Yoga.UNDEFINED;
    }
    if (_isPercent(value)) {
      this.YGNode.setMarginPercent(Yoga.EDGE_VERTICAL, parseFloat(value));
    } else {
      this.YGNode.setMargin(Yoga.EDGE_VERTICAL, value);
    }
  }

  _marginHorizontal(value: any): void {
    if (value === null) {
      value = Yoga.UNDEFINED;
    }
    if (_isPercent(value)) {
      this.YGNode.setMarginPercent(Yoga.EDGE_HORIZONTAL, parseFloat(value));
    } else {
      this.YGNode.setMargin(Yoga.EDGE_HORIZONTAL, value);
    }
  }

  _marginTop(value: any): void {
    if (value === null) {
      value = Yoga.UNDEFINED;
    }
    if (_isPercent(value)) {
      this.YGNode.setMarginPercent(Yoga.EDGE_TOP, parseFloat(value));
    } else {
      this.YGNode.setMargin(Yoga.EDGE_TOP, value);
    }
  }

  _marginBottom(value: any): void {
    if (value === null) {
      value = Yoga.UNDEFINED;
    }
    if (_isPercent(value)) {
      this.YGNode.setMarginPercent(Yoga.EDGE_BOTTOM, parseFloat(value));
    } else {
      this.YGNode.setMargin(Yoga.EDGE_BOTTOM, value);
    }
  }

  _marginLeft(value: any): void {
    if (value === null) {
      value = Yoga.UNDEFINED;
    }
    if (_isPercent(value)) {
      this.YGNode.setMarginPercent(Yoga.EDGE_LEFT, parseFloat(value));
    } else {
      this.YGNode.setMargin(Yoga.EDGE_LEFT, value);
    }
  }

  _marginRight(value: any): void {
    if (value === null) {
      value = Yoga.UNDEFINED;
    }
    if (_isPercent(value)) {
      this.YGNode.setMarginPercent(Yoga.EDGE_RIGHT, parseFloat(value));
    } else {
      this.YGNode.setMargin(Yoga.EDGE_RIGHT, value);
    }
  }

  _padding(value: any): void {
    if (value === null) {
      value = Yoga.UNDEFINED;
    }
    if (_isPercent(value)) {
      this.YGNode.setPaddingPercent(Yoga.EDGE_ALL, parseFloat(value));
    } else {
      this.YGNode.setPadding(Yoga.EDGE_ALL, value);
    }
  }

  _paddingVertical(value: any): void {
    if (value === null) {
      value = Yoga.UNDEFINED;
    }
    if (_isPercent(value)) {
      this.YGNode.setPaddingPercent(Yoga.EDGE_VERTICAL, parseFloat(value));
    } else {
      this.YGNode.setPadding(Yoga.EDGE_VERTICAL, value);
    }
  }

  _paddingHorizontal(value: any): void {
    if (value === null) {
      value = Yoga.UNDEFINED;
    }
    if (_isPercent(value)) {
      this.YGNode.setPaddingPercent(Yoga.EDGE_HORIZONTAL, parseFloat(value));
    } else {
      this.YGNode.setPadding(Yoga.EDGE_HORIZONTAL, value);
    }
  }

  _paddingTop(value: any): void {
    if (value === null) {
      value = Yoga.UNDEFINED;
    }
    if (_isPercent(value)) {
      this.YGNode.setPaddingPercent(Yoga.EDGE_TOP, parseFloat(value));
    } else {
      this.YGNode.setPadding(Yoga.EDGE_TOP, value);
    }
  }

  _paddingBottom(value: any): void {
    if (value === null) {
      value = Yoga.UNDEFINED;
    }
    if (_isPercent(value)) {
      this.YGNode.setPaddingPercent(Yoga.EDGE_BOTTOM, parseFloat(value));
    } else {
      this.YGNode.setPadding(Yoga.EDGE_BOTTOM, value);
    }
  }

  _paddingLeft(value: any): void {
    if (value === null) {
      value = Yoga.UNDEFINED;
    }
    if (_isPercent(value)) {
      this.YGNode.setPaddingPercent(Yoga.EDGE_LEFT, parseFloat(value));
    } else {
      this.YGNode.setPadding(Yoga.EDGE_LEFT, value);
    }
  }

  _paddingRight(value: any): void {
    if (value === null) {
      value = Yoga.UNDEFINED;
    }
    if (_isPercent(value)) {
      this.YGNode.setPaddingPercent(Yoga.EDGE_RIGHT, parseFloat(value));
    } else {
      this.YGNode.setPadding(Yoga.EDGE_RIGHT, value);
    }
  }

  _borderWidth(value: any): void {
    if (value === null) {
      value = Yoga.UNDEFINED;
    }
    this.YGNode.setBorder(Yoga.EDGE_ALL, value);
  }

  _borderTopWidth(value: any): void {
    if (value === null) {
      value = Yoga.UNDEFINED;
    }
    this.YGNode.setBorder(Yoga.EDGE_TOP, value);
  }

  _borderRightWidth(value: any): void {
    if (value === null) {
      value = Yoga.UNDEFINED;
    }
    this.YGNode.setBorder(Yoga.EDGE_RIGHT, value);
  }

  _borderBottomWidth(value: any): void {
    if (value === null) {
      value = Yoga.UNDEFINED;
    }
    this.YGNode.setBorder(Yoga.EDGE_BOTTOM, value);
  }

  _borderLeftWidth(value: any): void {
    if (value === null) {
      value = Yoga.UNDEFINED;
    }
    this.YGNode.setBorder(Yoga.EDGE_LEFT, value);
  }

  _position(value: any): void {
    this.YGNode.setPositionType(value !== null ? MAP_CSS_POSITION[value] : 0);
  }

  _alignContent(value: any): void {
    this.YGNode.setAlignContent(value !== null ? MAP_CSS_ALIGN[value] : 0);
  }

  _alignItems(value: any): void {
    this.YGNode.setAlignItems(value !== null ? MAP_CSS_ALIGN[value] : 0);
  }

  _alignSelf(value: any): void {
    this.YGNode.setAlignSelf(value !== null ? MAP_CSS_ALIGN[value] : 0);
  }

  _flexDirection(value: any): void {
    this.YGNode.setFlexDirection(value !== null ? MAP_CSS_FLEX_DIRECTION[value] : Yoga.UNDEFINED);
  }

  _flexWrap(value: any): void {
    this.YGNode.setFlexWrap(value !== null ? MAP_CSS_WRAP[value] : Yoga.UNDEFINED);
  }

  _justifyContent(value: any): void {
    this.YGNode.setJustifyContent(value !== null ? MAP_CSS_JUSTIFY[value] : 0);
  }

  _overflow(value: any): void {
    this.view.clippingEnabled = value === Yoga.OVERFLOW_HIDDEN;
    this.YGNode.setOverflow(value !== null ? MAP_CSS_OVERFLOW[value] : 0);
  }

  _display(value: any): void {
    this.YGNode.setDisplay(value !== null ? MAP_CSS_DISPLAY[value] : 0);
  }

  _flex(value: any): void {
    if (value === null) {
      value = Yoga.UNDEFINED;
    }
    this.YGNode.setFlex(value);
  }

  _flexBasis(value: any): void {
    if (value === null) {
      value = Yoga.UNDEFINED;
    }
    if (_isPercent(value)) {
      this.YGNode.setFlexBasisPercent(parseFloat(value));
    } else {
      this.YGNode.setFlexBasis(value);
    }
  }

  _flexGrow(value: any): void {
    if (value === null) {
      value = Yoga.UNDEFINED;
    }
    this.YGNode.setFlexGrow(value);
  }

  _flexShrink(value: any): void {
    if (value === null) {
      value = Yoga.UNDEFINED;
    }
    this.YGNode.setFlexShrink(value);
  }

  _width(value: any): void {
    if (value === null) {
      value = Yoga.UNDEFINED;
    }
    if (_isPercent(value)) {
      this.YGNode.setWidthPercent(parseFloat(value));
    } else {
      this.YGNode.setWidth(value);
    }
  }

  _height(value: any): void {
    if (value === null) {
      value = Yoga.UNDEFINED;
    }
    if (_isPercent(value)) {
      this.YGNode.setHeightPercent(parseFloat(value));
    } else {
      this.YGNode.setHeight(value);
    }
  }

  _minWidth(value: any): void {
    if (value === null) {
      value = Yoga.UNDEFINED;
    }
    if (_isPercent(value)) {
      this.YGNode.setMinWidthPercent(parseFloat(value));
    } else {
      this.YGNode.setMinWidth(value);
    }
  }

  _minHeight(value: any): void {
    if (value === null) {
      value = Yoga.UNDEFINED;
    }
    if (_isPercent(value)) {
      this.YGNode.setMinHeightPercent(parseFloat(value));
    } else {
      this.YGNode.setMinHeight(value);
    }
  }

  _maxWidth(value: any): void {
    if (value === null) {
      value = Yoga.UNDEFINED;
    }
    if (_isPercent(value)) {
      this.YGNode.setMaxWidthPercent(parseFloat(value));
    } else {
      this.YGNode.setMaxWidth(value);
    }
  }

  _maxHeight(value: any): void {
    if (value === null) {
      value = Yoga.UNDEFINED;
    }
    if (_isPercent(value)) {
      this.YGNode.setMaxHeightPercent(parseFloat(value));
    } else {
      this.YGNode.setMaxHeight(value);
    }
  }

  _aspectRatio(value: any): void {
    if (value === null) {
      value = Yoga.UNDEFINED;
    }
    this.YGNode.setAspectRatio(value);
  }

  _getBorderValue(edge: any): number {
    const value = this.YGNode.getBorder(edge);
    const allValue = this.YGNode.getBorder(Yoga.EDGE_ALL);
    return Number.isNaN(value) ? (Number.isNaN(allValue) ? 0 : allValue) : value;
  }

  _transform(value: any): void {
    if (value === null) {
      this.style.transform = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
    } else {
      this.style.transform = value;
    }
    this._transformDirty = true;
  }
  /*
   * The previous functions map react attributes of the
   * same name minus _ to the values in Yoga
   */

  /**
   * Given a layout object, calculate the associate transforms for three.js
   */
  presentLayout(): void {
    if (this.YGNode.getHasNewLayout()) {
      this.YGNode.setHasNewLayout(false);

      const left = this.YGNode.getComputedLeft();
      const top = this.YGNode.getComputedTop();
      const width = this.YGNode.getComputedWidth();
      const height = this.YGNode.getComputedHeight();
      const x = -this.style.layoutOrigin[0] * width;
      const y = -this.style.layoutOrigin[1] * height;

      if (this.props.onLayout) {
        // send an event to the interested view which details
        // the layout location in the frame of the parent view
        // takes into account he layoutOrigin
        this.UIManager._rnctx.callFunction('RCTEventEmitter', 'receiveEvent', [
          this.getTag(),
          'topLayout',
          {
            x: x + left,
            y: y + top,
            width: width,
            height: height,
          },
        ]);
      }
      this.view.visible = this.YGNode.getDisplay() !== Yoga.DISPLAY_NONE;
      this.view.setBorderWidth([
        this._getBorderValue(Yoga.EDGE_LEFT),
        this._getBorderValue(Yoga.EDGE_TOP),
        this._getBorderValue(Yoga.EDGE_RIGHT),
        this._getBorderValue(Yoga.EDGE_BOTTOM),
      ]);
      this.view.setFrame &&
        this.view.setFrame(x + left, -(y + top), width, height, this.UIManager._layoutAnimation);
    }
    // it transform is set apply to UIView
    if (this.style.transform) {
      if (this._transformDirty) {
        if (this.view.setLocalTransform) {
          this.view.setLocalTransform(this.style.transform);
          this._transformDirty = false;
        }
      }
    }

    this.view.owner = this;
    if (this._borderRadiusDirty) {
      const borderRadius = isPositive(this._borderRadius) ? this._borderRadius : 0;
      this.view.setBorderRadius([
        isPositive(this._borderTopRightRadius) ? this._borderTopRightRadius : borderRadius,
        isPositive(this._borderTopLeftRadius) ? this._borderTopLeftRadius : borderRadius,
        isPositive(this._borderBottomLeftRadius) ? this._borderBottomLeftRadius : borderRadius,
        isPositive(this._borderBottomRightRadius) ? this._borderBottomRightRadius : borderRadius,
      ]);
      this._borderRadiusDirty = false;
    }
  }

  /**
   * Helper to dispose of the internal memory allocations for three js object
   */
  static disposeThreeJSObject(node: any): void {
    if (!node) {
      return;
    }
    if (node.geometry) {
      node.geometry.dispose();
      node.geometry = null;
    }

    if (node.material) {
      if (Array.isArray(node.material)) {
        for (let i = 0; i < node.material.length; i++) {
          const mtr = node.material[i];
          if (mtr.map) {
            mtr.map.dispose();
            mtr.map = null;
          }
          mtr.dispose();
        }
        node.material = null;
      } else {
        if (node.material.map) {
          node.material.map.dispose();
          node.material.map = null;
        }
        node.material.dispose();
      }
    }
    for (const i in node.children) {
      // Do not dispose of child UIViews, they need to handle their own disposal...
      const child = node.children[i];
      if (child.type !== 'UIView') {
        RCTBaseView.disposeThreeJSObject(node.children[i]);
      }
    }
    node.parent = null;
    node.children = [];
  }

  /**
   * Describe the props that are available for React to change
   */
  static describe(): any {
    return {
      NativeProps: {
        onLayout: 'function',
        onEnter: 'function',
        onExit: 'function',
        onInput: 'function',
        onChange: 'function',
        onHeadPose: 'function',
        onChangeCaptured: 'function',
        onInputCaptured: 'function',
        onHeadPoseCaptured: 'function',
        onMove: 'function',
      },
      Commands: {
        setImmediateOnTouchEnd: COMMAND_SET_IMMEDIATE_ON_TOUCH_END,
      },
    };
  }
}
