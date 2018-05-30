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

import * as THREE from 'three';

const CURSOR_MESH_SIZE = 0.05;

export default class Cursor {
  _mesh: THREE.Mesh;
  _texture: THREE.Texture;

  constructor() {
    this._texture = new THREE.Texture(Cursor.createDefaultCursorImage());
    this._texture.needsUpdate = true;
    const material = new THREE.MeshBasicMaterial({
      transparent: true,
      opacity: 1.0,
      side: THREE.DoubleSide,
      map: this._texture,
    });
    this._mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(CURSOR_MESH_SIZE, CURSOR_MESH_SIZE),
      material,
    );
    this._mesh.position.set(0, 0, 0);
    this._mesh.raycast = function() {
      return null; // Disable hit/intersection with cursor mesh
    };
    material.depthTest = false;
    material.depthWrite = false;
    material.renderOrder = 1;
  }

  hide() {
    this._mesh.visible = false;
  }

  show() {
    this._mesh.visible = true;
  }

  getMesh(): THREE.Mesh {
    return this._mesh;
  }

  setPosition(x: number, y: number, z: number) {
    this._mesh.position.set(x, y, z);
    this._mesh.rotation.set(0, Math.atan2(x, z), 0, 'YXZ');
  }

  static createDefaultCursorImage() {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.arc(64, 64, 55, 0, 2 * Math.PI);
    ctx.strokeStyle = '#000000';
    ctx.fillStyle = '#ffffff';
    ctx.lineWidth = 9;
    ctx.stroke();
    ctx.fill();
    return canvas;
  }
}
