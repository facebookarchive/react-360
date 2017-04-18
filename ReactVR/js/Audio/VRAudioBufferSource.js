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

import * as VRAudioBufferManager from './VRAudioBufferManager';

import type VRAudioContext from './VRAudioContext';

export type MediaEvent = {
  type: 'canplay' | 'ended',
  timeStamp: number,
  target: any,
};

/**
 * The source using AudioBufferSourceNode
 */
export default class VRAudioBufferSource {
  _buffer: ?AudioBuffer;
  _sourceNode: void | AudioBufferSourceNode;
  _vrAudioContext: VRAudioContext;
  onMediaEvent: void | ((e: MediaEvent) => void);
  url: string;

  constructor(vrAudioContext: VRAudioContext) {
    this._vrAudioContext = vrAudioContext;
    this.onMediaEvent = undefined;
  }

  initializeAudio(url: string) {
    // release old reference
    if (this.url && this._buffer) {
      VRAudioBufferManager.releaseRef(this.url);
    }

    this.url = url;
    VRAudioBufferManager.fetch(url, this._vrAudioContext, (buffer: ?AudioBuffer, error) => {
      if (error) {
        console.warn('Failed to fetch audio:', url);
      } else {
        this._buffer = buffer;
        this._onMediaEvent({
          type: 'canplay',
          timeStamp: Date.now(),
          target: {
            ended: false,
            error: null,
          },
        });
      }
    });
  }

  getSourceNode() {
    return this._sourceNode;
  }

  _onMediaEvent(event: MediaEvent) {
    if (typeof this.onMediaEvent === 'function') {
      this.onMediaEvent(event);
    }
  }

  play() {
    // Every time play a buffered audio, a new buffer source node need to be created
    this.stop();
    this._sourceNode = this._vrAudioContext.getWebAudioContext().createBufferSource();
    this._sourceNode.onended = () =>
      this._onMediaEvent({
        type: 'ended',
        timeStamp: Date.now(),
        target: {
          ended: true,
          error: null,
        },
      });
    if (!this._buffer) {
      console.warn('play() called before audio loaded for url', this.url);
      return;
    }
    this._sourceNode.buffer = this._buffer;
    this._sourceNode.start();
  }

  stop() {
    const sourceNode = this._sourceNode;
    if (sourceNode) {
      sourceNode.stop();
      sourceNode.disconnect();
      this._sourceNode = undefined;
    }
  }

  dispose() {
    this.stop();
    if (this.url && this._buffer) {
      VRAudioBufferManager.releaseRef(this.url);
    }
    this.onMediaEvent = undefined;
  }
}
