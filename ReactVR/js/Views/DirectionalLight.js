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
 * @class RCTAmbientLight
 * @extends RCTBaseView
 */

import * as THREE from 'three';
import UIView from '../OVRUI/UIView/UIView';
import merge from '../Utils/merge';
import RCTBaseView from './BaseView';

export default class RCTDirectionalLight extends RCTBaseView {
  /**
   * constructor: allocates the required resources and sets defaults
   */
  constructor(guiSys) {
    super();

    // create the Point light as a child of an empty UIView
    // this allows embedding in layouts
    // Point light with large offset and no decay and no distance used inplace
    // of Direction light which was incorrectly lighting
    const light = new THREE.PointLight();
    light.decay = 0;
    light.position.set(0, 1000, 0);
    this.view = new UIView(guiSys);
    this.view.add(light);
    // In "physically correct" mode, the product of color * intensity is
    // interpreted as luminous intensity measured in candelas.
    Object.defineProperty(this.props, 'intensity', {
      set: value => {
        light.intensity = value;
      },
    });
    // Color of the light.
    Object.defineProperty(this.style, 'color', {
      set: value => {
        light.color.set(value);
      },
    });

    // defaults that match three.js
    this.props.intensity = 1;
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
