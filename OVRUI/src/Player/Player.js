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

import AppControls from '../Control/AppControls';
import {attemptOculusPlayer} from './OculusPlayer';
import Overlay from './Overlay';
import THREE from '../ThreeShim';
import setStyles from './setStyles';
import VREffect from '../Control/VREffect';

import type {Camera, Scene, Vector3, WebGLRenderer} from 'three';
import type {AppControlsOptions} from '../Control/AppControls';

type PlayerOptions = {
  allowCarmelDeeplink?: boolean,
  antialias?: boolean,
  calculateVerticalFOV?: (number, number) => number,
  camera?: Camera,
  canvasAlpha?: boolean,
  disableTouchPanning?: boolean,
  elementOrId?: string | Element,
  height?: number,
  hideCompass?: boolean,
  hideFullscreen?: boolean,
  onEnterVR?: () => void,
  onExitVR?: () => void,
  pixelRatio?: number,
  width?: number,
};

const isMobile = /Mobi/i.test(navigator.userAgent);
const isAndroid = /Android/i.test(navigator.userAgent);
const isSamsung = isAndroid && /SM-[GN]/i.test(navigator.userAgent);
let fullscreenEvent = 'fullscreenchange';
if (!('onfullscreenchange' in document)) {
  if ('onwebkitfullscreenchange' in document) {
    fullscreenEvent = 'webkitfullscreenchange';
  } else if ('onmozfullscreenchange' in document) {
    fullscreenEvent = 'mozfullscreenchange';
  } else if ('onmsfullscreenchange' in document) {
    fullscreenEvent = 'msfullscreenchange';
  }
}

function isVRBrowser() {
  return 'VRDisplay' in window;
}

const FALLBACK_STYLES = {
  backgroundColor: '#000000',
  cursor: 'not-allowed',
  position: 'relative',
};
const FALLBACK_MESSAGE_STYLES = {
  background: 'rgba(0, 0, 0, 0.7)',
  border: '2px solid #ffffff',
  borderRadius: '5px',
  color: '#ffffff',
  fontFamily: 'Helvetica, Arial, sans-serif',
  fontSize: '16px',
  fontWeight: 'normal',
  left: '50%',
  padding: '10px',
  position: 'absolute',
  textAlign: 'center',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  width: '190px',
};

/**
 * Detect if WebGL is supported and enabled by the current browser
 */
function isWebGLSupported() {
  const canvas = document.createElement('canvas');
  let gl = null;
  try {
    gl = canvas.getContext('webgl');
  } catch (e) {}
  if (gl) {
    return true;
  }
  try {
    // IE exposes WebGL 1.0 via 'experimental-webgl'
    gl = canvas.getContext('experimental-webgl');
  } catch (e) {}
  return !!gl;
}

function isMobileInLandscapeOrientation() {
  // functionality required for mobile only
  if (!isMobile) {
    return false;
  }

  // use draft screen.orientation type to determine if mobile is landscape orientation
  const orientation = screen.orientation || screen.mozOrientation || (screen: any).msOrientation;
  if (orientation) {
    if (orientation.type === 'landscape-primary' || orientation.type === 'landscape-secondary') {
      return true;
    } else if (
      orientation.type === 'portrait-secondary' ||
      orientation.type === 'portrait-primary'
    ) {
      return false;
    }
  }

  // fall back to window.orientation
  if (!window.orientation) {
    return false;
  }
  let quadrant = Math.round(window.orientation / 90);
  while (quadrant < 0) {
    quadrant += 4;
  }
  while (quadrant >= 4) {
    quadrant -= 4;
  }
  return quadrant === 1 || quadrant === 3;
}

/**
 * A Player wraps most of the boilerplate of setting up an embedded VR
 * experience. It constructs a Three.js renderer, and attaches it to the
 * supplied DOM node. It also takes a Camera, which it orients via controls
 * that are enhanced for the current viewing platform. It has a method to
 * render a Three.js scene. If a DOM node or camera are not provided,
 * default values are used.
 */
