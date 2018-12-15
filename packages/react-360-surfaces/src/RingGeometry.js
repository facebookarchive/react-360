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
 * Add a 2D ring of vertices to an existing geometry
 */
export function addRing(
  geometry: Array<number>,
  coverage: number,
  radius: number,
  segments: number,
  y: number,
  v?: number
) {
  const angleStart = -coverage * Math.PI;
  const angleEnd = -angleStart;
  const totalAngle = angleEnd - angleStart;
  const segment = totalAngle / segments;
  for (let alpha = angleStart; alpha <= angleEnd; alpha += segment) {
    geometry.push(radius * Math.sin(alpha), y, -radius * Math.cos(alpha));
    if (v != null) {
      const u = (alpha - angleStart) / totalAngle;
      geometry.push(u, v);
    }
  }
}

/**
 * Bind the latest ring to the previous ring by constructing triangles between them
 */
export function bindLastRing(
  geometry: Array<number>,
  index: Array<number>,
  segmentsPerRing: number,
  stride: number
) {
  const count = segmentsPerRing + 1;
  const vertices = geometry.length / stride;
  const ringStart = vertices - count;
  for (let i = 0; i < count - 1; i++) {
    index.push(ringStart + i, ringStart + i - count, ringStart + i + 1);
    index.push(ringStart + i + 1, ringStart + i - count, ringStart + i - count + 1);
  }
}
