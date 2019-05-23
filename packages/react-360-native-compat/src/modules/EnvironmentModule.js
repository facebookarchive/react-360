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

import type {Environment} from 'react-360-next';

type SceneDef =
  | {type: 'black'}
  | {type: 'photo', stereo: string, rotate?: number, url: string}
  | {type: 'video'};

type SceneTransition = {
  transition: number,
  fadeLevel: number,
};

export default class EnvironmentModule {
  _env: Environment;

  constructor(container: any) {
    this._env = container.environment;
  }

  loadScene(scene: SceneDef, transition: SceneTransition) {
    transition = transition || {};
    if (scene.type === 'black') {
      this._env.setSource(null);
      return;
    }
    if (scene.type === 'photo') {
      this._env.setSource(scene.url, {
        format: scene.stereo,
        transition: transition.transition,
        fadeLevel: transition.fadeLevel,
      });
      this._env.setRotation('rotate' in scene ? scene.rotate : 0);
      return;
    }
    if (scene.type === 'video') {
      // not yet supported
    }
  }
}
