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

import type {Camera} from 'three';

/**
 * The basic wrapper of audio context in VR
 */

const IS_SUPPORTED =
  window.hasOwnProperty('webkitAudioContext') || window.hasOwnProperty('AudioContext');
const ContextConstructor = IS_SUPPORTED ? window.AudioContext || window.webkitAudioContext : null;
if (window.hasOwnProperty('webkitAudioContext') && !window.hasOwnProperty('AudioContext')) {
  console.log('Outdated version of Web Audio API detected.');
}

export default class VRAudioContext {
  _context: AudioContext;

  constructor() {
    if (IS_SUPPORTED && typeof ContextConstructor === 'function') {
      this._context = new ContextConstructor();
    } else {
      throw new Error('Cannot create VRAudioContext, AudioContext is not supported');
    }
  }

  static supported() {
    return IS_SUPPORTED;
  }

  getWebAudioContext() {
    return this._context;
  }

  frame(camera: Camera) {
    if (!this._context) {
      return;
    }
    const listener = this._context.listener;
    const origin = camera.localToWorld(new THREE.Vector3(0, 0, 0));
    const front = camera.localToWorld(new THREE.Vector3(0, 0, -1)).sub(origin).normalize();
    const up = camera.localToWorld(new THREE.Vector3(0, 1, 0)).sub(origin).normalize();
    listener.setOrientation(front.x, front.y, front.z, up.x, up.y, up.z);
    if (typeof listener.setPosition === 'function') {
      // setPosition is deprecated
      listener.setPosition(origin.x, origin.y, origin.z);
    } else if (listener.positionX && listener.positionY && listener.positionZ) {
      // new format is positionX, etc.
      // Flow doesn't support these yet, change is in master though
      (listener.positionX: any).value = origin.x;
      (listener.positionY: any).value = origin.y;
      (listener.positionZ: any).value = origin.z;
    }
  }
}
