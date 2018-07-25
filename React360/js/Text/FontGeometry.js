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

export const Align = {
  auto: 'left',
  left: 'left',
  right: 'right',
  center: 'center',
  justify: 'left',
};

export interface FontGeometry {
  getNode(): any;
  setAlign(align: string): void;
  setSize(size: number): void;
  setText(text: string): void;
  setWeight(weight: number): void;
  update(): void;
}
