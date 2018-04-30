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
import type UIView from '../OVRUI/UIView/UIView';
import ObjModelLoader from '../Loaders/ObjModelLoader';
import GLTF2ModelLoader from '../Loaders/GLTF2ModelLoader';

export interface MeshInstance {
  // returns false if instance can't be updated and instances needs to be recreated
  update(definition: any): boolean,

  // already established apis
  setLit(value: boolean): void,
  setTexture(value: string): void,
  setWireframe(value: boolean): void,

  frame(timeStamp: number, deltaTime: number): void,

  // todo
  // support for animation
  //getJointCount(): number;
  //setJoints(joints: Array<THREE.Matrix4>): void;
  //setChannelData(channel: string, value: any): void;
  //findObjectJoint(name: string): number|null;

  // will dispose of all internally allocated structure
  dispose(): void,
}

export interface ModelLoader {
  // returns true if the loader can create an instance from this definition
  canLoad(definition: any): boolean;

  // create the instance
  createInstance(
    definition: any,
    parent: UIView,
    litMaterial: THREE.Material,
    unlitMaterial: THREE.Material,
  ): MeshInstance | null;
}

const modelLoaders: Array<ModelLoader> = [];

export function registerModelLoader(modelLoader: ModelLoader): void {
  modelLoaders.push(modelLoader);
}

export function createModelInstance(
  modelDefinition: any,
  parent: UIView,
  litMaterial: THREE.Material,
  unlitMaterial: THREE.Material,
): MeshInstance | null {
  if (!modelLoaders) {
    return null;
  }
  for (let index = 0; index < modelLoaders.length; index++) {
    if (modelLoaders[index].canLoad(modelDefinition)) {
      return modelLoaders[index].createInstance(
        modelDefinition,
        parent,
        litMaterial,
        unlitMaterial,
      );
    }
  }
  return null;
}
// register the default obj loader
registerModelLoader(new GLTF2ModelLoader());
registerModelLoader(new ObjModelLoader());
