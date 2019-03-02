import * as WebGL from 'webgl-lite';
import * as UI from 'webgl-ui';

import Atlas from './Atlas';

const VERT_SHADER = `
attribute vec2 a_position;
attribute vec2 a_uv;

varying vec2 v_uv;

uniform mat4 u_transform;
uniform mat4 projectionMatrix;

void main() {
  v_uv = a_uv;
  gl_Position = projectionMatrix * u_transform * vec4(a_position * vec2(1, -1), 0, 1.0);
}
`;
const FRAG_SHADER = `
precision mediump float;

varying vec2 v_uv;

uniform vec4 u_color;

uniform sampler2D u_texture;

void main() {
  gl_FragColor = u_color * texture2D(u_texture, v_uv);
}
`;

function createProgram(gl) {
  const prog = new WebGL.Program(gl);
  prog
    .addShader(VERT_SHADER, gl.VERTEX_SHADER)
    .addShader(FRAG_SHADER, gl.FRAGMENT_SHADER)
    .compile()
    .setUniformDefaults({
      u_color: [0, 0, 0, 1],
      u_transform: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    });
  return prog;
}

type AtlasCollection = {[family: string]: {[size: string]: Atlas}};

/**
 * webgl-ui compatible text implementation using glyphs generated from system
 * fonts.
 */
export default class FontImplementation {
  _atlases: AtlasCollection;
  _gl: WebGLRenderingContext;

  constructor(gl: WebGLRenderingContext) {
    this._gl = gl;
    this._atlases = {};
    window.atlases = this._atlases;
  }

  getAtlas(family: string, size: number) {
    if (!this._atlases[family]) {
      this._atlases[family] = {};
    }
    if (!this._atlases[family][size.toString()]) {
      this._atlases[family][size.toString()] = new Atlas(this._gl, 256, 256, size, family);
    }
    return this._atlases[family][size.toString()];
  }

  extractGlyphs(family: string, size: number, text: string) {
    const atlas = this.getAtlas(family || 'sans-serif', size);

    const run = {
      glyphs: [],
      maxAscend: 1,
      maxDescend: 0,
      totalWidth: 0,
    };

    for (const glyph of text) {
      if (glyph.charCodeAt(0) === 10 || glyph.charCodeAt(0) === 13) {
        continue;
      }
      if (!atlas.has(glyph)) {
        atlas.generate(glyph);
      }
      const metrics = atlas.getMetrics(glyph);
      if (metrics.ascend > run.maxAscend) {
        run.maxAscend = metrics.ascend;
      }
      if (metrics.descend > run.maxDescend) {
        run.maxDescend = metrics.descend;
      }
      run.totalWidth += metrics.width;
      run.glyphs.push({
        attributes: {
          uv: atlas.getUV(glyph),
          tex: atlas.getTexture(),
        },
        code: glyph,
        metrics: {
          ...metrics,
        },
      });
    }

    return run;
  }

  createNode() {
    const program = createProgram(this._gl);
    const node = new WebGL.Node(this._gl, program);
    node.addAttribute('a_position'); // 2 floats
    node.addAttribute('a_uv'); // 2 floats
    return node;
  }

  createText(text, options) {
    return new UI.FontGeometry(this._gl, this, text, options);
  }

  updateGeometry(node, info, params) {
    const {align} = params;
    let count = 0;
    let width = params.alignWidth || 0;

    for (let i = 0; i < info.lines.length; i++) {
      count += info.lines[i].glyphs.length;
      const lineWidth = info.lines[i].width;
      if (lineWidth > width) {
        width = lineWidth;
      }
    }
    const lineHeight = params.lineHeight || Math.ceil(info.size * 1.2);
    const buffer = new ArrayBuffer(count * 4 * 16);
    const floatBuffer = new Float32Array(buffer);
    const index = [];
    let y = 0;

    let vertIndex = 0;
    let texture = null;
    for (let i = 0; i < info.lines.length; i++) {
      const line = info.lines[i];
      const verticalLead = (lineHeight - line.maxAscend) / 2;
      const baseline = y - verticalLead - line.maxAscend;

      const glyphs = line.glyphs;
      let x = 0;
      if (align === 'right') {
        x = width - line.width;
      } else if (align === 'center') {
        x = (width - line.width) / 2;
      }
      for (let j = 0; j < glyphs.length; j++) {
        const glyph = glyphs[j];
        const uv = glyph.attributes.uv;
        const metrics = glyph.metrics;

        if (texture !== glyph.attributes.tex && glyph.attributes.tex) {
          texture = glyph.attributes.tex;
        }

        // texture coords
        let s0 = uv[0];
        let s1 = uv[0] + uv[2];
        let t0 = uv[1];
        let t1 = uv[1] + uv[3];

        // only compute relative texture coordinates now, in case the texture
        // was resized while we were generating glyphs
        if (texture) {
          s0 /= texture.getWidth();
          s1 /= texture.getWidth();
          t0 /= texture.getHeight();
          t1 /= texture.getHeight();
        }

        const left = x;
        const top = baseline + metrics.ascend;
        const right = x + metrics.width;
        const bottom = baseline - metrics.descend;

        const floatStart = vertIndex * 4;
        // top left
        floatBuffer[floatStart] = left;
        floatBuffer[floatStart + 1] = top;
        floatBuffer[floatStart + 2] = s0;
        floatBuffer[floatStart + 3] = t0;
        // bottom left
        floatBuffer[floatStart + 4] = left;
        floatBuffer[floatStart + 5] = bottom;
        floatBuffer[floatStart + 6] = s0;
        floatBuffer[floatStart + 7] = t1;
        // top right
        floatBuffer[floatStart + 8] = right;
        floatBuffer[floatStart + 9] = top;
        floatBuffer[floatStart + 10] = s1;
        floatBuffer[floatStart + 11] = t0;
        // bottom right
        floatBuffer[floatStart + 12] = right;
        floatBuffer[floatStart + 13] = bottom;
        floatBuffer[floatStart + 14] = s1;
        floatBuffer[floatStart + 15] = t1;

        // prettier-ignore
        index.push(
          vertIndex, vertIndex + 1, vertIndex + 2,
          vertIndex + 2, vertIndex + 1, vertIndex + 3,
        );

        vertIndex += 4;

        x += metrics.width;
      }
      y -= lineHeight;
    }

    node.geometry.bufferData(buffer);
    node.geometry.bufferIndex(index);
    if (texture) {
      texture.update();
    }
    node.setUniform('u_texture', texture);
  }
}
