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

import * as RingGeometry from './RingGeometry';

export default function generateCylinderSurface(
  width: number,
  height: number,
  density: number,
  radius: number
) {
  const geometry = [];
  const index = [];
  const coverage = width / density;
  let segments = (60 * coverage) | 0;
  if (segments % 2) {
    segments++;
  }
  const halfHeight = (radius * Math.PI * height) / density;
  RingGeometry.addRing(geometry, coverage, radius, segments, -halfHeight, 0);
  RingGeometry.addRing(geometry, coverage, radius, segments, halfHeight, 1);
  RingGeometry.bindLastRing(geometry, index, segments, 5);
  return {geometry, index};
}
