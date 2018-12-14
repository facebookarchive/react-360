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

import type FontGeometry from './FontGeometry';
import * as WebGL from 'webgl-lite';

export type Glyph = {
  attributes: {[key: string]: any}, // Any per-glyph values needed to render, like atlas offset
  code: string, // Codepoint to display, may be multiple 'chars' in UTF-8
  color: number, // Character color, in ARGB format
  metrics: GlyphMetrics, // Dimensions of glyph
};

export type GlyphMetrics = {
  ascend: number,
  descend: number,
  width: number,
};

export type GlyphRun = {
  glyphs: Array<Glyph>,
  maxAscend: number,
  maxDescend: number,
  totalWidth: number,
};

export type TextLine = {
  glyphs: Array<Glyph>,
  maxAscend: number,
  maxDescend: number,
  width: number,
};

export type TextRenderInfo = {
  font: string,
  lines: Array<TextLine>,
  size: number,
};

export interface TextImplementation {
  extractGlyphs(font: string, size: number, text: string, color?: number): GlyphRun;
  createText(text: string, options?: Object): FontGeometry;
  createNode(): WebGL.Node;
  updateGeometry(node: WebGL.Node, info: TextRenderInfo, params: Object): void;
}
