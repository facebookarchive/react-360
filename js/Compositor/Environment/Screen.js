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
import type {TextureMetadata} from './Types';
import StereoBasicTextureMaterial from './StereoBasicTextureMaterial';

export default class Screen {
  _attachedSurface: string;
  _screenEyeOffsets: Array<[number, number, number, number]>;
  _screenNode: THREE.Mesh;
  _screenGeometry: THREE.PlaneBufferGeometry;
  _screenMaterial: StereoBasicTextureMaterial;
  _screenSource: ?string;

  constructor(surfaceId: string, x: number, y: number, width: number, height: number) {
    this._attachedSurface = surfaceId;
    this._screenMaterial = new StereoBasicTextureMaterial({
      color: '#FFFFFF',
      side: THREE.DoubleSide,
    });
    this._screenMaterial.useUV = 1;
    this._screenGeometry = new THREE.PlaneBufferGeometry(1, 1);
    this._screenNode = new THREE.Mesh(this._screenGeometry, this._screenMaterial);
    this._screenNode.visible = false;
    this._screenSource = null;
    this._screenEyeOffsets = [[0, 0, 1, 1]];

    this._updateNode(x, y, width, height);
  }

  update(surfaceId: string, x: number, y: number, width: number, height: number) {
    this._attachedSurface = surfaceId;
    this._updateNode(x, y, width, height);
  }

  _updateNode(x: number, y: number, width: number, height: number) {
    this._screenNode.position.set(x + width / 2, -y - height / 2, 0);
    this._screenNode.scale.set(width, height, 1);
  }

  setTexture(loader: ?Promise<TextureMetadata>, id: ?string): Promise<void> {
    this._screenSource = id;

    if (!loader) {
      this._screenNode.visible = false;
      return Promise.resolve();
    }
    return loader.then(data => {
      return this._updateTexture(data);
    });
  }

  _updateTexture(data: TextureMetadata) {
    if (data.src !== this._screenSource) {
      // a new image has started loading
      return;
    }
    this._screenNode.visible = true;
    this._screenMaterial.map = data.tex;
    if (data.format === '3DTB') {
      this._screenEyeOffsets = [[0, 0, 1, 0.5], [0, 0.5, 1, 0.5]];
    } else if (data.format === '3DBT') {
      this._screenEyeOffsets = [[0, 0.5, 1, 0.5], [0, 0, 1, 0.5]];
    } else if (data.format === '3DLR') {
      this._screenEyeOffsets = [[0, 0, 0.5, 1], [0.5, 0, 0.5, 1]];
    } else if (data.format === '3DRL') {
      this._screenEyeOffsets = [[0.5, 0, 0.5, 1], [0, 0, 0.5, 1]];
    } else {
      this._screenEyeOffsets = [[0, 0, 1, 1]];
    }
    this._screenMaterial.needsUpdate = true;
  }

  prepareForRender(eye: ?string) {
    if (eye === 'right' && this._screenEyeOffsets[1]) {
      this._screenMaterial.uniforms.stereoOffsetRepeat.value = this._screenEyeOffsets[1];
    } else {
      this._screenMaterial.uniforms.stereoOffsetRepeat.value = this._screenEyeOffsets[0];
    }
  }

  getNode(): THREE.Mesh {
    return this._screenNode;
  }

  getSurfaceID(): string {
    return this._attachedSurface;
  }
}
