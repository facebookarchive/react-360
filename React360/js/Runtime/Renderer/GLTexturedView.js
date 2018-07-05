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
import GLView from './GLView';
import {VERT_SHADER, FRAG_SHADER} from './SDFRectangle';

const ImageMaterial = new THREE.ShaderMaterial({
  uniforms: {
    u_stroke: {value: 0},
    u_bgcolor: {
      value: new THREE.Vector4(0.0, 0.0, 0.0, 0.0),
    },
    u_bordercolor: {
      value: new THREE.Vector4(0.0, 0.0, 0.0, 1.0),
    },
    u_opacity: {value: 1.0},
    u_texture: {value: new THREE.Texture()},
  },
  vertexShader: `#define IMAGE\n${VERT_SHADER}`,
  fragmentShader: `#define IMAGE\n${FRAG_SHADER}`,
  transparent: true,
});

export const BG_RESIZE = {
  center: 'center',
  contain: 'contain',
  cover: 'cover',
  stretch: 'stretch',
};

export type ResizeMode = $Values<typeof BG_RESIZE>;

export default class GLTexturedView extends GLView {
  _bgResize: ResizeMode;
  _bgTextureHeight: number;
  _bgTextureWidth: number;

  constructor() {
    super();

    this._bgTextureHeight = 0;
    this._bgTextureWidth = 0;
    this._bgResize = 'stretch';

    this._geometry.addAttribute(
      'a_uv',
      new THREE.InterleavedBufferAttribute(this._positionBuffer, 2, 5, false),
    );
  }

  createNewMaterial(): THREE.ShaderMaterial {
    return ImageMaterial.clone();
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

    // Packed array containing 2D position, SDF origin and distance, and UV coordinates
    // prettier-ignore
    return hasCorners ? [
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
  }

  setBackgroundImage(tex: THREE.Texture) {
    this._material.uniforms.u_texture.value = tex;
    if (tex) {
      const source = tex.image;
      if (source instanceof Image) {
        this._bgTextureWidth = source.naturalWidth;
        this._bgTextureHeight = source.naturalHeight;
      } else if (source instanceof HTMLCanvasElement) {
        this._bgTextureWidth = source.width;
        this._bgTextureHeight = source.height;
      }
    } else {
      this._bgTextureWidth = 0;
      this._bgTextureHeight = 0;
    }
    this._geometryDirty = true;
    this.update();
  }

  setBackgroundResizeMode(mode: ResizeMode) {
    if (!(mode in BG_RESIZE)) {
      throw new Error(`Invalid bg resize mode: ${mode}`);
    }
    this._bgResize = mode;
    if (this._bgTextureHeight > 0 && this._bgTextureWidth > 0) {
      this._geometryDirty = true;
      this.update();
    }
  }
}
(GLTexturedView: any).POSITION_STRIDE = 7;
(GLTexturedView: any).MAX_BUFFER_SIZE = 40 * 7;
