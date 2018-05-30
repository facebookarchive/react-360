/**
 * Copyright (c) 2016-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

/**
 * This file exports BitmapFontGeometry, which creates geometry used to display text
 * with alignment/wrapping. Includes loadFont(), measureText() and alignment constants.
 * Font includes glyph data and material, where material uses custom distance field shader.
 *
 * The texture format of the font is a signed distance field as this allows scaling of
 * the font with the same set of texture data. As generation of the font happens upfront
 * new glyphs are not added dynamically to combat this a number of example fonts for various
 * localizations are included.
 *
 * The weight of the font can be controlled through the use of the fontParms.
 * Default values for this are `{AlphaCenter: 0.47, ColorCenter: 0.49}`
 * which will give a thin font that has been tested to not alias at typical display
 * heights. If a thicker font is desired the AlphaCenter can be reduced which will increase
 * the black border or both AlphaCenter and ColorCenter can be reduced which will increase
 * the internal width. Good values are in the 0.4 to 0.5 range.
 */

import * as THREE from 'three';
import {DEFAULT_FONT_TEXTURE, DEFAULT_FONT_JSON} from './DefaultFont';

export const BASELINE = 'baseline';
export const BOTTOM = 'bottom';
export const CENTER = 'center';
export const CENTER_FIXEDHEIGHT = 'center_fixedheight';
export const CENTER_LINE = 'center_line';
export const LEFT = 'left';
export const RIGHT = 'right';
export const RIGHT_LINE = 'right_line';
export const TOP = 'top';
export const SDFFONT_MARKER_COLOR = 0;

/*
 * Helpers for handling common control characters
 */
function isBreakable(code) {
  return code === 32 || code === 13 || code === 10;
}
function isNewLine(code) {
  return code === 13 || code === 10;
}
function isWhiteSpace(code) {
  return code === 32 || code === 9;
}

const vertexShader = `
varying vec2 vUv;
attribute vec4 fontParms;
attribute vec4 textColors;
varying vec4 vFontParms;
varying vec4 vTextColor;
varying vec4 vMVPosition;
void main( ) {
  vUv = uv;
  vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
  vFontParms = fontParms;
  vTextColor = textColors;
  vMVPosition = mvPosition;
  gl_Position = projectionMatrix * mvPosition;
}
`;

/**
 * Signed distance field font shader which makes use of fontParms encoded per vertex.
 * The use of per vertex fontParams allows the potential of encoding changable params
 * within one render
 */
const fragmentShader = `
uniform sampler2D texture;
uniform vec4 textColor;
uniform vec4 clipRegion;
varying vec4 vTextColor;
varying vec4 vFontParms;
varying vec4 vMVPosition;
varying vec2 vUv;
void main( void ) {
  float distance = texture2D( texture, vUv ).r;
  float ds = vFontParms.z * 255.0;
  float dd = fwidth( vUv.x ) * vFontParms.w * 16.0 * ds;
  float ALPHA_MIN = vFontParms.x - dd;
  float ALPHA_MAX = vFontParms.x + dd;
  float COLOR_MIN = vFontParms.y - dd;
  float COLOR_MAX = vFontParms.y + dd;
  float value = ( clamp( distance, COLOR_MIN, COLOR_MAX ) - COLOR_MIN ) / max(0.00001, COLOR_MAX - COLOR_MIN );
  float alpha = ( clamp( distance, ALPHA_MIN, ALPHA_MAX ) - ALPHA_MIN ) / max(0.00001,  ALPHA_MAX - ALPHA_MIN );
  if (vMVPosition.x < clipRegion.x) {
    discard;
  }
  if (vMVPosition.y < clipRegion.y) {
    discard;
  }
  if (vMVPosition.x > clipRegion.z) {
    discard;
  }
  if (vMVPosition.y > clipRegion.w) {
    discard;
  }
  float premultAlphaValue = value * vTextColor.w * textColor.w;
  gl_FragColor = vec4(
    premultAlphaValue,
    premultAlphaValue,
    premultAlphaValue,
    alpha) *
    vTextColor *
    textColor;
}
`;

