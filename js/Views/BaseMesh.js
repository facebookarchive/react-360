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

import * as THREE from 'three';
import type {Geometry, Texture, Material, ShaderMaterial} from 'three';
import UIView from '../OVRUI/UIView/UIView';
import extractURL from '../Utils/extractURL';
import merge from '../Utils/merge';
import * as Flexbox from '../Renderer/FlexboxImplementation';

import type GuiSys from '../OVRUI/UIView/GuiSys';
import type {ReactNativeContext} from '../ReactNativeContext';
import RCTBaseView from './BaseView';

type ResourceSpecifier =
  | void
  | null
  | string
  | {repeat?: Array<number>, uri: string};

export default class RCTBaseMesh extends RCTBaseView {
  _color: ?number;
  _lit: boolean;
  _shader: boolean;
  _wireframe: boolean;
  _textureURL: null | string;
  _loadingURL: null | string;
  _texture: null | Texture;
  _litMaterial: Material;
  _unlitMaterial: Material;
  _shaderMaterial: ShaderMaterial;
  _shaderUniformsMap: any;
  mesh: any;
  _geometry: any;
  _rnctx: ReactNativeContext;

  constructor(guiSys: GuiSys, rnctx: ReactNativeContext) {
    super();

    this._lit = false;
    this._shader = false;
    this._wireframe = false;
    this._textureURL = null;
    this._loadingURL = null;
    this._texture = null; // Cache for THREE Texture
    this._litMaterial = new THREE.MeshPhongMaterial({color: 0xffffff}); // THREE Material to use when texture or color used, lit === true
    this._unlitMaterial = new THREE.MeshBasicMaterial({color: 0xffffff}); // THREE Material to use when texture or color used, lit === false
    this._shaderMaterial = new THREE.ShaderMaterial(); // THREE Material to use when fragment or vertex shader specified in material parameters
    this._shaderUniformsMap = {
      texture: {
        value: null,
      },
    };
    this._rnctx = rnctx;

    this.mesh = null;
    this.view = new UIView(guiSys);

    Object.defineProperty(
      this.style,
      'opacity',
      ({
        configurable: true,
        set: value => {
          if (value === null) {
            this._litMaterial.opacity = 1;
            this._unlitMaterial.opacity = 1;
            this._litMaterial.transparent = false;
            this._unlitMaterial.transparent = false;
          } else {
            this._litMaterial.opacity = value;
            this._unlitMaterial.opacity = value;
            this._litMaterial.transparent = value < 1;
            this._unlitMaterial.transparent = value < 1;
          }
        },
      }: Object),
    );
    Object.defineProperty(
      this.props,
      'pointerEvents',
      ({
        set: value => {
          if (value === null) {
            value = 'auto';
          }
          this.view.setPointerEvents(value);
        },
      }: Object),
    );

    Object.defineProperty(
      this.props,
      'lit',
      ({
        set: this._setLit.bind(this),
      }: Object),
    );

    Object.defineProperty(
      this.props,
      'wireframe',
      ({
        set: this._setWireframe.bind(this),
      }: Object),
    );

    Object.defineProperty(
      this.props,
      'materialParameters',
      ({
        set: this._setMaterialParameters.bind(this),
      }: Object),
    );
    Object.defineProperty(
      this.props,
      'texture',
      ({
        set: this._setTexture.bind(this),
      }: Object),
    );

    Object.defineProperty(
      this.style,
      'color',
      ({
        set: this._setColor.bind(this),
      }: Object),
    );
  }

  _setColor(color: ?number) {
    this._color = color;
    if (color == null) {
      this._litMaterial.color.setHex(0xffffff);
      this._unlitMaterial.color.setHex(0xffffff);
    } else {
      this._litMaterial.color.setHex(color);
      this._unlitMaterial.color.setHex(color);
    }
  }

