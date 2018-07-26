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

import * as THREE from 'three';
import merge from '../Utils/merge';

import type GuiSys from '../OVRUI/UIView/GuiSys';
import type {ReactNativeContext} from '../ReactNativeContext';
import RCTBaseMesh from './BaseMesh';

const RingGeometryCache = {};

function createRingGeometry(
  radius: number,
  heightSegments: number,
  widthSegments: number,
) {
  const key = `${radius}:${heightSegments}:${widthSegments}`;
  const cache = RingGeometryCache[key];
  if (cache) {
    cache.count++;
    return cache.geom;
  }
  const geometry = new THREE.RingBufferGeometry(
    radius,
    widthSegments,
    heightSegments,
  );

  RingGeometryCache[key] = {
    geom: geometry,
    count: 1,
  };

  return geometry;
}

export default class RCTRing extends RCTBaseMesh {
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
      }: Object),
    );

    Object.defineProperty(
      this.props,
      'heightSegments',
      ({
        set: segments => {
          this._heightSegments = segments;
          this._needsUpdate = true;
        },
      }: Object),
    );

    Object.defineProperty(
      this.props,
      'widthSegments',
      ({
        set: segments => {
          this._widthSegments = segments;
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
    const geometry = createRingGeometry(
      this._radius,
      this._widthSegments,
      this._heightSegments,
    );
    this._setGeometry(geometry);
    const sphere = new THREE.Ring(new THREE.Vector3(0, 0, 0), this._radius);
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
