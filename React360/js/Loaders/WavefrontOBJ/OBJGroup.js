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

import type {Face, TextureCoords, Vertex, MultiMaterial} from './OBJTypes';

type Geometry = {
  position: Array<number>,
  normal: Array<number>,
  uv: Array<number>,
  color: Array<number>,
  hasNormals: boolean,
  hasUVs: boolean,
  hasVertexColors: boolean,
  index: Array<number>,
  indexedPositions: {[key: string]: number},
};

/**
 * OBJGroup represents a named group of vertices and faces, as denoted by the
 * 'g' or 'o' declarations in an OBJ file.
 * It contains references to all vertices, texture coordinates, and normals
 * declared for that object, as well as the geometry information that is passed
 * to GL. It contains references to materials, including the faces where they
 * began and ended, so that multi-materials can be supported.
 */
export default class OBJGroup {
  name: string;
  vertices: Array<Vertex>;
  textureCoords: Array<TextureCoords>;
  normals: Array<Vertex>;
  geometry: Geometry;
  smooth: boolean;
  materials: Array<MultiMaterial>;

  constructor(
    vertices: Array<Vertex>,
    textureCoords: Array<TextureCoords>,
    normals: Array<Vertex>,
    name: string = ''
  ) {
    this.name = name;
    this.vertices = vertices;
    this.textureCoords = textureCoords;
    this.normals = normals;
    this.smooth = false;
    this.materials = [];
    this.geometry = {
      position: [],
      normal: [],
      uv: [],
      color: [],
      indexedPositions: {}, // Map of unique vertex hashes to their known index
      index: [],
      hasNormals: false,
      hasUVs: false,
      hasVertexColors: false,
    };
  }

  setSmoothing(smooth: boolean) {
    this.smooth = smooth;
  }

  addFace(face: Face) {
    const positions = [];
    const uvs = [];
    const normals = [];
    for (let i = 0; i < face.length; i++) {
      positions.push(face[i][0] < 0 ? face[i][0] + this.vertices.length : face[i][0] - 1);
      if (!face[i][1]) {
        uvs.push(-1);
      } else {
        uvs.push(face[i][1] < 0 ? face[i][1] + this.textureCoords.length : face[i][1] - 1);
        this.geometry.hasUVs = true;
      }
      if (!face[i][2]) {
        normals.push(-1);
      } else {
        normals.push(face[i][2] < 0 ? face[i][2] + this.normals.length : face[i][2] - 1);
        this.geometry.hasNormals = true;
      }
    }
    // Implement the face as a series of triangles
    for (let iter = 1; iter + 1 < face.length; iter++) {
      this._pushGeometryPoint(positions[0], uvs[0], normals[0]);
      this._pushGeometryPoint(positions[iter], uvs[iter], normals[iter]);
      this._pushGeometryPoint(positions[iter + 1], uvs[iter + 1], normals[iter + 1]);
    }
  }

  /**
   * Set a new material for the upcoming face declarations. Each material is
   * associated with the index of the first face it applies to, and the last
   * face. This is used to apply multiple materials to a single mesh.
   */
  addMaterial(name: string, lib: string) {
    const currentGroup = this.geometry.index.length;
    if (this.materials.length > 0) {
      const last = this.materials[this.materials.length - 1];
      last.endGroup = currentGroup;
    }
    this.materials.push({
      name,
      lib,
      startGroup: currentGroup,
      endGroup: -1,
    });
  }

  _pushGeometryPoint(position: number, uv: number, normal: number) {
    const vertex = this.vertices[position];
    const textureCoord = uv < 0 ? [0, 0] : this.textureCoords[uv];
    const norm = normal < 0 ? [0, 0, 1] : this.normals[normal];
    const key = [position, uv, normal].join(',');
    const knownIndex = this.geometry.indexedPositions[key];

    if (knownIndex === undefined) {
      // We have not encountered this vertex yet, so put it in position
      const location = (this.geometry.position.length / 3) | 0;
      this.geometry.position.push(vertex[0]);
      this.geometry.position.push(vertex[1]);
      this.geometry.position.push(vertex[2]);
      this.geometry.uv.push(textureCoord[0]);
      this.geometry.uv.push(textureCoord[1]);
      this.geometry.normal.push(norm[0]);
      this.geometry.normal.push(norm[1]);
      this.geometry.normal.push(norm[2]);
      this.geometry.index.push(location);
      this.geometry.indexedPositions[key] = location;

      if (vertex.length >= 6) {
        this.geometry.color.push(vertex[3]);
        this.geometry.color.push(vertex[4]);
        this.geometry.color.push(vertex[5]);
        this.geometry.hasVertexColors = true;
      }
    } else {
      this.geometry.index.push(knownIndex);
    }
  }
}
