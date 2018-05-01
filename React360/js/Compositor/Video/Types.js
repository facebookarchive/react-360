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

import type {TextureMetadata} from '../Environment/Types';

export type VideoPlayerStatus =
  | 'closed' // No session.
  | 'closing' // Session is being closed.
  | 'failed' // Session had an error.
  | 'finished' // Session has finished playing video
  | 'paused' // Session is paused.
  | 'playing' // Session is playing a video.
  | 'seeking' // Session is seeking a position
  | 'ready' // Session is ready to play a video.
  | 'stopped'; // Session is stopped (ready to play)

export type VideoStereoFormat = '2D' | '3DLR' | '3DTB' | '3DBT' | 'UNKNOWN';
export type VideoLayout = 'RECT' | 'SPHERICAL';

export type VideoRotation = {
  yaw: number,
};

export type VideoSource = {
  fileFormat?: string,
  url: string,
};

export type VideoPlayOptions = {
  fadeLevel?: number,
  fadeSpeed?: number,
  forceMono?: boolean,
  layout?: VideoLayout,
  muted?: boolean,
  rotation?: VideoRotation,
  stereo?: VideoStereoFormat,
  volume?: number,
};

export type VideoOptions = VideoPlayOptions & {
  source: VideoSource | Array<VideoSource>,
};

export type VideoEvent = {
  player: string,
};

export type VideoStatusEvent = VideoEvent & {
  duration: number,
  error?: string,
  isBuffering: boolean,
  isMuted: boolean,
  position: number,
  status: VideoPlayerStatus,
  volume: number,
};

export interface VideoPlayer {
  constructor(src: string): void;
  destroy(): void;
  load(): Promise<TextureMetadata>;
  pause(): void;
  play(): void;
  refreshTexture(): void;
  seekTo(position: number): void;
  setMuted(muted: boolean): void;
  setSource(url: string, format?: string): void;
  setVolume(vol: number): void;
}
export type VideoPlayerStatics = {
  getSupportedFormats(): Array<string>,
};
