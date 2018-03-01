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
import Surface from './Surface';

const leftCamera = new THREE.PerspectiveCamera();
leftCamera.matrixAutoUpdate = false;
const rightCamera = new THREE.PerspectiveCamera();
rightCamera.matrixAutoUpdate = false;

export default class Compositor {
  _camera: THREE.Camera;
  _canvas: HTMLCanvasElement;
  _defaultSurface: ?Surface;
  _environmentMesh: THREE.Mesh;
  _frame: HTMLElement;
  _isCursorVisible: boolean;
  _renderer: THREE.WebGLRenderer;
  _scene: THREE.Scene;
  _surfaces: {[name: string]: Surface};

  constructor(frame: HTMLElement, scene: THREE.Scene) {
    this._frame = frame;
    this._isCursorVisible = false;
    this._defaultSurface = null;
    this._surfaces = {};

    this._camera = new THREE.PerspectiveCamera(
      60,
      frame.clientWidth / frame.clientHeight,
      1,
      1000,
    );
    this._renderer = new THREE.WebGLRenderer();
    this._canvas = this._renderer.domElement;
    this._renderer.setPixelRatio(window.devicePixelRatio);
    this._renderer.setSize(frame.clientWidth, frame.clientHeight);
    frame.appendChild(this._renderer.domElement);
    this._scene = scene;

    // Temporary mesh elements until global enviroment pano is set up
    const sphereGeom = new THREE.SphereGeometry(1000, 50, 50);
    sphereGeom.scale(-1, 1, 1);
    const material = new THREE.MeshBasicMaterial({
      map: new THREE.TextureLoader().load('chess-world.jpg'),
    });
    this._environmentMesh = new THREE.Mesh(sphereGeom, material);

    scene.add(this._environmentMesh);
  }

  setCursorVisibility(vis: boolean) {
    this._isCursorVisible = vis;
  }

  isCursorVisible(): boolean {
    return this._isCursorVisible;
  }

  addSurface(name: string, surface: Surface) {
    if (this._surfaces[name]) {
      throw new Error(
        `Cannot add Surface with tag '${name}', a Surface with that name already exists.`,
      );
    }
    this._surfaces[name] = surface;
  }

  getSurface(name: string): ?Surface {
    return this._surfaces[name];
  }

  getDefaultSurface(): Surface {
    if (!this._defaultSurface) {
      this._defaultSurface = new Surface(1000, 600);
    }
    return this._defaultSurface;
  }

  getCanvas(): HTMLCanvasElement {
    return this._canvas;
  }

  resize(width: number, height: number, pixelRatio: number = 1) {
    this._renderer.setPixelRatio(pixelRatio);
    this._renderer.setSize(width, height, false);
  }

  render(position: Array<number>, quat: Array<number>) {
    this._camera.position.set(position[0], position[1], position[2]);
    this._camera.quaternion.set(quat[0], quat[1], quat[2], quat[3]);

    this._renderer.render(this._scene, this._camera);
  }

  renderVR(display: VRDisplay, frameData: VRFrameData) {
    const preserveAutoUpdate = this._scene.autoUpdate;
    if (preserveAutoUpdate) {
      this._scene.updateMatrixWorld();
      this._scene.autoUpdate = false;
    }

    const size = this._renderer.getSize();
    this._renderer.setScissorTest(true);
    this._camera.updateMatrixWorld();

    leftCamera.matrixWorldInverse.fromArray(frameData.leftViewMatrix);
    rightCamera.matrixWorldInverse.fromArray(frameData.rightViewMatrix);
    leftCamera.matrixWorld.getInverse(leftCamera.matrixWorldInverse);
    rightCamera.matrixWorld.getInverse(rightCamera.matrixWorldInverse);
    leftCamera.projectionMatrix.fromArray(frameData.leftProjectionMatrix);
    rightCamera.projectionMatrix.fromArray(frameData.rightProjectionMatrix);

    let x = 0;
    const y = 0;
    const w = 0.5 * size.width;
    const h = size.height;

    this._renderer.setViewport(x, y, w, h);
    this._renderer.setScissor(x, y, w, h);
    this._renderer.render(this._scene, leftCamera);

    x = w;

    this._renderer.setViewport(x, y, w, h);
    this._renderer.setScissor(x, y, w, h);
    this._renderer.render(this._scene, rightCamera);

    this._renderer.setViewport(0, 0, size.width, size.height);
    this._renderer.setScissorTest(false);

    if (preserveAutoUpdate) {
      this._scene.autoUpdate = true;
    }
    display.submitFrame();
  }
}
