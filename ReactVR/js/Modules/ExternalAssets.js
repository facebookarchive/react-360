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
 * ExternalAssets configures the root path of resources imported via asset()
 * @class ExternalAssets
 * @extends Module
 */

export default class ExternalAssets extends Module {
  assetRoot: string;

  /**
   * Constructs an ExternalAssets with a specific asset root
   */
  constructor(assetRoot: string) {
    super('ExternalAssets');
    this.assetRoot = assetRoot;
  }
}
