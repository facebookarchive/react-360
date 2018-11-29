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

import VideoPlayer from './VideoPlayer';
import type {VideoPlayerImplementation} from './Types';

/**
 * Simple utility class for organizing Video Players by their handle
 */
export default class VideoPlayerManager {
  _players: {[handle: string]: VideoPlayer};
  _playerImplementations: Array<Class<VideoPlayerImplementation>>;
  _supportCache: ?Array<string> = null;

  constructor() {
    this._players = {};
    this._playerImplementations = [];
  }

  createPlayer(handle: string) {
    if (this._players[handle]) {
      return this._players[handle];
    }
    const player = new VideoPlayer(this);
    this._players[handle] = player;
    return player;
  }

  getPlayer(handle: string): ?VideoPlayer {
    return this._players[handle];
  }

  destroyPlayer(handle: string) {
    const player = this._players[handle];
    if (!player) {
      return;
    }
    delete this._players[handle];
    player.destroy();
  }

  frame() {
    for (const handle in this._players) {
      this._players[handle].update();
    }
  }

  registerPlayerImplementation(impl: Class<VideoPlayerImplementation>) {
    this._playerImplementations.push(impl);
  }

  createPlayerImplementation(format: string) {
    for (const Impl of this._playerImplementations) {
      // $FlowFixMe - no support for statics
      const supported = Impl.getSupportedFormats();
      if (supported.indexOf(format) > -1) {
        // $FlowFixMe - can't instantiate an interface
        return new Impl();
      }
    }
    throw new Error(`No registered player supports ${format} files.`);
  }

  getSupportedFormats() {
    if (this._supportCache != null) {
      return this._supportCache;
    }

    const supportCache = [];
    for (const Impl of this._playerImplementations) {
      // $FlowFixMe - no support for statics
      const supported = Impl.getSupportedFormats();
      for (const format of supported) {
        if (supportCache.indexOf(format) < 0) {
          supportCache.push(format);
        }
      }
    }
    this._supportCache = supportCache;
    return supportCache;
  }
}
