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
      uniform vec3 color;
      #ifdef USE_ENVMAP
        varying vec3 vWorldPosition;
        varying vec3 vNormal;
      #endif
      varying lowp vec3 vColor;
      #ifdef USE_MAP
        varying highp vec2 vUv;
      #endif
      void main()
      {
          #ifdef USE_MAP
            vUv = uv * stereoOffsetRepeat.zw + stereoOffsetRepeat.xy;
          #endif
          vColor = color;

          #ifdef USE_ENVMAP
            vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
            vWorldPosition = worldPosition.xyz;
            vNormal = normalMatrix * normal;
          #endif

          gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
      }
  `,

  stereo_basic_frag: `
      #define RECIPROCAL_PI2 0.15915494
      uniform vec4 stereoOffsetRepeat;
      uniform float opacity;
      uniform sampler2D map;
      #ifdef USE_ENVMAP
        varying vec3 vWorldPosition;
        varying vec3 vNormal;
        #ifdef ENVMAP_TYPE_CUBE
          uniform samplerCube envMap;
        #else
          uniform sampler2D envMap;
        #endif
        uniform float reflectivity;
        uniform float flipEnvMap;
        uniform float refractionRatio;
      #endif
      #ifdef USE_MAP
        varying highp vec2 vUv;
      #endif
      varying lowp vec3 vColor;
      void main()
      {
        vec4 diffuseColor = vec4( 1.0, 1.0, 1.0, opacity );

        #ifdef DOUBLE_SIDED
          float flipNormal = ( float( gl_FrontFacing ) * 2.0 - 1.0 );
        #else
          float flipNormal = 1.0;
        #endif

        #ifdef USE_MAP
          vec4 texColor = texture2D( map, vUv );
          diffuseColor *= texColor;
        #endif

        #ifdef USE_ENVMAP
          vec3 cameraToVertex = normalize( vWorldPosition - cameraPosition );
          vec3 worldNormal = normalize( ( vec4( vNormal, 0.0 ) * viewMatrix ).xyz );
          vec3 reflectVec = refract( cameraToVertex, worldNormal, refractionRatio );

          #ifdef ENVMAP_TYPE_CUBE
            vec4 envColor = textureCube( envMap, flipNormal * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
          #elif defined( ENVMAP_TYPE_EQUIREC )
            vec2 sampleUV;
            sampleUV.y = saturate( flipNormal * reflectVec.y * 0.5 + 0.5 );
            sampleUV.x = atan( flipNormal * reflectVec.z, flipNormal * reflectVec.x ) * RECIPROCAL_PI2 + 0.5;
            vec2 stereoSampleUV = sampleUV * stereoOffsetRepeat.zw + stereoOffsetRepeat.xy;
            vec4 envColor = texture2D( envMap, stereoSampleUV );
          #elif defined( ENVMAP_TYPE_SPHERE )
            vec3 reflectView = flipNormal * normalize( ( viewMatrix * vec4( reflectVec, 0.0 ) ).xyz
              + vec3( 0.0, 0.0, 1.0 ) );
            vec2 sampleUV = reflectView.xy * 0.5 + 0.5;
            vec2 stereoSampleUV = sampleUV * stereoOffsetRepeat.zw + stereoOffsetRepeat.xy;
            vec4 envColor = texture2D( envMap, stereoSampleUV );
          #else
            vec4 envColor = vec4( 0.0 );
          #endif
          diffuseColor.rgb = mix( diffuseColor.rgb, diffuseColor.rgb * envColor.rgb, reflectivity );
        #endif

        diffuseColor.rgb *= vColor;
        gl_FragColor = diffuseColor;
      }
  `,
};

export default StereoShaderLib;
