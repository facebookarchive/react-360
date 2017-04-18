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

import Module from './Module';

import type {ReactNativeContext} from '../ReactNativeContext';

const getGamepads = (navigator.getGamepads
  ? navigator.getGamepads
  : navigator.webkitGetGamepads ? navigator.webkitGetGamepads : () => []).bind(navigator);

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

/**
 * ControllerInfo exposes information about connected gamepads and controllers.
 * It should be used to respond to controller connect / disconnect events, and
 * extracting static information about controllers (unique identifiers, button
 * and axis counts, left vs right hand, etc).
 * For controller button states and poses, rely on React VR's input events and
 * ray caster systems.
 */
export default class ControllerInfo extends Module {
  _rnctx: ReactNativeContext;

  constructor(rnctx: ReactNativeContext) {
    super('ControllerInfo');
    this._rnctx = rnctx;

    window.addEventListener('gamepadconnected', e => {
      this._rnctx.callFunction('RCTDeviceEventEmitter', 'emit', [
        'controllerConnected',
        extractInfo(e.gamepad),
      ]);
    });

    window.addEventListener('gamepaddisconnected', e => {
      this._rnctx.callFunction('RCTDeviceEventEmitter', 'emit', [
        'controllerDisconnected',
        extractInfo(e.gamepad),
      ]);
    });
  }

  /**
   * Get the current information from all connected controllers.
   * Resolves with an array of controller information objects.
   */
  $getControllers(success: number) {
    const controllers = [];
    const gamepads = getGamepads();
    for (let i = 0; i < gamepads.length; i++) {
      const gamepad = gamepads[i];
      if (gamepad) {
        controllers.push(extractInfo(gamepads[i]));
      }
    }
    this._rnctx.invokeCallback(success, [controllers]);
  }
}
