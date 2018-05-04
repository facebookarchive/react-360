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

export type Quaternion = [number, number, number, number];

export type Vec3 = [number, number, number];

export type Ray = {
  direction: [number, number, number],
  drawsCursor: boolean,
  hasAbsoluteCoordinates: boolean,
  maxLength: number,
  origin: [number, number, number],
  type: string,
};
