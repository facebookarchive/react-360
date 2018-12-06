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

/* eslint-disable import/order,no-console */

import AndroidConstants from './Modules/AndroidConstants';
import AsyncLocalStorage from './Modules/AsyncLocalStorage';
import ControllerInfo from './Modules/ControllerInfo';
import DeviceInfo from './Modules/DeviceInfo';
import ExternalAssets from './Modules/ExternalAssets';
import GlyphTextures from './Modules/GlyphTextures';
import History from './Modules/History';
import LinkingManager from './Modules/LinkingManager';
import Location from './Modules/Location';
import LocationObserver from './Modules/LocationObserver';
import Networking from './Modules/Networking';
import PlatformConstants from './Modules/PlatformConstants';
import {RCTResourceManager} from './Utils/RCTResourceManager';
import {RCTInputControls} from './Utils/RCTInputControls';
import RCTHeadModel from './Utils/RCTHeadModel';
import RCTVideoModule from './Modules/RCTVideoModule';
import RCTAudioModule from './Modules/RCTAudioModule';
import TextureManager from './Utils/TextureManager';
import Timing from './Modules/Timing';
import UIManager from './Modules/UIManager';
import WebSocketModule from './Modules/WebSocketModule';
import ReactVRConstants from './Modules/ReactVRConstants';
import RCTExceptionsManager from './Modules/RCTExceptionsManager';
import RCTSourceCode from './Modules/RCTSourceCode';
import {GuiSysEventType, UIViewEventType} from './OVRUI/UIView/GuiSysEvent';
import * as THREE from 'three';

import type ReactExecutor from './Executor/ReactExecutor';
import type Module from './Modules/Module';
import type GuiSys from './OVRUI/UIView/GuiSys';
import type UIView from './OVRUI/UIView/UIView';
import type {UIViewEvent} from './OVRUI/UIView/GuiSysEvent';
import type {Camera, Object3D, Scene} from 'three';
import type {CustomView} from './Modules/UIManager';

type Message = [Array<number>, Array<number>, Array<any>];

export type ContextOptions = {
  assetRoot?: string,
  customViews?: Array<CustomView>,
  enableHotReload?: boolean,
  isLowLatency?: boolean,
};

const ROOT_VIEW_INCREMENT = 10;
const ONMOVE_EPSILON = 0.0001;

/**
 * describe
 * Reflects the contents of a the class over to React code
 * this is used within init to create a contract between the runtime and React
 * as to which module corresponds to a specfic index
 * @param ctx - React Context
 **/
function describe(ctx: ReactNativeContext) {
  const remoteModuleConfig = [];
  for (const module of ctx.modules) {
    const description = module.__describe();
    if (__DEV__) {
      console.log(description);
    }
    remoteModuleConfig.push(description);
  }

  return remoteModuleConfig;
}

/**
 * ReactNativeContext is the main object for communicating to and from the React bundle
 * The react bundle runs asynchronously in a webworker so that the main UI and render thread
 * of the browser is not interrupted by work within react.
 * On construction the context will start the WebWorker and register a callback for handling
 * the messages which are handled in the `frame` function
 * As the webworker runs asynchronously calls to and from react are latent and therefore will
 * not have a return value. JavaScript callbacks and addional messages should be used to handle
 * responses
 * Order of API use:
 * 1) Create the Context
 * 2) register any external modules through `registerModule`
 * 3) init the bundle, this causes the bundle to be loaded from the url provided but prior to
 *    that creates a json description of the regstered modules. This description - created by
 *    `describe` - determines the details of the protocol that is used to communicate with the
 *    webworker. It is important that both the modules and the registered views of UIManager
 *    provide the necessary detail, for modules the majority of the work is handled via
 *    Module.describe however for views any properties that need to be communicated are across
 *    the WebWorker need to be described in `NativeProps`. Note any properties starting in '_'
 *    will be determined to be hidden and any functions starting with '$' will be determined to be
 *    async/promise functions and take an extra two callback IDs to denote success and fail - eg
 *    LinkingModule: openURL
 * 4) createRootView
 *    A root view is the main view created by the runtime code, this will then cause a registerd
 *    module to be created with the necessary Props
 *    see `AppRegistry.registerComponent('main', () => Main);`
 *    The root view tag is returned and can be used to update the props for the root view or
 *    delete the view
 * 5) start of render loop
 * 6) call frame function on context
 *    `frame` must be called within a requestAnimationFrame callback this pumps the webworker and
 *    distributes the messages obtained from the bridge. This is also where the <Scene> transform
 *    is applied, if one is present (not to the camera directly but to a camera parent object that
 *    we create and manage here; if camera already has a parent we log a warning and do nothing).
 * 7) update root view as required
 *    Optionally and as required the props on the root view can be updated using the root tag
 *    obtained from `createRootView`
 * 8) destroyRootView
 *    the destruction of the root view causes the entire view hierarchy to be deleted
 * 9) shutdown
 *    Will release the resrouces associated with the context, once shutdown an init is no longer
 *    possible
 **/
