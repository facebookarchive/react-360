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

import * as WebGL from 'webgl-lite';

const VERT = `
attribute vec3 a_position;
attribute vec2 a_uv;
varying vec2 v_uv;
uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 u_transform;

void main() {
  v_uv = a_uv;
  gl_Position = projectionMatrix * viewMatrix * u_transform * vec4(a_position, 1.0);
}
`;

const FRAG = `
precision mediump float;
varying vec2 v_uv;
uniform sampler2D u_texture;

void main() {
  gl_FragColor = texture2D(u_texture, v_uv);
}
`;

export default function createSurfaceProgram(gl: WebGLRenderingContext) {
  const prog = new WebGL.Program(gl);
  return prog
    .addShader(VERT, gl.VERTEX_SHADER)
    .addShader(FRAG, gl.FRAGMENT_SHADER)
    .compile();
}
