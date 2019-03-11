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
varying highp vec3 v_position;
uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 u_transform;

void main() {
  v_position = a_position;
  gl_Position = projectionMatrix * viewMatrix * u_transform * vec4(a_position, 1.0);
}
`;

const FRAG = `
#define RECIPROCAL_PI 0.31830988

precision highp float;
varying highp vec3 v_position;
uniform sampler2D u_texture;
uniform float u_arclen_reciprocal;
uniform float u_tintlevel;
uniform int ViewID;
uniform vec4 u_left_view;
uniform vec4 u_right_view;

void main() {
  vec3 norm = normalize(v_position);
  float v = 0.5 - asin(norm.y) * RECIPROCAL_PI;
  float u = atan(norm.x, -norm.z) * u_arclen_reciprocal + 0.5;
  vec4 tint = vec4(1.0 - u_tintlevel, 1.0 - u_tintlevel, 1.0 - u_tintlevel, 1.0);
  vec4 offset = u_left_view;
  if (ViewID == 1) {
    offset = u_right_view;
  }
  vec2 uv = vec2(u * offset.z + offset.x, v * offset.w + offset.y);
  gl_FragColor = texture2D(u_texture, uv) * tint;
  if (u < 0. || u > 1. || v < 0. || v > 1.) {
    gl_FragColor = vec4(0, 0, 0, 0);
  }
}
`;

export default function createEnvironmentSphereProgram(gl: WebGLRenderingContext) {
  const prog = new WebGL.Program(gl);
  return prog
    .addShader(VERT, gl.VERTEX_SHADER)
    .addShader(FRAG, gl.FRAGMENT_SHADER)
    .compile()
    .setUniformDefaults({
      u_arclen_reciprocal: 1 / Math.PI / 2,
      u_transform: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
      u_tintlevel: 0,
      ViewID: 0,
      u_left_view: [0, 0, 1, 1],
      u_right_view: [0, 0, 1, 1],
    });
}
