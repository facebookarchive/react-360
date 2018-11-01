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
import type { VideoStereoFormat } from '../Video/Types';
import type VideoPlayerManager from '../Video/VideoPlayerManager';
import StereoBasicTextureMaterial from './StereoBasicTextureMaterial';
import { HPanoBufferGeometry } from '../../Utils/HPano';
import type { TextureMetadata } from './Types';

export type PanoOptions = {
  format?: VideoStereoFormat,
  transition?: number,
};

/**
 * Promise-ify image loading, used as a backup when no TextureManager is used
 */
function loadImage(src: string): Promise<Image> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = function () {
      resolve(img);
    };
    img.onerror = function (err: any) {
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
  _videoPlayers: ?VideoPlayerManager;

  constructor(rm: ?ResourceManager<Image>, videoPlayers: ?VideoPlayerManager, options: object) {
    this._resourceManager = rm;
    this._videoPlayers = videoPlayers;
    this._options = options;
    // Objects for panorama management
    if (options.uv) {

      const {phiStart, phiLength, thetaStart, thetaLength} = options.uv;

      this._panoGeomSphere = new THREE.SphereGeometry(1000, 16, 16, 0,
      phiLength);
      this._panoGeomHemisphere = new THREE.SphereGeometry(
        1000,
        16,
        16,
        0,
        phiLength
      );
    } else {
      this._panoGeomHemisphere = new THREE.SphereGeometry(
        1000,
        16,
        16,
        0,
        Math.PI,
      );
      this._panoGeomSphere = new THREE.SphereGeometry(1000, 16, 16);
    }
    this._panoMaterial = new StereoBasicTextureMaterial({
      color: '#ffffff',
      side: THREE.DoubleSide,
    });
    this._panoMaterial.useUV = 0;
    this._panoMesh = new THREE.Mesh(this._panoGeomSphere, this._panoMaterial);
    this._panoMesh.visible = false;
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
    if (this._options.fov && this._options.fov.hfov * 1 === 180) {
      this._panoMaterial.uniforms.arcOffset.value = Math.PI / 2;
      this._panoMaterial.uniforms.arcLengthReciprocal.value = 1 / Math.PI;
    }
    this._panoMesh.needsUpdate = true;
  }

  _setHPanoGeometryToSphere() {
    this._panoEyeOffsets = [[0, 0, 1, 1]];
    this._panoMesh.geometry = this._hpanoGeomSphere;
    this._panoMesh.visible = true;
    this._panoMesh.material = this._panoMesh.geometry.material;
    this._panoMesh.needsUpdate = true;
    this._panoMaterial.needsUpdate = true;
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
    this._panoMesh.visible = true;
    this._panoMaterial.map = data.tex;
    const width = data.width;
    const height = data.height;
    if (width === height) {
      // 1:1 ratio, 180 mono or top/bottom 360 3D
      if (data.format === '3DTB') {
        // 360 top-bottom 3D
        this._panoEyeOffsets = [[0, 0, 1, 0.5], [0, 0.5, 1, 0.5]];
        this._setPanoGeometryToSphere();
      } else if (data.format === '3DBT') {
        // 360 top-bottom 3D
        this._panoEyeOffsets = [[0, 0.5, 1, 0.5], [0, 0, 1, 0.5]];
        this._setPanoGeometryToSphere();
      } else {
        // assume 180 mono
        this._panoEyeOffsets = [[0, 0, 1, 1]];
        this._setPanoGeometryToHemisphere();
      }
    } else if (width / 2 === height) {
      // 2:1 ratio, 360 mono or 180 3D
      if (data.format === '3DLR') {
        // 180 side-by-side 3D
        this._panoEyeOffsets = [[0, 0, 0.5, 1], [0.5, 0, 0.5, 1]];
        this._setPanoGeometryToHemisphere();
      } if (data.format === '3DTB') {
        this._panoEyeOffsets = [[0, 0.5, 1, 0.5], [0, 0, 1, 0.5]];
        this._setPanoGeometryToSphere();
      } else {
        // assume 360 mono
        this._panoEyeOffsets = [[0, 0, 1, 1]];
        this._setPanoGeometryToSphere();
      }
    } else {
      if (data.format === '3DTB') {
        this._panoEyeOffsets = [[0, 0.5, 1, 0.5], [0, 0, 1, 0.5]];
        this._setPanoGeometryToSphere();
      } else if (data.format === '3DBT') {
        this._panoEyeOffsets = [[0, 0.5, 1, 0.5], [0, 0, 1, 0.5]];
        this._setPanoGeometryToSphere();
      } else if (data.format === '3DLR') {
        // 180 side-by-side 3D
        this._panoEyeOffsets = [[0.5, 0, 0.5, 1],[0, 0, 0.5, 1]];
        this._setPanoGeometryToHemisphere();
      }
    }
    this._panoMaterial.needsUpdate = true;
  }

  getPanoNode(): THREE.Mesh {
    return this._panoMesh;
  }

  _setBackground(
    loader: ?Promise<TextureMetadata>,
    id: ?string,
    transitionTime: ?number,
  ): Promise<void> {
    const oldID = this._panoSource;
    this._panoSource = id;
    const duration = typeof transitionTime === 'number' ? transitionTime : 500;
    const transition = duration ? 1 / duration : 1;
    this._panoTransition = oldID ? -transition : 0;
    if (!loader) {
      this._panoLoad = null;
      return Promise.resolve();
    }
    this._panoLoad = loader;
    return loader.then(data => {
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

  globeOnUpdate(camera) {
    const projScreenMatrix = new THREE.Matrix4();
    const modelViewMatrix = new THREE.Matrix4();
    modelViewMatrix.multiplyMatrices(camera.matrixWorldInverse, this._panoMesh.matrixWorld);
    projScreenMatrix.multiplyMatrices(camera.projectionMatrix, modelViewMatrix);
    this._panoMesh.geometry.update(projScreenMatrix);
    this._panoMesh.material = this._panoMesh.geometry.material;
  }

  setSource(src: null | string | object, options: PanoOptions = {}): Promise<void> {
    if (this._resourceManager && this._panoSource) {
      this._resourceManager.removeReference(this._panoSource);
    }
    if (src && src.tile) {
      // use tile renderer
      this._panoMesh.geometry.dispose();
      this._panoMesh.scale.z = -1;
      this.maxDepth = src.maxDepth || 2;
      this._hpanoGeomSphere = new HPanoBufferGeometry(1000, this.maxDepth, src.tile, options.events);
      this._panoMesh.onUpdate = this.globeOnUpdate.bind(this);
      this._setHPanoGeometryToSphere();
      return Promise.resolve();
    }
    const loader = src ? this._loadImage(src, options) : null;
    return this._setBackground(loader, src, options.transition);
  }

  setVideoSource(handle: string, options: PanoOptions = {}) {
    const player = this._videoPlayers
      ? this._videoPlayers.getPlayer(handle)
      : null;
    const loader = player
      ? player.load().then(data => ({ ...data, src: handle }))
      : null;
    return this._setBackground(loader, handle, options.transition);
  }

  prepareForRender(eye: ?string) {
    if (eye === 'right' && this._panoEyeOffsets[1]) {
      this._panoMaterial.uniforms.stereoOffsetRepeat.value = this._panoEyeOffsets[1];
    } else {
      this._panoMaterial.uniforms.stereoOffsetRepeat.value = this._panoEyeOffsets[0];
    }
  }

  frame(delta: number, camera) {
    if (this._panoMesh.onUpdate && this._panoMesh.geometry.type === 'HPanoBufferGeometry') {
      this._panoMesh.onUpdate(camera);
    }
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
