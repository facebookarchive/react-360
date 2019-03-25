/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @flow strict
 */

export type AccessorType = 'SCALAR' | 'VEC2' | 'VEC3' | 'VEC4';

export type AccessorReference = {
  bufferView: number,
  byteOffset: number,
  componentType: number,
  count: number,
  type: AccessorType,
  max: Array<number>,
  min: Array<number>,
};

export type BufferReference = {
  uri: string,
  byteLength: number,
};

export type BufferViewReference = {
  buffer: number,
  byteOffset: number,
  byteLength: number,
  byteStride?: number,
  target?: number,
};

export type MeshReference = {
  name?: string,
  primitives: Array<PrimitiveReference>,
};

export type PrimitiveReference = {
  attributes: {[attr: string]: number},
  indices?: number,
};

export type GLTFFile = {
  accessors: Array<AccessorReference>,
  meshes: Array<MeshReference>,
  buffers: Array<BufferReference>,
  bufferViews: Array<BufferViewReference>,
};
