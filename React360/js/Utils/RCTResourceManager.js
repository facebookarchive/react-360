/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

/**
 * Class of a dictionary mapping protocol and handle to any resource in ReactVR.
 * Then a React Native Components can use resources via a url like "protocol://handle".
 * Please don't use existing url protocols like http/https/... as resource's protocols,
 * which will causes naming collision when parsing a resourceUrl.
 * @constructor
 */
export function RCTResourceManager() {
  this._resourceDictionaries = {};
  this._resourceListener = {};
  for (const protocol in this._validProtocols) {
    this._resourceDictionaries[protocol] = {};
  }
}

RCTResourceManager.prototype = Object.assign(Object.create(Object.prototype), {
  constructor: RCTResourceManager,

  /**
   *  only protocols list here is valid in RCTResourceManager
   */
  _validProtocols: {
    MonoTexture: 'MonoTexture',
  },

  /**
   * Check if a protocol is valid in RCTResourceManager
   * @param {string} protocol - The protocol.
   * @return {bool} whether the protocol is valid
   */
  isValidProtocol(protocol) {
    return this._validProtocols[protocol] === protocol;
  },

  /**
   * check if a url is valid in RCTResourceManager
   * @param {string} url - The url.
   * @return {bool} whether the url is valid
   */
  isValidUrl: function(url) {
    const parsed = this.parseUrl(url);
    return parsed.protocol && parsed.handle && this.isValidProtocol(parsed.protocol);
  },

  /**
   * Trying to parse a "protocol://handle" like url to protocol and handle
   * @param {string} url - The url.
   * @return {Object} The parsed result
   */
  parseUrl: function(url) {
    let protocol = undefined;
    let handle = undefined;
    if (url) {
      const spiltPos = url.indexOf('://');
      if (spiltPos > -1) {
        protocol = url.slice(0, spiltPos);
        handle = url.slice(spiltPos + 3);
      }
    }
    return {
      protocol: protocol,
      handle: handle,
    };
  },

  /**
   * generate the url a "protocol://handle"
   * @param {string} protocol - The protocol.
   * @param {string} handle - The handle.
   * @return {string} The url
   */
  genUrl(protocol, handle) {
    return protocol + '://' + handle;
  },

  /**
   * register a listener to listen to the resource update of a url
   * @param {string} url - The url.
   * @param {function} listener - The listener call back.
   */
  addListener: function(url, listener) {
    // register listener
    if (listener) {
      if (this._resourceListener[url] === undefined) {
        this._resourceListener[url] = [];
      }
      if (this._resourceListener[url].indexOf(listener) === -1) {
        this._resourceListener[url].push(listener);
      }
    }
  },

  /**
   * remove a listener
   * @param {string} url - The url.
   * @param {function} listener - The listener call back.
   */
  removeListener: function(url, listener) {
    const listenerArray = this._resourceListener[url];

    if (listenerArray !== undefined && listener !== undefined) {
      const index = listenerArray.indexOf(listener);
      if (index !== -1) {
        listenerArray.splice(index, 1);
      }
    }
  },

  _dispatchUpdate: function(protocol, handle) {
    const url = this.genUrl(protocol, handle);
    if (this._resourceListener[url]) {
      for (let i = 0; i < this._resourceListener[url].length; i++) {
        const listener = this._resourceListener[url][i];
        listener(url);
      }
    }
  },

  /**
   * Add a resource to handle
   * @param {string} protocol - The protocol.
   * @param {string} handle - The handle.
   * @param {Object} resource - The resource
   */
  addResource: function(protocol, handle, resource) {
    if (!this.isValidProtocol()) {
      // don't add anything if the protocol is not valid
      return;
    }
    this._resourceDictionaries[protocol][handle] = resource;
    this._dispatchUpdate(protocol, handle);
  },

  /**
   * Get the mapped resource, will return undefined if the resource does not exist
   * @param {string} protocol - The protocol.
   * @param {string} handle - The handle.
   * @return {Object|undefined} The resource.
   */
  getResource: function(protocol, handle) {
    if (!this.isValidProtocol()) {
      // return undefined if the protocol is not valid
      return undefined;
    }
    if (this._resourceDictionaries[protocol]) {
      return this._resourceDictionaries[protocol][handle];
    } else {
      return undefined;
    }
  },

  /**
   * Remove the mapped resource
   * @param {string} protocol - The protocol.
   * @param {string} handle - The handle.
   */
  removeResource: function(protocol, handle) {
    if (!this.isValidProtocol()) {
      // don't add anything if the protocol is not valid
      return;
    }
    if (this._resourceDictionaries[protocol]) {
      delete this._resourceDictionaries[protocol][handle];
      this._dispatchUpdate(protocol, handle);
    }
  },
});
