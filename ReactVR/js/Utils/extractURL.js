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
 * Extract the URL string from a property which might be a string or a resource
 * object.
 */
export default function extractURL(resource: string | {uri: string}): string | null {
  if (typeof resource === 'string') {
    return resource;
  }
  if (typeof resource === 'object' && typeof resource.uri === 'string') {
    return resource.uri;
  }
  return null;
}
