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
import type {VideoPlayerImplementation} from './VideoTypes';
import {type TextureManager} from 'webgl-ui';

type VideoHandle = string;

export default class VideoManager {
  _playerImplementations: Array<VideoPlayerImplementation>;
  _players: {[handle: string]: VideoPlayer};

  constructor(textureManager: TextureManager) {
    this._players = {};
    this._playerImplementations = [];
    // register video hook on texture manager
    textureManager.registerCustomProtocol('video', url => {
      const name = url.replace(/^video:\/\//, '');
      const player = this._players[name];
      if (!player) {
        return null;
      }
      return player.load().then(metadata => metadata.tex);
    });
  }

  createPlayer(handle: VideoHandle) {
    if (this._players[handle]) {
      return this._players[handle];
    }
    const player = new VideoPlayer(this);
    this._players[handle] = player;
    return player;
  }

  getPlayer(handle: VideoHandle): ?VideoPlayer {
    return this._players[handle];
  }

  destroyPlayer(handle: VideoHandle) {
    const player = this._players[handle];
    if (!player) {
      return;
    }
    delete this._players[handle];
    player.destroy();
  }

  registerPlayerImplementation(impl: VideoPlayerImplementation) {
    this._playerImplementations.push(impl);
  }

  createPlayerImplementation(src: string) {
    const ext = src.substr(src.lastIndexOf('.') + 1);
    for (const Impl of this._playerImplementations) {
      // $FlowFixMe - no support for statics
      const supported = Impl.getSupportedFormats();
      if (supported.indexOf(ext) > -1) {
        // $FlowFixMe - can't instantiate an interface
        return new Impl();
      }
    }
    throw new Error(`No registered player supports ${ext} files.`);
  }

  update() {
    for (const handle in this._players) {
      this._players[handle].update();
    }
  }
}
