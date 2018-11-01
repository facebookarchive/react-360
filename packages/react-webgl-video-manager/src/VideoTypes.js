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

export type TextureMetadata = {
  format: ?string,
  height: number,
  src: string,
  tex: any,
  width: number,
};

export interface VideoPlayerImplementation {
  constructor(): void;
  destroy(): void;
  load(): Promise<TextureMetadata>;
  pause(): void;
  play(): void;
  seekTo(position: number): void;
  setLoop(loop: boolean): void;
  setMuted(muted: boolean): void;
  setSource(src: string, format?: string): void;
  setVolume(vol: number): void;
  update(): void;
}
export type VideoPlayerStatics = {
  getSupportedFormats(): Array<string>,
};
