/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import * as WebGL from 'webgl-lite';
import assertColorEqual from '../test-utils/assertColorEqual';
import getPixelData from '../test-utils/getPixelData';

const VERT = `
attribute vec2 a_position;

void main() {
  gl_Position = vec4(a_position, 0, 1.);
}
`;

const FRAG = `
precision mediump float;

void main() {
  gl_FragColor = vec4(1., 0, 0, 1.);
}
`;

export default function test(container) {
  const canvas = document.createElement('canvas', {preserveDrawingBuffer: true});
  canvas.width = 300;
  canvas.height = 300;
  canvas.style.width = 300 + 'px';
  canvas.style.height = 300 + 'px';
  container.appendChild(canvas);
  const gl = canvas.getContext('webgl');
  gl.clearColor(0, 0, 0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);

  const prog = new WebGL.Program(gl)
    .addShader(VERT, gl.VERTEX_SHADER)
    .addShader(FRAG, gl.FRAGMENT_SHADER)
    .compile();
  const node = new WebGL.Node(gl, prog);
  node.addAttribute('a_position');
  const buffer = new ArrayBuffer(4 * 3 * 2);
  const floatBuffer = new Float32Array(buffer);
  const points = [-0.5, -0.5, 0.5, 0.5, -0.5, 0.5];
  for (let i = 0; i < points.length; i++) {
    floatBuffer[i] = points[i];
  }
  node.bufferData(buffer);
  prog.use();
  node.draw();

  const pixelData = getPixelData(gl);
  assertColorEqual(pixelData.getPixel(10, 10), [0, 0, 0, 255]);
  assertColorEqual(pixelData.getPixel(100, 100), [255, 0, 0, 255]);
  assertColorEqual(pixelData.getPixel(200, 200), [0, 0, 0, 255]);
}
