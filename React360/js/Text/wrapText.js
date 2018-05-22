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
import type {TextDimensions, TextImplementation} from './Types';

type TextLine = {
  dimensions: TextDimensions,
  text: string,
};

const LINE_BREAK = /[\r\n]+$/;

export default function wrapText(
  impl: TextImplementation,
  font: string,
  size: number,
  text: string,
  fitToWidth: void | number,
  options: Object = {},
): Array<TextLine> {
  const lines = [];
  // Todo: expose configurable locale once the underlying API has better support
  const iter = new BreakIterator('en', text, options);
  let cursor = 0;
  const forceBreak = typeof fitToWidth === 'number';
  const forceWidth = typeof fitToWidth === 'number' ? fitToWidth : 9999;
  let lineDims = {
    glyphMetrics: [],
    maxAscend: 0,
    maxDescend: 0,
    width: 0,
  };
  let lineText = '';
  for (const breakpoint of iter) {
    const chunk = text.slice(cursor, breakpoint);
    const rawDimensions = impl.measure(font, size, chunk);
    if (forceBreak && lineDims.width + rawDimensions.width > forceWidth) {
      // Test trimming whitespace
      const trimmed = chunk.trimRight();
      const dLen = chunk.length - trimmed.length;
      let glyphs = rawDimensions.glyphMetrics;
      let width = rawDimensions.width;
      if (dLen > 0) {
        glyphs = glyphs.slice(0, glyphs.length - dLen);
        width = 0;
        for (let i = 0; i < glyphs.length; i++) {
          width += glyphs[i].width;
        }
      }
      if (lineDims.width + width > forceWidth) {
        // If it still overruns the width after trimming,
        // push the original to the next line
        if (lineDims.width > 0) {
          lines.push({
            dimensions: lineDims,
            text: lineText,
          });
          lineDims = {
            glyphMetrics: rawDimensions.glyphMetrics,
            maxAscend: rawDimensions.maxAscend,
            maxDescend: rawDimensions.maxDescend,
            width: rawDimensions.width,
          };
          lineText = chunk;
        }
      } else {
        // Trimming whitespace makes it fit
        lineDims.glyphMetrics = lineDims.glyphMetrics.concat(glyphs);
        lineDims.maxAscend = Math.max(
          lineDims.maxAscend,
          rawDimensions.maxAscend,
        );
        lineDims.maxDescend = Math.max(
          lineDims.maxDescend,
          rawDimensions.maxDescend,
        );
        lineDims.width += width;
        lineText += trimmed;
      }
    } else if (chunk.match(LINE_BREAK)) {
      lineDims.glyphMetrics = lineDims.glyphMetrics.concat(
        rawDimensions.glyphMetrics,
      );
      lineDims.maxAscend = Math.max(
        lineDims.maxAscend,
        rawDimensions.maxAscend,
      );
      lineDims.maxDescend = Math.max(
        lineDims.maxDescend,
        rawDimensions.maxDescend,
      );
      lineDims.width += rawDimensions.width;
      lineText += chunk.replace(LINE_BREAK, '');

      lines.push({
        dimensions: lineDims,
        text: lineText,
      });
      lineDims = {
        glyphMetrics: [],
        maxAscend: 0,
        maxDescend: 0,
        width: 0,
      };
      lineText = '';
    } else {
      lineDims.glyphMetrics = lineDims.glyphMetrics.concat(
        rawDimensions.glyphMetrics,
      );
      lineDims.maxAscend = Math.max(
        lineDims.maxAscend,
        rawDimensions.maxAscend,
      );
      lineDims.maxDescend = Math.max(
        lineDims.maxDescend,
        rawDimensions.maxDescend,
      );
      lineDims.width += rawDimensions.width;
      lineText += chunk;
    }
    cursor = breakpoint;
  }
  if (lineDims.width > 0) {
    lines.push({
      dimensions: lineDims,
      text: lineText,
    });
  }

  return lines;
}
