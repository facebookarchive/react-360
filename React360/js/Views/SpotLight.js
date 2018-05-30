/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

/**
 * RCTSpotLight: runtime implementation of the <SpotLight >
 * https://threejs.org/docs/index.html#api/lights/SpotLight
 * @class RCTSpotLight
 * @extends RCTBaseView
 */

import * as THREE from 'three';
import UIView from '../OVRUI/UIView/UIView';
import merge from '../Utils/merge';
import RCTBaseView from './BaseView';

export default class RCTSpotLight extends RCTBaseView {
  /**
   * constructor: allocates the required resources and sets defaults
   */
  constructor(guiSys) {
    super();
    const light = new THREE.SpotLight();
    this.view = new UIView(guiSys);
    this.view.add(light);

    // In "physically correct" mode, the product of color * intensity is
    // interpreted as luminous intensity measured in candelas.
    Object.defineProperty(this.props, 'intensity', {
      set: value => {
        light.intensity = value;
      },
    });
    // If non-zero, light will attenuate linearly from maximum intensity at light position down to zero at distance.
    Object.defineProperty(this.props, 'distance', {
      set: value => {
        light.distance = value;
      },
    });
    // The amount the light dims along the distance of the light
    // In "physically correct" mode, decay = 2 leads to physically realistic light falloff.
    Object.defineProperty(this.props, 'decay', {
      set: value => {
        light.decay = value;
      },
    });
    // Maximum angle of light dispersion from its direction whose upper bound is Math.PI/2.
    Object.defineProperty(this.props, 'angle', {
      set: value => {
        light.angle = value * Math.PI / 180;
      },
    });
    // Percent of the spotlight cone that is attenuated due to penumbra.
    // Takes values between zero and 100. Default is zero.
    Object.defineProperty(this.props, 'penumbra', {
      set: value => {
        light.penumbra = Math.min(Math.max(value, 0), 100) / 100.0;
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
    this.props.distance = 0;
    this.props.decay = 1;
    this.props.angle = 180;
    this.props.penumbra = 0;
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
        distance: 'number',
        decay: 'number',
        angle: 'number',
        penumbra: 'number',
      },
    });
  }
}
