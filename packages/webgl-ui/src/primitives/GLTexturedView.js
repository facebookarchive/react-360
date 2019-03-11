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

import * as WebGL from 'webgl-lite';
import GLView from './GLView';
import {VERT_SHADER, FRAG_SHADER} from './SDFRectangle';

function createProgram(gl: WebGLRenderingContext) {
  const prog = new WebGL.Program(gl);
  prog
    .addShader(VERT_SHADER, gl.VERTEX_SHADER, ['IMAGE'])
    .addShader(FRAG_SHADER, gl.FRAGMENT_SHADER, ['IMAGE'])
    .compile()
    .setUniformDefaults({
      u_bordercolor: [0, 0, 0, 1],
      u_tint: [1, 1, 1],
      u_opacity: 1,
      u_gradientunit: [0, 1],
      u_gradientlength: 1,
    });
  return prog;
}

const PM = new WebGL.ProgramManager(createProgram);

const BG_RESIZE = {
  center: 'center',
  contain: 'contain',
  cover: 'cover',
  stretch: 'stretch',
};

export type ResizeMode = 'center' | 'contain' | 'cover' | 'stretch';

export default class GLTexturedView extends GLView {
  _bgResize: ResizeMode;
  _bgTextureHeight: number;
  _bgTextureWidth: number;
  _flipVertical: boolean;
  _tintColor: number;

  constructor(gl: WebGLRenderingContext) {
    super(gl);

    this._bgTextureHeight = 0;
    this._bgTextureWidth = 0;
    this._bgResize = 'stretch';
    this._tintColor = 0xffffffff;
    this._flipVertical = false;

    this.getNode().addAttribute('a_uv');
  }

