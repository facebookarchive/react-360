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

#ifdef IMAGE
attribute vec2 a_uv;
varying vec2 v_uv;
#endif

void main() {
  v_position = a_position;
  v_center = a_center;
  v_edge = a_edge;
  #ifdef IMAGE
  v_uv = a_uv;
  #endif

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

#ifdef IMAGE
uniform sampler2D u_texture;
varying vec2 v_uv;
#endif

void main() {
  float dist = distance(v_position, v_center) - v_edge;
  #ifdef IMAGE
  vec4 sample = texture2D(u_texture, v_uv);
  if (v_uv.x < 0. || v_uv.y < 0. || v_uv.x > 1. || v_uv.y > 1.) {
    sample = vec4(0., 0., 0., 0.);
  }
  #else
  vec4 sample = u_bgcolor;
  #endif
  vec4 color = mix(sample, u_bordercolor, clamp(dist + u_stroke, 0., 1.));
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

const ImageMaterial = new THREE.ShaderMaterial({
  uniforms: {
    u_stroke: {value: 0},
    u_bgcolor: {
      value: new THREE.Vector4(1.0, 1.0, 1.0, 1.0),
    },
    u_bordercolor: {
      value: new THREE.Vector4(0.0, 0.0, 0.0, 1.0),
    },
    u_opacity: {value: 1.0},
    u_texture: {value: new THREE.Texture()},
  },
  vertexShader: `#define IMAGE\n${VERT_SHADER}`,
  fragmentShader: `#define IMAGE\n${FRAG_SHADER}`,
});

export const BG_RESIZE = {
  center: 'center',
  contain: 'contain',
  cover: 'cover',
  stretch: 'stretch',
};

/**
 * Implements rectangles with border and corner radii using a SDF shader
 */
export default class GLView {
  _bgColor: number;
  _bgResize: $Values<BG_RESIZE>;
  _bgTextureHeight: number;
  _bgTextureWidth: number;
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

    this._bgTextureHeight = 0;
    this._bgTextureWidth = 0;
    this._bgTexture = null;
    this._bgResize = 'stretch';

    // Three.js specifics
    this._geometry = new THREE.BufferGeometry();
    this._material = ViewMaterial.clone();
    const {position, index} = this.createGeometry();
    const posArray = new Float32Array(40 * 7); // Max size
    for (let i = 0; i < posArray.length; i++) {
      if (i < position.length) {
        posArray[i] = position[i];
      } else {
        posArray[i] = 0;
      }
    }
    this._positionBuffer = new THREE.InterleavedBuffer(posArray, 7);
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
    this._geometry.addAttribute(
      'a_uv',
      new THREE.InterleavedBufferAttribute(this._positionBuffer, 2, 5, false),
    );
    this._node = new THREE.Mesh(this._geometry, this._material);
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

    // There are 8 unique values for each UV axis, determined by the resize mode
    const texX = [
      0,
      tl / width,
      bl / width,
      half / width,
      (width - half) / width,
      (width - tr) / width,
      (width - br) / width,
      1.0,
    ];
    const texY = [
      1.0,
      (height - tl) / height,
      (height - tr) / height,
      (height - half) / height,
      half / height,
      bl / height,
      br / height,
      0,
    ];
    if (this._bgTextureHeight > 0 && this._bgTextureWidth > 0) {
      let scaleX = 1.0;
      let scaleY = 1.0;
      const bgRatio = this._bgTextureWidth / this._bgTextureHeight;
      const frameRatio = width / height;
      if (this._bgResize === 'cover') {
        scaleX = Math.min(frameRatio / bgRatio, 1.0);
        scaleY = Math.min(bgRatio / frameRatio, 1.0);
      } else if (this._bgResize === 'contain') {
        scaleX = Math.max(frameRatio / bgRatio, 1.0);
        scaleY = Math.max(bgRatio / frameRatio, 1.0);
      } else if (this._bgResize === 'center') {
        scaleX = width / this._bgTextureWidth;
        scaleY = height / this._bgTextureHeight;
      }
      for (let i = 0; i < texX.length; i++) {
        texX[i] = (texX[i] - 0.5) * scaleX + 0.5;
        texY[i] = (texY[i] - 0.5) * scaleY + 0.5;
      }
    }

    // Packed array containing 2D position, and SDF origin and distance
    // prettier-ignore
    const position = hasCorners ? [
      // top hexagon
      tl, 0, tl, half, half, texX[1], texY[0],
      width - tr, 0, width - tr, half, half, texX[5], texY[0],
      tl, tl, tl, half, half, texX[1], texY[1],
      width - tr, tr, width - tr, half, half, texX[5], texY[2],
      half, half, half, half, half, texX[3], texY[3],
      width - half, half, width - half, half, half, texX[4], texY[3],

      // left hexagon
      0, height - bl, half, height - bl, half, texX[0], texY[5],
      0, tl, half, tl, half, texX[0], texY[1],
      bl, height - bl, half, height - bl, half, texX[2], texY[5],
      tl, tl, half, tl, half, texX[1], texY[1],
      half, height - half, half, height - half, half, texX[3], texY[4],
      half, half, half, half, half, texX[3], texY[3],

      // bottom hexagon
      width - br, height, width - br, height - half, half, texX[6], texY[7],
      bl, height, bl, height - half, half, texX[2], texY[7],
      width - br, height - br, width - br, height - half, half, texX[6], texY[6],
      bl, height - bl, bl, height - half, half, texX[2], texY[5],
      width - half, height - half, width - half, height - half, half, texX[4], texY[4],
      half, height - half, half, height - half, half, texX[3], texY[4],

      // right hexagon
      width, tr, width - half, tr, half, texX[7], texY[2],
      width, height - br, width - half, height - br, half, texX[7], texY[6],
      width - tr, tr, width - half, tr, half, texX[5], texY[2],
      width - br, height - br, width - half, height - br, half, texX[6], texY[6],
      width - half, half, width - half, half, half, texX[4], texY[3],
      width - half, height - half, width - half, height - half, half, texX[4], texY[4],

      // top-left radius
      0, 0, tl, tl, tl, texX[0], texY[0],
      tl, 0, tl, tl, tl, texX[1], texY[0],
      0, tl, tl, tl, tl, texX[0], texY[1],
      tl, tl, tl, tl, tl, texX[1], texY[1],

      // top-right radius
      width - tr, 0, width - tr, tr, tr, texX[5], texY[0],
      width, 0, width - tr, tr, tr, texX[7], texY[0],
      width - tr, tr, width - tr, tr, tr, texX[5], texY[2],
      width, tr, width - tr, tr, tr, texX[7], texY[2],

      // bottom-left radius
      0, height - bl, bl, height - bl, bl, texX[0], texY[5],
      bl, height - bl, bl, height - bl, bl, texX[2], texY[5],
      0, height, bl, height - bl, bl, texX[0], texY[7],
      bl, height, bl, height - bl, bl, texX[2], texY[7],

      // bottom-right radius
      width - br, height - br, width - br, height - br, br, texX[6], texY[6],
      width, height - br, width - br, height - br, br, texX[7], texY[6],
      width - br, height, width - br, height - br, br, texX[6], texY[7],
      width, height, width - br, height - br, br, texX[7], texY[7],
    ] : [
      0, 0, 0, half, half, texX[0], texY[0],
      width, 0, width, half, half, texX[7], texY[0],
      half, half, half, half, half, texX[3], texY[3],
      width - half, half, width - half, half, half, texX[4], texY[3],

      0, height, half, height, half, texX[0], texY[7],
      0, 0, half, 0, half, texX[0], texY[0],
      half, height - half, half, height - half, half, texX[3], texY[4],
      half, half, half, half, half, texX[3], texY[3],

      width, height, width, height - half, half, texX[7], texY[7],
      0, height, 0, height - half, half, texX[0], texY[7],
      width - half, height - half, width - half, height - half, half, texX[4], texY[4],
      half, height - half, half, height - half, half, texX[3], texY[4],

      width, 0, width - half, 0, half, texX[7], texY[0],
      width, height, width - half, height, half, texX[7], texY[7],
      width - half, half, width - half, half, half, texX[4], texY[3],
      width - half, height - half, width - half, height - half, half, texX[4], texY[4],
    ];

    // prettier-ignore
    const index = hasCorners ? [
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

  setBackgroundImage(tex: THREE.Texture) {
    const oldMaterial = this._material;
    if (tex) {
      this._material = ImageMaterial.clone();
      this._material.uniforms.u_texture.value = tex;
      this._bgTextureWidth = tex.image.naturalWidth;
      this._bgTextureHeight = tex.image.naturalHeight;
    } else {
      this._material = ViewMaterial.clone();
      this._bgTextureWidth = 0;
      this._bgTextureHeight = 0;
    }
    this.setBackgroundColor(this._bgColor);
    this.setBorderColor(this._borderColor);
    this.setBorderWidth(this._borderWidth);
    this.setOpacity(this._opacity);
    this._node.material = this._material;
    oldMaterial.dispose();
  }

  setBackgroundResizeMode(mode: $Values<BG_RESIZE>) {
    if (!(mode in BG_RESIZE)) {
      throw new Error(`Invalid bg resize mode: ${mode}`);
    }
    this._bgResize = mode;
    if (this._bgTextureHeight > 0 && this._bgTextureWidth > 0) {
      this._geometryDirty = true;
      this.update();
    }
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
}
