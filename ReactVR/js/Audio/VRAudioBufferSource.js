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
  _playbackTime: number;
  _startTime: number;
  _isPlaying: boolean;

  constructor(vrAudioContext: VRAudioContext) {
    this._vrAudioContext = vrAudioContext;
    this._playbackTime = 0;
    this._startTime = 0;
    this._isPlaying = false;
    this.onMediaEvent = undefined;
  }

  initializeAudio(url: string) {
    // release old reference
    if (this.url && this._buffer) {
      VRAudioBufferManager.releaseRef(this.url);
    }
    // release old buffer
    this.stopSourceNode();
    this._playbackTime = 0;
    this._buffer = null;

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
    if (this._isPlaying) return;
    this.playSourceNode();
  }

  playSourceNode() {
    // Every time play a buffered audio, a new buffer source node need to be created
    this.stopSourceNode();
    const sourceNode = this._vrAudioContext.getWebAudioContext().createBufferSource();
    this._sourceNode = sourceNode;
    sourceNode.onended = () => {
      this.stopSourceNode();
      this._playbackTime = 0;
      this._onMediaEvent({
        type: 'ended',
        timeStamp: Date.now(),
        target: {
          ended: true,
          error: null,
        },
      });
    };
    if (!this._buffer) {
      console.warn('play() called before audio loaded for url', this.url);
      return;
    }
    sourceNode.buffer = this._buffer;
    sourceNode.start(0, this._playbackTime);
    this._isPlaying = true;
    this._startTime = this._vrAudioContext.getWebAudioContext().currentTime;
  }

  seekTo(playbackTime: number) {
    if (this._buffer) {
      playbackTime = playbackTime || 0;
      // out of range
      if (playbackTime < -this._buffer.duration || playbackTime > this._buffer.duration) {
        console.warn('seekTo() time out of range: ' + playbackTime);
        playbackTime = 0;
      } else if (playbackTime < 0) {
        playbackTime = this._buffer.duration + playbackTime;
      }

      if (this._isPlaying) {
        this.stopSourceNode();
        this._playbackTime = playbackTime;
        this.playSourceNode();
      } else {
        this._playbackTime = playbackTime;
      }
    }
  }

  pause() {
    if (!this._isPlaying) return;

    this.stopSourceNode();
    this._playbackTime = this._vrAudioContext.getWebAudioContext().currentTime -
      this._startTime +
      this._playbackTime;
  }

  stop() {
    if (!this._isPlaying) return;

    this.stopSourceNode();
    this._playbackTime = 0;
  }

  stopSourceNode() {
    const sourceNode = this._sourceNode;
    if (sourceNode) {
      sourceNode.stop();
      sourceNode.disconnect();
      this._sourceNode = undefined;
    }
    this._isPlaying = false;
  }

  dispose() {
    this.stopSourceNode();
    if (this.url && this._buffer) {
      VRAudioBufferManager.releaseRef(this.url);
    }
    this.onMediaEvent = undefined;
  }

  get isPlaying(): boolean {
    return this._isPlaying;
  }
}
