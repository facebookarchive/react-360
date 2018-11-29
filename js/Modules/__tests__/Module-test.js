/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

jest.dontMock('../Module');

const Module = require('../Module').default;

describe('Module', () => {
  it('extracts constants', () => {
    class ModuleSubclass extends Module {
      constructor() {
        super('ModuleSubclass');
        this.flag = true;
        this.count = 5;
        this.obj = {key: 'value'};
      }
    }

    const s = new ModuleSubclass();
    const description = s.__describe();

    expect(Array.isArray(description)).toBe(true);
    expect(description[0]).toBe('ModuleSubclass');
    expect(description[1]).toEqual({
      name: 'ModuleSubclass',
      flag: true,
      count: 5,
      obj: {key: 'value'},
    });
  });

  it('exposes functions', () => {
    class Implementation extends Module {
      constructor() {
        super('Implementation');
      }

      normalMethod(cb) {}

      $promiseMethod(resolve, reject) {}

      otherNormalMethod() {}
    }

    const i = new Implementation();
    const description = i.__describe();

    expect(description[2]).toEqual(['normalMethod', 'promiseMethod', 'otherNormalMethod']);

    expect(description[3]).toEqual([1]);

    expect(description[4]).toEqual([]);
  });

  it('normalizes prefixed names', () => {
    const classicModule = new Module('RCTSomeFunctionality');
    expect(classicModule.getName()).toBe('SomeFunctionality');
    const newModule = new Module('OtherFunctionality');
    expect(newModule.getName()).toBe('OtherFunctionality');
  });
});
