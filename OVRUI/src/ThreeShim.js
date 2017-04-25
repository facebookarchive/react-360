/**
 * Copyright (c) 2016-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

/**
 * Shims Three.js dependencies based upon the environment.
 * This allows us to use the `three` package with the npm build, and the THREE
 * global variable when using the single-file distribution.
 */

// Intentionally using require() syntax here, so it can be replaced at build time
const THREE = (window && window.THREE) || require('three');

if (!THREE) {
  throw new Error("Could not find Three.js! Make sure you've included the appropriate .js file");
}

export default THREE;
