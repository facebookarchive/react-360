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

import {getDefaultVideoPlayer} from './VRVideoPlayer';
import * as THREE from 'three';

import type {Texture, Vector4} from 'three';

interface VideoPlayer {
  initializeVideo(src: string): void,
  dispose(): void,
  hasEnoughData(): boolean,
}

type StereoType = 'none';

export type VideoDef = {
  stereoType: StereoType,
  src: string,
  metaData: any,
};

// offsetRepeats: uv rect of video textures, one for each eye.
const monoOffsetRepeats = [new THREE.Vector4(0, 0, 1, 1), new THREE.Vector4(0, 0, 1, 1)];
const horizontalOffsetRepeats = [
  new THREE.Vector4(0, 0.5, 1, 0.5),
  new THREE.Vector4(0, 0, 1, 0.5),
];
const verticalOffsetRepeats = [new THREE.Vector4(0, 0, 0.5, 1), new THREE.Vector4(0.5, 0, 0.5, 1)];

export default class VRVideoComponent {
  onMediaEvent: ?(any) => void;
  offsetRepeats: [] | [Vector4, Vector4];
  videoDef: ?VideoDef;
  videoPlayer: ?VideoPlayer;
  videoTextures: Array<Texture>;

  constructor() {
    this.videoPlayer = null;
    this.videoTextures = [];
    this.offsetRepeats = [];

    this.onMediaEvent = undefined;
    (this: any)._onMediaEvent = this._onMediaEvent.bind(this);
  }

  /**
  * @param videoDef defination of a video to play
  * @param videoDef.src url of video if the streamingType is none
  * @param videoDef.stereoType the type of spliting video to stereo texture, can be none/horizontal/vertical
  */
  setVideo(videoDef: VideoDef) {
    this._freeVideoPlayer();
    this._freeTexture();
    this._setVideoDef(videoDef);

    this.videoPlayer = new (getDefaultVideoPlayer())();
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
      if (videoDef.stereoType === 'horizontal') {
        this.offsetRepeats = horizontalOffsetRepeats;
      } else if (videoDef.stereoType === 'vertical') {
        this.offsetRepeats = verticalOffsetRepeats;
      } else {
        this.offsetRepeats = monoOffsetRepeats;
      }
      if (this.videoPlayer) {
        this.videoPlayer.initializeVideo(videoDef.src, videoDef.metaData);
      }
    }
  }

  _setVideoDef(videoDef: VideoDef) {
    this.videoDef = {
      src: videoDef.src,
      stereoType: videoDef.stereoType,
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
