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
uniform mat4 projectionMatrix;

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
precision highp float;

uniform float u_stroke;
uniform vec4 u_bgcolor;
uniform vec4 u_bordercolor;
uniform float u_opacity;
uniform vec4 u_gradientstart;
uniform vec4 u_gradientend;
uniform vec2 u_gradientunit;
uniform float u_gradientlength;

varying vec2 v_position;
varying vec2 v_center;
varying float v_edge;

#ifdef IMAGE
uniform sampler2D u_texture;
uniform vec3 u_tint;
varying vec2 v_uv;
#endif

void main() {
  float dist = distance(v_position, v_center) - v_edge;
  #ifdef IMAGE
  vec4 sample = texture2D(u_texture, v_uv) * vec4(u_tint.rgb, 1.0);
  if (v_uv.x < 0. || v_uv.y < 0. || v_uv.x > 1. || v_uv.y > 1.) {
    sample = vec4(0., 0., 0., 0.);
  }
  #else
  vec4 sample = u_bgcolor;
  #endif

  // Project the position onto the gradient unit vector, and scale it
  float grad_distance = dot(v_position, u_gradientunit) / u_gradientlength;
  vec4 grad_color = mix(u_gradientstart, u_gradientend, grad_distance + 0.5);
  float alpha = clamp(sample.a + grad_color.a, 0., 1.);
  // Blend the gradient color into the underlying bg color or image
  if (alpha > 0.0) {
    sample.rgb = mix(sample.rgb, grad_color.rgb, grad_color.a / alpha);
  }
  sample.a = alpha;

  vec4 color = mix(sample, u_bordercolor, clamp(dist + u_stroke, 0., 1.));
  float opacity = clamp(0.6 - dist, 0., 1.) * color.a * u_opacity;
  gl_FragColor = vec4(color.r * opacity, color.g * opacity, color.b * opacity, opacity);
}
`;
