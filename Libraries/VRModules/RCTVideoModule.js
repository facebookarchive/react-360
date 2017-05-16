/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule VideoModule
 * @flow
 */

'use strict';

const RCTVideoModule = require('NativeModules').VideoModule;

/**
 * Implements basic video playback.
 * Example usage:
 * ```
 * videoModule.addHandle(handle);
 * videoModule.setUrl(handle, url);
 * videoModule._setOnVideoReadyCallback(handle, function() {
 *   videoModule.play(handle);
 * });
 * videoModule.load(handle);
 * ```
 */
class VideoModule {
  /**
   * Add a new handle to the video module
   * @param {string} handle - The video handle.
   */
  addHandle(handle: string) {
    RCTVideoModule.addHandle(handle);
  }

  /**
   * Set the video url
   * @param {string} handle - The video handle.
   */
  setUrl(handle: string, url: string) {
    RCTVideoModule.setUrl(handle, url);
  }

  /**
   * Set the video format
   * @param {string} handle - The video handle.
   * @param {string} format - The video format.
   */
  setFormat(handle: string, format: string) {
    RCTVideoModule.setFormat(handle, format);
  }

  /**
   * Set video metaData to video player, this can be used for
   * customized video player
   * @param {string} handle - The video handle.
   * @param {any} metaData - The video metaData.
   */
  setMetaData(handle: string, metaData: any) {
    RCTVideoModule.setMetaData(handle, metaData);
  }

  /**
   * load the video
   * @param {string} handle - The video handle.
   */
  load(handle: string) {
    RCTVideoModule.load(handle);
  }

  /**
   * play the video
   * @param {string} handle - The video handle.
   */
  play(handle: string) {
    RCTVideoModule.play(handle);
  }

  /**
   * pause the video
   * @param {string} handle - The video handle.
   */
  pause(handle: string) {
    RCTVideoModule.pause(handle);
  }

  /**
   * seek to a position in a video
   * @param {string} handle - The video handle.
   * @param {number} position - The video position to seek to
   */
  seekTo(handle: string, position: number) {
    RCTVideoModule.seekTo(handle, position);
  }

  /**
   * Set the muted attributed of the video
   * @param {string} handle - The video handle.
   * @param {boolean} muted - Whether the video's audio should be muted.
   */
  setMuted(handle: string, muted: boolean) {
    RCTVideoModule.setMuted(handle, muted);
  }

  /**
   * Set the volume of the video
   * @param {string} handle - The video handle.
   * @param {number} volume - The video volume.
   */
  setVolume(handle: string, volume: number) {
    RCTVideoModule.setVolume(handle, volume);
  }

  /**
   * unload the video and dispose of any resources.
   * @param {string} handle - The video handle.
   */
  unload(handle: string) {
    RCTVideoModule.unload(handle);
  }
}

const VideoModuleInst = new VideoModule();
module.exports = VideoModuleInst;
