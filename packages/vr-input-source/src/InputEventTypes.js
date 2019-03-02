/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @flow strict
 */

/* Gamepad Events */

// a controller was connected or disconnected
export const INPUT_SOURCE_CHANGE = 'inputsourcechange';
// the current active input source was changed
export const ACTIVE_SOURCE_CHANGE = 'activesourcechange';

/* Button Events */

// a primary button was pressed
export const SELECT_START = 'selectstart';
// a primary button was released, or the controller was disconnected while a
// button was pressed
export const SELECT_END = 'selectend';
// a primary button was pressed, then released
export const SELECT = 'select';
// any button was pressed
export const PRESS_START = 'pressstart';
// any button was released, or the controller was disconnected while a button
// was pressed
export const PRESS_END = 'pressend';
// any button was pressed, then released
export const PRESS = 'press';
// a capacitive button was touched
export const TOUCH_START = 'touchstart';
// a capacitive button was released
export const TOUCH_END = 'touchend';
