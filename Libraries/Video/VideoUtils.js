/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule VideoUtils
 */

export function videoTimeFormat(time) {
  if (!time) {
    return '--:--';
  }

  const timeS = Math.floor(time);
  const seconds = timeS % 60;
  const minutes = Math.floor(timeS / 60) % 60;
  const h = Math.floor(timeS / 3600);
  // Mandate two digit minutes only if h is non-zero
  const mm = h ? `0${minutes}`.slice(-2) : minutes;
  const ss = `0${seconds}`.slice(-2);
  const timertext = h ? `${h}:${mm}:${ss}` : `${mm}:${ss}`;
  return timertext;
}
