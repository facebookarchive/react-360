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

import Reconciler from 'react-reconciler';
import * as HostConfig from './HostConfig';
import GLRoot from './GLRoot';
import CanvasRoot from './CanvasRoot';
import RenderTargetRoot from './RenderTargetRoot';

const Renderer = Reconciler(HostConfig);

export function render(element, container, callback) {
  if (!container.__rootContainer) {
    container.__rootContainer = Renderer.createContainer(container, false);
  }
  return Renderer.updateContainer(element, container.__rootContainer, null, callback);
}

Renderer.injectIntoDevTools({
  findFiberByHostInstance: Renderer.findHostInstance,
  bundleType: __DEV__ ? 1 : 0,
  version: '16.5.2',
  rendererPackageName: 'react-webgl',
});

export const Image = 'image';
export const Text = 'text';
export const Quad = 'quad';
export const View = 'quad';

export {CanvasRoot, GLRoot, RenderTargetRoot};
