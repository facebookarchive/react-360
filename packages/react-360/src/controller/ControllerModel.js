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

import type VRInputSource from 'vr-input-source';
import * as WebGL from 'webgl-lite';
import createControllerBeamProgram from './createControllerBeamProgram';

const PM = new WebGL.ProgramManager(createControllerBeamProgram);

function createBeam(gl) {
  const prog = PM.getProgram(gl);
  const node = new WebGL.Node(gl, prog);
  node.addAttribute('a_position');
  node.addAttribute('a_opacity');
  // prettier-ignore
  node.setUniform('u_transform', [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1,
  ]);
  const radius = 0.002;
  const length = 0.5;
  // prettier-ignore
  const geometry = [
    // bottom
    -radius, radius, 0, 1,
    radius, radius, 0, 1,
    radius, -radius, 0, 1,
    -radius, -radius, 0, 1,
    // top
    -radius, radius, -length, 0,
    radius, radius, -length, 0,
    radius, -radius, -length, 0,
    -radius, -radius, -length, 0,
  ];
  // prettier-ignore
  const index = [
    5, 4, 0,
    0, 1, 5,
    6, 5, 1,
    1, 2, 6,
    7, 6, 2,
    2, 3, 7,
    4, 7, 3,
    3, 0, 4,
  ];
  node.bufferData(geometry);
  node.bufferIndex(index);
  return node;
}

export default class ControllerModel {
  _input: VRInputSource;
  _node: WebGL.Node;
  _rg: WebGL.RenderGroup;

  constructor(rg: WebGL.RenderGroup, input: VRInputSource) {
    this._rg = rg;
    this._input = input;
    this._node = createBeam(rg.getGLContext());
    // prettier-ignore
    this._node.setUniform('u_transform', [
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, -1, 0, 1,
    ]);
    this._node.renderOrder = 9999;
    const active = this._input.getActiveSource();
    if (active) {
      this.setTransform(active.getPosition(), active.getOrientation());
      this.show();
    }
    this._input.addEventListener('activesourcechange', event => {
      if (event.gamepadIndex < 0) {
        this.hide();
      } else {
        this.show();
      }
    });
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

  update() {
    const active = this._input.getActiveSource();
    if (active) {
      this.setTransform(active.getPosition(), active.getOrientation());
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
