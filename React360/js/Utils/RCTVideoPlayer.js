/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import getSupportedFormats from '../Video/getSupportedFormats';

export type PlayStatus = 'closed' | 'loading' | 'error' | 'ended' | 'paused' | 'playing' | 'ready';

/**
 * A internal video player used by video components.
 * RCTVideoPlayer offers the general video logic for video components.
 * @constructor
 * @param {ReactNativeContext} rnctx - React Native Context
 */
export default function RCTVideoPlayer(rnctx, tag) {
  this._rnctx = rnctx;
  this._videoModule = rnctx.VideoModule;
  this._tag = tag;

  this._counter = 0;
  this._handle = null;
  this._PlayStatus = 'closed';

  this._source = null;
  this._poster = null;
  this._playControl = null;
  this._autoPlay = false;
  this._loop = false;
  this._muted = null;
  this._volume = 1.0;

  this.onUpdateTexture = undefined;
  this.onEmitEvent = undefined;
  this._onCanPlay = this._onCanPlay.bind(this);
  this._onPlaying = this._onPlaying.bind(this);
  this._onPause = this._onPause.bind(this);
  this._onEnded = this._onEnded.bind(this);
  this._onError = this._onError.bind(this);
  this._onDurationChange = this._onDurationChange.bind(this);
  this._onTimeUpdate = this._onTimeUpdate.bind(this);
}

