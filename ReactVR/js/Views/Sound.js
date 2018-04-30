/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

/**
 * Defines RCTSound "derived" from RTCBaseView.
 * Assigns 'this.view' to OVRUI.UIView(guiSys),
 * @class RCTSound
 * @extends RCTBaseView
 */

import getSupportedFormats from '../Audio/getSupportedFormats';
import UIView from '../OVRUI/UIView/UIView';
import extractURL from '../Utils/extractURL';
import merge from '../Utils/merge';
import RCTBaseView from './BaseView';

export type PlayStatus =
  | 'closed'
  | 'loading'
  | 'error'
  | 'ended'
  | 'paused'
  | 'playing'
  | 'ready';

const COMMAND_SEEK_TO = 1;
const COMMAND_PLAY = 2;
const COMMAND_PAUSE = 3;

export default class RCTSound extends RCTBaseView {
  /**
   * constructor: allocates the required resources and sets defaults
   */
  constructor(guiSys, rnctx) {
    super();
    this.view = new UIView(guiSys);
    this._rnctx = rnctx;
    this._audioModule = rnctx.AudioModule;
    this._counter = 0;
    this._handle = null;
    this._playStatus = 'closed';
    this._onCanPlay = this._onCanPlay.bind(this);
    this._onPlaying = this._onPlaying.bind(this);
    this._onPause = this._onPause.bind(this);
    this._onEnded = this._onEnded.bind(this);
    this._onError = this._onError.bind(this);
    this._onDurationChange = this._onDurationChange.bind(this);
    this._onTimeUpdate = this._onTimeUpdate.bind(this);

    Object.defineProperty(this.props, 'autoPlay', {
      set: value => {
        this.props._autoPlay = value;
      },
    });

    Object.defineProperty(this.props, 'volume', {
      set: value => {
        if (value < 0) {
          // Use 0 as our minimum volume value, although a WebAudio GainNode
          // gain value can be set to negative for phase inversion.
          if (__DEV__) {
            console.warn('<Sound> volume cannot be negative:', value);
          }
          return;
        }
        this.props._volume = value;
        if (this._handle) {
          this._audioModule.setVolume(this._handle, this.props._volume);
        }
      },
    });

    Object.defineProperty(this.props, 'muted', {
      set: value => {
        this.props._muted = value;
        if (this._handle) {
          this._audioModule.setMuted(this._handle, this.props._muted);
        }
      },
    });

    Object.defineProperty(this.props, 'loop', {
      set: value => {
        this.props._loop = value;
      },
    });

    Object.defineProperty(this.props, 'playControl', {
      set: value => {
        this.props._playControl = value;

        if (!this._handle) {
          return;
        }

        if (this.props._playControl === 'stop') {
          this._audioModule.stop(this._handle);
        } else if (this.props._playControl === 'pause') {
          this._audioModule.pause(this._handle);
        } else if (this.props._playControl === 'play') {
          this._audioModule.play(this._handle);
        }
      },
    });

    Object.defineProperty(this.props, 'source', {
      set: value => {
        let url = null;
        if (value && typeof value === 'object' && !('uri' in value)) {
          let format = null;
          for (const key in value) {
            if (getSupportedFormats().indexOf(key) > -1) {
              format = key;
              url = extractURL(value[key]);
              break;
            }
          }

          if (!format) {
            if (__DEV__) {
              console.warn('No supported audio format found in <Sound> source');
            }
            return;
          }
          if (!url) {
            if (__DEV__) {
              console.warn(
                '<Sound> source format values must be in the form {uri: "..."}',
              );
            }
            return;
          }
        } else if (value) {
          url = extractURL(value);
          if (!url) {
            if (__DEV__) {
              console.warn('<Sound> source must be in format {uri: "..."}');
            }
            return;
          }
        }
        this.props._source = value;

        // User might have set source to null to remove the audio.
        if (!this.props._source) {
          const prevHandle = this._handle;
          this._handle = null;
          if (prevHandle) {
            this._audioModule.unload(prevHandle);
          }
          this._updatePlayStatus('closed');
          return;
        }

        // Generate unique handle and register it with AudioModule.
        const prevHandle = this._handle;
        this._counter += 1;
        this._handle = [url, this.view.uuid, this._counter].join('-');
        this._audioModule.addHandle(this._handle);
        this._audioModule.setUrl(this._handle, url);

        // Apply current settings
        if (this.props._volume) {
          this._audioModule.setVolume(this._handle, this.props._volume);
        }
        if (this.props._muted) {
          this._audioModule.setMuted(this._handle, this.props._muted);
        }

        // Unload previous audio.
        if (prevHandle) {
          this._audioModule.unload(prevHandle);
        }

        // Register callbacks and load audio.
        this._audioModule._addMediaEventListener(
          this._handle,
          'canplay',
          this._onCanPlay,
        );
        this._audioModule._addMediaEventListener(
          this._handle,
          'ended',
          this._onEnded,
        );
        this._audioModule._addMediaEventListener(
          this._handle,
          'playing',
          this._onPlaying,
        );
        this._audioModule._addMediaEventListener(
          this._handle,
          'pause',
          this._onPause,
        );
        this._audioModule._addMediaEventListener(
          this._handle,
          'error',
          this._onError,
        );
        this._audioModule._addMediaEventListener(
          this._handle,
          'durationchange',
          this._onDurationChange,
        );
        this._audioModule._addMediaEventListener(
          this._handle,
          'timeupdate',
          this._onTimeUpdate,
        );
        this._audioModule.load(this._handle);
        this._updatePlayStatus('loading');
      },
    });
  }
  /**
   * Customised present layout to update position of audio source.
   */
  presentLayout() {
    super.presentLayout(this);

    if (this._handle) {
      const position = this.view.getWorldPosition().toArray();
      this._audioModule.setPosition(this._handle, position);
    }
  }

