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

import VRAudioBufferSource from './VRAudioBufferSource';
import * as THREE from 'three';

import type {AudioConfig, AudioDef} from './AudioTypes';
import type VRAudioContext from './VRAudioContext';
import type {MediaEvent} from './VRAudioBufferSource';
import type {Vector3, Euler} from 'three';

const DEFAULT_GAIN = 1.0;
const DEFAULT_PANNING_MODEL = 'HRTF';
const DEFAULT_DISTANCE_MODEL = 'inverse';
const DEFAULT_CONE_INNER_ANGLE = 60;
const DEFAULT_CONE_OUTER_ANGLE = 120;
const DEFAULT_CONE_OUTER_GAIN = 0.25;

/**
 * The basic audio player
 */
export default class VRAudioComponent {
  audioConfig: AudioConfig;
  audioDef: {streamingType: any, src: any};
  onMediaEvent: ?(MediaEvent) => void;
  _gain: GainNode;
  _panner: ?PannerNode;
  _position: Vector3;
  _source: ?VRAudioBufferSource;
  _rotation: Euler;
  _vrAudioContext: VRAudioContext;

  constructor(vrAudioContext: VRAudioContext, audioConfig: AudioConfig) {
    this._vrAudioContext = vrAudioContext;
    this.audioConfig = audioConfig;

    this._position = new THREE.Vector3(0, 0, 0);
    this._rotation = new THREE.Euler(0, 0, 0, 'XYZ');

    this._gain = this._vrAudioContext.getWebAudioContext().createGain();
    this._gain.gain.value = DEFAULT_GAIN;

    // Only create a panner node when position or rotation is set.
    // Otherwise, default to non-spatialized audio.
    this._panner = undefined;

    this.onMediaEvent = undefined;
    (this: any)._onMediaEvent = this._onMediaEvent.bind(this);
  }

  _setAudioDef(audioDef: AudioDef) {
    this.audioDef = {
      streamingType: audioDef.streamingType,
      src: audioDef.src,
    };
  }

  _onMediaEvent(event: MediaEvent) {
    if (typeof this.onMediaEvent === 'function') {
      this.onMediaEvent(event);
    }
  }

  _createPanner() {
    const audioConfig = this.audioConfig;
    this._panner = this._vrAudioContext.getWebAudioContext().createPanner();
    this._panner.panningModel = audioConfig.panningModel
      ? audioConfig.panningModel
      : DEFAULT_PANNING_MODEL;
    this._panner.distanceModel = audioConfig.distanceModel
      ? audioConfig.distanceModel
      : DEFAULT_DISTANCE_MODEL;
    this._panner.coneInnerAngle = audioConfig.coneInnerAngle
      ? audioConfig.coneInnerAngle
      : DEFAULT_CONE_INNER_ANGLE;
    this._panner.coneOuterAngle = audioConfig.coneOuterAngle
      ? audioConfig.coneOuterAngle
      : DEFAULT_CONE_OUTER_ANGLE;
    this._panner.coneOuterGain = audioConfig.coneOuterGain
      ? audioConfig.coneOuterGain
      : DEFAULT_CONE_OUTER_GAIN;
  }

  _connectNodes() {
    const nodes = [];
    if (this._source) {
      const srcNode = this._source.getSourceNode();
      if (srcNode) {
        nodes.push(srcNode);
      }
    }
    if (this._gain) {
      nodes.push(this._gain);
    }
    if (this._panner) {
      nodes.push(this._panner);
    }
    for (let i = 0; i < nodes.length - 1; i++) {
      nodes[i].connect(nodes[i + 1]);
    }
    if (nodes.length > 0) {
      const destNode = this._vrAudioContext.getWebAudioContext().destination;
      nodes[nodes.length - 1].connect(destNode);
    }
  }

  _disconnectNodes() {
    if (this._gain) {
      this._gain.disconnect();
    }
    if (this._panner) {
      this._panner.disconnect();
    }
  }

  _freeSource() {
    if (this._source) {
      this._source.dispose();
      this._source = undefined;
    }
  }

  setAudio(audioDef: AudioDef) {
    this._disconnectNodes();
    this._freeSource();
    this._setAudioDef(audioDef);

    this._source = new VRAudioBufferSource(this._vrAudioContext);
    this._source.onMediaEvent = this._onMediaEvent;

    this._source.initializeAudio(this.audioDef.src);
  }

  play() {
    if (this._source) {
      const source = this._source;
      this._disconnectNodes();
      source.play();
      this._connectNodes();
    }
  }

  stop() {
    if (this._source) {
      this._source.stop();
      this._disconnectNodes();
    }
  }

  dispose() {
    this._disconnectNodes();
    this._freeSource();
    this.onMediaEvent = undefined;
  }

  get position(): Vector3 {
    return this._position;
  }

  set position(value: Vector3) {
    if (!this._panner) {
      this._createPanner();
    }
    this._position.copy(value);
    if (this._panner) {
      this._panner.setPosition(this._position.x, this._position.y, this._position.z);
    }
  }

  get rotation(): Euler {
    return this._rotation;
  }

  set rotation(value: Euler) {
    if (!this._panner) {
      this._createPanner();
    }
    this._rotation.copy(value);
    const front = new THREE.Vector3(0, 0, -1);
    front.applyEuler(this._rotation);
    if (this._panner) {
      this._panner.setOrientation(front.x, front.y, front.z);
    }
  }

  get gain(): number {
    return this._gain.gain.value;
  }

  set gain(value: number) {
    this._gain.gain.value = value;
  }
}
