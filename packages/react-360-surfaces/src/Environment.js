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
import generateEnvironmentSphere from './generateEnvironmentSphere';

const PM = new WebGL.ProgramManager(createEnvironmentSphereProgram);

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

export default class Environment {
  // WebGL properties
  _currentTexture: WebGL.Texture;
  _node: WebGL.Node;
  // fading values
  _bgTransition: ?Promise<Image | ImageBitmap>;
  _fadeTransition: Transition;
  _fadeValue: TransitionValue;

  constructor(gl: WebGLRenderingContext) {
    const prog = PM.getProgram(gl);
    this._node = new WebGL.Node(gl, prog);
    this._node.addAttribute('a_position');
    const {geometry, index} = generateEnvironmentSphere(900);
    this._node.bufferData(geometry);
    this._node.bufferIndex(index);
    this._fadeTransition = new Transition(Timing.linear, 500);
    this._fadeValue = new TransitionValue(this._fadeTransition, 1.0);

    this._currentTexture = new WebGL.Texture(gl);
    this._node.setUniform('u_texture', this._currentTexture);
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
  }

  /**
   * Set the currently-displayed Texture on the environment
   */
  setTexture(texture: WebGL.Texture) {
    this._currentTexture = texture;
    this._node.setUniform('u_texture', texture);
  }

  setSource(url: string) {
    this._bgTransition = loadImageFromURL(url);
    this._bgTransition.then(img => {
      if (!this._fadeValue.isActive()) {
        this._currentTexture.setSource(img);
        this._fadeValue.setValue(0);
        this._bgTransition = null;
      }
    });
    this._fadeValue.setValue(1);
  }

  /**
   * Retrieve the currently set Texture
   */
  getTexture() {
    return this._currentTexture;
  }

  /**
   * Return the GL geometry node for the surface
   */
  getNode() {
    return this._node;
  }

  frame() {
    if (this._fadeValue.isActive()) {
      this._node.setUniform('u_tintlevel', Math.max(0, Math.min(1, this._fadeValue.getValue())));
    } else {
      if (this._bgTransition) {
        this._bgTransition.then(img => {
          this._currentTexture.setSource(img);
          this._fadeValue.setValue(0);
          this._bgTransition = null;
        });
      }
    }
  }
}