  dispose() {
    if (this._handle) {
      this._audioModule.unload(this._handle);
    }
    super.dispose();
  }

  receiveCommand(commandId, commandArgs) {
    super.receiveCommand(commandId, commandArgs);
    switch (commandId) {
      case COMMAND_SEEK_TO:
        if (this._handle) {
          const position = commandArgs ? commandArgs[0] : 0;
          this._audioModule.seekTo(this._handle, position);
        }
        break;
      case COMMAND_PLAY:
        if (this._handle) {
          this._audioModule.play(this._handle);
        }
        break;
      case COMMAND_PAUSE:
        if (this._handle) {
          this._audioModule.pause(this._handle);
        }
        break;
    }
  }

  _onCanPlay(handle) {
    if (handle !== this._handle) {
      return;
    }
    this._updatePlayStatus('ready');
    // Play audio if in auto-play mode, or status is set to 'play'
    const status = this.props._playControl;
    if ((this.props._autoPlay && status !== 'stop') || status === 'play') {
      this._audioModule.play(handle);
    }
  }

  _onEnded(handle) {
    if (handle !== this._handle) {
      return;
    }
    this._updatePlayStatus('ended');
    // Play sound if in loop mode and status not set to 'stop'
    if (this.props._loop && this.props._playControl !== 'stop') {
      this._audioModule.play(handle);
    }

    // call onEnded in React
    this._emitEvent('topEnded', []);
  }

  _onPlaying(handle) {
    if (handle !== this._handle) {
      return;
    }
    this._updatePlayStatus('playing');
  }

  _onPause(handle) {
    if (handle !== this._handle) {
      return;
    }
    this._updatePlayStatus('paused');
  }

  _onError(handle, event) {
    if (handle !== this._handle) {
      return;
    }
    this._updatePlayStatus('error');
  }

  _onDurationChange(handle, event) {
    if (handle !== this._handle) {
      return;
    }
    const duration = event.target && event.target.duration;
    if (duration) {
      this._emitEvent('topDurationChange', {duration: duration});
    }
  }

  _onTimeUpdate(handle, event) {
    if (handle !== this._handle) {
      return;
    }
    const currentTime = event.target && event.target.currentTime;
    if (currentTime) {
      this._emitEvent('topTimeUpdate', {currentTime: currentTime});
    }
  }

  _emitEvent(eventType, args) {
    this._rnctx.callFunction('RCTEventEmitter', 'receiveEvent', [
      this.getTag(),
      eventType,
      args,
    ]);
  }

  _updatePlayStatus(status) {
    if (this._playStatus !== status) {
      this._playStatus = status;
      this._emitEvent('topPlayStatusChange', {playStatus: this._playStatus});
    }
  }

  /**
   * Describes the properties representable by this view type and merges
   * with super type
   */
  static describe() {
    return merge(super.describe(), {
      // declare the native props sent from react to runtime
      NativeProps: {
        autoPlay: 'boolean',
        volume: 'number',
        loop: 'boolean',
        muted: 'boolean',
        playControl: 'string',
        source: 'object',
      },
      Commands: {
        seekTo: COMMAND_SEEK_TO,
        play: COMMAND_PLAY,
        pause: COMMAND_PAUSE,
      },
    });
  }
}
