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
import createEnvironmentSphereProgram from './createEnvironmentSphereProgram';
import generateEnvironmentSphere from './generateEnvironmentSphere';

const PM = new WebGL.ProgramManager(createEnvironmentSphereProgram);

export default class Environment {
  // WebGL properties
  _currentTexture: WebGL.Texture;
  _node: WebGL.Node;

  constructor(gl: WebGLRenderingContext) {
    const prog = PM.getProgram(gl);
    this._node = new WebGL.Node(gl, prog);
    this._node.addAttribute('a_position');
    const {geometry, index} = generateEnvironmentSphere(900);
    this._node.bufferData(geometry);
    this._node.bufferIndex(index);

    this._currentTexture = new WebGL.Texture(gl);
    this._node.setUniform('u_texture', this._currentTexture);
  }

  /**
   * Rotate the environment sphere around the y-axis
   */
  setRotation(r: number) {
    const sin = Math.sin(r);
    const cos = Math.cos(r);
    this._node.setUniform('u_transform', [cos, 0, sin, 0, 0, 1, 0, 0, -sin, 0, cos, 0, 0, 0, 0, 1]);
  }

  /**
   * Set the opacity of the tint color, on a scale from 0 to 1.
   * This can be used to fade out the current texture, or fade in a new one.
   */
  setTintLevel(tint: number) {
    this._node.setUniform('u_tintlevel', Math.max(0, Math.min(1, tint)));
  }

  /**
   * Set the currently-displayed Texture on the environment
   */
  setTexture(texture: WebGL.Texture) {
    this._currentTexture = texture;
    this._node.setUniform('u_texture', texture);
  }

  /**
   * Retrieve the currently set Texture
   */
  getTexture() {
    return this._currentTexture;
  }

  /**
   * Return the GL geometry node for the surface
   */
  getNode() {
    return this._node;
  }
}
