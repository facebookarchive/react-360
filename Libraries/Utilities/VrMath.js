/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule VrMath
 */
'use strict';

const clamp = require('clamp');
const MatrixMath = require('MatrixMath');

const RAD_TO_DEG = 180 / Math.PI;
const DEG_TO_RAD = Math.PI / 180;

/**
 * Math utilities for React VR
 */
const VrMath = {
  /**
   * Get scale from a 4x4 matrix, assumes upper 3x3 of matrix
   * only contains scale and rotation
   * @param {array} m - The array[16] for 4x4 matrix
   * @return {array} the translation, in x, y, z order.
   * Based on: https://github.com/mrdoob/three.js/blob/master/src/math/Matrix4.js
   */
  getScale: function(m) {
    const sx = MatrixMath.v3Length([m[0], m[1], m[2]]);
    const sy = MatrixMath.v3Length([m[4], m[5], m[6]]);
    const sz = MatrixMath.v3Length([m[8], m[9], m[10]]);
    // Check for a coordinate system flip. if determine is negative,
    // we need to invert one scale.
    const det = MatrixMath.determinant(m);
    return det < 0 ? [-sx, sy, sz] : [sx, sy, sz];
  },
  /**
   * Get translation from a 4x4 matrix
   * @param {array} m - The array[16] for 4x4 matrix
   * @return {array} the translation, in x, y, z order.
   */
  getTranslation: function(m) {
    return [m[12], m[13], m[14]];
  },

  /**
   * Get rotation from a 4x4 matrix
   * @param {array} m - The array[16] for 4x4 matrix, assumes upper 3x3 of matrix
   * only contains scale and rotation
   * @param {string} eulerOrder - The order of euler angle rotation sequence.
   * @return {array} the rotation euler angle, in x, y, z order.
   * Based on: https://github.com/mrdoob/three.js/blob/master/src/math/Euler.js
   */
  getRotation: function(m, eulerOrder) {
    const scale = this.getScale(m);

    const invSX = 1 / scale[0];
    const invSY = 1 / scale[1];
    const invSZ = 1 / scale[2];

    const m11 = m[0] * invSX;
    const m12 = m[4] * invSY;
    const m13 = m[8] * invSZ;
    const m21 = m[1] * invSX;
    const m22 = m[5] * invSY;
    const m23 = m[9] * invSZ;
    const m31 = m[2] * invSX;
    const m32 = m[6] * invSY;
    const m33 = m[10] * invSZ;
    const order = eulerOrder || 'YXZ';
    const rotation = [0, 0, 0];
    if (order === 'XYZ') {
      rotation[1] = Math.asin(clamp(m13, -1, 1));
      if (Math.abs(m13) < 0.99999) {
        rotation[0] = Math.atan2(-m23, m33);
        rotation[2] = Math.atan2(-m12, m11);
      } else {
        rotation[0] = Math.atan2(m32, m22);
        rotation[2] = 0;
      }
    } else if (order === 'YXZ') {
      rotation[0] = Math.asin(-clamp(m23, -1, 1));
      if (Math.abs(m23) < 0.99999) {
        rotation[1] = Math.atan2(m13, m33);
        rotation[2] = Math.atan2(m21, m22);
      } else {
        rotation[1] = Math.atan2(-m31, m11);
        rotation[2] = 0;
      }
    } else if (order === 'ZXY') {
      rotation[0] = Math.asin(clamp(m32, -1, 1));
      if (Math.abs(m32) < 0.99999) {
        rotation[1] = Math.atan2(-m31, m33);
        rotation[2] = Math.atan2(-m12, m22);
      } else {
        rotation[1] = 0;
        rotation[2] = Math.atan2(m21, m11);
      }
    } else if (order === 'ZYX') {
      rotation[1] = Math.asin(-clamp(m31, -1, 1));
      if (Math.abs(m31) < 0.99999) {
        rotation[0] = Math.atan2(m32, m33);
        rotation[2] = Math.atan2(m21, m11);
      } else {
        rotation[0] = 0;
        rotation[2] = Math.atan2(-m12, m22);
      }
    } else if (order === 'YZX') {
      rotation[2] = Math.asin(clamp(m21, -1, 1));
      if (Math.abs(m21) < 0.99999) {
        rotation[0] = Math.atan2(-m23, m22);
        rotation[1] = Math.atan2(-m31, m11);
      } else {
        rotation[0] = 0;
        rotation[1] = Math.atan2(m13, m33);
      }
    } else if (order === 'XZY') {
      rotation[2] = Math.asin(-clamp(m12, -1, 1));
      if (Math.abs(m12) < 0.99999) {
        rotation[0] = Math.atan2(m32, m22);
        rotation[1] = Math.atan2(m13, m11);
      } else {
        rotation[0] = Math.atan2(-m23, m33);
        rotation[1] = 0;
      }
    } else {
      console.warn('VrMath.getRotation: unsupported order: ' + order);
    }
    return rotation;
  },

  /**
   * Get forward direction from a matrix
   * @param {array} m - The array[16] for 4x4 matrix
   * @return {array} the forward vector, in x, y, z order, normalized.
   */
  getMatrixForward: function(m) {
    return MatrixMath.v3Normalize([-m[8], -m[9], -m[10]]);
  },

  /**
   * Get up direction from a matrix
   * @param {array} m - The array[16] for 4x4 matrix
   * @return {array} the up vector, in x, y, z order, normalized.
   */
  getMatrixUp: function(m) {
    return MatrixMath.v3Normalize([m[4], m[5], m[6]]);
  },

  radToDeg: function(rad) {
    return rad * RAD_TO_DEG;
  },

  degToRad: function(deg) {
    return deg * DEG_TO_RAD;
  },
};

module.exports = VrMath;
