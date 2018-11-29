/**
 * Copyright (c) 2016-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import * as THREE from 'three';

import {VectorGeometry} from '../FourByFourRect/VectorGeometry';

import {
  CENTER_LINE,
  CENTER,
  BitmapFontGeometry,
  measureText,
} from '../SDFFont/SDFFont';
import {
  setParams,
  defaultScaleType,
  resizeModetoScaleType,
  PointerEvents,
} from './UIViewUtil';

const DEFAULT_Z_OFFSET = 1;

const BACKGROUND_MAT_INDEX = 0;
const BORDER_MAT_INDEX = 1;
const IMAGE_MAT_INDEX = 2;

const DEFAULT_BACKGROUND_COLOR = 0xffffff;
const DEFAULT_BORDER_COLOR = 0x000000;
const DEFAULT_IMAGE_COLOR = 0xffffff;

/**
 * Animated frames
 *
 * An animated config is defined as a duration, and create and/or update anim where the
 * type of anim is one of 'spring', 'linear', 'easeInEaseOut' ...
 *
 * Anim = {
 *   type:
 * }
 *
 * Config = {
 *   duration:,
 *   create:,
 *   update:
 * }
 **/

const AnimationFunctions = {
  spring: function(dt) {
    return (
      1 + Math.pow(2, -10 * dt) * Math.sin((dt - 0.5 / 4) * Math.PI * 2 / 0.5)
    );
  },
  linear: function(dt) {
    return dt;
  },
  easeInEaseOut: function(dt) {
    return dt < 0.5 ? 2 * dt * dt : -1 + (4 - 2 * dt) * dt;
  },
  easeIn: function(dt) {
    return dt * dt;
  },
  easeOut: function(dt) {
    return dt * (2 - dt);
  },
  keyboard: function(dt) {
    return dt;
  },
};