  _setTexture(value: ResourceSpecifier) {
    if (!value) {
      if (this._texture) {
        this._texture = null;
        if (this._textureURL) {
          // Release the reference to the original texture
          this._rnctx.TextureManager.removeReference(this._textureURL);
          this._textureURL = null;
        }
      }
      // Remove texture from textured materials
      this._litMaterial.map = null;
      this._unlitMaterial.map = null;
      this._shaderUniformsMap.texture.value = null;
      this._litMaterial.needsUpdate = true;
      this._unlitMaterial.needsUpdate = true;
      this._shaderMaterial.needsUpdate = true;
      return;
    }
    const url = extractURL(value);
    if (!url) {
      throw new Error(
        `Invalid value for "texture" property: ${JSON.stringify(value)}`,
      );
    }
    const repeat = typeof value === 'object' ? value.repeat : null;
    this._loadingURL = url;
    const manager = this._rnctx.TextureManager;
    manager.addReference(url);
    manager
      .getTextureForURL(url)
      .then(
        texture => {
          if (url !== this._loadingURL) {
            // We've started to load another texture since this request began
            manager.removeReference(url);
            return;
          }
          this._loadingURL = null;
          if (this._textureURL) {
            manager.removeReference(this._textureURL);
          }
          this._texture = texture;
          this._texture.needsUpdate = true;
          this._textureURL = url;
          if (repeat && Array.isArray(repeat)) {
            this._texture.wrapS = THREE.RepeatWrapping;
            this._texture.wrapT = THREE.RepeatWrapping;
            this._texture.repeat.set(...repeat);
          }
          // TODO: Consider providing props on BaseMesh to control these as well
          this._litMaterial.map = this._texture;
          this._unlitMaterial.map = this._texture;
          this._shaderUniformsMap.texture.value = texture;
          this._litMaterial.needsUpdate = true;
          this._unlitMaterial.needsUpdate = true;
          this._shaderMaterial.needsUpdate = true;
        },
        err => {
          manager.removeReference(url);
          this._loadingURL = null;
          console.error(err);
        },
      )
      .catch(err => {
        console.error(err);
      });
  }

  _setLit(flag: boolean) {
    this._lit = flag;
    const mat = this._shader
      ? this._shaderMaterial
      : flag
        ? this._litMaterial
        : this._unlitMaterial;
    if (this.mesh) {
      this.mesh.material = mat;
    }
  }

  _setWireframe(flag: boolean) {
    this._wireframe = flag;
    this._litMaterial.wireframe = flag;
    this._unlitMaterial.wireframe = flag;
  }

  _setGeometry(geometry: Geometry) {
    if (!this.mesh) {
      const mat = this._shader
        ? this._shaderMaterial
        : this._lit
          ? this._litMaterial
          : this._unlitMaterial;
      this.mesh = new THREE.Mesh(geometry, mat);
      this.view.add(this.mesh);
    } else {
      this.mesh.geometry = geometry;
    }
  }

  _setMaterialParameters(parameters: any) {
    if (!parameters) {
      parameters = {
        fog: true,

        blending: THREE.NormalBlending,
        side: THREE.FrontSide,
        shading: THREE.SmoothShading,
        vertexColors: THREE.NoColors,

        transparent: false,

        blendSrc: THREE.SrcAlphaFactor,
        blendDst: THREE.OneMinusSrcAlphaFactor,
        blendEquation: THREE.AddEquation,
        blendSrcAlpha: null,
        blendDstAlpha: null,
        blendEquationAlpha: null,

        depthFunc: THREE.LessEqualDepth,
        depthTest: true,
        depthWrite: true,

        clippingPlanes: null,
        clipShadows: false,

        colorWrite: true,
      };
    }
    if (parameters.vertexShader || parameters.fragmentShader) {
      // extract the uniforms
      const uniforms = parameters.uniforms || {};
      delete parameters.uniforms;

      // set value of uniform is cached so we need to make changes to that
      const targetUniforms = this._shaderMaterial.uniforms;
      for (const uniform in targetUniforms) {
        delete targetUniforms[uniform];
      }
      for (const uniform in this._shaderUniformsMap) {
        targetUniforms[uniform] = this._shaderUniformsMap[uniform];
      }
      for (const uniform in uniforms) {
        targetUniforms[uniform] = uniforms[uniform];
      }

      // assign the reset via the usual path
      this._shaderMaterial.setValues(parameters);
      this._shader = true;
      if (this.mesh) {
        this.mesh.material = this._shaderMaterial;
      }
    } else {
      this._litMaterial.setValues(parameters);
      this._unlitMaterial.setValues(parameters);
      this._shader = false;
      if (this.mesh) {
        this.mesh.material = this._lit
          ? this._litMaterial
          : this._unlitMaterial;
      }
    }
  }

  presentLayout() {
    super.presentLayout();
    if (this.mesh && this.mesh.geometry) {
      this.mesh.geometry.visible =
        this.YGNode.getDisplay() !== Flexbox.DISPLAY_NONE;
    }
  }

  dispose() {
    if (this._texture) {
      this._texture = null;
      if (this._textureURL) {
        // Release the reference to the original texture
        this._rnctx.TextureManager.removeReference(this._textureURL);
        this._textureURL = null;
      }
    }
    this._litMaterial.dispose();
    this._shaderMaterial.dispose();
    this._unlitMaterial.dispose();
    super.dispose();
    this._geometry = null;
    this.mesh = null;
  }

  static describe() {
    return merge(super.describe(), {
      // register the properties sent from react to runtime
      NativeProps: {
        lit: 'boolean',
        pointerEvents: 'string',
        texture: 'object',
        wireframe: 'boolean',
        materialParameters: 'object',
      },
    });
  }
}
