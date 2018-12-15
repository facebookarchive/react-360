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

export default function generateEnvironmentSphere(
  radius: number = 1000,
  vertSegments: number = 16,
  horizSegments: number = 16,
  coverage: number = 1
) {
  const geometry = [];
  const index = [];
  const segments = vertSegments;
  const segment = (Math.PI * 2) / segments;
  const segmentsPerQuadrant = segments / 4;
  const ringStart = -segment / 2 - segment * (segmentsPerQuadrant - 1);
  for (let i = ringStart; i <= -ringStart; i += segment) {
    const r = radius * Math.cos(i);
    const shouldBind = geometry.length > 0;
    RingGeometry.addRing(geometry, coverage, r, horizSegments, radius * Math.sin(i));
    if (shouldBind) {
      RingGeometry.bindLastRing(geometry, index, horizSegments, 3);
    }
  }
  const last = geometry.length / 3 - 1;
  geometry.push(0, radius, 0);
  geometry.push(0, -radius, 0);
  for (let i = horizSegments - 1; i > 0; i--) {
    index.push(last - i, last + 1, last - i + 1);
  }
  index.push(last, last + 1, last - horizSegments + 1);
  for (let i = 0; i < horizSegments - 1; i++) {
    index.push(i, last + 2, i + 1);
  }
  index.push(horizSegments - 1, last + 2, 0);

  return {geometry, index};
}
