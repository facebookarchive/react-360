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

const MEDIA_EVENT_TYPES = [
  'canplay',
  'durationchange',
  'ended',
  'error',
  'timeupdate',
  'pause',
  'playing',
];

/**
 * The basic video player
 */
export default class BasicVideoPlayer {
  onMediaEvent: ?(any) => void;
  videoElement: HTMLVideoElement;
  _muted: boolean;
  _volume: number;

  /**
   * Subclasses may use this property to define the video format
   * the video player supports. e.g. If a video player defined
   * `supportedFormats = ['mp4']`, when playing a .webm format video,
   * VRVideoComponent will fall back to use other video player.
   */
  static supportedFormats: ?Array<string> = null;

  constructor() {
    this.videoElement = document.createElement('video');
    this.videoElement.style.display = 'none';

    // Prevents the default go to fullscreen behavior on iOS 10+
    this.videoElement.setAttribute('playsinline', 'playsinline');
    this.videoElement.setAttribute('webkit-playsinline', 'webkit-playsinline');

    if (document.body) {
      document.body.appendChild(this.videoElement);
    }

    this._volume = 1.0;
    this._muted = false;

    this.onMediaEvent = undefined;
    (this: any)._onMediaEvent = this._onMediaEvent.bind(this);
  }

  initializeVideo(src: string, metaData: any) {
    this.videoElement.src = src;
    this.videoElement.crossOrigin = 'anonymous';
    this._bindMediaEvents();
    this.videoElement.load();
  }

  hasEnoughData(): boolean {
    return (
      !!this.videoElement && this.videoElement.readyState === this.videoElement.HAVE_ENOUGH_DATA
    );
  }

  _bindMediaEvents() {
    MEDIA_EVENT_TYPES.forEach(eventType => {
      this.videoElement.addEventListener(eventType, this._onMediaEvent);
    });
  }

  _unbindMediaEvents() {
    MEDIA_EVENT_TYPES.forEach(eventType => {
      this.videoElement.removeEventListener(eventType, this._onMediaEvent);
    });
  }

  _onMediaEvent(event: any) {
    if (typeof this.onMediaEvent === 'function') {
      this.onMediaEvent(event);
    }
  }

  setVolume(volume: number) {
    this.videoElement.volume = volume;
  }

  setMuted(muted: boolean) {
    this.videoElement.muted = muted;
  }

  play() {
    this.videoElement.play();
  }

  pause() {
    this.videoElement.pause();
  }

  seekTo(position: number) {
    this.videoElement.currentTime = position;
  }

  dispose() {
    this.pause();
    if (document.body) {
      document.body.removeChild(this.videoElement);
    }
    this.videoElement.src = '';
    this._unbindMediaEvents();
    this.onMediaEvent = undefined;
  }
}
