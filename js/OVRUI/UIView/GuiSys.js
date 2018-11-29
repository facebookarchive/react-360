/**
 * Copyright (c) 2016-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

/*
 * GuiSys is a container and manager for the UI scene under a common Object3D guiRoot.
 * The objects role is to manage the interactions and distribute events to any listeners
 * this is handled by calling `frame` from a browser requestAnimationFrame event.
 *
 * GuiSys also manages the font which is intiialized separately and while a single font
 * is currently defined there is the feasiblity to add support more.
 *
 * GuiSys will also propagate the Opactiy of a UI element up the transform hierarchy,
 * this is the only 'style' that is propagated but it's addition allows a hierarchy of
 * UI elements to by faded in or out based on a root.
 *
 * The sorting of the view elements is customized and handled in frame through the use
 * of the `renderOrder` attribute on the Three.js Object3D. Any object marked as a renderGroup
 * is sorted at a new depth location otherwise objects use their closest parents depth.
 * Order of rendering for objects at the same computed depth is based on pre-traversal order
 */

import * as THREE from 'three';
import {loadFont} from '../SDFFont/SDFFont';
import {
  GuiSysEventType,
  GuiSysEvent,
  UIViewEventType,
  UIViewEvent,
} from './GuiSysEvent';

import {setParams} from './UIViewUtil';

const DEFAULT_Z_OFFSET_SCALE = 0.001;
const DEFAULT_CURSOR_DISTANCE = 2.0;
const DEFAULT_CURSOR_WIDTH = 0.025;
const RENDERSORT_DISTANCE_MULTIPLIER = 64;
const RENDERSORT_DISTANCE_SHIFT = 9;
const DEFAULT_TOUCH_RELEASE_DELAY = 300;

let frameUpdateUID = 0;

// Preallocate, to avoid rebuilding each frame
const raycaster = new THREE.Raycaster();
const rayCameraPos = new THREE.Vector3();
const rayCameraQuat = new THREE.Quaternion();

function matrixDistance(matrixA, matrixB) {
  const x = matrixA.elements[12] - matrixB.elements[12];
  const y = matrixA.elements[13] - matrixB.elements[13];
  const z = matrixA.elements[14] - matrixB.elements[14];
  return Math.sqrt(x * x + y * y + z * z);
}

function applyUpdates(node, currentOpacity, updateContext, index, clipRect) {
  // a render group is defined as a hierachy of node that are sorted on the same
  // distance key. Children of a rendergroup node are also sorted on the same distance
  // until another group is found
  // within each ground each node is rendered in pre-order
  if (node.renderGroup) {
    // calculate the distance from the camera to origin to node origin
    let dist = matrixDistance(
      node.matrixWorld,
      updateContext.camera.matrixWorld,
    );
    dist += node.zOffset || 0;
    index = updateContext.renderOrder;
    // UIViews always draw back to front due the potential of transparency within the background
    if (node.type === 'UIView') {
      dist = Math.max(0, updateContext.camera.far - dist);
    }
    // shift up the by 9 give 512 additional levels for each descretized depth
    updateContext.distances[index] =
      Math.floor(dist * RENDERSORT_DISTANCE_MULTIPLIER) <<
      RENDERSORT_DISTANCE_SHIFT;
  }

  updateContext.renderOrder++;
  node.renderOrder = updateContext.distances[index] + updateContext.renderOrder;

  if (node.type === 'UIView') {
    const worldClipRect = node.calcWorldClipRect();
    currentOpacity *= node.opacity;
    node.setClipPlanes(clipRect);
    node.applyUpdates(currentOpacity, updateContext);
    clipRect = [
      Math.max(clipRect[0], worldClipRect[0]),
      Math.max(clipRect[1], worldClipRect[1]),
      Math.min(clipRect[2], worldClipRect[2]),
      Math.min(clipRect[3], worldClipRect[3]),
    ];
  } else if (node.type === 'SDFText') {
    node.textClip[0] = clipRect[0];
    node.textClip[1] = clipRect[1];
    node.textClip[2] = clipRect[2];
    node.textClip[3] = clipRect[3];
  }
  for (const i in node.children) {
    applyUpdates(
      node.children[i],
      currentOpacity,
      updateContext,
      index,
      clipRect,
    );
  }
}

