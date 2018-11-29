/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule Environment
 * @flow
 */

import {EnvironmentModule} from 'NativeModules';
import processTransform from 'processTransform';

type Resource = string | {uri: string};

type RotateTransform = {rotateX: string} | {rotateY: string}
  | {rotateZ: string} | {rotate: string}

export type EnvironmentOptions = {
  format?: string,
  transition?: number,
  fadeLevel?: number,
  rotateTransform?: Array<RotateTransform>
};

export function clearBackground() {
  EnvironmentModule.loadScene({type: 'black'});
}

export function setBackgroundImage(
  url: Resource,
  options: EnvironmentOptions = {},
) {
  const scene: Object = {
    type: 'photo',
    url: typeof url === 'object' ? url.uri : url,
    stereo: options.format,
    rotateTransform: options.rotateTransform
        ? processTransform(options.rotateTransform)
        : undefined,
  };
  const transition: Object = {
    transition: options.transition,
    fadeLevel: options.fadeLevel,
  }
  EnvironmentModule.loadScene(scene, transition);
}

export function setBackgroundVideo(player: string, options: EnvironmentOptions = {}) {
  const scene = {
    type: 'video',
    player: player,
    rotateTransform: options.rotateTransform
        ? processTransform(options.rotateTransform)
        : undefined,
  };
  const transition: Object = {
    transition: options.transition,
    fadeLevel: options.fadeLevel,
  }
  EnvironmentModule.loadScene(scene, transition);
}

export function preloadBackgroundImage(url: Resource) {
  const scene: Object = {
    type: 'photo',
    url: typeof url === 'object' ? url.uri : url
  };
  EnvironmentModule.preloadScene(scene);
}

export function animateFade(fadeLevel: number, fadeTime: number) {
  EnvironmentModule.animateFade(fadeLevel, fadeTime);
}

export function setScreen(screenId: string, handle: ?string, surfaceId: string, x: number, y: number, width: number, height: number) {
  EnvironmentModule.setScreen({
    screenId: screenId,
    type: 'surface',
    surface: surfaceId,
    player: handle,
    x: x,
    y: y,
    width: width,
    height: height,
  });
}