export default class Player {
  allowCarmelDeeplink: boolean;
  calculateVerticalFOV: ?(number, number) => number;
  controlOptions: AppControlsOptions;
  controls: AppControls;
  effect: ?VREffect;
  fixedPixelRatio: boolean;
  frameData: ?VRFrameData;
  glRenderer: WebGLRenderer;
  height: number;
  isMobile: boolean;
  onEnterVR: ?() => void;
  onExitVR: ?() => void;
  overlay: Overlay;
  pixelRatio: number;
  vrDisplay: ?VRDisplay;
  width: number;
  _camera: Camera;
  _compass: Vector3;
  _el: Element;
  _initialAngles: {x: number, y: number, z: number};
  _lastAngle: number;
  _resizeHandler: ?() => void;
  _wrapper: HTMLDivElement;

  /**
   * Set up the DOM wrapper for a player, as well as the Three.js Renderer
   * and camera controls, and attach them to the specified place in the DOM.
   * Creates a default camera if none is provided.
   * @param options - An optional set of configuration values:
   *   disableTouchPanning: disable touch to pan camera on mobile. Defaults to false.
   *   elementOrId: the DOM location to mount the player. Can either be a DOM
   *   node, or the string id of a DOM node. Defaults to document.body
   *   camera: A Three.js Camera, to be used with the 3d renderer.
   *   antialias: Enable antialiasing on the WebGLRenderer. Default is true.
   *   width: the width of the player, defaults to the width of the container
   *   height: the height of the player, defaults to the height of the container
   *   pixelRatio: the pixelRatio of device, defaults to window.devicePixelRatio
   */
  constructor(options: PlayerOptions = {}) {
    // Autobind event handlers
    (this: any).attemptEnterVR = this.attemptEnterVR.bind(this);
    (this: any).attemptEnterFullscreen = this.attemptEnterFullscreen.bind(this);
    (this: any).enterVR = this.enterVR.bind(this);
    (this: any).exitVR = this.exitVR.bind(this);
    (this: any).handleFullscreenChange = this.handleFullscreenChange.bind(this);
    (this: any).resetAngles = this.resetAngles.bind(this);

    this.isMobile = isMobile;
    this.allowCarmelDeeplink = !!options.allowCarmelDeeplink && isSamsung;
    this.calculateVerticalFOV = options.calculateVerticalFOV;

    // Options passed to AppControls contructor.
    this.controlOptions = {disableTouchPanning: !!options.disableTouchPanning};

    let width = options.width;
    let height = options.height;
    let pixelRatio = options.pixelRatio;
    let el;
    if (typeof options.elementOrId === 'string') {
      const id = options.elementOrId;
      const elementById = document.getElementById(id);
      if (!elementById) {
        throw new Error('No DOM element with id: ' + id);
      }
      el = elementById;
    } else {
      el = options.elementOrId;
    }
    const camera = options.camera;

    // If container not specified, default to full window.
    if (!el) {
      const body = document.body;
      if (!body) {
        throw new Error('Cannot automatically attach the Player to a document with no body');
      }
      el = body;
    }
    this._el = el;
    // If height and width are not provided, detect them from the container.
    let fixedSize = true;
    if (!width) {
      if (this._el === document.body) {
        fixedSize = false;
        width = window.innerWidth;
      } else {
        width = this._el.clientWidth;
      }
    }
    if (!height) {
      if (this._el === document.body) {
        fixedSize = false;
        height = window.innerHeight;
      } else {
        height = this._el.clientHeight;
      }
    }
    if (!pixelRatio) {
      this.fixedPixelRatio = false;
      pixelRatio = window.devicePixelRatio || 1;
    } else {
      this.fixedPixelRatio = true;
    }

    // After adjusting our player sized for a container element, update our canvas size.
    this.width = width;
    this.height = height;
    this.pixelRatio = pixelRatio;

    // If we our size was not explicitly specified and we are contained within the body
    // of the document, then attach a listener to detect window resizes to update our canvas size.
    // Our body check is redundant but in place to protect against future code changes that
    // might change our assumptions about the relation of fixedSize and our container.
    if (!fixedSize && this._el === document.body) {
      this.addResizeHandler();
    }

    // If no camera given, use default Three.js setup.
    if (camera) {
      this._camera = camera;
    } else {
      // Use a single eye camera with a normal FoV but set the depthNear/depthFar
      // based on our spec defaults to prevent browser renders differing from our
      // VRDisplay renders.
      let fov;
      if (isMobileInLandscapeOrientation()) {
        // clamp range of fov to be reasonable
        fov = Math.max(30, Math.min(70, 60 / (width / height)));
      } else {
        fov = 60;
      }
      if (typeof this.calculateVerticalFOV === 'function') {
        fov = this.calculateVerticalFOV(width, height);
      }
      this._camera = new THREE.PerspectiveCamera(fov, width / height, 0.01, 10000.0);
    }
    this._initialAngles = {
      x: this._camera.rotation.x,
      y: this._camera.rotation.y,
      z: this._camera.rotation.z,
    };
    this._lastAngle = this._camera.rotation.y;

    if (!isWebGLSupported()) {
      // If WebGL isn't supported, don't try to build the player
      this.renderFallback(width, height);
      return this;
    }

    // Set up the Three.js basics: renderer, camera, controls
    const antialias = options.hasOwnProperty('antialias') ? options.antialias : true;
    const alpha = options.hasOwnProperty('canvasAlpha') ? options.canvasAlpha : true;
    const renderer: WebGLRenderer = new THREE.WebGLRenderer({
      antialias: antialias,
      alpha: alpha,
    });
    renderer.setPixelRatio(pixelRatio);
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000);
    this.glRenderer = renderer;
    this.controls = new AppControls(this._camera, this.glRenderer.domElement, this.controlOptions);
    this.onEnterVR = options.onEnterVR;
    this.onExitVR = options.onExitVR;

