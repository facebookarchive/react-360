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

import createUniformSetter from './createUniformSetter';
import defaultValueForUniform from './defaultValueForUniform';

type Shader = {
  code: string,
  type: number,
};

type Uniform = {
  location: WebGLUniformLocation,
  set: any => void,
  size: number,
  type: number,
};

export type Attribute = {
  location: number,
  size: number,
  type: number,
};

type UniformMap = {
  [name: string]: Uniform,
};

type AttributeMap = {
  [name: string]: Attribute,
};

type UniformDefaults = {
  [name: string]: any,
};

/**
 * Extract all active uniforms from a WebGL program.
 * For each uniform, store the size, type, and location, and generate a setter.
 */
function extractUniforms(gl: WebGLRenderingContext, program: WebGLProgram): UniformMap {
  const uniforms = {};
  const count = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
  for (let i = 0; i < count; i++) {
    const uniform = gl.getActiveUniform(program, i);
    if (!uniform) {
      continue;
    }
    const location = gl.getUniformLocation(program, uniform.name);
    uniforms[uniform.name] = {
      location,
      set: createUniformSetter(gl, location, uniform.type),
      size: uniform.size,
      type: uniform.type,
    };
  }
  return uniforms;
}

/**
 * Extract all active attributes from a WebGL program, storing size, type, and location.
 */
function extractAttributes(gl: WebGLRenderingContext, program: WebGLProgram): AttributeMap {
  const attributes = {};
  const count = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);
  for (let i = 0; i < count; i++) {
    const attr = gl.getActiveAttrib(program, i);
    if (!attr) {
      continue;
    }
    const location = gl.getAttribLocation(program, attr.name);
    attributes[attr.name] = {
      location,
      size: attr.size,
      type: attr.type,
    };
  }
  return attributes;
}

/**
 * Handles creating, compiling, and referencing a WebGL program
 * Automatically extracts parameters from the program, so that they don't need
 * to be explicitly re-declared in code.
 * All non-getter functions implement a fluent API so that a program can be
 * easily built through chained methods.
 */
export default class Program {
  _attributes: AttributeMap;
  _gl: WebGLRenderingContext;
  _program: ?WebGLProgram;
  _shaders: Array<Shader>;
  _uniformDefaults: UniformDefaults;
  _uniforms: UniformMap;

  constructor(gl: WebGLRenderingContext) {
    this._attributes = {};
    this._gl = gl;
    this._program = null;
    this._shaders = [];
    this._uniformDefaults = {};
    this._uniforms = {};
  }

  /**
   * Add shader code of a specific type, prior to compilation.
   * The optional third parameter is an array of types to define at the beginning
   * of the code; this is useful for shader code with ifdef checks.
   */
  addShader(source: string, type: number, definitions?: Array<string>) {
    if (this._program) {
      throw new Error('Cannot add a shader, the program has already been compiled');
    }
    let code = source;
    if (definitions) {
      const defineCode = definitions.map(def => `#define ${def}\n`).join('');
      if (source.startsWith('#version')) {
        // version declaration must always be first
        const split = source.indexOf('\n') + 1;
        code = source.substr(0, split) + defineCode + source.substr(split);
      } else {
        code = defineCode + source;
      }
    }
    this._shaders.push({code, type});
    return this;
  }

  /**
   * Build the individual shaders, and link them together into a program.
   * If an error occurs during this process, the log will be extracted from
   * WebGL and an error will be thrown.
   */
  compile() {
    if (this._program) {
      throw new Error('Cannot compile, the program has already been compiled');
    }
    const gl = this._gl;
    const shaders = this._shaders.map(({code, type}) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, code);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        const log = gl.getShaderInfoLog(shader) || '';
        gl.deleteShader(shader);
        throw new Error(`Failed to compile shader: ${log}`);
      }
      return shader;
    });
    const program = gl.createProgram();
    for (const shader of shaders) {
      gl.attachShader(program, shader);
    }
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      const log = gl.getProgramInfoLog(program) || '';
      gl.deleteProgram(program);
      throw new Error(`Failed to link program: ${log}`);
    }
    this._program = program;
    this._uniforms = extractUniforms(gl, program);
    this._attributes = extractAttributes(gl, program);
    return this;
  }

  /**
   * Instruct WebGL to use the attached program on the stored GL context
   */
  use() {
    if (!this._program) {
      throw new Error('Cannot use Program before it has been compiled');
    }
    this._gl.useProgram(this._program);
  }

  /**
   * Return information on a specific uniform
   */
  getUniform(name: string) {
    const uniform = this._uniforms[name];
    if (!uniform) {
      throw new Error(`Program does not have a uniform called ${name}`);
    }
    return uniform;
  }

  /**
   * Get a map of all uniforms associated with the program
   */
  getUniforms() {
    return this._uniforms;
  }

  /**
   * Return information on a specific attribute
   */
  getAttribute(name: string) {
    const attr = this._attributes[name];
    if (!attr) {
      throw new Error(`Program does not have an attribute called ${name}`);
    }
    return attr;
  }

  /**
   * Specify alternate default values for uniforms. These values will be returned
   * by getDefaultValueForUniform below.
   * This can be useful for cases like specifying an identity matrix default for
   * a transform.
   */
  setUniformDefaults(defaults: {[name: string]: any}) {
    for (const name in defaults) {
      this._uniformDefaults[name] = defaults[name];
    }
    return this;
  }

  /**
   * Provide an appropriate default value for a named uniform.
   * When a Node uses a Program, it sets all the uniforms it knows about. When
   * a uniform is not set on that Node, it asks the Program for a default value.
   */
  getDefaultValueForUniform(name: string) {
    if (!(name in this._uniforms)) {
      throw new Error(`Program does not have a uniform called ${name}`);
    }
    if (name in this._uniformDefaults) {
      const value = this._uniformDefaults[name];
      if (Array.isArray(value)) {
        return value.slice();
      }
      return value;
    }
    return defaultValueForUniform(this._gl, this._uniforms[name].type);
  }
}
