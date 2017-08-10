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

import getSupportedFormats from '../Audio/getSupportedFormats';
import VRAudioComponent from '../Audio/VRAudioComponent';
import VRAudioContext from '../Audio/VRAudioContext';
import Module from './Module';
import * as THREE from 'three';
import MediaEvent from '../Events/MediaEvent';

import type {ReactNativeContext} from '../ReactNativeContext';
import type {AudioConfig, AudioDef} from '../Audio/AudioTypes';

const MEDIA_EVENT_CALLBACK_NAME = {
  canplay: 'onAudioCanPlay',
  durationchange: 'onAudioDurationChange',
  ended: 'onAudioEnded',
  error: 'onAudioError',
  timeupdate: 'onAudioTimeUpdate',
  playing: 'onAudioPlaying',
  pause: 'onAudioPause',
};

/**
 * Implements basic audio playback.
 * Example usage:
 * ```
 * audioModule.addHandle(handle);
 * audioModule.setUrl(handle, url);
 * audioModule._setOnAudioReadyCallback(handle, function() {
 *   audioModule.play(handle);
 * });
 * audioModule.load(handle);
 * ```
 *
 * @class RCTAudioModule
 * @extends Module
 */
export default class RCTAudioModule extends Module {
  audioContext: VRAudioContext | null;
  supportedFormats: Array<string>;
  _audioDefs: {[handle: string]: AudioDef};
  _components: {[handle: string]: VRAudioComponent};
  _mediaEventCallbacks: {
    [handle: string]: {[eventType: string]: Array<(handle: string, event: MediaEvent) => void>},
  };
  _rnctx: ReactNativeContext;

  constructor(rnctx: ReactNativeContext) {
    super('RCTAudioModule');
    this.audioContext = VRAudioContext.supported() ? new VRAudioContext() : null;
    this.supportedFormats = getSupportedFormats() || [];
    this._audioDefs = {};
    this._components = {};
    this._rnctx = rnctx;
    this._mediaEventCallbacks = {};
  }

  /**
   * Add a new handle to the audio module
   * @param {string} handle - The audio handle.
   * @param {object} audioConfig - Optional audio configuration.
   */
  addHandle(handle: string, audioConfig: AudioConfig = {}) {
    if (!this.audioContext) {
      return;
    }
    const component = new VRAudioComponent(this.audioContext, audioConfig);
    this._components[handle] = component;
    this._audioDefs[handle] = this._createAudioDef();
    this._mediaEventCallbacks[handle] = {};
    component.onMediaEvent = this._onMediaEvent.bind(this, handle);
  }

  _createAudioDef(): AudioDef {
    return {
      streamingType: 'buffer',
    };
  }

  _onMediaEvent(handle: string, event: Object) {
    const eventType = event.type;
    if (MEDIA_EVENT_CALLBACK_NAME[eventType]) {
      const callbackName = MEDIA_EVENT_CALLBACK_NAME[eventType];
      const mediaEvent = new MediaEvent(event);
      // Emit media event to react
      this._rnctx.callFunction('RCTDeviceEventEmitter', 'emit', [callbackName, handle, mediaEvent]);

      // Emit media event to native side
      const listeners = this._mediaEventCallbacks[handle]
        ? this._mediaEventCallbacks[handle][eventType]
        : null;
      if (listeners) {
        listeners.forEach(listener => listener(handle, mediaEvent));
      }
    }
  }

  // Add listener to media events on native side
  _addMediaEventListener(handle: string, eventType: string, listener: any) {
    if (!this._mediaEventCallbacks[handle]) {
      console.warn(
        'RCTAudioModule.addMediaEventListener: ' +
          `can't add listener on a not exist handle: ${handle}`
      );
      return;
    }

    if (!MEDIA_EVENT_CALLBACK_NAME[eventType]) {
      console.warn(
        'RCTAudioModule.addMediaEventListener: ' +
          `can't add listener on a not supported eventType: ${eventType}`
      );
      return;
    }

    if (!this._mediaEventCallbacks[handle][eventType]) {
      this._mediaEventCallbacks[handle][eventType] = [];
    }

    const listeners = this._mediaEventCallbacks[handle][eventType];
    if (listeners.indexOf(listener) === -1) {
      listeners.push(listener);
    }
  }

  // Remove listener to media events on native side
  _removeMediaEventListener(handle: string, eventType: string, listener: any) {
    if (!this._mediaEventCallbacks[handle] || !this._mediaEventCallbacks[handle][eventType]) {
      return;
    }
    const listeners = this._mediaEventCallbacks[handle][eventType];
    if (listeners) {
      const index = listeners.indexOf(listener);
      if (index !== -1) {
        listeners.splice(index, 1);
      }
    }
  }

  /**
   * Set the audio url
   * @param {string} handle - The audio handle.
   */
  setUrl(handle: string, url: string) {
    this._audioDefs[handle].src = url;
  }

  /**
   * load the audio
   * @param {string} handle - The audio handle.
   */
  load(handle: string) {
    this._components[handle].setAudio(this._audioDefs[handle]);
  }

  /**
   * play the audio
   * @param {string} handle - The audio handle.
   */
  play(handle: string) {
    this._components[handle].play();
  }

  /**
   * seek to a position in an audio
   * @param {string} handle - The audio handle.
   * @param {number} position - The audio position to seek to
   */
  seekTo(handle: string, position: number) {
    this._components[handle].seekTo(position);
  }

  /**
   * pause the audio
   * @param {string} handle - The audio handle.
   */
  pause(handle: string) {
    this._components[handle].pause();
  }

  /**
   * stop the audio
   * @param {string} handle - The audio handle.
   */
  stop(handle: string) {
    this._components[handle].stop();
  }

  /**
   * unload the audio
   * @param {string} handle - The audio handle.
   */
  unload(handle: string) {
    this._components[handle].dispose();
    delete this._components[handle];
    delete this._audioDefs[handle];
    delete this._mediaEventCallbacks[handle];
  }

  /**
   * Set location of the sound source within the scene.
   * @param {string} handle - The audio handle.
   * @param {array} position - world position of the sound source, in x, y, z order.
   */
  setPosition(handle: string, position: [number, number, number]) {
    const vec = new THREE.Vector3();
    vec.fromArray(position);
    this._components[handle].position = vec;
  }

  /**
   * Set volume of the sound source within the scene.
   * @param {string} handle - The audio handle.
   * @param {number} volume - volume
   */
  setVolume(handle: string, volume: number) {
    if (typeof volume !== 'number') {
      console.warn('AudioModule setVolume expected args (handle: string, volume: number)');
      return;
    }
    this._components[handle].volume = volume;
  }

  /**
   * Set the muted attributed of the audio
   * @param {string} handle - The audio handle.
   * @param {boolean} muted - Whether the audio should be muted.
   */
  setMuted(handle: string, muted: boolean) {
    this._components[handle].muted = muted;
  }

  /**
   * Update the `audioContext.listener` with the current camera position.
   * Should be called on every frame.
   * @param {object} camera - camera being used to render the scene
   */
  frame(camera: any) {
    if (this.audioContext) {
      this.audioContext.frame(camera);
    }
    for (const key in this._components) {
      this._components[key].frame();
    }
  }
}