RCTVideoPlayer.prototype = Object.assign(Object.create(Object.prototype), {
  constructor: RCTVideoPlayer,

  _updateTexture() {
    const source = this._handle
      ? {
          ...this._source,
          uri: 'MonoTexture://' + this._handle,
        }
      : null;
    this.onUpdateTexture && this.onUpdateTexture(source);
  },

  _updateTextureWithPoster() {
    this.onUpdateTexture && this.onUpdateTexture(this._poster);
  },

  _onCanPlay(handle, event) {
    if (handle !== this._handle) {
      return;
    }
    if (!this._poster) {
      this._updateTexture();
    }
    this._updatePlayStatus('ready');
    // Play video if in auto-play mode, or status is set to 'play'
    if ((this._autoPlay && this._playControl !== 'pause') || this._playControl === 'play') {
      this._videoModule.play(handle);
    }
  },

  _onPlaying() {
    this._updatePlayStatus('playing');
    this._updateTexture();
  },

  _onPause() {
    this._updatePlayStatus('paused');
  },

  _onEnded(handle, event) {
    if (handle !== this._handle) {
      return;
    }
    this._updatePlayStatus('ended');
    // Play video if in loop mode and status not set to 'stop'
    if (this._loop && this._playControl !== 'pause') {
      this._videoModule.play(handle);
    }
    this._emitEvent('topEnded', []);
  },

  _onError(handle, event) {
    if (handle !== this._handle) {
      return;
    }
    this._updatePlayStatus('error');
  },

  _onDurationChange(handle, event) {
    if (handle !== this._handle) {
      return;
    }
    const duration = event.target && event.target.duration;
    if (duration) {
      this._emitEvent('topDurationChange', {duration: duration});
    }
  },

  _onTimeUpdate(handle, event) {
    if (handle !== this._handle) {
      return;
    }
    const currentTime = event.target && event.target.currentTime;
    if (currentTime) {
      this._emitEvent('topTimeUpdate', {currentTime: currentTime});
    }
  },

  _chooseSupportSource(source) {
    if (Array.isArray(source)) {
      for (let i = 0; i < source.length; i++) {
        const sourceInst = source[i];
        if (sourceInst && typeof sourceInst === 'object' && 'uri' in sourceInst) {
          if ('format' in sourceInst) {
            if (getSupportedFormats().indexOf(sourceInst.format) > -1) {
              return sourceInst;
            }
          } else {
            // If the source does not specify its format, we suppose it'll can be chose
            // whatever format is supported.
            return sourceInst;
          }
        }
      }
      // If none of source formats is supported
      if (__DEV__) {
        console.warn('No supported video format found in video source');
      }
      return null;
    } else if (source) {
      return source;
    } else {
      return null;
    }
  },

  setSource(source) {
    const choseSource = this._chooseSupportSource(source);
    const prevUrl = this._source ? this._source.uri : null;
    const curUrl = choseSource ? choseSource.uri : null;
    const curFormat = choseSource ? choseSource.format : null;
    if (source && !curUrl) {
      if (__DEV__) {
        console.warn(
          "Video source must be in format {uri: 'http'} " +
            "or [{uri: 'http', format: 'mp4'}, {uri: 'http', format: 'webm'}, ..]"
        );
      }
    }
    this._source = choseSource;

    // If url change, update handle
    if (prevUrl !== curUrl) {
      // User might have set source to null to remove the video.
      if (!curUrl) {
        const prevHandle = this._handle;
        this._handle = null;
        if (prevHandle) {
          this._updateTexture();
          this._videoModule.unload(prevHandle);
        }
        this._updatePlayStatus('closed');
      } else {
        // Generate unique handle and register it with VideoModule.
        const prevHandle = this._handle;
        this._counter += 1;
        this._handle = [curUrl, this._tag, this._counter].join('-');
        this._videoModule.addHandle(this._handle);
        this._videoModule.setUrl(this._handle, curUrl);
        this._videoModule.setFormat(this._handle, curFormat);
        if (this._source.metaData) {
          this._videoModule.setMetaData(this._handle, this._source.metaData);
        }

        // Load video.
        this._videoModule._addMediaEventListener(this._handle, 'canplay', this._onCanPlay);
        this._videoModule._addMediaEventListener(this._handle, 'playing', this._onPlaying);
        this._videoModule._addMediaEventListener(this._handle, 'pause', this._onPause);
        this._videoModule._addMediaEventListener(this._handle, 'ended', this._onEnded);
        this._videoModule._addMediaEventListener(this._handle, 'error', this._onError);
        this._videoModule._addMediaEventListener(
          this._handle,
          'durationchange',
          this._onDurationChange
        );
        this._videoModule._addMediaEventListener(this._handle, 'timeupdate', this._onTimeUpdate);
        this._videoModule.load(this._handle);
        if (prevHandle) {
          this._videoModule.unload(prevHandle);
        }
        this._updatePlayStatus('loading');
        if (this._poster) {
          this._updateTextureWithPoster();
        }
      }
      this._updateVideoStates();
    }
  },

  setPoster(url) {
    this._poster = url;
    if (this._PlayStatus === 'loading' && this._poster) {
      this._updateTextureWithPoster();
    }
  },

  _emitEvent: function(eventType, args) {
    this.onEmitEvent && this.onEmitEvent(eventType, args);
  },

  _updatePlayStatus: function(status) {
    if (this._PlayStatus !== status) {
      this._PlayStatus = status;
      this._emitEvent('topPlayStatusChange', {playStatus: this._PlayStatus});
    }
  },

  _updateVideoStates: function() {
    if (this._handle) {
      this._videoModule.setMuted(this._handle, this._muted);
      this._videoModule.setVolume(this._handle, this._volume);
    }
  },

  play() {
    if (this._handle) {
      this._videoModule.play(this._handle);
    }
  },

  pause() {
    if (this._handle) {
      this._videoModule.pause(this._handle);
    }
  },

  seekTo(position) {
    this._videoModule.seekTo(this._handle, position);
  },

  setPlayControl(playControl) {
    this._playControl = playControl;
    if (!this._handle) {
      return;
    }

    if (this._playControl === 'pause') {
      this._videoModule.pause(this._handle);
    } else if (this._playControl === 'play') {
      this._videoModule.play(this._handle);
    }
  },

  setAutoPlay(autoPlay) {
    this._autoPlay = autoPlay;
  },

  setLoop(loop) {
    this._loop = loop;
  },

  setMuted(muted) {
    this._muted = muted;
    if (this._handle) {
      this._videoModule.setMuted(this._handle, this._muted);
    }
  },

  setVolume(volume) {
    volume = typeof volume === 'number' ? volume : 1.0;
    this._volume = volume;
    if (this._handle) {
      this._videoModule.setVolume(this._handle, this._volume);
    }
  },

  dispose() {
    if (this._handle) {
      this._videoModule.unload(this._handle);
    }
  },
});
