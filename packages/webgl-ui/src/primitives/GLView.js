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
import {type Transform, matrixMultiply4} from '../Math';
import {VERT_SHADER, FRAG_SHADER} from './SDFRectangle';

export interface GLViewCompatible {
  getHeight(): number;
  getNode(): THREE.Mesh;
  getWidth(): number;
  getWorldTransform(): Transform;
  containsPoint(x: number, y: number): boolean;
  setBackgroundColor(number): void;
  setBorderColor(number): void;
  setBorderRadius(number, number, number, number): void;
  setBorderWidth(number, number, number, number): void;
  setFrame(number, number, number, number): void;
  setGradientAngle(angle: number): void;
  setGradientEnd(color: number): void;
  setGradientStart(color: number): void;
  setLocalTransform(Transform): void;
  setOpacity(number): void;
  setParentTransform(Transform): void;
  setVisible(boolean): void;
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
    u_transform: {
      value: new THREE.Matrix4(),
    },
    u_opacity: {value: 1.0},
    u_gradientstart: {value: new THREE.Vector4(0, 0, 0, 0)},
    u_gradientend: {value: new THREE.Vector4(0, 0, 0, 0.0)},
    u_gradientunit: {value: new THREE.Vector2(0, 1.0)},
    u_gradientlength: {value: 1},
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
  _gradientAngle: number;
  _height: number;
  _intersectTest: [[number, number], [number, number], [number, number]];
  _layoutOriginX: number;
  _layoutOriginY: number;
  _localTransform: Transform;
  _material: THREE.ShaderMaterial;
  _node: THREE.Mesh;
  _offsetX: number;
  _offsetY: number;
  _opacity: number;
  _parentTransform: Transform;
  _positionBuffer: THREE.InterleavedBuffer;
  _radiusBL: number;
  _radiusBR: number;
  _radiusTL: number;
  _radiusTR: number;
  _transformDirty: boolean;
  _width: number;
  _worldTransform: Transform;
  _x: number;
  _y: number;

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
    this._offsetX = 0;
    this._offsetY = 0;
    this._intersectTest = [[0, 0], [1, 0], [0, 1]];
    this._localTransform = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
    this._parentTransform = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
    this._worldTransform = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
    this._x = 0;
    this._y = 0;
    this._geometryDirty = true;
    this._transformDirty = true;
    this._gradientAngle = 0;

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
      (this.constructor: any).POSITION_STRIDE
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
      new THREE.InterleavedBufferAttribute(this._positionBuffer, 2, 0, false)
    );
    this._geometry.addAttribute(
      'a_center',
      new THREE.InterleavedBufferAttribute(this._positionBuffer, 2, 2, false)
    );
    this._geometry.addAttribute(
      'a_edge',
      new THREE.InterleavedBufferAttribute(this._positionBuffer, 1, 4, false)
    );
    this._node = new THREE.Mesh(this._geometry, this._material);
    this._node.matrixAutoUpdate = false;
  }

  createNewMaterial(): THREE.ShaderMaterial {
    const mat = ViewMaterial.clone();
    mat.depthTest = false;
    return mat;
  }

  createGeometryVertexArray(
    width: number,
    height: number,
    half: number,
    tl: number,
    tr: number,
    br: number,
    bl: number,
    hasCorners: boolean
  ): Array<number> {
    // Use half of width, half of height, to center geometry around (0, 0)
    const hw = width / 2;
    const hh = height / 2;
    // Packed array containing 2D position, and SDF origin and distance
    // prettier-ignore
    return hasCorners ? [
      // top hexagon
      tl - hw, hh, tl - hw, hh - half, half,
      hw - tr, hh, hw - tr, hh - half, half,
      tl - hw, hh - tl, tl - hw, hh - half, half,
      hw - tr, hh - tr, hw - tr, hh - half, half,
      half - hw, hh - half, half - hw, hh - half, half,
      hw - half, hh - half, hw - half, hh - half, half,

      // left hexagon
      -hw, bl - hh, half - hw, bl - hh, half,
      -hw, hh - tl, half - hw, hh - tl, half,
      bl - hw, bl - hh, half - hw, bl - hh, half,
      tl - hw, hh - tl, half - hw, hh - tl, half,
      half - hw, half - hh, half - hw, half - hh, half,
      half - hw, hh - half, half - hw, hh - half, half,

      // bottom hexagon
      hw - br, -hh, hw - br, half - hh, half,
      bl - hw, -hh, bl - hw, half - hh, half,
      hw - br, br - hh, hw - br, half - hh, half,
      bl - hw, bl - hh, bl - hw, half - hh, half,
      hw - half, half - hh, hw - half, half - hh, half,
      half - hw, half - hh, half - hw, half - hh, half,

      // right hexagon
      hw, hh - tr, hw - half, hh - tr, half,
      hw, br - hh, hw - half, br - hh, half,
      hw - tr, hh - tr, hw - half, hh - tr, half,
      hw - br, br - hh, hw - half, br - hh, half,
      hw - half, hh - half, hw - half, hh - half, half,
      hw - half, half - hh, hw - half, half - hh, half,

      // top-left radius
      -hw, hh, tl - hw, hh - tl, tl,
      tl - hw, hh, tl - hw, hh - tl, tl,
      -hw, hh - tl, tl - hw, hh - tl, tl,
      tl - hw, hh - tl, tl - hw, hh - tl, tl,

      // top-right radius
      hw - tr, hh, hw - tr, hh - tr, tr,
      hw, hh, hw - tr, hh - tr, tr,
      hw - tr, hh - tr, hw - tr, hh - tr, tr,
      hw, hh - tr, hw - tr, hh - tr, tr,

      // bottom-left radius
      -hw, bl - hh, bl - hw, bl - hh, bl,
      bl - hw, bl - hh, bl - hw, bl - hh, bl,
      -hw, -hh, bl - hw, bl - hh, bl,
      bl - hw, -hh, bl - hw, bl - hh, bl,

      // bottom-right radius
      hw - br, br - hh, hw - br, br - hh, br,
      hw, br - hh, hw - br, br - hh, br,
      hw - br, -hh, hw - br, br - hh, br,
      hw, -hh, hw - br, br - hh, br,
    ] : [
      // Top tetrahedron
      -hw, hh, -hw, hh - half, half,
      hw, hh, hw, hh - half, half,
      half - hw, hh - half, half - hw, hh - half, half,
      hw - half, hh - half, hw - half, hh - half, half,

      // Left tetrahedron
      -hw, -hh, half - hw, -hh, half,
      -hw, hh, half - hw, hh, half,
      half - hw, half - hh, half - hw, half - hh, half,
      half - hw, hh - half, half - hw, hh - half, half,

      // Bottom tetrahedron
      hw, -hh, hw, half - hh, half,
      -hw, -hh, -hw, half - hh, half,
      hw - half, half - hh, hw - half, half - hh, half,
      half - hw, half - hh, half - hw, half - hh, half,

      // Right tetrahedron
      hw, hh, hw - half, hh, half,
      hw, -hh, hw - half, -hh, half,
      hw - half, hh - half, hw - half, hh - half, half,
      hw - half, half - hh, hw - half, half - hh, half,
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
      hasCorners
    );

    const index = this.createGeometryIndexArray(hasCorners);

    return {
      position,
      index,
    };
  }

  containsPoint(x: number, y: number): boolean {
    const tlX = this._intersectTest[0][0];
    const tlY = this._intersectTest[0][1];
    const trX = this._intersectTest[1][0];
    const trY = this._intersectTest[1][1];
    const blX = this._intersectTest[2][0];
    const blY = this._intersectTest[2][1];

    const dx0 = trX - tlX;
    const dy0 = trY - tlY;
    const dx1 = blX - tlX;
    const dy1 = blY - tlY;

    if ((x - tlX) * dx0 + (y - tlY) * dy0 < 0) {
      return false;
    }
    if ((x - trX) * dx0 + (y - trY) * dy0 > 0) {
      return false;
    }
    if ((x - tlX) * dx1 + (y - tlY) * dy1 < 0) {
      return false;
    }
    if ((x - blX) * dx1 + (y - blY) * dy1 > 0) {
      return false;
    }
    return true;
  }

  getGeometry() {
    return this._geometry;
  }

  getMaterial() {
    return this._material;
  }

  getNode() {
    return this._node;
  }

  getPositionBuffer() {
    return this._positionBuffer;
  }

  getWidth() {
    return this._width;
  }

  getHeight() {
    return this._height;
  }

  getWorldTransform(): Transform {
    return ((this._worldTransform.slice(): any): Transform);
  }

  setBackgroundColor(color: number) {
    this._bgColor = color;
    this._material.uniforms.u_bgcolor.value.set(
      ((color >> 16) & 0xff) / 255,
      ((color >> 8) & 0xff) / 255,
      (color & 0xff) / 255,
      ((color >> 24) & 0xff) / 255
    );
    this._material.needsUpdate = true;
  }

  setBorderColor(color: number) {
    this._borderColor = color;
    this._material.uniforms.u_bordercolor.value.set(
      ((color >> 16) & 0xff) / 255,
      ((color >> 8) & 0xff) / 255,
      (color & 0xff) / 255,
      ((color >> 24) & 0xff) / 255
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

  setGradientStart(color: number) {
    this._material.uniforms.u_gradientstart.value.set(
      ((color >> 16) & 0xff) / 255,
      ((color >> 8) & 0xff) / 255,
      (color & 0xff) / 255,
      ((color >> 24) & 0xff) / 255
    );
    this._material.needsUpdate = true;
  }

  setGradientEnd(color: number) {
    this._material.uniforms.u_gradientend.value.set(
      ((color >> 16) & 0xff) / 255,
      ((color >> 8) & 0xff) / 255,
      (color & 0xff) / 255,
      ((color >> 24) & 0xff) / 255
    );
    this._material.needsUpdate = true;
  }

  setGradientAngle(rad: number) {
    this._gradientAngle = rad;
    this.updateGradient();
  }

  updateGradient() {
    const angle = this._gradientAngle;
    this._material.uniforms.u_gradientunit.value.fromArray([Math.sin(angle), Math.cos(angle)]);
    this._material.uniforms.u_gradientlength.value =
      this._width * Math.sin(angle) + this._height * Math.cos(angle);
  }

  setFrame(x: number, y: number, width: number, height: number) {
    this._x = x;
    this._y = y;
    this._transformDirty = true;
    this._width = width;
    this._height = height;
    this._geometryDirty = true;
    this._intersectTest[0][0] = -width / 2;
    this._intersectTest[0][1] = height / 2;
    this._intersectTest[1][0] = width / 2;
    this._intersectTest[1][1] = height / 2;
    this._intersectTest[2][0] = -width / 2;
    this._intersectTest[2][1] = -height / 2;
  }

  setGeometryDirty(dirty: boolean) {
    this._geometryDirty = dirty;
  }

  setLocalTransform(transform: Transform) {
    this._localTransform = (transform.slice(): any);
    this._transformDirty = true;
    this.update();
  }

  /**
   * Adds an additional offset unrelated to the local transform.
   * This is used to position a child view relative to its parent's top-left
   * corner, even though the parent's transforms are relative to its centerpoint
   */
  setOffset(x: number, y: number) {
    this._offsetX = x;
    this._offsetY = y;
  }

  setParentTransform(transform: Transform) {
    this._parentTransform = (transform.slice(): any);
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
      this.updateGradient();
      this._geometryDirty = false;
    }
    if (this._transformDirty) {
      const x = this._x + (this._offsetX || 0) + this._width / 2;
      const y = -this._y + (this._offsetY || 0) + this._height / 2;
      for (let i = 0; i < 16; i++) {
        (this._worldTransform: any)[i] = this._localTransform[i];
      }
      this._worldTransform[12] += x;
      this._worldTransform[13] += y;
      matrixMultiply4(this._worldTransform, this._parentTransform);
      this._material.uniforms.u_transform.value.fromArray(this._worldTransform);

      this._intersectTest[0][0] = -this._width / 2;
      this._intersectTest[0][1] = this._height / 2;
      this._intersectTest[1][0] = this._width / 2;
      this._intersectTest[1][1] = this._height / 2;
      this._intersectTest[2][0] = -this._width / 2;
      this._intersectTest[2][1] = -this._height / 2;
      for (let i = 0; i < 3; i++) {
        const point = this._intersectTest[i];
        const px = point[0];
        const py = point[1];
        point[0] =
          this._worldTransform[0] * px + this._worldTransform[4] * py + this._worldTransform[12];
        point[1] =
          this._worldTransform[1] * px + this._worldTransform[5] * py + this._worldTransform[13];
      }
      this._transformDirty = false;
    }
  }
}
(GLView: any).POSITION_STRIDE = 5;
(GLView: any).MAX_BUFFER_SIZE = 40 * 5;
