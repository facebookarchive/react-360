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

import RCTBaseMesh from './BaseMesh';
import {fetchAndCacheMTL, removeMTLReference} from '../Loaders/WavefrontOBJ/MTLLoader';
import {fetchAndCacheOBJ, removeOBJReference} from '../Loaders/WavefrontOBJ/OBJLoader';
import {
  BufferAttribute,
  BufferGeometry,
  FlatShading,
  Group,
  Mesh,
  MultiMaterial,
  NoColors,
  SmoothShading,
  VertexColors,
} from 'three';
import extractURL from '../Utils/extractURL';
import merge from '../Utils/merge';

import type {GuiSys} from 'ovrui';
import type {OBJParserState} from '../Loaders/WavefrontOBJ/OBJTypes';

type ResourceSpecifier = void | null | string | {uri: string};

export default class RCTModel extends RCTBaseMesh {
  _objURL: string | null;
  _mtlURL: string | null;
  _objState: OBJParserState | null;
  _update: number | null;
  _materialMap: any;
  mesh: any;

  constructor(guiSys: GuiSys) {
    super(guiSys);

    this._objURL = null;
    this._mtlURL = null;
    this._objState = null;
    this._update = null;

    Object.defineProperty(
      this.props,
      'source',
      ({
        set: this._setSource.bind(this),
      }: Object)
    );
  }

  _setSource(value: {[key: string]: string}) {
    // This can be expanded to allow registration of new source types at runtime
    // For now, hardcode support for OBJ / MTL
    if (value.hasOwnProperty('obj')) {
      let resource = null;
      if (value.obj) {
        const url = extractURL(value.obj);
        if (!url) {
          throw new Error('Invalid value for "obj" property: ' + JSON.stringify(value.obj));
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
          throw new Error('Invalid value for "mtl" property: ' + JSON.stringify(value.mtl));
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
      if (this.mesh) {
        this.view.remove(this.mesh);
        if (typeof this.mesh.dispose === 'function') {
          this.mesh.dispose();
        }
        this.mesh = null;
      }
      return;
    }

    fetchAndCacheOBJ(value)
      .then(
        state => {
          this._objURL = value;
          this._objState = state;
          if (this.mesh) {
            this.view.remove(this.mesh);
            if (typeof this.mesh.dispose === 'function') {
              this.mesh.dispose();
            }
          }
          if (this.view) {
            this.mesh = this._updateMeshes();
            this.view.add(this.mesh);
          }
        },
        err => {
          console.error('Failed to fetch resource: ' + JSON.stringify(value));
        }
      )
      .catch(err => {
        console.error('Failed to update mesh:', err);
      });
  }

  _setMTL(value: ResourceSpecifier) {
    if (!value) {
      // Clean up existing materials
      if (this._mtlURL) {
        this._materialMap = null;
        removeMTLReference(this._mtlURL);
        this._mtlURL = null;
      }
      if (!this.mesh) {
        return;
      }
      const material = this._lit ? this._litMaterial : this._unlitMaterial;
      if (this.mesh.type === 'Group') {
        this.mesh.children.forEach(c => {
          c.material = material;
        });
      } else {
        this.mesh.material = material;
      }
      return;
    }

    const url = extractURL(value);
    if (!url) {
      throw new Error('Invalid value for "mtl" property: ' + JSON.stringify(value));
    }
    fetchAndCacheMTL(url)
      .then(
        map => {
          this._mtlURL = url;
          this._materialMap = map;

          if (this.mesh) {
            this._updateMeshes(this.mesh);
          }
        },
        err => {
          console.error('Failed to fetch resource: ' + url);
        }
      )
      .catch(err => {
        console.error('Failed to update mesh:', err);
      });
  }

  _updateMeshes(previousGroup?: Group) {
    if (!this._objState) {
      return;
    }
    const fallbackMaterial = this._lit ? this._litMaterial : this._unlitMaterial;
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
          new BufferAttribute(new Float32Array(geometry.position), 3)
        );
        bufferGeometry.setIndex(new BufferAttribute(new Uint32Array(geometry.index), 1));
        if (geometry.hasUVs) {
          bufferGeometry.addAttribute('uv', new BufferAttribute(new Float32Array(geometry.uv), 2));
        }
        if (geometry.hasNormals) {
          bufferGeometry.addAttribute(
            'normal',
            new BufferAttribute(new Float32Array(geometry.normal), 3)
          );
        } else {
          // Automatically compute vertex normals from face normals
          bufferGeometry.computeVertexNormals();
        }
        if (geometry.hasVertexColors) {
          bufferGeometry.addAttribute(
            'color',
            new BufferAttribute(new Float32Array(geometry.color), 3)
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
            multi.push(this._getMaterial(materials[i].name));
          }
        }
        material = new MultiMaterial(multi);
      }
      material.shading = obj.smooth ? SmoothShading : FlatShading;
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
        console.warn('OBJ attempted to load unknown material: ' + name);
      }
      return this._lit ? this._litMaterial : this._unlitMaterial;
    }
    return this._lit ? material.lit : material.unlit;
  }

  _setLit(flag: boolean) {
    const changed = this._lit !== flag;
    this._lit = flag;
    if (changed) {
      this._updateMeshes(this.mesh);
    }
  }

  _setWireframe(flag: boolean) {
    if (__DEV__) {
      console.log('Wireframe mode is not currently supported for OBJ models');
    }
  }

  dispose() {
    if (this._objURL) {
      this._objState = null;
      removeOBJReference(this._objURL);
      this._objURL = null;
    }
    if (this._mtlURL) {
      this._materialMap = null;
      removeMTLReference(this._mtlURL);
      this._mtlURL = null;
    }
    // materials are a shared resource so remove references to them before clearing up meshes
    const material = this._lit ? this._litMaterial : this._unlitMaterial;
    if (this.mesh.type === 'Group') {
      this.mesh.children.forEach(c => {
        c.material = material;
      });
    } else {
      this.mesh.material = material;
    }

    super.dispose();
  }

  static describe() {
    return merge(super.describe(), {
      // register the properties sent from react to runtime
      NativeProps: {
        source: 'object',
      },
    });
  }
}
