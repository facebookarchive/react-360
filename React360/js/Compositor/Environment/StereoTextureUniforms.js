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

/**
 * Dynamic uniforms for rendering stereo texture.
 *
 * Callback function onUpdateCallback will be called in every render loop before
 * setting the value of the uniform to WebGL. To enable stereo texture, you
 * should set viewID=1 for the right eye camera. If you set two stereoOffsetRepeats
 * to the material, the right eye camera will use the second stereoOffsetRepeat
 */

import * as THREE from 'three';

export default class StereoTextureUniforms {
  stereoOffsetRepeat: {type: string, value: THREE.Vector4};

  constructor() {
    /** The right eye camera will use stereoOffsetRepeats[1] if it's defined. */
    this.stereoOffsetRepeat = {
      type: 'f',
      value: new THREE.Vector4(0, 0, 1, 1),
    };
  }
}
