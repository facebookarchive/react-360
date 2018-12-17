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

// prettier-ignore
export type Mat4 = [
  number, number, number, number,
  number, number, number, number,
  number, number, number, number,
  number, number, number, number,
];

export type Transform = Mat4;

export type Quaternion = [number, number, number, number];

export type Vec3 = [number, number, number];

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

export function setQuatFromEuler(quat: Quaternion, x: number, y: number, z: number) {
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

export function setQuatFromAxisAngle(quat: Quaternion, axis: Vec3, angle: number) {
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

export function matrixMultiply4(a: Mat4, b: Mat4) {
  let q = a[0] * b[0] + a[1] * b[4] + a[2] * b[8] + a[3] * b[12];
  let r = a[0] * b[1] + a[1] * b[5] + a[2] * b[9] + a[3] * b[13];
  let s = a[0] * b[2] + a[1] * b[6] + a[2] * b[10] + a[3] * b[14];
  let t = a[0] * b[3] + a[1] * b[7] + a[2] * b[11] + a[3] * b[15];
  a[0] = q;
  a[1] = r;
  a[2] = s;
  a[3] = t;
  q = a[4] * b[0] + a[5] * b[4] + a[6] * b[8] + a[7] * b[12];
  r = a[4] * b[1] + a[5] * b[5] + a[6] * b[9] + a[7] * b[13];
  s = a[4] * b[2] + a[5] * b[6] + a[6] * b[10] + a[7] * b[14];
  t = a[4] * b[3] + a[5] * b[7] + a[6] * b[11] + a[7] * b[15];
  a[4] = q;
  a[5] = r;
  a[6] = s;
  a[7] = t;
  q = a[8] * b[0] + a[9] * b[4] + a[10] * b[8] + a[11] * b[12];
  r = a[8] * b[1] + a[9] * b[5] + a[10] * b[9] + a[11] * b[13];
  s = a[8] * b[2] + a[9] * b[6] + a[10] * b[10] + a[11] * b[14];
  t = a[8] * b[3] + a[9] * b[7] + a[10] * b[11] + a[11] * b[15];
  a[8] = q;
  a[9] = r;
  a[10] = s;
  a[11] = t;
  q = a[12] * b[0] + a[13] * b[4] + a[14] * b[8] + a[15] * b[12];
  r = a[12] * b[1] + a[13] * b[5] + a[14] * b[9] + a[15] * b[13];
  s = a[12] * b[2] + a[13] * b[6] + a[14] * b[10] + a[15] * b[14];
  t = a[12] * b[3] + a[13] * b[7] + a[14] * b[11] + a[15] * b[15];
  a[12] = q;
  a[13] = r;
  a[14] = s;
  a[15] = t;
}

export function transformVector(v: Vec3, m: Mat4) {
  const x = v[0];
  const y = v[1];
  const z = v[2];
  v[0] = m[0] * x + m[4] * y + m[8] * z + m[12];
  v[1] = m[1] * x + m[5] * y + m[9] * z + m[13];
  v[2] = m[2] * x + m[6] * y + m[10] * z + m[14];
}
