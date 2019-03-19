/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

jest.dontMock('../Program');

const Program = require('../Program').default;

describe('Program', () => {
  test('shader definitions', () => {
    const prog = new Program({}).addShader('code', 0);
    expect(prog._shaders[0].code).toBe('code');

    prog.addShader('more code', 0, ['FOO', 'BAR']);
    expect(prog._shaders[1].code).toBe('#define FOO\n#define BAR\nmore code');

    prog.addShader('#version 300 es\n\nfancy code', 0, ['IMAGE']);
    expect(prog._shaders[2].code).toBe('#version 300 es\n#define IMAGE\n\nfancy code');
  });
});
