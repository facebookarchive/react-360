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

import {
  type VideoOptions,
  type VideoPlayOptions,
  type VideoPlayer,
} from '../Compositor/Video/Types';
import type VideoPlayerManager from '../Compositor/Video/VideoPlayerManager';
import Module from './Module';

export default class VideoModule extends Module {
  allowCreatePlayer: boolean;
  _videoPlayers: VideoPlayerManager;

  constructor(videoPlayers: VideoPlayerManager) {
    super('VideoModule');

    this._videoPlayers = videoPlayers;

    this.allowCreatePlayer = true;
  }

  _applyParams(player: VideoPlayer, params: VideoPlayOptions) {
    if (params.muted !== undefined) {
      player.setMuted(!!params.muted);
    }
    if (params.volume !== undefined) {
      player.setVolume(params.volume);
    }
  }

  createPlayer(handle: string) {
    this._videoPlayers.createPlayer(handle);
  }

  destroyPlayer(handle: string) {
    this._videoPlayers.destroyPlayer(handle);
  }

  play(handle: string, options: VideoOptions) {
    const player = this._videoPlayers.getPlayer(handle);
    if (!player) {
      return;
    }
    const {source, ...params} = options;
    let url = null;
    if (Array.isArray(source)) {
      url = source[0].url;
      const supported = (player.constructor: any).getSupportedFormats();
      for (let i = 0; i < source.length; i++) {
        const sourceOption = source[i];
        const format =
          sourceOption.fileFormat ||
          sourceOption.url.substr(sourceOption.url.lastIndexOf('.'));
        if (supported.indexOf(format) > 0) {
          url = sourceOption.url;
          break;
        }
      }
    } else {
      url = source.url;
    }
    if (!url) {
      throw new Error('Cannot play video, unsupported format');
    }
    this._applyParams(player, params);
    const format = params.stereo || '2D';
    player.setSource(url, format);
    player.load().then(() => player.play());
  }

  pause(handle: string) {
    const player = this._videoPlayers.getPlayer(handle);
    if (!player) {
      return;
    }
    player.pause();
  }

  resume(handle: string) {
    const player = this._videoPlayers.getPlayer(handle);
    if (!player) {
      return;
    }
    player.play();
  }

  stop(handle: string) {
    const player = this._videoPlayers.getPlayer(handle);
    if (!player) {
      return;
    }
    player.pause();
    player.seekTo(0);
  }

  seek(handle: string, timeMs: number) {
    const player = this._videoPlayers.getPlayer(handle);
    if (!player) {
      return;
    }
    player.seekTo(timeMs);
  }

  setParams(handle: string, options: VideoPlayOptions) {
    const player = this._videoPlayers.getPlayer(handle);
    if (!player) {
      return;
    }
    this._applyParams(player, options);
  }
}
