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

import WellKnownGamepads from './WellKnownGamepads';

export default function detectPrimaryButtons(gamepad: Gamepad): Array<?boolean> {
  if (gamepad.id in WellKnownGamepads) {
    return WellKnownGamepads[gamepad.id];
  }
  // default to marking all buttons primary, for future-proof compatibility
  const buttons = [];
  for (let i = 0; i < gamepad.buttons.length; i++) {
    buttons[i] = true;
  }
  return buttons;
}
