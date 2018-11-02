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

import type {ReactNativeContext} from '../ReactNativeContext';

/**
 * Source code module to allow React code to lookup source maps
 * @class RCTSourceCode
 * @extends Module
 */
export default class RCTSourceCode extends Module {
  scriptURL: string;
  _rnctx: ReactNativeContext;

  constructor(rnctx: ReactNativeContext) {
    super('RCTSourceCode');
    this._rnctx = rnctx;

    this.scriptURL = location.protocol + '//' + location.host;
    // match to remove filename (usually index.html) after the last slash in pathname
    const match = location.pathname && location.pathname.match(/^.*\//);
    const path = match ? match[0] : null;
    this.scriptURL += path ? path : '/';
  }

  getScriptText(resolve: number, reject: number) {
    this._rnctx.invokeCallback(resolve, [
      {fullSourceMappingURL: location.protocol + '//' + location.host + '/'},
    ]);
  }
}
