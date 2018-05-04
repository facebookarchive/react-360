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

type Resource = string | {uri: string};

export type EnvironmentImageOptions = {
  format?: string,
};

export function clearBackground() {
  EnvironmentModule.loadScene({type: 'black'});
}

export function setBackgroundImage(
  url: Resource,
  options: EnvironmentImageOptions = {},
) {
  const scene: Object = {
    type: 'photo',
    url: typeof url === 'object' ? url.uri : url,
    stereo: options.format,
  };
  EnvironmentModule.loadScene(scene);
}

export function setBackgroundVideo(player: string) {
  const scene = {type: 'video', player};
  EnvironmentModule.loadScene(scene);
}