export default function UIView(guiSys, params) {
  THREE.Object3D.call(this);

  this.type = 'UIView';
  this.clippingEnabled = false;
  this.clipPlanes = [
    new THREE.Plane(new THREE.Vector3(1, 0, 0), 16384),
    new THREE.Plane(new THREE.Vector3(-1, 0, 0), 16384),
    new THREE.Plane(new THREE.Vector3(0, 1, 0), 16384),
    new THREE.Plane(new THREE.Vector3(0, -1, 0), 16384),
  ];

  this.geometry = new THREE.PlaneGeometry(0, 0);
  this.backgroundMaterial = new THREE.MeshBasicMaterial({
    clippingPlanes: this.clipPlanes,
    color: DEFAULT_BACKGROUND_COLOR,
    side: THREE.DoubleSide,
  });
  this.backgroundMaterial.transparent = true;
  this.backgroundMaterial.visible = false;
  this.backgroundMaterial.depthWrite = false;

  this.borderMaterial = new THREE.MeshBasicMaterial({
    clippingPlanes: this.clipPlanes,
    color: DEFAULT_BORDER_COLOR,
    side: THREE.DoubleSide,
  });
  this.borderMaterial.transparent = true;
  this.borderMaterial.visible = false;
  this.borderMaterial.depthWrite = false;
  this.imageMaterial = new THREE.MeshBasicMaterial({
    clippingPlanes: this.clipPlanes,
    color: DEFAULT_IMAGE_COLOR,
    side: THREE.DoubleSide,
  });
  this.imageMaterial.transparent = true;
  this.imageMaterial.visible = false;
  this.imageMaterial.depthWrite = false;
  this.material = [
    this.backgroundMaterial,
    this.borderMaterial,
    this.imageMaterial,
  ];
  this.material.side = THREE.DoubleSide;
  this.guiSys = guiSys;
  this.zIndex = 0;

  this.drawMode = THREE.TrianglesDrawMode;

  this.opacity = 1.0;
  this.dirtyGeometry = true;
  this.frame = [0, 0, 0, 0];
  this.targetFrame = [0, 0, 0, 0];
  this.frameDirty = true;
  this.inset = [0, 0, 0, 0];
  this.insetSize = [0, 0, 0, 0];
  // hit expansion in left, top, right and bottom of render geometry
  // positive values are outwards
  this.hitSlop = [0, 0, 0, 0];
  this.cursorVisibilitySlop = [0, 0, 0, 0];
  this.borderWidth = [0, 0, 0, 0];
  this.borderRadius = [0, 0, 0, 0];
  this.scaleType = defaultScaleType();
  this.textureDim = [0, 0];
  // crop[x, y, w, h] is the cropped area of the texture.
  // x, y, w, h ranges from 0.0 ~ 1.0.
  // The same as frame, [0, 0] is the left-top of the texture
  this.crop = [0, 0, 1, 1];
  this.backgroundOpacity = 1;
  this.borderOpacity = 1;
  this.imageOpacity = 1;
  this.matrixAutoUpdate = false;
  this.localRotate = new THREE.Matrix4();
  this.localPosition = [0, 0, 0];
  // layoutZOffset represents the relative z offset layer from an UIView to
  // its parent. This is to prevent z fighting between UIViews. The actual
  // z distance should be layoutZOffset * guiSys.ZOffsetScale.
  this.layoutZOffset = DEFAULT_Z_OFFSET;

  this.text = null;
  this.textDirty = false;
  this.textHAlign = CENTER_LINE;
  this.textLinecount = 0;
  this.textVAlign = CENTER;
  this.textColor = new THREE.Color();
  this.textSize = 2;
  this.textMesh = new THREE.Mesh(
    new THREE.BufferGeometry(),
    guiSys.font.material,
  );
  this.textMesh.type = 'SDFText';
  this.textMesh.textClip = [-16384, -16384, 16384, 16384];
  this.textMesh.visible = false;
  this.textMesh.onBeforeRender = function(
    renderer,
    scene,
    camera,
    geometry,
    material,
    group,
  ) {
    if (geometry && geometry.isSDFText) {
      geometry.onBeforeRender(this, material);
    }
  };
  this.textFontParms = {
    AlphaCenter: 0.47,
    ColorCenter: 0.5,
  };
  // Set dimensions of frame based on contained text.
  this.autoScale = false;
  // When cursor in auto-hide mode, only show when over an interactable object.
  this.isInteractable = false;
  // Mouse cursor state will be active when mouse over a mouse interactable object
  this.isMouseInteractable = false;
  // pointerEvents defines how the uiview accept hit event and intercept its subviews's hit event
  this.pointerEvents = PointerEvents.AUTO;
  // billboarding pivots this view around an axis so that it faces the camera.
  // Only effective when not in VR. Currently supported: 'on' and 'off'.
  this.billboarding = 'off';

  // listener for touch events, needed on Chrome Android to put video "play"
  // method in the callback of a user gesture
  this.immediateListener = null;

  // Override default values. Can also call setter methods directly.
  // example params: { 'textColor': 'yellow', 'backgroundColor' 'blue' }
  if (params !== undefined) {
    setParams(this, params);
  }

  // disable collision on text
  this.textMesh.raycast = function() {};
  this.add(this.textMesh);
}