export class ReactNativeContext {
  AudioModule: RCTAudioModule;
  currentRootTag: number;
  guiSys: GuiSys;
  enableHotReload: boolean;
  executor: ReactExecutor;
  GlyphTextures: GlyphTextures;
  HeadModel: RCTHeadModel;
  isLowLatency: boolean;
  lastHit: UIView | null;
  lastLocalIntersect: [number, number] | null;
  lastSource: string | null;
  messages: Array<Message>;
  modules: Array<Module>;
  RCTInputControls: RCTInputControls;
  RCTResourceManager: RCTResourceManager;
  TextureManager: TextureManager;
  Timing: Timing;
  UIManager: UIManager;
  VideoModule: RCTVideoModule;

  _cameraParentFromTag: Array<Object3D | null>;
  _moduleForTag: Array<string>;

  /**
   * Construct a ReactNativeContext given the gui and execution environment.
   * The construction registers the core modules used by most applications
   * new modules can be registered after this but prior to the init call
   * @param guiSys - instance of OVRUI.guiSys
   * @param executor - Executor instance to run React code in
   */
  constructor(guiSys: GuiSys, executor: ReactExecutor, options: ContextOptions = {}) {
    this.modules = [];
    this.currentRootTag = 1;
    this.executor = executor;
    this.guiSys = guiSys;
    this.messages = [];
    this.isLowLatency = !!options.isLowLatency; // Whether this context should target 90fps
    this.enableHotReload = !!options.enableHotReload; // Whether this context should enable hot reload

    this.lastHit = null;
    this.lastLocalIntersect = null;
    this.lastSource = null;

    this.UIManager = new UIManager(this, guiSys, options.customViews);
    this.Timing = new Timing(this);
    this.RCTResourceManager = new RCTResourceManager();
    this.RCTInputControls = new RCTInputControls(this, guiSys);
    this.HeadModel = new RCTHeadModel(this);
    this.VideoModule = new RCTVideoModule(this);
    this.AudioModule = new RCTAudioModule(this);
    this.TextureManager = new TextureManager();
    this.GlyphTextures = new GlyphTextures(this);
    this._moduleForTag = [];
    this._cameraParentFromTag = [];

    // register the core modules
    this.registerModule(this.UIManager);
    this.registerModule(new AndroidConstants());
    this.registerModule(new AsyncLocalStorage(this));
    this.registerModule(new ControllerInfo(this));
    this.registerModule(new DeviceInfo());
    this.registerModule(new History(this));
    this.registerModule(new Networking(this));
    this.registerModule(new LinkingManager(this));
    this.registerModule(new Location(this));
    this.registerModule(new LocationObserver(this));
    this.registerModule(new PlatformConstants());
    this.registerModule(this.Timing);
    this.registerModule(this.VideoModule);
    this.registerModule(this.AudioModule);
    this.registerModule(new WebSocketModule(this));
    this.registerModule(new ReactVRConstants());
    this.registerModule(new RCTExceptionsManager());
    this.registerModule(new RCTSourceCode(this));
    this.registerModule(new ExternalAssets(options.assetRoot || ''));
    this.registerModule(this.GlyphTextures);

    // Register event listener to Guisys
    guiSys.eventDispatcher.addEventListener('GuiSysEvent', this._onGuiSysEvent.bind(this));
    guiSys.eventDispatcher.addEventListener('UIViewEvent', this._onUIViewEvent.bind(this));
  }

  /**
   * initialises the WebWorker with the bundle
   * @param bundle - url of the bundle
   */
  init(bundle: string) {
    this.executor.moduleConfig(describe(this));
    this.executor.exec(bundle);

    if (this.enableHotReload) {
      const bundleURL = new URL(bundle);
      console.warn(`HotReload on ${bundle}`);
      this.callFunction('HMRClient', 'enable', [
        'vr',
        bundleURL.pathname.toString().substr(1),
        bundleURL.hostname,
        bundleURL.port,
      ]);
    }
  }

  /**
   * shutdown the react native context
   */
  shutdown() {
    for (const module of this.modules) {
      if (typeof module.shutdown === 'function') {
        module.shutdown();
      }
    }
  }

