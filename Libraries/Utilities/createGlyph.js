/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule createGlyph
 */

const NativeModules = require('NativeModules');
const GlyphTextures = NativeModules.GlyphTextures;

let nextGlyph = 1;

function createGlyph(glyph, name) {
  if (typeof name !== 'string') {
    name = nextGlyph;
    nextGlyph++;
  }
  const uri = 'texture://glyph/' + name;
  GlyphTextures.registerGlyph(name, glyph);

  return {uri};
}

module.exports = createGlyph;
