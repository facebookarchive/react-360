/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule VrSoundEffects
 * @flow
 */
'use strict';

import {NativeModules} from 'react-native';

const RCTDeviceEventEmitter = require('RCTDeviceEventEmitter');
const AudioModule = NativeModules.AudioModule;

const loadedSounds: {[uri: string]: any} = {};
const loadedSoundsRefs: {[uri: string]: number} = {};

type Resource = {uri: string};
type MultiFormatResource = {[format: string]: Resource};

// see docs/VrSoundEffects.docblock.md for docblock (not auto-extracted unless part of a class)

/**
 * Takes an object mapping audio formats to resources, and returns the first
 * resource that's supported on the current system.
 */
export function getSupportedResource(formats: MultiFormatResource | Resource): ?Resource {
  if (!formats) {
    return null;
  }
  if (formats.uri) {
    return formats;
  }
  const supported = AudioModule.supportedFormats;
  for (const format in formats) {
    if (supported.indexOf(format) > -1) {
      return formats[format];
    }
  }
  return null;
}

/**
 * Load the given audio resource. Audio clips must be loaded before playing.
 */
export function load(formats: MultiFormatResource | Resource) {
  const resource = getSupportedResource(formats);
  if (!resource || !resource.uri) {
    console.warn(
      "VrSoundEffects.load(resource) expected resource in format {url: 'http'}, got:",
      resource
    );
    return;
  }
  const url = resource.uri;
  const sound = {
    handle: url,
    src: url,
    config: {},
  };
  if (loadedSounds[url]) {
    loadedSoundsRefs[url] += 1;
  } else {
    loadedSoundsRefs[url] = 1;
    loadedSounds[url] = sound;
    loadedSounds[url].ready = false;
    AudioModule.addHandle(url, sound.config);
    AudioModule.setUrl(url, sound.src);
    AudioModule.load(url);
  }
}

/**
 * Play the audio resource indicated by the handle. Resource must have
 * previously been loaded.
 */
export function play(formats: MultiFormatResource | Resource) {
  const resource = getSupportedResource(formats);
  if (!resource || !resource.uri) {
    console.warn(
      "VrSoundEffects.load(resource) expected resource in format {url: 'http'}, got:",
      resource
    );
    return;
  }
  const url = resource.uri;
  if (!loadedSounds[url] || !loadedSounds[url].ready) {
    console.warn('VrSoundEffects: must load sound before playing', url);
    return;
  }
  AudioModule.play(url);
}

/**
 * Adjust the volume for this sound.
 */
export function volume(formats: MultiFormatResource | Resource, volume: number) {
  const resource = getSupportedResource(formats);
  const url = resource.uri;
  if (!loadedSounds[url] || !loadedSounds[url].ready) {
    console.warn('VrSoundEffects: must load sound before adjusting volume', url);
    return;
  }
  if (volume < 0) {
    console.warn('VrSoundEffects: volume cannot be negative', volume);
    return;
  }
  AudioModule.setVolume(url, volume);
}

/**
 * Dispose of any resources associated with this handle.
 */
export function unload(formats: MultiFormatResource | Resource, volume: number) {
  const resource = getSupportedResource(formats);
  const url = resource.uri;
  if (loadedSounds[url]) {
    loadedSoundsRefs[url] -= 1;
    if (loadedSoundsRefs[url] === 0) {
      AudioModule.unload(url);
      delete loadedSounds[url];
      delete loadedSoundsRefs[url];
    }
  }
}

function _onAudioCanPlay(handle) {
  if (loadedSounds[handle]) {
    loadedSounds[handle].ready = true;
  }
}

RCTDeviceEventEmitter.addListener('onAudioCanPlay', _onAudioCanPlay);
