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

import {Controls, MouseRaycaster, ScrollPanCameraController, type Ray} from 'react-360-controls';
import {Environment, Surface} from 'react-360-surfaces';
import * as WebGL from 'webgl-lite';
import * as GLUI from 'webgl-ui';

type ContainerOptions = {
  fullscreen?: boolean,
  height?: number,
  width?: number,
};

// Preallocated array for intersection detection
const intersect = [0, 0];

// Events to add to the
const EVENTS = ['click'];

/**
 * A Container handles all of the setup and rendering for a full React 360
 * application. It provides a way to configure the environment, add or modify
 * surfaces, and draw React elements to those surfaces. It contains the full
 * per-frame rendering loop, and manipulates camera and input with controls
 * and raycasters.
 */
export default class Container {
  controls: Controls;
  environment: Environment;
  group: WebGL.RenderGroup;
  _canvas: HTMLCanvasElement;
  _gl: WebGLRenderingContext;
  _eventLayer: HTMLElement;
  _height: number;
  _lastFrameStart: number;
  _looping: boolean;
  _needsResize: boolean;
  _rays: Array<Ray>;
  _surfaces: {[name: string]: Surface};
  _width: number;

  constructor(options: ContainerOptions = {}) {
    this._canvas = document.createElement('canvas');
    const gl = this._canvas.getContext('webgl');
    this._gl = gl;
    this.group = new WebGL.RenderGroup(gl);
    this.environment = new Environment(gl);
    this.group.addNode(this.environment.getNode());
    this.controls = new Controls();
    this._eventLayer = document.createElement('div');
    this._eventLayer.appendChild(this._canvas);
    this._lastFrameStart = 0;
    this._looping = false;
    this._rays = [];
    this._surfaces = {};

    this.controls.addCameraController(new ScrollPanCameraController(this._eventLayer));
    this.controls.addRaycaster(new MouseRaycaster(this._eventLayer));
    this.group.setUniform('viewMatrix', this.controls.getCameraViewMatrix());

    let width = options.width || 300;
    let height = options.height || 300;
    if (options.fullscreen) {
      window.addEventListener('resize', this._onResize);
      width = window.innerWidth;
      height = window.innerHeight;
    }
    this.resize(width, height);

    for (const event of EVENTS) {
      this._eventLayer.addEventListener(event, () => {
        for (const s in this._surfaces) {
          this._surfaces[s].getReactRoot().dispatchEvent(event);
        }
      });
    }
  }

  /**
   * Retrieve the "default" surface. If there is none, create one and ensure
   * it will be rendered. This is the most common entry point for rendering
   * React content to a 360 world.
   */
  getDefaultSurface() {
    if (!this._surfaces.default) {
      const surface = new Surface(this._gl, 1000, 600);
      this.addSurface('default', surface);
    }
    return this._surfaces.default;
  }

  /**
   * Register a Surface with a specific name, adding it to be rendered on each
   * future frame.
   */
  addSurface(name: string, surface: Surface) {
    this._surfaces[name] = surface;
    this.group.addNode(surface.getNode());
  }

  /**
   * Remove an existing Surface from the scene, as identified by its unique name
   */
  removeSurface(name: string) {
    const surface = this._surfaces[name];
    if (!surface) {
      return;
    }
    delete this._surfaces[name];
    this.group.removeNode(surface.getNode());
  }

  /**
   * The core "game loop" of the React 360 application
   * It fetches the latest input from controls, passes any new inputs to
   * surfaces, and re-draws the scene from the current camera position.
   */
  frame = (ms: number) => {
    const frameStart = ms || 0;
    if (this._lastFrameStart === 0) {
      this._lastFrameStart = frameStart;
    }
    // Uncomment when we have a use for delta. Until then, lint complains
    // const delta = Math.max(0, Math.min(frameStart - this._lastFrameStart, 100));
    this._lastFrameStart = frameStart;

    if (this._needsResize) {
      this.resize(this._width, this._height);
      this._needsResize = false;
    }

    this._rays.length = 0;
    this.controls.updateCamera();
    this.controls.fillRays(this._rays);
    const cameraPos = this.controls.getCameraPosition();
    for (const ray of this._rays) {
      if (!ray.hasAbsoluteCoordinates) {
        // Place the ray relative to camera space
        ray.origin[0] += cameraPos[0];
        ray.origin[1] += cameraPos[1];
        ray.origin[2] += cameraPos[2];
        GLUI.Math.rotateByQuaternion(ray.direction, this.controls.getCameraQuaternion());
      }
      intersect[0] = 0;
      intersect[1] = 0;
      for (const s in this._surfaces) {
        const surface = this._surfaces[s];
        if (surface.computeIntersection(intersect, ray.origin, ray.direction)) {
          surface.getReactRoot().setCursor(intersect[0], intersect[1]);
        } else {
          surface.getReactRoot().clearCursor();
        }
      }
    }

    for (const s in this._surfaces) {
      const surface = this._surfaces[s];
      surface.getReactRoot().update();
    }

    this.group.setUniform('viewMatrix', this.controls.getCameraViewMatrix());
    if (this.group.needsRender()) {
      const gl = this._gl;
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
      gl.clear(gl.COLOR_BUFFER_BIT);
      this.group.draw();
    }

    if (this._looping) {
      requestAnimationFrame(this.frame);
    }
  };

  /**
   * Begin drawing the scene and collecting input
   */
  start() {
    this._looping = true;
    requestAnimationFrame(this.frame);
  }

  /**
   * Freeze the scene. This will prevent updating React, or redrawing the scene
   */
  stop() {
    this._looping = false;
  }

  /**
   * Update the size of the mounted canvas element
   */
  resize(w: number, h: number) {
    this._width = w;
    this._height = h;
    this._canvas.style.width = w + 'px';
    this._canvas.style.height = h + 'px';
    const width = w * window.devicePixelRatio;
    const height = h * window.devicePixelRatio;
    this._canvas.width = width;
    this._canvas.height = height;
    this._gl.viewport(0, 0, width, height);
    const fov = Math.PI / 3;
    const aspect = w / h;
    const near = 0.1;
    const far = 1000;
    const f = 1 / Math.tan(fov / 2);
    // prettier-ignore
    this.group.setUniform('projectionMatrix', [
      f / aspect, 0, 0, 0,
      0, f, 0, 0,
      0, 0, (near + far) / (near - far), -1,
      0, 0, near * far * 2 / (near - far), 0,
    ]);
  }

  /**
   * Retrieve the top-level DOM element, which can be attached to a parent
   * in the HTML document.
   */
  getDOMElement() {
    return this._eventLayer;
  }

  /**
   * Retrieve the underlying canvas element
   */
  getCanvas() {
    return this._canvas;
  }

  /**
   * Retrieve the WebGL context of the canvas
   */
  getGLContext() {
    return this._gl;
  }

  _onResize = () => {
    this._width = window.innerWidth;
    this._height = window.innerHeight;
    this._needsResize = true;
  };
}
