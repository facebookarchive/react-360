/**
 * Copyright (c) 2016-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

// Apply a set of styles to a DOM node
export default function setStyles(node, styles) {
  for (let property in styles) {
    let destination = property;
    // Handle prefixed properties
    if (!node.style.hasOwnProperty(destination)) {
      const uppercase = destination[0].toUpperCase() + destination.substr(1);
      if (node.style.hasOwnProperty('moz' + uppercase)) {
        destination = 'moz' + uppercase;
      } else if (node.style.hasOwnProperty('webkit' + uppercase)) {
        destination = 'webkit' + uppercase;
      }
    }
    node.style[destination] = styles[property];
  }
}
