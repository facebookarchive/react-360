/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

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
 * @class RCTVideoModule
 * @extends Module
 */

import {getCustomizedSupportedFormats} from '../Video/VRVideoPlayer';
import VRVideoComponent from '../Video/VRVideoComponent';
import Module from './Module';
import MediaEvent from '../Events/MediaEvent';

import type {ReactNativeContext} from '../ReactNativeContext';
import type {VideoDef} from '../Video/VRVideoComponent';

const MEDIA_EVENT_CALLBACK_NAME = {
  canplay: 'onVideoCanPlay',
  durationchange: 'onVideoDurationChange',
  ended: 'onVideoEnded',
  error: 'onVideoError',
  timeupdate: 'onVideoTimeUpdate',
  playing: 'onVideoPlaying',
  pause: 'onVideoPause',
};

export default class RCTVideoModule extends Module {
  _videoDefs: {[handle: string]: VideoDef};
  _components: {[handle: string]: VRVideoComponent};
  _rnctx: ReactNativeContext;

  constructor(rnctx: ReactNativeContext) {
    super('RCTVideoModule');
    this.supportedFormats = getCustomizedSupportedFormats() || [];
    this._videoDefs = {};
    this._players = {};
    this._rnctx = rnctx;
    this._mediaEventCallbacks = {};
  }

  /**
   * Add a new handle to the video module
   * @param {string} handle - The video handle.
   */
  addHandle(handle: string) {
    const player = new VRVideoComponent();
    this._players[handle] = player;
    this._videoDefs[handle] = this._createVideoDef();
    this._mediaEventCallbacks[handle] = {};
    player.onMediaEvent = this._onMediaEvent.bind(this, handle);
  }

  _createVideoDef(): VideoDef {
    return {};
  }

  _onMediaEvent(handle: string, event: Object) {
    const eventType = event.type;
    if (MEDIA_EVENT_CALLBACK_NAME[eventType]) {
      const callbackName = MEDIA_EVENT_CALLBACK_NAME[eventType];
      const mediaEvent = new MediaEvent(event);
      // Emit media event to react
      this._rnctx.callFunction('RCTDeviceEventEmitter', 'emit', [callbackName, handle, mediaEvent]);

      // Emit media event to native side
      const listeners = this._mediaEventCallbacks[handle]
        ? this._mediaEventCallbacks[handle][eventType]
        : null;
      if (listeners) {
        listeners.forEach(listener => listener(handle, mediaEvent));
      }
    }
  }

  // Add listener to media events on native side
  _addMediaEventListener(handle: string, eventType: string, listener: any) {
    if (!this._mediaEventCallbacks[handle]) {
      console.warn(
        'RCTVideoModule.addMediaEventListener: ' +
          `can't add listener on a not exist handle: ${handle}`
      );
      return;
    }

    if (!MEDIA_EVENT_CALLBACK_NAME[eventType]) {
      console.warn(
        'RCTVideoModule.addMediaEventListener: ' +
          `can't add listener on a not supported eventType: ${eventType}`
      );
      return;
    }

    if (!this._mediaEventCallbacks[handle][eventType]) {
      this._mediaEventCallbacks[handle][eventType] = [];
    }

    const listeners = this._mediaEventCallbacks[handle][eventType];
    if (listeners.indexOf(listener) === -1) {
      listeners.push(listener);
    }
  }

  // Remove listener to media events on native side
  _removeMediaEventListener(handle: string, eventType: string, listener: any) {
    if (!this._mediaEventCallbacks[handle] || !this._mediaEventCallbacks[handle][eventType]) {
      return;
    }
    const listeners = this._mediaEventCallbacks[handle][eventType];
    if (listeners) {
      const index = listeners.indexOf(listener);
      if (index !== -1) {
        listeners.splice(index, 1);
      }
    }
  }

  /**
   * Set the video url
   * @param {string} handle - The video handle.
   */
  setUrl(handle: string, url: string) {
    this._videoDefs[handle].src = url;
  }

  /**
   * Set the video format
   * @param {string} handle - The video handle.
   * @param {string} format - The video format.
   */
  setFormat(handle: string, format: string) {
    this._videoDefs[handle].format = format;
  }

  /**
   * Set video metaData to video player, this can be used for
   * customized video player
   * @param {string} handle - The video handle.
   * @param {any} metaData - The video metaData.
   */
  setMetaData(handle: string, metaData: any) {
    this._videoDefs[handle].metaData = metaData;
  }

  getVideoTexture(handle: string) {
    if (!handle) {
      // Video was removed.
      return null;
    }
    const player = this._players[handle];
    return player.videoTextures[0];
  }

  /**
   * load the video
   * @param {string} handle - The video handle.
   */
  load(handle: string) {
    this._players[handle].setVideo(this._videoDefs[handle]);

    // Add resource to mono texture
    const monoTextureInfo = {
      type: 'MonoTextureInfo',
      texture: this._players[handle].videoTextures[0],
    };
    this._rnctx.RCTResourceManager.addResource('MonoTexture', handle, monoTextureInfo);
  }

  /**
   * play the video
   * @param {string} handle - The video handle.
   */
  play(handle: string) {
    this._players[handle].videoPlayer.play();
  }

  /**
   * pause the video
   * @param {string} handle - The video handle.
   */
  pause(handle: string) {
    this._players[handle].videoPlayer.pause();
  }

  /**
   * seek to a position in a video
   * @param {string} handle - The video handle.
   * @param {number} position - The video position to seek to
   */
  seekTo(handle: string, position: number) {
    this._players[handle].videoPlayer.seekTo(position);
  }

  /**
   * Set the muted attributed of the video
   * @param {string} handle - The video handle.
   * @param {boolean} muted - Whether the video's audio should be muted.
   */
  setMuted(handle: string, muted: boolean) {
    this._players[handle].videoPlayer.setMuted(muted);
  }

  /**
   * Set the volume of the video
   * @param {string} handle - The video handle.
   * @param {number} volume - The video volume.
   */
  setVolume(handle: string, volume: number) {
    this._players[handle].videoPlayer.setVolume(volume);
  }

  /**
   * unload the video and dispose of any resources.
   * @param {string} handle - The video handle.
   */
  unload(handle: string) {
    this._rnctx.RCTResourceManager.removeResource('MonoTexture', handle);
    this._players[handle].dispose();
    delete this._players[handle];
    delete this._videoDefs[handle];
    delete this._mediaEventCallbacks[handle];
  }

  frame() {
    for (const key in this._players) {
      this._players[key].frame();
    }
  }
}
