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
import Location from '../Compositor/Location';
import Surface from '../Compositor/Surface';
import type ReactExecutor from '../Executor/ReactExecutor';
import ReactExecutorWebWorker from '../Executor/ReactExecutorWebWorker';
import {type Quaternion, type Ray, type Vec3} from '../Controls/Types';
import {type InputEvent} from '../Controls/InputChannels/Types';
import type Module from '../Modules/Module';
import type {CustomView} from '../Modules/UIManager';
import GuiSys from '../OVRUI/UIView/GuiSys';
import {ReactNativeContext} from '../ReactNativeContext';
import {type TextImplementation} from 'webgl-ui';
import ReactContext from './ReactContext';
import SurfaceRuntime from './SurfaceRuntime';

type LocationNode = {
  location: Location,
  node: THREE.Object3D,
};

type SurfaceNode = {
  camera: THREE.Camera,
  renderTarget: THREE.WebGLRenderTarget,
  scene: THREE.Scene,
};

export type NativeModuleInitializer = ReactNativeContext => Module;

export type RuntimeOptions = {
  assetRoot?: string,
  customViews?: Array<CustomView>,
  executor?: ReactExecutor,
  nativeModules?: Array<Module | NativeModuleInitializer>,
  textImplementation?: TextImplementation,
  useNewViews?: boolean,
};

const raycaster = new THREE.Raycaster();
function intersectObject(object: Object, ray: THREE.Raycaster, intersects: Array<Object>) {
  if (object.visible === false) {
    return;
  }
  object.raycast(ray, intersects);
  const children = object.children;
  for (let i = 0, l = children.length; i < l; i++) {
    intersectObject(children[i], ray, intersects);
  }
}
const surfaceHits = [];

const DEVTOOLS_FLAG = /\bdevtools\b/;
const HOTRELOAD_FLAG = /\bhotreload\b/;
const SURFACE_DEPTH = 4; // 4 meters

/**
 * Runtime wraps the majority of React VR logic. It sends event data to the
 * Executor, builds an in-memory realization of the React nodes, and tells
 * the Compositor how to render everything.
 */
export default class Runtime {
  _cursorIntersectsSurface: boolean;
  _initialized: boolean;
  _lastHit: ?number;
  _offscreenRenderUID: number;
  _rootLocations: Array<LocationNode>;
  _rootSurfaces: {[id: string]: SurfaceNode};
  _scene: THREE.Scene;
  context: ReactContext | ReactNativeContext;
  executor: ReactExecutor;
  guiSys: GuiSys;
  surfaceRuntime: SurfaceRuntime;

  constructor(scene: THREE.Scene, bundle: string, options: RuntimeOptions = {}) {
    this._rootLocations = [];
    this._rootSurfaces = {};
    this._scene = scene;
    this._cursorIntersectsSurface = false;
    this._lastHit = null;
    this._offscreenRenderUID = 0;
    let enableDevTools = false;
    let bundleURL = bundle;
    let enableHotReload = false;
    if (__DEV__) {
      if (DEVTOOLS_FLAG.test(location.search)) {
        enableDevTools = true;
        if (window.__REACT_DEVTOOLS_GLOBAL_HOOK__) {
          /* eslint-disable no-console */
          console.log(
            'We detected that you have the React Devtools extension installed. ' +
              'Please note that at this time, React VR is only compatible with the ' +
              'standalone Inspector (npm run devtools).'
          );
          /* eslint-enable no-console */
        }
      }
      if (HOTRELOAD_FLAG.test(location.search)) {
        enableHotReload = true;
        if (bundleURL.indexOf('?') > -1) {
          bundleURL += '&hot=true';
        } else {
          bundleURL += '?hot=true';
        }
      }
    }
    this.executor =
      options.executor ||
      new ReactExecutorWebWorker({
        enableDevTools,
      });

    if (options.useNewViews) {
      this.context = new ReactContext(this.executor, {
        assetRoot: options.assetRoot,
        textImplementation: options.textImplementation,
      });
      this.surfaceRuntime = new SurfaceRuntime(this.context);
    } else {
      this.guiSys = new GuiSys(scene, {});
      this.context = new ReactNativeContext(this.guiSys, this.executor, {
        assetRoot: options.assetRoot,
        customViews: options.customViews || [],
        enableHotReload,
        useNewViews: options.useNewViews,
      });
    }
    const modules = options.nativeModules;
    if (modules) {
      for (let i = 0; i < modules.length; i++) {
        const m = modules[i];
        if (typeof m === 'function') {
          // module initializer
          this.context.registerModule(m((this.context: any)));
        } else {
          this.context.registerModule(m);
        }
      }
    }
    this.context.init(bundleURL);
  }

