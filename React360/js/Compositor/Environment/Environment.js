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
import type {VideoStereoFormat} from '../Video/Types';
import type VideoPlayerManager from '../Video/VideoPlayerManager';
import type SurfaceManager from '../SurfaceManager';
import StereoBasicTextureMaterial from './StereoBasicTextureMaterial';
import CubemapGeometry from './CubemapGeometry';
import {panoEyeOffsetsForStereoFormat} from './EnvironmentUtils';
import type {TextureMetadata} from './Types';
import Fader from '../../Utils/Fader';
import Screen from './Screen';

export type PanoOptions = {
  format?: VideoStereoFormat,
  transition?: number,
  fadeLevel?: number,
  rotateTransform?: Array<number>,
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
  _panoGeomCube: THREE.Geometry;
  _panoLoad: ?Promise<TextureMetadata>;
  _panoMaterial: StereoBasicTextureMaterial;
  _panoMesh: THREE.Mesh;
  _panoMeshQuat: THREE.Quaternion;
  _panoSource: ?string;
  _panoFade: Fader;
  _resourceManager: ?ResourceManager<Image>;
  _videoPlayers: ?VideoPlayerManager;
  _surfaceManager: SurfaceManager;
  _screens: {[id: string]: ?Screen};

  constructor(
    rm: ?ResourceManager<Image>,
    videoPlayers: ?VideoPlayerManager,
    surfaceManager: SurfaceManager
  ) {
    this._resourceManager = rm;
    this._videoPlayers = videoPlayers;
    this._surfaceManager = surfaceManager;
    // Objects for panorama management
    this._panoGeomSphere = new THREE.SphereGeometry(1000, 16, 16);
    this._panoGeomHemisphere = new THREE.SphereGeometry(1000, 16, 16, 0, Math.PI);
    this._panoGeomCube = new CubemapGeometry(1000, 1, 6, 1.001);
    this._panoMaterial = new StereoBasicTextureMaterial({
      color: '#000000',
      side: THREE.DoubleSide,
    });
    this._panoMaterial.useUV = 0;
    this._panoMeshQuat = new THREE.Quaternion();
    this._panoMesh = new THREE.Mesh(this._panoGeomSphere, this._panoMaterial);
    this._panoMesh.visible = false;
    this._panoMesh.scale.set(-1, 1, 1);
    this._applyPanoRotation();
    this._panoEyeOffsets = [[0, 0, 1, 1]];
    this._panoFade = new Fader();
    this._screens = {default: null};
  }

  _setPanoGeometryToSphere() {
    this._panoMesh.geometry = this._panoGeomSphere;
    this._applyPanoRotation();
    this._panoMaterial.uniforms.useUV.value = false;
    this._panoMaterial.uniforms.arcOffset.value = 0;
    this._panoMaterial.uniforms.arcLengthReciprocal.value = 1 / Math.PI / 2;
    this._panoMesh.needsUpdate = true;
  }

  _setPanoGeometryToHemisphere() {
    this._panoMesh.geometry = this._panoGeomHemisphere;
    this._applyPanoRotation();
    this._panoMaterial.uniforms.useUV.value = false;
    this._panoMaterial.uniforms.arcOffset.value = Math.PI / 2;
    this._panoMaterial.uniforms.arcLengthReciprocal.value = 1 / Math.PI;
    this._panoMesh.needsUpdate = true;
  }

  _setPanoGeometryToCube(columns: number, rows: number, expansion: number = 0.001) {
    const expansionCoef = 1 + expansion;
    // rebuild geometry if different
    if (
      this._panoGeomCube.columns !== columns ||
      this._panoGeomCube.rows !== rows ||
      this._panoGeomCube.expansionCoef !== expansionCoef
    ) {
      this._panoGeomCube = new CubemapGeometry(1000, columns, rows, 1 + expansion);
    }
    this._panoMesh.geometry = this._panoGeomCube;
    this._applyPanoRotation();
    this._panoMaterial.uniforms.useUV.value = true;
    this._panoMaterial.uniforms.arcOffset.value = 0;
    this._panoMaterial.uniforms.arcLengthReciprocal.value = 1 / Math.PI / 2;
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

  // used for preloading image for future use
  preloadImage(src: string) {
    if (this._resourceManager) {
      const resourceManager = this._resourceManager;
      resourceManager.addReference(src);
      resourceManager.getResourceForURL(src);
    }
  }

  // release the reference for preloaded image
  unloadImage(src: string) {
    if (this._resourceManager) {
      this._resourceManager.removeReference(src);
    }
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
    this._panoEyeOffsets = panoEyeOffsetsForStereoFormat(data.format);
    if (data.layout === 'CUBEMAP_32') {
      // video specified layout to be cube map
      this._setPanoGeometryToCube(3, 2, 0.01);
    } else if (width === height) {
      // 1:1 ratio, 180 mono or top/bottom 360 3D
      if (data.format === '3DTB' || data.format === '3DBT') {
        // 360 top-bottom 3D or 360 top-bottom 3D
        this._setPanoGeometryToSphere();
      } else {
        // assume 180 mono
        this._setPanoGeometryToHemisphere();
      }
    } else if (width / 2 === height) {
      // 2:1 ratio, 360 mono or 180 3D
      if (data.format === '3DLR') {
        // 180 side-by-side 3D
        this._setPanoGeometryToHemisphere();
      } else {
        // assume 360 mono
        this._setPanoGeometryToSphere();
      }
    } else if (width === height / 6) {
      // cube strip format for 360 photo cubemap
      this._setPanoGeometryToCube(1, 6, 0.001);
    } else {
      this._setPanoGeometryToSphere();
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
    targetFadeLevel: ?number,
    rotateTransform?: Array<number>
  ): Promise<void> {
    this._panoSource = id;
    const duration = typeof transitionTime === 'number' ? transitionTime : 500;
    const fadeLevel = typeof targetFadeLevel === 'number' ? targetFadeLevel : 1;
    this._panoLoad = loader;
    if (duration) {
      this._panoFade.fadeImmediate({
        targetLevel: 0,
        duration: duration,
        onFadeEnd: state => {
          if (state !== 'finished' || !this._panoLoad) {
            return;
          }
          this._panoLoad.then(data => {
            this._setRotateTransform(rotateTransform);
            this._panoFade.fadeImmediate({
              targetLevel: fadeLevel,
              duration: duration,
            });
            this._updateTexture(data);
          });
        },
      });
    }
    if (!loader) {
      return Promise.resolve();
    }
    return loader.then(data => {
      if (!duration) {
        this._panoLoad = null;
        return this._updateTexture(data);
      }
      // Fade is still in progress
      return Promise.resolve();
    });
  }

  setSource(src: null | string, options: PanoOptions = {}): Promise<void> {
    if (this._resourceManager && this._panoSource) {
      this._resourceManager.removeReference(this._panoSource);
    }
    const loader = src ? this._loadImage(src, options) : null;
    return this._setBackground(
      loader,
      src,
      options.transition,
      options.fadeLevel,
      options.rotateTransform
    );
  }

  setVideoSource(handle: string, options: PanoOptions = {}) {
    const player = this._videoPlayers ? this._videoPlayers.getPlayer(handle) : null;
    const loader = player ? player.load().then(data => ({...data, src: handle})) : null;
    return this._setBackground(
      loader,
      handle,
      options.transition,
      options.fadeLevel,
      options.rotateTransform
    );
  }

  _setRotateTransform(rotateTransform?: Array<number>) {
    const quat = new THREE.Quaternion();
    if (rotateTransform) {
      const mat = new THREE.Matrix4();
      mat.set.apply(mat, rotateTransform);
      const pos = new THREE.Vector3();
      const scale = new THREE.Vector3();
      mat.decompose(pos, quat, scale);
    }
    this._panoMeshQuat = quat;
    this._applyPanoRotation();
    this._panoMesh.needsUpdate = true;
  }

  _applyPanoRotation() {
    // specific yaw rotation offset to match geometry uv to pano definition
    let yawOffset = 0;
    if (this._panoMesh.geometry === this._panoGeomSphere) {
      yawOffset = -Math.PI / 2;
    } else if (this._panoMesh.geometry === this._panoGeomHemisphere) {
      yawOffset = Math.PI;
    }
    this._panoMesh.rotation.setFromQuaternion(
      new THREE.Quaternion()
        .setFromEuler(new THREE.Euler(0, yawOffset, 0, 'YXZ'))
        .premultiply(this._panoMeshQuat),
      'YXZ'
    );
  }

  prepareForRender(eye: ?string) {
    if (eye === 'right' && this._panoEyeOffsets[1]) {
      this._panoMaterial.uniforms.stereoOffsetRepeat.value = this._panoEyeOffsets[1];
    } else {
      this._panoMaterial.uniforms.stereoOffsetRepeat.value = this._panoEyeOffsets[0];
    }

    for (const id in this._screens) {
      const screen = this._screens[id];
      if (screen) {
        screen.prepareForRender(eye);
      }
    }
  }

  animateFade(fadeLevel: number, fadeTime: number) {
    this._panoFade.queueFade({
      targetLevel: fadeLevel,
      duration: fadeTime,
    });
  }

  setScreen(
    screenId: string,
    handle?: string,
    surfaceId: string,
    x: number,
    y: number,
    width: number,
    height: number
  ) {
    if (this._screens[screenId] === undefined) {
      throw new Error(`The scene doesn't include the screen ${screenId}!`);
    } else if (!this._screens[screenId]) {
      const screen = new Screen(surfaceId, x, y, width, height);
      this._attachScreen(screen);
      this._screens[screenId] = screen;
    } else {
      const screen = this._screens[screenId];
      const previousScreen = screen.getSurfaceID();
      if (previousScreen !== surfaceId) {
        this._removeScreen(screen);
      }
      screen.update(surfaceId, x, y, width, height);
      if (previousScreen !== surfaceId) {
        this._attachScreen(screen);
      }
    }

    if (this._screens[screenId]) {
      const screen = this._screens[screenId];
      if (handle) {
        const player = this._videoPlayers ? this._videoPlayers.getPlayer(handle) : null;
        const loader = player ? player.load().then(data => ({...data, src: handle})) : null;
        screen.setTexture(loader, handle);
      } else {
        screen.setTexture(null, handle);
      }
    }
  }

  _attachScreen(screen: Screen) {
    const surface = this._surfaceManager.getSurface(screen.getSurfaceID());
    if (surface) {
      surface.attachSubNode(screen.getNode());
    }
  }

  _removeScreen(screen: Screen) {
    const surface = this._surfaceManager.getSurface(screen.getSurfaceID());
    if (surface) {
      surface.removeSubNode(screen.getNode());
    }
  }

  updateScreenIds(screenIds: Array<string>) {
    const newIdsDict = {};
    for (const newId of screenIds) {
      newIdsDict[newId] = true;
      if (this._screens[newId] === undefined) {
        this._screens[newId] = null;
      }
    }
    for (const oldId in this._screens) {
      if (!newIdsDict[oldId]) {
        if (this._screens[oldId] != null) {
          this._removeScreen(this._screens[oldId]);
        }
        delete this._screens[oldId];
      }
    }
  }

  frame(delta: number) {
    if (this._panoFade.fadeFrame(delta)) {
      const level = this._panoFade.getCurrentLevel();
      this._panoMaterial.color.setRGB(level, level, level);
    }
  }
}
