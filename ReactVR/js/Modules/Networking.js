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
 * Networking is an implementation of the networking interface used by React native.
 * These methods are not intended to be called directly. Rather, they are
 * called remotely by the Networking module on the React side.
 * The Networking module is used by React's implementation of fetch, etc
 * The functionality is built on fetch. The results of the actions and of the requests
 * are returned back to the react code via messages
 * @class Networking
 * @extends Module
 */
export default class Networking extends Module {
  _rnctx: ReactNativeContext;

  /**
   * Constructs a Networking module with a specific React Native Context
   */
  constructor(rnctx: ReactNativeContext) {
    super('Networking');
    this._rnctx = rnctx;
  }

  /**
   * Makes a request, and associates it with a specific requestId.
   * @param method - request method, 'GET', 'POST', 'DELETE'
   * @param url - url to make request to
   * @param headers - request headers
   * @param data - POST data to be sent alongside fetch
   * @param responseType - 'base64' or 'text'
   * @param useIncrementalUpdates - currently unused
   * @param timeout - currently unused
   */
  sendRequest(
    method: string,
    url: string,
    requestId: number,
    headers: {[header: string]: any},
    data: any,
    responseType: string,
    useIncrementalUpdates: any,
    timeout: any
  ) {
    method = method.toUpperCase();
    if (
      method !== 'GET' &&
      method !== 'POST' &&
      method !== 'PATCH' &&
      method !== 'PUT' &&
      method !== 'DELETE'
    ) {
      throw new Error('Invalid method type');
    }
    const options: RequestOptions = {
      method: method,
      headers: headers,
    };

    // copy over the body data for POST/PATCH in the correct form
    if ((method === 'POST' || method === 'PATCH') && data) {
      if (data.string) {
        options.body = data.string;
      } else if (data.formData) {
        const form = new FormData();
        for (let i = 0; i < data.formData.length; i++) {
          form.append(data.formData[i].fieldName, data.formData[i].string);
        }
        options.body = form;
      } else if (data.string) {
        options.body = data.string;
      }
    }

    // Make the request and send the appropriate event information to react
    // converting the data as required by `resposeType`
    const request = new Request(url, options);
    fetch(request, options)
      .then(response => {
        // first event is the response information which include the status
        // this must happen firtst
        this._rnctx.callFunction('RCTDeviceEventEmitter', 'emit', [
          'didReceiveNetworkResponse',
          [requestId, response.status, []],
        ]);
        return responseType === 'text'
          ? response.text().then(text => this._handleText(requestId, text))
          : response.blob().then(blob => this._handleBase64(requestId, blob));
      })
      .catch(res => {
        console.error(res);
      });
  }

  /**
   * handleText
   * responseData for test encoding is received as a string and can be
   * directly sent to React
   * @param requestId - ID used by React
   * @param responseData - string input returned by runtime fetch
   */
  _handleText(requestId: number, responseData: string) {
    // send the string with request ID
    this._rnctx.callFunction('RCTDeviceEventEmitter', 'emit', [
      'didReceiveNetworkData',
      [requestId, responseData],
    ]);
    // notifiy the end of the data by sending response with null
    this._rnctx.callFunction('RCTDeviceEventEmitter', 'emit', [
      'didCompleteNetworkResponse',
      [requestId, null],
    ]);
  }

  /**
   * handleBase64
   * responseData for base64 encoding is received as a blob which needs to be converted
   * to base64 before sending over to React
   * @param requestId - ID used by React
   * @param responseData - Blob input returned by runtime fetch
   */
  _handleBase64(requestId: number, responseData: Blob) {
    // use FileReader to convert blob to base64
    const reader = new FileReader();
    reader.onload = event => {
      // move on 8 characters if base64 string is found
      let index = event.target.result.indexOf(';base64,');
      index = index >= 0 ? index + 8 : index;

      // finally send the string with request ID
      this._rnctx.callFunction('RCTDeviceEventEmitter', 'emit', [
        'didReceiveNetworkData',
        [requestId, event.target.result.slice(index)],
      ]);
      // notifiy the end of the data by sending response with null
      this._rnctx.callFunction('RCTDeviceEventEmitter', 'emit', [
        'didCompleteNetworkResponse',
        [requestId, null],
      ]);
    };
    reader.readAsDataURL(responseData);
  }
}