  /**
   * creates a root view given the registered modules and optional props
   * @param module - name of module registered in the react bundle
   * @param props - props that is posted to the registered module
   * @return returns the tag of the rootview
   */
  createRootView(
    module: string,
    props: {[prop: string]: any},
    container?: SceneGraphNode | Scene,
    inSurfaceContext?: boolean
  ) {
    const tag = this.currentRootTag;
    // TODO: Root tags should be sourced from UIManager instead, which
    // is aware of availability.
    this.currentRootTag += ROOT_VIEW_INCREMENT;
    this.executor.call('AppRegistry', 'runApplication', [
      module,
      {initialProps: props, rootTag: tag},
    ]);

    this._moduleForTag[tag] = module;
    if (!container) {
      this._cameraParentFromTag[tag] = new THREE.Object3D();
    }
    this.UIManager.createRootView(tag, container, inSurfaceContext);
    return tag;
  }

  /**
   * updated a root view with new props
   * @param tag - root view tag returned from createRootView
   * @param props - props that is posted to the registered module
   */
  updateRootView(tag: number, props: {[prop: string]: any}) {
    this.executor.call('AppRegistry', 'runApplication', [
      this._moduleForTag[tag],
      {initialProps: props, rootTag: tag},
    ]);
  }

  /**
   * deletes the root view
   * @param tag - root view tag returned from createRootView
   */
  destroyRootView(tag: number) {
    delete this._moduleForTag[tag];
    const cameraParent = this._cameraParentFromTag[tag];
    if (cameraParent) {
      // Detach children; typically there is only 1 child, the camera.
      for (const child of cameraParent.children) {
        cameraParent.remove(child);
      }
      delete this._cameraParentFromTag[tag];
    }
    this.executor.call('AppRegistry', 'unmountApplicationComponentAtRootTag', [tag]);
  }

  /**
   * internal function that processing the gui event and distributes to React code
   * @param event - event object passed from guiSys
   */
  _onGuiSysEvent(event: UIViewEvent) {
    switch (event.eventType) {
      case GuiSysEventType.HIT_CHANGED:
        if (
          this.lastHit !== event.args.currentHit ||
          this.lastSource !== event.args.currentSource
        ) {
          this.lastHit = event.args.currentHit;
          this.lastSource = event.args.currentSource;
        }
        break;
      default:
        break;
    }
  }

  /**
   * internal function that processing the uiview event and distributes to React code
   * @param event - event object passed from uiView
   */
  _onUIViewEvent(event: UIViewEvent) {
    switch (event.eventType) {
      case UIViewEventType.FOCUS_LOST:
        {
          const viewTag = event.view ? this.getHitTag(event.view) : undefined;
          const targetTag = event.args.target ? this.getHitTag(event.args.target) : undefined;
          const payload = {
            target: targetTag,
            source: event.args.source,
          };
          if (viewTag) {
            // Dispatch exit event
            this.callFunction('RCTEventEmitter', 'receiveEvent', [viewTag, 'topExit', payload]);
          }
        }
        break;
      case UIViewEventType.FOCUS_GAINED:
        {
          const viewTag = event.view ? this.getHitTag(event.view) : undefined;
          const targetTag = event.args.target ? this.getHitTag(event.args.target) : undefined;
          const payload = {
            target: targetTag,
            source: event.args.source,
          };
          if (viewTag) {
            // Dispatch enter event
            this.callFunction('RCTEventEmitter', 'receiveEvent', [viewTag, 'topEnter', payload]);
          }
        }
        break;
      default:
        break;
    }
  }

