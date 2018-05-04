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

export type AxisEvent = {
  axis: number,
  axisClass?: string,
  type: 'axis',
  value: number,
};

export type ButtonEvent = {
  action: 'down' | 'up' | 'repeat',
  button: number,
  buttonClass?: string,
  source?: string,
  type: 'button',
};

export type InputEvent = AxisEvent | ButtonEvent;

export interface InputChannel {
  getEvents(acc: Array<InputEvent>): void;
}
