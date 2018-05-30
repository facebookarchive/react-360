/*
 * Copyright (c) 2016-present, Oculus, LLC
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

const FORMATS = {
  mp3: 'audio/mpeg; codecs="mp3"',
  m4a: 'audio/aac',
  ogg: 'audio/ogg; codecs="vorbis"',
  wav: 'audio/wav; codecs="1"',
  webm: 'audio/webm; codecs="vorbis"',
};

let supportCache = null;

export default function getSupportedFormats() {
  if (supportCache) {
    return supportCache;
  }

  const audio = document.createElement('audio');
  supportCache = [];
  for (const type in FORMATS) {
    const canPlay = audio.canPlayType(FORMATS[type]);
    if (canPlay.length && canPlay !== 'no') {
      supportCache.push(type);
    }
  }

  return supportCache;
}