function updateBillboard(node, updateContext) {
  if (node.type === 'UIView' && node.billboarding === 'on') {
    node.updateBillboard(updateContext);
  }
  for (const i in node.children) {
    updateBillboard(node.children[i], updateContext);
  }
}

function intersectObject(object, raycaster, intersects) {
  if (object.visible === false) {
    return;
  }
  object.raycast(raycaster, intersects);
  const children = object.children;
  for (let i = 0, l = children.length; i < l; i++) {
    intersectObject(children[i], raycaster, intersects);
  }
}

/*
 * Creates a guiRoot as a child of the scene root passed in
 */
export default class GuiSys {
  constructor(root, params = {}) {
    this.root = root;
    this.guiRoot = new THREE.Object3D();
    this.root.add(this.guiRoot);
    this.isVRPresenting = false;
    this._requestFrames = {};
    this._offscreenRenders = {};
    this._offscreenRenderUID = 1;

    this._cursor = {
      intersectDistance: 0,
      lastHit: null,
      lastAlmostHit: null,
      source: null,
      rayOrigin: null,
      rayDirection: null,
      lastHitCache: [],
      drawsCursor: false,
      // Store the local coordinates on the last hit face
      lastLocalX: null,
      lastLocalY: null,
      lastHitImmediateListeners: null,
    };
    // This is a minimum z distance to prevent z-fighting in z-buffer.
    // Todo: We may need to dynamically set this scale depends on the camera.
    this.ZOffsetScale = DEFAULT_Z_OFFSET_SCALE;

    // This is the position mouse input is pointing to in viewport
    this.mouseOffset = null;

    // This defines the styles for mouse cursor in diffrent mouse cursor state
    this.mouseCursorInactiveStyle = 'default';
    this.mouseCursorActiveStyle = 'pointer';
    // This is the current mouse state
    this.mouseCursorActive = false;

    // When user touch leave screen, to keep touch interaction working smoothly,
    // the hit offset should remain in the same place for a period of time before
    // moving it back to gaze cursor.
    this.touchReleaseDelay = DEFAULT_TOUCH_RELEASE_DELAY;

    // Curosr display modes: 'visible'/'hidden' - cursor always/never visible.
    // 'auto' - computed dynamically, visible when over an interactable object.
    this.cursorVisibility = 'hidden';
    // Move cursor on top of object underneath instead of using fixed distance.
    this.cursorAutoDepth = true;
    // Distance between camera and cursor; only used when auto-depth is false.
    this.cursorFixedDistance = DEFAULT_CURSOR_DISTANCE;

    // If no font specified, use default.
    if (!params.font) {
      params.font = loadFont();
    }

    if (!params.raycasters) {
      params.raycasters = [];
    }

    // Override default values. Can also call setter methods directly.
    // example params: { 'cursorFixedDistance': 1.5 }
    if (params !== undefined) {
      setParams(this, params);
    }

    // Event dispatcher to dispatch guisys events
    this.eventDispatcher = new THREE.EventDispatcher();

    this._inputEventSources = [];

    // Register to events.
    window.addEventListener(
      'vrdisplaypresentchange',
      this._onPresentChange.bind(this),
    );
  }

  /**
   * Add a Three.js object as a child of the guiRoot obejct
   */
  add(child, container) {
    if (container) {
      container.add(child);
    } else {
      this.guiRoot.add(child);
    }
  }

