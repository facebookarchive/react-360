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

/**
 * OBJParser handles the parsing of Waveform OBJ files.
 * It reads through the string contents of an OBJ file and produces a state
 * object containing information declared in the file. This can be consumed by
 * external loaders to create proper meshes for any rendering engine.
 */

import OBJGroup from './OBJGroup';

import type {OBJParserState} from './OBJTypes';

const POINTS_TEST = /^\s+(-?[\d.eE+-]+)\s+(-?[\d.eE+-]+)\s+(-?[\d.eE+-]+)/;
const TEXTURE_POINTS_TEST = /^\s+(-?[\d.eE+-]+)\s+(-?[\d.eE+-]+)/;
const PAIR_TEST = /^\s*(-?\d+)(\/-?\d+)?\s*/;
const TRIPLET_TEST = /^\s*(-?\d+)\/?(-?\d+)?(\/-?\d+)?\s*/;
const SMOOTHING_TEST = /^\s*(\d+|on|off)/;

/**
 * readPoints reads a series of three floating-point numbers, returning them
 * as an array. It throws an error if anything unexpected is encountered, or if
 * there are not three numbers to read.
 */
export function readPoints(
  remainder: string,
  lineNumber: number,
): Array<number> {
  const match = remainder.match(POINTS_TEST);
  if (!match) {
    throw new Error(`Expected a series of numbers on line ${lineNumber}`);
  }
  const points = [
    parseFloat(match[1]),
    parseFloat(match[2]),
    parseFloat(match[3]),
  ];
  if (isNaN(points[0]) || isNaN(points[1]) || isNaN(points[2])) {
    throw new Error(`Invalid number on line ${lineNumber}`);
  }
  if (match[0].length < remainder.length) {
    // There are potentially more points to read
    // We only want to support the 6-values case, which is used for vertex color
    const colorMatch = remainder.substr(match[0].length).match(POINTS_TEST);
    if (colorMatch) {
      const color = [
        parseFloat(colorMatch[1]),
        parseFloat(colorMatch[2]),
        parseFloat(colorMatch[3]),
      ];
      if (isNaN(color[0]) || isNaN(color[1]) || isNaN(color[2])) {
        throw new Error(`Invalid number on line ${lineNumber}`);
      }
      points.push(color[0], color[1], color[2]);
    }
  }
  return points;
}

/**
 * readTexturePoints reads two floating-point numbers from a substring,
 * returning them as an array. It throws an error if anything unexpected is
 * encountered, or if there are not two numbers to read.
 */
export function readTexturePoints(
  remainder: string,
  lineNumber: number,
): [number, number] {
  const match = remainder.match(TEXTURE_POINTS_TEST);
  if (!match) {
    throw new Error(`Expected a series of numbers on line ${lineNumber}`);
  }
  const points = [parseFloat(match[1]), parseFloat(match[2])];
  if (isNaN(points[0]) || isNaN(points[1])) {
    throw new Error(`Invalid number on line ${lineNumber}`);
  }
  return points;
}

/**
 * readPairs parses a series of numbers of the format 'a/b', where b may not be
 * provided. This is used to parse the vertex index and potential uv index for
 * a series of points in a line declaration.
 * It returns the pairs as an array of length-2 arrays, and throws if anything
 * unexpected is encountered.
 */
export function readPairs(
  rawRemainder: string,
  lineNumber: number,
): Array<[number, number]> {
  let remainder = rawRemainder;
  const pairs = [];
  while (remainder.length > 0) {
    const match = remainder.match(PAIR_TEST);
    if (!match) {
      throw new Error(`Expected a vertex id on line ${lineNumber}`);
    }
    const fullMatch = match[0];
    const vertex = parseInt(match[1], 10);
    const texture = match[2] ? parseInt(match[2].substr(1), 10) : 0;
    if (isNaN(vertex)) {
      throw new Error(`Invalid vertex id on line ${lineNumber}`);
    }
    if (isNaN(texture)) {
      throw new Error(`Invalid texture point id on line ${lineNumber}`);
    }
    pairs.push([vertex, texture]);
    remainder = remainder.substr(fullMatch.length);
  }
  return pairs;
}

/**
 * readTriplets parses a series of numbers of the format 'a/b/c', where b and c
 * may not be provided. This is used to parse the vertex index, potential uv
 * index, and potential normal index for a series of points in a face
 * declaration.
 * It returns the triplets as an array of length-3 arrays, and throws if
 * anything unexpected is encountered.
 */
export function readTriplets(
  rawRemainder: string,
  lineNumber: number,
): Array<[number, number, number]> {
  let remainder = rawRemainder;
  const triplets = [];
  while (remainder.length > 0) {
    const match = remainder.match(TRIPLET_TEST);
    if (!match) {
      throw new Error(`Expected a vertex id on line ${lineNumber}`);
    }
    const fullMatch = match[0];
    const vertex = parseInt(match[1], 10);
    const texture = match[2] ? parseInt(match[2], 10) : 0;
    const normal = match[3] ? parseInt(match[3].substr(1), 10) : 0;
    if (isNaN(vertex)) {
      throw new Error(`Invalid vertex id on line ${lineNumber}`);
    }
    if (isNaN(texture)) {
      throw new Error(`Invalid texture point id on line ${lineNumber}`);
    }
    if (isNaN(normal)) {
      throw new Error(`Invalid normal id on line ${lineNumber}`);
    }
    triplets.push([vertex, texture, normal]);
    remainder = remainder.substr(fullMatch.length);
  }
  return triplets;
}

