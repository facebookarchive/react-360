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

import {
  BufferAttribute,
  BufferGeometry,
  Group,
  Mesh,
  Material,
  NoColors,
  VertexColors,
} from 'three';
import {
  fetchAndCacheMTL,
  removeMTLReference,
} from '../Loaders/WavefrontOBJ/MTLLoader';
import {
  fetchAndCacheOBJ,
  removeOBJReference,
} from '../Loaders/WavefrontOBJ/OBJLoader';
import extractURL from '../Utils/extractURL';
import type {OBJParserState} from '../Loaders/WavefrontOBJ/OBJTypes';
import type UIView from '../OVRUI/UIView/UIView';

class ObjMeshInstance {
  _lit: boolean;

  _objURL: string | null;
  _mtlURL: string | null;
  _objState: OBJParserState | null;
  _update: number | null;
  _materialMap: any;
  _litMaterial: any;
  _unlitMaterial: any;
  _mesh: any;
  _view: UIView;

  constructor(
    value: any,
    parent: UIView,
    litMaterial: Material,
    unlitMaterial: Material,
  ) {
    this._lit = true;
    this._objURL = null;
    this._mtlURL = null;
    this._objState = null;
    this._update = null;
    this._view = parent;
    this._mesh = null;
    this._litMaterial = litMaterial;
    this._unlitMaterial = unlitMaterial;

    // This can be expanded to allow registration of new source types at runtime
    // For now, hardcode support for OBJ / MTL
    if (value.hasOwnProperty('obj')) {
      let resource = null;
      if (value.obj) {
        const url = extractURL(value.obj);
        if (!url) {
          throw new Error(
            `Invalid value for "obj" property: ${JSON.stringify(value.obj)}`,
          );
        }
        resource = url;
      }
      if (resource !== this._objURL) {
        this._setOBJ(resource);
      }
    }
    if (value.hasOwnProperty('mtl')) {
      let resource = null;
      if (value.mtl) {
        const url = extractURL(value.mtl);
        if (!url) {
          throw new Error(
            `Invalid value for "mtl" property: ${JSON.stringify(value.mtl)}`,
          );
        }
        resource = url;
      }
      if (resource !== this._mtlURL) {
        this._setMTL(resource);
      }
    }
  }

  _setOBJ(value: string | null) {
    if (!value) {
      if (this._objURL) {
        this._objState = null;
        removeOBJReference(this._objURL);
        this._objURL = null;
      }
      if (this._mesh) {
        this._view.remove(this._mesh);
        if (typeof this._mesh.dispose === 'function') {
          this._mesh.dispose();
        }
        this._mesh = null;
      }
      return;
    }

    fetchAndCacheOBJ(value)
      .then(
        state => {
          this._objURL = value;
          this._objState = state;
          if (this._mesh) {
            this._view.remove(this._mesh);
            if (typeof this._mesh.dispose === 'function') {
              this._mesh.dispose();
            }
          }
          if (this._view) {
            this._mesh = this._updateMeshes();
            this._view.add(this._mesh);
          }
        },
        err => {
          console.error(`Failed to fetch resource: ${JSON.stringify(value)}`);
        },
      )
      .catch(err => {
        console.error('Failed to update mesh:', err);
      });
  }

  _setMTL(value: string | null) {
    if (!value) {
      // Clean up existing materials
      if (this._mtlURL) {
        this._materialMap = null;
        removeMTLReference(this._mtlURL);
        this._mtlURL = null;
      }
      if (!this._mesh) {
        return;
      }
      const material = this._lit ? this._litMaterial : this._unlitMaterial;
      if (this._mesh.type === 'Group') {
        this._mesh.children.forEach(c => {
          c.material = material;
        });
      } else {
        this._mesh.material = material;
      }
      return;
    }

    const url = extractURL(value);
    if (!url) {
      throw new Error(
        `Invalid value for "mtl" property: ${JSON.stringify(value)}`,
      );
    }
    fetchAndCacheMTL(url)
      .then(
        map => {
          this._mtlURL = url;
          this._materialMap = map;

          if (this._mesh) {
            this._updateMeshes(this._mesh);
          }
        },
        err => {
          console.error(`Failed to fetch resource: ${url}`);
        },
      )
      .catch(err => {
        console.error('Failed to update mesh:', err);
      });
  }

