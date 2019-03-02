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

const TWO_PI = Math.PI * 2;

export default function computeCylinderIntersection(
  intersection: [number, number, number],
  origin: [number, number, number],
  direction: [number, number, number],
  width: number,
  height: number,
  radius: number,
  density: number
) {
  const dx = direction[0];
  const dy = direction[1];
  const dz = direction[2];
  const ox = origin[0];
  const oy = origin[1];
  const oz = -origin[2];
  const d = Math.sqrt(ox * ox + oz * oz);
  let v = 0;
  if (oz === 0) {
    v = ox >= 0 ? -Math.PI / 2 : Math.PI / 2;
  } else {
    v = -Math.atan(ox / oz);
  }
  const angle = dz === 0 ? Math.PI / 2 : -Math.atan(dx / dz);
  const theta = Math.asin((d * Math.sin(v + angle)) / radius);
  const offset = oz >= 0 ? -theta + angle : theta + angle;
  const intX = ((offset / Math.PI) * density) / 2 + width / 2;

  const fx = ox - radius * Math.sin(offset);
  const fz = -oz + radius * Math.cos(offset);
  const dFxz = Math.sqrt(fx * fx + fz * fz);
  const intY = (dFxz * dy) / Math.sqrt(dx * dx + dz * dz);
  intersection[0] = intX;
  intersection[1] = -(intY + oy) / ((radius * TWO_PI) / density) + height / 2;

  // compute distance from ray origin to surface
  const dist = Math.sqrt(dFxz * dFxz + intY * intY);
  intersection[2] = dist;
}
