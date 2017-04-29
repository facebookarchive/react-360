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
 * WebSocketModule is an implementation of the websocket interface used by React native.
 * These methods are not intended to be called directly. Rather, they are
 * called remotely by the WebSocketModule module on the React side.
 * @class WebSocketModule
 * @extends Module
 */
export default class WebSocketModule extends Module {
  _rnctx: ReactNativeContext;
  _sockets: {[id: string]: WebSocket};

  /**
   * Constructs a WebSocketModule with a specific React Native Context
   */
  constructor(rnctx: ReactNativeContext) {
    super('WebSocketModule');
    this._sockets = {};
    this._rnctx = rnctx;
  }

  /**
   * Establish a connection and associate with socketID. socketID is used for future
   * communication with React
   * @param url - string Url to connect to
   * @param protocols - protocols for creating the WebSocket instance
   * @param options - currently unused
   * @param socketId - ID used to represent this connection in React
   */
  connect(url: string, protocols: string | Array<string>, options: any, socketId: number) {
    const socket = protocols ? new WebSocket(url, protocols) : new WebSocket(url);
    socket.binaryType = 'arraybuffer';
    this._sockets[String(socketId)] = socket;

    // set the onclose, onerror and onmessage functions so that the
    // React event can be dispatched
    socket.onclose = event => {
      const payload = {
        id: socketId,
        code: event.code,
        reason: event.reason,
      };
      this._rnctx.callFunction('RCTDeviceEventEmitter', 'emit', ['websocketClosed', payload]);
    };
    socket.onerror = event => {
      const payload = {
        id: socketId,
        message: 'Native WebSocket error',
      };
      this._rnctx.callFunction('RCTDeviceEventEmitter', 'emit', ['websocketFailed', payload]);
    };
    socket.onmessage = event => {
      let data = event.data;
      if (data instanceof ArrayBuffer) {
        // Convert arraybuffer to string because the current bridge format is
        // automatically stringified to account for metadata and to speed up
        // older versions of Blink. We may be able to avoid this indirection
        // later on.
        const arr = new Uint8Array(data);
        const str = new Array(arr.byteLength);
        for (let i = 0; i < str.length; i++) {
          str[i] = String.fromCharCode(arr[i]);
        }
        data = btoa(str.join(''));
      }
      const payload = {
        id: socketId,
        type: typeof event.data === 'string' ? 'string' : 'binary',
        data: data,
      };
      this._rnctx.callFunction('RCTDeviceEventEmitter', 'emit', ['websocketMessage', payload]);
    };
    socket.onopen = event => {
      const payload = {
        id: socketId,
      };
      this._rnctx.callFunction('RCTDeviceEventEmitter', 'emit', ['websocketOpen', payload]);
    };
  }

  /**
   * internal function to send the data
   * maps the React socketID to the instance of WebSocket
   */
  _send(data: string | ArrayBuffer, socketId: number) {
    const socket = this._sockets[String(socketId)];
    if (!socket) {
      throw new Error('Error while sending data to WebSocket: no such socket');
    }
    socket.send(data);
  }

  /**
   * send
   * function called by the React code through messages
   * @param data - data from react
   * @param socketId - React socket id
   */
  send(data: string, socketId: number) {
    this._send(data, socketId);
  }

  /**
   * sendBinary
   * function called by the React code through messages
   * @param data - data from react
   * @param socketId - React socket id
   */
  sendBinary(data: string, socketId: number) {
    const chars = atob(data);
    const array = new Uint8Array(chars.length);
    for (let i = 0; i < chars.length; i++) {
      array[i] = chars.charCodeAt(i) & 255;
    }
    this._send(array.buffer, socketId);
  }

  /**
   * ping
   * Unsupported in WebVR due to
   * "Cannot send a ping. Browser WebSocket APIs are not capable of sending specific opcodes"
   * @param socketId - React socket id
   */
  ping(socketId: number) {
    throw new Error(
      'Cannot send a ping. Browser WebSocket APIs are not capable of sending specific opcodes'
    );
  }

  /**
   * close
   * function called by the React code through messages
   * @param codeOrId - if reason is undefined or sockedId is undefined this is id, otherwise
   *                   it is the code to report to the websocket
   * @param reason - reason distributed to WebSocket close, maybe undefined
   * @param socketId - React socket id or maybe undefined in which codeorID contains the socket
   */
  close(codeOrId: number, reason: void | string, socketId: void | number) {
    let id;
    if (typeof reason !== 'undefined' && typeof socketId !== 'undefined') {
      id = String(socketId);
      const socket = this._sockets[id];
      if (!socket) {
        return;
      }
      socket.close(codeOrId, reason);
    } else {
      id = String(codeOrId);
      const socket = this._sockets[id];
      if (!socket) {
        return;
      }
      socket.close();
    }
    delete this._sockets[id];
  }
}
