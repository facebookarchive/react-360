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

import * as WebGL from 'webgl-lite';
import {Timing, Transition, TransitionValue} from 'transition-value';
import createEnvironmentSphereProgram from './createEnvironmentSphereProgram';
import createEnvironmentCubemapProgram from './createEnvironmentCubemapProgram';
import generateEnvironmentSphere from './generateEnvironmentSphere';

const PanoMode = {
  MONO: {offsets: [[0, 0, 1, 1], [0, 0, 1, 1]]},
  '3DTB': {offsets: [[0, 0, 1, 0.5], [0, 0.5, 1, 0.5]]},
  '3DBT': {offsets: [[0, 0.5, 1, 0.5], [0, 0, 1, 0.5]]},
  '3DLR': {offsets: [[0, 0, 0.5, 1], [0.5, 0, 0.5, 1]]},
};

export type SourceOptions = {
  format?: string,
};

const SpherePM = new WebGL.ProgramManager(createEnvironmentSphereProgram);
const CubePM = new WebGL.ProgramManager(createEnvironmentCubemapProgram);

function loadImageFromURL(url): Promise<Image | ImageBitmap> {
  return typeof self.createImageBitmap === 'function'
    ? new Promise((resolve, reject) => {
        fetch(url, {mode: 'cors'})
          .then(response => response.blob())
          .then(blob => {
            return self.createImageBitmap(blob);
          })
          .then(
            img => {
              resolve(img);
            },
            () => {
              // Network or bitmap error occurred, try img fallback
              imgPromise(url).then(resolve, reject);
            }
          );
      })
    : imgPromise(url);
}

function imgPromise(src): Promise<Image> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = () => {
      resolve(img);
    };
    img.onerror = () => {
      reject();
    };
    img.src = src;
  });
}

function approxEquals(a: number, b: number) {
  return Math.abs(a - b) < 0.00001;
}

export default class Environment {
  // WebGL properties
  _cubemapNode: WebGL.Node;
  _cubemapTexture: WebGL.CubemapTexture;
  _equirectTexture: WebGL.Texture;
  _node: WebGL.Node;
  _rg: WebGL.RenderGroup;
  // fading values
  _bgFormat: ?string;
  _bgTransition: ?Promise<null | Image | ImageBitmap | Array<Image | ImageBitmap>>;
  _fadeTransition: Transition;
  _fadeValue: TransitionValue;

  constructor(gl: WebGLRenderingContext, group: WebGL.RenderGroup) {
    const prog = SpherePM.getProgram(gl);
    this._rg = group;
    this._node = new WebGL.Node(gl, prog);
    this._rg.addNode(this._node);
    this._node.addAttribute('a_position');
    const {geometry, index} = generateEnvironmentSphere(900);
    this._node.bufferData(geometry);
    this._node.bufferIndex(index);
    this._fadeTransition = new Transition(Timing.linear, 500);
    this._fadeValue = new TransitionValue(this._fadeTransition, 1.0);

    this._equirectTexture = new WebGL.Texture(gl);
    this._node.setUniform('u_texture', this._equirectTexture);
    this._node.setVisible(false);

    this._cubemapTexture = new WebGL.CubemapTexture(gl);
    this._cubemapNode = new WebGL.Node(gl, CubePM.getProgram(gl));
    this._cubemapNode.addAttribute('a_position');
    this._cubemapNode.bufferData([-1, 1, 1, 1, 1, -1, -1, -1]);
    this._cubemapNode.bufferIndex([1, 0, 3, 3, 2, 1]);
    this._cubemapNode.setUniform('u_texture', this._cubemapTexture);
    this._cubemapNode.setVisible(false);
    this._rg.addNode(this._cubemapNode);
  }

  /**
   * Rotate the environment sphere around the y-axis
   */
  setRotation(r: number) {
    const sin = Math.sin(r);
    const cos = Math.cos(r);
    this._node.setUniform('u_transform', [cos, 0, sin, 0, 0, 1, 0, 0, -sin, 0, cos, 0, 0, 0, 0, 1]);
  }

  /**
   * Set the opacity of the tint color, on a scale from 0 to 1.
   * This can be used to fade out the current texture, or fade in a new one.
   */
  setTintLevel(tint: number) {
    // Explicitly override any active fade
    const level = Math.max(0, Math.min(1, tint));
    this._fadeValue.setImmediateValue(level);
    this._node.setUniform('u_tintlevel', level);
    this._cubemapNode.setUniform('u_tintlevel', level);
  }