    // Create an Overlay, which places some interactive controls on top of
    // the rendering canvas
    const overlay = new Overlay({
      vrButtonHandler: this.attemptEnterVR,
      fullscreenButtonHandler: this.attemptEnterFullscreen,
      hideCompass: options.hideCompass,
      hideFullscreen: options.hideFullscreen,
      resetAngles: this.resetAngles,
    });
    this.overlay = overlay;
    if (isVRBrowser() || this.allowCarmelDeeplink) {
      this.overlay.enableVRButton();
    }

    // Create a wrapper containing the canvas and the overlay
    const wrapper = document.createElement('div');
    this._wrapper = wrapper;
    setStyles(wrapper, {
      width: width + 'px',
      height: height + 'px',
      position: 'relative',
      cursor: 'grab',
    });
    if (wrapper.style.cursor === '') {
      wrapper.style.cursor = '-webkit-grab';
      if (wrapper.style.cursor === '') {
        wrapper.style.cursor = '-moz-grab';
      }
    }
    wrapper.appendChild(overlay.domElement);
    wrapper.appendChild(renderer.domElement);

    // Attach the player to the DOM
    this._el.appendChild(wrapper);

    // Hide the gyro glyph when the user first interacts with the player
    const hideAndCleanUp = () => {
      wrapper.removeEventListener('mouseover', hideAndCleanUp);
      wrapper.removeEventListener('touchstart', hideAndCleanUp);
      this.overlay.hideGyro();
    };
    wrapper.addEventListener('mouseover', hideAndCleanUp);
    wrapper.addEventListener('touchstart', hideAndCleanUp);
    if (isMobile) {
      // If it's mobile, we may not get any direct touches, so hide the gyro
      // after some delay
      setTimeout(hideAndCleanUp, 4000);
    }
    this._compass = new THREE.Vector3();

    // Create a buffer for recording VRFrameData, if supported
    this.frameData = null;
    if ('VRFrameData' in window) {
      this.frameData = new VRFrameData();
    }

