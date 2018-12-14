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

type LocationNode = {
  tag: number,
  location: Location,
  node: THREE.Object3D,
};

type SurfaceNode = {
  tag: number,
  offscreenRenderUID: number,
  surface: Surface,
  name: string,
};

export type NativeModuleInitializer = ReactNativeContext => Module;

export type RuntimeOptions = {
  assetRoot?: string,
  customViews?: Array<CustomView>,
  executor?: ReactExecutor,
  nativeModules?: Array<Module | NativeModuleInitializer>,
};

const raycaster = new THREE.Raycaster();
function intersectObject(object: Object, ray: THREE.Raycaster, intersects: Array<Object>) {
  if (object.visible === false || object.raycastDisabled === true) {
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
  _rootLocations: {[tag: string]: LocationNode};
  _rootSurfaces: {[tag: string]: SurfaceNode};
  _scene: THREE.Scene;
  context: ReactNativeContext;
  executor: ReactExecutor;
  guiSys: GuiSys;

  constructor(scene: THREE.Scene, bundle: string, options: RuntimeOptions = {}) {
    this._rootLocations = {};
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

    this.guiSys = new GuiSys(scene, {});
    this.context = new ReactNativeContext(this.guiSys, this.executor, {
      assetRoot: options.assetRoot,
      customViews: options.customViews || [],
      enableHotReload,
    });
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

  createRootView(
    name: string,
    initialProps: Object,
    dest: Location | Surface,
    surfaceName?: string
  ) {
    if (dest instanceof Surface) {
      const context = this.context;
      const offscreenRenderUID = this.guiSys.registerOffscreenRender(
        dest.getScene(),
        dest.getCamera(),
        dest.getRenderTarget()
      );
      const tag = context.createRootView(name, initialProps, dest.getScene(), true);
      const rootView = context.getViewForTag(tag);
      if (rootView) {
        rootView.surfaceName = surfaceName;
      }
      this._rootSurfaces[String(tag)] = {
        tag: tag,
        offscreenRenderUID: offscreenRenderUID,
        surface: dest,
        name: surfaceName || '',
      };
      return tag;
    } else if (dest instanceof Location) {
      const node = new THREE.Object3D();
      node.position.fromArray(dest.worldPosition);
      node.quaternion.fromArray(dest.worldRotation);
      this.guiSys.root.add(node);
      const tag = this.context.createRootView(name, initialProps, (node: any));
      this._rootLocations[String(tag)] = {
        tag: tag,
        location: dest,
        node: node,
      };
      return tag;
    }
    throw new Error('Invalid mount point');
  }

  getSurfaceInfo(tag: number): ?SurfaceNode {
    const key = String(tag);
    if (this._rootSurfaces[key]) {
      return this._rootSurfaces[key];
    }
    return null;
  }

  destroyRootView(tag: number) {
    const key = String(tag);
    if (this._rootSurfaces[key]) {
      this.context.destroyRootView(tag);
      this.guiSys.unregisterOffscreenRender(this._rootSurfaces[key].offscreenRenderUID);
      delete this._rootSurfaces[key];
      return;
    }
    if (this._rootLocations[key]) {
      this.context.destroyRootView(tag);
      delete this._rootLocations[key];
      return;
    }
  }

  frame(camera: THREE.Camera, renderer: THREE.WebGLRenderer) {
    const context = this.context;
    let offscreen = {};
    this.guiSys.frameRenderUpdates(camera);
    offscreen = this.guiSys.getOffscreenRenders();
    context.frame(camera);

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
    for (const key in this._rootLocations) {
      const {location, node} = this._rootLocations[key];
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
      let notHit = false;
      if (hit.uv && hit.object && hit.object.subScene) {
        hitSurface = true;
        const distanceToSubscene = hit.distance;
        const scene = hit.object.subScene;
        const x = hit.uv.x * scene._rttWidth;
        const y = (1 - hit.uv.y) * scene._rttHeight;
        const surfaceHit = this.surfaceRaycast(scene, x, y);
        if (surfaceHit) {
          hit = surfaceHit;
          hit.distance = distanceToSubscene;
        } else {
          notHit = true;
        }
      }
      if (!notHit && !firstHit && !hit.isAlmostHit) {
        firstHit = hit;
      }
    }
    this.setIntersection(firstHit, ray, hitSurface);
  }

  surfaceRaycast(scene: THREE.Scene, x: number, y: number) {
    raycaster.ray.origin.set(x, y, 0.1);
    raycaster.ray.direction.set(0, 0, -1);
    surfaceHits.length = 0;
    intersectObject(scene, raycaster, surfaceHits);
    if (surfaceHits.length === 0) {
      return null;
    }
    for (let i = surfaceHits.length - 1; i >= 0; i--) {
      const hit = surfaceHits[i];
      if (hit.object && typeof hit.object.shouldAcceptHitEvent === 'function') {
        if (!hit.object.shouldAcceptHitEvent()) {
          continue;
        }
      }
      return hit;
    }
  }

  setIntersection(hit: ?Object, ray: Ray, onSurface?: boolean) {
    this._cursorIntersectsSurface = !!onSurface;
    if (!this.guiSys) {
      return;
    }
    if (hit) {
      this.guiSys.updateLastHit(hit.object, ray.type);
      if (hit.object.shouldAcceptHitEvent && hit.object.shouldAcceptHitEvent()) {
        this.guiSys.setLastLocalIntersect(hit.uv.x, hit.uv.y);
      }
      this.guiSys._cursor.intersectDistance = hit.distance;
    } else {
      this.guiSys.updateLastHit(null, ray.type);
    }
    this.guiSys.setCursorProperties(ray.origin.slice(), ray.direction.slice(), ray.drawsCursor);
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
    return this.guiSys._cursor.intersectDistance;
  }
}
