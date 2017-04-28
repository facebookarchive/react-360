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

import BasicVideoPlayer from './BasicVideoPlayer';
import getSupportedFormats from './getSupportedFormats';

import type {VideoDef} from './VRVideoComponent';

const _customizedVideoPlayers: Array<Class<BasicVideoPlayer>> = [];
let _customizedSupportCache: ?Array<string> = null;

/**
 * Get current video player
 */
export function getVideoPlayer(videDef: ?VideoDef): Class<BasicVideoPlayer> {
  for (let i = 0; i < _customizedVideoPlayers.length; i++) {
    const player = _customizedVideoPlayers[i];
    const format = videDef ? videDef.format : null;
    // Here we use == to compare to both null and undefined
    if (
      player.supportedFormats == null ||
      format == null ||
      player.supportedFormats.indexOf(format) > -1
    ) {
      return player;
    }
  }
  return BasicVideoPlayer;
}

/**
 * Add a customized video player. A customized video player should extends BasicVideoPlayer.
 */
export function addCustomizedVideoPlayer(player: Class<BasicVideoPlayer>) {
  _customizedVideoPlayers.push(player);
}

export function getCustomizedSupportedFormats(): Array<string> {
  if (_customizedSupportCache) {
    return _customizedSupportCache;
  }
  _customizedSupportCache = getSupportedFormats();
  for (let i = 0; i < _customizedVideoPlayers.length; i++) {
    const player = _customizedVideoPlayers[i];
    if (player.supportedFormats) {
      const supportedFormats = player.supportedFormats;
      for (let j = 0; j < supportedFormats.length; j++) {
        if (_customizedSupportCache.indexOf(supportedFormats[j]) < 0) {
          _customizedSupportCache.push(supportedFormats[j]);
        }
      }
    }
  }
  return _customizedSupportCache;
}