// internal helper to object to break text into lines
function LineBreaker(text, fontObject, fontHeight) {
  const fallback = fontObject.data.CharMap[42];
  return {
    text: text,
    fontObject: fontObject,
    cursor: 0,
    nextBreak: function(maxWidth) {
      let width = 0;
      if (this.cursor >= this.text.length) {
        return null;
      }
      let code = this.text.charCodeAt(this.cursor++);
      if (code === SDFFONT_MARKER_COLOR) {
        this.cursor += 4;
        if (this.cursor >= this.text.length) {
          return null;
        }
        code = this.text.charCodeAt(this.cursor++);
      }

      let curFontObject = this.fontObject;
      let g = this.fontObject.data.CharMap[code];
      if (!g) {
        for (let index = 0; index < this.fontObject.fallbacks.length; index++) {
          const fallbackFontObject = this.fontObject.fallbacks[index];
          g = fallbackFontObject.data.CharMap[code];
          if (g) {
            curFontObject = fallbackFontObject;
            break;
          }
        }
      }
      g = g || fallback;
      curFontObject = curFontObject || this.fontObject;
      const font = curFontObject.data;
      const xScale = fontHeight / font.FontHeight;

      width += g.AdvanceX * xScale;
      if (isBreakable(code)) {
        return {
          position: this.cursor,
          required: isNewLine(code),
          whitespace: isWhiteSpace(code),
          split: false,
          width: width,
        };
      }
      code = this.text.charCodeAt(this.cursor);
      if (code === SDFFONT_MARKER_COLOR) {
        this.cursor += 5;
        code = this.text.charCodeAt(this.cursor);
      }
      while (this.cursor < this.text.length && !isBreakable(code)) {
        const g = font.CharMap[code] || fallback;
        const w = g.AdvanceX * xScale;
        if (width + w > maxWidth) {
          return {
            position: this.cursor,
            required: false,
            whitespace: false,
            split: true,
            width: width,
          };
        }
        width += w;
        this.cursor++;
        code = this.text.charCodeAt(this.cursor);
        if (code === SDFFONT_MARKER_COLOR) {
          this.cursor += 5;
          code = this.text.charCodeAt(this.cursor);
        }
      }
      return {
        position: this.cursor,
        required: false,
        whitespace: false,
        split: false,
        width: width,
      };
    },
  };
}

/*
 * split input string into lines based on fontHeight and maxWidth. THis will stop splitting
 * based on the settings of maxHeight and maxLines
 * @param fontObject - loaded font object
 * @param text - string containing the text to render
 * @param fontHeight - default font Height in world units
 * @param maxWidth - max width in world units
 * @param maxHeight - max height to fit font into in world units
 * @param maxLines - max number of lines to display
 * @return - array of strings for each line
 */
export function splitLines(
  fontObject,
  text,
  fontHeight,
  maxWidth,
  maxHeight,
  maxLines,
  hasPerPixelClip,
) {
  let lineStart = 0;
  let lastOption = 0;
  const breaker = new LineBreaker(text, fontObject, fontHeight);
  let bk;
  const lines = [];
  let lineWidth = 0;
  while ((bk = breaker.nextBreak(maxWidth))) {
    if (bk.whitespace && lineWidth === 0) {
      lineStart = bk.position;
    }
    // potentially move to a new line
    if (bk.required || (lineWidth !== 0 && lineWidth + bk.width > maxWidth)) {
      if (lineStart !== lastOption) {
        lines[lines.length] = text.slice(lineStart, lastOption).trim();
      }
      lineWidth = 0;
      lineStart = lastOption;
      // dont start a new line with a single white space character
      if (bk.whitespace) {
        lineStart = bk.position;
        continue;
      }
    }
    lineWidth += bk.width;
    lastOption = bk.position;
  }
  // add final line
  if (lineStart < text.length) {
    lines[lines.length] = text.slice(lineStart).trim();
  }
  // cap the number of lines
  if (maxLines > 0) {
    lines.splice(maxLines);
  }
  // cap the number of lines based on the maxHeight
  if (maxHeight) {
    if (hasPerPixelClip) {
      lines.splice(Math.ceil(maxHeight / fontHeight));
    } else {
      lines.splice(Math.floor(maxHeight / fontHeight));
    }
  }
  return lines;
}

