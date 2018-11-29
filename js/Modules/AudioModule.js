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

import AudioInstance from '../Compositor/Audio/AudioInstance';
import AudioNode from '../Compositor/Audio/AudioNode';
import type {
  AudioOptions,
  AudioPlayOptions,
  AudioSource,
  Handle,
} from '../Compositor/Audio/Types';
import type {Quaternion, Vec3} from '../Controls/Types';
import type {ReactNativeContext} from '../ReactNativeContext';
import {rotateByQuaternion} from '../Utils/Math';
import Module from './Module';

const FORWARD = [0, 0, -1];
const UP = [0, 1, 0];

const ContextConstructor = window.AudioContext || window.webkitAudioContext;

function decodeAudioData(ctx, compressed) {
  // Safari doesn't support the Promise-style API yet
  return new Promise((resolve, reject) => {
    ctx.decodeAudioData(compressed, buffer => resolve(buffer), err => reject(err));
  });
}

export default class AudioModule extends Module {
  _audioCtx: AudioContext;
  _audioData: {[uri: string]: AudioBuffer};
  _envInstance: ?AudioInstance;
  _handles: {[handle: string]: AudioInstance};
  _loaders: {[uri: string]: Promise<AudioBuffer>};
  _positioned: Array<AudioNode>;
  _rnctx: ReactNativeContext;

  constructor(rnctx: ReactNativeContext) {
    super('AudioModule');
    this._audioCtx = new ContextConstructor();
    this._audioData = {};
    this._handles = {};
    this._loaders = {};
    this._rnctx = rnctx;
  }

  _load(source: AudioSource): Promise<AudioBuffer> {
    const uri = typeof source === 'string' ? source : source.uri;
    if (!uri) {
      return Promise.reject(new Error('Invalid audio URI'));
    }
    if (this._audioData[uri]) {
      return Promise.resolve(this._audioData[uri]);
    }
    if (this._loaders[uri]) {
      return this._loaders[uri];
    }
    const loader = fetch(uri)
      .then(response => response.arrayBuffer())
      .then(compressed => decodeAudioData(this._audioCtx, compressed))
      .then(buffer => {
        this._audioData[uri] = buffer;
        delete this._loaders[uri];
        return buffer;
      });
    this._loaders[uri] = loader;
    return loader;
  }

  _setCameraParameters(position: Vec3, rotation: Quaternion) {
    FORWARD[0] = 0;
    FORWARD[1] = 0;
    FORWARD[2] = -1;
    UP[0] = 0;
    UP[1] = 1;
    UP[2] = 0;
    rotateByQuaternion(FORWARD, rotation);
    rotateByQuaternion(UP, rotation);
    this._audioCtx.listener.setPosition(position[0], position[1], position[2]);
    this._audioCtx.listener.setOrientation(
      FORWARD[0],
      FORWARD[1],
      FORWARD[2],
      UP[0],
      UP[1],
      UP[2],
    );
  }

  createAudio(handle: Handle, options: AudioOptions) {
    const audio = new AudioInstance(options);
    this._handles[handle] = audio;
    this._load(options.source);
  }

  /**
   * Create and play a sound whose lifecycle is entirely managed within the module
   */
  playOneShot(options: AudioOptions) {
    const audio = new AudioInstance({
      ...options,
      autoPlay: true,
    });
    this._load(options.source).then(buffer => {
      const node = new AudioNode(buffer, this._audioCtx);
      audio.setNode(node);
    });
  }

  playEnvironmental(options: AudioOptions) {
    if (this._envInstance) {
      this._envInstance.stop();
    }
    const audio = new AudioInstance({
      ...options,
      autoPlay: true,
      loop: true,
    });
    this._load(options.source).then(buffer => {
      const node = new AudioNode(buffer, this._audioCtx);
      audio.setNode(node);
    });
    this._envInstance = audio;
  }

  setParams(handle: string, options: AudioPlayOptions) {
    const audio = this._handles[handle];
    if (!audio) {
      return;
    }
    audio.setParams(options);
  }

  setEnvironmentalParams(options: AudioPlayOptions) {
    if (!this._envInstance) {
      return;
    }
    this._envInstance.setParams(options);
  }

  /**
   * Begin playing audio, including options for position, etc
   */
  play(handle: string, options?: AudioPlayOptions) {
    const audio = this._handles[handle];
    if (!audio) {
      return;
    }
    if (audio.getNode()) {
      audio.play(options);
    } else {
      const source = audio.getSource();
      this._load(source).then(buffer => {
        const node = new AudioNode(buffer, this._audioCtx);
        audio.setNode(node);
        audio.play(options);
      });
    }
  }

  /**
   * Stop playback
   */
  stop(handle: string) {
    const audio = this._handles[handle];
    if (!audio) {
      return;
    }
    audio.stop();
  }

  /**
   * Pause an audio track. It can be resumed by calling `play` again
   */
  pause(handle: string) {
    const audio = this._handles[handle];
    if (!audio) {
      return;
    }
    audio.pause();
  }

  /**
   * Move an audio track to a specific position, in seconds
   */
  seek(handle: string, time: number) {
    const audio = this._handles[handle];
    if (!audio) {
      return;
    }
    audio.seekTo(time);
  }

  /**
   * Stop playback of environment sound
   */
  stopEnvironmental() {
    if (!this._envInstance) {
      return;
    }
    this._envInstance.stop();
  }

  /**
   * Delete the instance associated with an audio handle
   */
  destroy(handle: string) {
    const audio = this._handles[handle];
    if (!audio) {
      return;
    }
    audio.stop();
    delete this._handles[handle];
  }

  /**
   * Preload an audio source without playing it.
   * This method is called automatically if a sound is played without being
   * explicitly loaded.
   */
  load(source: AudioSource, onReady: number) {
    this._load(source).then(() => {
      this._rnctx.invokeCallback(onReady, []);
    });
  }

  /**
   * Remove the internally cached instance of data for an audio source
   */
  unload(source: AudioSource) {
    const uri = typeof source === 'string' ? source : source.uri;
    if (!uri) {
      return;
    }
    if (this._audioData[uri]) {
      delete this._audioData[uri];
    }
  }

  frame(ms: number) {
    for (const h in this._handles) {
      this._handles[h].frame(ms);
    }
  }
}
