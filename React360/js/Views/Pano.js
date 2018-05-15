/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

/* eslint-disable */

/**
 * RCTPano: runtime implementation of the <Pano source={{uri:URL}}>
 * creates a 1000 m radius globe that as a child of the view
 * view responds to layout and transforms with pivot point the center
 * of the view
 * @class RCTPano
 * @extends RCTBaseView
 */

import StereoBasicTextureMaterial from '../Compositor/Environment/StereoBasicTextureMaterial';
import RCTBaseView from './BaseView';
import UIView from '../OVRUI/UIView/UIView';
import merge from '../Utils/merge';
import StereoOffsetRepeats from '../Utils/StereoOffsetRepeats';
import {HPanoBufferGeometry} from '../Utils/HPano';
import {CubePanoBufferGeometry} from '../Utils/CubePano';
import {RCTBindedResource} from '../Utils/RCTBindedResource';
import * as THREE from 'three';
import * as Flexbox from '../Utils/FlexboxImplementation';

import Prefetch from './Prefetch';

const panoRayCast = (function() {
  // avoid create temp objects;
  const inverseMatrix = new THREE.Matrix4();
  const ray = new THREE.Ray();
  const sphere = new THREE.Sphere(new THREE.Vector3(0, 0, 0), 1000);
  const intersectionPoint = new THREE.Vector3();
  const intersectionPointWorld = new THREE.Vector3();
  return function(raycaster, intersects) {
    // transform the ray into the space of the sphere
    inverseMatrix.getInverse(this.matrixWorld);
    ray.copy(raycaster.ray).applyMatrix4(inverseMatrix);
    const intersect = ray.intersectSphere(sphere, intersectionPoint);
    if (intersect === null) {
      return;
    }

    // determine hit location in world space
    intersectionPointWorld.copy(intersectionPoint);
    intersectionPointWorld.applyMatrix4(this.matrixWorld);

    const distance = raycaster.ray.origin.distanceTo(intersectionPointWorld);
    if (distance < raycaster.near || distance > raycaster.far) {
      return;
    }

    intersects.push({
      distance: distance,
      point: intersectionPointWorld.clone(),
      object: this,
    });
  };
})();

let sphereGeometry = undefined;
let cubeGeometry = undefined;

// Only dispose certain textures, not those that is from video.
// A texture manager would be useful to help track the lifetime of textures.
const tryDisposeTexture = texture => {
  if (texture._needsDispose) {
    texture.dispose();
  } else if (Prefetch.isCachedTexture(texture)) {
    Prefetch.removeTextureFromCache(texture);
  }
};

export default class RCTPano extends RCTBaseView {
  /**
   * constructor: allocates the required resources and sets defaults
   */
  constructor(guiSys, rnctx) {
    super();

    sphereGeometry = sphereGeometry || new THREE.SphereGeometry(1000, 50, 50);
    cubeGeometry = cubeGeometry || new CubePanoBufferGeometry(2000, 3, 2, 1.01);

    this._tintOpacity = 1.0;
    this._styleOpacity = 1.0;
    this._sphereGeometry = sphereGeometry;
    this._cubeGeometry = cubeGeometry;
    this._material = new StereoBasicTextureMaterial({
      color: 'white',
      side: THREE.DoubleSide,
    });

    this._globe = new THREE.Mesh(this._sphereGeometry, this._material);
    this._globe.onBeforeRender = function(renderer, scene, camera, geometry, material, group) {
      if (camera.viewID === 1 && material.stereoOffsetRepeats[1]) {
        material.uniforms.stereoOffsetRepeat.value = material.stereoOffsetRepeats[1];
      } else {
        material.uniforms.stereoOffsetRepeat.value = material.stereoOffsetRepeats[0];
      }
      if (material._rightEnvMap) {
        if (camera.viewID === 1) {
          material.envMap = material._rightEnvMap;
        } else {
          material.envMap = material._leftEnvMap;
        }
        material.needsUpdate = true;
      }
    };

    this._globe.raycast = panoRayCast.bind(this._globe);
    this._globe.rotation.y = -Math.PI / 2;

    this.view = new UIView(guiSys);
    // set zOffset to be the radius of the sphere. This helps prevent the pano's
    // transparency from affecting other views as a result of rendering order.
    this.view.zOffset = 1000;
    this.view.add(this._globe);
    this._localResource = new RCTBindedResource(rnctx.RCTResourceManager);
    this.globeOnUpdate = this.globeOnUpdate.bind(this);

    Object.defineProperty(this.props, 'source', {
      set: value => this.setSource(value),
    });
    // register a setter for the backgroundColor so the globe can be tinted
    Object.defineProperty(this.style, 'opacity', {
      set: value => {
        this._styleOpacity = value;
        this._material.opacity = this._styleOpacity * this._tintOpacity;
        this._material.transparent = this._material.opacity < 1;
      },
    });
    // register a setter for the backgroundColor so the globe can be tinted
    Object.defineProperty(this.style, 'tintColor', {
      set: value => {
        const opacity = parseInt(value.toString(16).slice(0, 2), 16) / 255;
        this._material.color.set(value);
        this._tintOpacity = opacity;
        this._material.opacity = this._styleOpacity * this._tintOpacity;
        this._material.transparent = this._material.opacity < 1;
      },
    });
  }