  /**
   * Remove a Three.js object as a child of the guiRoot object
   * It is the job of the caller to handle deallocation of the object
   */
  remove(child) {
    if (child.parent) {
      child.parent.remove(child);
    }
  }

  /**
   * request for a function to be run on the following frame of the GuiSys
   * first argument for the function is Date.now() as is dependable across browsers
   */
  requestFrameFunction(func) {
    const uid = frameUpdateUID++;
    this._requestFrames[uid] = func;
    return uid;
  }

  /**
   * cancel for the function associated with the uid
   */
  cancelFrameFunction(uid) {
    delete this._requestFrames[uid];
  }

  applyUpdates(camera, root) {
    const updateContext = {
      camera: camera,
      renderOrder: 0,
      distances: [
        Math.floor(camera.far * RENDERSORT_DISTANCE_MULTIPLIER) <<
          RENDERSORT_DISTANCE_SHIFT,
      ],
      distancesNode: [null],
    };
    // apply hierarchical updates of opacity and determine render order
    applyUpdates(root, 1, updateContext, 0, [-16384, -16384, 16384, 16384]);

    // Update world transform matrix of all views, as local transform might have changed in applyUpdates.
    root.updateMatrixWorld();

    return updateContext;
  }

  /**
   * Updates the reorder and propagates the Opacity through the view hierarchy
   */
  frameRenderUpdates(camera) {
    const curTime = Date.now();
    const currentRequests = this._requestFrames;
    this._requestFrames = {};
    for (const update in currentRequests) {
      currentRequests[update](curTime);
    }

    for (const scene in this._offscreenRenders) {
      const sceneParams = this._offscreenRenders[scene];
      this.applyUpdates(sceneParams.camera, sceneParams.scene);
    }
    // apply hierarchical updates of opacity and determine render order
    const updateContext = this.applyUpdates(camera, this.root);

    // Update billboarding as second pass, so all view transform updates are applied first.
    // Billboarding makes a view face the screen and has no effect in VR.
    if (!this.isVRPresenting) {
      updateBillboard(this.root, updateContext);
    }

    if (this._raycasters) {
      for (let i = 0; i < this._raycasters.length; i++) {
        if (typeof this._raycasters[i].frame === 'function') {
          this._raycasters[i].frame(curTime);
        }
      }
    }

    // Check if we need to initialize the cursor.
    if (this.cursorVisibility !== 'hidden' && !this.cursorMesh) {
      this.addCursor();
    }
  }

  /**
   * `frameInputEvents` must be called on a requestAnimationFrame event based
   * as this will handle the interactions of the browser devices and
   * headset gaze with the UI elements. Events are created and distributed
   * to any listeners
   */
  frameInputEvents(camera, renderer) {
    if (this._raycasters) {
      let caster = null;
      let origin = null;
      let direction = null;
      let maxLength = Infinity;
      // Loop through raycasters until we get a hit from a ray
      // In future diffs, there will be support for multiple cursors and
      // raycasters, but for now we pick the first available one.
      let r = 0;
      while ((!origin || !direction) && r < this._raycasters.length) {
        caster = this._raycasters[r];
        origin = caster.getRayOrigin(camera);
        direction = caster.getRayDirection(camera);
        if (typeof caster.getMaxLength === 'function') {
          maxLength = caster.getMaxLength();
        } else {
          maxLength = Infinity;
        }
        r++;
      }
      this._processRayData(
        camera.getWorldPosition(),
        camera.getWorldQuaternion(),
        origin,
        direction,
        maxLength,
        caster ? caster.getType() : null,
        caster ? caster.drawsCursor() : null,
      );
    }

    const renderTarget = renderer ? renderer.domElement : null;
    this._domElement = renderTarget;
    this._fireInputEvents(renderTarget);
    this._updateMouseCursorStyle(renderTarget);
  }

