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

import type ReactExecutor from '../Executor/ReactExecutor';
import type Module from '../Modules/Module';
import type RenderRoot from '../Renderer/RenderRoot';

import DeviceInfo from '../Modules/DeviceInfo';
import Timing from '../Modules/Timing';
import {type TextImplementation, TextureManager} from 'webgl-ui';
import UIManager from './UIManager';

type ContextOptions = {
  assetRoot?: string,
  textImplementation?: TextImplementation,
};
type Message = [Array<number>, Array<number>, Array<number>];

/**
 * ReactContext handles interop between the renderer and the React application
 */
export default class ReactContext {
  executor: ReactExecutor;
  messages: Array<Message>;
  modules: Array<Module>;
  TextureManager: TextureManager;
  Timing: Timing;
  UIManager: UIManager;

  constructor(executor: ReactExecutor, options: ContextOptions = {}) {
    this.messages = [];
    this.modules = [];
    this.executor = executor;

    this.UIManager = new UIManager(this, options.textImplementation);
    this.TextureManager = new TextureManager();
    this.Timing = new Timing((this: any));

    this.registerModule(this.UIManager);
    this.registerModule(this.Timing);
    this.registerModule(new DeviceInfo());
  }

  init(bundle: string) {
    this.executor.moduleConfig(this.describe());
    this.executor.exec(bundle);
  }

  createRootView(
    module: string,
    renderRoot: RenderRoot,
    props: {[prop: string]: any} = {}
  ): number {
    const tag = this.UIManager.createRootTag();
    this.executor.call('AppRegistry', 'runApplication', [
      module,
      {initialProps: props, rootTag: tag},
    ]);
    this.UIManager.createRootView(tag, renderRoot);
    return tag;
  }

  describe() {
    const moduleConfig = [];
    for (const module of this.modules) {
      const description = module.__describe();
      moduleConfig.push(description);
    }
    return moduleConfig;
  }

  frame() {
    const frameStart = window.performance ? performance.now() : Date.now();
    this.Timing.frame(frameStart);
    this.executor.flush();
    let msg = this.executor.poll();
    while (msg) {
      if (msg.cmd === 'exec') {
        const results = msg.results;
        if (results && results.length >= 3) {
          const [moduleIndex, funcIndex, params] = results;
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

    this.UIManager.frame();
    this.Timing.idle(frameStart);
  }

  callFunction(moduleName: string, functionName: string, args: Array<any>) {
    this.executor.call(moduleName, functionName, args);
  }

  invokeCallback(id: number, args: Array<any>) {
    this.executor.invoke(id, args);
  }

  registerModule(module: Module) {
    this.modules.push(module);
  }

  registerTextureSource(name: string, source: Element) {
    this.TextureManager.registerLocalTextureSource(name, source);
  }

  enqueueOnEnter(tag: number) {
    this.callFunction('RCTEventEmitter', 'receiveEvent', [tag, 'topEnter', {target: tag}]);
  }

  enqueueOnExit(tag: number) {
    this.callFunction('RCTEventEmitter', 'receiveEvent', [tag, 'topExit', {target: tag}]);
  }
}
