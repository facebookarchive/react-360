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

import * as THREE from 'three';

export default class CubemapGeometry extends THREE.BufferGeometry {
  _size: number;
  _columns: number;
  _rows: number;
  _expansionCoef: number;

  constructor(size: number, columns: number, rows: number, expansionCoef: number) {
    super();

    this._size = size || 1;
    this._columns = columns || 3;
    this._rows = rows || 6 / this._columns;
    this._expansionCoef = expansionCoef || 1.01;
    const eps = (this._expansionCoef - 1) / 2;

    const halfSide = this._size / 2;
    const vertexCount = 24;
    const vs = [5, 1, 3, 7, 0, 4, 6, 2, 6, 7, 3, 2, 0, 1, 5, 4, 4, 5, 7, 6, 1, 0, 2, 3];
    const positions = new Float32Array(vertexCount * 3);
    const uv0 = new Float32Array(vertexCount * 2);
    const indices = new Uint32Array(36);

    for (let i = 0; i < vertexCount; i++) {
      const v = vs[i];
      positions[i * 3 + 0] = (((v >> 2) & 1) * 2 - 1) * halfSide;
      positions[i * 3 + 1] = (((v >> 1) & 1) * 2 - 1) * halfSide;
      positions[i * 3 + 2] = ((v & 1) * 2 - 1) * halfSide;
    }

    const w = 1.0 / this._columns;
    const h = 1.0 / this._rows;
    let index = 0;
    for (let y = 0; y < this._rows; ++y) {
      for (let x = 0; x < this._columns; ++x) {
        const ty = this._rows - 1 - y;
        uv0[index + 0] = (x + eps) * w;
        uv0[index + 1] = (ty + eps) * h;

        uv0[index + 2] = (x + 1 - eps) * w;
        uv0[index + 3] = (ty + eps) * h;

        uv0[index + 4] = (x + 1 - eps) * w;
        uv0[index + 5] = (ty + 1 - eps) * h;

        uv0[index + 6] = (x + eps) * w;
        uv0[index + 7] = (ty + 1 - eps) * h;

        index += 8;
      }
    }

    index = 0;
    for (let face = 0; face < vertexCount; face += 4) {
      indices[index + 0] = face;
      indices[index + 1] = face + 1;
      indices[index + 2] = face + 2;

      indices[index + 3] = face;
      indices[index + 4] = face + 2;
      indices[index + 5] = face + 3;

      index += 6;
    }

    this.addAttribute('position', new THREE.BufferAttribute(positions, 3));
    this.addAttribute('uv', new THREE.BufferAttribute(uv0, 2));
    this.setIndex(new THREE.BufferAttribute(indices, 1));

    // additional transform for orientation of different cubemap layout
    let transform = null;
    if (this._columns === 1) {
      transform = new THREE.Matrix4().makeRotationY(-Math.PI / 2);
    } else if (this._columns === 3) {
      transform = new THREE.Matrix4()
        .makeScale(1, 1, -1)
        .multiply(new THREE.Matrix4().makeRotationY(-Math.PI / 2));
    }
    if (transform) {
      this.applyMatrix(transform);
    }
  }

  get size(): number {
    return this._size;
  }

  get columns(): number {
    return this._columns;
  }

  get rows(): number {
    return this._rows;
  }

  get expansionCoef(): number {
    return this._expansionCoef;
  }
}