  createRootView(name: string, initialProps: Object, dest: Location | Surface) {
    if (dest instanceof Surface) {
      const context = this.context;
      if (context instanceof ReactContext) {
        const tag = this.surfaceRuntime.createRootView(name, initialProps, dest.getScene());
        const uid = this._offscreenRenderUID++;
        this._rootSurfaces[String(uid)] = {
          scene: dest.getScene(),
          camera: dest.getCamera(),
          renderTarget: dest.getRenderTarget(),
        };
        dest.rootTag = tag;
        return tag;
      }
      // legacy ReactNativeContext
      this.guiSys.registerOffscreenRender(
        dest.getScene(),
        dest.getCamera(),
        dest.getRenderTarget()
      );
      const tag = context.createRootView(name, initialProps, dest.getScene(), true);
      return tag;
    } else if (dest instanceof Location) {
      const node = new THREE.Object3D();
      node.position.fromArray(dest.worldPosition);
      node.quaternion.fromArray(dest.worldRotation);
      this.guiSys.root.add(node);
      this._rootLocations.push({
        location: dest,
        node: node,
      });
      const tag = this.context.createRootView(name, initialProps, (node: any));
      return tag;
    }
    throw new Error('Invalid mount point');
  }

  frame(camera: THREE.Camera, renderer: THREE.WebGLRenderer) {
    const context = this.context;
    let offscreen = {};
    if (context instanceof ReactContext) {
      offscreen = this._rootSurfaces;
      context.frame();
    } else {
      this.guiSys.frameRenderUpdates(camera);
      offscreen = this.guiSys.getOffscreenRenders();
      context.frame(camera);
    }

    for (const item in offscreen) {
      const params = offscreen[item];
      if (!params) {
        continue;
      }
      const oldClearColor = renderer.getClearColor();
      const oldClearAlpha = renderer.getClearAlpha();
      const oldClipping = renderer.localClippingEnabled;
      renderer.localClippingEnabled = true;
      renderer.setClearColor('#000', 0);
      renderer.render(params.scene, params.camera, params.renderTarget, true);
      renderer.setClearColor(oldClearColor, oldClearAlpha);
      renderer.setRenderTarget(null);
      renderer.localClippingEnabled = oldClipping;
    }
    for (let i = 0; i < this._rootLocations.length; i++) {
      const {location, node} = this._rootLocations[i];
      if (location.isDirty()) {
        const worldPosition = location.worldPosition;
        node.position.set(worldPosition[0], worldPosition[1], worldPosition[2]);
        const worldRotation = location.worldRotation;
        node.quaternion.set(worldRotation[0], worldRotation[1], worldRotation[2], worldRotation[3]);
        location.clearDirtyFlag();
      }
    }
  }

  queueEvents(events: Array<InputEvent>) {
    if (this.guiSys) {
      for (let i = 0; i < events.length; i++) {
        this.guiSys.eventDispatcher.dispatchEvent({
          type: 'InputChannelEvent',
          args: events[i],
        });
      }
    } else if (this._lastHit != null) {
      for (let i = 0; i < events.length; i++) {
        this.context.callFunction('RCTEventEmitter', 'receiveEvent', [
          this._lastHit,
          'topInput',
          {
            inputEvent: events[i],
            target: this._lastHit,
            source: this._lastHit,
          },
        ]);
      }
    }
  }

