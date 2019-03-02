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

import {DEFAULT_FONT_TEXTURE, DEFAULT_FONT_JSON} from './SDFDefaultFont';
import SDFFontGeometry from './SDFFontGeometry';
import {VERT_SHADER, FRAG_SHADER} from './SDFTextShaders';
import * as WebGL from 'webgl-lite';
import type {GlyphRun, TextImplementation, TextRenderInfo} from 'webgl-ui';

type GlyphData = {
  AdvanceX: number,
  BearingY: number,
  Height: number,
};

type SDFFont = {
  FontHeight: number,
  CharMap: Array<GlyphData>,
  NaturalWidth: number,
  NaturalHeight: number,
};

const FALLBACK_CODE = 42;

function createProgram(gl: WebGLRenderingContext) {
  const prog = new WebGL.Program(gl);
  prog
    .addShader(VERT_SHADER, gl.VERTEX_SHADER)
    .addShader(FRAG_SHADER, gl.FRAGMENT_SHADER)
    .compile()
    .setUniformDefaults({
      u_color: [0, 0, 0, 1],
      u_transform: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    });
  return prog;
}

const PM = new WebGL.ProgramManager(createProgram);

export default class SDFTextImplementation implements TextImplementation {
  _atlases: Array<{
    image: Image,
    texture: WebGL.Texture,
  }>;
  _fonts: Array<SDFFont>;
  _gl: WebGLRenderingContext;

  constructor(gl: WebGLRenderingContext) {
    this._gl = gl;
    gl.getExtension('OES_standard_derivatives');
    this._fonts = [];
    this._fonts[0] = SDFTextImplementation.parseFontJSON(DEFAULT_FONT_JSON);
    this._atlases = [];

    const tex = new WebGL.Texture(gl);
    const image = new Image();
    this._atlases[0] = {
      image,
      texture: tex,
    };
    image.onload = () => {
      tex.setSource(image);
    };
    image.src = DEFAULT_FONT_TEXTURE;
  }

  createText(text: string, options?: Object) {
    return new SDFFontGeometry(this._gl, this, text, options);
  }

  loadFont(dataPath: string, texPath: string): Promise<void> {
    return fetch(dataPath)
      .then(raw => raw.json())
      .then(json => {
        const font = SDFTextImplementation.parseFontJSON(json);
        this._fonts.push(font);
      });
  }

  extractGlyphs(fontName: string, size: number, text: string): GlyphRun {
    const run = {
      glyphs: [],
      maxAscend: 0,
      maxDescend: 0,
      totalWidth: 0,
    };

    const fallback = this._fonts[0].CharMap[FALLBACK_CODE];
    const fontCount = this._fonts.length;
    for (let i = 0, length = text.length; i < length; i++) {
      const charCode = text.charCodeAt(i);
      let fontIndex = 0;
      let data = this._fonts[fontIndex].CharMap[charCode];
      while (!data && fontIndex < fontCount - 1) {
        fontIndex++;
        data = this._fonts[fontIndex].CharMap[charCode];
      }
      if (!data) {
        data = fallback;
        fontIndex = 0;
      }
      const font = this._fonts[fontIndex];
      const scale = size / font.FontHeight;
      const ascend = data.BearingY * scale;
      const descend = (data.Height - data.BearingY) * scale;
      if (ascend > run.maxAscend) {
        run.maxAscend = ascend;
      }
      if (descend > run.maxDescend) {
        run.maxDescend = descend;
      }
      const width = data.AdvanceX * scale;
      run.totalWidth += width;

      run.glyphs.push({
        attributes: {
          ...data,
          NaturalWidth: font.NaturalWidth,
          NaturalHeight: font.NaturalHeight,
          scale,
        },
        code: text[i],
        metrics: {
          ascend,
          descend,
          width,
        },
      });
    }

    return run;
  }

