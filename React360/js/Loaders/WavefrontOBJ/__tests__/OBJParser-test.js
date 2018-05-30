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

jest.dontMock('../OBJGroup').dontMock('../OBJParser');

const OBJGroup = require('../OBJGroup').default;
const OBJParser = require('../OBJParser');

describe('OBJParser Utilities', () => {
  it('can read a series of 3 numeric points', () => {
    expect(OBJParser.readPoints(' 1  2  3', 0)).toEqual([1, 2, 3]);
    expect(OBJParser.readPoints('  12 14.5 192.015', 0)).toEqual([12, 14.5, 192.015]);
    expect(() => OBJParser.readPoints(' 145 ', 0)).toThrow(
      'Expected a series of numbers on line 0'
    );
    expect(() => OBJParser.readPoints(' abc def ghi', 0)).toThrow(
      'Expected a series of numbers on line 0'
    );
  });

  it('can read more than 3 points', () => {
    expect(OBJParser.readPoints(' 1 2.3 45 6 78 9.01')).toEqual([1, 2.3, 45, 6, 78, 9.01]);
  });

  it('can read a series of pairs', () => {
    expect(OBJParser.readPairs(' 1/2 34/56 789/102')).toEqual([[1, 2], [34, 56], [789, 102]]);
    expect(OBJParser.readPairs('11/22   ')).toEqual([[11, 22]]);
    expect(() => OBJParser.readPairs(' 11/22  a ')).toThrow();
    expect(() => OBJParser.readPairs('5/z')).toThrow();
    expect(() => OBJParser.readPairs(' not a pair')).toThrow();
  });

  it('can read a series of triplets', () => {
    expect(OBJParser.readTriplets(' 1/2/3 45/67/89 10/11/12')).toEqual([
      [1, 2, 3],
      [45, 67, 89],
      [10, 11, 12],
    ]);
    expect(OBJParser.readTriplets('1 2')).toEqual([[1, 0, 0], [2, 0, 0]]);
    expect(OBJParser.readTriplets('1/2 3/4')).toEqual([[1, 2, 0], [3, 4, 0]]);
    expect(OBJParser.readTriplets('1//2 3//4')).toEqual([[1, 0, 2], [3, 0, 4]]);
    expect(() => OBJParser.readTriplets(' 11/22  a ')).toThrow();
    expect(() => OBJParser.readTriplets('5/z/6')).toThrow();
    expect(() => OBJParser.readTriplets(' not a triplet')).toThrow();
  });
});