/*
 * compute single strings with wrapping to fit within width
 * unlike splitlines, wrap lines will output a single string
 * @param fontObject - loaded font object
 * @param text - string containing the text to render
 * @param fontHeight - default font Height in world units
 * @param maxWidth - max width in world units
 * @param maxHeight - max height to fit font into in world units
 * @param maxLines - max number of lines to display
 * @return - single string of text with new line characters
 */
export function wrapLines(
  fontObject,
  text,
  fontHeight,
  maxWidth,
  maxHeight,
  maxLines,
  hasPerPixelClip,
) {
  return splitLines(
    fontObject,
    text,
    fontHeight,
    maxWidth,
    maxHeight,
    maxLines,
    hasPerPixelClip,
  ).join('\n');
}

/*
 * determine text extents based on the text input
 * if measuring of the text needs to fit in a certain width `wrapLines` should be called
 * and the results of that should be input into measureText
 * @param fontObject - loaded font object
 * @param text - string containing the text to render
 * @param fontHeight - default font Height in world units
 */
export function measureText(fontObject, text, fontHeight) {
  const dim = {
    maxWidth: 0,
    maxHeight: 0,
    maxDescent: 0,
    numLines: 1,
    lineWidths: [],
  };
  // calculate the unit size of the input font
  let width = 0;
  const fallback = fontObject.data.CharMap[42];
  for (let i = 0; i < text.length; i++) {
    const charCode = text.charCodeAt(i);
    if (charCode === SDFFONT_MARKER_COLOR) {
      i += 4;
      continue;
    }
    // test for new line and update current maxWidth
    if (isNewLine(charCode)) {
      if (width > dim.maxWidth) {
        dim.maxWidth = width;
      }
      if (i !== text.length - 1) {
        dim.maxHeight += fontHeight;
        dim.maxDescent = 0;
      }
      // store the lines width
      dim.lineWidths[dim.lineWidths.length] = width;
      width = 0;
      dim.numLines++;
      continue;
    }
    // look up the glyph
    let curFontObject = fontObject;
    let g = fontObject.data.CharMap[charCode];
    if (!g) {
      for (let index = 0; index < fontObject.fallbacks.length; index++) {
        const fallbackFontObject = fontObject.fallbacks[index];
        g = fallbackFontObject.data.CharMap[charCode];
        if (g) {
          curFontObject = fallbackFontObject;
          break;
        }
      }
    }
    g = g || fallback;
    curFontObject = curFontObject || fontObject;
    const font = curFontObject.data;
    const xScale = fontHeight / font.FontHeight;
    const yScale = fontHeight / font.FontHeight;

    const descent = (g.Height - g.BearingY) * yScale;
    if (descent > dim.maxDescent) {
      dim.maxDescent = descent;
    }
    width += g.AdvanceX * xScale;
  }
  if (width > dim.maxWidth) {
    dim.maxWidth = width;
  }
  if (width > 0) {
    dim.maxHeight += fontHeight;
    dim.lineWidths[dim.lineWidths.length] = width;
  }
  if (dim.maxDescent > 0) {
    dim.maxHeight += dim.maxDescent;
  }

  return dim;
}

/**
 * Specialisation of Three.js BufferGeometry for creation of Signed Distance Field fonts
 */
