/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

export type StreamingType = 'buffer'; // Extend this when more are added

export type AudioConfig = {
  panningModel?: string,
  distanceModel?: string,
  coneInnerAngle?: number,
  coneOuterAngle?: number,
  coneOuterGain?: number,
};

export type AudioDef = {
  streamingType: StreamingType,
  src?: string,
};
