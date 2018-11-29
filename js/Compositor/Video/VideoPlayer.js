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

import * as THREE from 'three';
import type VideoPlayerManager from './VideoPlayerManager';
import type {VideoPlayerImplementation, onVideoStatusChangedCallback} from './Types';
import type {TextureMetadata} from '../Environment/Types';

/**
 * VideoPlayer is a shallow layer that defers
 * The lifetime of a player is separate from the content it plays, so we may
 * need to dynamically select or swap out the implementation behind the player.
 */
export default class VideoPlayer {
  _impl: ?VideoPlayerImplementation;
  _manager: VideoPlayerManager;
  _load: ?Promise<TextureMetadata>;
  _eventDispatcher: THREE.EventDispatcher;

  constructor(manager: VideoPlayerManager) {
    this._impl = null;
    this._manager = manager;
    this._load = null;
    this._eventDispatcher = new THREE.EventDispatcher();
  }

  destroy() {
    if (!this._impl) {
      return;
    }
    this._impl.destroy();
  }

  load(): Promise<TextureMetadata> {
    return this._load || Promise.reject(new Error('No source set'));
  }

  pause() {
    if (!this._impl) {
      return;
    }
    this._impl.pause();
  }

  play() {
    if (!this._impl) {
      return;
    }
    this._impl.play();
  }

  update() {
    if (!this._impl) {
      return;
    }
    this._impl.update();
  }

  seekTo(position: number) {
    if (!this._impl) {
      return;
    }
    this._impl.seekTo(position);
  }

  setLoop(loop: boolean) {
    if (!this._impl) {
      return;
    }
    this._impl.setLoop(loop);
  }

  setMuted(muted: boolean) {
    if (!this._impl) {
      return;
    }
    this._impl.setMuted(muted);
  }

  setSource(url: string, stereoformat: string, fileFormat: string, layout?: string) {
    if (this._impl) {
      this._impl.destroy();
    }
    const impl = this._manager.createPlayerImplementation(fileFormat);
    this._impl = impl;
    impl.addEventListener('status', (event: Object) => {
      this._onVideoEvents(event);
    });
    impl.setSource(url, stereoformat, fileFormat, layout);
    this._load = impl.load();
  }

  setVolume(vol: number) {
    if (!this._impl) {
      return;
    }
    this._impl.setVolume(Math.max(0, Math.min(vol, 1)));
  }

  addEventListener(event: string, listener: onVideoStatusChangedCallback) {
    this._eventDispatcher.addEventListener(event, listener);
  }

  removeEventListener(event: string, listener: onVideoStatusChangedCallback) {
    this._eventDispatcher.removeEventListener(event, listener);
  }

  _onVideoEvents(event: Object) {
    this._eventDispatcher.dispatchEvent(event);
  }
}
