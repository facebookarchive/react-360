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

import type ShadowView from './views/ShadowView';

type Style = {
  [property: string]: any,
};

export default function setStyle(view: ShadowView, style: Style) {
  for (const property in style) {
    // $FlowFixMe - computed property
    const setter = view[`__setStyle_${property}`];
    if (typeof setter === 'function') {
      setter.call(view, style[property]);
    }
  }
}
