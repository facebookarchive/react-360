/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

export const PLAY = {
  width: 128,
  height: 128,
  color: '#999999',
  instructions: [
    ['begin'],
    ['move', 20, 11],
    ['line', 108, 64],
    ['line', 20, 117],
    ['end'],
  ],
};

export const PAUSE = {
  width: 128,
  height: 128,
  color: '#999999',
  instructions: [
    ['begin'],
    ['rect', 24, 10, 24, 108],
    ['rect', 80, 10, 24, 108],
    ['end'],
  ],
};

// MUTE and UNMUTE share the majority of their shape
const speaker = [
  ['begin'],
  ['move', 12, 46],
  ['line', 46, 46],
  ['line', 76, 26],
  ['line', 76, 102],
  ['line', 46, 82],
  ['line', 12, 82],
  ['end'],
  ['begin'],
  ['arc', 79, 66, 18, 1.28, -1.28, true],
  ['arc', 78, 66, 28, -1.28, 1.28, false],
  ['end'],
  ['begin'],
  ['arc', 76, 66, 36, 1.28, -1.28, true],
  ['arc', 76, 66, 44, -1.28, 1.28, false],
  ['end'],
];
export const UNMUTE = {
  width: 128,
  height: 128,
  color: '#999999',
  instructions: speaker,
};

export const MUTE = {
  width: 128,
  height: 128,
  color: '#999999',
  instructions: speaker.concat([
    ['begin'],
    ['move', 4.25, 21.24],
    ['line', 10.38, 13.66],
    ['line', 124.83, 106.34],
    ['line', 118.7, 113.92],
    ['end'],
  ]),
};
