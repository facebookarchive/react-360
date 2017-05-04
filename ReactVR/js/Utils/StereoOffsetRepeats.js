/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

/**
 * StereoOffsetRepeats: Constants of offsetRepeats for different stereo format
 */

import * as THREE from 'three';

const StereoOffsetRepeats = {
  // 2D texture
  '2D': [new THREE.Vector4(0, 0, 1, 1)],
  // 3D texture splited into top and bottom, the top-half for left eye and the bottom-half for right eye
  TOP_BOTTOM_3D: [new THREE.Vector4(0, 0.5, 1, 0.5), new THREE.Vector4(0, 0, 1, 0.5)],
  // 3D texture splited into top and bottom, the bottom-half for left eye and the top-half for right eye
  BOTTOM_TOP_3D: [new THREE.Vector4(0, 0, 1, 0.5), new THREE.Vector4(0, 0.5, 1, 0.5)],
  // 3D texture splited into left and right, the left-half for left eye and the right-half for right eye
  LEFT_RIGHT_3D: [new THREE.Vector4(0, 0, 0.5, 1), new THREE.Vector4(0.5, 0, 0.5, 1)],
  // 3D texture splited into left and right, the right-half for left eye and the left-half for right eye
  RIGHT_LEFT_3D: [new THREE.Vector4(0.5, 0, 0.5, 1), new THREE.Vector4(0, 0, 0.5, 1)],
};

export default StereoOffsetRepeats;
