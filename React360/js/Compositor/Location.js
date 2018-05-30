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

import {type Quaternion, type Vec3} from '../Controls/Types';

export default class Location {
  _dirty: boolean;
  worldPosition: Vec3;
  worldRotation: Quaternion;

  constructor(position?: Vec3, rotation?: Quaternion) {
    // Copies indexes individually because Flow can't guarantee tuples with slice()
    if (position) {
      this.worldPosition = [position[0], position[1], position[2]];
    } else {
      this.worldPosition = [0, 0, 0];
    }
    if (rotation) {
      this.worldRotation = [rotation[0], rotation[1], rotation[2], rotation[3]];
    } else {
      this.worldRotation = [0, 0, 0, 1];
    }
  }

  setWorldPosition(x: number, y: number, z: number) {
    this.worldPosition[0] = x;
    this.worldPosition[1] = y;
    this.worldPosition[2] = z;
    this._dirty = true;
  }

  setWorldRotation(x: number, y: number, z: number, w: number) {
    this.worldRotation[0] = x;
    this.worldRotation[1] = y;
    this.worldRotation[2] = z;
    this.worldRotation[3] = w;
    this._dirty = true;
  }

  isDirty(): boolean {
    return this._dirty;
  }

  clearDirtyFlag() {
    this._dirty = false;
  }
}
