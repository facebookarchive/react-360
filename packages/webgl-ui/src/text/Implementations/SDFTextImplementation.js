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

import type {GlyphRun, TextImplementation, TextRenderInfo} from '../TextTypes';
import {DEFAULT_FONT_TEXTURE, DEFAULT_FONT_JSON} from './SDFDefaultFont';
import SDFFontGeometry from './SDFFontGeometry';
import {VERT_SHADER, FRAG_SHADER} from './SDFTextShaders';
import * as THREE from 'three';

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

const COLOR_MARKER = 0;
const FALLBACK_CODE = 42;

const SDFTextMaterial = new THREE.ShaderMaterial({
  uniforms: {
    u_transform: {value: new THREE.Matrix4()},
    u_texture: {value: new THREE.Texture()},
  },
  vertexShader: VERT_SHADER,
  fragmentShader: FRAG_SHADER,
  extensions: {derivatives: true},
  transparent: true,
});
SDFTextMaterial.premultipliedAlpha = true;
SDFTextMaterial.depthWrite = false;

export default class SDFTextImplementation implements TextImplementation {
  _atlases: Array<{
    image: Image,
    texture: THREE.Texture | Promise<THREE.Texture>,
  }>;
  _fonts: Array<SDFFont>;

  constructor() {
    this._fonts = [];
    this._fonts[0] = SDFTextImplementation.parseFontJSON(DEFAULT_FONT_JSON);
    this._atlases = [];

    const image = new Image();
    this._atlases[0] = {
      image,
      texture: new Promise(resolve => {
        image.onload = () => {
          const tex = new THREE.Texture(image);
          tex.wrapS = THREE.ClampToEdgeWrapping;
          tex.wrapT = THREE.ClampToEdgeWrapping;
          tex.minFilter = THREE.LinearFilter;
          tex.flipY = false;
          tex.needsUpdate = true;
          this._atlases[0].texture = tex;
          resolve(tex);
        };
      }),
    };
    image.src = DEFAULT_FONT_TEXTURE;
  }

  createText(text: string, options?: Object) {
    return new SDFFontGeometry(this, text, options);
  }

  loadFont(dataPath: string, texPath: string): Promise<void> {
    return fetch(dataPath)
      .then(raw => raw.json())
      .then(json => {
        const font = SDFTextImplementation.parseFontJSON(json);
        this._fonts.push(font);
      });
  }

