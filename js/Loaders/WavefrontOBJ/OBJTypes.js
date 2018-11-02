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

import type OBJGroup from './OBJGroup';

export type Vertex = Array<number>;
export type TextureCoords = [number, number];
export type Triplet = [number, number, number];
export type Face = Array<Triplet>;

export type OBJParserState = {
  vertices: Array<Vertex>,
  textureCoords: Array<TextureCoords>,
  normals: Array<Vertex>,

  materialLibraries: Array<string>,
  objects: Array<OBJGroup>,
  currentObject: OBJGroup,
};

export type MultiMaterial = {
  name: string,
  lib: string,
  startGroup: number,
  endGroup: number,
};
