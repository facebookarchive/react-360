/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @flow strict-local
 */

/* global $TypedArray */

import {Node} from 'webgl-lite';
import {extractBufferSources, getBufferData, type BufferSource} from './BufferSource';
import type {AccessorReference, BufferViewReference, GLTFFile, MeshReference} from './FileTypes';
import SupportedAttributes from './GLTFShaderAttributes';
import compareByteOffset from './compareByteOffset';
import createDataView from './createDataView';
import createGLTFProgram from './createGLTFProgram';

type AttributeOptions = {
  offset?: number,
  stride?: number,
};

export default class GLTFStructure {
  _accessors: Array<AccessorReference> = [];
  _buffers: Array<BufferSource> = [];
  _bufferViews: Array<BufferViewReference> = [];
  _meshes: Array<MeshReference> = [];

  setAccessors(accessors: Array<AccessorReference>) {
    this._accessors = accessors;
  }

  setBuffers(buffers: Array<BufferSource>) {
    this._buffers = buffers;
  }

  setBufferViews(views: Array<BufferViewReference>) {
    this._bufferViews = views;
  }

  setMeshes(meshes: Array<MeshReference>) {
    this._meshes = meshes;
  }

  buildMesh(index: number, gl: WebGLRenderingContext): Promise<Array<Node>> {
    const mesh = this._meshes[index];
    if (!mesh) {
      return Promise.reject();
    }
    const {primitives} = mesh;
    const nodes = [];
    for (const primitive of primitives) {
      const {attributes} = primitive;
      const attrs = [];
      const shaderAttrs = [];
      for (const attr in attributes) {
        const accessor = this._accessors[attributes[attr]];
        attrs.push({
          ...accessor,
          name: attr,
        });
        shaderAttrs.push(attr);
      }
      attrs.sort(compareByteOffset);
      const program = createGLTFProgram(gl, shaderAttrs);
      const node = new Node(gl, program, {interleaved: false});

      for (const attr of attrs) {
        const viewIndex = attr.bufferView;
        const bufferView = this._bufferViews[viewIndex];
        if (attr.name in SupportedAttributes) {
          const options: AttributeOptions = {
            offset: (bufferView.byteOffset || 0) + (attr.byteOffset || 0),
          };
          if (bufferView.byteStride != null) {
            options.stride = bufferView.byteStride;
          }
          node.addAttribute(SupportedAttributes[attr.name], options);
        }
      }

      const promises = [
        getBufferData(this._buffers[this._bufferViews[attrs[0].bufferView].buffer]),
      ];
      if (typeof primitive.indices === 'number') {
        promises.push(this.dataViewForAccessor(primitive.indices));
      }
      nodes.push(
        Promise.all(promises).then(resolved => {
          const [data, indexData] = resolved;
          node.bufferData(data);
          if (indexData) {
            node.bufferIndex(indexData);
          }
          return node;
        })
      );
    }
    return Promise.all(nodes);
  }

  dataViewForAccessor(index: number): Promise<$TypedArray> {
    const accessor = this._accessors[index];
    if (!accessor) {
      return Promise.reject();
    }
    const view = this._bufferViews[accessor.bufferView];
    const buffer = this._buffers[view.buffer];
    return getBufferData(buffer).then(data => {
      return createDataView(data, view.byteOffset, view.byteLength, accessor.componentType);
    });
  }

  static fromJSONString(json: string): ?GLTFStructure {
    let obj = {};
    try {
      obj = JSON.parse(json);
    } catch (e) {
      return null;
    }
    return this.fromJSON(obj);
  }

  static fromJSON(obj: GLTFFile): GLTFStructure {
    const struct = new GLTFStructure();
    const buffers = obj.buffers;
    if (buffers) {
      struct.setBuffers(extractBufferSources(buffers));
    }
    const bufferViews = obj.bufferViews;
    if (bufferViews) {
      struct.setBufferViews(bufferViews);
    }
    const accessors = obj.accessors;
    if (accessors) {
      struct.setAccessors(accessors);
    }

    const meshes = obj.meshes;
    if (meshes) {
      struct.setMeshes(meshes);
    }

    return struct;
  }
}
