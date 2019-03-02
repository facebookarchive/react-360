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
import createCursorProgram from './createCursorProgram';

const PM = new WebGL.ProgramManager(createCursorProgram);

function createCursor(gl) {
  const prog = PM.getProgram(gl);
  const node = new WebGL.Node(gl, prog);
  node.addAttribute('a_position');
  // prettier-ignore
  node.setUniform('u_transform', [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1,
  ]);
  const radius = 0.02;
  node.setUniform('u_radius', radius);
  // prettier-ignore
  const geometry = [
    -radius, radius,
    radius, radius,
    radius, -radius,
    -radius, -radius,
  ];
  // prettier-ignore
  const index = [
    0, 3, 1,
    3, 2, 1,
  ];
  node.bufferData(geometry);
  node.bufferIndex(index);
  return node;
}

export default class CursorModel {
  _node: WebGL.Node;
  _rg: WebGL.RenderGroup;

  constructor(rg: WebGL.RenderGroup) {
    this._rg = rg;
    this._node = createCursor(rg.getGLContext());
    this._node.renderOrder = 9998;
  }

  show() {
    if (!this._node.renderGroup) {
      this._rg.addNode(this._node);
    }
  }

  hide() {
    if (this._node.renderGroup) {
      this._rg.removeNode(this._node);
    }
  }

  setTransform(position: [number, number, number], orientation: [number, number, number, number]) {
    const [px, py, pz] = position;
    const [qx, qy, qz, w] = orientation;
    const qw = -w;
    const s = Math.sqrt(qx * qx + qy * qy + qz * qz + qw * qw);
    // prettier-ignore
    this._node.setUniform('u_transform', [
      1 - 2 * s * (qy * qy + qz * qz), 2 * s * (qx * qy - qz * qw), 2 * s * (qx * qz + qy * qw), 0,
      2 * s * (qx * qy + qz * qw), 1 - 2 * s * (qx * qx + qz * qz), 2 * s * (qy * qz - qx * qw), 0,
      2 * s * (qx * qz - qy * qw), 2 * s * (qy * qz + qx * qw), 1 - 2 * s * (qx * qx + qy * qy), 0,
      px, py, pz, 1,
    ]);
  }
}
