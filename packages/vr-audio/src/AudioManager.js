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

import AudioInstance from './AudioInstance';
import {rotateByQuaternion} from './AudioMath';
import AudioNode from './AudioNode';
import type {
  AudioOptions,
  AudioPlayOptions,
  AudioSource,
  Handle,
  Quaternion,
  Vec3,
} from './AudioTypes';

const FORWARD = [0, 0, -1];
const UP = [0, 1, 0];

const ContextConstructor = window.AudioContext || window.webkitAudioContext;

function decodeAudioData(ctx, compressed) {
  // Safari doesn't support the Promise-style API yet
  return new Promise((resolve, reject) => {
    ctx.decodeAudioData(compressed, buffer => resolve(buffer), err => reject(err));
  });
}

export default class AudioManager {
  _audioCtx: ?AudioContext;
  _audioData: {[uri: string]: AudioBuffer};
  _awaitAudioCtx: Promise<AudioContext>;
  _envInstance: ?AudioInstance;
  _handles: {[handle: string]: AudioInstance};
  _loaders: {[uri: string]: Promise<AudioBuffer>};
  _positioned: Array<AudioNode>;
  _resolveAudioCtx: AudioContext => void;

  constructor() {
    this._audioCtx = null;
    this._awaitAudioCtx = new Promise(resolve => {
      this._resolveAudioCtx = resolve;
    });
    this._audioData = {};
    this._handles = {};
    this._loaders = {};
  }

  /**
   * Must be called from within a user interaction, like onclick
   */
  initializeAudioContext() {
    this._audioCtx = new ContextConstructor();
    this._resolveAudioCtx(this._audioCtx);
  }

  /**
   * Load and cache an external audio source. When audio instances are created,
   * they automatically call this method, but it can be manually called to
   * pre-load resources. Multiple references to the same external URL will
   * resolve to the same fetch-and-parse call, avoiding duplicate work.
   */
  load(source: AudioSource): Promise<AudioBuffer> {
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
      .then(
        compressed =>
          new Promise(resolve =>
            this._awaitAudioCtx.then(ctx => {
              resolve([ctx, compressed]);
            })
          )
      )
      .then(([ctx, compressed]) => decodeAudioData(ctx, compressed))
      .then(buffer => {
        this._audioData[uri] = buffer;
        delete this._loaders[uri];
        return buffer;
      });
    this._loaders[uri] = loader;
    return loader;
  }

  /**
   * Update the viewer's position and rotation in 3D space. This updates the
   * perceived locations of positional audio, creating an immersive environment.
   */
  setViewParameters(position: Vec3, rotation: Quaternion) {
    const ctx = this._audioCtx;
    if (!ctx) {
      return;
    }
    FORWARD[0] = 0;
    FORWARD[1] = 0;
    FORWARD[2] = -1;
    UP[0] = 0;
    UP[1] = 1;
    UP[2] = 0;
    rotateByQuaternion(FORWARD, rotation);
    rotateByQuaternion(UP, rotation);
    ctx.listener.setPosition(position[0], position[1], position[2]);
    ctx.listener.setOrientation(FORWARD[0], FORWARD[1], FORWARD[2], UP[0], UP[1], UP[2]);
  }

  /**
   * Create a new audio instance, referenced by a unique handle. The handle
   * can be used later to control audio playback and update parameters.
   */
  createAudio(handle: Handle, options: AudioOptions): AudioInstance {
    const audio = new AudioInstance(options);
    this._handles[handle] = audio;
    this.load(options.source);
    return audio;
  }

  /**
   * Create and play a sound whose lifecycle is not externally managed, ideal
   * for one-off sound effects.
   */
  playOneShot(options: AudioOptions) {
    const audio = new AudioInstance({
      ...options,
      autoPlay: true,
    });
    this.load(options.source).then(buffer => {
      if (!this._audioCtx) {
        // must be loaded if load resolved
        throw new Error('Audio Context has not been constructed yet');
      }
      const node = new AudioNode(buffer, this._audioCtx);
      audio.setNode(node);
    });
  }

  /**
   * Play background audio, stopping any previous environmental audio instance.
   * Environmental audio automatically begins playing, and loops when complete.
   * Environment audio is a single global with no handle.
   */
  playEnvironmental(options: AudioOptions) {
    if (this._envInstance) {
      this._envInstance.stop();
    }
    const audio = new AudioInstance({
      ...options,
      autoPlay: true,
      loop: true,
    });
    this.load(options.source).then(buffer => {
      if (!this._audioCtx) {
        // must be loaded if load resolved
        throw new Error('Audio Context has not been constructed yet');
      }
      const node = new AudioNode(buffer, this._audioCtx);
      audio.setNode(node);
    });
    this._envInstance = audio;
  }

  /**
   * Modify the parameters of an existing audio instance, referenced by its
   * unique handle.
   */
  setParams(handle: string, options: AudioPlayOptions) {
    const audio = this._handles[handle];
    if (!audio) {
      return;
    }
    audio.setParams(options);
  }

  /**
   * Update the playback parameters for the current environmental audio, if one
   * exists.
   */
  setEnvironmentalParams(options: AudioPlayOptions) {
    if (!this._envInstance) {
      return;
    }
    this._envInstance.setParams(options);
  }

  /**
   * Begin playing audio, including options for position and other configurable
   * playback parameters
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
      this.load(source).then(buffer => {
        if (!this._audioCtx) {
          // must be loaded if load resolved
          throw new Error('Audio Context has not been constructed yet');
        }
        const node = new AudioNode(buffer, this._audioCtx);
        audio.setNode(node);
        audio.play(options);
      });
    }
  }

  /**
   * Stop playback of an audio instance. Once stopped, audio cannot be restarted
   * and must be re-created instead. To enable resuming playback, use pause()
   * instead.
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

  /**
   * Update all audio instances since the last frame. This is used to update
   * volume levels to correctly fade audio in.
   */
  frame(ms: number) {
    for (const h in this._handles) {
      this._handles[h].frame(ms);
    }
  }
}