  _processRayData(
    worldPosition,
    worldQuat,
    localPosition,
    localDirection,
    maxLength,
    source,
    drawsCursor,
  ) {
    if (localPosition && localDirection) {
      // initialize preallocated data components from Three.js objects or raw arrays
      if (worldPosition instanceof THREE.Vector3) {
        rayCameraPos.copy(worldPosition);
      } else {
        rayCameraPos.set(worldPosition[0], worldPosition[1], worldPosition[2]);
      }
      if (worldQuat instanceof THREE.Quaternion) {
        rayCameraQuat.copy(worldQuat);
      } else {
        rayCameraQuat.set(
          worldQuat[0],
          worldQuat[1],
          worldQuat[2],
          worldQuat[3],
        );
      }
      let firstHit = null;
      let firstAlmostHit = null;
      raycaster.ray.origin.set(
        rayCameraPos.x + localPosition[0],
        rayCameraPos.y + localPosition[1],
        rayCameraPos.z + localPosition[2],
      );
      raycaster.ray.direction.fromArray(localDirection);
      raycaster.ray.direction.normalize();
      raycaster.ray.direction.applyQuaternion(rayCameraQuat);
      raycaster.far = maxLength;
      const rotatedDirection = [
        raycaster.ray.direction.x,
        raycaster.ray.direction.y,
        raycaster.ray.direction.z,
      ];
      const hits = raycaster.intersectObject(this.root, true);
      for (let i = 0; i < hits.length; i++) {
        let hit = hits[i];
        if (hit.uv && hit.object && hit.object.subScene) {
          const distanceToSubscene = hit.distance;
          const scene = hit.object.subScene;
          raycaster.ray.origin.set(
            scene._rttWidth * hit.uv.x,
            scene._rttHeight * (1 - hit.uv.y),
            0.1,
          );
          raycaster.ray.direction.set(0, 0, -1);
          const subHits = [];
          intersectObject(scene, raycaster, subHits);
          if (subHits.length === 0) {
            continue;
          }
          hit = subHits[subHits.length - 1];
          hit.distance = distanceToSubscene;
        }
        if (!firstHit && !hit.isAlmostHit) {
          firstHit = hit;
        }
        if (!firstAlmostHit && hit.isAlmostHit) {
          firstAlmostHit = hit;
        }
      }

      if (firstHit) {
        this.updateLastHit(firstHit.object, source);
        if (firstHit.uv) {
          this._cursor.lastLocalX = firstHit.uv.x;
          this._cursor.lastLocalY = firstHit.uv.y;
        }
        // Always update distance since object could be moving
        this._cursor.intersectDistance = firstHit.distance;
      } else {
        this.updateLastHit(null, source);
        this._cursor.lastLocalX = null;
        this._cursor.lastLocalY = null;
      }

      if (this.cursorVisibility === 'auto') {
        // Set lastAlmostHit if firstHit not found or isn't interactable.
        // For example <Pano> generates a hit but usually isn't interactive.
        if (firstAlmostHit && !(firstHit && firstHit.object.isInteractable)) {
          this._cursor.lastAlmostHit = firstAlmostHit.object;
          this._cursor.intersectDistance = firstAlmostHit.distance;
        } else {
          this._cursor.lastAlmostHit = null;
        }
      }

      this.setCursorProperties(
        [
          rayCameraPos.x + localPosition[0],
          rayCameraPos.y + localPosition[1],
          rayCameraPos.z + localPosition[2],
        ],
        rotatedDirection,
        drawsCursor,
      );
    } else {
      this.setLastHit(null, null);
      this.setCursorProperties(null, null, false);
    }
  }

  setLastHit(lastHit, source) {
    this._cursor.lastHit = lastHit;
    this._cursor.source = source;
  }

  setCursorProperties(rayOrigin, rayDirection, drawsCursor) {
    this._cursor.rayOrigin = rayOrigin;
    this._cursor.rayDirection = rayDirection;
    this._cursor.drawsCursor = drawsCursor;
  }

