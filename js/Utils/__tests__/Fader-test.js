/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';

jest.dontMock('../Fader');

const Fader = require('../Fader').default;

describe('Fader', () => {
  it('Normal fading', () => {
    const fader = new Fader();
    fader.fadeImmediate({
      targetLevel: 0,
      duration: 1000,
    });
    let changed = fader.fadeFrame(100);
    expect(changed).toEqual(true);
    expect(fader.getCurrentLevel()).toBeCloseTo(0.9);

    changed = fader.fadeFrame(800);
    expect(changed).toEqual(true);
    expect(fader.getCurrentLevel()).toBeCloseTo(0.1);

    changed = fader.fadeFrame(100);
    expect(changed).toEqual(true);
    expect(fader.getCurrentLevel()).toBeCloseTo(0);

    changed = fader.fadeFrame(100);
    expect(changed).toEqual(false);
    expect(fader.getCurrentLevel()).toBeCloseTo(0);
  });

  it('Fading out of range', () => {
    const fader = new Fader();
    fader.fadeImmediate({
      targetLevel: -3,
      duration: 100,
    });
    let changed = fader.fadeFrame(100);
    expect(changed).toEqual(true);
    expect(fader.getCurrentLevel()).toBeCloseTo(0);

    fader.fadeImmediate({
      targetLevel: 1,
      duration: 100,
    });
    changed = fader.fadeFrame(500);
    expect(changed).toEqual(true);
    expect(fader.getCurrentLevel()).toBeCloseTo(1);
  });

  it('Queued fading', () => {
    const fader = new Fader();
    fader.queueFade({
      targetLevel: 0,
      duration: 100,
    });
    fader.queueFade({
      targetLevel: 0.3,
      duration: 100,
    });
    fader.queueFade({
      targetLevel: 0.7,
      duration: 200,
    });
    fader.queueFade({
      targetLevel: 0.7,
      duration: 100,
    });
    fader.queueFade({
      targetLevel: 0.7,
      duration: 100,
    });
    fader.queueFade({
      targetLevel: 0,
      duration: 100,
    });

    let changed = fader.fadeFrame(100);
    expect(changed).toEqual(true);
    expect(fader.getCurrentLevel()).toBeCloseTo(0);

    changed = fader.fadeFrame(100);
    expect(changed).toEqual(true);
    expect(fader.getCurrentLevel()).toBeCloseTo(0.3);

    changed = fader.fadeFrame(100);
    expect(changed).toEqual(true);
    expect(fader.getCurrentLevel()).toBeCloseTo((0.5));

    changed = fader.fadeFrame(100);
    expect(changed).toEqual(true);
    expect(fader.getCurrentLevel()).toBeCloseTo((0.7));

    // it current fadelevel equals the jobs target value, 
    // it will skip those jobs  
    changed = fader.fadeFrame(100);
    expect(changed).toEqual(true);
    expect(fader.getCurrentLevel()).toBeCloseTo((0));

    changed = fader.fadeFrame(100);
    expect(changed).toEqual(false);
    expect(fader.getCurrentLevel()).toBeCloseTo(0);
  });


  it('Fade end Event ', () => {
    const func1 = jest.fn();
    const func2 = jest.fn();
    const func3 = jest.fn();
    const func4 = jest.fn();
    const func5 = jest.fn();
    const func6 = jest.fn();

    const fader = new Fader();
    fader.queueFade({
      targetLevel: 0,
      duration: 500,
      onFadeEnd: (state) => {
        expect(state).toEqual('interrupted');
        func1();
      }
    });
    fader.queueFade({
      targetLevel: 0,
      duration: 500,
      onFadeEnd: (state) => {
        expect(state).toEqual('interrupted');
        func2();
      }
    });
    fader.fadeFrame(100);
    fader.fadeImmediate({
      targetLevel: 1,
      duration: 200,
      onFadeEnd: (state) => {
        expect(state).toEqual('interrupted');
        func3();
      }
    });

    let changed = fader.fadeFrame(100);
    expect(changed).toEqual(true);
    expect(fader.getCurrentLevel()).toBeCloseTo((0.9));

    fader.fadeImmediate({
      targetLevel: 0,
      duration: 100,
      onFadeEnd: (state) => {
        expect(state).toEqual('finished');
        func4();
      }
    });
    fader.queueFade({
      targetLevel: 1,
      duration: 100,
      onFadeEnd: (state) => {
        expect(state).toEqual('finished');
        func5();
      }
    });
    fader.queueFade({
      targetLevel: 0,
      duration: 100,
      onFadeEnd: (state) => {
        func6();
      }
    });
    fader.fadeFrame(100);
    fader.fadeFrame(100);

    expect(func1).toHaveBeenCalled();
    expect(func2).toHaveBeenCalled();
    expect(func3).toHaveBeenCalled();
    expect(func4).toHaveBeenCalled();
    expect(func5).toHaveBeenCalled();
    expect(func6).not.toHaveBeenCalled();
  });
});
