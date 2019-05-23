/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @flow strict
 */

import * as WebGL from 'webgl-lite';

const VERT = `
attribute vec2 a_position;
varying vec2 v_position;
uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 u_transform;

void main() {
  v_position = a_position;
  gl_Position = projectionMatrix * viewMatrix * u_transform * vec4(a_position, 0.0, 1.0);
}
`;

const FRAG = `
precision mediump float;
varying vec2 v_position;
uniform vec3 u_color;
uniform float u_radius;

vec2 center = vec2(0, 0);

void main() {
  float centerDistance = distance(v_position, center);
  float alpha = 1.0;
  if (centerDistance > u_radius) {
    alpha = 0.0;
  }
  vec3 color = u_color;
  if (centerDistance > u_radius * 0.8) {
    color = vec3(0, 0, 0);
  }
  gl_FragColor = vec4(color, alpha);
}
`;

export default function createCursorProgram(gl: WebGLRenderingContext) {
  const prog = new WebGL.Program(gl);
  return prog
    .addShader(VERT, gl.VERTEX_SHADER)
    .addShader(FRAG, gl.FRAGMENT_SHADER)
    .compile()
    .setUniformDefaults({
      u_color: [1, 1, 1],
    });
}
