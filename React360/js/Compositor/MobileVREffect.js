/**
 * 普通移动设备的VR模式
 */

// import THREE from '../ThreeShim';


import * as THREE from 'three';
import { Scene, Camera } from 'three';

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
  originalSize: { width: number, height: number };
  renderer: any;
  rightBounds: [number, number, number, number];

  constructor(renderer: any) {
    this.renderer = renderer;
    this.leftBounds = DEFAULT_LEFT_BOUNDS;
    this.rightBounds = DEFAULT_RIGHT_BOUNDS;

    this.originalSize = renderer.getSize();
    this.originalPixelRatio = renderer.getPixelRatio();
    this.isPresenting = false;
  }

  _configureRenderer() {
    this.renderer.setPixelRatio(1);
    this.renderer.setSize(
      leftParams.renderWidth + rightParams.renderWidth,
      Math.min(leftParams.renderHeight, rightParams.renderHeight),
      false
    );
  }

  requestPresent() {
    this.isPresenting = true;
    return Promise.resolve();
  }

  exitPresent() {
    this.isPresenting = false;
    return Promise.resolve();
  }

  setSize(width: number, height: number) {
    this.originalSize = { width, height };
    if (this.isPresenting) {
      this._configureRenderer();
    } else {
      this.renderer.setPixelRatio(this.originalPixelRatio);
      this.renderer.setSize(width, height, false);
    }
  }

  getEyeParameters(direction: string) {
    const size = this.renderer.getSize();
    if (direction === 'left') {
      const leftRect = {
        x: Math.round(size.width * this.leftBounds[0]),
        y: Math.round(size.height * this.leftBounds[1]),
        renderWidth: Math.round(size.width * this.leftBounds[2]),
        renderHeight: Math.round(size.height * this.leftBounds[3]),
      };
      return leftRect;
    } else if (direction === 'right') {
      const rightRect = {
        x: Math.round(size.width * this.rightBounds[0]),
        y: Math.round(size.height * this.rightBounds[1]),
        renderWidth: Math.round(size.width * this.rightBounds[2]),
        renderHeight: Math.round(size.height * this.rightBounds[3]),
      };
      return rightRect;
    }
  }

  render(scene: Scene, camera: Camera) {
    if (this.isPresenting) {
      // Temporarily turn off automatic updates
      const preserveAutoUpdate = scene.autoUpdate;
      if (preserveAutoUpdate) {
        scene.updateMatrixWorld();
        scene.autoUpdate = false;
      }

      const size = this.renderer.getSize();
      // const size = this.originalSize;
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
    }
  }
}
