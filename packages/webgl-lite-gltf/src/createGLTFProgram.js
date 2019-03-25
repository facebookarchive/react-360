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
import SupportedAttributes from './GLTFShaderAttributes';

const ProgramsForContext = new Map();

export default function createGLTFProgram(gl: WebGLRenderingContext, attributes: Array<string>) {
  const requiredAttributes = attributes.slice(0).filter(name => {
    return name in SupportedAttributes;
  });
  requiredAttributes.sort();
  const id = requiredAttributes.join();
  let programs = ProgramsForContext.get(gl);
  if (!programs) {
    programs = {};
    ProgramsForContext.set(gl, programs);
  }
  if (programs[id]) {
    return programs[id];
  }
  const prog = new WebGL.Program(gl);
  const defines = requiredAttributes.map(attr => `HAS_${attr}`);
  prog
    .addShader(VERT, gl.VERTEX_SHADER, defines)
    .addShader(FRAG, gl.FRAGMENT_SHADER, defines)
    .compile()
    .setUniformDefaults({
      u_transform: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    });
  programs[id] = prog;
  return prog;
}

const VERT = `
attribute vec3 a_position;
uniform mat4 u_transform;
uniform mat4 projectionMatrix;

#ifdef HAS_NORMAL
attribute vec3 a_normal;
varying vec3 v_normal;
varying highp vec3 v_lighting;
#endif
#ifdef HAS_TANGENT
attribute vec4 a_tangent;
varying vec4 v_tangent;
#endif
#ifdef HAS_TEXCOORD_0
attribute vec2 a_texcoord_0;
varying vec2 v_texcoord_0;
#endif
#ifdef HAS_TEXCOORD_1
attribute vec2 a_texcoord_1;
varying vec2 v_texcoord_1;
#endif
#ifdef HAS_COLOR_0
attribute vec3 a_color_0;
varying vec3 v_color_0;
#endif
// if color is vec4 in source data, create a single-float
// alpha attribute to carry the extra data

highp vec3 white = vec3(1.0, 1.0, 1.0);

#ifdef HAS_NORMAL
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

mat4 transpose(mat4 m) {
  return mat4(
    m[0][0], m[1][0], m[2][0], m[3][0],
    m[0][1], m[1][1], m[2][1], m[3][1],
    m[0][2], m[1][2], m[2][2], m[3][2],
    m[0][3], m[1][3], m[2][3], m[3][3]
  );
}
#endif

void main() {
#ifdef HAS_NORMAL
  v_normal = a_normal;
  highp vec3 ambient = vec3(0.1, 0.1, 0.1);
  highp vec3 directionVec = normalize(vec3(0.8, 0.8, 0.7));
  highp vec4 transformedNormal = transpose(inverse(u_transform)) * vec4(v_normal, 1.0);
  highp float directional = max(dot(transformedNormal.xyz, directionVec), 0.0);

  v_lighting = ambient + white * directional;
#endif
#ifdef HAS_TANGENT
  v_tangent = a_tangent;
#endif
#ifdef HAS_TEXCOORD_0
  v_texcoord_0 = a_texcoord_0;
#endif
#ifdef HAS_TEXCOORD_1
  v_texcoord_1 = a_texcoord_1;
#endif
#ifdef HAS_COLOR_0
  v_color_0 = a_color_0;
#endif
  gl_Position = projectionMatrix * u_transform * vec4(a_position, 1.0);
}
`;

const FRAG = `
precision mediump float;
uniform sampler2D u_texture_0;
uniform sampler2D u_texture_1;

#ifdef HAS_NORMAL
varying vec3 v_normal;
varying highp vec3 v_lighting;
#endif
#ifdef HAS_TANGENT
varying vec4 v_tangent;
#endif
#ifdef HAS_TEXCOORD_0
varying vec2 v_texcoord_0;
#endif
#ifdef HAS_TEXCOORD_1
varying vec2 v_texcoord_1;
#endif
#ifdef HAS_COLOR_0
varying vec3 v_color_0;
#endif

void main() {
  highp vec4 color = vec4(0.75, 0.75, 0.75, 1.0);
#ifdef HAS_COLOR_0
  color = vec4(v_color_0, 1.0);
#endif
#ifdef HAS_TEXCOORD_0
  color = texture2D(u_texture_0, v_texcoord_0);
#endif

#ifdef HAS_NORMAL
  gl_FragColor = vec4(color.rgb * v_lighting, color.a);
#else
  gl_FragColor = color;
#endif
}
`;
