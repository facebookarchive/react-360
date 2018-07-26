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
  innerRadius: number,
  outerRadius: number,
  thetaSegments: number,
  phiSegments: number,
  thetaStart: number,
  thetaLength: number,
) {
  const key = `${innerRadius}:${outerRadius}:${thetaSegments}:${phiSegments}:${thetaStart}:${thetaLength}`;
  const cache = RingGeometryCache[key];
  if (cache) {
    cache.count++;
    return cache.geom;
  }
  const geometry = new THREE.RingBufferGeometry(
    innerRadius,
    outerRadius,
    thetaSegments,
    phiSegments,
    thetaStart,
    thetaLength,
  );

  RingGeometryCache[key] = {
    geom: geometry,
    count: 1,
  };

  return geometry;
}

export default class RCTRing extends RCTBaseMesh {
  _innerRadius: number;
  _outerRadius: number;
  _thetaSegments: number;
  _phiSegments: number;
  _thetaStart: number;
  _thetaLength: number;
  _needsUpdate: boolean;

  constructor(guiSys: GuiSys, rnctx: ReactNativeContext) {
    super(guiSys, rnctx);

    this._innerRadius = 0.5;
    this._outerRadius = 1;
    this._thetaSegments = 8;
    this._phiSegments = 1;
    this._thetaStart = 0;
    this._thetaLength = Math.PI * 2;
    this._needsUpdate = false;

    Object.defineProperty(
      this.props,
      'innerRadius',
      ({
        set: innerRadius => {
          this._innerRadius = innerRadius;
          this._needsUpdate = true;
        },
      }: Object),
    );

    Object.defineProperty(
      this.props,
      'outerRadius',
      ({
        set: outerRadius => {
          this._outerRadius = outerRadius;
          this._needsUpdate = true;
        },
      }: Object),
    );

    Object.defineProperty(
      this.props,
      'thetaSegments',
      ({
        set: thetaSegments => {
          this._thetaSegments = thetaSegments;
          this._needsUpdate = true;
        },
      }: Object),
    );

    Object.defineProperty(
      this.props,
      'phiSegments',
      ({
        set: phiSegments => {
          this._phiSegments = phiSegments;
          this._needsUpdate = true;
        },
      }: Object),
    );

    Object.defineProperty(
      this.props,
      'thetaStart',
      ({
        set: thetaStart => {
          this._thetaStart = thetaStart;
          this._needsUpdate = true;
        },
      }: Object),
    );

    Object.defineProperty(
      this.props,
      'thetaLength',
      ({
        set: thetaLength => {
          this._thetaLength = thetaLength;
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
      this._innerRadius,
      this._outerRadius,
      this._thetaSegments,
      this._phiSegments,
      this._thetaStart,
      this._thetaLength,
    );
    this._setGeometry(geometry);
  }

  static describe() {
    return merge(super.describe(), {
      // register the properties sent from react to runtime
      NativeProps: {
        innerRadius: 'number',
        outerRadius: 'number',
        thetaSegments: 'number',
        phiSegments: 'number',
        thetaStart: 'number',
        thetaLength: 'number',
      },
    });
  }
}
