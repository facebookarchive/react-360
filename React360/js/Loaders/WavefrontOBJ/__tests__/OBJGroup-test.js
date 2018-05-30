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

jest.dontMock('../OBJGroup');

const OBJGroup = require('../OBJGroup').default;

function generateOBJ() {
  const vertices = [];
  const textureCoords = [];
  const normals = [];
  const obj = new OBJGroup(vertices, textureCoords, normals);
  vertices.push([0, 0, 0]);
  vertices.push([1, 0, 0]);
  vertices.push([0, 1, 0]);
  vertices.push([1, 1, 0]);
  vertices.push([0, 0, 1]);
  vertices.push([1, 0, 1]);
  vertices.push([0, 1, 1]);
  vertices.push([1, 1, 1]);

  textureCoords.push([0, 0]);
  textureCoords.push([0, 10]);
  textureCoords.push([10, 0]);
  textureCoords.push([10, 10]);

  normals.push([1, 0, 0]);
  normals.push([0, 1, 0]);
  normals.push([0, 0, 1]);

  return obj;
}

describe('OBJGroup', () => {
  it('can add triangular faces', () => {
    const obj = generateOBJ();
    obj.addFace([[1, 1, 3], [2, 3, 3], [4, 4, 3]]);
    expect(obj.geometry.hasUVs).toBe(true);
    expect(obj.geometry.hasNormals).toBe(true);
    expect(obj.geometry.position).toEqual([0, 0, 0, 1, 0, 0, 1, 1, 0]);
    expect(obj.geometry.uv).toEqual([0, 0, 10, 0, 10, 10]);
    expect(obj.geometry.normal).toEqual([0, 0, 1, 0, 0, 1, 0, 0, 1]);
  });

  it('can add arbitrarily-sized faces', () => {
    const quad = generateOBJ();
    quad.addFace([[1, 1, 3], [2, 3, 3], [4, 4, 3], [3, 2, 3]]);
    expect(quad.geometry.position).toEqual([0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0]);
    expect(quad.geometry.uv).toEqual([0, 0, 10, 0, 10, 10, 0, 10]);
    expect(quad.geometry.normal).toEqual([0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1]);
    expect(quad.geometry.index).toEqual([0, 1, 2, 0, 2, 3]);

    const hex = new OBJGroup(
      [[-2, 4, 0], [-6, 0, 0], [-2, -4, 0], [2, -4, 0], [6, 0, 0], [2, 4, 0]],
      [],
      []
    );

    hex.addFace([[1], [2], [3], [4], [5], [6]]);

    expect(hex.geometry.position).toEqual([
      -2,
      4,
      0,
      -6,
      0,
      0,
      -2,
      -4,
      0,
      2,
      -4,
      0,
      6,
      0,
      0,
      2,
      4,
      0,
    ]);

    expect(hex.geometry.index).toEqual([0, 1, 2, 0, 2, 3, 0, 3, 4, 0, 4, 5]);
  });

  it('can add faces with missing normals', () => {
    const obj = generateOBJ();
    obj.addFace([[1, 1], [2, 3], [4, 4]]);
    expect(obj.geometry.hasUVs).toBe(true);
    expect(obj.geometry.hasNormals).toBe(false);
    expect(obj.geometry.position).toEqual([0, 0, 0, 1, 0, 0, 1, 1, 0]);
    expect(obj.geometry.uv).toEqual([0, 0, 10, 0, 10, 10]);
    expect(obj.geometry.normal).toEqual([0, 0, 1, 0, 0, 1, 0, 0, 1]);
  });

  it('can add faces with missing uv values', () => {
    const obj = generateOBJ();
    obj.addFace([[1, 0, 1], [2, 0, 1], [4, 0, 1]]);
    expect(obj.geometry.hasUVs).toBe(false);
    expect(obj.geometry.hasNormals).toBe(true);
    expect(obj.geometry.position).toEqual([0, 0, 0, 1, 0, 0, 1, 1, 0]);
    expect(obj.geometry.uv).toEqual([0, 0, 0, 0, 0, 0]);
    expect(obj.geometry.normal).toEqual([1, 0, 0, 1, 0, 0, 1, 0, 0]);
  });

  it('handles mixed uv or normal values', () => {
    let obj = generateOBJ();
    obj.addFace([[1, 0, 1], [2, 0, 1], [4, 2, 1]]);
    expect(obj.geometry.hasUVs).toBe(true);
    expect(obj.geometry.uv).toEqual([0, 0, 0, 0, 0, 10]);

    obj = generateOBJ();
    obj.addFace([[1, 2], [2, 2], [4, 2, 1]]);
    expect(obj.geometry.hasNormals).toBe(true);
    expect(obj.geometry.normal).toEqual([0, 0, 1, 0, 0, 1, 1, 0, 0]);
  });

  it('can add faces with only position values', () => {
    let obj = generateOBJ();
    obj.addFace([[1], [2], [4]]);
    expect(obj.geometry.hasUVs).toBe(false);
    expect(obj.geometry.hasNormals).toBe(false);
    expect(obj.geometry.position).toEqual([0, 0, 0, 1, 0, 0, 1, 1, 0]);
    expect(obj.geometry.uv).toEqual([0, 0, 0, 0, 0, 0]);
    expect(obj.geometry.normal).toEqual([0, 0, 1, 0, 0, 1, 0, 0, 1]);
  });
});
