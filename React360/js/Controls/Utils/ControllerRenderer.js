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

/**
 * Create the gradient material for the beam emitting from the controller
 */
export function createFadeMaterial(color: string) {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 32;
  const cx = canvas.getContext('2d');
  const gradient = cx.createLinearGradient(0, 0, 1024, 0);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
  gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
  cx.fillStyle = gradient;
  cx.fillRect(0, 0, 1024, 32);
  const texture = new THREE.Texture(canvas);
  texture.needsUpdate = true;
  const fadeMaterial = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
    color: color,
  });
  return fadeMaterial;
}

const beamGeomCache = null;
export function createControllerMesh(color: string = '#fff') {
  let beamGeom = beamGeomCache;
  if (!beamGeom) {
    beamGeom = new THREE.Geometry();
    beamGeom.vertices.push(
      new THREE.Vector3(-0.01, 0.01, 0),
      new THREE.Vector3(0.01, 0.01, 0),
      new THREE.Vector3(0.01, 0.01, -1),
      new THREE.Vector3(-0.01, 0.01, -1),

      new THREE.Vector3(-0.01, -0.01, 0),
      new THREE.Vector3(0.01, -0.01, 0),
      new THREE.Vector3(0.01, -0.01, -1),
      new THREE.Vector3(-0.01, -0.01, -1)
    );
    beamGeom.faces.push(
      new THREE.Face3(0, 1, 3),
      new THREE.Face3(1, 2, 3),
      new THREE.Face3(1, 5, 2),
      new THREE.Face3(5, 6, 2),
      new THREE.Face3(5, 4, 6),
      new THREE.Face3(4, 7, 6),
      new THREE.Face3(4, 0, 7),
      new THREE.Face3(0, 3, 7),
      new THREE.Face3(0, 4, 5),
      new THREE.Face3(5, 1, 0)
    );
    const uvs = [
      new THREE.Vector2(0, 1),
      new THREE.Vector2(0, 0),
      new THREE.Vector2(1, 0),
      new THREE.Vector2(1, 1),
    ];
    beamGeom.faceVertexUvs[0][0] = [uvs[0], uvs[1], uvs[3]];
    beamGeom.faceVertexUvs[0][1] = [uvs[1], uvs[2], uvs[3]];
    beamGeom.faceVertexUvs[0][2] = [uvs[0], uvs[1], uvs[3]];
    beamGeom.faceVertexUvs[0][3] = [uvs[1], uvs[2], uvs[3]];
    beamGeom.faceVertexUvs[0][4] = [uvs[0], uvs[1], uvs[3]];
    beamGeom.faceVertexUvs[0][5] = [uvs[1], uvs[2], uvs[3]];
    beamGeom.faceVertexUvs[0][6] = [uvs[0], uvs[1], uvs[3]];
    beamGeom.faceVertexUvs[0][7] = [uvs[1], uvs[2], uvs[3]];
    beamGeom.faceVertexUvs[0][8] = [uvs[1], uvs[1], uvs[1]];
    beamGeom.faceVertexUvs[0][9] = [uvs[1], uvs[1], uvs[1]];
    beamGeom.verticesNeedUpdate = true;
    beamGeom.elementsNeedUpdate = true;
  }
  const beam = new THREE.Mesh(beamGeom, createFadeMaterial(color));
  (beam: any).raycast = () => {}; // Disable intersections with controller mesh
  return beam;
}
