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

import type VideoManager from './VideoManager';
import type {TextureMetadata, VideoPlayerImplementation} from './VideoTypes';

/**
 * VideoPlayer is a shallow layer that defers
 * The lifetime of a player is separate from the content it plays, so we may
 * need to dynamically select or swap out the implementation behind the player.
 */
export default class VideoPlayer {
  _impl: ?VideoPlayerImplementation;
  _manager: VideoManager;
  _load: Promise<TextureMetadata>;
  _resolveImplementation: TextureMetadata => void;

  constructor(manager: VideoManager) {
    this._impl = null;
    this._manager = manager;
    this._load = new Promise(resolve => {
      this._resolveImplementation = resolve;
    });
  }

  destroy() {
    if (!this._impl) {
      return;
    }
    this._impl.destroy();
  }

  load(): Promise<TextureMetadata> {
    return this._load;
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

  setSource(url: string, format?: string) {
    // From extension, try to determine player
    const impl = this._manager.createPlayerImplementation(url);
    this._impl = impl;
    impl.setSource(url, format);
    impl.load().then(tex => {
      this._resolveImplementation(tex);
    });
  }

  setVolume(vol: number) {
    if (!this._impl) {
      return;
    }
    this._impl.setVolume(Math.max(0, Math.min(vol, 1)));
  }
}
