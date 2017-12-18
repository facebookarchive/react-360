/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

/**
 * RCTAmbientLight: runtime implementation of the <AmbientLight >
 * https://threejs.org/docs/index.html#api/lights/AmbientLight
 * @class RCTAmbientLight
 * @extends RCTBaseLight
 * @flow
 */

import RCTBaseLight from './BaseLight';
import merge from '../Utils/merge';
import * as OVRUI from 'ovrui';
import * as THREE from 'three';

import type {GuiSys} from 'ovrui';

export default class RCTAmbientLight extends RCTBaseLight {
  /**
   * constructor: allocates the required resources and sets defaults
   */
  constructor(guiSys: GuiSys) {
    super();

    // create the ambient light as a child of an empty UIView
    // this allows embedding in layouts
    this.light = new THREE.AmbientLight();
    this.view = new OVRUI.UIView(guiSys);
    this.view.add(this.light);

    // Color of the light.
    Object.defineProperty(
      this.style,
      'color',
      ({
        set: value => {
          this.light.color.set(value);
        },
      }: Object)
    );
  }

  /**
   * Describes the properties representable by this view type and merges
   * with super type
   */
  static describe() {
    return merge(super.describe(), {
      // declare the native props sent from react to runtime
      NativeProps: {
        intensity: 'number',
      },
    });
  }
}
