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
import {type Quaternion, type Ray, type Vec3} from '../Controls/Types';
import createRemoteImageManager from '../Utils/createRemoteImageManager';
import type ResourceManager from '../Utils/ResourceManager';
import Cursor from './Cursor';
import Environment, {type PanoOptions} from './Environment/Environment';
import Surface from './Surface';
import SurfaceManager from './SurfaceManager';
import type {VideoPlayerImplementation} from './Video/Types';
import VideoPlayer from './Video/VideoPlayer';
import BrowserVideoPlayer from './Video/BrowserVideoPlayer';
import VideoPlayerManager from './Video/VideoPlayerManager';

const LEFT = 'left';
const RIGHT = 'right';

const leftCamera = new THREE.PerspectiveCamera();
leftCamera.matrixAutoUpdate = false;
const rightCamera = new THREE.PerspectiveCamera();
rightCamera.matrixAutoUpdate = false;

export default class Compositor {
  _camera: THREE.Camera;
  _canvas: HTMLCanvasElement;
  _cursor: Cursor;
  _cursorVisibility: string;
  _environment: Environment;
  _frame: HTMLElement;
  _isMouseCursorActive: boolean;
  _renderer: THREE.WebGLRenderer;
  _scene: THREE.Scene;
  _surfaceManager: SurfaceManager;
  _resourceManager: ResourceManager<Image>;
  _videoPlayers: VideoPlayerManager;

  constructor(
    frame: HTMLElement,
    scene: THREE.Scene,
    customVideoPlayers?: Array<Class<VideoPlayerImplementation>>
  ) {
    this._frame = frame;
    this._cursorVisibility = 'auto';
    this._isMouseCursorActive = false;
    this._resourceManager = createRemoteImageManager();
    this._videoPlayers = new VideoPlayerManager();
    if (customVideoPlayers) {
      for (const player of customVideoPlayers) {
        this._videoPlayers.registerPlayerImplementation(player);
      }
    }
    this._videoPlayers.registerPlayerImplementation(BrowserVideoPlayer);

    this._camera = new THREE.PerspectiveCamera(
      60,
      frame.clientWidth / frame.clientHeight,
      0.1,
      2000
    );
    this._renderer = new THREE.WebGLRenderer({
      antialias: true,
    });
    this._canvas = this._renderer.domElement;
    this._renderer.setPixelRatio(window.devicePixelRatio);
    this._renderer.setSize(frame.clientWidth, frame.clientHeight);
    frame.appendChild(this._renderer.domElement);
    this._scene = scene;

    this._surfaceManager = new SurfaceManager(scene);

    this._environment = new Environment(
      this._resourceManager,
      this._videoPlayers,
      this._surfaceManager
    );
    scene.add(this._environment.getPanoNode());

    this._cursor = new Cursor();
    scene.add(this._cursor.getMesh());
  }

  setCursorVisibility(vis: string) {
    this._cursorVisibility = vis;
  }

  setBackground(src: string, options: PanoOptions = {}): Promise<void> {
    return this._environment.setSource(src, options);
  }

  setBackgroundVideo(handle: string, options: PanoOptions = {}): Promise<void> {
    return this._environment.setVideoSource(handle, options);
  }

  createVideoPlayer(handle: string): VideoPlayer {
    return this._videoPlayers.createPlayer(handle);
  }

  getVideoPlayerManager(): VideoPlayerManager {
    return this._videoPlayers;
  }

  getEnvironment(): Environment {
    return this._environment;
  }

  getCursorVisibility(): string {
    return this._cursorVisibility;
  }

  setMouseCursorActive(active: boolean) {
    if (this._isMouseCursorActive !== active) {
      this._isMouseCursorActive = active;
      this._frame.style.cursor = active ? 'pointer' : 'inherit';
    }
  }

  registerSurface(name: string, surface: Surface) {
    this._surfaceManager.registerSurface(name, surface);
  }

  unregisterSurface(name: string) {
    this._surfaceManager.unregisterSurface(name);
  }

  showSurface(surface: Surface) {
    this._surfaceManager.showSurface(surface);
  }

  hideSurface(surface: Surface) {
    this._surfaceManager.hideSurface(surface);
  }

  getSurface(name: string): ?Surface {
    return this._surfaceManager.getSurface(name);
  }

  getDefaultSurface(): Surface {
    return this._surfaceManager.getDefaultSurface();
  }

  getCanvas(): HTMLCanvasElement {
    return this._canvas;
  }

  getCamera(): THREE.Camera {
    return this._camera;
  }

  getRenderer(): THREE.WebGLRenderer {
    return this._renderer;
  }

  resize(width: number, height: number, pixelRatio: number = 1) {
    this._renderer.setPixelRatio(pixelRatio);
    this._renderer.setSize(width, height, false);
  }

  resizeCanvas(width: number, height: number) {
    this._camera.aspect = width / height;
    this._camera.updateProjectionMatrix();
    this._renderer.setSize(width, height, true);
  }

  prepareForRender(eye: ?string) {
    this._environment.prepareForRender(eye);
  }

  frame(delta: number) {
    this._environment.frame(delta);
    this._videoPlayers.frame();
  }

  updateCursor(rays: ?Array<Ray>, depth: number) {
    if (!rays || rays.length < 1) {
      this._cursor.hide();
      return;
    }
    // TODO: extend to multiple rays
    if (!rays[0].drawsCursor) {
      this._cursor.hide();
      return;
    }
    this._cursor.show();
    const origin = rays[0].origin;
    const direction = rays[0].direction;
    const cameraToCursorX = origin[0] + direction[0] * depth;
    const cameraToCursorY = origin[1] + direction[1] * depth;
    const cameraToCursorZ = origin[2] + direction[2] * depth;
    this._cursor.setPosition(cameraToCursorX, cameraToCursorY, cameraToCursorZ);
  }

  render(position: Vec3, quat: Quaternion) {
    this.prepareForRender(null);
    this._camera.position.set(position[0], position[1], position[2]);
    this._camera.quaternion.set(quat[0], quat[1], quat[2], quat[3]);

    this._renderer.render(this._scene, this._camera);
  }

  renderSurface(surface: Surface) {
    this._renderer.render(surface.getScene(), surface.getCamera());
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

    this.prepareForRender(LEFT);
    this._renderer.setViewport(x, y, w, h);
    this._renderer.setScissor(x, y, w, h);
    this._renderer.render(this._scene, leftCamera);

    x = w;

    this.prepareForRender(RIGHT);
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
