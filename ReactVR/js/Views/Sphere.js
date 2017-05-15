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

import RCTBaseMesh from './BaseMesh';
import {SphereBufferGeometry} from 'three';
import merge from '../Utils/merge';

import type {GuiSys} from 'ovrui';
import type {ReactNativeContext} from '../ReactNativeContext';

export default class RCTSphere extends RCTBaseMesh {
  _radius: number;
  _heightSegments: number;
  _widthSegments: number;
  _needsUpdate: boolean;

  constructor(guiSys: GuiSys, rnctx: ReactNativeContext) {
    super(guiSys, rnctx);

    this._radius = 0.5;
    this._heightSegments = 6;
    this._widthSegments = 8;
    this._needsUpdate = false;

    Object.defineProperty(
      this.props,
      'radius',
      ({
        set: radius => {
          this._radius = radius;
          this._needsUpdate = true;
        },
      }: Object)
    );

    Object.defineProperty(
      this.props,
      'heightSegments',
      ({
        set: segments => {
          this._heightSegments = segments;
          this._needsUpdate = true;
        },
      }: Object)
    );

    Object.defineProperty(
      this.props,
      'widthSegments',
      ({
        set: segments => {
          this._widthSegments = segments;
          this._needsUpdate = true;
        },
      }: Object)
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
    const geometry = new SphereBufferGeometry(
      this._radius,
      this._widthSegments,
      this._heightSegments
    );
    this._setGeometry(geometry);
  }

  static describe() {
    return merge(super.describe(), {
      // register the properties sent from react to runtime
      NativeProps: {
        radius: 'number',
        widthSegments: 'number',
        heightSegments: 'number',
      },
    });
  }
}
