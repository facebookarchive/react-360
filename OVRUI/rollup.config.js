/**
 * Copyright (c) 2016-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import babel from 'rollup-plugin-babel';
import path from 'path';
import replace from 'rollup-plugin-replace';

export default {
  entry: path.join(__dirname, 'src', 'OVRUI.js'),
  plugins: [
    babel({
      babelrc: false,
      presets: [['es2015', {'modules': false}], 'flow'],
      plugins: ['external-helpers'],
      comments: false,
    }),
    replace({
      include: path.join('src', 'ThreeShim.js'),
      values: {
        // This plugin is a bit buggy
        "require\\('three'\\)": 'undefined',
        "require('three')": 'window.THREE',
      },
    }),
  ],
  format: 'iife',
  moduleName: 'OVRUI',
  dest: path.join('dist', 'ovrui.js'),
};
