/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

/* eslint-disable */

'use strict';

jest.dontMock('../MTLParser');

const MTLParser = require('../MTLParser');

describe('MTLParser Utilities', () => {
  it('can read channel values', () => {
    expect(MTLParser.readChannels(' 0.0 0.0 1.0', 0)).toEqual([0, 0, 1]);
    expect(MTLParser.readChannels(' 0.333 0.333 0.333', 0)).toEqual([0.333, 0.333, 0.333]);
    expect(MTLParser.readChannels(' 1.0001 0.5 0.75', 0)).toEqual([1, 0.5, 0.75]);
  });

  it('can read texture options', () => {
    let tex = MTLParser.readTextureOptions(' -o 1 0 1 -blendv off mytex.png');
    expect(tex.file).toBe('mytex.png');
    expect(tex.options.blendv).toBe(false);
    expect(tex.options.origin).toEqual([1, 0, 1]);

    tex = MTLParser.readTextureOptions(' -s 20.0 -imfchan r -o 2.0 4.0 mytex.png');
    expect(tex.file).toBe('mytex.png');
    expect(tex.options.scale).toEqual([20.0, 1, 1]);
    expect(tex.options.origin).toEqual([2.0, 4.0, 0]);
    expect(tex.options.imfchan).toBe('r');

    tex = MTLParser.readTextureOptions('');
    expect(tex.file).toBe('');
  });
});

