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

import {Scene} from 'three';
import {Player, GuiSys} from 'ovrui';
import bundleFromLocation from './bundleFromLocation';
import createRootView from './createRootView';

import type Bridge from './Bridge/Bridge';
import type {RootView} from './createRootView';
import type Module from './Modules/Module';
import type {CustomView} from './Modules/UIManager';
import type {Camera} from 'three';

type VRInstanceOptions = {
  allowCarmelDeeplink?: boolean,
  antialias?: boolean,
  assetRoot?: string,
  bridge?: Bridge,
  calculateVerticalFOV?: (number, number) => number,
  camera?: Camera,
  canvasAlpha?: boolean,
  cursorVisibility?: 'visible' | 'hidden' | 'auto',
  customViews?: Array<CustomView>,
  disableTouchPanning?: boolean,
  enableHotReload?: boolean,
  font?: any,
  height?: number,
  hideCompass?: boolean,
  hideFullscreen?: boolean,
  initialProps?: {[prop: string]: any},
  nativeModules?: Array<Module>,
  onEnterVR?: () => void,
  onExitVR?: () => void,
  pixelRatio?: number,
  raycasters?: Array<any>,
  scene?: Scene,
  width?: number,
};

/**
 * VRInstance represents a mounted React VR application.
 * It contains such core pieces as an OVRUI player, a Three.js scene and camera,
 * and a React VR context used to execute a React application.
 */
export default class VRInstance {
  guiSys: GuiSys;
  player: Player;
  rootView: RootView;
  scene: Scene;

  _looping: boolean;

  /**
   * Construct a VRInstance with a specific React VR application.
   * @param bundle - The relative or absolute path to the JS bundle containing
   *   the application
   * @param root - The name of the root component to render, as registered with
   *   AppRegistry from the React side.
   * @param parent (optional) - The element which will contain the VR window.
   *   It can be a DOM node, or the string id of a DOM node. If no parent is
   *   specified, the VR window will be directly attached to the body tag.
   * @param options (optional) - Extra options to configure the VRInstance.
   *   - camera: the Three.js camera. If none, a default camera is created.
   *   - cursorVisibility: sets when the cursor is shown. default=hidden
   *   - disableTouchPanning: disallow touch to pan camera on mobile. Defaults to false.
   *   - height: a number specifying the height of the VR window, in pixels
   *   - nativeModules: array of native module instances to register
   *   - scene: the Three.js scene to which ReactVR elements are added
   *   - width: a number specifying the width of the VR window, in pixels
   *   - allowCarmelDeeplink: attempts deeplinking to Carmel development
   *       browser when enabled defaults to enabled in development builds,
   *       disabled otherwise
   */
  constructor(
    bundle: string,
    root: string,
    parent: Element | string,
    options: VRInstanceOptions = {}
  ) {
    if (!bundle) {
      throw new Error('Cannot initialize ReactVR without specifying a bundle');
    }
    if (!root) {
      throw new Error('Cannot initialize ReactVR without specifying the root component');
    }

    // Initialize the scene that will hold our contents
    this.scene = options.scene || new Scene();

    // Allow deep-linking to the Carmel development browser if it's not
    // explicitly disabled
    const allowCarmelDeeplink = !!options.allowCarmelDeeplink;

    // Initialize a Player container, and attach it to the parent element
    this.player = new Player({
      elementOrId: parent,

      // Optional Player configuration
      antialias: options.hasOwnProperty('antialias') ? options.antialias : false,
      calculateVerticalFOV: options.calculateVerticalFOV,
      camera: options.camera,
      canvasAlpha: options.hasOwnProperty('canvasAlpha') ? options.antialias : true,
      width: options.width,
      height: options.height,
      onEnterVR: () => this._onEnterVR(),
      onExitVR: () => this._onExitVR(),
      allowCarmelDeeplink: allowCarmelDeeplink,
      disableTouchPanning: options.disableTouchPanning,
      pixelRatio: options.pixelRatio,
      hideFullscreen: options.hideFullscreen,
      hideCompass: options.hideCompass,
    });

    let defaultAssetRoot = 'static_assets/';
    if (__DEV__) {
      defaultAssetRoot = '../static_assets/';
    }
    let assetRoot = options.assetRoot || defaultAssetRoot;
    if (!assetRoot.endsWith('/')) {
      assetRoot += '/';
    }

    // Initialize a GuiSys to use with React
    const guiOptions = {
      cursorVisibility: options.hasOwnProperty('cursorVisibility')
        ? options.cursorVisibility
        : 'hidden',
      font: options.font,
      raycasters: options.raycasters,
    };
    this.guiSys = new GuiSys(this.scene, guiOptions);
    this.rootView = createRootView(this.guiSys, root, {
      // Name of the mounted root module, from AppRegistry
      assetRoot: assetRoot,
      bridge: options.bridge,
      bundle: bundleFromLocation(bundle),
      customViews: options.customViews,
      enableHotReload: options.enableHotReload,
      initialProps: options.initialProps,
      isLowLatency: !this.player.isMobile,
      nativeModules: options.nativeModules,
    });

    (this: any)._frame = this._frame.bind(this);
  }

  /**
   * Runs once per frame, to update each of the various components of this
   * VR application.
   * @param timestamp - current time in milliseconds; passed by the browser as
   *   the argument to the requestAnimationFrame callback
   */
  _frame(timestamp: number) {
    // Run custom render method
    if (typeof this.render === 'function') {
      this.render(timestamp);
    }
    const camera = this.player.camera;
    this.player.frame();
    // Get updates from GuiSys
    this.guiSys.frame(camera, this.player.renderer);
    // Get updates from RN
    this.rootView.frame(camera);
    // Render frame to output device
    const subScenes = this.guiSys.getOffscreenRenders();
    for (const item in subScenes) {
      if (!subScenes.hasOwnProperty(item)) {
        continue;
      }
      const params = subScenes[item];
      this.player.renderOffscreen(params.scene, params.camera, params.renderTarget);
    }
    this.player.render(this.scene);

    if (this._looping) {
      this.player.requestAnimationFrame(this._frame);
    }
  }

  _onEnterVR() {
    this.rootView.context &&
      this.rootView.context.callFunction('RCTDeviceEventEmitter', 'emit', ['onEnterVR', []]);
  }

  _onExitVR() {
    this.rootView.context &&
      this.rootView.context.callFunction('RCTDeviceEventEmitter', 'emit', ['onExitVR', []]);
  }

  /**
   * Start rendering the application
   */
  start() {
    this._looping = true;
    this.player.requestAnimationFrame(this._frame);
  }

  /**
   * Stop rendering the application
   */
  stop() {
    this._looping = false;
  }

  /**
   * Return the camera being used to render the scene.
   */
  camera() {
    return this.player.camera;
  }

  registerTextureSource(name: string, source: Element, options: {[key: string]: any} = {}) {
    if (this.rootView && this.rootView.context) {
      this.rootView.context.registerTextureSource(name, source, options);
    }
  }

  /**
   * Mount a new root component on an existing scenegraph node, returning its
   * unique identifier
   */
  mountComponent(name: string, initialProps: {[prop: string]: any}, container: SceneGraphNode) {
    if (this.rootView) {
      const tag = this.rootView.context.createRootView(name, initialProps, container);
      return tag;
    }
    return null;
  }

  /**
   * Unmount a root component, given its unique identifier
   */
  unmountComponent(tag: number) {
    if (this.rootView) {
      this.rootView.context.destroyRootView(tag);
    }
  }
}
