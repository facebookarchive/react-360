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
import bundleFromLocation from './bundleFromLocation';
import Compositor from './Compositor/Compositor';
import type Surface from './Compositor/Surface';
import VRState from './Compositor/VRState';
import MousePanCameraController from './Controls/CameraControllers/MousePanCameraController';
import Controls from './Controls/Controls';
import GamepadInputChannel from './Controls/InputChannels/GamepadInputChannel';
import KeyboardInputChannel from './Controls/InputChannels/KeyboardInputChannel';
import {type InputEvent} from './Controls/InputChannels/Types';
import {type Quaternion, type Ray, type Vec3} from './Controls/Types';
import MouseRaycaster from './Controls/Raycasters/MouseRaycaster';
import Runtime from './Runtime/Runtime';

type Root = {
  initialProps: Object,
  name: string,
};

type AnimationFrameData =
  | {
      id: number,
      vr: true,
    }
  | {
      id: AnimationFrameID,
      vr: false,
    };

/**
 * New top-level class for the panel-first design of React VR aligned with
 * native platform capabilities.
 */
export default class ReactVRInstance {
  _cameraPosition: Vec3;
  _cameraQuat: Quaternion;
  _events: Array<InputEvent>;
  _frameData: ?VRFrameData;
  _looping: boolean;
  _nextFrame: null | AnimationFrameData;
  _rays: Array<Ray>;
  controls: Controls;
  compositor: Compositor;
  runtime: Runtime;
  scene: THREE.Scene;
  vrState: VRState;

  /**
   * Create a new instance of a React VR app, given a path to the React VR JS
   * bundle and a DOM component to mount within.
   */
  constructor(bundle: string, parent: HTMLElement) {
    (this: any).frame = this.frame.bind(this);

    this._cameraPosition = [0, 0, 0];
    this._cameraQuat = [0, 0, 0, 1];
    this._events = [];
    this._rays = [];
    this._frameData = null;
    if ('VRFrameData' in window) {
      this._frameData = new VRFrameData();
    }
    this._looping = false;
    this._nextFrame = null;

    this.scene = new THREE.Scene();
    this.compositor = new Compositor(parent, this.scene);
    this.controls = new Controls();
    this.runtime = new Runtime(this.scene, bundleFromLocation(bundle));
    this.vrState = new VRState();

    const cameraController = new MousePanCameraController(parent);
    const raycaster = new MouseRaycaster(parent);
    raycaster.enable();
    this.controls.addCameraController(cameraController);
    this.controls.addEventChannel(new KeyboardInputChannel());
    this.controls.addEventChannel(new GamepadInputChannel());
    this.controls.addRaycaster(raycaster);
  }

  /**
   * New API for creating a root component, designed for mounting with
   * renderToSurface or renderToLocation commands.
   *
   * For now, it just returns a simple object designed to encapsulate the
   * information necessary for mounting.
   */
  createRoot(name: string, initialProps: Object = {}): Root {
    return {
      name,
      initialProps,
    };
  }

  /**
   * Core of the app rendering loop - gathers input, updates the React app, and
   * re-renders from the latest point of view.
   */
  frame() {
    this._events.length = 0;
    this._rays.length = 0;
    this.controls.fillEvents(this._events);
    this.controls.fillRays(this._rays);

    // Get Camera position and orientation, so that the raycasters can be
    // properly computed
    const display = this.vrState.getCurrentDisplay();
    const frameData = this._frameData;
    if (display && display.isPresenting && frameData) {
      display.getFrameData(frameData);
      // Fill camera properties from frameData
      const pose = frameData.pose;
      if (pose.position) {
        const position = pose.position;
        this._cameraPosition[0] = position[0];
        this._cameraPosition[1] = position[1];
        this._cameraPosition[2] = position[2];
      }
      if (pose.orientation) {
        const orientation = pose.orientation;
        this._cameraQuat[0] = orientation[0];
        this._cameraQuat[1] = orientation[1];
        this._cameraQuat[2] = orientation[2];
        this._cameraQuat[3] = orientation[3];
      }
    } else {
      this.controls.fillCameraProperties(
        this._cameraPosition,
        this._cameraQuat,
      );
    }
    // Update runtime
    // Compute intersections
    this.runtime.setRays(this._rays, this._cameraPosition, this._cameraQuat);
    this.runtime.queueEvents(this._events);
    // Update each view
    this.runtime.frame(
      this.compositor.getCamera(),
      this.compositor.getRenderer(),
    );

    if (display && display.isPresenting && frameData) {
      this.compositor.renderVR(display, frameData);
      if (this._looping) {
        this._nextFrame = {
          vr: true,
          id: display.requestAnimationFrame(this.frame),
        };
      }
    } else {
      this.compositor.render(this._cameraPosition, this._cameraQuat);
      if (this._looping) {
        this._nextFrame = {
          vr: false,
          id: requestAnimationFrame(this.frame),
        };
      }
    }
  }

  /**
   * Returns the rendering system's default 2D surface.
   */
  getDefaultSurface(): Surface {
    return this.compositor.getDefaultSurface();
  }

  /**
   * Render a React tree to a 2D Surface. This uses a pixel-based coordinate
   * system in two dimensions.
   * Takes a root object returned from the createRoot method, and an instance
   * of a Surface, returning the unique tag of the React root.
   * If the render loop hasn't started yet, this kicks it off.
   */
  renderToSurface(root: Root, surface: Surface): number | null {
    if (!this._looping) {
      this.start();
    }
    this.scene.add(surface.getNode());
    return this.runtime.createRootView(root.name, root.initialProps, surface);
  }

  /**
   * Render a 3D React tree to a location in space. This uses a meter-based
   * coordinate system.
   */
  renderToLocation() {
    throw new Error('renderToLocation is not implemented');
  }

  /**
   * Begins the render loop
   */
  start() {
    if (this._looping) {
      return;
    }
    this._looping = true;
    this.frame();
  }

  /**
   * Ends the render loop and cancels any scheduled raf callbacks
   */
  stop() {
    this._looping = false;
    const nextFrame = this._nextFrame;
    if (nextFrame) {
      const display = this.vrState.getCurrentDisplay();
      if (display && display.isPresenting) {
        if (nextFrame.vr) {
          display.cancelAnimationFrame(nextFrame.id);
        }
      } else if (!nextFrame.vr) {
        cancelAnimationFrame(nextFrame.id);
      }
      this._nextFrame = null;
    }
  }
}
