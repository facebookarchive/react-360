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
import {type Camera, type Scene, type WebGLRenderer} from 'three';
import WebWorkerBridge from '../Bridge/WebWorkerBridge';
import Surface from '../Compositor/Surface';
import {type Quaternion, type Ray, type Vec3} from '../Controls/Types';
import {type InputEvent} from '../Controls/InputChannels/Types';
import {ReactNativeContext} from '../ReactNativeContext';

/**
 * Runtime wraps the majority of React VR logic. It sends event data to the
 * Executor, builds an in-memory realization of the React nodes, and tells
 * the Compositor how to render everything.
 */
export default class Runtime {
  bridge: WebWorkerBridge;
  context: ReactNativeContext;
  guiSys: GuiSys;

  constructor(scene: Scene, bundle: string) {
    this.bridge = new WebWorkerBridge({
      enableDevTools: false,
      enableHotReload: false,
    });
    this.guiSys = new GuiSys(scene, {});
    this.context = new ReactNativeContext(this.guiSys, this.bridge, {});
    this.context.init(bundle);
  }

  createRootView(name: string, initialProps: Object, surface: Surface) {
    this.guiSys.registerOffscreenRender(
      surface.getScene(),
      surface.getCamera(),
      surface.getRenderTarget(),
    );
    const tag = this.context.createRootView(
      name,
      initialProps,
      surface.getScene(),
      true,
    );
    return tag;
  }

  frame(camera: Camera, renderer: WebGLRenderer) {
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
