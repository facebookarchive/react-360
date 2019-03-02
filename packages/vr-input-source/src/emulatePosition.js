/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @flow strict
 */

export default function emulatePosition(
  orientation: Float32Array,
  position: Float32Array,
  hand?: string
) {
  const vx = 0;
  const vy = 0;
  const vz = -0.4;

  // rotate arm model vector by orientation
  const qx = orientation[0];
  const qy = orientation[1];
  const qz = orientation[2];
  const qw = orientation[3];
  const qx2 = qx + qx;
  const qy2 = qy + qy;
  const qz2 = qz + qz;

  const xx2 = qx * qx2;
  const yy2 = qy * qy2;
  const zz2 = qz * qz2;
  const xy2 = qx * qy2;
  const xz2 = qx * qz2;
  const yz2 = qy * qz2;
  const wx2 = qw * qx2;
  const wy2 = qw * qy2;
  const wz2 = qw * qz2;

  const rotX = (1 - yy2 - zz2) * vx + (xy2 - wz2) * vy + (xz2 + wy2) * vz;
  const rotY = (xy2 + wz2) * vx + (1 - xx2 - zz2) * vy + (yz2 - wx2) * vz;
  const rotZ = (xz2 - wy2) * vx + (yz2 + wx2) * vy + (1 - xx2 - yy2) * vz;

  position[0] = rotX + (hand === 'left' ? -0.3 : 0.3);
  position[1] = rotY - 0.3;
  position[2] = rotZ;
}
