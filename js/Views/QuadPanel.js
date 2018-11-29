/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

/**
 * @class RCTQuadPanel
 * @extends RCTBaseView
 */

import * as THREE from 'three';
import UIView from '../OVRUI/UIView/UIView';
import merge from '../Utils/merge';
import * as Flexbox from '../Renderer/FlexboxImplementation';
import RCTBaseView from './BaseView';

export default class RCTQuadPanel extends RCTBaseView {
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
    const geometry = new THREE.PlaneGeometry(1, 1, 1, 1);
    this.plane = new THREE.Mesh(geometry, this.material);
    this.plane.subScene = this.subScene;
    this.plane.subSceneCamera = this.camera;
    this.plane.scale.z = -1;
    this.view = new UIView(guiSys);
    this.view.add(this.plane);

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
        // default distance to 4m
        this.props._layerDistance = value.distance || 4;
        this.subScene._rttWidth = value.width;
        this.subScene._rttHeight = value.height;
        this.plane.geometry.dispose();
        // The same calculation as shell
        // there is not a direct correlation but for a small angle (<60) the arc
        // is also a reasonable approximation of the chord (within 95%)
        // as our angle is small and dealing with px height rather than angles a proportion of an arc
        // is used
        const halfWidth =
          this.props._layerDistance *
          (Math.PI * value.width / this.props._layerDensity);
        const halfHeight =
          this.props._layerDistance *
          (Math.PI * value.height / this.props._layerDensity);
        this.plane.geometry = new THREE.PlaneGeometry(
          halfWidth * 2,
          halfHeight * 2,
          1,
          1,
        );
        this.plane.needsUpdate = true;
        this._createRTT();
      },
    });
  }

  _createRTT() {
    if (this.props._layerWidth > 0 && this.props._layerHeight > 0) {
      if (!this.rtt) {
        this.rtt = new THREE.WebGLRenderTarget(
          this.props._layerWidth,
          this.props._layerHeight,
          {
            minFilter: THREE.LinearFilter,
            magFilter: THREE.LinearFilter,
            format: THREE.RGBAFormat,
          },
        );
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
        1000,
      );
      this.camera.setViewOffset(
        this.props._layerWidth,
        this.props._layerHeight,
        0,
        0,
        this.props._layerWidth,
        this.props._layerHeight,
      );
      this.plane.subSceneCamera = this.camera;
      this.guiSys.unregisterOffscreenRender(this.offscreenUID);
      this.offscreenUID = this.guiSys.registerOffscreenRender(
        this.subScene,
        this.camera,
        this.rtt,
      );
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
    this.plane.visible = this.YGNode.getDisplay() !== Flexbox.DISPLAY_NONE;
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