export function BitmapFontGeometry(fontObject, text, fontHeight, config = {}) {
  const frame = config.frame || [0, 0, 0, 0];
  const deltaZ = config.deltaZ || 0;
  const hAlign = config.hAlign || LEFT;
  const vAlign = config.vAlign || BASELINE;
  const fontParms = config.fontParms || {
    AlphaCenter: 0.47,
    ColorCenter: 0.49,
  };
  // Caller may have already computed dim via measureText, e.g. for autoScaling.
  const dim = config.dim || measureText(fontObject, text, fontHeight);
  // encode the fontParams within bytes to allow compactly passing in vertex shader
  const fontParamsAlphaCenter = Math.min(
    255,
    fontParms.AlphaCenter * 255 || 108,
  );
  const fontParamsColorCenter = Math.min(
    255,
    fontParms.ColorCenter * 255 || 128,
  );

  // Run the constructor of the superclass
  THREE.BufferGeometry.apply(this);

  // return if the font data is not yet setup
  if (!fontObject.data) {
    return;
  }

  // calculate unit scaling
  const curPos = [0, 0];

  const numGlyphs = text.length;
  // allocate for the worst case number of entries
  const positionsBuffer = new Float32Array(numGlyphs * 4 * 3);
  const texCoordBuffer = new Float32Array(numGlyphs * 4 * 2);
  const fontParmsBuffer = new Uint8Array(numGlyphs * 4 * 4);
  const textColorBuffer = new Uint8Array(numGlyphs * 4 * 4);
  const indicesBuffer = new Uint32Array(numGlyphs * 6);

  // horizontal alignment setup
  if (hAlign === LEFT) {
    curPos[0] = frame[0];
  } else if (hAlign === CENTER) {
    curPos[0] = frame[0] + frame[2] / 2 - dim.maxWidth / 2;
  } else if (hAlign === RIGHT) {
    curPos[0] = frame[0] + frame[2] - dim.maxWidth;
  }

  const baseFont = fontObject.data;
  // vertical alignment setup
  const yBaseScale = fontHeight / fontObject.data.FontHeight;
  if (vAlign === BASELINE) {
    curPos[1] = frame[1] + dim.maxHeight - fontHeight;
  } else if (vAlign === CENTER) {
    const ma = baseFont.MaxAscent;
    const md = baseFont.MaxDescent;
    const fh = baseFont.FontHeight;
    // one line of full extent of font plus dim.numLines - 1 of fontHeight
    const maxFontExtent = ma + md + fh * (dim.numLines - 1);
    curPos[1] = (maxFontExtent / 2 - fh) * yBaseScale;
  } else if (vAlign === CENTER_FIXEDHEIGHT) {
    // for fixed height, we must adjust single-line text by the max ascent because fonts
    // are rendered according to their baseline. For multiline text, the first line
    // contributes max ascent only while the other lines are adjusted by font height.
    const ma = baseFont.MaxAscent;
    const md = baseFont.MaxDescent;
    const fh = baseFont.FontHeight;
    const maxFontHeight = ma + md;
    const maxTextHeight =
      (fh * (dim.numLines - 1) + maxFontHeight) * yBaseScale;
    curPos[1] = (maxTextHeight - fontHeight) * 0.5 - md * yBaseScale;
  } else if (vAlign === TOP) {
    curPos[1] = frame[1] + frame[3] - fontHeight;
  } else if (vAlign === BOTTOM) {
    curPos[1] = frame[1] + dim.maxHeight - fontHeight;
  }

  // prepare horizontal alignment
  const startX = curPos[0];
  if (hAlign === CENTER_LINE) {
    curPos[0] = frame[0] + frame[2] / 2 - dim.lineWidths[0] / 2;
  } else if (hAlign === RIGHT_LINE) {
    curPos[0] = frame[0] + frame[2] - dim.lineWidths[0];
  }
  let offsetZ = 0.0;
  let lineIndex = 0;
  let index = 0;
  const textColor = [0xff, 0xff, 0xff, 0xff];
  const fallback = baseFont.CharMap[42];
  let lastGroupIndex = 0;
  let lastFontObject = fontObject;

  const materials = [];
  for (let i = 0; i < text.length; i++) {
    const charCode = text.charCodeAt(i);
    if (charCode === SDFFONT_MARKER_COLOR) {
      textColor[0] = text.charCodeAt(i + 1);
      textColor[1] = text.charCodeAt(i + 2);
      textColor[2] = text.charCodeAt(i + 3);
      textColor[3] = text.charCodeAt(i + 4);
      i += 4;
      continue;
    }
    if (isNewLine(charCode)) {
      curPos[0] = startX;
      curPos[1] -= fontHeight;
      lineIndex++;

      // handle per line alignment
      if (hAlign === CENTER_LINE) {
        curPos[0] = frame[0] + frame[2] / 2 - dim.lineWidths[lineIndex] / 2;
      } else if (hAlign === RIGHT_LINE) {
        curPos[0] = frame[0] + frame[2] - dim.lineWidths[lineIndex];
      }
      // add empty glyph
      continue;
    }
    let curFontObject = fontObject;
    let g = fontObject.data.CharMap[charCode];
    if (!g) {
      for (let index = 0; index < fontObject.fallbacks.length; index++) {
        const fallbackFontObject = fontObject.fallbacks[index];
        g = fallbackFontObject.data.CharMap[charCode];
        if (g) {
          curFontObject = fallbackFontObject;
          break;
        }
      }
    }
    g = g || fallback;
    curFontObject = curFontObject || fontObject;
    const font = curFontObject.data;
    const xScale = fontHeight / font.FontHeight;
    const yScale = fontHeight / font.FontHeight;

    if (curFontObject !== lastFontObject) {
      if (lastGroupIndex !== index) {
        this.addGroup(
          lastGroupIndex * 6,
          (index - lastGroupIndex) * 6,
          materials.length,
        );
        materials.push(lastFontObject.material);
      }
      lastGroupIndex = index;
      lastFontObject = curFontObject;
    }

    const s0 = g.X / font.NaturalWidth;
    const t0 = g.Y / font.NaturalHeight;
    const s1 = (g.X + g.Width) / font.NaturalWidth;
    const t1 = (g.Y + g.Height) / font.NaturalHeight;

    const bearingX = g.BearingX * xScale;
    const bearingY = g.BearingY * yScale;

    const rw = (g.Width + g.BearingX) * xScale;
    const rh = (g.Height - g.BearingY) * yScale;
    const r = [1, 0, 0];
    const u = [0, 1, 0];

    // add glyph
    positionsBuffer[index * 12 + 0] = curPos[0] + r[0] * bearingX - u[0] * rh;
    positionsBuffer[index * 12 + 1] = curPos[1] + r[1] * bearingX - u[1] * rh;
    positionsBuffer[index * 12 + 2] = offsetZ + r[2] * bearingX - u[2] * rh;
    texCoordBuffer[index * 8 + 0] = s0;
    texCoordBuffer[index * 8 + 1] = t1;
    fontParmsBuffer[index * 16 + 0] = fontParamsAlphaCenter;
    fontParmsBuffer[index * 16 + 1] = fontParamsColorCenter;
    fontParmsBuffer[index * 16 + 2] = 0x02;
    fontParmsBuffer[index * 16 + 3] = 0xff;
    textColorBuffer[index * 16 + 0] = textColor[0];
    textColorBuffer[index * 16 + 1] = textColor[1];
    textColorBuffer[index * 16 + 2] = textColor[2];
    textColorBuffer[index * 16 + 3] = textColor[3];

    positionsBuffer[index * 12 + 3] =
      curPos[0] + r[0] * bearingX + u[0] * bearingY;
    positionsBuffer[index * 12 + 4] =
      curPos[1] + r[1] * bearingX + u[1] * bearingY;
    positionsBuffer[index * 12 + 5] =
      offsetZ + r[2] * bearingX + u[2] * bearingY;
    texCoordBuffer[index * 8 + 2] = s0;
    texCoordBuffer[index * 8 + 3] = t0;
    fontParmsBuffer[index * 16 + 4] = fontParamsAlphaCenter;
    fontParmsBuffer[index * 16 + 5] = fontParamsColorCenter;
    fontParmsBuffer[index * 16 + 6] = 0x02;
    fontParmsBuffer[index * 16 + 7] = 0xff;
    textColorBuffer[index * 16 + 4] = textColor[0];
    textColorBuffer[index * 16 + 5] = textColor[1];
    textColorBuffer[index * 16 + 6] = textColor[2];
    textColorBuffer[index * 16 + 7] = textColor[3];

    positionsBuffer[index * 12 + 6] = curPos[0] + r[0] * rw + u[0] * bearingY;
    positionsBuffer[index * 12 + 7] = curPos[1] + r[1] * rw + u[1] * bearingY;
    positionsBuffer[index * 12 + 8] = offsetZ + r[2] * rw + u[2] * bearingY;
    texCoordBuffer[index * 8 + 4] = s1;
    texCoordBuffer[index * 8 + 5] = t0;
    fontParmsBuffer[index * 16 + 8] = fontParamsAlphaCenter;
    fontParmsBuffer[index * 16 + 9] = fontParamsColorCenter;
    fontParmsBuffer[index * 16 + 10] = 0x02;
    fontParmsBuffer[index * 16 + 11] = 0xff;
    textColorBuffer[index * 16 + 8] = textColor[0];
    textColorBuffer[index * 16 + 9] = textColor[1];
    textColorBuffer[index * 16 + 10] = textColor[2];
    textColorBuffer[index * 16 + 11] = textColor[3];

    positionsBuffer[index * 12 + 9] = curPos[0] + r[0] * rw - u[0] * rh;
    positionsBuffer[index * 12 + 10] = curPos[1] + r[1] * rw - u[1] * rh;
    positionsBuffer[index * 12 + 11] = offsetZ + r[2] * rw - u[2] * rh;
    texCoordBuffer[index * 8 + 6] = s1;
    texCoordBuffer[index * 8 + 7] = t1;
    fontParmsBuffer[index * 16 + 12] = fontParamsAlphaCenter;
    fontParmsBuffer[index * 16 + 13] = fontParamsColorCenter;
    fontParmsBuffer[index * 16 + 14] = 0x02;
    fontParmsBuffer[index * 16 + 15] = 0xff;
    textColorBuffer[index * 16 + 12] = textColor[0];
    textColorBuffer[index * 16 + 13] = textColor[1];
    textColorBuffer[index * 16 + 14] = textColor[2];
    textColorBuffer[index * 16 + 15] = textColor[3];

    indicesBuffer[index * 6 + 0] = index * 4 + 0;
    indicesBuffer[index * 6 + 1] = index * 4 + 1;
    indicesBuffer[index * 6 + 2] = index * 4 + 2;
    indicesBuffer[index * 6 + 3] = index * 4 + 0;
    indicesBuffer[index * 6 + 4] = index * 4 + 2;
    indicesBuffer[index * 6 + 5] = index * 4 + 3;

    index++;
    curPos[0] += g.AdvanceX * xScale;
    offsetZ += deltaZ;
  }

  // set the common and shader specfic font buffers
  this.type = 'SDFText';
  this.isSDFText = true;
  this.onBeforeRender = function(object, material) {
    if (object.parent.textColor) {
      material.uniforms.textColor.value.set(
        object.parent.textColor.r,
        object.parent.textColor.g,
        object.parent.textColor.b,
        object.opacity,
      );
    }
    const textClip = object.textClip;
    if (textClip && object.parent.clippingEnabled) {
      material.uniforms.clipRegion.value.set(
        textClip[0],
        textClip[1],
        textClip[2],
        textClip[3],
      );
    } else {
      material.uniforms.clipRegion.value.set(-16384, -16384, 16384, 16384);
    }
  };
  this.textClip = [-16384, -16384, 16384, 16384];
  this.addAttribute('position', new THREE.BufferAttribute(positionsBuffer, 3));
  this.addAttribute('uv', new THREE.BufferAttribute(texCoordBuffer, 2));
  this.addAttribute(
    'fontParms',
    new THREE.BufferAttribute(fontParmsBuffer, 4, true),
  );
  this.addAttribute(
    'textColors',
    new THREE.BufferAttribute(textColorBuffer, 4, true),
  );
  this.setIndex(new THREE.BufferAttribute(indicesBuffer, 1));
  if (lastGroupIndex !== index) {
    this.addGroup(
      lastGroupIndex * 6,
      (index - lastGroupIndex) * 6,
      materials.length,
    );
    materials.push(lastFontObject.material);
  }
  this.computeBoundingSphere();
  this.materials = materials;
}

