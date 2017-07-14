/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

/**
 * @class RCTCylindricalPanel
 * @extends RCTBaseView
 */

import RCTBaseView from './BaseView';
import merge from '../Utils/merge';
import * as OVRUI from 'ovrui';
import * as THREE from 'three';
import * as Yoga from '../Utils/Yoga.bundle';

export default class RCTCylindricalPanel extends RCTBaseView {
  /**
   * constructor: allocates the required resources and sets defaults
   */
  constructor(guiSys) {
    super();

    this.material = new THREE.MeshBasicMaterial({
      wireframe: false,
      transparent: true,
      premultipliedAlpha: true,
      color: 'white',
      side: THREE.DoubleSide,
      depthWrite: false,
      blending: THREE.CustomBlending,
      blendSrc: THREE.OneFactor,
      blendDst: THREE.OneMinusSrcAlphaFactor,
      blendEquation: THREE.AddEquation,
      blendSrcAlpha: THREE.OneFactor,
      blendDstAlpha: THREE.OneMinusSrcAlphaFactor,
      blendEquationAlpha: THREE.AddEquation,
    });

    this.guiSys = guiSys;
    this.camera = new THREE.OrthographicCamera();
    this.subScene = new THREE.Scene();
    const geometry = new THREE.CylinderGeometry(3, 3, 2, 1, 5, true, 0, 2.0 * Math.PI);
    this.cylinder = new THREE.Mesh(geometry, this.material);
    this.cylinder.subScene = this.subScene;
    this.cylinder.subSceneCamera = this.camera;
    this.cylinder.scale.z = -1;
    this.view = new OVRUI.UIView(guiSys);
    this.view.add(this.cylinder);

    this.subScene.scale.y = -1;
    this.isLayer = true;

    Object.defineProperty(this.style, 'opacity', {
      configurable: true,
      set: value => {
        this.material.opacity = value;
      },
    });

    Object.defineProperty(this.props, 'layer', {
      set: value => {
        this.props._layerWidth = value.width;
        this.props._layerHeight = value.height;
        this.props._layerDensity = value.density;
        // default distance to 3m
        this.props._layerRadius = value.radius || 3;
        this.view.zOffset = this.props._layerRadius;
        this.subScene._rttWidth = value.width;
        this.subScene._rttHeight = value.height;
        this.cylinder.geometry.dispose();
        // The subtended angle given the fraction of the layer (layerDensity) covered by the
        // layerWidth
        const delta = 2 * Math.PI * this.props._layerWidth / this.props._layerDensity;
        // The same calculation as shell
        // there is not a direct correlation but for a small angle (<60) the arc of the cylinder
        // is also a reasonable approximation of the chord (within 95%)
        // as our angle is small and dealing with px height rather than angles a proportion of an arc
        // is used
        const halfHeight =
          this.props._layerRadius * (Math.PI * value.height / this.props._layerDensity);
        this.cylinder.geometry = new THREE.CylinderGeometry(
          this.props._layerRadius,
          this.props._layerRadius,
          halfHeight * 2,
          60,
          6,
          true,
          -delta * 0.5,
          delta
        );
        this.cylinder.needsUpdate = true;
        this._createRTT();
      },
    });
  }

  _createRTT() {
    if (this.props._layerWidth > 0 && this.props._layerHeight > 0) {
      if (!this.rtt) {
        this.rtt = new THREE.WebGLRenderTarget(this.props._layerWidth, this.props._layerHeight, {
          minFilter: THREE.LinearFilter,
          magFilter: THREE.LinearFilter,
          format: THREE.RGBAFormat,
        });
      } else {
        this.rtt.setSize(this.props._layerWidth, this.props._layerHeight);
      }
      this.material.map = this.rtt.texture;
      this.material.needsUpdate = true;
      this.camera = new THREE.OrthographicCamera(
        0,
        this.props._layerWidth,
        0,
        this.props._layerHeight,
        -1000,
        1000
      );
      this.camera.setViewOffset(
        this.props._layerWidth,
        this.props._layerHeight,
        0,
        0,
        this.props._layerWidth,
        this.props._layerHeight
      );
      this.cylinder.subSceneCamera = this.camera;
      this.guiSys.unregisterOffscreenRender(this.offscreenUID);
      this.offscreenUID = this.guiSys.registerOffscreenRender(this.subScene, this.camera, this.rtt);
    }
  }

  addChild(index, child) {
    this.children.splice(index, 0, child);
    this.YGNode.insertChild(child.YGNode, index);
    this.subScene.add(child.view);
  }

  removeChild(index) {
    this.subScene.remove(this.children[index].view);
    this.YGNode.removeChild(this.YGNode.getChild(index));
    this.children.splice(index, 1);
  }

  presentLayout() {
    super.presentLayout();
    this.cylinder.visible = this.YGNode.getDisplay() !== Yoga.DISPLAY_NONE;
  }

  dispose() {
    this.guiSys.unregisterOffscreenRender(this.offscreenUID);
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
        layer: 'object',
      },
    });
  }
}
