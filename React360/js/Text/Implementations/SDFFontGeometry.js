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

import {Align, type FontGeometry} from '../FontGeometry';
import wrapText from '../wrapText';
import type SDFTextImplementation from './SDFTextImplementation';
import * as THREE from 'three';

export default class SDFFontGeometry implements FontGeometry {
  _align: string;
  _impl: SDFTextImplementation;
  _size: number;
  _text: string;

  constructor(impl: SDFTextImplementation, text: string, options: Object = {}) {
    this._impl = impl;
    this._size = options.size || 20;
    this._text = text;
    this.setWeight(options.weight || 400);
    this._align = options.align || Align.auto;

    this._info = wrapText(this._impl, '', this._size, this._text);
    this._geometry = new THREE.BufferGeometry();
    const {buffer, index, material} = this._impl.createBufferGeometry(
      this._info,
      this._sdfCenter,
    );
    const floatArray = new Float32Array(buffer);
    const uintArray = new Uint8Array(buffer);
    const attrBuffer32 = new THREE.InterleavedBuffer(floatArray, 6);
    const attrBuffer8 = new THREE.InterleavedBuffer(uintArray, 24);
    this._geometry.setIndex(index);
    this._geometry.addAttribute(
      'a_position',
      new THREE.InterleavedBufferAttribute(attrBuffer32, 2, 0, false),
    );
    this._geometry.addAttribute(
      'a_uv',
      new THREE.InterleavedBufferAttribute(attrBuffer32, 2, 2, false),
    );
    this._geometry.addAttribute(
      'a_center',
      new THREE.InterleavedBufferAttribute(attrBuffer32, 1, 4, false),
    );
    this._geometry.addAttribute(
      'a_color',
      new THREE.InterleavedBufferAttribute(attrBuffer8, 4, 20, true),
    );
    this._material = material;
    this._node = new THREE.Mesh(this._geometry, material);
  }

  setAlign(align: string) {
    this._align = align;
    this._geometryDirty = true;
  }

  setSize(size: number) {
    this._size = Math.max(1, size);
    this._infoDirty = true;
  }

  setWeight(weight: number) {
    this._sdfCenter = 0.54 - weight / 10000.0;
  }

  setText(text: string) {
    this._text = text;
    this._infoDirty = true;
  }

  getNode() {
    return this._node;
  }

  update() {
    if (this._infoDirty) {
      this._info = wrapText(this._impl, '', this._size, this._text);
      this._geometryDirty = true;
    }
    if (this._geometryDirty) {
      const {buffer, index, material} = this._impl.createBufferGeometry(
        this._info,
        this._center,
      );
      const floatArray = new Float32Array(buffer);
      const uintArray = new Uint8Array(buffer);
      this._geometry.setIndex(index);
      const attributes = this._geometry.attributes;
      attributes.a_position.data.setArray(floatArray);
      attributes.a_position.data.needsUpdate = true;
      attributes.a_uv.data.setArray(floatArray);
      attributes.a_uv.data.needsUpdate = true;
      attributes.a_center.data.setArray(floatArray);
      attributes.a_center.data.needsUpdate = true;
      attributes.a_color.data.setArray(uintArray);
      attributes.a_color.data.needsUpdate = true;
    }
  }
}