describe('OBJParser', () => {
  it('ignores empty lines', () => {
    expect(() => OBJParser.readLine(null, '  \t ', 0)).not.toThrow();
  });

  it('ignores comments', () => {
    expect(() => OBJParser.readLine(null, '# f 1 2 3', 0)).not.toThrow();
  });

  it('reads vertices', () => {
    const vertices = [];
    const obj = new OBJGroup(vertices, [], []);
    const state = {currentObject: obj, vertices: vertices};
    OBJParser.readLine(state, 'v 1.0 2.0 40.0');
    OBJParser.readLine(state, '\tv\t\t3.3 3.3 3.3\t');
    expect(vertices).toEqual([[1.0, 2.0, 40.0], [3.3, 3.3, 3.3]]);
  });

  it('can read entire files', done => {
    OBJParser.readOBJFile(
      `### My Cube
# Vertices:

v 0 0 0
v 10 0 0
v 10 10 0
v 0 10 0
v 0 0 10
v 10 0 10
v 10 10 10
v 0 10 10

# Texture coords:
vt 0.0 0.0
vt 0.0 10.0
vt 10.0 10.0
vt 10.0 0.0

# Faces:
# (got lazy, only drew one)
f 1/1 3/3 4/2
f 1/1 2/4 3/3
# DONE`
    )
      .then(state => {
        expect(state.objects.length).toBe(1);
        expect(state.currentObject).toBe(state.objects[0]);
        const obj = state.currentObject;
        expect(obj.geometry.position).toEqual([0, 0, 0, 10, 10, 0, 0, 10, 0, 10, 0, 0]);
        expect(obj.geometry.index).toEqual([0, 1, 2, 0, 3, 1]);
        expect(obj.geometry.uv).toEqual([0, 0, 10, 10, 0, 10, 10, 0]);
      })
      .then(done, err => console.error(err));
  });

  it('can read entire files with materials', done => {
    OBJParser.readOBJFile(
      `# Octahedron
mtllib octa.mtl
o octahedron1
#6 vertices, 8 faces
v 2.00000000 0.0000000e+0 0.0000000e+0
v -2.00000000 0.0000000e+0 0.0000000e+0
v 0.0000000e+0 2.00000000 0.0000000e+0
v 0.0000000e+0 -2.00000000 0.0000000e+0
v 0.0000000e+0 0.0000000e+0 2.00000000
v 0.0000000e+0 0.0000000e+0 -2.00000000
vn 1.00000000 0.0000000e+0 0.0000000e+0
vn -1.00000000 0.0000000e+0 0.0000000e+0
vn 0.0000000e+0 1.00000000 0.0000000e+0
vn 0.0000000e+0 -1.00000000 0.0000000e+0
vn 0.0000000e+0 0.0000000e+0 1.00000000
vn 0.0000000e+0 0.0000000e+0 -1.00000000
g octahedron1_Blue
usemtl Blue
s 1
f 1//1 6//6 3//3
f 4//4 5//5 2//2
g octahedron1_Green
usemtl Green
s 1
f 1//1 5//5 4//4
f 3//3 6//6 2//2
g octahedron1_Purple
usemtl Purple
s 1
f 4//4 6//6 1//1
g octahedron1_Red
usemtl Red
s 1
f 2//2 6//6 4//4
f 3//3 5//5 1//1
g octahedron1_Yellow
usemtl Yellow
s 1
f 2//2 5//5 3//3
`
    )
      .then(state => {
        expect(state.materialLibraries).toEqual(['octa.mtl']);
        expect(state.objects.length).toBe(7);
        expect(state.objects[1].name).toBe('octahedron1');
        expect(state.objects[1].geometry.position.length).toBe(0);
        expect(state.objects[2].name).toBe('octahedron1_Blue');
        expect(state.objects[2].geometry.position).toEqual([
          2,
          0,
          0,
          0,
          0,
          -2,
          0,
          2,
          0,
          0,
          -2,
          0,
          0,
          0,
          2,
          -2,
          0,
          0,
        ]);
        expect(state.objects[2].smooth).toBe(true);
        expect(state.objects[3].name).toBe('octahedron1_Green');
        expect(state.objects[3].geometry.position).toEqual([
          2,
          0,
          0,
          0,
          0,
          2,
          0,
          -2,
          0,
          0,
          2,
          0,
          0,
          0,
          -2,
          -2,
          0,
          0,
        ]);
        expect(state.objects[3].smooth).toBe(true);
        expect(state.objects[4].name).toBe('octahedron1_Purple');
        expect(state.objects[4].geometry.position).toEqual([0, -2, 0, 0, 0, -2, 2, 0, 0]);
        expect(state.objects[4].smooth).toBe(true);
        expect(state.objects[5].name).toBe('octahedron1_Red');
        expect(state.objects[5].geometry.position).toEqual([
          -2,
          0,
          0,
          0,
          0,
          -2,
          0,
          -2,
          0,
          0,
          2,
          0,
          0,
          0,
          2,
          2,
          0,
          0,
        ]);
        expect(state.objects[5].smooth).toBe(true);
        expect(state.objects[6].name).toBe('octahedron1_Yellow');
        expect(state.objects[6].geometry.position).toEqual([-2, 0, 0, 0, 0, 2, 0, 2, 0]);
        expect(state.objects[6].smooth).toBe(true);

        expect(state.objects[2].materials[0].name).toBe('Blue');
        expect(state.objects[2].materials[0].lib).toBe('octa.mtl');
        expect(state.objects[2].materials[0].startGroup).toBe(0);
        expect(state.objects[2].materials[0].endGroup).toBe(-1);
        expect(state.objects[3].materials[1].name).toBe('Green');
        expect(state.objects[3].materials[1].lib).toBe('octa.mtl');
        expect(state.objects[3].materials[1].startGroup).toBe(0);
        expect(state.objects[3].materials[1].endGroup).toBe(-1);
        expect(state.objects[4].materials[1].name).toBe('Purple');
        expect(state.objects[4].materials[1].lib).toBe('octa.mtl');
        expect(state.objects[4].materials[1].startGroup).toBe(0);
        expect(state.objects[4].materials[1].endGroup).toBe(-1);
        expect(state.objects[5].materials[1].name).toBe('Red');
        expect(state.objects[5].materials[1].lib).toBe('octa.mtl');
        expect(state.objects[5].materials[1].startGroup).toBe(0);
        expect(state.objects[5].materials[1].endGroup).toBe(-1);
        expect(state.objects[6].materials[1].name).toBe('Yellow');
        expect(state.objects[6].materials[1].lib).toBe('octa.mtl');
        expect(state.objects[6].materials[1].startGroup).toBe(0);
        expect(state.objects[6].materials[1].endGroup).toBe(-1);
      })
      .then(done, err => console.error(err));
  });
});