  _updateMeshes(previousGroup?: Group) {
    if (!this._objState) {
      return;
    }
    const fallbackMaterial = this._lit
      ? this._litMaterial
      : this._unlitMaterial;
    const group = previousGroup || new Group();
    let index = 0;
    this._objState.objects.forEach(obj => {
      const geometry = obj.geometry;
      if (geometry.position.length < 1) {
        return;
      }
      const materials = obj.materials
        // Eliminate materials that don't have any faces
        .filter(m => m.startGroup < m.endGroup || m.endGroup < 0);
      const bufferGeometry = previousGroup ? null : new BufferGeometry();
      if (bufferGeometry) {
        bufferGeometry.addAttribute(
          'position',
          new BufferAttribute(new Float32Array(geometry.position), 3),
        );
        bufferGeometry.setIndex(
          new BufferAttribute(new Uint32Array(geometry.index), 1),
        );
        if (geometry.hasUVs) {
          bufferGeometry.addAttribute(
            'uv',
            new BufferAttribute(new Float32Array(geometry.uv), 2),
          );
        }
        if (geometry.hasNormals) {
          bufferGeometry.addAttribute(
            'normal',
            new BufferAttribute(new Float32Array(geometry.normal), 3),
          );
        } else {
          // Automatically compute vertex normals from face normals
          bufferGeometry.computeVertexNormals();
        }
        if (geometry.hasVertexColors) {
          bufferGeometry.addAttribute(
            'color',
            new BufferAttribute(new Float32Array(geometry.color), 3),
          );

          this._litMaterial.vertexColors = VertexColors;
          this._unlitMaterial.vertexColors = VertexColors;
        } else {
          this._litMaterial.vertexColors = NoColors;
          this._unlitMaterial.vertexColors = NoColors;
        }
      }

      let material = fallbackMaterial;
      if (materials.length === 1) {
        // Use the only material
        material = this._getMaterial(materials[0].name);
        material.flatShading = !obj.smooth;
      } else if (materials.length > 1) {
        // Construct a multi-material
        const multi = [];
        for (let i = 0; i < materials.length; i++) {
          let end = materials[i].endGroup;
          if (end < 0) {
            end = geometry.index.length;
          }
          const length = end - materials[i].startGroup;
          if (length > 0) {
            if (bufferGeometry) {
              bufferGeometry.addGroup(materials[i].startGroup, length, i);
            }
            const mtr = this._getMaterial(materials[i].name);
            mtr.flatShading = !obj.smooth;
            multi.push(mtr);
          }
        }
        material = multi;
      }
      if (previousGroup) {
        const mesh = group.children[index];
        if (mesh && mesh instanceof Mesh) {
          mesh.material = material;
        }
      } else if (bufferGeometry) {
        const mesh = new Mesh(bufferGeometry, material);
        group.add(mesh);
      }
      index++;
    });
    return group;
  }

  _getMaterial(name: string) {
    if (!this._materialMap) {
      return this._lit ? this._litMaterial : this._unlitMaterial;
    }
    const material = this._materialMap[name];
    if (!material) {
      if (__DEV__) {
        console.warn(`OBJ attempted to load unknown material: ${name}`);
      }
      return this._lit ? this._litMaterial : this._unlitMaterial;
    }
    return this._lit ? material.lit : material.unlit;
  }

  // returns false if instance can't be updated and instances needs to be recreated
  update(definition: any): boolean {
    return false;
  }

  // already established apis
  setLit(flag: boolean): void {
    const changed = this._lit !== flag;
    this._lit = flag;
    if (changed) {
      this._updateMeshes(this._mesh);
    }
  }

  setTexture(value: string): void {}
  setWireframe(value: boolean): void {
    if (__DEV__) {
      console.log('Wireframe mode is not currently supported for OBJ models');
    }
  }

  frame(timeStamp: number, deltaTime: number) {}

  // will dispose of all internally allocated structure
  dispose(): void {
    if (this._mtlURL) {
      this._materialMap = null;
      removeMTLReference(this._mtlURL);
      this._mtlURL = null;
    }
    if (this._objURL) {
      this._objState = null;
      removeOBJReference(this._objURL);
      this._objURL = null;
    }
    if (this._mesh) {
      this._view.remove(this._mesh);
      if (typeof this._mesh.dispose === 'function') {
        this._mesh.dispose();
      }
      this._mesh = null;
    }
  }
}

export default class ObjModelLoader {
  // returns true if the loader can create an instance from this definition
  canLoad(definition: any): boolean {
    return definition && definition.hasOwnProperty('obj');
  }

  // create the instance
  createInstance(
    definition: any,
    parent: UIView,
    litMaterial: Material,
    unlitMaterial: Material,
  ): ObjMeshInstance {
    return new ObjMeshInstance(definition, parent, litMaterial, unlitMaterial);
  }
}
