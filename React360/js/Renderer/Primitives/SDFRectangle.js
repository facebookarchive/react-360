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

export const VERT_SHADER = `
attribute vec2 a_position;
attribute vec2 a_center;
attribute float a_edge;

varying vec2 v_position;
varying vec2 v_center;
varying float v_edge;

uniform mat4 u_transform;

#ifdef IMAGE
attribute vec2 a_uv;
varying vec2 v_uv;
#endif

void main() {
  v_position = a_position;
  v_center = a_center;
  v_edge = a_edge;
  #ifdef IMAGE
  v_uv = a_uv;
  #endif

  gl_Position = projectionMatrix * u_transform * vec4(a_position * vec2(1, -1), 0, 1.0);
}
`;

export const FRAG_SHADER = `
precision mediump float;

uniform float u_stroke;
uniform vec4 u_bgcolor;
uniform vec4 u_bordercolor;
uniform float u_opacity;

varying vec2 v_position;
varying vec2 v_center;
varying float v_edge;

#ifdef IMAGE
uniform sampler2D u_texture;
varying vec2 v_uv;
#endif

void main() {
  float dist = distance(v_position, v_center) - v_edge;
  #ifdef IMAGE
  vec4 sample = texture2D(u_texture, v_uv);
  if (v_uv.x < 0. || v_uv.y < 0. || v_uv.x > 1. || v_uv.y > 1.) {
    sample = vec4(0., 0., 0., 0.);
  }
  #else
  vec4 sample = u_bgcolor;
  #endif
  vec4 color = mix(sample, u_bordercolor, clamp(dist + u_stroke, 0., 1.));
  float opacity = clamp(0.6 - dist, 0., 1.);
  gl_FragColor = vec4(color.rgb, color.a * opacity * u_opacity);
}
`;
