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

import {GuiSys} from 'ovrui';
import * as THREE from 'three';
import WebWorkerBridge from '../Bridge/WebWorkerBridge';
import Location from '../Compositor/Location';
import Surface from '../Compositor/Surface';
import {type Quaternion, type Ray, type Vec3} from '../Controls/Types';
import {type InputEvent} from '../Controls/InputChannels/Types';
import {ReactNativeContext} from '../ReactNativeContext';

type LocationNode = {
  location: Location,
  node: THREE.Object3D,
};

/**
 * Runtime wraps the majority of React VR logic. It sends event data to the
 * Executor, builds an in-memory realization of the React nodes, and tells
 * the Compositor how to render everything.
 */
export default class Runtime {
  _rootLocations: Array<LocationNode>;
  bridge: WebWorkerBridge;
  context: ReactNativeContext;
  guiSys: GuiSys;

  constructor(scene: THREE.Scene, bundle: string) {
    this._rootLocations = [];
    this.bridge = new WebWorkerBridge({
      enableDevTools: false,
      enableHotReload: false,
    });
    this.guiSys = new GuiSys(scene, {});
    this.context = new ReactNativeContext(this.guiSys, this.bridge, {});
    this.context.init(bundle);
  }

  createRootView(name: string, initialProps: Object, dest: Location | Surface) {
    if (dest instanceof Surface) {
      this.guiSys.registerOffscreenRender(
        dest.getScene(),
        dest.getCamera(),
        dest.getRenderTarget(),
      );
      const tag = this.context.createRootView(
        name,
        initialProps,
        dest.getScene(),
        true,
      );
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
    this.guiSys.frameRenderUpdates(camera);
    this.context.frame(camera);

    const offscreen = this.guiSys.getOffscreenRenders();
    for (const item in offscreen) {
      if (!offscreen.hasOwnProperty(item)) {
        continue;
      }
      const params = offscreen[item];
      const oldClearColor = renderer.getClearColor();
      const oldClearAlpha = renderer.getClearAlpha();
      const oldSort = renderer.sortObjects;
      const oldClipping = renderer.localClippingEnabled;
      renderer.localClippingEnabled = true;
      renderer.setClearColor('#000', 0);
      renderer.sortObjects = false;
      renderer.render(params.scene, params.camera, params.renderTarget, true);
      renderer.sortObjects = oldSort;
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
        node.quaternion.set(
          worldRotation[0],
          worldRotation[1],
          worldRotation[2],
          worldRotation[3],
        );
        location.clearDirtyFlag();
      }
    }
  }

  queueEvents(events: Array<InputEvent>) {
    for (let i = 0; i < events.length; i++) {
      this.guiSys.eventDispatcher.dispatchEvent({
        type: 'InputChannelEvent',
        args: events[i],
      });
    }
  }

  setRays(rays: Array<Ray>, cameraPosition: Vec3, cameraQuat: Quaternion) {
    if (rays.length > 0) {
      // TODO: Support multiple raycasters
      const ray = rays[0];
      // Temporary injection into GuiSys until it can be broken up into more
      // granular Runtime components
      this.guiSys._processRayData(
        cameraPosition,
        cameraQuat,
        ray.origin,
        ray.direction,
        ray.maxLength,
        ray.type,
        ray.drawsCursor,
      );
    }
  }
}
