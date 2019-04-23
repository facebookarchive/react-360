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

import areStylePropsEqual from './StyleSheet/areStylePropsEqual';
import flattenStyle from './StyleSheet/flattenStyle';

const EVENTS = {
  onClick: 'click',
  onEnter: 'enter',
  onExit: 'exit',
  onInput: 'input',
};

export default function applyProps(view, oldProps, newProps, dispatchers) {
  for (const p in newProps) {
    if (p === 'children') {
      continue;
    }
    if (oldProps != null && oldProps[p] === newProps[p]) {
      continue;
    }
    if (p === 'style') {
      const oldStyles = oldProps ? oldProps.style : null;
      const styles = newProps[p];
      if (areStylePropsEqual(oldStyles, styles)) {
        continue;
      }
      const flattened = flattenStyle(styles);
      for (const s in flattened) {
        const setter = view[`__setStyle_${s}`];
        if (typeof setter === 'function') {
          setter.call(view, flattened[s]);
        }
      }
      continue;
    }
    if (p === 'transition') {
      const oldTransitions = oldProps ? oldProps.transition : null;
      const transitions = newProps[p];
      for (const old in oldTransitions) {
        if (!(old in transitions)) {
          view.setTransition(old, null);
        }
      }
      for (const name in transitions) {
        view.setTransition(name, transitions[name]);
      }
      continue;
    }
    if (p in EVENTS) {
      view.clearEventListeners(EVENTS[p]);
      view.addEventListener(EVENTS[p], newProps[p]);
      continue;
    }
    if (p in dispatchers) {
      dispatchers[p].call(view, newProps[p]);
      continue;
    }
    const setter = view[`__setStyle_${p}`];
    if (typeof setter === 'function') {
      setter.call(view, newProps[p]);
    } else {
      console.error('unknown prop', p);
    }
  }
}
