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

export type RawAudioSource = {
  uri?: string,
};

export type AudioSourceID = string;

export type AudioSource = AudioSourceID | RawAudioSource;

export type AudioPlayOptions = {
  fadeTime?: number,
  loop?: boolean,
  muted?: boolean,
  position?: Vec3,
  volume?: number,
};

export type AudioOptions = AudioPlayOptions & {
  autoPlay?: boolean,
  is3d?: boolean,
  source: AudioSource,
};

export type Handle = string;

export type Vec3 = [number, number, number];

export type Quaternion = [number, number, number, number];