describe('MTLParser', () => {
  it('ignores empty lines', () => {
    expect(() => MTLParser.readLine(null, '  \t ', 0)).not.toThrow();
  });

  it('ignores comments', () => {
    expect(() => MTLParser.readLine(null, '# Ka 0.5 0.5 0.5', 0)).not.toThrow();
  });

  it('can read entire files', done => {
    MTLParser.readMTLFile(
      `# octahedron.mtl
newmtl Blue
Ns 0.0
d 1.0
illum 2
Kd 0.03333333333333333 0.47333333333333333 1.0
Ka 1.0 1.0 1.0
Ks 0.0 0.0 0.0
Ke 0.0 0.0 0.0

newmtl Green
Ns 0.0
d 1.0
illum 2
Kd 0.14666666666666667 0.8466666666666667 0.0
Ka 1.0 1.0 1.0
Ks 0.0 0.0 0.0
Ke 0.0 0.0 0.0

newmtl Purple
Ns 0.0
d 1.0
illum 2
Kd 0.82 0.0 1.0
Ka 1.0 1.0 1.0
Ks 0.0 0.0 0.0
Ke 0.0 0.0 0.0

newmtl Red
Ns 30.666666666666664
d 1.0
illum 2
Kd 1.0 0.08666666666666667 0.08666666666666667
Ka 1.0 1.0 1.0
Ks 0.04762 0.04762 0.04762
Ke 0.22 0.5204799999999999 0.5204799999999999

newmtl Yellow
Ns 0.0
d 1.0
illum 2
Kd 1.0 1.0 0.0
Ka 1.0 1.0 1.0
Ks 0.0 0.0 0.0
Ke 0.0 0.0 0.0
`
    )
      .then(state => {
        expect(state.length).toBe(5);
        expect(state[0].name).toBe('Blue');
        expect(state[0].specularExp).toBe(0.0);
        expect(state[0].opacity).toBe(1.0);
        expect(state[0].illum).toBe(2);
        expect(state[0].diffuse).toEqual([0.03333333333333333, 0.47333333333333333, 1.0]);
        expect(state[0].ambient).toEqual([1.0, 1.0, 1.0]);
        expect(state[0].specular).toEqual([0.0, 0.0, 0.0]);
        expect(state[0].emissive).toEqual([0.0, 0.0, 0.0]);

        expect(state[1].name).toBe('Green');
        expect(state[1].specularExp).toBe(0.0);
        expect(state[1].opacity).toBe(1.0);
        expect(state[1].illum).toBe(2);
        expect(state[1].diffuse).toEqual([0.14666666666666667, 0.8466666666666667, 0.0]);
        expect(state[1].ambient).toEqual([1.0, 1.0, 1.0]);
        expect(state[1].specular).toEqual([0.0, 0.0, 0.0]);
        expect(state[1].emissive).toEqual([0.0, 0.0, 0.0]);

        expect(state[2].name).toBe('Purple');
        expect(state[2].specularExp).toBe(0.0);
        expect(state[2].opacity).toBe(1.0);
        expect(state[2].illum).toBe(2);
        expect(state[2].diffuse).toEqual([0.82, 0.0, 1.0]);
        expect(state[2].ambient).toEqual([1.0, 1.0, 1.0]);
        expect(state[2].specular).toEqual([0.0, 0.0, 0.0]);
        expect(state[2].emissive).toEqual([0.0, 0.0, 0.0]);

        expect(state[3].name).toBe('Red');
        expect(state[3].specularExp).toBe(30.666666666666664);
        expect(state[3].opacity).toBe(1.0);
        expect(state[3].illum).toBe(2);
        expect(state[3].diffuse).toEqual([1.0, 0.08666666666666667, 0.08666666666666667]);
        expect(state[3].ambient).toEqual([1.0, 1.0, 1.0]);
        expect(state[3].specular).toEqual([0.04762, 0.04762, 0.04762]);
        expect(state[3].emissive).toEqual([0.22, 0.5204799999999999, 0.5204799999999999]);

        expect(state[4].name).toBe('Yellow');
        expect(state[4].specularExp).toBe(0.0);
        expect(state[4].opacity).toBe(1.0);
        expect(state[4].illum).toBe(2);
        expect(state[4].diffuse).toEqual([1.0, 1.0, 0.0]);
        expect(state[4].ambient).toEqual([1.0, 1.0, 1.0]);
        expect(state[4].specular).toEqual([0.0, 0.0, 0.0]);
        expect(state[4].emissive).toEqual([0.0, 0.0, 0.0]);
      })
      .then(() => {
        return MTLParser.readMTLFile(
          `# Multimapped object
#
#
newmtl Head
map_kd head.jpg
Ka  0.6 0.4 0.2
Kd  0.4 0.8 0.2
Ks  0.9 0.3 0.3
Tr  0.0
Ns  1.0
illum 2
#
newmtl Arms
map_kd arms.jpg
Ka  0.6 0.4 0.2
Kd  0.4 0.8 0.2
Ks  0.9 0.3 0.3
Tr  0.0
Ns  1.0
illum 2
#
newmtl Legs
map_kd legs.jpg
Ka  0.2 0.9 0.3
Kd  1.2 0.9 0.3
Ks  0.3 0.3 1.0
Tr  0.0
Ns  6.0
illum 2
#
newmtl bump
map_bump bump.jpg
#
newmtl othertex
bump bump.jpg
disp disp.jpg
decal decal.jpg
#
# END`
        );
      })
      .then(state => {
        expect(state.length).toBe(5);
        expect(state[0].name).toBe('Head');
        expect(state[0].textureMap.diffuse.file).toBe('head.jpg');
        expect(state[0].ambient).toEqual([0.6, 0.4, 0.2]);
        expect(state[0].diffuse).toEqual([0.4, 0.8, 0.2]);
        expect(state[0].specular).toEqual([0.9, 0.3, 0.3]);
        expect(state[0].opacity).toBe(1.0);
        expect(state[0].specularExp).toBe(1.0);
        expect(state[0].illum).toBe(2);

        expect(state[1].name).toBe('Arms');
        expect(state[1].textureMap.diffuse.file).toBe('arms.jpg');
        expect(state[1].ambient).toEqual([0.6, 0.4, 0.2]);
        expect(state[1].diffuse).toEqual([0.4, 0.8, 0.2]);
        expect(state[1].specular).toEqual([0.9, 0.3, 0.3]);
        expect(state[1].opacity).toBe(1.0);
        expect(state[1].specularExp).toBe(1.0);
        expect(state[1].illum).toBe(2);

        expect(state[2].name).toBe('Legs');
        expect(state[2].textureMap.diffuse.file).toBe('legs.jpg');
        expect(state[2].ambient).toEqual([0.2, 0.9, 0.3]);
        expect(state[2].diffuse).toEqual([1.0, 0.9, 0.3]);
        expect(state[2].specular).toEqual([0.3, 0.3, 1.0]);
        expect(state[2].opacity).toBe(1.0);
        expect(state[2].specularExp).toBe(6.0);
        expect(state[2].illum).toBe(2);

        expect(state[3].name).toBe('bump');
        expect(state[3].textureMap.bump.file).toBe('bump.jpg');

        expect(state[4].name).toBe('othertex');
        expect(state[4].textureMap.bump.file).toBe('bump.jpg');
        expect(state[4].textureMap.displacement.file).toBe('disp.jpg');
        expect(state[4].textureMap.decal.file).toBe('decal.jpg');
      })
      .then(done, err => console.error(err));
  });
});
