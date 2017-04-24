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

import RCTBaseView from './BaseView';
import extractURL from '../Utils/extractURL';
import merge from '../Utils/merge';
import * as OVRUI from 'ovrui';
import getSupportedFormats from '../Audio/getSupportedFormats';

const COMMAND_SEEK_TO = 1;

export default class RCTSound extends RCTBaseView {
  /**
   * constructor: allocates the required resources and sets defaults
   */
  constructor(guiSys) {
    super();
    this.view = new OVRUI.UIView(guiSys);
    this._counter = 0;
    this._handle = null;

    Object.defineProperty(this.props, 'autoPlay', {
      set: value => {
        this.props._autoPlay = value;
      },
    });

    Object.defineProperty(this.props, 'volume', {
      set: value => {
        if (value < 0) {
          // Use 0 as our minium volume value, although a WebAudio GainNode
          // gain value can be set to negative for phase inversion.
          if (__DEV__) {
            console.warn('<Sound> volume cannot be negative:', value);
          }
          return;
        }
        this.props._volume = value;
        if (this._handle) {
          const audioModule = this.UIManager._rnctx.AudioModule;
          audioModule.setVolume(this._handle, this.props._volume);
        }
      },
    });

    Object.defineProperty(this.props, 'muted', {
      set: value => {
        this.props._muted = value;
        if (this._handle) {
          const audioModule = this.UIManager._rnctx.AudioModule;
          audioModule.setMuted(this._handle, this.props._muted);
        }
      },
    });

    Object.defineProperty(this.props, 'loop', {
      set: value => {
        this.props._loop = value;
      },
    });

    Object.defineProperty(this.props, 'playStatus', {
      set: value => {
        this.props._playStatus = value;

        if (!this._handle) {
          return;
        }

        const audioModule = this.UIManager._rnctx.AudioModule;
        if (this.props._playStatus === 'stop') {
          audioModule.stop(this._handle);
        } else if (this.props._playStatus === 'pause') {
          audioModule.pause(this._handle);
        } else if (this.props._playStatus === 'play') {
          audioModule.play(this._handle);
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
              console.warn('<Sound> source format values must be in the form {uri: "..."}');
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

        const audioModule = this.UIManager._rnctx.AudioModule;

        // User might have set source to null to remove the audio.
        if (!this.props._source) {
          const prevHandle = this._handle;
          this._handle = null;
          if (prevHandle) {
            audioModule.unload(prevHandle);
          }
          return;
        }

        // Generate unique handle and register it with AudioModule.
        const prevHandle = this._handle;
        this._counter += 1;
        this._handle = [url, this.view.uuid, this._counter].join('-');
        audioModule.addHandle(this._handle);
        audioModule.setUrl(this._handle, url);

        // Apply current settings
        if (this.props._volume) {
          audioModule.setVolume(this._handle, this.props._volume);
        }
        if (this.props._muted) {
          audioModule.setMuted(this._handle, this.props._muted);
        }

        const onCanPlay = handle => {
          if (handle !== this._handle) {
            return;
          }
          // Play audio if in auto-play mode, or status is set to 'play'
          const status = this.props._playStatus;
          if ((this.props._autoPlay && status !== 'stop') || status === 'play') {
            audioModule.play(handle);
          }
        };
        const onEnded = handle => {
          if (handle !== this._handle) {
            return;
          }
          // Play sound if in loop mode and status not set to 'stop'
          if (this.props._loop && this.props._playStatus !== 'stop') {
            audioModule.play(handle);
          }

          // call onEnded in React
          this.UIManager._rnctx.callFunction('RCTEventEmitter', 'receiveEvent', [
            this.getTag(),
            'topEnded',
            [],
          ]);
        };

        // Unload previous audio.
        if (prevHandle) {
          audioModule.unload(prevHandle);
        }

        // Register callbacks and load audio.
        audioModule._addMediaEventListener(this._handle, 'canplay', onCanPlay);
        audioModule._addMediaEventListener(this._handle, 'ended', onEnded);
        audioModule.load(this._handle);
      },
    });
  }
  /**
   * Customised present layout to update position of audio source.
   */
  presentLayout() {
    super.presentLayout(this);

    const audioModule = this.UIManager._rnctx.AudioModule;
    if (this._handle) {
      const position = this.view.getWorldPosition().toArray();
      audioModule.setPosition(this._handle, position);
    }
  }

  dispose() {
    if (this._handle) {
      this.UIManager._rnctx.AudioModule.unload(this._handle);
    }
    super.dispose();
  }

  receiveCommand(commandId, commandArgs) {
    super.receiveCommand(commandId, commandArgs);
    switch (commandId) {
      case COMMAND_SEEK_TO:
        if (this._handle) {
          const position = commandArgs ? commandArgs[0] : 0;
          this.UIManager._rnctx.AudioModule.seekTo(this._handle, position);
        }
        break;
    }
  }

  /**
   * Describes the properies representable by this view type and merges
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
        playStatus: 'string',
        source: 'object',
      },
      Commands: {
        seekTo: COMMAND_SEEK_TO,
      },
    });
  }
}
