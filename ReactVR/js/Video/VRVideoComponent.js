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

/**
 * A wrapper of video player, generating textures for video.
 */

import {getVideoPlayer} from './VRVideoPlayer';
import * as THREE from 'three';

import type {Texture} from 'three';

interface VideoPlayer {
  initializeVideo(src: string, metaData: any): void,
  dispose(): void,
  hasEnoughData(): boolean,
}

export type VideoDef = {
  src: string,
  format: ?string,
  metaData: any,
};

export default class VRVideoComponent {
  onMediaEvent: ?(any) => void;
  videoDef: ?VideoDef;
  videoPlayer: ?VideoPlayer;
  videoTextures: Array<Texture>;

  constructor() {
    this.videoPlayer = null;
    this.videoTextures = [];

    this.onMediaEvent = undefined;
    (this: any)._onMediaEvent = this._onMediaEvent.bind(this);
  }

  /**
  * @param videoDef definition of a video to play
  * @param videoDef.src url of video if the streamingType is none
  */
  setVideo(videoDef: VideoDef) {
    this._freeVideoPlayer();
    this._freeTexture();
    this._setVideoDef(videoDef);

    this.videoPlayer = new (getVideoPlayer(this.videoDef))();
    this.videoPlayer.onMediaEvent = this._onMediaEvent;

    const texture = new THREE.Texture(this.videoPlayer.videoElement);
    texture.generateMipmaps = false;
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    // For rectlinear and equirect video, we use same texture for both eye
    this.videoTextures[0] = texture;
    // Uncomment when we support stereo cubemap.
    //this.videoTextures[1] = texture;

    if (this.videoDef) {
      const videoDef = this.videoDef;
      if (this.videoPlayer) {
        this.videoPlayer.initializeVideo(videoDef.src, videoDef.metaData);
      }
    }
  }

  _setVideoDef(videoDef: VideoDef) {
    this.videoDef = {
      src: videoDef.src,
      format: videoDef.format,
      metaData: videoDef.metaData,
    };
  }

  _onMediaEvent(event: any) {
    if (typeof this.onMediaEvent === 'function') {
      this.onMediaEvent(event);
    }
  }

  _freeVideoPlayer() {
    if (this.videoPlayer) {
      this.videoPlayer.dispose();
    }
    this.videoPlayer = null;
  }

  _freeTexture() {
    for (let i = 0; i < this.videoTextures.length; i++) {
      if (this.videoTextures[i]) {
        this.videoTextures[i].dispose();
      }
    }
    this.videoTextures = [];
  }

  frame() {
    if (this.videoPlayer && this.videoPlayer.hasEnoughData()) {
      for (let i = 0; i < this.videoTextures.length; i++) {
        if (this.videoTextures[i]) {
          this.videoTextures[i].needsUpdate = true;
        }
      }
    }
  }

  dispose() {
    this._freeVideoPlayer();
    this._freeTexture();
    this.onMediaEvent = undefined;
  }
}
