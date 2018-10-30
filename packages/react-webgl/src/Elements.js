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

import {Image, Text, View} from 'webgl-ui';

export const quad = {
  create: () => new View(),
  dispatchers: (() => {
    const d = {};
    View.registerBindings(d);
    return d;
  })(),
};

export const text = {
  create: root => new Text(root.getTextImplementation()),
  dispatchers: (() => {
    const d = {};
    Text.registerBindings(d);
    return d;
  })(),
};

export const image = {
  create: root => new Image(root.getTextureManager()),
  dispatchers: (() => {
    const d = {};
    Image.registerBindings(d);
    return d;
  })(),
};
