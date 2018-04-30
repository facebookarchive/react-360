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

export interface VideoPlayer {
  constructor(src: string): void;
  destroy(): void;
  load(): Promise<TextureMetadata>;
  pause(): void;
  play(): void;
  refreshTexture(): void;
  seekTo(position: number): void;
  setMuted(muted: boolean): void;
  setVolume(vol: number): void;
}
export type VideoPlayerStatics = {
  getSupportedFormats(): Array<string>,
};
