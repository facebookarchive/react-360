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
import Location from './Compositor/Location';
import type Surface from './Compositor/Surface';
import Overlay, {type OverlayInterface} from './Compositor/Overlay';
import VRState from './Compositor/VRState';
import MousePanCameraController from './Controls/CameraControllers/MousePanCameraController';
import ScrollPanCameraController from './Controls/CameraControllers/ScrollPanCameraController';
import DeviceOrientationCameraController from './Controls/CameraControllers/DeviceOrientationCameraController';
import Controls from './Controls/Controls';
import GamepadInputChannel from './Controls/InputChannels/GamepadInputChannel';
import KeyboardInputChannel from './Controls/InputChannels/KeyboardInputChannel';
import MouseInputChannel from './Controls/InputChannels/MouseInputChannel';
import TouchInputChannel from './Controls/InputChannels/TouchInputChannel';
import {type InputEvent} from './Controls/InputChannels/Types';
import {type Quaternion, type Ray, type Vec3} from './Controls/Types';
import ControllerRaycaster from './Controls/Raycasters/ControllerRaycaster';
import MouseRaycaster from './Controls/Raycasters/MouseRaycaster';
import TouchRaycaster from './Controls/Raycasters/TouchRaycaster';
import type ReactExecutor from './Executor/ReactExecutor';
import AudioModule from './Modules/AudioModule';
import EnvironmentModule from './Modules/EnvironmentModule';
import VideoModule from './Modules/VideoModule';
import type Module from './Modules/Module';
import type {CustomView} from './Modules/UIManager';
import Runtime, {type NativeModuleInitializer} from './Runtime/Runtime';
import {rotateByQuaternion} from './Utils/Math';

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

// Store appearance data that can be pushed onto a stack and re-accessed later
type AppearanceState = {
  height: number,
  surface: null | Surface,
  width: number,
};

export type React360Options = {
  assetRoot?: string,
  customOverlay?: OverlayInterface,
  customViews?: Array<CustomView>,
  executor?: ReactExecutor,
  fullScreen?: boolean,
  nativeModules?: Array<Module | NativeModuleInitializer>,
};

/**
 * New top-level class for the panel-first design of React 360 aligned with
 * native platform capabilities.
 */
export default class ReactInstance {
  _appearanceStateStack: Array<AppearanceState>;
  _assetRoot: string;
  _audioModule: ?AudioModule;
  _cameraPosition: Vec3;
  _cameraQuat: Quaternion;
  _defaultLocation: Location;
  _eventLayer: HTMLElement;
  _events: Array<InputEvent>;
  _focused2DSurface: null | Surface;
  _frameData: ?VRFrameData;
  _lastFrameTime: number;
  _looping: boolean;
  _needsResize: boolean;
  _nextFrame: null | AnimationFrameData;
  _parent: HTMLElement;
  _rays: Array<Ray>;
  _videoModule: ?VideoModule;
  controls: Controls;
  compositor: Compositor;
  overlay: OverlayInterface;
  runtime: Runtime;
  scene: THREE.Scene;
  vrState: VRState;