  /**
   * Set the currently-displayed Texture on the environment
   */
  setTexture(texture: WebGL.Texture) {
    this._equirectTexture = texture;
    this._node.setUniform('u_texture', texture);
    this._cubemapNode.setVisible(false);
    this._node.setVisible(true);
  }

  setSource(url: string | Array<string>, options?: SourceOptions = {}) {
    if (Array.isArray(url)) {
      this._bgTransition = Promise.all(url.map(u => loadImageFromURL(u)));
    } else if (url == null) {
      this._bgTransition = Promise.resolve(null);
    } else {
      this._bgTransition = loadImageFromURL(url);
    }
    this._bgFormat = options.format;
    this._bgTransition.then(img => {
      if (!this._fadeValue.isActive()) {
        if (img != null) {
          this._updateTexture(img, options.format);
          this._fadeValue.setValue(0);
        }
        this._bgTransition = null;
      }
    });
    this._fadeValue.setValue(1);
  }

  /**
   * Retrieve the currently set Texture
   */
  getTexture() {
    return this._equirectTexture;
  }

  /**
   * Return the GL geometry node for the surface
   */
  getNode() {
    return this._node;
  }

  frame() {
    if (this._fadeValue.isActive()) {
      this._cubemapNode.setUniform(
        'u_tintlevel',
        Math.max(0, Math.min(1, this._fadeValue.getValue()))
      );
      this._node.setUniform('u_tintlevel', Math.max(0, Math.min(1, this._fadeValue.getValue())));
    } else {
      if (this._bgTransition) {
        this._bgTransition.then(img => {
          if (img != null) {
            this._updateTexture(img, this._bgFormat || '');
            this._fadeValue.setValue(0);
          }
          this._bgTransition = null;
        });
      }
    }
  }

  _updateTexture(img: Image | ImageBitmap | Array<Image | ImageBitmap>, format?: string = '') {
    let width = 0;
    let height = 0;
    if (img instanceof Image) {
      width = img.naturalWidth;
      height = img.naturalHeight;
    } else if (!Array.isArray(img)) {
      width = img.width;
      height = img.height;
    }
    let arclenReciprocal = 1 / Math.PI;
    let cube = false;
    if (Array.isArray(img)) {
      this._cubemapTexture.setSource(img, 1, 1);
      cube = true;
    } else if (format === 'CUBEMAP_32' || approxEquals(width / 3, height / 2)) {
      this._cubemapTexture.setSource(img, 3, 2);
      cube = true;
    } else if (format === 'CUBEMAP_23' || approxEquals(width / 2, height / 3)) {
      this._cubemapTexture.setSource(img, 2, 3);
      cube = true;
    } else if (format === 'CUBEMAP_16' || approxEquals(width, height / 6)) {
      this._cubemapTexture.setSource(img, 1, 6);
      cube = true;
    } else if (format === 'CUBEMAP_61' || approxEquals(width / 6, height)) {
      this._cubemapTexture.setSource(img, 6, 1);
      cube = true;
    } else if (width === height) {
      // 1:1 ratio, 180 mono or top/bottom 360 3D
      if (format === '3DTB' || format === '3DBT') {
        // 360 top-bottom 3D or 360 top-bottom 3D
        arclenReciprocal = 1 / Math.PI / 2;
      }
      this._equirectTexture.setSource(img);
    } else if (width / 2 === height) {
      // 2:1 ratio, 360 mono or 180 3D
      if (format !== '3DLR') {
        // assume 360 mono
        arclenReciprocal = 1 / Math.PI / 2;
      }
      this._equirectTexture.setSource(img);
    }
    if (cube) {
      this._cubemapNode.setVisible(true);
      this._node.setVisible(false);
    } else {
      this._cubemapNode.setVisible(false);
      this._node.setVisible(true);
      let offsets = PanoMode.MONO.offsets;
      if (format in PanoMode) {
        offsets = PanoMode[format].offsets;
      }
      this._node.setUniform('u_left_view', offsets[0]);
      this._node.setUniform('u_right_view', offsets[1]);
      this._node.setUniform('u_arclen_reciprocal', arclenReciprocal);
    }
  }
}
