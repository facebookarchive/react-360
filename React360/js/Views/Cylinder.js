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

import {CylinderBufferGeometry} from 'three';
import merge from '../Utils/merge';

import type GuiSys from '../OVRUI/UIView/GuiSys';
import type {ReactNativeContext} from '../ReactNativeContext';
import RCTBaseMesh from './BaseMesh';

export default class RCTCylinder extends RCTBaseMesh {
  _radiusTop: number;
  _radiusBottom: number;
  _dimHeight: number;
  _segments: number;
  _needsUpdate: boolean;

  constructor(guiSys: GuiSys, rnctx: ReactNativeContext) {
    super(guiSys, rnctx);

    this._radiusTop = 0.5;
    this._radiusBottom = 0.5;
    this._dimHeight = 1;
    this._segments = 8;
    this._needsUpdate = false;

    Object.defineProperty(
      this.props,
      'radiusTop',
      ({
        set: radiusTop => {
          this._radiusTop = radiusTop;
          this._needsUpdate = true;
        },
      }: Object),
    );

    Object.defineProperty(
      this.props,
      'radiusBottom',
      ({
        set: radiusBottom => {
          this._radiusBottom = radiusBottom;
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

    Object.defineProperty(
      this.props,
      'segments',
      ({
        set: segments => {
          this._segments = segments;
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
    const geometry = new CylinderBufferGeometry(
      this._radiusTop,
      this._radiusBottom,
      this._dimHeight,
      this._segments,
    );
    this._setGeometry(geometry);
  }

  static describe() {
    return merge(super.describe(), {
      // register the properties sent from react to runtime
      NativeProps: {
        radiusTop: 'number',
        radiusBottom: 'number',
        dimHeight: 'number',
        segments: 'number',
      },
    });
  }
}