  /**
   * `frame` is a helper to call through to frameRenderUpdates and frameInputEvents
   * in the correct order to update GuiSys
   * the calls can be made seperately as required
   */
  frame(camera, renderer) {
    this.frameRenderUpdates(camera);
    this.frameInputEvents(camera, renderer);
    this.updateCursor(camera);
  }

  /**
   * updates the last hit object and the hierarchy of views
   * creates inetraction events that are then distributed to listeners of GuiSys
   */
  updateLastHit(hit, source) {
    const hitCache = [];
    const hitImmediateListeners = [];
    let currentHit = hit;

    // First pass of hit views in hierachy
    const hitViews = [];
    while (currentHit) {
      if (currentHit.type === 'UIView') {
        hitViews.push(currentHit);
      }
      currentHit = currentHit.parent;
    }
    // Determine the target of hit event
    // Save those view that accept hit event to hitCache
    let target = null;
    this.mouseCursorActive = false;
    for (let i = hitViews.length - 1; i >= 0; i--) {
      // hitViews are all UIViews so shouldAcceptHitEvent/shouldInterceptHitEvent
      // is never null. Here shouldAcceptHitEvent determine whether this view can
      // be the target of hit event
      if (hitViews[i].shouldAcceptHitEvent()) {
        target = hitViews[i].id;
        hitCache[hitViews[i].id] = hitViews[i];
        if (hitViews[i].immediateListener) {
          hitImmediateListeners.push(hitViews[i].immediateListener);
        }
        if (hitViews[i].isMouseInteractable) {
          // If any view that accept hit event is mouse interactable
          // the mouse cursor state should be active.
          this.mouseCursorActive = true;
        }
      }
      // Here shouldInterceptHitEvent determine whether this view's subviews can be
      // the target of hit event
      if (hitViews[i].shouldInterceptHitEvent()) {
        break;
      }
    }

    // Update last hit
    currentHit = target !== null && hitCache[target] ? hitCache[target] : null;
    if (this._cursor.lastHit !== currentHit || this._cursor.source !== source) {
      // Emit hit changed event
      this.eventDispatcher.dispatchEvent(
        new GuiSysEvent(GuiSysEventType.HIT_CHANGED, {
          lastHit: this._cursor.lastHit,
          currentHit: currentHit,
          lastSource: this._cursor.source,
          currentSource: source,
        }),
      );
      this._cursor.lastHit = currentHit;
      this._cursor.source = source;
    }

    // Emit focus lost events
    for (const id in this._cursor.lastHitCache) {
      if (!hitCache[id]) {
        this.eventDispatcher.dispatchEvent(
          new UIViewEvent(
            this._cursor.lastHitCache[id],
            UIViewEventType.FOCUS_LOST,
            {
              target: this._cursor.lastHit,
              source: this._cursor.source,
            },
          ),
        );
      }
    }
    // Emit focus gained events
    for (const id in hitCache) {
      if (!this._cursor.lastHitCache[id]) {
        this.eventDispatcher.dispatchEvent(
          new UIViewEvent(hitCache[id], UIViewEventType.FOCUS_GAINED, {
            target: this._cursor.lastHit,
            source: this._cursor.source,
          }),
        );
      }
    }

    // Update hit cache
    this._cursor.lastHitCache = hitCache;
    // Update hit immediate listeners
    this._cursor.lastHitImmediateListeners = hitImmediateListeners;
  }

  addCursor() {
    this.cursorMesh = this.makeDefaultCursor();
    this.cursorMesh.raycast = function() {
      return null; // Disable hit/intersection with cursor mesh.
    };
    this.root.add(this.cursorMesh);
    this.cursorMesh.visible = false;

    // Make cursor appear on top of other objects.
    this.cursorMesh.material.depthTest = false;
    this.cursorMesh.material.depthWrite = false;
    this.cursorMesh.renderOrder = 1;
  }

