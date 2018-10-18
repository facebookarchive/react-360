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

const EVENTS = {
  onEnter: true,
  onExit: true,
  onInput: true,
};

export default function applyProps(view, oldProps, newProps, dispatchers) {
  for (const p in newProps) {
    if (p === 'children') {
      continue;
    }
    if (oldProps != null && oldProps[p] === newProps[p]) {
      continue;
    }
    if (p in EVENTS) {
      view.setEventHandler(p, newProps[p]);
      continue;
    }
    const setter = view[`__setStyle_${p}`];
    if (typeof setter === 'function') {
      setter.call(view, newProps[p]);
    } else if (p in dispatchers) {
      dispatchers[p].call(view, newProps[p]);
    } else {
      console.error('unknown prop', p);
    }
  }
}