  setRays(rays: Array<Ray>, cameraPosition: Vec3, cameraQuat: Quaternion) {
    if (rays.length < 1) {
      if (this.guiSys) {
        this.guiSys.updateLastHit(null, '');
      }
      this._lastHit = null;
      return;
    }
    // TODO: Support multiple raycasters
    const ray = rays[0];
    const root = this.guiSys ? this.guiSys.root : this._scene;

    // This will get replaced with the trig-based raycaster for surfaces
    let firstHit = null;
    raycaster.ray.origin.fromArray(ray.origin);
    raycaster.ray.direction.fromArray(ray.direction);
    const hits = raycaster.intersectObject(root, true);
    let hitSurface = false;
    for (let i = 0; i < hits.length; i++) {
      let hit = hits[i];
      if (hit.uv && hit.object && hit.object.subScene) {
        hitSurface = true;
        const surface = hit.object.owner;
        const distanceToSubscene = hit.distance;
        const scene = hit.object.subScene;
        const x = hit.uv.x * scene._rttWidth;
        const y = (1 - hit.uv.y) * scene._rttHeight;
        if (surface && this.surfaceRuntime) {
          const surfaceHit = this.surfaceRuntime.getHitTag(surface.rootTag, x, y);
          this.setHitTarget(surfaceHit);
          return;
        }
        const surfaceHit = this.surfaceRaycast(scene, x, y);
        if (surfaceHit) {
          hit = surfaceHit;
          hit.distance = distanceToSubscene;
        }
      }
      if (!firstHit && !hit.isAlmostHit) {
        firstHit = hit;
      }
    }
    this.setIntersection(firstHit, ray, hitSurface);
    if (!hitSurface) {
      this.setHitTarget(null);
    }
  }

  surfaceRaycast(scene: THREE.Scene, x: number, y: number) {
    raycaster.ray.origin.set(x, y, 0.1);
    raycaster.ray.direction.set(0, 0, -1);
    surfaceHits.length = 0;
    intersectObject(scene, raycaster, surfaceHits);
    if (surfaceHits.length === 0) {
      return null;
    }
    return surfaceHits[surfaceHits.length - 1];
  }

  setIntersection(hit: ?Object, ray: Ray, onSurface?: boolean) {
    this._cursorIntersectsSurface = !!onSurface;
    if (!this.guiSys) {
      return;
    }
    if (hit) {
      this.guiSys.updateLastHit(hit.object, ray.type);
      this.guiSys._cursor.intersectDistance = hit.distance;
    } else {
      this.guiSys.updateLastHit(null, ray.type);
    }
    this.guiSys.setCursorProperties(ray.origin.slice(), ray.direction.slice(), ray.drawsCursor);
  }

  setHitTarget(tag: ?number) {
    if (tag === this._lastHit) {
      return;
    }
    const context = this.context;
    if (!(context instanceof ReactContext)) {
      return;
    }
    // fire hit changed
    if (this._lastHit) {
      // Fire focus lost event
      context.enqueueOnExit(this._lastHit);
    }
    if (tag != null) {
      // Fire focus gained event
      context.enqueueOnEnter(tag);
    }
    this._lastHit = tag;
  }

  set2DRays(rays: Array<Ray>, surface: Surface) {
    if (rays.length < 1) {
      this.guiSys.updateLastHit(null, '');
      return;
    }
    const ray = rays[0];
    const hit = this.surfaceRaycast(surface.getScene(), ray.origin[0], ray.origin[1]);
    this.setIntersection(hit, ray, true);
  }

  isMouseCursorActive(): boolean {
    if (!this.guiSys) {
      return false;
    }
    return this.guiSys.mouseCursorActive;
  }

  isCursorActive(): boolean {
    if (this._cursorIntersectsSurface) {
      return true;
    }
    if (!this.guiSys) {
      return false;
    }
    const lastHit = this.guiSys._cursor.lastHit;
    const lastAlmostHit = this.guiSys._cursor.lastAlmostHit;
    let active = lastHit && lastHit.isInteractable;
    if (!active) {
      active = lastAlmostHit && lastAlmostHit.isInteractable;
    }
    return !!active;
  }

  getCursorDepth(): number {
    // Will derive from React components
    if (this._cursorIntersectsSurface) {
      return SURFACE_DEPTH;
    }
    return this.guiSys._cursor.intersectDistance;
  }
}
