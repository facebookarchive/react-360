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

import Geometry from './Geometry';
import type Program from './Program';
import Texture from './Texture';

/**
 * Node provides a convenient container for a geometry, a shader program, and a
 * set of uniforms.
 */
export default class Node {
  _gl: WebGLRenderingContext;
  geometry: Geometry;
  program: Program;
  renderOrder: number;
  uniforms: Object;

  constructor(gl: WebGLRenderingContext, program: Program) {
    this._gl = gl;
    this.geometry = new Geometry(gl);
    this.program = program;
    this.renderOrder = 1;
    this.uniforms = {};
  }

  /**
   * Register an attribute with the underlying geometry
   */
  addAttribute(attr: string, normalize: boolean = false) {
    this.geometry.addAttribute(this.program.getAttribute(attr), normalize);
    return this;
  }

  /**
   * Store a uniform value to be used when this object is rendered
   */
  setUniform(name: string, value: any) {
    this.uniforms[name] = value;
  }

  /**
   * Removes a stored uniform value. The program default will be used instead,
   * until another value is set.
   */
  unsetUniform(name: string) {
    delete this.uniforms[name];
  }

  /**
   * Use the associated geometry and shaders to draw the object.
   * For uniforms, the Node first looks at locally stored values. If no value
   * is stored, it looks to the Program to fetch a default.
   */
  draw() {
    let texSlot = 0;
    const program = this.program;
    const uniforms = program.getUniforms();
    for (const name in uniforms) {
      let value = null;
      if (name in this.uniforms) {
        value = this.uniforms[name];
      } else {
        value = program.getDefaultValueForUniform(name);
      }

      if (typeof value === 'number') {
        program.getUniform(name).set(value);
      } else if (Array.isArray(value)) {
        program.getUniform(name).set(value);
      } else if (value instanceof Texture) {
        value.bindToSlot(texSlot);
        program.getUniform(name).set(texSlot);
        texSlot++;
      }
    }
    this.geometry.bindToAttributes();
    this.geometry.draw();
  }
}