    // If the VR device is capable of telling the browser that it has been
    // activated (put on someone's head), we use this as a secondary
    // enter/exit scheme in addition to the button on the Overlay
    window.addEventListener('vrdisplayactivate', this.enterVR);
    window.addEventListener('vrdisplaydeactivate', this.exitVR);
    // Detect any VR displays, so that we can pick the proper rAF and render
    if ('getVRDisplays' in navigator) {
      (navigator: any)
        .getVRDisplays()
        .then(displays => {
          if (displays.length) {
            const display = displays[0];
            this.vrDisplay = display;
            this.controls.setVRDisplay(display);
            const effect = new VREffect(this.glRenderer, display);
            this.effect = effect;
            const size = renderer.getSize();
            effect.setSize(size.width, size.height);
            this.onEnterVR && this.onEnterVR();
            // Attempt to immediately present on devices that don't have input
            return effect.requestPresent();
          }
        })
        .catch(err => {
          this.onExitVR && this.onExitVR();
          // Silence the permissions error, it's typically expected
        });
    }
  }

  /**
   * When WebGL is unsupported or disabled, render an error message.
   * @param width - The width of the parent container
   * @param height - The height of the parent container
   */
  renderFallback(width: number, height: number) {
    const fallback = document.createElement('div');
    setStyles(fallback, FALLBACK_STYLES);
    setStyles(fallback, {
      width: width + 'px',
      height: height + 'px',
    });
    const message = document.createElement('div');
    message.appendChild(document.createTextNode('The current browser does not support WebGL.'));
    setStyles(message, FALLBACK_MESSAGE_STYLES);
    fallback.appendChild(message);
    this._el.appendChild(fallback);
  }

  /**
   * Perform per-frame updates. Should be called within the animation loop.
   * Distinct from render() so app can do its own operations after the
   * camera is updated but before the scene is rendered, for example update
   * a gaze cursor.
   */
  frame() {
    const frameOptions = {};
    if (this.frameData && this.vrDisplay && this.vrDisplay.isPresenting) {
      this.vrDisplay.getFrameData(this.frameData);
      frameOptions.frameData = this.frameData;
    }
    this.controls.frame(frameOptions);

    // Force update of camera local transform (camera.matrix) and recompute
    // global transform (camera.matrixWorld) since controls may have updated
    // camera position/rotation and guiSys needs the new value for hit-testing.
    this._camera.updateMatrixWorld(true);

    // Only update the compass if we're not in the headset on mobile
    if (!(this.vrDisplay && this.vrDisplay.isPresenting && isMobile)) {
      this._compass.set(1, 0, 0);
      this._compass.applyQuaternion(this._camera.quaternion);
      const rotationY = Math.acos(this._compass.x) * -Math.sign(this._compass.z);
      if (rotationY !== this._lastAngle) {
        this._lastAngle = rotationY;
        this.overlay.setCompassAngle(this._lastAngle);
      }
    }
  }

  _renderUpdate(node: any, scene: Scene, camera: Camera) {
    node.onUpdate && node.onUpdate(scene, camera);
    for (const child of node.children) {
      this._renderUpdate(child, scene, camera);
    }
  }

  /**
   * Called by the user to render a frame to the canvas.
   * Ideally, it should be called on a rAF loop.
   * @param scene - A Three.js Scene to be rendered
   */
  render(scene: Scene) {
    this._renderUpdate(scene, scene, this._camera);
    if (this.effect && this.frameData && this.vrDisplay && this.vrDisplay.isPresenting) {
      this.effect.render(scene, this._camera, this.frameData);
      if (!isMobile) {
        // This render is used to mirror the output to the onscreen
        // canvas which is useful for debugging on non-mobile devices.
        this._renderMonoCamera(scene);
      }
    } else {
      // This render is our fallback when not in VR and renders the
      // left eye to the onscreen canvas.
      this._renderMonoCamera(scene);
    }
  }

  renderOffscreen(scene: Scene, camera: Camera, target: Element) {
    this._renderUpdate(scene, scene, camera);
    const oldClearColor = this.glRenderer.getClearColor();
    const oldClearAlpha = this.glRenderer.getClearAlpha();
    const oldSort = this.glRenderer.sortObjects;
    const oldClipping = this.glRenderer.localClippingEnabled;
    this.glRenderer.localClippingEnabled = true;
    this.glRenderer.setClearColor('#000', 0);
    this.glRenderer.sortObjects = false;
    this.glRenderer.render(scene, camera, target, true);
    this.glRenderer.sortObjects = oldSort;
    this.glRenderer.setClearColor(oldClearColor, oldClearAlpha);
    this.glRenderer.setRenderTarget(null);
    this.glRenderer.localClippingEnabled = oldClipping;
  }

  /**
   * Used to prepare the resources necessary to render the
   * single eye view. This assumes that the single eye will
   * be the left eye.
   * @param scene - A Three.js Scene to render with the default mono camera.
   */
  _renderMonoCamera(scene: Scene) {
    // The scene may have a background already, save it and restore it since
    // the Scene object is supplied by the author.
    const backupScene = scene.background;
    // Our convention allows a left and right background to enable stereoscopic
    // cube maps or equirect rendering. Select the left background when rendering
    // only a single eye.
    if (scene.backgroundLeft) {
      scene.background = scene.backgroundLeft;
    }
    this.glRenderer.render(scene, this._camera);
    scene.background = backupScene;
  }

  /**
   * Picks the correct rAF function, depending on which device is currently
   * displaying content.
   * @param fn - A function to call on the next frame
   * @return A rAF handle that can be canceled
   */
  requestAnimationFrame(fn: () => any) {
    if (this.vrDisplay) {
      return this.vrDisplay.requestAnimationFrame(fn);
    }
    return window.requestAnimationFrame(fn);
  }

  /**
   * Request to present to the display, via the VR effect
   */
  enterVR() {
    if (!this.vrDisplay || !this.effect) {
      return Promise.reject('Cannot enter VR, no display detected');
    }
    return this.effect
      .requestPresent()
      .then(
        () => {
          this.onEnterVR && this.onEnterVR();
          this.overlay.setVRButtonText('Exit VR');
          this.overlay.setVRButtonHandler(this.exitVR);
        },
        err => {
          console.error(err);
        }
      );
  }

  /**
   * Stop presenting to the display.
   */
  exitVR(): Promise<void> {
    if (!this.vrDisplay || !this.vrDisplay.isPresenting || !this.effect) {
      return Promise.reject('Cannot exit, not currently presenting');
    }
    return this.effect.exitPresent().then(
      () => {
        this.onExitVR && this.onExitVR();
        this.overlay.setVRButtonText('View in VR');
        this.overlay.setVRButtonHandler(this.attemptEnterVR);
      },
      err => {
        console.error(err);
      }
    );
  }

  /**
   * Try mutiple methods to get the user into a VR browser.
   * If the current browser is WebVR-enabled and a display is , it will call the onEnterVR
   * callback provided at construction.
   * If there is a WebVR browser installed that is registered to handle
   * ovrweb: protocol links, it will try to open that browser.
   * Otherwise, it will display a message about supported VR devices.
   */
  attemptEnterVR() {
    if (isVRBrowser() && this.vrDisplay) {
      console.log('Entering VR');
      this.enterVR().then(
        () => {
          // Succeeded
          console.log('Presenting to VR Display');
        },
        err => {
          console.error('Failed to present. Is another application is already using the display?');
        }
      );
    } else if (this.allowCarmelDeeplink) {
      console.log('Attempting Oculus Browser');
      // Disable the button, so we only make one protocol attempt at a time
      this.overlay.disableVRButton();
      attemptOculusPlayer().then(
        () => {
          // On success, re-enable the button for when the user comes back
          this.overlay.enableVRButton();
        },
        () => {
          console.log('No VR support!');
          this.overlay.enableVRButton();
          this.overlay.showSupportMessage();
        }
      );
    }
  }

  /**
   * Attempt to enter fullscreen mode using the prefixed method passed to the
   * handler.
   */
  attemptEnterFullscreen(fullscreenMethod: string) {
    document.addEventListener(fullscreenEvent, this.handleFullscreenChange);
    const canvas: any = this.glRenderer.domElement;
    if (typeof canvas[fullscreenMethod] === 'function') {
      canvas[fullscreenMethod]();
    }
  }

  /**
   * Triggered when the fullscreen state changes. If the fullscreen element is
   * the rendering canvas, that means fullscreen was entered successfully, and
   * the canvas and camera are resized. If the fullscreen element is void, that
   * means fullscreen was exited and the sizes are reset.
   */
  handleFullscreenChange() {
    const element =
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement ||
      (document: any).msFullscreenElement;
    if (element === this.glRenderer.domElement) {
      // Entered fullscreen mode
      this.resize(window.innerWidth, window.innerHeight);
    } else if (!element) {
      // Exited fullscreen mode
      this.resize(this.width, this.height);
      document.removeEventListener(fullscreenEvent, this.handleFullscreenChange);
    }
  }

  /**
   * resize the player, adjusting the viewport and css sizes of components, and
   * updating the aspect ratio of the camera.
   */
  resize(width: number, height: number) {
    if (this.glRenderer && this._camera) {
      this._wrapper.style.width = width + 'px';
      this._wrapper.style.height = height + 'px';
      if (!this.fixedPixelRatio) {
        this.pixelRatio = window.devicePixelRatio || 1;
      }
      this.glRenderer.setPixelRatio(this.pixelRatio);
      this.glRenderer.setSize(width, height, true);
      let fov;
      if (isMobileInLandscapeOrientation()) {
        // clamp the range of fov
        fov = Math.max(30, Math.min(70, 60 / (width / height)));
      } else {
        fov = 60;
      }
      if (typeof this.calculateVerticalFOV === 'function') {
        fov = this.calculateVerticalFOV(width, height);
      }
      this._camera.fov = fov;
      this._camera.aspect = width / height;
      this._camera.updateProjectionMatrix();
    }
  }

  /**
   * Add a throttled event handler to window's resize listener. When the window
   * size changes, the player is adjusted to match. This handler is
   * automatically attached when the parent of the player is the body tag.
   */
  addResizeHandler() {
    let last = 0;
    let timer = null;
    const delay = 100;
    // Throttled window resize handler
    this._resizeHandler = () => {
      if (this.vrDisplay && this.vrDisplay.isPresenting) {
        return;
      }
      const now = Date.now();
      if (!last) {
        last = now;
      }
      if (timer) {
        clearTimeout(timer);
      }
      if (now > last + delay) {
        last = now;
        this.resize(window.innerWidth, window.innerHeight);
        return;
      }
      timer = setTimeout(() => {
        last = now;
        this.resize(window.innerWidth, window.innerHeight);
      }, delay);
    };
    window.addEventListener('resize', this._resizeHandler);
  }

  /**
   * Clean up the window's resize handler
   */
  removeResizeHandler() {
    if (this._resizeHandler) {
      window.removeEventListener('resize', this._resizeHandler);
      this._resizeHandler = null;
    }
  }

  /**
   * Reset the camera angles to their initial position
   */
  resetAngles() {
    const {x, y, z} = this._initialAngles;
    this.controls.resetRotation(x, y, z);
  }

  // Get/Set camera needed so the default camera can be retrieved or adjusted.
  get camera(): Camera {
    return this._camera;
  }
  set camera(value: Camera) {
    this._camera = value;
    this._initialAngles = {
      x: value.rotation.x,
      y: value.rotation.y,
      z: value.rotation.z,
    };
    if (typeof this.controls.setCamera === 'function') {
      this.controls.setCamera(value);
    }
  }

  // Get renderer
  get renderer(): WebGLRenderer {
    return this.glRenderer;
  }
}