  updateGeometry(node: WebGL.Node, info: TextRenderInfo, params: Object) {
    const {align} = params;
    const center = params.center || 0.5;

    let count = 0;
    let width = params.alignWidth || 0;
    for (let i = 0; i < info.lines.length; i++) {
      count += info.lines[i].glyphs.length;
      const lineWidth = info.lines[i].width;
      if (lineWidth > width) {
        width = lineWidth;
      }
    }
    const lineHeight = params.lineHeight || Math.ceil(info.size * 1.2);
    const buffer = new ArrayBuffer(count * 4 * 20);
    const floatBuffer = new Float32Array(buffer);
    const index = [];
    let y = 0;

    let vertIndex = 0;
    for (let i = 0; i < info.lines.length; i++) {
      const line = info.lines[i];
      const verticalLead = (lineHeight - line.maxAscend) / 2;
      const baseline = y - verticalLead - line.maxAscend;

      const glyphs = line.glyphs;
      let x = 0;
      if (align === 'right') {
        x = width - line.width;
      } else if (align === 'center') {
        x = (width - line.width) / 2;
      }
      for (let j = 0; j < glyphs.length; j++) {
        const glyph = glyphs[j];
        const attr = glyph.attributes;
        const metrics = glyph.metrics;

        // texture coords
        const s0 = attr.X / attr.NaturalWidth;
        const t0 = attr.Y / attr.NaturalHeight;
        const s1 = (attr.X + attr.Width) / attr.NaturalWidth;
        const t1 = (attr.Y + attr.Height) / attr.NaturalHeight;

        const left = x + attr.BearingX * attr.scale;
        const top = baseline + metrics.ascend;
        const right = x + (attr.BearingX + attr.Width) * attr.scale;
        const bottom = baseline - metrics.descend;

        const floatStart = vertIndex * 5;
        // top left
        floatBuffer[floatStart] = left;
        floatBuffer[floatStart + 1] = top;
        floatBuffer[floatStart + 2] = s0;
        floatBuffer[floatStart + 3] = t0;
        floatBuffer[floatStart + 4] = center;
        // bottom left
        floatBuffer[floatStart + 5] = left;
        floatBuffer[floatStart + 6] = bottom;
        floatBuffer[floatStart + 7] = s0;
        floatBuffer[floatStart + 8] = t1;
        floatBuffer[floatStart + 9] = center;
        // top right
        floatBuffer[floatStart + 10] = right;
        floatBuffer[floatStart + 11] = top;
        floatBuffer[floatStart + 12] = s1;
        floatBuffer[floatStart + 13] = t0;
        floatBuffer[floatStart + 14] = center;
        // bottom right
        floatBuffer[floatStart + 15] = right;
        floatBuffer[floatStart + 16] = bottom;
        floatBuffer[floatStart + 17] = s1;
        floatBuffer[floatStart + 18] = t1;
        floatBuffer[floatStart + 19] = center;

        // prettier-ignore
        index.push(
          vertIndex, vertIndex + 1, vertIndex + 2,
          vertIndex + 2, vertIndex + 1, vertIndex + 3,
        );

        vertIndex += 4;

        x += metrics.width;
      }
      y -= lineHeight;
    }

    node.geometry.bufferData(buffer);
    node.geometry.bufferIndex(index);

    const tex = this._atlases[0].texture;
    node.setUniform('u_texture', tex);
  }

  createNode() {
    const program = PM.getProgram(this._gl);
    const node = new WebGL.Node(this._gl, program);
    node.addAttribute('a_position');
    node.addAttribute('a_uv');
    node.addAttribute('a_center');
    return node;
  }

  static parseFontJSON(json: Object): SDFFont {
    const font = {
      CharMap: [],
      FontHeight: json.FontHeight,
      NaturalWidth: json.NaturalWidth,
      NaturalHeight: json.NaturalHeight,
    };
    const glyphs = json.Glyphs;
    for (let i = glyphs.length - 1; i >= 0; i--) {
      const glyph = glyphs[i];
      const glyphData = {
        X: glyph[1],
        Y: glyph[2],
        Width: glyph[3],
        Height: glyph[4],
        AdvanceX: glyph[5],
        AdvanceY: glyph[6],
        BearingX: glyph[7],
        BearingY: glyph[8],
      };
      font.CharMap[glyph[0]] = glyphData;
    }
    return font;
  }
}
