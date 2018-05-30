/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule texture
 */

/**
 * Opaque wrapper around custom textures, allows us to change the implementation
 * at any time.
 */
function texture(name, options) {
  return {uri: 'texture://' + name};
}

module.exports = texture;
