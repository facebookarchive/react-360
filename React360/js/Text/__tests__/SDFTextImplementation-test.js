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

/* eslint-disable import/no-commonjs */

jest
  .dontMock('../BreakIterator')
  .dontMock('../wrapText')
  .dontMock('../../OVRUI/SDFFont/DefaultFont')
  .dontMock('../Implementations/SDFDefaultFont')
  .dontMock('../Implementations/SDFTextImplementation');

const SDFTextImplementation = require('../Implementations/SDFTextImplementation').default;

describe('SDFTextImplementation', () => {
  it('does things', () => {
    const impl = new SDFTextImplementation();
    console.log(impl.extractGlyphs('', 20, 'Hello'));
  });
});
