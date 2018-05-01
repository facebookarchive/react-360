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
import type {Material} from 'three';
import GLTF2Loader from 'three-gltf2-loader';
import extractURL from '../Utils/extractURL';
import type UIView from '../OVRUI/UIView/UIView';

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

const gltfStateCache: RefCountCache<any> = new RefCountCache((url, entry) => {
  recursiveDispose(entry.scene);
});
const loadList = {};

class GLTF2MeshInstance {
  url: string;
  parent: any;
  scene: any;
  mixer: any;
  timeStamp: number;
  activeAnimations: any;
  allAnimations: any;

  constructor(definition: any, parent: UIView) {
    this.url = extractURL(definition.gltf2) || '';
    this.parent = parent;
    this.mixer = null;
    this.timeStamp = -1;
    this.activeAnimations = {};
    this.allAnimations = {};

    const onLoad = gltf => {
      if (gltfStateCache.has(this.url)) {
        gltfStateCache.addReference(this.url);
      } else {
        // disabling until gltf clone issue is resolved
        // https://github.com/mrdoob/three.js/issues/11573
        // gltfStateCache.addEntry(this.url, gltf);
      }
      // https://github.com/mrdoob/three.js/issues/11573
      // this.scene = gltf.scene.clone();
      this.scene = gltf.scene;

      this.mixer = new THREE.AnimationMixer(this.scene);

      // load the animations into the mixer
      const animations = gltf.animations;
      if (animations && animations.length) {
        for (let i = 0; i < animations.length; i++) {
          const animation = animations[i];
          this.allAnimations[animation.name] = this.mixer.clipAction(animation);
        }
      }

      // apply the definition animation settings
      this.updateAnimation(definition);

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
    // loadList[this.url] = [onLoad];

    // $FlowFixMe
    const loader = new THREE.GLTFLoader();
    loader.load(
      this.url,
      gltf => {
        onLoad(gltf);
        /* for (const callback of loadList[this.url]) {
          callback(gltf);
        }
        delete loadList[this.url]; */
      },
      () => {},
      () => {
        console.error('failed to load GLTF', this.url);
        delete loadList[this.url];
      },
    );
  }

  updateAnimation(definition: any): void {
    if (!definition.animations || definition.animations.length === 0) {
      if (this.mixer) {
        this.activeAnimations = {};
        this.mixer.stopAllAction();
      }
      return;
    }
    // stop any leftover animations
    const newActiveAnimations = {};
    for (const key in definition.animations) {
      const animName = `animation_${key}`;
      newActiveAnimations[animName] = true;
      // start animations which have yet to be started
      if (this.allAnimations[animName]) {
        const anim = this.allAnimations[animName];
        const params = definition.animations[key];
        if (params) {
          anim.fadeIn(params.fadeTime ? params.fadeTime : 0);
          anim.setEffectiveTimeScale(params.timeScale ? params.timeScale : 1);
          anim.setEffectiveWeight(params.weight ? params.weight : 1);
          if (params.syncWith && this.allAnimations[params.syncWith]) {
            anim.syncWith(this.allAnimations[params.syncWith]);
          }
        }

        if (!this.activeAnimations[animName]) {
          anim.play();
        }
      }
      delete this.activeAnimations[animName];
    }
    // stop any leftover animations
    for (const key in this.activeAnimations) {
      if (this.allAnimations[key]) {
        this.allAnimations[key].stop();
      }
    }
    this.activeAnimations = newActiveAnimations;
  }

  update(definition: any): boolean {
    // we can update some params without the need to reload the instance
    // if the url is the same let's assume the model hasn't changed
    const newUrl = extractURL(definition.gltf2) || '';
    if (newUrl !== this.url) {
      return false;
    }
    // apply animation changes
    this.updateAnimation(definition);
    return true;
  }

  frame(timeStampMS: number, deltaTimeMS: number): void {
    if (this.mixer) {
      this.mixer.update(deltaTimeMS * 0.001);
    }
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
    unlitMaterial: Material,
  ): GLTF2MeshInstance {
    return new GLTF2MeshInstance(definition, parent);
  }
}