UIView.prototype = Object.assign(Object.create(THREE.Object3D.prototype), {
  constructor: UIView,

  isMesh: true,

  isGui: true,

  updateGeometry: (function(updateContext) {
    const transform = new THREE.Matrix4();
    const config = {
      frame: [0, 0, 0, 0],
    };
    return function(updateContext) {
      if (!this.dirtyGeometry) {
        return;
      }

      if (this.text) {
        if (this.textDirty) {
          if (this.autoScale) {
            config.dim = measureText(
              this.guiSys.font,
              this.text,
              this.textSize,
            );
            this.frame[2] = config.dim.maxWidth;
            this.frame[3] = config.dim.maxHeight;
          }
          config.frame[0] = -this.frame[2] / 2;
          config.frame[1] = -this.frame[3] / 2;
          config.frame[2] = this.frame[2];
          config.frame[3] = this.frame[3];
          config.hAlign = this.textHAlign;
          config.vAlign = this.textVAlign;
          config.lineCount = this.textLinecount;
          config.fontParms = this.textFontParms;
          config.autoScale = this.autoScale;
          this.textMesh.geometry.dispose();
          this.textMesh.geometry = new BitmapFontGeometry(
            this.guiSys.font,
            this.text,
            this.textSize,
            config,
          );
          this.textMesh.visible = !!this.textMesh.geometry;
          this.textMesh.material = this.textMesh.geometry.materials;
          this.textMesh.position.z = 0.01;
          this.textDirty = false;
        }
      } else {
        this.textMesh.geometry.dispose();
        this.textMesh.visible = false;
        this.textDirty = false;
      }

      // calculate the offset vector from this views centerpoint in the parent frame
      // to the pivot point of the parent. This equals the offset that needs to be applied
      // given the geometry's origin is the mid point of width and height
      let x = this.frame[0] + this.frame[2] / 2;
      let y = this.frame[1] - this.frame[3] / 2;
      const z = this.layoutZOffset * this.guiSys.ZOffsetScale;
      if (this.parent && this.parent.frame) {
        x -= this.parent.frame[2] / 2;
        y += this.parent.frame[3] / 2;
      }

      if (this.localTransform) {
        this.matrix.fromArray(this.localTransform);
        this.matrix.elements[12] += x;
        this.matrix.elements[13] += y;
        this.matrix.elements[14] += z;
      } else {
        transform.makeTranslation(
          x + this.localPosition[0],
          y + this.localPosition[1],
          z + this.localPosition[2],
        );
        this.matrix.multiplyMatrices(transform, this.localRotate);
      }

      if (this.frameDirty) {
        this.geometry.dispose();
        this.geometry = new VectorGeometry(
          [this.frame[2], this.frame[3]],
          this.borderMaterial.visible ? this.borderWidth : undefined,
          this.borderRadius,
          BACKGROUND_MAT_INDEX,
          IMAGE_MAT_INDEX,
          BORDER_MAT_INDEX,
        );
        this.needsUpdate = true;
        this.frameDirty = false;
      }
      this.dirtyGeometry = false;
    };
  })(),

  updateBillboard: (function(updateContext) {
    // Similar to Three.js Object3D.lookAt, except view faces the screen
    // instead of the camera. (Should only be called when not in VR.)
    const thisPosition = new THREE.Vector3();
    const camPosition = new THREE.Vector3();
    const camAxisX = new THREE.Vector3();
    const camAxisY = new THREE.Vector3();
    const camAxisZ = new THREE.Vector3();
    const newAxisX = new THREE.Vector3();
    const newAxisY = new THREE.Vector3();
    const newAxisZ = new THREE.Vector3();
    const up = new THREE.Vector3(0, 1, 0);
    const rotationMatrix = new THREE.Matrix4();
    const parentMatrixWorldInverse = new THREE.Matrix4();
    const parentRotationInverse = new THREE.Matrix4();

    return function(updateContext) {
      const camMatrixWorld = updateContext.camera.matrixWorld;
      thisPosition.setFromMatrixPosition(this.matrixWorld);
      camPosition.setFromMatrixPosition(camMatrixWorld);
      camMatrixWorld.extractBasis(camAxisX, camAxisY, camAxisZ);

      // we want a world transform that is in the plane of the camera but with the requirement
      // that the Y axis is always aligned with the world Y axis
      // therefore Z axis must be that of the camera Z with 0 Y component in that axis
      // the y Axis is always up
      newAxisY.copy(up);
      // the z axis should be the camera axis but with no y component
      newAxisZ.copy(camAxisZ);
      newAxisZ.y = 0;
      newAxisZ.normalize();
      // from there we compute X
      newAxisX.crossVectors(newAxisY, newAxisZ).normalize();

      rotationMatrix.identity();
      const e = rotationMatrix.elements;
      e[0] = newAxisX.x;
      e[4] = newAxisY.x;
      e[8] = newAxisZ.x;
      e[1] = newAxisX.y;
      e[5] = newAxisY.y;
      e[9] = newAxisZ.y;
      e[2] = newAxisX.z;
      e[6] = newAxisY.z;
      e[10] = newAxisZ.z;

      // Convert rotation matrix to our local space.
      if (this.parent) {
        parentMatrixWorldInverse.getInverse(this.parent.matrixWorld);
        parentRotationInverse.extractRotation(parentMatrixWorldInverse);
        rotationMatrix.multiply(parentRotationInverse);
      }

      // Set the local rotation to the billboarding rotation.
      // Overwrites any existing local rotations.
      this.matrix.extractRotation(rotationMatrix);
    };
  })(),

  applyUpdates: function(opacity, updateContext) {
    this.updateGeometry(updateContext);
    this.backgroundMaterial.opacity = opacity * this.backgroundOpacity;
    this.borderMaterial.opacity = opacity * this.borderOpacity;
    this.imageMaterial.opacity = opacity * this.imageOpacity;
    this.textMesh.opacity = opacity;
  },

  setFrame: function(x, y, width, height, animator) {
    if (
      x === this.targetFrame[0] &&
      y === this.targetFrame[1] &&
      width === this.targetFrame[2] &&
      height === this.targetFrame[3]
    ) {
      return;
    }
    this.targetFrame[0] = x;
    this.targetFrame[1] = y;
    this.targetFrame[2] = width;
    this.targetFrame[3] = height;
    if (animator) {
      const self = this;
      const startFrame = [
        this.frame[0],
        this.frame[1],
        this.frame[2],
        this.frame[3],
      ];
      const startTime = Date.now();
      const animState =
        this.frame[2] === 0 && this.frame[3] === 0 && animator.create
          ? animator.create
          : animator.update;

      const frameAnimation = function(curTime) {
        const deltaTime = curTime - startTime;
        const dt = animState
          ? AnimationFunctions[animState.type](
              Math.min(1, deltaTime / animator.duration),
            )
          : 1;
        const omdt = 1 - dt;
        self.frame[0] = startFrame[0] * omdt + x * dt;
        self.frame[1] = startFrame[1] * omdt + y * dt;
        self.frame[2] = startFrame[2] * omdt + width * dt;
        self.frame[3] = startFrame[3] * omdt + height * dt;
        self.dirtyGeometry = true;
        self.frameDirty = true;
        if (deltaTime < animator.duration && animState) {
          self.animatorHandle = self.guiSys.requestFrameFunction(
            frameAnimation,
          );
        } else {
          self.animatorHandle = null;
        }
      };

      this.guiSys.cancelFrameFunction(self.animatorHandle);
      frameAnimation(startTime);
    } else {
      this.frame[0] = x;
      this.frame[1] = y;
      this.frame[2] = width;
      this.frame[3] = height;
      this.dirtyGeometry = true;
      this.frameDirty = true;
    }
  },

  setHitSlop: function(l, t, r, b) {
    this.hitSlop[0] = l;
    this.hitSlop[1] = t;
    this.hitSlop[2] = r;
    this.hitSlop[3] = b;
  },

  setCursorVisibilitySlop: function(l, t, r, b) {
    this.cursorVisibilitySlop[0] = l;
    this.cursorVisibilitySlop[1] = t;
    this.cursorVisibilitySlop[2] = r;
    this.cursorVisibilitySlop[3] = b;
  },

  setLayoutZOffset: function(offset) {
    this.layoutZOffset = offset;
    this.dirtyGeometry = true;
  },

  setLocalTransform: function(transform) {
    this.localTransform = transform.slice();
    this.dirtyGeometry = true;
  },

  setLocalRotation: function(quatOrEuler) {
    if (quatOrEuler.isEuler) {
      this.localRotate.makeRotationFromEuler(quatOrEuler);
    } else {
      this.localRotate.makeRotationFromQuaternion(quatOrEuler);
    }
    this.localTransform = undefined;
    this.dirtyGeometry = true;
  },

  setLocalPosition: function(position) {
    this.localTransform = undefined;
    this.localPosition[0] = position[0];
    this.localPosition[1] = position[1];
    this.localPosition[2] = position[2];
    this.dirtyGeometry = true;
  },

  setImage: function(url, loaded, invisibleTillLoad) {
    if (url) {
      // Avoid reloading the material if the URL is the same as the one already loaded.
      if (this.imageMaterial.mapurl === url) {
        loaded &&
          loaded(
            true,
            this.imageMaterial.map.naturalWidth,
            this.imageMaterial.map.naturalHeight,
          );
        return;
      }

      // Unset the existing mapurl and we'll reset it once the image loads successfully.
      delete this.imageMaterial.mapurl;

      const loader = new THREE.TextureLoader();
      loader.setCrossOrigin('Access-Control-Allow-Origin');
      loader.load(
        url,
        texture => {
          /* onLoad */
          this.imageMaterial.map = texture;
          this.imageMaterial.mapurl = url;
          // the texture crop may already be set before texture is
          // loaded, we need to update OffsetRepeat for the texture
          // to use the texture crop
          this.updateOffsetRepeat();
          this.imageMaterial.visible = true;
          this.imageMaterial.needsUpdate = true;
          loaded &&
            loaded(
              true,
              texture.image.naturalWidth,
              texture.image.naturalHeight,
            );
        },
        xhr => {
          /* onProgress */
        },
        xhr => {
          /* onError */
          this.imageMaterial.map && this.imageMaterial.map.dispose();
          this.imageMaterial.map = undefined;
          loaded && loaded(false);
        },
      );
      this.imageMaterial.visible = !!invisibleTillLoad;
    } else {
      this.imageMaterial.map && this.imageMaterial.map.dispose();
      this.imageMaterial.map = undefined;
      this.imageMaterial.visible = false;
      loaded && loaded(false);
    }
    this.imageMaterial.needsUpdate = true;
  },

  // Setting a texture allows us to use CanvasTexture, VideoTexture and other formats.
  // This also allows us to cache images as textures and reuse them rather than loading them multiple times.
  setImageTexture: function(texture) {
    // Unset the texture when it is not specified by the caller
    if (!texture) {
      // If our previous texture was an image based texture, detect this using mapurl
      // and then make sure we dispose of it properly.
      if (this.imageMaterial.mapurl) {
        // Dispose of the texture map if its present (it should be unless we raced the download)
        this.imageMaterial.map && this.imageMaterial.map.dispose();

        // Delete our mapurl so we can load another image based texture later.
        delete this.imageMaterial.mapurl;
      }

      // Delete the texture map from our material so it doesn't hang around indefinitely.
      delete this.imageMaterial.map;

      // Make sure our material is no longer visible.
      this.imageMaterial.visible = false;
    } else if (
      texture instanceof THREE.Texture ||
      texture.isWebGLRenderTarget
    ) {
      // Only work with instances of THREE.Texture (including derived types)
      // We are no longer represented by an image URL so delete the property to prevent later comparison.
      delete this.imageMaterial.mapurl;

      // This may overwrite an existing texture, but we can't dispose of that texture since there could
      // be multiple outstanding references to it. Will have to rely on the GC to clean it up in this instance.
      this.imageMaterial.map = texture;

      // Ensure that dependent properties are recalculated based on the new texture.
      this.updateOffsetRepeat();

      // Make sure our material is visible.
      this.imageMaterial.visible = true;
    } else {
      throw new Error('Image textures must be of type THREE.Texture');
    }
    // We updated the imageMaterial so make sure it gets updated by THREE
    this.imageMaterial.needsUpdate = true;
  },

  setClipPlanes: function(rect) {
    this.clipPlanes[0].setComponents(1, 0, 0, -rect[0]);
    this.clipPlanes[1].setComponents(-1, 0, 0, rect[2]);
    this.clipPlanes[2].setComponents(0, 1, 0, -rect[1]);
    this.clipPlanes[3].setComponents(0, -1, 0, rect[3]);
  },

  setImageColor: function(...args) {
    if (args[0] == null) {
      // for undefined and null, reset the color
      this.imageOpacity = 1.0;
      this.imageMaterial.color.set(DEFAULT_IMAGE_COLOR);
    } else {
      this.imageOpacity =
        typeof args[0] === 'number' ? ((args[0] >> 24) & 0xff) / 255.0 : 1.0;
      this.imageMaterial.color.set.apply(this.imageMaterial.color, args);
    }
    this.imageMaterial.needsUpdate = true;
  },

  setBackgroundColor: function(...args) {
    if (args[0] == null) {
      // for undefined and null, reset the color
      this.backgroundOpacity = 1.0;
      this.backgroundMaterial.color.set(DEFAULT_BACKGROUND_COLOR);
      this.backgroundMaterial.visible = false;
    } else {
      this.backgroundOpacity =
        typeof args[0] === 'number' ? ((args[0] >> 24) & 0xff) / 255.0 : 1.0;
      this.backgroundMaterial.color.set.apply(
        this.backgroundMaterial.color,
        args,
      );
      this.backgroundMaterial.visible = true;
    }
    this.backgroundMaterial.needsUpdate = true;
  },

  setBorderColor: function(...args) {
    if (args[0] == null) {
      // for undefined and null, reset the color
      this.borderOpacity = 1.0;
      this.borderMaterial.color.set(DEFAULT_BORDER_COLOR);
    } else {
      this.borderOpacity =
        typeof args[0] === 'number' ? ((args[0] >> 24) & 0xff) / 255.0 : 1.0;
      this.borderMaterial.color.set.apply(this.borderMaterial.color, arguments);
    }
    this.borderMaterial.needsUpdate = true;
  },

  setInset: function(inset) {
    // copy contents of inset
    this.inset = inset.slice();
    this.dirtyGeometry = true;
  },

  setInsetSize: function(insetSize) {
    // copy contents of insetSize
    this.insetSize = insetSize.slice();
    this.dirtyGeometry = true;
  },

  setBorderWidth: function(width) {
    let newValue;
    if (typeof width === 'number') {
      newValue = [width, width, width, width];
    } else {
      newValue = width;
    }
    if (
      newValue[0] !== this.borderWidth[0] ||
      newValue[1] !== this.borderWidth[1] ||
      newValue[2] !== this.borderWidth[2] ||
      newValue[3] !== this.borderWidth[3]
    ) {
      this.borderWidth = newValue.slice();
      this.borderMaterial.visible =
        newValue[0] > 0 ||
        newValue[1] > 0 ||
        newValue[2] > 0 ||
        newValue[3] > 0;
      this.frameDirty = true;
      this.dirtyGeometry = true;
    }
  },

  setBorderRadius: function(borderRadius) {
    for (let i = 0; i < 4; i++) {
      if (this.borderRadius[i] !== borderRadius[i]) {
        this.borderRadius[i] = borderRadius[i];
        this.frameDirty = true;
        this.dirtyGeometry = true;
      }
    }
  },

  setResizeMode: function(resizeModeValue) {
    const scaleType = resizeModetoScaleType(resizeModeValue);
    if (this.scaleType !== scaleType) {
      this.scaleType = scaleType;
      this.frameDirty = true;
      this.dirtyGeometry = true;
    }
  },

  setTextureCrop: function(crop) {
    // copy contents of crop
    this.crop = crop.slice();
    this.updateOffsetRepeat();
  },

  updateOffsetRepeat: function() {
    if (!this.imageMaterial.map) {
      return;
    }
    // In opengl uv coordinate system, [0, 0] is the left-bottom
    // of the texture, we flip the y here to translate from crop
    // to uv
    const offset = new THREE.Vector2(
      this.crop[0],
      1 - (this.crop[1] + this.crop[3]),
    );
    const repeat = new THREE.Vector2(this.crop[2], this.crop[3]);
    if (
      this.imageMaterial.map.offset === offset &&
      this.imageMaterial.map.repeat === repeat
    ) {
      return;
    }
    // The uv OffsetRepeat in three.js is set in texture, not material.
    this.imageMaterial.map.offset = offset;
    this.imageMaterial.map.repeat = repeat;
    this.imageMaterial.needsUpdate = true;

    const width = this.imageMaterial.map.image
      ? this.imageMaterial.map.image.width
      : 0;
    const height = this.imageMaterial.map.image
      ? this.imageMaterial.map.image.height
      : 0;
    if (width !== this.textureDim[0] || height !== this.textureDim[0]) {
      this.textureDim = [width, height];
      this.frameDirty = true;
      this.dirtyGeometry = true;
    }
  },

  setOpacity: function(value) {
    this.opacity = value;
    this.visible = value > 0;
  },

  setAlphaTest: function(value) {
    this.imageMaterial.alphaTest = value;
    this.imageMaterial.needsUpdate = true;
  },

  setText: function(text) {
    this.text = text;
    this.textDirty = true;
    this.dirtyGeometry = true;
  },

  setTextAlphaCenter: function(alphaCenter) {
    this.textFontParms.AlphaCenter = alphaCenter;
    this.dirtyGeometry = true;
  },

  setTextColor: function(value) {
    this.textColor.set(value);
  },

  setTextColorCenter: function(colorCenter) {
    this.textFontParms.ColorCenter = colorCenter;
    this.dirtyGeometry = true;
  },

  setTextHAlign: function(textAlign) {
    this.textDirty = true;
    this.textHAlign = textAlign;
    this.dirtyGeometry = true;
  },

  setTextLinecount: function(count) {
    this.textDirty = true;
    this.textLinecount = count;
    this.dirtyGeometry = true;
  },

  setTextSize: function(textSize) {
    this.textDirty = true;
    this.textSize = textSize;
    this.dirtyGeometry = true;
  },

  setTextVAlign: function(textAlign) {
    this.textDirty = true;
    this.textVAlign = textAlign;
    this.dirtyGeometry = true;
  },

  setAutoScale: function(autoScale) {
    this.autoScale = autoScale;
  },

  setIsInteractable: function(isInteractable) {
    this.isInteractable = isInteractable;
  },

  setIsMouseInteractable: function(isMouseInteractable) {
    this.isMouseInteractable = isMouseInteractable;
  },

  setPointerEvents: function(pointerEvents) {
    this.pointerEvents = pointerEvents;
  },

  setBillboarding: function(billboarding) {
    this.billboarding = billboarding;
  },

  calcWorldClipRect: function() {
    if (!this.clippingEnabled) {
      return [0, 0, 16384, 16384];
    }
    return [
      this.matrixWorld.elements[12] - this.frame[2] / 2,
      this.matrixWorld.elements[13] - this.frame[3] / 2,
      this.matrixWorld.elements[12] + this.frame[2] / 2,
      this.matrixWorld.elements[13] + this.frame[3] / 2,
    ];
  },

  setImmediateListener: function(listener) {
    this.immediateListener = listener;
  },

  // This function determine whether this view can be the target of a hit event.
  shouldAcceptHitEvent: function() {
    // We do not accept the hit event if this view is not supposed to receive it.
    return !(
      this.pointerEvents === PointerEvents.NONE ||
      this.pointerEvents === PointerEvents.BOX_NONE
    );
  },

  // This function determine whether this view's subviews can be the target of hit event.
  shouldInterceptHitEvent: function() {
    // We intercept the hit event if the subviews are not supposed to receive it.
    return (
      this.pointerEvents === PointerEvents.NONE ||
      this.pointerEvents === PointerEvents.BOX_ONLY
    );
  },

  forceRaycastTest: function(enabled) {
    this.forceRaycastTestEnabled = enabled;
  },

  // raycasting implementation from THREE.Mesh
  // We should find a better way of copying this
  /* eslint-disable */
  raycast: (function() {
    const inverseMatrix = new THREE.Matrix4();
    const ray = new THREE.Ray();

    let vTL = new THREE.Vector3();
    let vTR = new THREE.Vector3();
    let vBL = new THREE.Vector3();
    let vBR = new THREE.Vector3();

    function intersectRectangle(frame, slop) {
      // Create corner verticies with z=0 as this is a 2D rectangle not 3D box.
      const xMin = -frame[2] / 2 - slop[0];
      const yMin = -frame[3] / 2 - slop[3];
      const xMax = frame[2] / 2 + slop[2];
      const yMax = frame[3] / 2 + slop[1];
      vTL.fromArray([xMin, yMax, 0]);
      vTR.fromArray([xMax, yMax, 0]);
      vBL.fromArray([xMin, yMin, 0]);
      vBR.fromArray([xMax, yMin, 0]);

      let intersect = ray.intersectTriangle(vTL, vTR, vBR, false, intersectionPoint);
      intersect = intersect || ray.intersectTriangle(vTL, vBR, vBL, false, intersectionPoint);
      if (intersect) {
        const width = xMax - xMin;
        const height = yMax - yMin;
        // Normalize intersectionPoint to a 0-1 scale from the top-left corner
        intersectionNormalized.set(
          (intersectionPoint.x + width / 2) / width,
          (-intersectionPoint.y + height / 2) / height,
          0
        );
      }
      return intersect;
    }

    const intersectionNormalized = new THREE.Vector3();
    const intersectionPoint = new THREE.Vector3();
    const intersectionPointWorld = new THREE.Vector3();

    return function raycast(raycaster, intersects) {
      const material = this.material;

      if (!this.forceRaycastTestEnabled) {
        if (material === undefined) return;

        if (
          this.backgroundMaterial.opacity < 1 / 255 &&
          this.borderMaterial.opacity < 1 / 255 &&
          this.imageMaterial.opacity < 1 / 255
        )
          return;

        if (
          !this.backgroundMaterial.visible &&
          !this.borderMaterial.visible &&
          !this.imageMaterial.visible
        )
          return;
      }

      inverseMatrix.getInverse(this.matrixWorld);
      ray.copy(raycaster.ray).applyMatrix4(inverseMatrix);

      let intersect = intersectRectangle(this.frame, this.hitSlop);
      let isAlmostHit = false;
      if (!intersect) {
        // If not intersection with object or hitSlop, check cursorVisibilitySlop
        const needsUpdate =
          this.cursorVisibilitySlop[0] > this.hitSlop[0] ||
          this.cursorVisibilitySlop[1] > this.hitSlop[1] ||
          this.cursorVisibilitySlop[2] > this.hitSlop[2] ||
          this.cursorVisibilitySlop[3] > this.hitSlop[3];
        if (this.guiSys.cursorVisibility === 'auto' && needsUpdate) {
          intersect = intersectRectangle(this.frame, this.cursorVisibilitySlop);
        }
        if (!intersect) {
          return;
        }
        isAlmostHit = true;
      }

      intersectionPointWorld.copy(intersect);
      intersectionPointWorld.applyMatrix4(this.matrixWorld);

      const distance = raycaster.ray.origin.distanceTo(intersectionPointWorld);

      if (distance < raycaster.near || distance > raycaster.far) return;

      intersects.push({
        distance: distance,
        point: intersectionPointWorld.clone(),
        object: this,
        isAlmostHit: isAlmostHit,
        uv: intersectionNormalized.clone(),
      });
    };
  })(),
  /* eslint-enable */

  clone: function() {
    return new this.constructor(this.material).copy(this);
  },

  dispose: function() {
    if (this.geometry) {
      this.geometry.dispose();
      this.geometry = null;
    }
    if (this.material) {
      this.material.dispose();
      this.material = null;
    }
  },
});
