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

export interface CameraController {
  fillCameraProperties(position: Vec3, rotation: Quaternion): boolean;
}

export interface Raycaster {
  drawsCursor(): boolean;
  fillDirection(direction: Vec3): boolean;
  fillOrigin(origin: Vec3): boolean;
  getMaxLength(): number;
  getType(): string;
  hasAbsoluteCoordinates(): boolean;
}
