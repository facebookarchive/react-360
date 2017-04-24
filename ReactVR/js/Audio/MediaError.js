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
 * Custom media errors class for audio, correspond to HTML media error
 */

export const MEDIA_ERR_ABORTED = 1; // W3C error code, the fetching was aborted by the user's request.
export const MEDIA_ERR_NETWORK = 2; // W3C error code, the fetching was failed by network error.
export const MEDIA_ERR_DECODE = 3; // W3C error code, an error occurred while trying to decode the media.
export const MEDIA_ERR_SRC_NOT_SUPPORTED = 4; // W3C error code, the media has been found to be unsuitable.

export default class MediaError {
  code: number;
  message: string;

  constructor(code: number, message: string) {
    this.code = code;
    this.message = message;
  }
}
