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
import GLRoot from './GLRoot';

export type RenderTargetRootOptions = {
  scene?: any,
};

export default class RenderTargetRoot extends GLRoot {
  constructor(options: RenderTargetRootOptions = {}) {
    const scene = options.scene || new THREE.Scene();
    super(scene);
  }

  showCursor() {
    return false;
  }
}