  updateCursor(camera) {
    // The cursor is placed at fixed distance from camera, unless cursorAutoDepth
    // is enabled and cursor is over a UI object, then we put the cursor at same
    // distance as that object (i.e. intersectDistance).
    const cursorZ =
      this.cursorAutoDepth && this._cursor.lastHit !== null
        ? this._cursor.intersectDistance
        : this.cursorFixedDistance;

    const lastOrigin = this._cursor.rayOrigin;
    const lastDirection = this._cursor.rayDirection;
    // Update cursor based on global transform of camera. Leave matrixAutoUpdate
    // enabled, since we modify cursorMesh.scale when cursorAutoDepth is used.
    if (
      this.cursorMesh &&
      this.cursorVisibility !== 'hidden' &&
      lastOrigin &&
      lastDirection
    ) {
      const cameraToCursorX = lastOrigin[0] + lastDirection[0] * cursorZ;
      const cameraToCursorY = lastOrigin[1] + lastDirection[1] * cursorZ;
      const cameraToCursorZ = lastOrigin[2] + lastDirection[2] * cursorZ;
      this.cursorMesh.position.set(
        camera.position.x + cameraToCursorX,
        camera.position.y + cameraToCursorY,
        camera.position.z + cameraToCursorZ,
      );
      this.cursorMesh.rotation.copy(camera.getWorldRotation());

      if (this.cursorAutoDepth) {
        // Scale cursor so it appears same size regardless of depth.
        // TODO: Clamping to a max/min depth.
        const scale = Math.sqrt(
          cameraToCursorX * cameraToCursorX +
            cameraToCursorY * cameraToCursorY +
            cameraToCursorZ * cameraToCursorZ,
        );
        this.cursorMesh.scale.set(scale, scale, scale);
      }
    }

    // Update visibility of cursor
    if (this.cursorMesh) {
      let autoVisible = false;
      if (this.cursorVisibility === 'auto') {
        // Show cursor if it intersects an interactable view (lastHit), or is
        // 'close' to one (almostHit). Boundaries used by raycaster for lastHit
        // and almostHit are set per-view with hitSlop and cursorVisibilitySlop.
        autoVisible =
          this._cursor.lastHit !== null && this._cursor.lastHit.isInteractable;
        if (!autoVisible) {
          autoVisible =
            this._cursor.lastAlmostHit !== null &&
            this._cursor.lastAlmostHit.isInteractable;
        }
      }
      // Always hide gaze cursor when mouse cursor is detected.
      this.cursorMesh.visible =
        this._cursor.drawsCursor &&
        (this.cursorVisibility === 'visible' || autoVisible) &&
        lastOrigin !== null &&
        lastDirection !== null;
    }
  }

  makeDefaultCursor() {
    const canvas = document.createElement('canvas');
    // Three.js requires textures in powers of 2 (and not fractions).
    canvas.width = 256;
    canvas.height = 256;
    // Draw circle on canvas programatically.
    // TODO: Customize color or change color on hit.
    // TODO: Support image provided by us or by user.
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    // centerX, centerY, radius, startAngle, endAngle
    ctx.arc(128, 128, 95, 0, 2 * Math.PI);
    // Match UI style guide: white outline 100% opaque, white fill 80% opaque.
    ctx.strokeStyle = 'rgba(256, 256, 256, 1)';
    ctx.fillStyle = 'rgba(256, 256, 256, 0.8)';
    ctx.lineWidth = 25;
    ctx.stroke();
    ctx.fill();
    // Canvas contents will be used for a texture.
    const texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
    const material = new THREE.MeshBasicMaterial({
      transparent: true,
      opacity: 1.0,
      side: THREE.DoubleSide,
      map: texture,
    });
    // scale to 25mm (~1 inches)
    const defaultCursor = new THREE.Mesh(
      new THREE.PlaneGeometry(DEFAULT_CURSOR_WIDTH, DEFAULT_CURSOR_WIDTH),
      material,
    );
    return defaultCursor;
  }