/**
 * readLine parses a single line from an OBJ file. It updates the state object
 * with any declarations encountered on that line.
 */
export function readLine(
  state: OBJParserState,
  line: string,
  lineNumber: number,
) {
  let index = 0;
  const length = line.length;
  while ((index < length && line[index] === ' ') || line[index] === '\t') {
    index++;
  }
  if (index >= length) {
    return;
  }
  const first = line[index];
  if (first === '#') {
    return;
  }
  if (first === 'v') {
    if (line[index + 1] === ' ' || line[index + 1] === '\t') {
      // Vertex declaration
      const points = readPoints(line.substr(index + 1), lineNumber);
      state.vertices.push(points);
      return;
    }
    if (line[index + 1] === 'n') {
      // Normal vector
      const points = readPoints(line.substr(index + 2), lineNumber);
      const normal = [points[0], points[1], points[2]];
      state.normals.push(normal);
      return;
    }
    if (line[index + 1] === 't') {
      // Texture vertex
      const points = readTexturePoints(line.substr(index + 2), lineNumber);
      state.textureCoords.push(points);
      return;
    }
    if (line[index + 1] === 'p') {
      // Parametric curve point
      throw new Error('Parametric curve points (vp) are currently unsupported');
    }
    throw new Error(
      `Unknown identifier: v${index + 1 < line.length ? line[index + 1] : ''}`,
    );
  }
  if (first === 'f') {
    // Face declaration
    if (line[index + 1] === ' ' || line[index + 1] === '\t') {
      const triplets = readTriplets(line.substr(index + 1), lineNumber);
      state.currentObject.addFace(triplets);
      return;
    }
    throw new Error(
      `Unknown identifier: f${index + 1 < line.length ? line[index + 1] : ''}`,
    );
  }
  if (first === 'l') {
    if (line[index + 1] === ' ' || line[index + 1] === '\t') {
      // const pairs = readPairs(line.substr(index + 1), lineNumber);
      // Lines are not currently supported
      // state.currentObject.addLine(pairs);
      return;
    }
    throw new Error(
      `Unknown identifier: l${index + 1 < line.length ? line[index + 1] : ''}`,
    );
  }
  if (first === 's') {
    if (line[index + 1] === ' ' || line[index + 1] === '\t') {
      // Smoothing group
      const match = line.substr(index + 1).match(SMOOTHING_TEST);
      if (!match) {
        throw new Error(`Invalid smoothing flag on line ${lineNumber}`);
      }
      const flag = match[1];
      state.currentObject.setSmoothing(flag !== 'off');
      return;
    }
    throw new Error(
      `Unknown identifier: s${index + 1 < line.length ? line[index + 1] : ''}`,
    );
  }
  if (first === 'g' || first === 'o') {
    if (line[index + 1] === ' ' || line[index + 1] === '\t') {
      // New object group
      const name = line.substr(2).trim();
      const obj = new OBJGroup(
        state.vertices,
        state.textureCoords,
        state.normals,
        name,
      );
      if (state.currentObject && state.currentObject.materials.length > 0) {
        // Inherit the last material from the last object
        const inherited =
          state.currentObject.materials[
            state.currentObject.materials.length - 1
          ];
        obj.addMaterial(inherited.name, inherited.lib);
      }
      state.objects.push(obj);
      state.currentObject = obj;
      return;
    }
  }
  if (first === 'm') {
    if (line.substr(index, 6) === 'mtllib') {
      // Reference to an external MTL file
      const path = line.substr(index + 7).trim();
      if (path.length < 1) {
        throw new Error(
          `mtllib must provide a file path on line ${lineNumber}`,
        );
      }
      state.materialLibraries.push(path);
      return;
    }
    throw new Error('Unknown identifier: m');
  }
  if (first === 'u') {
    if (line.substr(index, 6) === 'usemtl') {
      // Reference to a named material
      const mtl = line.substr(index + 7).trim();
      if (mtl.length < 1) {
        throw new Error(
          `usemtl must provide a material name on line ${lineNumber}`,
        );
      }
      const lib = state.materialLibraries[state.materialLibraries.length - 1];
      state.currentObject.addMaterial(mtl, lib);
      return;
    }
    throw new Error('Unknown identifier: u');
  }
}

export function readOBJFile(rawData: string): Promise<OBJParserState> {
  let data = rawData;
  const vertices = [];
  const textureCoords = [];
  const normals = [];
  const starterObject = new OBJGroup(vertices, textureCoords, normals); // In case no object group is declared, we start with something
  const state = {
    vertices: vertices,
    textureCoords: textureCoords,
    normals: normals,
    materialLibraries: [],
    objects: [starterObject],
    currentObject: starterObject,
  };
  // Normalize linebreaks
  if (data.indexOf('\r\n') > -1) {
    data = data.replace('\r\n', '\n');
  }
  const lines = data.split('\n');
  const length = lines.length;
  let index = 0;
  return new Promise((resolve, reject) => {
    const chunk = function() {
      const start = Date.now();
      while (Date.now() - start < 16 && index < length) {
        try {
          readLine(state, lines[index], index + 1);
          index++;
        } catch (e) {
          reject(e);
        }
      }
      if (index >= length) {
        resolve(state);
      } else {
        setTimeout(chunk, 0);
      }
    };
    chunk();
  });
}
