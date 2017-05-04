/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

/**
 * RCTPano: runtime implementation of the <Pano source={{uri:URL}}>
 * creates a 1000 m radius globe that as a child of the view
 * view responds to layout and transforms with pivot point the center
 * of the view
 * @class RCTPano
 * @extends RCTBaseView
 */

import RCTBaseView from './BaseView';
import merge from '../Utils/merge';
import StereoOffsetRepeats from '../Utils/StereoOffsetRepeats';
import {HPanoBufferGeometry} from '../Utils/HPano';
import {CubePanoBufferGeometry} from '../Utils/CubePano';
import {RCTBindedResource} from '../Utils/RCTBindedResource';
import * as OVRUI from 'ovrui';
import * as THREE from 'three';
import * as Yoga from '../Utils/Yoga.bundle';

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

export default class RCTPano extends RCTBaseView {
  /**
   * constructor: allocates the required resources and sets defaults
   */
  constructor(guiSys, rnctx) {
    super();

    this._sphereGeometry = new THREE.SphereGeometry(1000, 50, 50);
    this._cubeGeometry = new CubePanoBufferGeometry(2000, 3, 2, 1.01);
    this._material = new OVRUI.StereoBasicTextureMaterial({
      color: 'white',
      side: THREE.DoubleSide,
    });

    this._globe = new THREE.Mesh(this._sphereGeometry, this._material);
    this._globe.raycast = panoRayCast.bind(this._globe);
    this._globe.rotation.y = -Math.PI / 2;

    this.view = new OVRUI.UIView(guiSys);
    this.view.add(this._globe);
    this._localResource = new RCTBindedResource(rnctx.RCTResourceManager);
    this.globeOnUpdate = this.globeOnUpdate.bind(this);

    Object.defineProperty(this.props, 'source', {
      set: value => this.setSource(value),
    });
    // register a setter for the backgroundColor so the globe can be tinted
    Object.defineProperty(this.style, 'tintColor', {
      set: value => {
        const opacity = parseInt(value.toString(16).slice(0, 2), 16) / 255;
        this._material.color.set(value);
        this._material.opacity = opacity;
        this._material.transparent = opacity < 1;
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
      } else {
        this._globe.geometry = this._sphereGeometry;
        this._globe.scale.z = 1;
      }
      this._globe.onUpdate = null;
      // call onLoadStart in React
      this.UIManager._rnctx.callFunction('RCTEventEmitter', 'receiveEvent', [
        this.getTag(),
        'topLoadStart',
        [],
      ]);
      const loadRemoteTexture = (url, onLoad) => {
        // When a url is null or undefined, send undefined to onLoad callback
        const onError = () => onLoad(undefined);
        // No progress indication for now.
        const onProgress = undefined;
        if (url == null) {
          onError();
        } else if (Array.isArray(url)) {
          const loader = new THREE.CubeTextureLoader();
          loader.setCrossOrigin('Access-Control-Allow-Origin');
          loader.load(url, onLoad, onProgress, onError);
        } else {
          // Check in the prefetch cache first...
          const cachedTexture = Prefetch.getFromCache(url);
          if (cachedTexture != null) {
            onLoad(cachedTexture);
          } else {
            const loader = new THREE.TextureLoader();
            loader.setCrossOrigin('Access-Control-Allow-Origin');
            loader.load(url, onLoad, onProgress, onError);
          }
        }
      };
      const onLoadOrChange = texture => {
        // ignore a old request result
        if (value !== this._currentSource) {
          return;
        }
        this._globe.scale.x = -1;
        if (texture === undefined) {
          this._material.map = undefined;
          this._material.envMap = undefined;
        } else if (texture.type === 'MonoTextureInfo') {
          this._material.map = texture.texture;
          this._material.envMap = undefined;
        } else {
          const cubeTexture = texture.isCubeTexture ? texture : null;
          const flatTexture = texture.isCubeTexture ? null : texture;
          if (texture.isCubeTexture) {
            this._globe.scale.x = 1;
            texture.generateMipmaps = true;
          } else {
            texture.wrapS = THREE.ClampToEdgeWrapping;
            texture.wrapT = THREE.ClampToEdgeWrapping;
            texture.minFilter = THREE.LinearFilter;
          }
          this._material.map = flatTexture;
          this._material.envMap = cubeTexture;
        }
        const stereoFormat = value && value.stereo ? value.stereo : '2D';
        this._material.stereoOffsetRepeats = StereoOffsetRepeats[stereoFormat];
        if (!this._material.stereoOffsetRepeats) {
          console.warn(`Pano: stereo format '${stereoFormat}' not supported.`);
          // fallback to 2D
          this._material.stereoOffsetRepeats = StereoOffsetRepeats['2D'];
        }
        this._material.needsUpdate = true;

        // call onLoad in React
        if (this._material.map) {
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
      };

      this._currentSource = value;
      if (Array.isArray(value)) {
        if (value.length !== 6 || !value[0].uri) {
          console.warn(
            'Pano expected cubemap source in format [{uri: http..}, {uri: http..}, ... ]'
          );
          return;
        }
        const urls = value.map(function(x) {
          return x.uri;
        });
        this._localResource.unregister();
        loadRemoteTexture(urls, onLoadOrChange);
      } else {
        const url = value ? value.uri : null;
        if (this._localResource.isValidUrl(url)) {
          this._localResource.load(url, onLoadOrChange);
        } else {
          this._localResource.unregister();
          loadRemoteTexture(url, onLoadOrChange);
        }
      }
    }
  }

  presentLayout() {
    super.presentLayout();
    this._globe.visible = this.YGNode.getDisplay() !== Yoga.DISPLAY_NONE;
  }

  /**
   * Dispose of any associated resources
   */
  dispose() {
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