  /**
   * frame update, services the modules and views
   * must be called regularly to ensure the messages from the WebWorker are distributed
   * @param camera - three.js camera used to view the scene
   * @param rootTag - the React Tag for the root of the scene
   */
  frame(camera: Camera, rootTag?: number) {
    const frameStart = window.performance ? performance.now() : Date.now();
    this.Timing && this.Timing.frame(frameStart);
    // Send current cursor position if the currently-hit view is listening
    if (this.lastHit && this.lastHit.owner && this.lastHit.owner.receivesMoveEvent) {
      const intersect = this.guiSys.getLastLocalIntersect();
      if (!intersect) {
        this.lastLocalIntersect = null;
      }
      if (intersect) {
        const lastLocalIntersect = this.lastLocalIntersect;
        if (
          !lastLocalIntersect ||
          Math.abs(intersect[0] - lastLocalIntersect[0]) > ONMOVE_EPSILON ||
          Math.abs(intersect[1] - lastLocalIntersect[1]) > ONMOVE_EPSILON
        ) {
          const viewTag = this.getHitTag(this.lastHit);
          const payload = {offset: intersect};
          this.callFunction('RCTEventEmitter', 'receiveEvent', [viewTag, 'topMove', payload]);
          this.lastLocalIntersect = intersect;
        }
      }
    }
    this.executor.flush();
    let msg = this.executor.poll();
    while (msg) {
      if (msg.cmd === 'exec') {
        const results = msg.results;
        if (results && results.length >= 3) {
          const moduleIndex = results[0];
          const funcIndex = results[1];
          const params = results[2];
          for (let i = 0; i < moduleIndex.length; i++) {
            this.modules[moduleIndex[i]].__functionMap[funcIndex[i]].apply(
              this.modules[moduleIndex[i]],
              params[i]
            );
          }
        }
      }
      msg = this.executor.poll();
    }

    this.UIManager && this.UIManager.frame(frameStart);
    this.HeadModel && this.HeadModel.frame(camera);
    this.VideoModule && this.VideoModule.frame();
    this.AudioModule && this.AudioModule.frame(camera);
    this.TextureManager.frame();

    if (rootTag) {
      this._applySceneTransform(camera, rootTag);
    }

    // Last, check if there is any remaining frame time, and use it to run idle
    // callbacks
    this.Timing && this.Timing.idle(frameStart);
  }

  /**
   * Updates the camera parent with current <Scene> transform, if any.
   * Do nothing if there is no <Scene>, the <Scene> has no transform property,
   * or the camera already has a parent object.
   **/
  _applySceneTransform(camera: Camera, rootTag: number) {
    const worldMatrix = this.UIManager.getSceneCameraTransform(rootTag);
    const cameraParent = this._cameraParentFromTag[rootTag];

    // worldMatrix is null if no <Scene> or <Scene> has no transform property.
    // We may have set cameraParentFromTag[rootTag] to null (and printed a
    // console warning) if there was a <Scene> transform but the camera already
    // had a parent. Return immediately in both cases.
    if (!worldMatrix || !cameraParent) {
      return;
    }

    // Don't overwrite a parent object that isn't ours.
    if (camera.parent && camera.parent.uuid !== cameraParent.uuid) {
      console.warn(
        'Camera object already has a parent; ' +
          "Use of 'transform' property on <Scene> will have no effect."
      );
      this._cameraParentFromTag[rootTag] = null;
      return;
    }

    // One-time initialization: parent the camera object under cameraParent.
    // We use a parent to avoid modifying the camera's local transform, which
    // is being updated with positional tracking data when available.
    if (cameraParent.children.length === 0) {
      cameraParent.add(camera);
    }

    // In Three.js, object.matrix and object.matrixWorld represent the local and
    // global transforms. When matrixAutoUpdate is enabled (which is the default)
    // both are recomputed each frame (in WebGLRenderer.render), matrix from the
    // object's position, rotation, and scale attributes and matrixWorld from the
    // parent hierarchy (if no parent, matrix and matrixWorld are identical).

    // We disable cameraParent.matrixAutoUpdate, since we update the matrix here
    // manually and we explicitly call updateMatrixWorld (which recomputes the
    // global transform of an object and its children).
    cameraParent.matrixAutoUpdate = false;
    cameraParent.matrix.fromArray(worldMatrix);
    cameraParent.updateMatrixWorld(true);
  }

  /**
   * getHitTag
   * @param hit - scene object
   * @returns the tag of the closest view with a tag or undefined if not found
   **/
  getHitTag(hitStart: ?UIView) {
    let hit = hitStart;
    while (hit) {
      if (hit.tag) {
        return hit.tag;
      }
      hit = hit.parent;
    }
    return undefined;
  }

  /**
   * calls a particular function within a react module
   * @param moduleName - module within the react bundle
   * @param functionName - name of the function
   * @param args - array of args passed to react bundle over webworker
   **/
  callFunction(moduleName: string, functionName: string, args: Array<any>) {
    this.executor.call(moduleName, functionName, args);
  }

  /**
   * calls a particular callback within a react module
   * @param id - callback specified by react
   * @param args - array of args passed to react bundle over webworker
   **/
  invokeCallback(id: number, args: Array<any>) {
    this.executor.invoke(id, args);
  }

  /**
   * registers a module for use by the context
   * must be specified prior to calling init
   * @param module - instance of a module to register, extends Module
   **/
  registerModule(module: Module) {
    this.modules.push(module);
  }

  registerTextureSource(name: string, source: Element, options: {[key: string]: any} = {}) {
    this.TextureManager.registerLocalTextureSource(name, source, options);
  }

  /**
   * get a view from certain tag
   */
  getViewForTag(reactTag: number) {
    return this.UIManager.getViewForTag(reactTag);
  }
}
