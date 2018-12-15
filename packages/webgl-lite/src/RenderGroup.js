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

import type Node from './Node';

function renderOrderSort(a: Node, b: Node) {
  return a.renderOrder - b.renderOrder;
}

/**
 * RenderGroup draws a group of nodes as a set, with the ability to share
 * uniforms like camera parameters between them. The order in which the nodes
 * are rendered can be configured.
 */
export default class RenderGroup {
  _gl: WebGLRenderingContext;
  _needsRender: boolean;
  _uniforms: {[name: string]: any};
  nodes: Array<Node>;

  constructor(gl: WebGLRenderingContext) {
    this._gl = gl;
    this._needsRender = true;
    this._uniforms = {};
    this.nodes = [];
  }

  getGLContext() {
    return this._gl;
  }

  /**
   * Add a node to the group, so that it will be drawn when the whole group is
   * drawn
   */
  addNode(node: Node) {
    node.setRenderGroup(this);
    if (this.nodes.indexOf(node) < 0) {
      this.nodes.push(node);
    }
    this._needsRender = true;
  }

  /**
   * Remove a node from the group, so that it is no longer drawn with the group
   */
  removeNode(node: Node) {
    node.setRenderGroup(null);
    const index = this.nodes.indexOf(node);
    if (index > -1) {
      this.nodes.splice(index, 1);
      this._needsRender = true;
    }
  }

  /**
   * Set a global uniform for all nodes in the group. If a node does not have
   * a specific value set for that uniform, it will use the group's uniform.
   */
  setUniform(name: string, value: any) {
    this._uniforms[name] = value;
    this._needsRender = true;
  }

  /**
   * Return whether the group has a global uniform with the specific name
   */
  hasUniform(name: string) {
    return name in this._uniforms;
  }

  /**
   * Fetch the value of the global uniform
   */
  getUniform(name: string) {
    return this._uniforms[name];
  }

  /**
   * Update the order in which the nodes will be drawn, based on their explicit
   * render order.
   */
  refreshRenderOrder() {
    this.nodes.sort(renderOrderSort);
  }

  /**
   * Draw all nodes in the group. The RenderGroup will handle setting up the
   * appropriate shader programs before each node is drawn.
   */
  draw() {
    let currentProgram = null;
    for (const node of this.nodes) {
      if (node.program !== currentProgram) {
        node.program.use();
        currentProgram = node.program;
      }
      node.draw();
    }
    this._needsRender = false;
  }

  /**
   * Return whether the group needs to be redrawn
   */
  needsRender() {
    return this._needsRender;
  }

  /**
   * Mark the render group as requiring a re-render on the next draw call
   */
  setNeedsRender(flag: boolean) {
    this._needsRender = flag;
  }
}
