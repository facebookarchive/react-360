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

export default function computeFlatIntersection(
  intersection: [number, number, number],
  origin: [number, number, number],
  direction: [number, number, number],
  width: number,
  height: number,
  radius: number,
  density: number
) {
  const distToSurface = radius + origin[2];
  const dx = -direction[0];
  const dy = -direction[1];
  const dz = direction[2];
  const intX = (distToSurface * dx) / dz;
  const intY = (distToSurface * dy) / dz;
  const surfaceScale = (radius * TWO_PI) / density;
  intersection[0] = (intX + origin[0] + (surfaceScale * width) / 2) / surfaceScale;
  intersection[1] = ((surfaceScale * height) / 2 - intY - origin[1]) / surfaceScale;
  intersection[2] = Math.sqrt(distToSurface * distToSurface + intX * intX + intY * intY);
}
