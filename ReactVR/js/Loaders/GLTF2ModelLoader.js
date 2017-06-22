/*
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
import extractURL from '../Utils/extractURL';
import type {UIView} from 'ovrui';
import type {Material} from 'three';

// $FlowFixMe
import GLTF2Loader from 'three-gltf2-loader';
import fetchResource from '../Utils/fetchResource';
import RefCountCache from '../Utils/RefCountCache';

GLTF2Loader(THREE);

function recursiveDispose(node) {
  if (typeof node.dispose === 'function') {
    node.dispose();
  }
  if (node.geometry) {
    node.geometry.dispose();
  }
  if (node.material) {
    node.material.dispose();
  }
  for (const child of node.children) {
    recursiveDispose(child);
  }
}

const gltfStateCache: RefCountCache<any> = new RefCountCache(function(url, entry) {
  recursiveDispose(entry.scene);
});
const loadList = {};

class GLTF2MeshInstance {
  url: string;
  parent: any;
  scene: any;

  constructor(definition: any, parent: UIView) {
    this.url = extractURL(definition.gltf2) || '';
    this.parent = parent;

    const onLoad = gltf => {
      if (gltfStateCache.has(this.url)) {
        gltfStateCache.addReference(this.url);
      } else {
        // disabling until gltf clone issue is resolved
        // https://github.com/mrdoob/three.js/issues/11573
        //gltfStateCache.addEntry(this.url, gltf);
      }
      // https://github.com/mrdoob/three.js/issues/11573
      //this.scene = gltf.scene.clone();
      this.scene = gltf.scene;
      // need to wait a frame for other attributes to setup
      // FIXME
      requestAnimationFrame(() => {
        parent.add(this.scene);
      });
    };

    // file is ready and downloaded use the cache
    if (gltfStateCache.has(this.url)) {
      onLoad(gltfStateCache.get(this.url));
      return;
    }

    // if started to download append the callback
    if (loadList[this.url]) {
      loadList[this.url].push(onLoad);
      return;
    }

    // disabling as there a problems with cloning gltf models
    // https://github.com/mrdoob/three.js/issues/11573
    //loadList[this.url] = [onLoad];

    // $FlowFixMe
    const loader = new THREE.GLTF2Loader();
    loader.load(
      this.url,
      gltf => {
        onLoad(gltf);
        /*for (const callback of loadList[this.url]) {
          callback(gltf);
        }
        delete loadList[this.url];*/
      },
      () => {},
      () => {
        console.error('failed to load GLTF', this.url);
        delete loadList[this.url];
      }
    );
  }

  update(definition: any): boolean {
    return false;
  }

  // already established apis
  setLit(flag: boolean): void {
    if (__DEV__) {
      console.log('Lit mode is not supported for GLTF2 models');
    }
  }

  setTexture(value: string): void {
    if (__DEV__) {
      console.log('Texture mode is not supported for GLTF2 models');
    }
  }

  setWireframe(value: boolean): void {
    if (__DEV__) {
      console.log('Wireframe mode is not supported for GLTF2 models');
    }
  }

  dispose(): void {
    if (this.scene) {
      gltfStateCache.removeReference(this.url);
      this.parent.remove(this.scene);
      delete this.scene;
    }
  }
}

export default class GLTF2ModelLoader {
  // returns true if the loader can create an instance from this definition
  canLoad(definition: any): boolean {
    return definition && definition.hasOwnProperty('gltf2');
  }

  // create the instance
  createInstance(
    definition: any,
    parent: UIView,
    litMaterial: Material,
    unlitMaterial: Material
  ): GLTF2MeshInstance {
    return new GLTF2MeshInstance(definition, parent);
  }
}
