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

/* eslint-disable no-bitwise */

import * as THREE from 'three';
import {VERT_SHADER, FRAG_SHADER} from './SDFRectangle';

import type {Transform} from './Types';

export interface GLViewCompatible {
  getNode(): THREE.Mesh;
  setBackgroundColor(number): void;
  setBorderColor(number): void;
  setBorderRadius(number, number, number, number): void;
  setBorderWidth(number, number, number, number): void;
  setFrame(number, number, number, number): void;
  setLocalTransform(Transform): void;
  setOpacity(number): void;
  setVisible(boolean): void;
  setZOffset(number): void;
  update(): void;
}

const ViewMaterial = new THREE.ShaderMaterial({
  uniforms: {
    u_stroke: {value: 0},
    u_bgcolor: {
      value: new THREE.Vector4(0.0, 0.0, 0.0, 0.0),
    },
    u_bordercolor: {
      value: new THREE.Vector4(0.0, 0.0, 0.0, 1.0),
    },
    u_opacity: {value: 1.0},
  },
  vertexShader: VERT_SHADER,
  fragmentShader: FRAG_SHADER,
  transparent: true,
});

/**
 * Implements rectangles with border and corner radii using a SDF shader
 */
export default class GLView {
  _bgColor: number;
  _borderColor: number;
  _borderWidth: number;
  _geometry: THREE.BufferGeometry;
  _geometryDirty: boolean;
  _height: number;
  _layoutOriginX: number;
  _layoutOriginY: number;
  _localTransform: Transform;
  _material: THREE.ShaderMaterial;
  _node: THREE.Mesh;
  _opacity: number;
  _positionBuffer: THREE.InterleavedBuffer;
  _radiusBL: number;
  _radiusBR: number;
  _radiusTL: number;
  _radiusTR: number;
  _transformDirty: boolean;
  _width: number;
  _x: number;
  _y: number;
  _zOffset: number;

  constructor() {
    this._width = 1;
    this._height = 1;
    this._radiusTL = 0;
    this._radiusTR = 0;
    this._radiusBR = 0;
    this._radiusBL = 0;
    this._borderWidth = 0;
    this._bgColor = 0x00000000; // Colors are ARGB
    this._borderColor = 0xff000000;
    this._opacity = 1.0;
    this._layoutOriginX = 0;
    this._layoutOriginY = 0;
    this._localTransform = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
    this._x = 0;
    this._y = 0;
    this._zOffset = 0;
    this._geometryDirty = true;
    this._transformDirty = true;

    // Three.js specifics
    this._geometry = new THREE.BufferGeometry();
    this._material = this.createNewMaterial();
    const {position, index} = this.createGeometry();
    const posArray = new Float32Array((this.constructor: any).MAX_BUFFER_SIZE); // Max size
    for (let i = 0; i < posArray.length; i++) {
      if (i < position.length) {
        posArray[i] = position[i];
      } else {
        posArray[i] = 0;
      }
    }
    this._positionBuffer = new THREE.InterleavedBuffer(
      posArray,
      (this.constructor: any).POSITION_STRIDE,
    );
    const indexArray = new Array(24 * 3); // Max size
    for (let i = 0; i < indexArray.length; i++) {
      if (i < index.length) {
        indexArray[i] = index[i];
      } else {
        indexArray[i] = 0;
      }
    }
    this._geometry.setIndex(indexArray);
    this._geometry.addAttribute(
      'a_position',
      new THREE.InterleavedBufferAttribute(this._positionBuffer, 2, 0, false),
    );
    this._geometry.addAttribute(
      'a_center',
      new THREE.InterleavedBufferAttribute(this._positionBuffer, 2, 2, false),
    );
    this._geometry.addAttribute(
      'a_edge',
      new THREE.InterleavedBufferAttribute(this._positionBuffer, 1, 4, false),
    );
    this._node = new THREE.Mesh(this._geometry, this._material);
    this._node.matrixAutoUpdate = false;
  }

  createNewMaterial(): THREE.ShaderMaterial {
    return ViewMaterial.clone();
  }

  createGeometryVertexArray(
    width: number,
    height: number,
    half: number,
    tl: number,
    tr: number,
    br: number,
    bl: number,
    hasCorners: boolean,
  ): Array<number> {
    // Packed array containing 2D position, and SDF origin and distance
    // prettier-ignore
    return hasCorners ? [
      // top hexagon
      tl, 0, tl, half, half,
      width - tr, 0, width - tr, half, half,
      tl, tl, tl, half, half,
      width - tr, tr, width - tr, half, half,
      half, half, half, half, half,
      width - half, half, width - half, half, half,

      // left hexagon
      0, height - bl, half, height - bl, half,
      0, tl, half, tl, half,
      bl, height - bl, half, height - bl, half,
      tl, tl, half, tl, half,
      half, height - half, half, height - half, half,
      half, half, half, half, half,

      // bottom hexagon
      width - br, height, width - br, height - half, half,
      bl, height, bl, height - half, half,
      width - br, height - br, width - br, height - half, half,
      bl, height - bl, bl, height - half, half,
      width - half, height - half, width - half, height - half, half,
      half, height - half, half, height - half, half,

      // right hexagon
      width, tr, width - half, tr, half,
      width, height - br, width - half, height - br, half,
      width - tr, tr, width - half, tr, half,
      width - br, height - br, width - half, height - br, half,
      width - half, half, width - half, half, half,
      width - half, height - half, width - half, height - half, half,

      // top-left radius
      0, 0, tl, tl, tl,
      tl, 0, tl, tl, tl,
      0, tl, tl, tl, tl,
      tl, tl, tl, tl, tl,

      // top-right radius
      width - tr, 0, width - tr, tr, tr,
      width, 0, width - tr, tr, tr,
      width - tr, tr, width - tr, tr, tr,
      width, tr, width - tr, tr, tr,

      // bottom-left radius
      0, height - bl, bl, height - bl, bl,
      bl, height - bl, bl, height - bl, bl,
      0, height, bl, height - bl, bl,
      bl, height, bl, height - bl, bl,

      // bottom-right radius
      width - br, height - br, width - br, height - br, br,
      width, height - br, width - br, height - br, br,
      width - br, height, width - br, height - br, br,
      width, height, width - br, height - br, br,
    ] : [
      0, 0, 0, half, half,
      width, 0, width, half, half,
      half, half, half, half, half,
      width - half, half, width - half, half, half,

      0, height, half, height, half,
      0, 0, half, 0, half,
      half, height - half, half, height - half, half,
      half, half, half, half, half,

      width, height, width, height - half, half,
      0, height, 0, height - half, half,
      width - half, height - half, width - half, height - half, half,
      half, height - half, half, height - half, half,

      width, 0, width - half, 0, half,
      width, height, width - half, height, half,
      width - half, half, width - half, half, half,
      width - half, height - half, width - half, height - half, half,
    ];
  }

