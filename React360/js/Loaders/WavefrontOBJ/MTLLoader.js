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

import type {Material} from 'three';
import * as THREE from 'three';
import RefCountCache from '../../Utils/RefCountCache';
import fetchResource from '../../Utils/fetchResource';
import {type RawMTL, type Texture, readMTLFile} from './MTLParser';

type MaterialMap = {
  [name: string]: {
    lit: Material,
    unlit: Material,
  },
};

// We currently use MTLLoader as a singleton, but we may want to create one
// per ReactNativeContext later on
const mtlStateCache: RefCountCache<MaterialMap> = new RefCountCache(
  // Cleanup method
  (url, entry) => {
    for (const name in entry) {
      entry[name].lit.dispose();
      entry[name].unlit.dispose();
    }
  },
);
const mtlLoaders: {[path: string]: Promise<MaterialMap>} = {};

// Mapping from the param name to Three's initialization property name
const MAP_TO_THREE_NAME = {
  bump: 'bumpMap',
  diffuse: 'map',
  displacement: 'displacementMap',
  emissive: 'emissiveMap',
  specular: 'specularMap',
};

/**
 * addTextureMap loads an external texture file, generates a Three.js Texture
 * from it, and applies the appropriate parameters.
 */
function addTextureMap(
  directory: string,
  params: {[key: string]: any},
  type: string,
  tex: Texture,
): void {
  const mapParam = MAP_TO_THREE_NAME[type] || type;
  if (params[mapParam]) {
    // Use the first definition of each map type
    return;
  }
  // Load the file, relative to the directory of the MTL file.
  const path = directory + tex.file;
  const scale = new THREE.Vector2(tex.options.scale[0], tex.options.scale[1]);
  const offset = new THREE.Vector2(
    tex.options.origin[0],
    tex.options.origin[1],
  );
  if (type === 'bump') {
    if (tex.options.bumpMultiplier) {
      params.bumpScale = tex.options.bumpMultiplier;
    }
  }
  const loader = new THREE.TextureLoader(THREE.DefaultLoadingManager);
  loader.setCrossOrigin('anonymous');
  const map = loader.load(path);
  map.name = tex.file;
  map.repeat.copy(scale);
  map.offset.copy(offset);
  if (tex.options.clamp) {
    map.wrapS = THREE.ClampToEdgeWrapping;
    map.wrapT = THREE.ClampToEdgeWrapping;
  } else {
    map.wrapS = THREE.RepeatWrapping;
    map.wrapT = THREE.RepeatWrapping;
  }
  params[mapParam] = map;
}

/**
 * createMaterial takes the intermediate parsed form of a material from a MTL
 * file and constructs a Three.js Material out of it.
 */
function createMaterial(
  url: string,
  raw: RawMTL,
  forceBasic: boolean = false,
): Material {
  const params: {[key: string]: any} = {
    name: raw.name,
  };
  const mtlDirectory = url.substr(0, url.lastIndexOf('/') + 1);
  const isPhong = !forceBasic && raw.illum !== 0 && raw.illum !== 1;
  const isTranparent =
    raw.illum === 4 || raw.illum === 6 || raw.illum === 7 || raw.illum === 9;
  if (raw.specular) {
    // Specular only supported on Phong
    if (isPhong) {
      params.specular = new THREE.Color(
        raw.specular[0],
        raw.specular[1],
        raw.specular[2],
      );
    }
  }
  if (raw.diffuse) {
    params.color = new THREE.Color(
      raw.diffuse[0],
      raw.diffuse[1],
      raw.diffuse[2],
    );
  }
  if (raw.emissive) {
    if (!forceBasic) {
      params.emissive = new THREE.Color(
        raw.emissive[0],
        raw.emissive[1],
        raw.emissive[2],
      );
    }
  }
  if (raw.specularExp) {
    if (!forceBasic) {
      params.shininess = raw.specularExp;
    }
  }
  if (raw.vertexColors) {
    params.vertexColors = raw.vertexColors;
  }
  if (raw.wireframe) {
    params.wireframe = raw.wireframe;
  }
  if (raw.color) {
    params.color = raw.color;
  }
  if (raw.textureMap) {
    // Load each of the external texture images used by this material
    for (const type in raw.textureMap) {
      addTextureMap(mtlDirectory, params, type, raw.textureMap[type]);
    }
  }
  if (params.ambient && !isPhong) {
    // ambient texture only supported on Phong
    delete params.ambient;
  }

  // If lighting is disabled, we use a Basic Material.
  // If lighting is enabled, the material is determined by the illumination
  // mode declared in the MTL file, defaulting to Phong is no mode is declared.
  const material = forceBasic
    ? new THREE.MeshBasicMaterial(params)
    : raw.illum === 0 || raw.illum === 1
      ? new THREE.MeshLambertMaterial(params)
      : new THREE.MeshPhongMaterial(params);
  if (isTranparent || (raw.opacity && raw.opacity < 1.0)) {
    material.transparent = true;
    material.opacity = raw.opacity || 1.0;
  }
  material.url = url;
  return material;
}

export function fetchAndCacheMTL(mtl: string): Promise<MaterialMap> {
  if (mtlStateCache.has(mtl)) {
    mtlStateCache.addReference(mtl);
    return Promise.resolve(mtlStateCache.get(mtl));
  }

  // Make sure we only load + parse parallel MTL requests once
  let mtlLoader = mtlLoaders[mtl];

  if (!mtlLoader) {
    mtlLoader = fetchResource(mtl)
      .then(text => {
        return readMTLFile(text);
      })
      .then(state => {
        const map: MaterialMap = {};
        for (const raw of state) {
          map[raw.name] = {
            lit: createMaterial(mtl, raw, false),
            unlit: createMaterial(mtl, raw, true),
          };
        }
        return map;
      });
    mtlLoaders[mtl] = mtlLoader;
  }

  return mtlLoader.then(materialMap => {
    if (mtlStateCache.has(mtl)) {
      mtlStateCache.addReference(mtl);
    } else {
      mtlStateCache.addEntry(mtl, materialMap);
    }
    if (mtl in mtlLoaders) {
      delete mtlLoaders[mtl];
    }
    return materialMap;
  });
}

export function removeMTLReference(key: string) {
  mtlStateCache.removeReference(key);
}
