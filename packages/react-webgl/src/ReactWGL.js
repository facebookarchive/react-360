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
import Pressable from './Pressable.react';
import {Image, Text, Quad, View} from './Primitives';
import RenderTargetRoot from './RenderTargetRoot';
import StyleSheet from './StyleSheet/StyleSheet';
import Video from './Video.react';

const Renderer = Reconciler(HostConfig);

export function render(element, container, callback) {
  if (!container.__rootContainer) {
    container.__rootContainer = Renderer.createContainer(container, false);
  }
  return Renderer.updateContainer(element, container.__rootContainer, null, callback);
}

Renderer.injectIntoDevTools({
  findFiberByHostInstance: Renderer.findHostInstance,
  bundleType: self.__DEV__ ? 1 : 0,
  version: '16.8.6',
  rendererPackageName: 'react-webgl',
});

export {
  CanvasRoot,
  GLRoot,
  RenderTargetRoot,
  StyleSheet,
  Image,
  Text,
  Quad,
  Video,
  View,
  Pressable,
};
