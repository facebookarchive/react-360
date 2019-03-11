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

import type DeviceEventEmitter from './DeviceEventEmitter';

const getGamepads = (navigator.getGamepads
  ? navigator.getGamepads
  : navigator.webkitGetGamepads
    ? navigator.webkitGetGamepads
    : () => []
).bind(navigator);

function extractInfo(gamepad) {
  if (!gamepad) {
    return null;
  }

  return {
    index: gamepad.index,
    id: gamepad.id,
    buttons: gamepad.buttons.length,
    axes: gamepad.axes.length,
    hand: gamepad.hand || null,
  };
}

export default class ControllerInfo {
  constructor(container: any, emitter: DeviceEventEmitter) {
    window.addEventListener('gamepadconnected', e => {
      emitter.emit('controllerConnected', extractInfo(e.gamepad));
    });
    window.addEventListener('gamepaddisconnected', e => {
      emitter.emit('controllerDisconnected', extractInfo(e.gamepad));
    });
  }

  getControllers() {
    const controllers = [];
    const gamepads = getGamepads();
    for (let i = 0; i < gamepads.length; i++) {
      const gamepad = gamepads[i];
      if (gamepad) {
        controllers.push(extractInfo(gamepads[i]));
      }
    }
    return Promise.resolve(controllers);
  }
}
