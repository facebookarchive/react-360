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

import Module from './Module';

import type {ReactNativeContext} from '../ReactNativeContext';

type GlyphData = {
  width: number,
  height: number,
  instructions: Array<Instruction>,
  color?: string,
};

type Instruction =
  | ['begin']
  | ['end']
  | ['line', number, number, number, number]
  | ['move', number, number]
  | ['arc', number, number, number, number, number]
  | ['rect', number, number, number, number];

function drawGlyph(
  context: CanvasRenderingContext2D,
  instructions: Array<any>,
  color: string = '#ffffff'
) {
  context.fillStyle = color;
  for (let i = 0, length = instructions.length; i < length; i++) {
    switch (instructions[i][0]) {
      case 'move': {
        const x = instructions[i][1];
        const y = instructions[i][2];
        context.moveTo(x, y);
        break;
      }
      case 'line': {
        const x = instructions[i][1];
        const y = instructions[i][2];
        context.lineTo(x, y);
        break;
      }
      case 'arc': {
        const x = instructions[i][1];
        const y = instructions[i][2];
        const radius = instructions[i][3];
        const startAngle = instructions[i][4];
        const endAngle = instructions[i][5];
        const anticlockwise = !!instructions[i][6];
        context.arc(x, y, radius, startAngle, endAngle, anticlockwise);
        break;
      }
      case 'rect': {
        const x = instructions[i][1];
        const y = instructions[i][2];
        const width = instructions[i][3];
        const height = instructions[i][4];
        context.rect(x, y, width, height);
        break;
      }
      case 'begin':
        context.beginPath();
        break;
      case 'end':
        context.fill();
        break;
    }
  }
  if (instructions.length && instructions[instructions.length - 1][0] !== 'end') {
    // Explicitly close any unclosed final path
    context.fill();
  }
}

/**
 * GlyphTextures Native Module
 * @class GlyphTextures
 * @extends Module
 */
export default class GlyphTextures extends Module {
  _rnctx: ReactNativeContext;

  constructor(rnctx: ReactNativeContext) {
    super('GlyphTextures');
    this._rnctx = rnctx;
  }

  registerGlyph(name: string, glyph: GlyphData) {
    const canvas = document.createElement('canvas');
    canvas.width = glyph.width;
    canvas.height = glyph.height;
    const context = canvas.getContext('2d');
    if (!context) {
      throw new Error('Could not generate 2d context of canvas');
    }
    context.translate(0.5, 0.5);
    drawGlyph(context, glyph.instructions, glyph.color);
    const url = 'glyph/' + name;
    this._rnctx.TextureManager.registerLocalTextureSource(url, canvas);
  }
}
