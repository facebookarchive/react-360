/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */ 

import BasicVideoPlayer from './BasicVideoPlayer';

let _defaultVideoPlayer = BasicVideoPlayer;

/**
 * Get current video player
 */
export function getDefaultVideoPlayer() {
  return _defaultVideoPlayer;
}

/**
 * Set customized video player. A customized video player should extends BasicVideoPlayer.
 */
export function setCustomizedVideoPlayer(player) {
  if (!player) {
    _defaultVideoPlayer = BasicVideoPlayer;
  } else {
    _defaultVideoPlayer = player;
  }
}