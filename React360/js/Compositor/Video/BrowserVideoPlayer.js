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
import type {
  VideoPlayerImplementation,
  VideoPlayerStatus,
  onVideoStatusChangedCallback,
} from './Types';

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
export default class BrowserVideoPlayer implements VideoPlayerImplementation {
  _element: HTMLVideoElement;
  _load: ?Promise<TextureMetadata>;
  _status: VideoPlayerStatus;
  _isBuffering: boolean;
  _playing: boolean;
  _primed: boolean;
  _texture: ?THREE.Texture;
  _eventDispatcher: THREE.EventDispatcher;

  constructor() {
    this._status = 'closed';
    this._isBuffering = false;
    this._playing = false;
    this._primed = false;
    this._element = document.createElement('video');
    this._element.muted = true;
    this._element.style.display = 'none';
    // Prevents the default go to fullscreen behavior on iOS 10+
    this._element.setAttribute('playsinline', 'playsinline');
    this._element.setAttribute('webkit-playsinline', 'webkit-playsinline');
    // Use dummy image for poster to prevent android webview poster image security issue
    this._element.setAttribute(
      'poster',
      'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
    );
    this._element.crossOrigin = 'anonymous';
    this._texture = null;
    if (document.body) {
      document.body.appendChild(this._element);
    }
    this._load = null;

    // media events
    this._eventDispatcher = new THREE.EventDispatcher();
    this._element.addEventListener('seeked', this._onSeeked);
    this._element.addEventListener('ended', this._onEnded);
    this._element.addEventListener('waiting', this._onWaiting);
    this._element.addEventListener('playing', this._onPlaying);
    this._element.addEventListener('timeupdate', this._onTimeupdate);
    this._element.addEventListener('pause', this._onPause);
  }

  _updateStatus(newStatus: VideoPlayerStatus, error: ?string, forceReport: boolean = false) {
    if (forceReport || newStatus !== this._status) {
      this._status = newStatus;
      this._eventDispatcher.dispatchEvent({
        type: 'status',
        duration: this._element.duration,
        isBuffering: this._isBuffering,
        error: error,
        isMuted: this._element.muted,
        position: this._element.currentTime,
        status: this._status,
        volume: this._element.volume,
      });
    }
  }

  _onEnded = () => {
    this._playing = false;
    this._updateStatus('finished');
  };

  _onSeeked = () => {
    this._isBuffering = false;
    if (this._status === 'seeking') {
      if (this._playing) {
        this._updateStatus('playing');
      } else {
        this._updateStatus('ready');
      }
    }
  };

  _onWaiting = () => {
    if (!this._isBuffering) {
      this._isBuffering = true;
      this._updateStatus(this._status, undefined, true);
    }
  };

  _onPlaying = () => {
    if (this._isBuffering) {
      this._isBuffering = false;
      this._updateStatus(this._status, undefined, true);
    }
  };

  _onTimeupdate = () => {
    if (this._playing) {
      this._updateStatus(this._status, undefined, true);
    }
  };

  _onPause = () => {
    if (this._playing) {
      this._playing = false;
      this._updateStatus('paused');
    }
  };

  setSource(src: string, stereoFormat: string, fileFormat: string, layout?: string) {
    if (this._texture) {
      this._texture.dispose();
    }
    this._element.src = src;
    this._element.load();
    this._isBuffering = true;
    this._updateStatus('closed', undefined, true);
    this._load = new Promise((resolve, reject) => {
      let closed = false;
      this._element.addEventListener('canplay', () => {
        if (closed) {
          return;
        }
        this._isBuffering = false;
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
        this._updateStatus('ready');
        resolve({
          format: stereoFormat || '2D',
          layout: layout || 'RECT',
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
        this._isBuffering = false;
        closed = true;
        const error = this._element.error;
        const errorStr = error ? error.message : 'Unknown media error';
        this._updateStatus('failed', errorStr);
        reject(new Error(errorStr));
      });
    });
  }

  load(): Promise<TextureMetadata> {
    return this._load || Promise.reject(new Error('No source set'));
  }

  update() {
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
    this._element
      .play()
      .then(() => {
        this._playing = true;
        this._updateStatus('playing');
      })
      .catch((e: Error) => {
        console.error(`BrowserVideoPlayer: get error "${e.toString()}" when calling play().`);
        this._updateStatus(this._status, e.toString(), true);
      });
  }

  pause() {
    this._element.pause();
    this._playing = false;
    this._updateStatus('paused');
  }

  seekTo(position: number) {
    this._element.currentTime = position;
    this._isBuffering = true;
    this._updateStatus('seeking');
  }

  addEventListener(event: string, listener: onVideoStatusChangedCallback) {
    this._eventDispatcher.addEventListener(event, listener);
  }

  removeEventListener(event: string, listener: onVideoStatusChangedCallback) {
    this._eventDispatcher.removeEventListener(event, listener);
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
