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

const VERT_SHADER = `
attribute vec2 a_position;
attribute vec2 a_center;
attribute float a_edge;

varying vec2 v_position;
varying vec2 v_center;
varying float v_edge;

void main() {
  v_position = a_position;
  v_center = a_center;
  v_edge = a_edge;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(a_position * vec2(1, -1), 0, 1.0);
}
`;

const FRAG_SHADER = `
precision mediump float;

uniform float u_stroke;
uniform vec4 u_bgcolor;
uniform vec4 u_bordercolor;
uniform float u_opacity;

varying vec2 v_position;
varying vec2 v_center;
varying float v_edge;

void main() {
  float dist = distance(v_position, v_center) - v_edge;
  vec4 color = mix(u_bgcolor, u_bordercolor, clamp(dist + u_stroke, 0., 1.));
  float opacity = clamp(0.6 - dist, 0., 1.);
  gl_FragColor = vec4(color.rgb, color.a * opacity * u_opacity);
}
`;

const ViewMaterial = new THREE.ShaderMaterial({
  uniforms: {
    u_stroke: {value: 0},
    u_bgcolor: {
      value: new THREE.Vector4(1.0, 1.0, 1.0, 1.0),
    },
    u_bordercolor: {
      value: new THREE.Vector4(0.0, 0.0, 0.0, 1.0),
    },
    u_opacity: {value: 1.0},
  },
  vertexShader: VERT_SHADER,
  fragmentShader: FRAG_SHADER,
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
  _material: THREE.ShaderMaterial;
  _node: THREE.Mesh;
  _opacity: number;
  _positionBuffer: THREE.InterleavedBuffer;
  _radiusBL: number;
  _radiusBR: number;
  _radiusTL: number;
  _radiusTR: number;
  _width: number;

  constructor() {
    this._width = 100;
    this._height = 200;
    this._radiusTL = 0;
    this._radiusTR = 0;
    this._radiusBR = 0;
    this._radiusBL = 0;
    this._borderWidth = 0;
    this._bgColor = 0xffffffff; // Colors are ARGB
    this._borderColor = 0xff000000;
    this._opacity = 1.0;
    this._geometryDirty = true;

    // Three.js specifics
    this._geometry = new THREE.BufferGeometry();
    this._material = ViewMaterial.clone();
    const {position, index} = this.createGeometry();
    this._positionBuffer = new THREE.InterleavedBuffer(position, 5);
    this._geometry.setIndex(index);
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
  }

  createGeometry() {
    const tl = this._radiusTL;
    const tr = this._radiusTR;
    const br = this._radiusBR;
    const bl = this._radiusBL;
    const width = this._width;
    const height = this._height;

    const half = Math.min(width, height) / 2;

    // Packed array containing 2D position, and SDF origin and distance
    // prettier-ignore
    const position = new Float32Array([
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

      // TODO: Avoid degenerate triangles by computing corners individually
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
    ]);

    // prettier-ignore
    const index = [
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
    ];

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
    this._node.position.set(x, -y, 0);
    this._width = width;
    this._height = height;
    this._geometryDirty = true;
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
    if (!this._geometryDirty) {
      return;
    }
    const {position} = this.createGeometry();
    for (let i = 0; i < position.length; i++) {
      this._positionBuffer.array[i] = position[i];
    }
    this._positionBuffer.needsUpdate = true;
    this._geometryDirty = false;
  }
}
