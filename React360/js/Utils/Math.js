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

import {type Quaternion, type Vec3} from '../Controls/Types';

export function rotateByQuaternion(v: Vec3, q: Quaternion) {
  // Optimized implementation of Hamiltonian product, similar to Unity's
  // internal implementation
  const qx = q[0];
  const qy = q[1];
  const qz = q[2];
  const qw = q[3];
  const vx = v[0];
  const vy = v[1];
  const vz = v[2];
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

  v[0] = (1 - yy2 - zz2) * vx + (xy2 - wz2) * vy + (xz2 + wy2) * vz;
  v[1] = (xy2 + wz2) * vx + (1 - xx2 - zz2) * vy + (yz2 - wx2) * vz;
  v[2] = (xz2 - wy2) * vx + (yz2 + wx2) * vy + (1 - xx2 - yy2) * vz;
}

export function quaternionMultiply(a: Quaternion, b: Quaternion) {
  const ax = a[0];
  const ay = a[1];
  const az = a[2];
  const aw = a[3];
  const bx = b[0];
  const by = b[1];
  const bz = b[2];
  const bw = b[3];

  a[0] = ax * bw + aw * bx + ay * bz - az * by;
  a[1] = ay * bw + aw * by + az * bx - ax * bz;
  a[2] = az * bw + aw * bz + ax * by - ay * bx;
  a[3] = aw * bw - ax * bx - ay * by - az * bz;
}

export function quaternionPremultiply(b: Quaternion, a: Quaternion) {
  const ax = a[0];
  const ay = a[1];
  const az = a[2];
  const aw = a[3];
  const bx = b[0];
  const by = b[1];
  const bz = b[2];
  const bw = b[3];

  b[0] = ax * bw + aw * bx + ay * bz - az * by;
  b[1] = ay * bw + aw * by + az * bx - ax * bz;
  b[2] = az * bw + aw * bz + ax * by - ay * bx;
  b[3] = aw * bw - ax * bx - ay * by - az * bz;
}

export function setQuatFromEuler(
  quat: Quaternion,
  x: number,
  y: number,
  z: number,
) {
  const cx = Math.cos(x / 2);
  const cy = Math.cos(y / 2);
  const cz = Math.cos(z / 2);
  const sx = Math.sin(x / 2);
  const sy = Math.sin(y / 2);
  const sz = Math.sin(z / 2);
  quat[0] = sx * cy * cz + cx * sy * sz;
  quat[1] = cx * sy * cz - sx * cy * sz;
  quat[2] = cx * cy * sz - sx * sy * cz;
  quat[3] = cx * cy * cz + sx * sy * sz;
}

export function setQuatFromAxisAngle(
  quat: Quaternion,
  axis: Vec3,
  angle: number,
) {
  const half = angle / 2;
  const sin = Math.sin(half);
  const cos = Math.cos(half);
  quat[0] = axis[0] * sin;
  quat[1] = axis[1] * sin;
  quat[2] = axis[2] * sin;
  quat[3] = cos;
}

export function setQuatFromXRotation(quat: Quaternion, x: number) {
  const half = x / 2;
  quat[0] = Math.sin(half);
  quat[1] = 0;
  quat[2] = 0;
  quat[3] = Math.cos(half);
}

export function setQuatFromYRotation(quat: Quaternion, y: number) {
  const half = y / 2;
  quat[0] = 0;
  quat[1] = Math.sin(half);
  quat[2] = 0;
  quat[3] = Math.cos(half);
}

export function setQuatFromZRotation(quat: Quaternion, z: number) {
  const half = z / 2;
  quat[0] = 0;
  quat[1] = 0;
  quat[2] = Math.sin(half);
  quat[3] = Math.cos(half);
}
