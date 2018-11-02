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

import {PlaneBufferGeometry} from 'three';
import merge from '../Utils/merge';

import type GuiSys from '../OVRUI/UIView/GuiSys';
import type {ReactNativeContext} from '../ReactNativeContext';
import RCTBaseMesh from './BaseMesh';

export default class RCTPlane extends RCTBaseMesh {
  _dimWidth: number;
  _dimHeight: number;
  _needsUpdate: boolean;

  constructor(guiSys: GuiSys, rnctx: ReactNativeContext) {
    super(guiSys, rnctx);

    this._dimWidth = 1;
    this._dimHeight = 1;
    this._needsUpdate = false;

    Object.defineProperty(
      this.props,
      'dimWidth',
      ({
        set: width => {
          this._dimWidth = width;
          this._needsUpdate = true;
        },
      }: Object),
    );

    Object.defineProperty(
      this.props,
      'dimHeight',
      ({
        set: height => {
          this._dimHeight = height;
          this._needsUpdate = true;
        },
      }: Object),
    );

    (this: any)._generateGeometry = this._generateGeometry.bind(this);
  }

  frame() {
    if (this._needsUpdate) {
      this._needsUpdate = false;
      this._generateGeometry();
    }
  }

  _generateGeometry() {
    const geometry = new PlaneBufferGeometry(this._dimWidth, this._dimHeight);
    this._setGeometry(geometry);
  }

  static describe() {
    return merge(super.describe(), {
      // register the properties sent from react to runtime
      NativeProps: {
        dimWidth: 'number',
        dimHeight: 'number',
      },
    });
  }
}
