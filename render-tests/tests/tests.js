/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

module.exports = {
  basicgl: {
    test: () => require('./test-basicgl').default,
    capture: {x: 0, y: 0, width: 300, height: 300},
  },
  geometry: {
    test: () => require('./test-geometry').default,
    capture: {x: 0, y: 0, width: 300, height: 300},
  },
  views: {
    test: () => require('./test-views').default,
    capture: {x: 0, y: 0, width: 300, height: 300},
  },
};
