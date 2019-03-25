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

import CubemapTexture from './CubemapTexture';
import Geometry, {type AttributeOptions} from './Geometry';
import type Program from './Program';
import type RenderGroup from './RenderGroup';
import Texture from './Texture';

type Options = {
  interleaved?: boolean,
};

/**
 * Node provides a convenient container for a geometry, a shader program, and a
 * set of uniforms.
 */
export default class Node {
  _gl: WebGLRenderingContext;
  geometry: Geometry;
  program: Program;
  renderGroup: ?RenderGroup;
  renderOrder: number;
  uniforms: Object;
  visible: boolean;

  constructor(gl: WebGLRenderingContext, program: Program, options: Options = {}) {
    this._gl = gl;
    this.geometry = new Geometry(gl, {interleaved: options.interleaved !== false});
    this.program = program;
    this.renderGroup = null;
    this.renderOrder = 1;
    this.uniforms = {};
    this.visible = true;
  }

  /**
   * Register an attribute with the underlying geometry
   */
  addAttribute(attr: string, normalize?: AttributeOptions) {
    this.geometry.addAttribute(this.program.getAttribute(attr), normalize);
    return this;
  }

  /**
   * Store a uniform value to be used when this object is rendered
   */
  setUniform(name: string, value: any) {
    this.uniforms[name] = value;
    if (this.renderGroup) {
      this.renderGroup.setNeedsRender(true);
      if (value instanceof Texture || value instanceof CubemapTexture) {
        value.addRenderGroup(this.renderGroup);
      }
    }
  }

  /**
   * Removes a stored uniform value. The program default will be used instead,
   * until another value is set.
   */
  unsetUniform(name: string) {
    delete this.uniforms[name];
    if (this.renderGroup) {
      this.renderGroup.setNeedsRender(true);
    }
  }

  /**
   * Associate this node with a render group,
   */
  setRenderGroup(rg: ?RenderGroup) {
    this.renderGroup = rg;
    if (!rg) {
      return;
    }
    for (const name in this.uniforms) {
      const uniform = this.uniforms[name];
      if (uniform instanceof Texture) {
        uniform.addRenderGroup(this.renderGroup);
      }
    }
  }

  /**
   * Copy an array of data to the geometry vertex buffer. This will also tell
   * the render group that the geometry needs to be redrawn.
   */
  bufferData(data: ArrayBuffer | Array<number>) {
    this.geometry.bufferData(data);
    if (this.renderGroup) {
      this.renderGroup.setNeedsRender(true);
    }
  }

  /**
   * Copy an array of element indices to the geometry index buffer. This will
   * also tell the render group that the geometry needs to be redrawn.
   */
  bufferIndex(index: Array<number>) {
    this.geometry.bufferIndex(index);
    if (this.renderGroup) {
      this.renderGroup.setNeedsRender(true);
    }
  }

  setVisible(visible: boolean) {
    this.visible = visible;
  }

  /**
   * Use the associated geometry and shaders to draw the object.
   * For uniforms, the Node first looks at locally stored values. If no value
   * is stored, it looks to the Program to fetch a default.
   */
  draw() {
    if (!this.visible) {
      return;
    }
    let texSlot = 0;
    const program = this.program;
    const renderGroup = this.renderGroup;
    const uniforms = program.getUniforms();
    for (const name in uniforms) {
      let value = null;
      if (name in this.uniforms) {
        value = this.uniforms[name];
      } else if (renderGroup && renderGroup.hasUniform(name)) {
        value = renderGroup.getUniform(name);
      } else {
        value = program.getDefaultValueForUniform(name);
      }

      if (typeof value === 'number') {
        program.getUniform(name).set(value);
      } else if (Array.isArray(value) || value instanceof Float32Array) {
        program.getUniform(name).set(value);
      } else if (value instanceof Texture) {
        value.bindToSlot(texSlot);
        program.getUniform(name).set(texSlot);
        texSlot++;
      } else if (value instanceof CubemapTexture) {
        value.bindToSlot(texSlot);
        program.getUniform(name).set(texSlot);
        texSlot++;
      }
    }
    this.geometry.bindToAttributes();
    this.geometry.draw();
  }
}
