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

/**
 * Turns a relative path into a full path based upon the current location.
 * Full paths are required for Web Workers loading external scripts.
 */
export default function bundleFromLocation(root: string): string {
  let path = location.pathname;
  try {
    const absoluteURL = new URL(root);
    return absoluteURL.toString();
  } catch (error) {
    // location is not an absolute URL, generate one from the root
    if (!path.endsWith('/')) {
      // Trim filename
      path = path.substr(0, path.lastIndexOf('/'));
    } else {
      path = path.substr(0, path.length - 1);
    }
    return `${location.protocol}//${location.host}${path}/${root}`;
  }
}
