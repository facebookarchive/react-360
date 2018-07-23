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

export default class PlatformConstants extends Module {
  reactNativeVersion: {
    major: number,
    minor: number,
    patch: number,
    prerelease: ?number,
  };

  constructor() {
    super('PlatformConstants');
    this.reactNativeVersion = {
      major: 0,
      minor: 55,
      patch: 4,
      prerelease: null,
    };
  }
}
