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

import type {Vec3} from '../../Controls/Types';

/**
 * Implements audio playback on top of the browser's AudioContext APIs
 */
export default class AudioNode {
  _ctx: AudioContext;
  _gain: GainNode;
  _onEnd: null | (() => mixed);
  _panner: PannerNode;
  _playing: boolean;
  _source: AudioBufferSourceNode;
  _volume: number;

  constructor(buffer: AudioBuffer, ctx: AudioContext) {
    this._ctx = ctx;
    this._panner = ctx.createPanner();
    this._playing = false;
    this._source = ctx.createBufferSource();
    this._source.buffer = buffer;
    this._gain = ctx.createGain();
    this._source.connect(this._gain);
    this._onEnd = null;

    this._source.onended = e => {
      this._playing = false;
      if (this._onEnd) {
        this._onEnd();
      }
    };
    this._volume = 1.0;
  }

  isPlaying(): boolean {
    return this._playing;
  }

  setBuffer(buffer: AudioBuffer) {
    this._source.buffer = buffer;
  }

  setLoop(loop: boolean) {
    this._source.loop = loop;
  }

  setVolume(vol: number) {
    this._volume = vol;
    this._gain.gain.setValueAtTime(
      Math.max(0.00001, Math.min(1, vol)),
      this._ctx.currentTime,
    );
  }

  getVolume(): number {
    return this._volume;
  }

  setMuted(muted: boolean) {
    if (muted) {
      this._gain.gain.setValueAtTime(0.00001, this._ctx.currentTime);
    } else {
      this._gain.gain.setValueAtTime(this._volume, this._ctx.currentTime);
    }
  }

  setPosition(pos: Vec3) {
    this._panner.setPosition(pos[0], pos[1], pos[2]);
  }

  start(config?: {is3d?: boolean}) {
    this._playing = true;
    let lastNode = this._gain;
    if (config && config.is3d) {
      // Connect the gain node to the panner node before going to output
      this._gain.connect(this._panner);
      this._panner.panningModel = 'HRTF';
      this._panner.distanceModel = 'inverse';
      this._panner.coneInnerAngle = 360;
      this._panner.coneOuterAngle = 0;
      this._panner.coneOuterGain = 0;
      lastNode = this._panner;
    }
    lastNode.connect(this._ctx.destination);
    this._source.start();
  }

  stop() {
    if (!this._playing) {
      return;
    }
    this._playing = false;
    this._source.stop();
  }

  onEnd(cb: () => mixed) {
    this._onEnd = cb;
  }
}
