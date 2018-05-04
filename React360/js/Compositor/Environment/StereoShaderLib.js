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

/**
 * Shader library for rendering stereo textures
 *
 * Part of this code is source from meshbasic_vert.glsl and meshbasic_frag.glsl
 * of Three.js
 * https://github.com/mrdoob/three.js/
 */

const StereoShaderLib = {
  stereo_basic_vert: `
      uniform vec4 stereoOffsetRepeat;
      varying highp vec3 vPosition;
      #ifndef USE_ENVMAP
      varying highp vec2 vUv;
      #endif
      void main()
      {
          vPosition = position;
          #ifndef USE_ENVMAP
          vUv = uv * stereoOffsetRepeat.zw + stereoOffsetRepeat.xy;
          #endif
          gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
      }
  `,

  stereo_basic_frag: `
      #define RECIPROCAL_PI2 0.15915494
      #define RECIPROCAL_PI 0.31830988
      uniform vec4 stereoOffsetRepeat;
      uniform vec3 color;
      uniform float opacity;
      uniform float useUV;
      uniform float arcOffset;
      uniform float arcLengthReciprocal;
      #ifdef ENVMAP_TYPE_CUBE
      uniform samplerCube envMap;
      #else
      uniform sampler2D map;
      varying highp vec2 vUv;
      #endif
      varying highp vec3 vPosition;
      void main()
      {
        vec4 diffuseColor = vec4( 1.0, 1.0, 1.0, opacity );

        #ifdef ENVMAP_TYPE_CUBE
        vec4 texColor = textureCube( envMap, vec3( vPosition.z, vPosition.yx ) );
        #else
        vec2 sampleUV;
        if (useUV > 0.0) {
          sampleUV = vUv;
        } else {
          vec3 nrm = normalize(vPosition);
          sampleUV.y = asin(nrm.y) * RECIPROCAL_PI + 0.5;
          sampleUV.x = (-atan( nrm.z, nrm.x ) + arcOffset) * arcLengthReciprocal + 0.5;
          sampleUV = sampleUV * stereoOffsetRepeat.zw + stereoOffsetRepeat.xy;
        }
        vec4 texColor = texture2D( map, sampleUV );
        #endif
        diffuseColor *= texColor;
        diffuseColor.rgb *= color;

        gl_FragColor = diffuseColor;
      }
  `,
};

export default StereoShaderLib;
