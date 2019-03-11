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
attribute vec2 a_position;
varying highp vec2 v_position;
uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 u_transform;

void main() {
  v_position = a_position;
  gl_Position = vec4(a_position, 0.99999, 1.);
}
`;

const FRAG = `
precision highp float;
varying highp vec2 v_position;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;
uniform samplerCube u_texture;
uniform float u_tintlevel;

mat4 inverse(mat4 m) {
  float
    a00 = m[0][0], a01 = m[0][1], a02 = m[0][2], a03 = m[0][3],
    a10 = m[1][0], a11 = m[1][1], a12 = m[1][2], a13 = m[1][3],
    a20 = m[2][0], a21 = m[2][1], a22 = m[2][2], a23 = m[2][3],
    a30 = m[3][0], a31 = m[3][1], a32 = m[3][2], a33 = m[3][3],
    b00 = a00 * a11 - a01 * a10,
    b01 = a00 * a12 - a02 * a10,
    b02 = a00 * a13 - a03 * a10,
    b03 = a01 * a12 - a02 * a11,
    b04 = a01 * a13 - a03 * a11,
    b05 = a02 * a13 - a03 * a12,
    b06 = a20 * a31 - a21 * a30,
    b07 = a20 * a32 - a22 * a30,
    b08 = a20 * a33 - a23 * a30,
    b09 = a21 * a32 - a22 * a31,
    b10 = a21 * a33 - a23 * a31,
    b11 = a22 * a33 - a23 * a32,
    det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

  return mat4(
    a11 * b11 - a12 * b10 + a13 * b09,
    a02 * b10 - a01 * b11 - a03 * b09,
    a31 * b05 - a32 * b04 + a33 * b03,
    a22 * b04 - a21 * b05 - a23 * b03,
    a12 * b08 - a10 * b11 - a13 * b07,
    a00 * b11 - a02 * b08 + a03 * b07,
    a32 * b02 - a30 * b05 - a33 * b01,
    a20 * b05 - a22 * b02 + a23 * b01,
    a10 * b10 - a11 * b08 + a13 * b06,
    a01 * b08 - a00 * b10 - a03 * b06,
    a30 * b04 - a31 * b02 + a33 * b00,
    a21 * b02 - a20 * b04 - a23 * b00,
    a11 * b07 - a10 * b09 - a12 * b06,
    a00 * b09 - a01 * b07 + a02 * b06,
    a31 * b01 - a30 * b03 - a32 * b00,
    a20 * b03 - a21 * b01 + a22 * b00
  ) / det;
}

void main() {
  mat4 inv = inverse(projectionMatrix * viewMatrix);
  vec4 t = inv * vec4(v_position, 1, 1);
  vec4 tint = vec4(1.0 - u_tintlevel, 1.0 - u_tintlevel, 1.0 - u_tintlevel, 1.0);
  gl_FragColor = textureCube(u_texture, normalize(t.xyz / t.w)) * tint;
}
`;

export default function createEnvironmentSphereProgram(gl: WebGLRenderingContext) {
  const prog = new WebGL.Program(gl);
  return prog
    .addShader(VERT, gl.VERTEX_SHADER)
    .addShader(FRAG, gl.FRAGMENT_SHADER)
    .compile()
    .setUniformDefaults({
      u_tintlevel: 0,
    });
}
