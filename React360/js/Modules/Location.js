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
 * Location implements window.location for the React context
 * @class Location
 * @extends Module
 */
export default class Location extends Module {
  _rnctx: ReactNativeContext;
  href: string;
  protocol: string;
  host: string;
  hostname: string;
  port: string;
  search: string;
  hash: string;
  username: string | void;
  password: string | void;

  /**
   * Constructs a Location Module with a specific React Native Context
   */
  constructor(rnctx: ReactNativeContext) {
    super('Location');
    this._rnctx = rnctx;

    const location = window.location;
    this.href = location.href;
    this.protocol = location.protocol;
    this.host = location.host;
    this.hostname = location.hostname;
    this.port = location.port;
    this.search = location.search;
    this.hash = location.hash;
    this.username = location.username;
    this.password = location.password;
  }

  /**
   * Reload the current page. The optional boolean parameter determines whether
   * the cache is bypassed.
   * @param forceReload - If true, the cache will be ignored on reload
   */
  reload(forceReload: boolean) {
    window.location.reload(forceReload);
  }

  /**
   * Replace the current location, without affecting the History stack.
   * @param replace - The location to navigate to
   */
  replace(url: string) {
    window.location.replace(url);
  }
}
