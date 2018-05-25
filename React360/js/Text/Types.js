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

export type GlyphMetrics = {
  ascend: number,
  descend: number,
  lineHeight: number,
  width: number,
};

export type TextDimensions = {
  glyphMetrics: Array<GlyphMetrics>,
  maxAscend: number,
  maxDescend: number,
  width: number,
};

export interface TextImplementation {
  measure(font: string, size: number, text: string): TextDimensions;
}
