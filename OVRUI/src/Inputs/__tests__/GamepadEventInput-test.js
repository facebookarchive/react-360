/**
 * Copyright (c) 2016-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

const gamepadsMock = {
  next: [],
};
window.navigator.getGamepads = function() {
  return gamepadsMock.next;
};

jest.dontMock('../EventInput');
jest.dontMock('../GamepadEventInput');

const GamepadEventInput = require('../GamepadEventInput').default;

describe('GamepadEventInput', () => {
  it('returns the correct event type', () => {
    const eventInput = new GamepadEventInput();
    expect(eventInput.getEventType()).toBe('GamepadInputEvent');
  });

  it('fires no events when no changes happen', () => {
    const eventInput = new GamepadEventInput();
    expect(eventInput.getEvents()).toEqual([]);
    gamepadsMock.next = [{buttons: [{pressed: false}, {pressed: true}]}];
    eventInput.getEvents(); // ignore
    gamepadsMock.next = [{buttons: [{pressed: false}, {pressed: true}]}];
    expect(eventInput.getEvents()).toEqual([]);
  });

  it('fires button press events', () => {
    const eventInput = new GamepadEventInput();
    gamepadsMock.next = [{buttons: [{pressed: false}, {pressed: true}]}];
    expect(eventInput.getEvents()).toEqual([
      {
        type: 'GamepadInputEvent',
        eventType: 'keydown',
        gamepad: 0,
        button: 1,
        repeat: false,
      },
    ]);
    gamepadsMock.next = [{buttons: [{pressed: true}, {pressed: true}]}];
    expect(eventInput.getEvents()).toEqual([
      {
        type: 'GamepadInputEvent',
        eventType: 'keydown',
        gamepad: 0,
        button: 0,
        repeat: false,
      },
    ]);
    gamepadsMock.next = [
      {buttons: [{pressed: true}, {pressed: true}]},
      null,
      {buttons: [{pressed: true}, {pressed: false}, {pressed: true}]},
    ];
    expect(eventInput.getEvents()).toEqual([
      {
        type: 'GamepadInputEvent',
        eventType: 'keydown',
        gamepad: 2,
        button: 0,
        repeat: false,
      },
      {
        type: 'GamepadInputEvent',
        eventType: 'keydown',
        gamepad: 2,
        button: 2,
        repeat: false,
      },
    ]);
  });

  it('fires long press events', done => {
    const eventInput = new GamepadEventInput();
    gamepadsMock.next = [{buttons: [{pressed: false}, {pressed: true}]}];
    eventInput.getEvents();
    setTimeout(() => {
      expect(eventInput.getEvents()).toEqual([
        {
          type: 'GamepadInputEvent',
          eventType: 'keydown',
          gamepad: 0,
          button: 1,
          repeat: true,
        },
      ]);
      done();
    }, 1000);
  });

  it('fires button release events', () => {
    const eventInput = new GamepadEventInput();
    gamepadsMock.next = [{buttons: [{pressed: true}, {pressed: true}]}];
    eventInput.getEvents();
    gamepadsMock.next = [{buttons: [{pressed: false}, {pressed: true}]}];
    expect(eventInput.getEvents()).toEqual([
      {
        type: 'GamepadInputEvent',
        eventType: 'keyup',
        gamepad: 0,
        button: 0,
      },
    ]);
    gamepadsMock.next = [
      {buttons: [{pressed: false}, {pressed: true}]},
      {buttons: [{pressed: true}, {pressed: true}]},
    ];
    eventInput.getEvents();
    gamepadsMock.next = [
      {buttons: [{pressed: false}, {pressed: false}]},
      {buttons: [{pressed: false}, {pressed: false}]},
    ];
    expect(eventInput.getEvents()).toEqual([
      {
        type: 'GamepadInputEvent',
        eventType: 'keyup',
        gamepad: 0,
        button: 1,
      },
      {
        type: 'GamepadInputEvent',
        eventType: 'keyup',
        gamepad: 1,
        button: 0,
      },
      {
        type: 'GamepadInputEvent',
        eventType: 'keyup',
        gamepad: 1,
        button: 1,
      },
    ]);
  });

  it('fires axis changes', () => {
    const eventInput = new GamepadEventInput();
    gamepadsMock.next = [{buttons: [], axes: [0.5, 0.5]}];
    expect(eventInput.getEvents()).toEqual([]);
    gamepadsMock.next = [{buttons: [], axes: [0.2, 0.7]}];
    expect(eventInput.getEvents()).toEqual([
      {
        type: 'GamepadInputEvent',
        eventType: 'axismove',
        gamepad: 0,
        axis: 0,
        value: 0.2,
      },
      {
        type: 'GamepadInputEvent',
        eventType: 'axismove',
        gamepad: 0,
        axis: 1,
        value: 0.7,
      },
    ]);
    gamepadsMock.next = [{buttons: [], axes: [0.199999, 0.700001]}];
    expect(eventInput.getEvents()).toEqual([]);
    gamepadsMock.next = [{buttons: [], axes: [0.199999, 0.23]}];
    expect(eventInput.getEvents()).toEqual([
      {
        type: 'GamepadInputEvent',
        eventType: 'axismove',
        gamepad: 0,
        axis: 1,
        value: 0.23,
      },
    ]);
  });
});
