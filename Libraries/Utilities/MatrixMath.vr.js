/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule MatrixMath
 */

'use strict';

const MatrixMath = require('react-native/Libraries/Utilities/MatrixMath');

/**
 * Returns the rotation around the X, Y & Z axes
 */
MatrixMath.rotationMatrixToDegreesXYZ = function(matrix: Array<number>): Array<number> {
  // prettier-ignore
  const [
    m00, m01, m02, m03,
    m10, m11, m12, m13,
    m20, m21, m22, m23,
    m30, m31, m32, m33,
  ] = matrix;

  // Check if the matrix is singular
  const sy = Math.sqrt(m00 * m00 + m10 * m10);
  if (sy > 0.0001) {
    return [Math.atan2(m21, m22), Math.atan2(-m20, sy), Math.atan2(m10, m00)];
  } else {
    return [Math.atan2(-m12, m11), Math.atan2(-m20, 0), 0];
  }
};

MatrixMath.createRotateX = function(radians) {
  const mat = MatrixMath.createIdentityMatrix();
  MatrixMath.reuseRotateXCommand(mat, radians);
  return mat;
};

MatrixMath.createRotateY = function(radians) {
  const mat = MatrixMath.createIdentityMatrix();
  MatrixMath.reuseRotateYCommand(mat, radians);
  return mat;
};

MatrixMath.createRotateZ = function(radians) {
  const mat = MatrixMath.createIdentityMatrix();
  MatrixMath.reuseRotateZCommand(mat, radians);
  return mat;
};

module.exports = MatrixMath;