BitmapFontGeometry.prototype = Object.create(THREE.BufferGeometry.prototype);
BitmapFontGeometry.prototype.constructor = BitmapFontGeometry;

/**
 * Load the external resources necessary to render a font.
 * @return A Promise that is resolved with the font data when all
 *   resources have been processed.
 */
export function loadFont(fontName, fontTexture, loader) {
  if (!fontName) {
    // Use default font
    fontTexture = DEFAULT_FONT_TEXTURE;
  }
  const tex = new THREE.TextureLoader().load(fontTexture, texture => {
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    texture.minFilter = THREE.LinearFilter;
    texture.flipY = false;
  });

  const uniforms = {
    texture: {
      value: tex,
    },
    textColor: {
      type: 'v4',
      value: new THREE.Vector4(),
    },
    clipRegion: {
      type: 'v4',
      value: new THREE.Vector4(-16384, -16384, 16384, 16384),
    },
  };

  // custom shader used for signed distance field rendering
  const material = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    side: THREE.DoubleSide,
    extensions: {derivatives: true},
  });

  material.premultipliedAlpha = true;
  material.depthWrite = false;
  material.transparent = true;

  // iterate through the fontdata creating the necessary look up tables
  function initFontData(data) {
    data.CharMap = [];
    data.MaxAscent = 0;
    data.MaxDescent = 0;
    for (const g in data.Glyphs) {
      const glyph = data.Glyphs[g];
      data.CharMap[glyph.CharCode] = glyph;
      const ascent = glyph.BearingY;
      const descent = glyph.Height - glyph.BearingY;
      if (ascent > data.MaxAscent) {
        data.MaxAscent = ascent;
      }
      if (descent > data.MaxDescent) {
        data.MaxDescent = descent;
      }
    }
  }

  function getDefaultFont() {
    const font = {
      CharMap: {},
      NaturalWidth: DEFAULT_FONT_JSON.NaturalWidth,
      NaturalHeight: DEFAULT_FONT_JSON.NaturalHeight,
      FontHeight: DEFAULT_FONT_JSON.FontHeight,
      MaxAscent: DEFAULT_FONT_JSON.MaxAscent,
      MaxDescent: DEFAULT_FONT_JSON.MaxDescent,
    };
    const glyphs = DEFAULT_FONT_JSON.Glyphs;
    for (let i = glyphs.length; i--; ) {
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

  const font = {
    data: null,
    material: material,
    fallbacks: [],
  };

  // If no fontName provided, use default and return immediately.
  if (!fontName) {
    font.data = getDefaultFont();
    return font;
  }

  const fileLoader = loader || new THREE.FileLoader();
  return new Promise((resolve, reject) => {
    fileLoader.load(fontName, response => {
      const data = JSON.parse(response);
      initFontData(data);
      font.data = data;
      resolve(font);
    });
  });
}

export function addFontFallback(fontObject, fallbackFontObject) {
  fontObject.fallbacks.push(fallbackFontObject);
}
