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

/**
 * @class RCTCylindricalPanel
 * @extends RCTBaseView
 */

import Surface, {SurfaceShape} from '../Compositor/Surface';
import type GuiSys from '../OVRUI/UIView/GuiSys';
import UIView from '../OVRUI/UIView/UIView';
import merge from '../Utils/merge';
import * as Flexbox from '../Utils/FlexboxImplementation';
import RCTBaseView from './BaseView';

export default class RCTCylindricalPanel extends RCTBaseView {
  guiSys: GuiSys;
  offscreenUID: ?number;
  surface: Surface;

  /**
   * constructor: allocates the required resources and sets defaults
   */
  constructor(guiSys: GuiSys) {
    super();

    this.surface = new Surface(0, 0, SurfaceShape.Cylinder);
    this.guiSys = guiSys;
    this.view = new UIView(guiSys);
    this.view.add(this.surface._mesh);

    Object.defineProperty(
      this.style,
      'opacity',
      ({
        configurable: true,
        set: (value: number) => {
          this.surface.setOpacity(value);
        },
      }: any),
    );

    Object.defineProperty(
      this.props,
      'layer',
      ({
        set: (value: Object) => {
          const radius = value.radius || 3;
          this.view.zOffset = radius;
          this.surface.resize(value.width, value.height);
          this.guiSys.unregisterOffscreenRender(this.offscreenUID);
          this.offscreenUID = this.guiSys.registerOffscreenRender(
            this.surface.getScene(),
            this.surface.getCamera(),
            this.surface.getRenderTarget(),
          );
        },
      }: any),
    );
  }

  addChild(index: number, child: RCTBaseView) {
    this.children.splice(index, 0, child);
    this.YGNode.insertChild(child.YGNode, index);
    this.surface.getScene().add(child.view);
  }

  removeChild(index: number) {
    this.surface.getScene().remove(this.children[index].view);
    this.YGNode.removeChild(this.YGNode.getChild(index));
    this.children.splice(index, 1);
  }

  presentLayout() {
    super.presentLayout();
    this.surface.setVisibility(this.YGNode.getDisplay() !== Flexbox.DISPLAY_NONE);
  }

  dispose() {
    this.guiSys.unregisterOffscreenRender(this.offscreenUID);
    super.dispose();
  }

  /**
   * Describes the properties representable by this view type and merges
   * with super type
   */
  static describe() {
    return merge(super.describe(), {
      // declare the native props sent from react to runtime
      NativeProps: {
        layer: 'object',
      },
    });
  }
}