  createProgram() {
    return PM.getProgram(this.gl);
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
      0,
      tl / height,
      tr / height,
      half / height,
      (height - half) / height,
      (height - bl) / height,
      (height - br) / height,
      1.0,
    ];
    if (this._flipVertical) {
      for (let i = 0; i < texY.length; i++) {
        texY[i] = 1 - texY[i];
      }
    }
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
    // Use half of width, half of height, to center geometry around (0, 0)
    const hw = width / 2;
    const hh = height / 2;
    // Packed array containing 2D position, SDF origin and distance, and UV coordinates
    // prettier-ignore
    return hasCorners ? [
      // top hexagon
      tl - hw, hh, tl - hw, hh - half, half, texX[1], texY[0],
      hw - tr, hh, hw - tr, hh - half, half, texX[5], texY[0],
      tl - hw, hh - tl, tl - hw, hh - half, half, texX[1], texY[1],
      hw - tr, hh - tr, hw - tr, hh - half, half, texX[5], texY[2],
      half - hw, hh - half, half - hw, hh - half, half, texX[3], texY[3],
      hw - half, hh - half, hw - half, hh - half, half, texX[4], texY[3],

      // left hexagon
      -hw, bl - hh, half - hw, bl - hh, half, texX[0], texY[5],
      -hw, hh - tl, half - hw, hh - tl, half, texX[0], texY[1],
      bl - hw, bl - hh, half - hw, bl - hh, half, texX[2], texY[5],
      tl - hw, hh - tl, half - hw, hh - tl, half, texX[1], texY[1],
      half - hw, half - hh, half - hw, half - hh, half, texX[3], texY[4],
      half - hw, hh - half, half - hw, hh - half, half, texX[3], texY[3],

      // bottom hexagon
      hw - br, -hh, hw - br, half - hh, half, texX[6], texY[7],
      bl - hw, -hh, bl - hw, half - hh, half, texX[2], texY[7],
      hw - br, br - hh, hw - br, half - hh, half, texX[6], texY[6],
      bl - hw, bl - hh, bl - hw, half - hh, half, texX[2], texY[5],
      hw - half, half - hh, hw - half, half - hh, half, texX[4], texY[4],
      half - hw, half - hh, half - hw, half - hh, half, texX[3], texY[4],

      // right hexagon
      hw, hh - tr, hw - half, hh - tr, half, texX[7], texY[2],
      hw, br - hh, hw - half, br - hh, half, texX[7], texY[6],
      hw - tr, hh - tr, hw - half, hh - tr, half, texX[5], texY[2],
      hw - br, br - hh, hw - half, br - hh, half, texX[6], texY[6],
      hw - half, hh - half, hw - half, hh - half, half, texX[4], texY[3],
      hw - half, half - hh, hw - half, half - hh, half, texX[4], texY[4],

      // top-left radius
      -hw, hh, tl - hw, hh - tl, tl, texX[0], texY[0],
      tl - hw, hh, tl - hw, hh - tl, tl, texX[1], texY[0],
      -hw, hh - tl, tl - hw, hh - tl, tl, texX[0], texY[1],
      tl - hw, hh - tl, tl - hw, hh - tl, tl, texX[1], texY[1],

      // top-right radius
      hw - tr, hh, hw - tr, hh - tr, tr, texX[5], texY[0],
      hw, hh, hw - tr, hh - tr, tr, texX[7], texY[0],
      hw - tr, hh - tr, hw - tr, hh - tr, tr, texX[5], texY[2],
      hw, hh - tr, hw - tr, hh - tr, tr, texX[7], texY[2],

      // bottom-left radius
      -hw, bl - hh, bl - hw, bl - hh, bl, texX[0], texY[5],
      bl - hw, bl - hh, bl - hw, bl - hh, bl, texX[2], texY[5],
      -hw, -hh, bl - hw, bl - hh, bl, texX[0], texY[7],
      bl - hw, -hh, bl - hw, bl - hh, bl, texX[2], texY[7],

      // bottom-right radius
      hw - br, br - hh, hw - br, br - hh, br, texX[6], texY[6],
      hw, br - hh, hw - br, br - hh, br, texX[7], texY[6],
      hw - br, -hh, hw - br, br - hh, br, texX[6], texY[7],
      hw, -hh, hw - br, br - hh, br, texX[7], texY[7],
    ] : [
      -hw, hh, -hw, hh - half, half, texX[0], texY[0],
      hw, hh, hw, hh - half, half, texX[7], texY[0],
      half - hw, hh - half, half - hw, hh - half, half, texX[3], texY[3],
      hw - half, hh - half, hw - half, hh - half, half, texX[4], texY[3],

      -hw, -hh, half - hw, -hh, half, texX[0], texY[7],
      -hw, hh, half - hw, hh, half, texX[0], texY[0],
      half - hw, half - hh, half - hw, half - hh, half, texX[3], texY[4],
      half - hw, hh - half, half - hw, hh - half, half, texX[3], texY[3],

      hw, -hh, hw, half - hh, half, texX[7], texY[7],
      -hw, -hh, -hw, half - hh, half, texX[0], texY[7],
      hw - half, half - hh, hw - half, half - hh, half, texX[4], texY[4],
      half - hw, half - hh, half - hw, half - hh, half, texX[3], texY[4],

      hw, hh, hw - half, hh, half, texX[7], texY[0],
      hw, -hh, hw - half, -hh, half, texX[7], texY[7],
      hw - half, hh - half, hw - half, hh - half, half, texX[4], texY[3],
      hw - half, half - hh, hw - half, half - hh, half, texX[4], texY[4],
    ];
  }

  setBackgroundImage(tex: WebGL.Texture) {
    this.getNode().setUniform('u_texture', tex);
    if (tex) {
      this._bgTextureWidth = tex.getWidth();
      this._bgTextureHeight = tex.getHeight();
    } else {
      this._bgTextureWidth = 0;
      this._bgTextureHeight = 0;
    }
    this.setGeometryDirty(true);
    this.update();
  }

  setBackgroundResizeMode(mode: ResizeMode) {
    if (!(mode in BG_RESIZE)) {
      throw new Error(`Invalid bg resize mode: ${mode}`);
    }
    this._bgResize = mode;
    if (this._bgTextureHeight > 0 && this._bgTextureWidth > 0) {
      this.setGeometryDirty(true);
      this.update();
    }
  }

  setTintColor(color: number) {
    this._tintColor = color;
    this.getNode().setUniform('u_tint', [
      ((color >>> 16) & 0xff) / 255,
      ((color >>> 8) & 0xff) / 255,
      (color & 0xff) / 255,
    ]);
  }

  setFlipVertical(flag: boolean) {
    this._flipVertical = !!flag;
  }
}
