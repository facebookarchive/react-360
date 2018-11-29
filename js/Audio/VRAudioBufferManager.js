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
import {MEDIA_ERR_NETWORK, MEDIA_ERR_DECODE, default as MediaError} from './MediaError';

import type VRAudioContext from './VRAudioContext';

type OnLoadHandler = (buffer: ?AudioBuffer, error: ?MediaError) => void;

// A simple dictionary cache and a simple request batch
// TODO: we should use expire time to update/clean cache
const _cache: {
  [key: string]: {
    buffer: AudioBuffer,
    ref: number,
  },
} = {};
const _pendingRequest: {[key: string]: Array<OnLoadHandler>} = {};

export function fetch(url: string, audioContext: VRAudioContext, onLoad: OnLoadHandler) {
  if (_cache[url]) {
    // already in cache
    _cache[url].ref++;
    onLoad(_cache[url].buffer, null);
  }
  if (!_pendingRequest[url]) {
    // new request
    _pendingRequest[url] = [onLoad];

    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'arraybuffer';

    xhr.onload = function() {
      if (xhr.status === 200) {
        audioContext.getWebAudioContext().decodeAudioData(
          xhr.response,
          function(buffer: AudioBuffer) {
            _onRequestSucceed(url, buffer);
          },
          function(message) {
            _onRequestError(
              url,
              new MediaError(
                MEDIA_ERR_DECODE,
                '[VRAudioBufferSource] Decoding failure: ' + url + ' (' + message + ')'
              )
            );
          }
        );
      } else {
        _onRequestError(
          url,
          new MediaError(
            MEDIA_ERR_NETWORK,
            '[VRAudioBufferSource] XHR Error: ' + url + ' (' + xhr.statusText + ')'
          )
        );
      }
    };

    xhr.onerror = function(event) {
      _onRequestError(
        url,
        new MediaError(MEDIA_ERR_NETWORK, '[VRAudioBufferSource] XHR Network failure: ' + url)
      );
    };

    xhr.send();
  } else {
    _pendingRequest[url].push(onLoad);
  }
}

export function releaseRef(url: string) {
  if (_cache[url]) {
    _cache[url].ref--;
    if (_cache[url].ref <= 0) {
      delete _cache[url];
    }
  }
}

function _onRequestSucceed(url: string, buffer: AudioBuffer) {
  const pendingRequest = _pendingRequest[url];
  delete _pendingRequest[url];
  _cache[url] = {
    buffer: buffer,
    ref: pendingRequest.length,
  };
  pendingRequest.map(_onLoad => {
    _onLoad(_cache[url].buffer, null);
  });
}

function _onRequestError(url: string, error: MediaError) {
  const pendingRequest = _pendingRequest[url];
  delete _pendingRequest[url];
  pendingRequest.map(_onLoad => {
    _onLoad(null, error);
  });
}
