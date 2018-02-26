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

/* eslint-disable import/no-commonjs */

jest.dontMock('../InputChannels/GamepadInputChannel');

const GamepadInputChannel = require('../InputChannels/GamepadInputChannel')
  .default;

describe('GamepadInputChannel', () => {
  it('uses the standard mapping for standard gamepads', () => {
    const channel = new GamepadInputChannel();
    const mapping = channel.mappingLookup({id: 'pad', mapping: 'standard'});
    expect(mapping[0]).toBe('confirm');
    expect(mapping[1]).toBe('back');
    expect(mapping[12]).toBe('up');
    expect(mapping[13]).toBe('down');
    expect(mapping[14]).toBe('left');
    expect(mapping[15]).toBe('right');
  });

  it('allows overrides by gamepad id', () => {
    const channel = new GamepadInputChannel({
      gamemaster: ['confirm', 'back', '', '', 'up', 'down', 'left', 'right'],
    });
    const mapping = channel.mappingLookup({id: 'gamemaster'});
    expect(mapping[0]).toBe('confirm');
    expect(mapping[1]).toBe('back');
    expect(mapping[4]).toBe('up');
    expect(mapping[5]).toBe('down');
    expect(mapping[6]).toBe('left');
    expect(mapping[7]).toBe('right');

    // fallback to standard mapping otherwise
    const mapping2 = channel.mappingLookup({id: 'generic'});
    expect(mapping2).toEqual(['confirm']);
  });
});
