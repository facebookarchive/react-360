/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

/**
 * RCTVideoPano: runtime implementation of the <VideoPano source={{uri:URL, cubestrip:isCubestrip}}>
 * creates a 1000 m radius globe/cube that as a child of the view for playing
 * 360 videos. View responds to layout and transforms with pivot point the center
 * of the view
 * @class RCTVideoPano
 * @extends RCTPano
 */

import RCTPano from './Pano';
import merge from '../Utils/merge';
import RCTVideoPlayer from '../Utils/RCTVideoPlayer';

const COMMAND_SEEK_TO = 1;
const COMMAND_PLAY = 2;
const COMMAND_PAUSE = 3;

export default class RCTVideoPano extends RCTPano {
  /**
   * constructor: allocates the required resources and sets defaults
   */
  constructor(guiSys, rnctx) {
    super(guiSys, rnctx);
    this._rnctx = rnctx;
    this.player = new RCTVideoPlayer(rnctx, this.view.uuid);
    this.player.onUpdateTexture = source => {
      super.setSource(source);
    };
    this.player.onEmitEvent = (eventType, args) => {
      this._rnctx.callFunction('RCTEventEmitter', 'receiveEvent', [this.getTag(), eventType, args]);
    };

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

  setSource(value) {
    this.player.setSource(value);
  }

  dispose() {
    this.player.dispose();
    super.dispose();
  }

  /**
   * Describes the properties representable by this view type and merges
   * with super type
   */
  static describe() {
    return merge(super.describe(), {
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
