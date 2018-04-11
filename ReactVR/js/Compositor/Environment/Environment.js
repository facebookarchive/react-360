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
import type ResourceManager from '../../Utils/ResourceManager';
import StereoBasicTextureMaterial from './StereoBasicTextureMaterial';

export type PanoFormat = 'MONO' | 'TOP_BOTTOM' | 'LEFT_RIGHT';

export type PanoOptions = {
  format?: PanoFormat,
  transition?: number,
};

type TextureMetadata = {
  height: number,
  src: string,
  tex: THREE.Texture,
  width: number,
};

/**
 * Promise-ify image loading, used as a backup when no TextureManager is used
 */
function loadImage(src: string): Promise<Image> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = function() {
      resolve(img);
    };
    img.onerror = function(err: any) {
      reject(err);
    };

    img.src = src;
  });
}

/**
 * Stores the various pieces of global environment state, including cursor
 * position, background media playback, and panoramic background rendering.
 */
export default class Environment {
  _panoEyeOffsets: Array<[number, number, number, number]>;
  _panoGeomHemisphere: THREE.Geometry;
  _panoGeomSphere: THREE.Geometry;
  _panoLoad: ?Promise<TextureMetadata>;
  _panoMaterial: StereoBasicTextureMaterial;
  _panoMesh: THREE.Mesh;
  _panoSource: ?string;
  _panoTransition: number;
  _resourceManager: ?ResourceManager<Image>;

  constructor(rm: ?ResourceManager<Image>) {
    this._resourceManager = rm;
    // Objects for panorama management
    this._panoGeomSphere = new THREE.SphereGeometry(1000, 50, 50);
    this._panoGeomHemisphere = new THREE.SphereGeometry(
      1000,
      50,
      50,
      0,
      Math.PI,
    );
    this._panoMaterial = new StereoBasicTextureMaterial({
      color: '#000000',
      side: THREE.DoubleSide,
    });
    this._panoMaterial.useUV = 0;
    this._panoMesh = new THREE.Mesh(this._panoGeomSphere, this._panoMaterial);
    this._panoMesh.scale.set(-1, 1, 1);
    this._panoMesh.rotation.y = -Math.PI / 2;
    this._panoEyeOffsets = [[0, 0, 1, 1]];
    this._panoTransition = 0;
  }

  _setPanoGeometryToSphere() {
    this._panoMesh.geometry = this._panoGeomSphere;
    this._panoMesh.rotation.y = -Math.PI / 2;
    this._panoMaterial.uniforms.arcOffset.value = 0;
    this._panoMaterial.uniforms.arcLengthReciprocal.value = 1 / Math.PI / 2;
    this._panoMesh.needsUpdate = true;
  }

  _setPanoGeometryToHemisphere() {
    this._panoMesh.geometry = this._panoGeomHemisphere;
    this._panoMesh.rotation.y = Math.PI;
    this._panoMaterial.uniforms.arcOffset.value = Math.PI / 2;
    this._panoMaterial.uniforms.arcLengthReciprocal.value = 1 / Math.PI;
    this._panoMesh.needsUpdate = true;
  }

  _loadImage(src: string, options: PanoOptions): Promise<TextureMetadata> {
    if (this._resourceManager) {
      this._resourceManager.addReference(src);
    }
    return (this._resourceManager
      ? this._resourceManager.getResourceForURL(src)
      : loadImage(src)
    ).then(img => {
      const tex = new THREE.Texture(img);
      tex.minFilter = THREE.LinearFilter;
      tex.needsUpdate = true;
      return {
        src,
        tex,
        format: options.format,
        width: img.width,
        height: img.height,
      };
    });
  }

  _updateTexture(data: TextureMetadata) {
    if (data.src !== this._panoSource) {
      // a new image has started loading
      return;
    }
    this._panoMaterial.map = data.tex;
    const width = data.width;
    const height = data.height;
    if (width === height) {
      // 1:1 ratio, 180 mono or top/bottom 360 3D
      if (data.format === 'TOP_BOTTOM') {
        // 360 top-bottom 3D
        this._panoEyeOffsets = [[0, 0, 1, 0.5], [0, 0.5, 1, 0.5]];
        this._setPanoGeometryToSphere();
      } else {
        // assume 180 mono
        this._panoEyeOffsets = [[0, 0, 1, 1]];
        this._setPanoGeometryToHemisphere();
      }
    } else if (width / 2 === height) {
      // 2:1 ratio, 360 mono or 180 3D
      if (data.format === 'LEFT_RIGHT') {
        // 180 side-by-side 3D
        this._panoEyeOffsets = [[0, 0, 0.5, 1], [0.5, 0, 0.5, 1]];
        this._setPanoGeometryToHemisphere();
      } else {
        // assume 360 mono
        this._panoEyeOffsets = [[0, 0, 1, 1]];
        this._setPanoGeometryToSphere();
      }
    }
    this._panoMaterial.needsUpdate = true;
  }

  getPanoNode(): THREE.Mesh {
    return this._panoMesh;
  }

  setSource(src: null | string, options: PanoOptions = {}): Promise<void> {
    if (this._resourceManager && this._panoSource) {
      this._resourceManager.removeReference(this._panoSource);
    }
    const oldSrc = this._panoSource;
    this._panoSource = src;
    const duration =
      typeof options.transition === 'number' ? options.transition : 500;
    // If the duration is zero, set the transition to complete on the next frame
    const transition = duration ? 1 / duration : 1;
    this._panoTransition = oldSrc ? -transition : 0;
    if (!src) {
      this._panoLoad = null;
      return Promise.resolve();
    }
    this._panoLoad = this._loadImage(src, options);
    return this._panoLoad.then(data => {
      if (this._panoTransition === 0) {
        this._panoLoad = null;
        // Fade transition completed
        this._panoTransition = transition;
        return this._updateTexture(data);
      }
      // Fade is still in progress
      return Promise.resolve();
    });
  }

  prepareForRender(eye: ?string) {
    if (eye === 'right' && this._panoEyeOffsets[1]) {
      this._panoMaterial.uniforms.stereoOffsetRepeat.value = this._panoEyeOffsets[1];
    } else {
      this._panoMaterial.uniforms.stereoOffsetRepeat.value = this._panoEyeOffsets[0];
    }
  }

  frame(delta: number) {
    const transition = this._panoTransition;
    if (transition === 0) {
      return;
    }
    const step = transition * delta;
    const color = this._panoMaterial.color;
    const oldValue = color.r;
    let newValue = oldValue + step;
    if (newValue <= 0) {
      this._panoTransition = 0;
      newValue = 0;
    }
    if (newValue >= 1) {
      this._panoTransition = 0;
      newValue = 1;
    }
    color.setRGB(newValue, newValue, newValue);
    if (transition < 0 && this._panoTransition === 0 && this._panoLoad) {
      this._panoLoad.then(data => {
        this._panoTransition = -transition;
        this._updateTexture(data);
      });
    }
  }
}
