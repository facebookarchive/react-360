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

export default function generateFlatSurface(
  width: number,
  height: number,
  density: number,
  radius: number
) {
  const halfWidth = (radius * Math.PI * width) / density;
  const halfHeight = (radius * Math.PI * height) / density;
  // prettier-ignore
  const geometry = [
    -halfWidth, halfHeight, -radius, 0, 1,
    -halfWidth, -halfHeight, -radius, 0, 0,
    halfWidth, halfHeight, -radius, 1, 1,
    halfWidth, -halfHeight, -radius, 1, 0,
  ];
  const index = [0, 1, 2, 2, 1, 3];

  return {geometry, index};
}
