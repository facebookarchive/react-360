/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

export default function getPixelData(gl) {
  const canvas = gl.canvas;
  const width = canvas.width;
  const height = canvas.height;
  const buffer = new ArrayBuffer(width * height * 4);
  const pixels = new Uint8Array(buffer);
  gl.readPixels(0, 0, width, height, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
  return {
    width,
    height,
    pixels,
    getPixel(x, y) {
      const offset = ((height - y) * width + x) * 4;
      return [pixels[offset], pixels[offset + 1], pixels[offset + 2], pixels[offset + 3]];
    },
  };
}
