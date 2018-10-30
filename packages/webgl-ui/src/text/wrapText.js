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

import BreakIterator from './BreakIterator';
import type {TextLine, TextImplementation, TextRenderInfo} from './TextTypes';

const LINE_BREAK = /[\r\n]+$/;

export default function wrapText(
  impl: TextImplementation,
  font: string,
  size: number,
  text: string,
  fitToWidth: void | number,
  options: Object = {}
): TextRenderInfo {
  const lines: Array<TextLine> = [];
  // Todo: expose configurable locale once the underlying API has better support
  const iter = new BreakIterator('en', text, options);
  let cursor = 0;
  const forceBreak = typeof fitToWidth === 'number';
  const forceWidth = typeof fitToWidth === 'number' ? fitToWidth : 9999;
  let line: TextLine = {
    glyphs: [],
    maxAscend: 0,
    maxDescend: 0,
    width: 0,
  };
  let lastColor;
  // $FlowFixMe
  for (const breakpoint of iter) {
    const chunk = text.slice(cursor, breakpoint);
    const run = impl.extractGlyphs(font, size, chunk, lastColor);
    if (run.glyphs.length > 0) {
      lastColor = run.glyphs[run.glyphs.length - 1].color;
    }
    if (forceBreak && line.width + run.totalWidth > forceWidth) {
      // Test trimming whitespace
      const trimmed = chunk.trimRight();
      const dLen = chunk.length - trimmed.length;
      let glyphs = run.glyphs;
      let width = run.totalWidth;
      if (dLen > 0) {
        glyphs = glyphs.slice(0, glyphs.length - dLen);
        width = 0;
        for (let i = 0; i < glyphs.length; i++) {
          width += glyphs[i].metrics.width;
        }
      }
      if (line.width + width > forceWidth) {
        // If it still overruns the width after trimming,
        // push the original to the next line
        if (line.width > 0) {
          lines.push(line);
          line = {
            glyphs: run.glyphs.slice(),
            maxAscend: run.maxAscend,
            maxDescend: run.maxDescend,
            width: run.totalWidth,
          };
        }
      } else {
        // Trimming whitespace makes it fit
        line.glyphs = line.glyphs.concat(glyphs);
        line.maxAscend = Math.max(line.maxAscend, run.maxAscend);
        line.maxDescend = Math.max(line.maxDescend, run.maxDescend);
        line.width += width;
      }
    } else if (chunk.match(LINE_BREAK)) {
      line.glyphs = line.glyphs.concat(run.glyphs);
      line.maxAscend = Math.max(line.maxAscend, run.maxAscend);
      line.maxDescend = Math.max(line.maxDescend, run.maxDescend);
      line.width += run.totalWidth;

      lines.push(line);
      line = {
        glyphs: [],
        maxAscend: 0,
        maxDescend: 0,
        width: 0,
      };
    } else {
      line.glyphs = line.glyphs.concat(run.glyphs);
      line.maxAscend = Math.max(line.maxAscend, run.maxAscend);
      line.maxDescend = Math.max(line.maxDescend, run.maxDescend);
      line.width += run.totalWidth;
    }
    cursor = breakpoint;
  }
  if (line.width > 0) {
    lines.push(line);
  }

  return {
    font,
    lines,
    size,
  };
}
