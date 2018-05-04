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

/**
 * This provides a common module for both WebVR and other versions of React VR
 * so that the runtime and its particular settings can be determined and acted
 * upon in the React code
 * @class ReactVRConstants
 * @extends Module
 */
export default class ReactVRConstants extends Module {
  Version: string;
  Runtime: string;
  RuntimeVersion: string;
  userAgent: string;
  platform: string;

  constructor() {
    super('ReactVRConstants');
    this.Version = '0.1.0';
    this.Runtime = 'WebVR';
    this.RuntimeVersion = this.Version;
    this.userAgent = navigator && navigator.userAgent;
    this.platform = navigator && navigator.platform;
  }
}
