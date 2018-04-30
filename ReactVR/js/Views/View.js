/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

/**
 * Defines RTCView "derived" from RTCBaseView.
 * Assigns 'this.view' to OVRUI.UIView(guiSys),
 * so basically this is a view with three.js support.
 * @class RCTView
 * @extends RCTBaseView
 * @flow
 */

import UIView from '../OVRUI/UIView/UIView';
import merge from '../Utils/merge';

import type GuiSys from '../OVRUI/UIView/GuiSys';
import RCTBaseView from './BaseView';

export default class RCTView extends RCTBaseView {
  /**
   * constructor: allocates the required resources and sets defaults
   */
  constructor(guiSys: GuiSys) {
    super();
    this.view = new UIView(guiSys);

    Object.defineProperty(
      this.props,
      'pointerEvents',
      ({
        set: value => {
          if (value === null) {
            value = 'auto';
          }
          this.view.setPointerEvents(value);
        },
      }: Object),
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
            this.view.setHitSlop(
              value.left,
              value.top,
              value.right,
              value.bottom,
            );
          }
        },
      }: Object),
    );
    Object.defineProperty(
      this.props,
      'cursorVisibilitySlop',
      ({
        set: value => {
          if (value === null) {
            value = 0;
          }
          if (typeof value === 'number') {
            this.view.setCursorVisibilitySlop(value, value, value, value);
          } else {
            this.view.setCursorVisibilitySlop(
              value.left,
              value.top,
              value.right,
              value.bottom,
            );
          }
        },
      }: Object),
    );
    Object.defineProperty(
      this.props,
      'billboarding',
      ({
        set: value => {
          if (value === null) {
            value = 'off';
          }
          this.view.setBillboarding(value);
        },
      }: Object),
    );
  }

  /**
   * Customised present layout so that the border settings can be updated
   */
  presentLayout() {
    super.presentLayout();
  }

  /**
   * Describes the properties representable by this view type and merges
   * with super type
   */
  static describe(): any {
    return merge(super.describe(), {
      NativeProps: {
        pointerEvents: 'string',
        hitSlop: 'number',
        cursorVisibilitySlop: 'number',
        billboarding: 'string',
      },
    });
  }
}