  extractGlyphs(
    fontName: string,
    size: number,
    text: string,
    color: number = 0xff000000
  ): GlyphRun {
    const run = {
      glyphs: [],
      maxAscend: 0,
      maxDescend: 0,
      totalWidth: 0,
    };

    let currentColor = color;
    const fallback = this._fonts[0].CharMap[FALLBACK_CODE];
    const fontCount = this._fonts.length;
    for (let i = 0, length = text.length; i < length; i++) {
      const charCode = text.charCodeAt(i);
      if (charCode === COLOR_MARKER) {
        currentColor =
          0xff000000 |
          ((text.charCodeAt(i + 1) & 0xff) << 16) |
          ((text.charCodeAt(i + 2) & 0xff) << 8) |
          (text.charCodeAt(i + 3) & 0xff);
        i += 4;
        continue;
      }
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
        color: currentColor,
        metrics: {
          ascend,
          descend,
          width,
        },
      });
    }

    return run;
  }

  updateGeometryAndMaterial(
    geometry: THREE.Geometry,
    material: THREE.Material,
    info: TextRenderInfo,
    params: Object
  ) {
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
    const buffer = new ArrayBuffer(count * 4 * 24);
    const floatBuffer = new Float32Array(buffer);
    const uintBuffer = new Uint8Array(buffer);
    const index = [];
    let y = 0;

    let vertIndex = 0;
    for (let i = 0; i < info.lines.length; i++) {
      const line = info.lines[i];
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
        const top = y - info.size + metrics.ascend;
        const right = x + (attr.BearingX + attr.Width) * attr.scale;
        const bottom = y - info.size - metrics.descend;

        const floatStart = vertIndex * 6;
        // top left
        floatBuffer[floatStart] = left;
        floatBuffer[floatStart + 1] = top;
        floatBuffer[floatStart + 2] = s0;
        floatBuffer[floatStart + 3] = t0;
        floatBuffer[floatStart + 4] = center;
        // bottom left
        floatBuffer[floatStart + 6] = left;
        floatBuffer[floatStart + 7] = bottom;
        floatBuffer[floatStart + 8] = s0;
        floatBuffer[floatStart + 9] = t1;
        floatBuffer[floatStart + 10] = center;
        // top right
        floatBuffer[floatStart + 12] = right;
        floatBuffer[floatStart + 13] = top;
        floatBuffer[floatStart + 14] = s1;
        floatBuffer[floatStart + 15] = t0;
        floatBuffer[floatStart + 16] = center;
        // bottom right
        floatBuffer[floatStart + 18] = right;
        floatBuffer[floatStart + 19] = bottom;
        floatBuffer[floatStart + 20] = s1;
        floatBuffer[floatStart + 21] = t1;
        floatBuffer[floatStart + 22] = center;

        const uintStart = floatStart * 4;
        const color = glyph.color;
        const red = (color >>> 16) & 0xff;
        const green = (color >>> 8) & 0xff;
        const blue = color & 0xff;
        const alpha = (color >>> 24) & 0xff;
        uintBuffer[uintStart + 20] = red;
        uintBuffer[uintStart + 21] = green;
        uintBuffer[uintStart + 22] = blue;
        uintBuffer[uintStart + 23] = alpha;
        uintBuffer[uintStart + 44] = red;
        uintBuffer[uintStart + 45] = green;
        uintBuffer[uintStart + 46] = blue;
        uintBuffer[uintStart + 47] = alpha;
        uintBuffer[uintStart + 68] = red;
        uintBuffer[uintStart + 69] = green;
        uintBuffer[uintStart + 70] = blue;
        uintBuffer[uintStart + 71] = alpha;
        uintBuffer[uintStart + 92] = red;
        uintBuffer[uintStart + 93] = green;
        uintBuffer[uintStart + 94] = blue;
        uintBuffer[uintStart + 95] = alpha;

        // prettier-ignore
        index.push(
          vertIndex, vertIndex + 1, vertIndex + 2,
          vertIndex + 2, vertIndex + 1, vertIndex + 3,
        );

        vertIndex += 4;

        x += metrics.width;
      }
      y -= info.size;
    }

    geometry.setIndex(index);
    const attrBuffer32 = new THREE.InterleavedBuffer(floatBuffer, 6);
    const attrBuffer8 = new THREE.InterleavedBuffer(uintBuffer, 24);
    const attributes = geometry.attributes;
    if ('a_position' in attributes) {
      attributes.a_position.data.setArray(floatBuffer);
      attributes.a_position.data.needsUpdate = true;
    } else {
      geometry.addAttribute(
        'a_position',
        new THREE.InterleavedBufferAttribute(attrBuffer32, 2, 0, false)
      );
    }
    if ('a_uv' in attributes) {
      attributes.a_uv.data.setArray(floatBuffer);
      attributes.a_uv.data.needsUpdate = true;
    } else {
      geometry.addAttribute(
        'a_uv',
        new THREE.InterleavedBufferAttribute(attrBuffer32, 2, 2, false)
      );
    }
    if ('a_center' in attributes) {
      attributes.a_center.data.setArray(floatBuffer);
      attributes.a_center.data.needsUpdate = true;
    } else {
      geometry.addAttribute(
        'a_center',
        new THREE.InterleavedBufferAttribute(attrBuffer32, 1, 4, false)
      );
    }
    if ('a_color' in attributes) {
      attributes.a_color.data.setArray(uintBuffer);
      attributes.a_color.data.needsUpdate = true;
    } else {
      geometry.addAttribute(
        'a_color',
        new THREE.InterleavedBufferAttribute(attrBuffer8, 4, 20, true)
      );
    }

    const tex = this._atlases[0].texture;
    if (tex instanceof Promise) {
      tex.then(t => {
        material.uniforms.u_texture.value = t;
        material.needsUpdate = true;
      });
    } else {
      material.uniforms.u_texture.value = tex;
      material.uniforms.u_texture.needsUpdate = true;
    }
  }

  createMaterial() {
    return SDFTextMaterial.clone();
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