  /**
   * Create a new instance of a React 360 app, given a path to the React 360 JS
   * bundle and a DOM component to mount within.
   */
  constructor(
    bundle: string,
    parent: HTMLElement,
    options: React360Options = {},
  ) {
    (this: any).enterVR = this.enterVR.bind(this);
    (this: any).frame = this.frame.bind(this);
    (this: any)._onResize = this._onResize.bind(this);

    this._appearanceStateStack = [];
    this._cameraPosition = [0, 0, 0];
    this._cameraQuat = [0, 0, 0, 1];
    this._events = [];
    this._needsResize = false;
    this._parent = parent;
    this._rays = [];
    this._frameData = null;
    if ('VRFrameData' in window) {
      this._frameData = new VRFrameData();
    }
    this._looping = false;
    this._nextFrame = null;
    this._lastFrameTime = 0;
    this._focused2DSurface = null;

    if (options.fullScreen) {
      parent.style.position = 'fixed';
      parent.style.top = '0';
      parent.style.left = '0';
      parent.style.margin = '0';
      parent.style.padding = '0';
      parent.style.width = '100%';
      parent.style.height = `${window.innerHeight}px`;

      window.addEventListener('resize', this._onResize);
    }

    this._eventLayer = document.createElement('div');
    this._eventLayer.style.width = `${parent.clientWidth}px`;
    this._eventLayer.style.height = `${parent.clientHeight}px`;
    parent.appendChild(this._eventLayer);
    this.scene = new THREE.Scene();
    this.controls = new Controls();
    this.overlay = options.customOverlay || new Overlay(parent);

    this.compositor = new Compositor(this._eventLayer, this.scene);
    let assetRoot = options.assetRoot || 'static_assets/';
    if (!assetRoot.endsWith('/')) {
      assetRoot += '/';
    }
    this._assetRoot = assetRoot;
    const runtimeOptions = {
      assetRoot: assetRoot,
      customViews: options.customViews || [],
      executor: options.executor,
      nativeModules: [
        new EnvironmentModule(this.compositor.getEnvironment()),
        ctx => {
          const audio = new AudioModule(ctx);
          this._audioModule = audio;
          return audio;
        },
        ctx => {
          const video = new VideoModule(
            this.compositor.getVideoPlayerManager(),
          );
          this._videoModule = video;
          return video;
        },
        ...(options.nativeModules || []),
      ],
    };
    this.runtime = new Runtime(
      this.scene,
      bundleFromLocation(bundle),
      runtimeOptions,
    );

    this.vrState = new VRState();
    this.vrState.onDisplayChange(display => {
      if (display) {
        this.overlay.setVRButtonState(true, 'View in VR', this.enterVR);
      } else {
        this.overlay.setVRButtonState(false, 'No Headset', null);
      }
    });

    this.controls.addCameraController(
      new DeviceOrientationCameraController(this._eventLayer),
    );
    this.controls.addCameraController(
      new MousePanCameraController(this._eventLayer),
    );
    this.controls.addCameraController(
      new ScrollPanCameraController(this._eventLayer),
    );
    this.controls.addEventChannel(new MouseInputChannel(this._eventLayer));
    this.controls.addEventChannel(new TouchInputChannel(this._eventLayer));
    this.controls.addEventChannel(new KeyboardInputChannel());
    this.controls.addEventChannel(new GamepadInputChannel());
    this.controls.addRaycaster(new ControllerRaycaster());
    this.controls.addRaycaster(new MouseRaycaster(this._eventLayer));
    this.controls.addRaycaster(new TouchRaycaster(this._eventLayer));
  }