  createGeometryIndexArray(hasCorners: boolean): Array<number> {
    // prettier-ignore
    return hasCorners ? [
      0, 2, 4,
      1, 0, 4,
      1, 4, 5,
      1, 5, 3,

      6, 8, 10,
      7, 6, 10,
      7, 10, 11,
      7, 11, 9,

      12, 14, 16,
      13, 12, 16,
      13, 16, 17,
      13, 17, 15,

      18, 20, 22,
      19, 18, 22,
      19, 22, 23,
      19, 23, 21,

      25, 24, 27,
      24, 26, 27,

      29, 28, 31,
      28, 30, 31,

      33, 32, 35,
      32, 34, 35,

      37, 36, 39,
      36, 38, 39,
    ] : [
      0, 2, 1,
      1, 2, 3,

      4, 6, 5,
      5, 6, 7,

      8, 10, 9,
      9, 10, 11,

      12, 14, 13,
      13, 14, 15,
    ];
  }

  createGeometry() {
    const width = this._width;
    const height = this._height;
    const half = Math.min(width, height) / 2;

    const tl = Math.min(this._radiusTL, half);
    const tr = Math.min(this._radiusTR, half);
    const br = Math.min(this._radiusBR, half);
    const bl = Math.min(this._radiusBL, half);
    const hasCorners = tl > 0 || tr > 0 || bl > 0 || br > 0;

    const position = this.createGeometryVertexArray(
      width,
      height,
      half,
      tl,
      tr,
      br,
      bl,
      hasCorners,
    );

    const index = this.createGeometryIndexArray(hasCorners);

    return {
      position,
      index,
    };
  }

  getNode() {
    return this._node;
  }

  setBackgroundColor(color: number) {
    this._bgColor = color;
    this._material.uniforms.u_bgcolor.value.set(
      ((color >> 16) & 0xff) / 255,
      ((color >> 8) & 0xff) / 255,
      (color & 0xff) / 255,
      ((color >> 24) & 0xff) / 255,
    );
    this._material.needsUpdate = true;
  }

  setBorderColor(color: number) {
    this._borderColor = color;
    this._material.uniforms.u_bordercolor.value.set(
      ((color >> 16) & 0xff) / 255,
      ((color >> 8) & 0xff) / 255,
      (color & 0xff) / 255,
      ((color >> 24) & 0xff) / 255,
    );
    this._material.needsUpdate = true;
  }

  setBorderRadius(tl: number, tr: number, br: number, bl: number) {
    this._radiusTL = tl;
    this._radiusTR = tr;
    this._radiusBR = br;
    this._radiusBL = bl;
    this._geometryDirty = true;
  }

  setBorderWidth(top: number, right: number, bottom: number, left: number) {
    // TODO: Support four different border widths
    this._borderWidth = top;
    this._material.uniforms.u_stroke.value = top;
    this._material.needsUpdate = true;
  }

  setFrame(x: number, y: number, width: number, height: number) {
    this._x = x;
    this._y = y;
    this._transformDirty = true;
    this._width = width;
    this._height = height;
    this._geometryDirty = true;
  }

  setLocalTransform(transform: Transform) {
    this._localTransform = (transform.slice(): any);
    this._transformDirty = true;
    this.update();
  }

  setOpacity(opacity: number) {
    this._opacity = opacity;
    this._material.uniforms.u_opacity.value = opacity;
    this._material.needsUpdate = true;
  }

  setVisible(visible: boolean) {
    this._node.visible = visible;
  }

  setZOffset(offset: number) {
    this._zOffset = offset;
  }

  update() {
    if (this._geometryDirty) {
      const {position, index} = this.createGeometry();
      for (let i = 0; i < position.length; i++) {
        this._positionBuffer.array[i] = position[i];
      }
      if (index.length !== this._geometry.drawRange.count) {
        for (let i = 0; i < index.length; i++) {
          this._geometry.index.array[i] = index[i];
        }
      }
      this._geometry.setDrawRange(0, index.length);
      this._geometry.needsUpdate = true;
      this._geometry.index.needsUpdate = true;
      this._positionBuffer.needsUpdate = true;
      this._geometryDirty = false;
    }
    if (this._transformDirty) {
      const x = this._x;
      const y = this._y;
      const z = this._zOffset;
      const transform = this._localTransform.slice();
      transform[12] += x;
      transform[13] += y;
      transform[14] += z;
      this._node.matrix.fromArray(transform);

      this._transformDirty = false;
    }
  }
}
(GLView: any).POSITION_STRIDE = 5;
(GLView: any).MAX_BUFFER_SIZE = 40 * 5;
