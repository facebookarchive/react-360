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

import * as THREE from 'three';

import type {TextureMetadata} from '../Environment/Types';
import type {VideoPlayer} from './Types';

const FORMATS = {
  ogg: 'video/ogg; codecs="theora, vorbis"',
  mp4: 'video/mp4; codecs="avc1.4D401E, mp4a.40.2"',
  mkv: 'video/x-matroska; codecs="theora, vorbis"',
  webm: 'video/webm; codecs="vp8, vorbis"',
};

let supportCache = null;
function fillSupportCache() {
  const video = document.createElement('video');
  supportCache = [];
  for (const type in FORMATS) {
    const canPlay = video.canPlayType(FORMATS[type]);
    if (canPlay.length && canPlay !== 'no') {
      supportCache.push(type);
    }
  }
}

/**
 * Implements a video player interface using the browser's native video
 * playback abilities.
 */
export default class BrowserVideoPlayer implements VideoPlayer {
  _element: HTMLVideoElement;
  _load: ?Promise<TextureMetadata>;
  _playing: boolean;
  _primed: boolean;
  _texture: ?THREE.Texture;

  constructor() {
    this._playing = false;
    this._primed = false;
    this._element = document.createElement('video');
    this._element.muted = true;
    this._element.style.display = 'none';
    // Prevents the default go to fullscreen behavior on iOS 10+
    this._element.setAttribute('playsinline', 'playsinline');
    this._element.setAttribute('webkit-playsinline', 'webkit-playsinline');
    this._element.crossOrigin = 'anonymous';
    this._texture = null;
    if (document.body) {
      document.body.appendChild(this._element);
    }
    this._load = null;

    this._element.addEventListener('ended', this._onEnded);
  }

  _onEnded = () => {
    this._playing = false;
  };

  setSource(src: string, format?: string) {
    if (this._texture) {
      this._texture.dispose();
    }
    this._element.src = src;
    this._element.load();
    this._load = new Promise((resolve, reject) => {
      let closed = false;
      this._element.addEventListener('canplay', () => {
        if (closed) {
          return;
        }
        closed = true;
        const width = this._element.videoWidth;
        const height = this._element.videoHeight;
        const tex = new THREE.Texture(this._element);
        tex.generateMipmaps = false;
        tex.wrapS = THREE.ClampToEdgeWrapping;
        tex.wrapT = THREE.ClampToEdgeWrapping;
        tex.minFilter = THREE.LinearFilter;
        tex.magFilter = THREE.LinearFilter;
        this._texture = tex;
        resolve({
          format: format || '2D',
          height,
          src,
          tex,
          width,
        });
      });
      this._element.addEventListener('error', () => {
        if (closed) {
          return;
        }
        closed = true;
        const error = this._element.error;
        reject(new Error(error ? error.message : 'Unknown media error'));
      });
    });
  }

  load(): Promise<TextureMetadata> {
    return this._load || Promise.reject(new Error('No source set'));
  }

  refreshTexture() {
    if (this._texture && this._playing) {
      this._texture.needsUpdate = true;
    }
  }

  setVolume(vol: number) {
    this._element.volume = Math.max(0, Math.min(vol, 1));
  }

  setMuted(muted: boolean) {
    this._element.muted = muted;
  }

  setLoop(loop: boolean) {
    this._element.loop = true;
  }

  play() {
    this._playing = true;
    this._element.play();
  }

  pause() {
    this._playing = false;
    return this._element.pause();
  }

  seekTo(position: number) {
    this._element.currentTime = position;
  }

  destroy() {
    this.pause();
    if (this._element.parentNode) {
      this._element.parentNode.removeChild(this._element);
    }
    if (this._texture) {
      this._texture.dispose();
    }
    this._element.src = '';
  }

  static getSupportedFormats(): Array<string> {
    if (!supportCache) {
      fillSupportCache();
    }
    return supportCache || [];
  }
}
