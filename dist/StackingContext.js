/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */
function compareDescending(a, b) {
  return b - a;
}

function stringToNumber(x) {
  return parseInt(x, 10);
}

function excludeNaN(x) {
  return !isNaN(x);
}

function getOrderedNumericKeys(obj) {
  const numbers = Object.keys(obj).map(stringToNumber).filter(excludeNaN);
  numbers.sort(compareDescending);
  return numbers;
}

export function restack(rootView) {
  const topContext = {
    '0': []
  };
  const stack = [[topContext, rootView]]; // DFS through the node tree

  while (stack.length > 0) {
    const [context, node] = stack.shift();
    let childContext = context;
    const z = String(node.getZIndex());

    if (z === '0') {
      context['0'].push(node);
    } else {
      childContext = context[z];

      if (!childContext) {
        childContext = {
          '0': []
        }; // $FlowFixMe - we know the key isn't '0', but Flow doesn't

        context[z] = childContext;
      }

      childContext['0'].push(node);
    }

    for (let i = node.getChildCount() - 1; i >= 0; i--) {
      const child = node.getChild(i);

      if (child) {
        // Flow can't guarantee child is a ShadowViewWebGL, but we know it is
        stack.unshift([childContext, child]);
      }
    }
  } // DFS through the contexts, visiting z-index levels in ascending order


  const contexts = [topContext];
  let order = 1;

  while (contexts.length > 0) {
    const context = contexts.shift(); // Get the numeric z-indexes at this context, in descending order

    const keys = getOrderedNumericKeys(context);

    if (keys.length === 1 && keys[0] === 0) {
      const queue = context['0'];

      for (let i = 0; i < queue.length; i++) {
        const node = queue[i];
        node.setRenderOrder(order++);
      }
    } else {
      // For each non-zero z-index, push its nested stacking context onto the
      // front of the traversal stack
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];

        if (key === 0) {
          contexts.unshift({
            '0': context['0']
          });
        } else {
          contexts.unshift(context[String(key)]);
        }
      }
    }
  }
}