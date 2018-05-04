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
 * @extends RCTBaseView
 * @flow
 */

import * as THREE from 'three';
import UIView from '../OVRUI/UIView/UIView';
import merge from '../Utils/merge';

import type GuiSys from '../OVRUI/UIView/GuiSys';
import RCTBaseView from './BaseView';

export default class RCTAmbientLight extends RCTBaseView {
  /**
   * constructor: allocates the required resources and sets defaults
   */
  constructor(guiSys: GuiSys) {
    super();
    // create the ambient light as a child of an empty UIView
    // this allows embedding in layouts
    const light = new THREE.AmbientLight();
    this.view = new UIView(guiSys);
    this.view.add(light);
    // In "physically correct" mode, the product of color * intensity is
    // interpreted as luminous intensity measured in candelas.
    Object.defineProperty(
      this.props,
      'intensity',
      ({
        set: value => {
          light.intensity = value;
        },
      }: Object),
    );
    // Color of the light.
    Object.defineProperty(
      this.style,
      'color',
      ({
        set: value => {
          light.color.set(value);
        },
      }: Object),
    );

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
