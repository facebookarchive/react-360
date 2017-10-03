/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

/**
 * RCTDirectionalLight: runtime implementation of the <DirectionalLight >
 * https://threejs.org/docs/index.html#api/lights/DirectionalLight
 * Directional light implemented with PointLight with no decay and no distance falloff
 * Workaround for directional lights not correctly functioning, will revisit
 * @class RCTDirectionalLight
 * @extends RCTBaseLight
 */

import RCTBaseLight from './BaseLight';
import * as OVRUI from 'ovrui';
import * as THREE from 'three';

export default class RCTDirectionalLight extends RCTBaseLight {
  /**
   * constructor: allocates the required resources and sets defaults
   */
  constructor(guiSys) {
    super();

    // create the Point light as a child of an empty UIView
    // this allows embedding in layouts
    // Point light with large offset and no decay and no distance used inplace
    // of Direction light which was incorrectly lighting
    this.light = new THREE.PointLight();
    this.light.decay = 0;
    this.light.position.set(0, 1000, 0);
    this.view = new OVRUI.UIView(guiSys);
    this.view.add(this.light);

    // Color of the light.
    Object.defineProperty(this.style, 'color', {
      set: value => {
        this.light.color.set(value);
      },
    });
  }
}