  _updateMouseCursorStyle(renderTarget) {
    const cursorStyle = this.mouseCursorActive
      ? this.mouseCursorActiveStyle
      : this.mouseCursorInactiveStyle;
    if (renderTarget && renderTarget.style) {
      renderTarget.style.cursor = cursorStyle;
      renderTarget.style.cursor = `-webkit-${cursorStyle}`;
      renderTarget.style.cursor = `-moz-${cursorStyle}`;
    }
  }

  _onPresentChange(e) {
    this.isVRPresenting = e.display.isPresenting;
  }

  _fireInputEvents(target) {
    let collected = [];
    for (let i = 0; i < this._inputEventSources.length; i++) {
      const source = this._inputEventSources[i];
      if (typeof source.getTarget === 'function') {
        if (source.getTarget() !== target) {
          source.setTarget(target);
        }
      }

      const events = source.getEvents();
      if (events) {
        collected = collected.concat(events);
      }
    }

    for (let i = 0; i < collected.length; i++) {
      // Attach last hit target to the event
      this.eventDispatcher.dispatchEvent(
        new GuiSysEvent(GuiSysEventType.INPUT_EVENT, {
          target: this._cursor.lastHit,
          source: this._cursor.source,
          inputEvent: collected[i],
        }),
      );
    }
  }

  _onTouchImmediate(event) {
    const listeners = this._cursor.lastHitImmediateListeners;
    if (listeners) {
      for (let i = 0; i < listeners.length; i++) {
        if (listeners[i].eventType === event.eventType) {
          listeners[i].callback(event);
        }
      }
    }
  }

  registerOffscreenRender(scene, camera, renderTarget) {
    const uid = this._offscreenRenderUID++;
    this._offscreenRenders[uid] = {scene, camera, renderTarget};
    return uid;
  }

  unregisterOffscreenRender(uid) {
    if (!uid) {
      return;
    }
    delete this._offscreenRenders[uid];
  }

  getOffscreenRenders() {
    return this._offscreenRenders;
  }

  setFont(font) {
    this.font = font;
  }

  /**
   * Customize the mouse cursor style when mouse cursor is inactive
   */
  setMouseCursorInactiveStyle(style) {
    this.mouseCursorInactiveStyle = style;
  }

  /**
   * Customize the mouse cursor style when mouse cursor is active
   */
  setMouseCursorActiveStyle(style) {
    this.mouseCursorActiveStyle = style;
  }

  /**
   * Sets if the cursor display mode
   */
  setCursorVisibility(visibility) {
    const modes = ['visible', 'hidden', 'auto'];
    if (!modes.includes(visibility)) {
      console.warn(`Unknown cursorVisibility: ${visibility} expected`, modes);
      return;
    }
    this.cursorVisibility = visibility;
  }

  /**
   * An autodepth cursor will change distance based on where the interaction occurs
   */
  setCursorAutoDepth(flag) {
    this.cursorAutoDepth = flag;
  }

  /**
   * manual setting of distance of the cursor from the camera
   */
  setCursorFixedDistance(distance: number) {
    this.cursorFixedDistance = distance;
  }

  /**
   * Replace the set of RayCasters to use.
   */
  setRaycasters(raycasters) {
    if (!Array.isArray(raycasters)) {
      throw new Error(
        'GuiSys raycasters must be an array of RayCaster objects',
      );
    }
    this._raycasters = raycasters;
  }

  setLastLocalIntersect(x, y) {
    this._cursor.lastLocalX = x;
    this._cursor.lastLocalY = y;
  }

  getLastLocalIntersect() {
    if (this._cursor.lastLocalX === null || this._cursor.lastLocalY === null) {
      return null;
    }
    return [this._cursor.lastLocalX, this._cursor.lastLocalY];
  }
}
