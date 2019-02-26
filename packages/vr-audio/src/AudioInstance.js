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

import type {AudioOptions, AudioPlayOptions, Vec3} from './AudioTypes';
import type AudioNode from './AudioNode';

export default class AudioInstance {
  _autoPlay: boolean;
  _is3d: boolean;
  _loop: boolean;
  _muted: boolean;
  _node: ?AudioNode;
  _position: ?Vec3;
  _source: string;
  _stopped: boolean;
  _transition: number;
  _volume: number;

  constructor(options: AudioOptions) {
    this._autoPlay = !!options.autoPlay;
    this._is3d = !!options.is3d;
    this._loop = !!options.loop;
    this._muted = !!options.muted;
    this._position = options.position;
    this._stopped = false;
    this._transition = 0;
    this._volume = options.volume !== undefined ? options.volume : 1.0;

    const source = options.source;
    const uri = typeof source === 'string' ? source : source.uri;
    if (!uri) {
      throw new Error('Invalid audio source');
    }
    this._source = uri;
  }

  getNode(): ?AudioNode {
    return this._node;
  }

  getSource(): string {
    return this._source;
  }

  is3D(): boolean {
    return this._is3d;
  }

  play(options?: AudioPlayOptions) {
    const node = this._node;
    if (!node) {
      return;
    }
    if (options) {
      this.setParams(options);
    }
    node.setLoop(this._loop);
    node.setMuted(this._muted);
    node.setVolume(this._volume);
    if (this._position) {
      node.setPosition(this._position);
    }
    node.start({is3d: this.is3D()});
  }

  stop() {
    this._stopped = true;
    if (this._node) {
      this._node.stop();
    }
  }

  pause() {
    if (this._node) {
      this._node.pause();
    } else {
      this._autoPlay = false;
    }
  }

  seekTo(time: number) {
    if (this._node) {
      this._node.seekTo(time);
    }
  }

  frame(ms: number) {
    if (this._node && this._transition !== 0) {
      const node = this._node;
      const delta = this._transition * ms;
      const curVolume = node.getVolume();
      let nextVolume = curVolume + delta;
      if (this._transition > 0) {
        if (nextVolume > this._volume) {
          nextVolume = this._volume;
          this._transition = 0;
        }
      } else {
        if (nextVolume < this._volume) {
          nextVolume = this._volume;
          this._transition = 0;
        }
      }
      node.setVolume(nextVolume);
    }
  }

  setNode(node: AudioNode) {
    if (this._stopped) {
      return;
    }
    this._node = node;
    if (this._autoPlay) {
      this.play();
    }
  }

  setVolume(targetVolume: number, fadeTime: number = 0.0) {
    const origVolume = this._volume;
    this._volume = targetVolume;
    if (fadeTime === 0) {
      this._transition = 0;
      if (this._node) {
        this._node.setVolume(targetVolume);
      }
      return;
    }
    // set transition to change per ms
    const volumeDelta = targetVolume - origVolume;
    this._transition = volumeDelta / fadeTime;
  }

  setLoop(loop: boolean) {
    this._loop = loop;
    if (this._node) {
      this._node.setLoop(loop);
    }
  }

  setMuted(muted: boolean) {
    this._muted = muted;
    if (this._node) {
      this._node.setMuted(muted);
    }
  }

  setPosition(position: Vec3) {
    this._position = position;
    if (this._node) {
      this._node.setPosition(position);
    }
  }

  setParams(options: AudioPlayOptions) {
    if (options.loop !== undefined) {
      this.setLoop(options.loop);
    }
    if (options.muted !== undefined) {
      this.setMuted(options.muted);
    }
    if (options.position !== undefined) {
      this.setPosition(options.position);
    }
    if (options.volume !== undefined) {
      this.setVolume(options.volume, options.fadeTime);
    }
  }
}
