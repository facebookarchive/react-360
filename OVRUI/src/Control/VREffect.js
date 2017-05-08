/**
 * Copyright (c) 2016-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @flow
 */

/**
 * Heavily inspired by VREffect by dmarcos and mrdoob
 * https://github.com/mrdoob/three.js/
 *
 * This version relies on an external caller to handle the VR Display, and
 * removes a number of unneeded methods.
 */

import THREE from '../ThreeShim';

import type {Scene, Camera} from 'three';

const DEFAULT_LEFT_BOUNDS = [0.0, 0.0, 0.5, 1.0];
const DEFAULT_RIGHT_BOUNDS = [0.5, 0.0, 0.5, 1.0];
// Pre-allocate objects
const leftCamera = new THREE.PerspectiveCamera();
leftCamera.layers.enable(1);
leftCamera.viewID = 0;
const rightCamera = new THREE.PerspectiveCamera();
rightCamera.layers.enable(2);
rightCamera.viewID = 1;
const leftTranslation = new THREE.Vector3();
const rightTranslation = new THREE.Vector3();

export default class VREffect {
  leftBounds: [number, number, number, number];
  originalPixelRatio: number;
  originalSize: {width: number, height: number};
  renderer: any;
  rightBounds: [number, number, number, number];
  vrDisplay: VRDisplay;

  constructor(renderer: any, vrDisplay: VRDisplay) {
    this.renderer = renderer;
    this.vrDisplay = vrDisplay;
    this.leftBounds = DEFAULT_LEFT_BOUNDS;
    this.rightBounds = DEFAULT_RIGHT_BOUNDS;

    this.originalSize = renderer.getSize();
    this.originalPixelRatio = renderer.getPixelRatio();
  }

  // Given a vrDisplay object, configure the render buffers based on the
  // current eye parameters.
  // CONSIDER: Taking into account a scaling factor for graceful degrade
  // of the eye buffer size for hitting frame rate.
  _configureRendererForVRDisplay() {
    const leftParams = this.vrDisplay.getEyeParameters('left');
    const rightParams = this.vrDisplay.getEyeParameters('right');

    this.renderer.setPixelRatio(1);
    this.renderer.setSize(
      leftParams.renderWidth + rightParams.renderWidth,
      Math.min(leftParams.renderHeight, rightParams.renderHeight),
      false
    );
  }

  requestPresent() {
    if (!this.vrDisplay) {
      return Promise.reject();
    }
    if (this.vrDisplay.isPresenting) {
      // Already presenting
      return Promise.resolve();
    }
    return this.vrDisplay
      .requestPresent([
        {
          source: this.renderer.domElement,
        },
      ])
      .then(() => {
        this._configureRendererForVRDisplay();
      });
  }

  exitPresent() {
    if (!this.vrDisplay) {
      // If there is no display, exiting should be seen as "successful,"
      // since it leaves us in the same expected state
      return Promise.resolve();
    }
    if (!this.vrDisplay.isPresenting) {
      // Already exited
      return Promise.resolve();
    }

    return this.vrDisplay.exitPresent().then(() => {
      this.renderer.setPixelRatio(this.originalPixelRatio);
      this.renderer.setSize(this.originalSize.width, this.originalSize.height, false);
    });
  }

  setSize(width: number, height: number) {
    this.originalSize = {width, height};

    if (this.vrDisplay && this.vrDisplay.isPresenting) {
      this._configureRendererForVRDisplay();
    } else {
      this.renderer.setPixelRatio(this.originalPixelRatio);
      this.renderer.setSize(width, height, false);
    }
  }

  render(scene: Scene, camera: Camera, frameData: VRFrameData) {
    if (this.vrDisplay && this.vrDisplay.isPresenting) {
      // Temporarily turn off automatic updates
      const preserveAutoUpdate = scene.autoUpdate;
      if (preserveAutoUpdate) {
        scene.updateMatrixWorld();
        scene.autoUpdate = false;
      }

      const leftParams = this.vrDisplay.getEyeParameters('left');
      leftTranslation.fromArray(leftParams.offset);
      const rightParams = this.vrDisplay.getEyeParameters('right');
      rightTranslation.fromArray(rightParams.offset);

      const size = this.renderer.getSize();
      const leftRect = {
        x: Math.round(size.width * this.leftBounds[0]),
        y: Math.round(size.height * this.leftBounds[1]),
        width: Math.round(size.width * this.leftBounds[2]),
        height: Math.round(size.height * this.leftBounds[3]),
      };
      const rightRect = {
        x: Math.round(size.width * this.rightBounds[0]),
        y: Math.round(size.height * this.rightBounds[1]),
        width: Math.round(size.width * this.rightBounds[2]),
        height: Math.round(size.height * this.rightBounds[3]),
      };

      this.renderer.setScissorTest(true);

      if (this.renderer.autoClear) {
        this.renderer.clear();
      }

      if (!camera.parent) {
        camera.updateMatrixWorld();
      }

      camera.matrixWorld.decompose(leftCamera.position, leftCamera.quaternion, leftCamera.scale);
      camera.matrixWorld.decompose(rightCamera.position, rightCamera.quaternion, rightCamera.scale);

      leftCamera.translateOnAxis(leftTranslation, 1);
      rightCamera.translateOnAxis(rightTranslation, 1);

      leftCamera.projectionMatrix.elements = frameData.leftProjectionMatrix;
      rightCamera.projectionMatrix.elements = frameData.rightProjectionMatrix;

      // Prepare the scene backgrounds for each eye if ready
      const backupScene = scene.background;
      // Only allow stereo background rendering if both backgrounds have been set
      // otherwise the user will see the background in only one eye.
      const isStereoBackgroundReady = !!scene.backgroundLeft && !!scene.backgroundRight;

      // Swap in our left eye background if both backgrounds are ready
      if (isStereoBackgroundReady) {
        scene.background = scene.backgroundLeft;
      }
      // Set up the left eye viewport and scissor then render the left eye
      this.renderer.setViewport(leftRect.x, leftRect.y, leftRect.width, leftRect.height);
      this.renderer.setScissor(leftRect.x, leftRect.y, leftRect.width, leftRect.height);
      this.renderer.render(scene, leftCamera);

      // Swap in our right eye background if both backgrounds are ready
      if (isStereoBackgroundReady) {
        scene.background = scene.backgroundRight;
      }
      // Set up the right eye viewport and scissor then render the right eye
      this.renderer.setViewport(rightRect.x, rightRect.y, rightRect.width, rightRect.height);
      this.renderer.setScissor(rightRect.x, rightRect.y, rightRect.width, rightRect.height);
      this.renderer.render(scene, rightCamera);

      // Reset the previous background
      scene.background = backupScene;

      // Reset viewport
      this.renderer.setViewport(0, 0, size.width, size.height);
      this.renderer.setScissorTest(false);

      // Restores the scene's autoupdate property
      if (preserveAutoUpdate) {
        scene.autoUpdate = true;
      }
      this.vrDisplay.submitFrame();
    }
  }
}