  globeOnUpdate(scene, camera) {
    const projScreenMatrix = new THREE.Matrix4();
    const modelViewMatrix = new THREE.Matrix4();
    modelViewMatrix.multiplyMatrices(camera.matrixWorldInverse, this._globe.matrixWorld);
    projScreenMatrix.multiplyMatrices(camera.projectionMatrix, modelViewMatrix);
    this._globe.geometry.update(this.maxDepth, projScreenMatrix);
    this._globe.material = this._globe.geometry.material;
  }

  setSource(value) {
    if (value && value.tile) {
      // use tile renderer
      this._globe.geometry.dispose();
      this.maxDepth = value.maxDepth || 2;
      this._globe.geometry = new HPanoBufferGeometry(1000, this.maxDepth, value.tile);
      this._globe.onUpdate = this.globeOnUpdate;
    } else {
      // use sphere renderer
      this._globe.geometry.dispose();
      if (value && value.layout === 'CUBEMAP_32') {
        this._globe.geometry = this._cubeGeometry;
        this._globe.scale.z = -1;
        this._material.useUV = 1;
      } else {
        this._globe.geometry = this._sphereGeometry;
        this._globe.scale.z = 1;
        this._material.useUV = 0;
      }
      this._globe.onUpdate = null;
      // call onLoadStart in React
      this.UIManager._rnctx.callFunction('RCTEventEmitter', 'receiveEvent', [
        this.getTag(),
        'topLoadStart',
        [],
      ]);
      const loadRemoteTexture = (url, onLoad, viewID) => {
        // When a url is null or undefined, send undefined to onLoad callback
        const onError = () => onLoad(undefined, viewID);
        const onLoadDisposable = texture => {
          texture._needsDispose = true;
          onLoad(texture, viewID);
        };
        // No progress indication for now.
        const onProgress = undefined;
        if (url == null) {
          onError();
        } else if (Prefetch.isCached(url)) {
          // First Check if the texture hasn't already been prefetched
          const cachedTexture = Prefetch.getFromCache(url);
          onLoad(cachedTexture, viewID);
        } else if (Array.isArray(url)) {
          const loader = new THREE.CubeTextureLoader();
          loader.setCrossOrigin('Access-Control-Allow-Origin');
          loader.load(url, onLoadDisposable, onProgress, onError);
        } else {
          const loader = new THREE.TextureLoader();
          loader.setCrossOrigin('Access-Control-Allow-Origin');
          loader.load(url, onLoadDisposable, onProgress, onError);
        }
      };
      const onLoadOrChange = (texture, viewID) => {
        // ignore a old request result
        if (value !== this._currentSource) {
          return;
        }
        this._globe.scale.x = -1;
        if (this._material.map) {
          tryDisposeTexture(this._material.map);
        }
        if (
          this._material.envMap &&
          this._material.envMap !== this._material._leftEnvMap &&
          this._material.envMap !== this._material._rightEnvMap
        ) {
          tryDisposeTexture(this._material.envMap);
        }
        if (texture === undefined) {
          this._material.map = undefined;
          this._material.envMap = undefined;
        } else if (texture.type === 'MonoTextureInfo') {
          this._material.map = texture.texture;
          this._material.envMap = undefined;
        } else {
          if (!value.enableMipmaps) {
            texture.generateMipmaps = false;
            texture.minFilter = THREE.LinearFilter;
          }
          texture.wrapS = THREE.ClampToEdgeWrapping;
          texture.wrapT = THREE.ClampToEdgeWrapping;
          const cubeTexture = texture.isCubeTexture ? texture : null;
          const flatTexture = texture.isCubeTexture ? null : texture;
          if (texture.isCubeTexture) {
            this._globe.scale.x = 1;
          }
          this._material.map = flatTexture;
          this._material.envMap = cubeTexture;
          if (viewID === 1) {
            this._nextRightEnvMap = cubeTexture;
          } else {
            this._nextLeftEnvMap = cubeTexture;
          }
        }
        const stereoFormat = value && value.stereo ? value.stereo : '2D';
        this._material.stereoOffsetRepeats = StereoOffsetRepeats[stereoFormat];
        if (!this._material.stereoOffsetRepeats) {
          console.warn(`Pano: stereo format '${stereoFormat}' not supported.`);
          // fallback to 2D
          this._material.stereoOffsetRepeats = StereoOffsetRepeats['2D'];
        }
        this._material.needsUpdate = true;

        this._numTexturesToLoad--;
        if (this._numTexturesToLoad === 0) {
          if (this._material._leftEnvMap) {
            tryDisposeTexture(this._material._leftEnvMap);
          }
          if (this._material._rightEnvMap) {
            tryDisposeTexture(this._material._rightEnvMap);
          }
          this._material._leftEnvMap = this._nextLeftEnvMap;
          this._material._rightEnvMap = this._nextRightEnvMap;
          // call onLoad in React
          if (texture !== undefined) {
            this.UIManager._rnctx.callFunction('RCTEventEmitter', 'receiveEvent', [
              this.getTag(),
              'topLoad',
              [],
            ]);
          }
          // call onLoadEvent in React
          this.UIManager._rnctx.callFunction('RCTEventEmitter', 'receiveEvent', [
            this.getTag(),
            'topLoadEnd',
            [],
          ]);
        }
      };

      this._currentSource = value;
      this._numTexturesToLoad = 1;
      this._nextLeftEnvMap = undefined;
      this._nextRightEnvMap = undefined;
      if (Array.isArray(value)) {
        if ((value.length !== 6 && value.length !== 12) || !value[0].uri) {
          console.warn(
            'Pano expected cubemap source in format [{uri: http..}, {uri: http..}, ... ]' +
              'with length of 6 (or 12 for stereo)'
          );
          return;
        }
        const urls = value.map(function(x) {
          return x.uri;
        });
        this._localResource.unregister();
        if (urls.length === 12) {
          this._numTexturesToLoad = 2;
          loadRemoteTexture(urls.slice(0, 6), onLoadOrChange, 0);
          loadRemoteTexture(urls.slice(6, 12), onLoadOrChange, 1);
        } else {
          loadRemoteTexture(urls, onLoadOrChange, 0);
        }
      } else {
        const url = value ? value.uri : null;
        if (this._localResource.isValidUrl(url)) {
          this._localResource.load(url, texture => onLoadOrChange(texture, 0));
        } else {
          this._localResource.unregister();
          loadRemoteTexture(url, onLoadOrChange, 0);
        }
      }
    }
  }

  presentLayout() {
    super.presentLayout();
    this._globe.visible = this.YGNode.getDisplay() !== Flexbox.DISPLAY_NONE;
  }

  /**
   * Dispose of any associated resources
   */
  dispose() {
    if (this._material.map) {
      tryDisposeTexture(this._material.map);
    }
    if (
      this._material.envMap &&
      this._material.envMap !== this._material._leftEnvMap &&
      this._material.envMap !== this._material._rightEnvMap
    ) {
      tryDisposeTexture(this._material.envMap);
    }
    if (this._material._leftEnvMap) {
      tryDisposeTexture(this._material._leftEnvMap);
    }
    if (this._material._rightEnvMap) {
      tryDisposeTexture(this._material._rightEnvMap);
    }
    if (this._localResource) {
      this._localResource.dispose();
    }
    super.dispose();
  }

  /**
   * Describes the properties representable by this view type and merges
   * with super type
   */
  static describe() {
    return merge(super.describe(), {
      // declare the native props sent from react to runtime
      NativeProps: {
        source: 'string',
      },
    });
  }
}
