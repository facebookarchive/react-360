/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

jest.dontMock('../ControllerRayCaster');
jest.mock('ovrui', () => {
  class RayCasterMock {

  }
  return {RayCaster: RayCasterMock};
});

let windowHandlers = {};
window.addEventListener = function(event, handler) {
  if (!windowHandlers[event]) {
    windowHandlers[event] = [];
  }
  windowHandlers[event].push(handler);
};

function clearWindowHandlers() {
  windowHandlers = {};
}
function fireWindowEvent(event, payload) {
  const handlers = windowHandlers[event];
  if (handlers) {
    for (let i = 0; i < handlers.length; i++) {
      handlers[i](payload);
    }
  }
}

const navigatorGamepads = [];
function connectGamepad(gamepad) {
  navigatorGamepads.push(gamepad);
  fireWindowEvent('gamepadconnected', {gamepad});
}
function disconnectGamepad(gamepad) {
  navigatorGamepads.splice(gamepad.index, 1);
  fireWindowEvent('gamepaddisconnected', {gamepad});
}
function clearGamepads() {
  navigatorGamepads.length = 0;
}
navigator.getGamepads = function() {
  return navigatorGamepads;
};

const ControllerRayCaster = require('../ControllerRayCaster').default;

describe('ControllerRayCaster', () => {
  beforeEach(() => {
    clearWindowHandlers();
    clearGamepads();
  });

  it('initializes without any gamepads', () => {
    const rc = new ControllerRayCaster();
    expect(rc._gamepadID).toBe(null);
    expect(rc._gamepadIndex).toBe(-1);
  });

  it('initializes with connected gamepads', () => {
    connectGamepad({
      id: 'TurboPad 3000',
      index: 0,
      pose: {},
    });
    const rc = new ControllerRayCaster();
    expect(rc._gamepadID).toBe('TurboPad 3000');
    expect(rc._gamepadIndex).toBe(0);
  });

  it('connects to gamepads after init', () => {
    const rc = new ControllerRayCaster();
    expect(rc._gamepadID).toBe(null);
    expect(rc._gamepadIndex).toBe(-1);
    connectGamepad({
      id: 'TurboPad 3000',
      index: 0,
      pose: {},
    });
    expect(rc._gamepadID).toBe('TurboPad 3000');
    expect(rc._gamepadIndex).toBe(0);
  });

  it('connects to the first gamepad with pose', () => {
    connectGamepad({
      id: 'BoringPad',
      index: 0,
    });
    const rc = new ControllerRayCaster();
    expect(rc._gamepadID).toBe(null);
    expect(rc._gamepadIndex).toBe(-1);
    connectGamepad({
      id: 'BoringPad',
      index: 1,
    });
    expect(rc._gamepadID).toBe(null);
    expect(rc._gamepadIndex).toBe(-1);
    connectGamepad({
      id: 'TurboPad 3000',
      index: 2,
      pose: {},
    });
    expect(rc._gamepadID).toBe('TurboPad 3000');
    expect(rc._gamepadIndex).toBe(2);
  });

  it('handles gamepad disconnects', () => {
    const rc = new ControllerRayCaster();
    expect(rc._gamepadID).toBe(null);
    expect(rc._gamepadIndex).toBe(-1);
    const turbo = {
      id: 'TurboPad 3000',
      index: 0,
      pose: {},
    };
    connectGamepad(turbo);
    expect(rc._gamepadID).toBe('TurboPad 3000');
    expect(rc._gamepadIndex).toBe(0);
    disconnectGamepad(turbo);
    expect(rc._gamepadID).toBe(null);
    expect(rc._gamepadIndex).toBe(-1);
  });
});
