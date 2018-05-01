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

import BrowserVideoPlayer from './BrowserVideoPlayer';
import type {VideoPlayer} from './Types';

/**
 * Simple utility class for organizing Video Players by their handle
 */
export default class VideoPlayerManager {
  _players: {[handle: string]: VideoPlayer};

  constructor() {
    this._players = {};
  }

  createPlayer(handle: string) {
    if (this._players[handle]) {
      return this._players[handle];
    }
    const player = new BrowserVideoPlayer();
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
      this._players[handle].refreshTexture();
    }
  }
}
