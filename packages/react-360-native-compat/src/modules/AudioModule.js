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

import type {AudioManager, AudioOptions, AudioPlayOptions, AudioSource, Handle} from 'vr-audio';

interface HasAudioManager {
  audio: AudioManager;
}

export default class AudioModule {
  _audio: AudioManager;

  constructor(container: HasAudioManager) {
    this._audio = container.audio;
  }

  createAudio(handle: Handle, options: AudioOptions) {
    this._audio.createAudio(handle, options);
  }

  playOneShot(options: AudioOptions) {
    this._audio.playOneShot(options);
  }

  playEnvironmental(options: AudioOptions) {
    this._audio.playEnvironmental(options);
  }

  setParams(handle: string, options: AudioPlayOptions) {
    this._audio.setParams(handle, options);
  }

  setEnvironmentalParams(options: AudioPlayOptions) {
    this._audio.setEnvironmentalParams(options);
  }

  play(handle: string, options?: AudioPlayOptions) {
    this._audio.play(handle, options);
  }

  stop(handle: string) {
    this._audio.stop(handle);
  }

  pause(handle: string) {
    this._audio.pause(handle);
  }

  seek(handle: string, time: number) {
    this._audio.seek(handle, time);
  }

  stopEnvironmental() {
    this._audio.stopEnvironmental();
  }

  destroy(handle: string) {
    this._audio.destroy(handle);
  }

  load(source: AudioSource, onReady: () => void) {
    this._audio.load(source).then(() => {
      onReady();
    });
  }

  unload(source: AudioSource) {
    this._audio.unload(source);
  }
}
