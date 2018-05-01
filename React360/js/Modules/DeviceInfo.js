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

import Module from './Module';

type Dimension = {
  width: number,
  height: number,
  scale: number,
  fontScale: number,
  densityDpi: number,
};

/**
 * DeviceInfoModule Native Module
 * @class DeviceInfoModule
 * @extends Module
 */
export default class DeviceInfo extends Module {
  Dimensions: {
    windowPhysicalPixels: Dimension,
    screenPhysicalPixels: Dimension,
  };

  constructor() {
    super('DeviceInfo');
    this.Dimensions = {
      windowPhysicalPixels: {
        width: 1024,
        height: 1024,
        scale: 1,
        fontScale: 1,
        densityDpi: 1,
      },
      screenPhysicalPixels: {
        width: 1024,
        height: 1024,
        scale: 1,
        fontScale: 1,
        densityDpi: 1,
      },
    };
  }
}