  _onResize() {
    this._needsResize = true;
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
  frame(ms: number) {
    const frameStart = ms || 0;
    if (this._lastFrameTime === 0) {
      this._lastFrameTime = frameStart;
    }
    const delta = Math.min(frameStart - this._lastFrameTime, 100);
    this._lastFrameTime = frameStart;

    if (this._needsResize) {
      const height = window.innerHeight;
      const width = this._parent.clientWidth;
      this._parent.style.height = `${height}px`;
      this.resize(width, height);
      this._needsResize = false;
    }

    this._events.length = 0;
    this._rays.length = 0;
    this.controls.fillEvents(this._events);
    this.controls.fillRays(this._rays);

    // Get Camera position and orientation, so that the raycasters can be
    // properly computed
    const display = this.vrState.getCurrentDisplay();
    const frameData = this._frameData;
    if (this._focused2DSurface) {
      this._cameraPosition[0] = 0;
      this._cameraPosition[1] = 0;
      this._cameraPosition[2] = 0;
      this._cameraQuat[0] = 0;
      this._cameraQuat[1] = 0;
      this._cameraQuat[2] = 0;
      this._cameraQuat[3] = 1;
    } else if (display && display.isPresenting && frameData) {
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
    if (this._rays.length > 0) {
      for (let i = 0; i < this._rays.length; i++) {
        const ray = this._rays[i];
        if (!ray.hasAbsoluteCoordinates) {
          // Place the ray relative to camera space
          ray.origin[0] += this._cameraPosition[0];
          ray.origin[1] += this._cameraPosition[1];
          ray.origin[2] += this._cameraPosition[2];
          rotateByQuaternion(ray.direction, this._cameraQuat);
        }
      }
    }
    // Update runtime
    // Compute intersections
    if (this._focused2DSurface) {
      this.runtime.set2DRays(this._rays, this._focused2DSurface);
    } else {
      this.runtime.setRays(this._rays, this._cameraPosition, this._cameraQuat);
    }
    this.runtime.queueEvents(this._events);
    // Update each view
    this.runtime.frame(
      this.compositor.getCamera(),
      this.compositor.getRenderer(),
    );
    if (this._audioModule) {
      const audioModule = this._audioModule;
      audioModule._setCameraParameters(this._cameraPosition, this._cameraQuat);
      audioModule.frame(delta);
    }
    this.compositor.frame(delta);
    const cursorVis = this.compositor.getCursorVisibility();
    if (
      cursorVis === 'visible' ||
      (cursorVis === 'auto' && this.runtime.isCursorActive())
    ) {
      this.compositor.updateCursor(this._rays, this.runtime.getCursorDepth());
    } else {
      this.compositor.updateCursor(null, 0);
    }

    this.overlay.setCameraRotation(this._cameraQuat);

    this.compositor.setMouseCursorActive(this.runtime.isMouseCursorActive());

    if (display && display.isPresenting && frameData) {
      this.compositor.renderVR(display, frameData);
      if (this._looping) {
        // Avoid reallocating objects each frame
        if (this._nextFrame) {
          const nextFrame: any = this._nextFrame;
          nextFrame.vr = true;
          nextFrame.id = display.requestAnimationFrame(this.frame);
        } else {
          this._nextFrame = {
            vr: true,
            id: display.requestAnimationFrame(this.frame),
          };
        }
      }
    } else if (this._focused2DSurface) {
      this.compositor.renderSurface(this._focused2DSurface);
      if (this._looping) {
        if (this._nextFrame) {
          const nextFrame: any = this._nextFrame;
          nextFrame.vr = false;
          nextFrame.id = requestAnimationFrame(this.frame);
        } else {
          this._nextFrame = {
            vr: false,
            id: requestAnimationFrame(this.frame),
          };
        }
      }
    } else {
      this.compositor.render(this._cameraPosition, this._cameraQuat);
      if (this._looping) {
        // Avoid reallocating objects each frame
        if (this._nextFrame) {
          const nextFrame: any = this._nextFrame;
          nextFrame.vr = false;
          nextFrame.id = requestAnimationFrame(this.frame);
        } else {
          this._nextFrame = {
            vr: false,
            id: requestAnimationFrame(this.frame),
          };
        }
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
   * Return the default location found at the world origin.
   */
  getDefaultLocation(): Location {
    if (!this._defaultLocation) {
      this._defaultLocation = new Location();
    }
    return this._defaultLocation;
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
    this.compositor.showSurface(surface);
    return this.runtime.createRootView(root.name, root.initialProps, surface);
  }

  /**
   * Render a 3D React tree to a location in space. This uses a meter-based
   * coordinate system.
   */
  renderToLocation(root: Root, location: Location): number | null {
    if (!this._looping) {
      this.start();
    }
    return this.runtime.createRootView(root.name, root.initialProps, location);
  }

  /**
   * Switch to 3D rendering to rendering the contents of a specific surface
   * directly to the canvas. This may be useful for debugging or certain
   * out-of-VR use cases.
   */
  focusSurface(name?: string) {
    const surface = name
      ? this.compositor.getSurface(name)
      : this.compositor.getDefaultSurface();
    if (!surface) {
      throw new Error(
        `Cannot focus Surface ${name || ''}, it is not registered`,
      );
    }
    const canvas = this.compositor.getCanvas();
    this._appearanceStateStack.push({
      height: canvas.clientHeight,
      surface: this._focused2DSurface,
      width: canvas.clientWidth,
    });
    this._focused2DSurface = surface;
    this.resize(surface.getWidth(), surface.getHeight());
    this.overlay.hide();
  }

  /**
   * Return from focusing on a specific surface, to rendering the previous
   * surface or 3D scene.
   */
  releaseSurface() {
    const lastAppearanceState = this._appearanceStateStack.pop();
    if (lastAppearanceState) {
      this._focused2DSurface = lastAppearanceState.surface;
      this.resize(lastAppearanceState.width, lastAppearanceState.height);
    }
    if (!lastAppearanceState || !lastAppearanceState.surface) {
      this._focused2DSurface = null;
      this.overlay.show();
    }
  }

  /**
   * Begins the render loop
   */
  start() {
    if (this._looping) {
      return;
    }
    this._looping = true;
    this.frame(0);
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

  /**
   *
   */
  enterVR() {
    const display = this.vrState.getCurrentDisplay();
    if (!display || display.isPresenting) {
      return;
    }
    display
      .requestPresent([
        {
          source: this.compositor.getCanvas(),
        },
      ])
      .then(() => {
        const leftParams = display.getEyeParameters('left');
        const rightParams = display.getEyeParameters('right');
        this.compositor.resize(
          leftParams.renderWidth + rightParams.renderWidth,
          Math.min(leftParams.renderHeight, rightParams.renderHeight),
          1,
        );
      });
  }

  resize(width: number, height: number) {
    this._eventLayer.style.width = `${width}px`;
    this._eventLayer.style.height = `${height}px`;
    this.compositor.resizeCanvas(width, height);
  }

  /**
   * Transforms the local path of a static asset to include the current static
   * asset directory.
   */
  getAssetURL(localPath: string): string {
    return this._assetRoot + localPath;
  }
}
