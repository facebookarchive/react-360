/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

/**
 * Defines RCTVideo "derived" from RTCBaseView.
 * Assigns 'this.view' to OVRUI.UIView(guiSys),
 * @class RCTVideo
 * @extends RCTBaseView
 */

import * as THREE from 'three';
import UIView from '../OVRUI/UIView/UIView';
import merge from '../Utils/merge';
import RCTVideoPlayer from '../Utils/RCTVideoPlayer';
import {RCTBindedResource} from '../Utils/RCTBindedResource';
import RCTBaseView from './BaseView';

const COMMAND_SEEK_TO = 1;
const COMMAND_PLAY = 2;
const COMMAND_PAUSE = 3;

export default class RCTVideo extends RCTBaseView {
  /**
   * constructor: allocates the required resources and sets defaults
   */
  constructor(guiSys, rnctx) {
    super();
    this.view = new UIView(guiSys);
    this._localResource = new RCTBindedResource(rnctx.RCTResourceManager);
    this._videoModule = rnctx.VideoModule;
    this._rnctx = rnctx;
    this.player = new RCTVideoPlayer(rnctx, this.view.uuid);
    this.player.onUpdateTexture = source => {
      const loadRemoteTexture = (url, onLoad) => {
        // When a url is null or undefined, send undefined to onLoad callback
        const onError = () => onLoad(undefined);
        // No progress indication for now.
        const onProgress = undefined;
        if (url == null) {
          onError();
        } else {
          const loader = new THREE.TextureLoader();
          loader.setCrossOrigin('Access-Control-Allow-Origin');
          loader.load(url, onLoad, onProgress, onError);
        }
      };

      const onLoadOrChange = texture => {
        // ignore a old request result
        if (source !== this._currentSource) {
          return;
        }
        if (texture && texture.type === 'MonoTextureInfo') {
          this.view.setImageTexture(texture.texture);
        } else if (texture) {
          this.view.setImageTexture(texture);
        } else {
          this.view.setImageTexture(undefined);
        }
      };

      this._currentSource = source;
      if (source && source.uri) {
        if (this._localResource.isValidUrl(source.uri)) {
          this._localResource.load(source.uri, onLoadOrChange);
        } else {
          loadRemoteTexture(source.uri, onLoadOrChange);
        }
      } else {
        this._localResource.unregister();
        onLoadOrChange(undefined);
      }
    };
    this.player.onEmitEvent = (eventType, args) => {
      this._rnctx.callFunction('RCTEventEmitter', 'receiveEvent', [
        this.getTag(),
        eventType,
        args,
      ]);
    };

    // Load/unload video when the source property changes.
    Object.defineProperty(this.props, 'source', {
      set: value => {
        this.player.setSource(value);
      },
    });

    // set video poster
    Object.defineProperty(this.props, 'poster', {
      set: value => {
        const url = value ? value.uri : null;
        if (url) {
          this.player.setPoster(value);
        } else {
          this.player.setPoster(null);
        }
      },
    });

    // Play/Pause the video.
    Object.defineProperty(this.props, 'playControl', {
      set: value => {
        this.player.setPlayControl(value);
      },
    });

    Object.defineProperty(this.props, 'autoPlay', {
      set: value => {
        this.player.setAutoPlay(value);
      },
    });

    Object.defineProperty(this.props, 'loop', {
      set: value => {
        this.player.setLoop(value);
      },
    });

    Object.defineProperty(this.props, 'muted', {
      set: value => {
        this.player.setMuted(value);
      },
    });

    Object.defineProperty(this.props, 'volume', {
      set: value => {
        this.player.setVolume(value);
      },
    });

    // assign the style property function mappings
    // setter for tintColor, this is applied as a tint to the image
    Object.defineProperty(
      this.style,
      'tintColor',
      ({
        set: value => {
          this.view.setImageColor(value);
        },
      }: Object),
    );
  }

  dispose() {
    if (this._localResource) {
      this._localResource.dispose();
    }
    this.player.dispose();
    super.dispose();
  }

  receiveCommand(commandId, commandArgs) {
    super.receiveCommand(commandId, commandArgs);
    switch (commandId) {
      case COMMAND_SEEK_TO:
        const position = commandArgs ? commandArgs[0] : 0;
        this.player.seekTo(position);
        break;
      case COMMAND_PLAY:
        this.player.play();
        break;
      case COMMAND_PAUSE:
        this.player.pause();
        break;
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
        loop: 'boolean',
        muted: 'boolean',
        playControl: 'string',
        volume: 'number',
        source: 'object',
        poster: 'object',
      },
      Commands: {
        seekTo: COMMAND_SEEK_TO,
        play: COMMAND_PLAY,
        pause: COMMAND_PAUSE,
      },
    });
  }
}
