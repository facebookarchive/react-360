/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

jest.dontMock('../ProgramManager');

const ProgramManager = require('../ProgramManager').default;

describe('ProgramManager', () => {
  test('constructs one program for each context', () => {
    const generator = _ => ({});
    const pm = new ProgramManager(generator);
    const gl1 = {};
    const prog1 = pm.getProgram(gl1);
    const prog2 = pm.getProgram(gl1);
    expect(prog1).toBe(prog2);
    const gl2 = {};
    const prog3 = pm.getProgram(gl2);
    expect(prog1).not.toBe(prog3);
  });
});
