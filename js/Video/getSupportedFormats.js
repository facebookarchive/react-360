/*
 * Copyright (c) 2016-present, Oculus, LLC
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

const FORMATS = {
  ogg: 'video/ogg; codecs="theora, vorbis"',
  mp4: 'video/mp4; codecs="avc1.4D401E, mp4a.40.2"',
  mkv: 'video/x-matroska; codecs="theora, vorbis"',
  webm: 'video/webm; codecs="vp8, vorbis"',
};

let supportCache = null;

export default function getSupportedFormats() {
  if (supportCache) {
    return supportCache;
  }

  const video = document.createElement('video');
  supportCache = [];
  for (const type in FORMATS) {
    const canPlay = video.canPlayType(FORMATS[type]);
    if (canPlay.length && canPlay !== 'no') {
      supportCache.push(type);
    }
  }

  return supportCache;
}
