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

import RCTBaseView from './BaseView';

import extractURL from '../Utils/extractURL';
import merge from '../Utils/merge';
import RefCountCache from '../Utils/RefCountCache';
import * as OVRUI from 'ovrui';
import * as THREE from 'three';
import * as Yoga from '../Utils/Yoga.bundle';

import type {GuiSys} from 'ovrui';
import type {Geometry, Texture, Material} from 'three';

type ResourceSpecifier = void | null | string | {uri: string};

const textureCache = new RefCountCache(
  // cleanup method
  function(path, tex) {
    tex.dispose();
  }
);

function getTextureForURL(url) {
  if (textureCache.has(url)) {
    textureCache.addReference(url);
    return Promise.resolve(textureCache.get(url));
  }
  return new Promise((resolve, reject) => {
    new THREE.TextureLoader().load(
      url,
      texture => {
        textureCache.addEntry(url, texture);
        resolve(texture);
      },
      undefined,
      error => {
        reject(error);
      }
    );
  });
}

export default class RCTBaseMesh extends RCTBaseView {
  _color: ?number;
  _lit: boolean;
  _wireframe: boolean;
  _textureURL: null | string;
  _texture: null | Texture;
  _litMaterial: Material;
  _unlitMaterial: Material;
  mesh: any;
  _geometry: any;

  constructor(guiSys: GuiSys) {
    super();

    this._lit = false;
    this._wireframe = false;
    this._textureURL = null;
    this._texture = null; // Cache for THREE Texture
    this._litMaterial = new THREE.MeshPhongMaterial({color: 0xffffff}); // THREE Material to use when texture or color used, lit === true
    this._unlitMaterial = new THREE.MeshBasicMaterial({color: 0xffffff}); // THREE Material to use when texture or color used, lit === false

    this.mesh = null;
    this.view = new OVRUI.UIView(guiSys);

    Object.defineProperty(
      this.props,
      'lit',
      ({
        set: this._setLit.bind(this),
      }: Object)
    );

    Object.defineProperty(
      this.props,
      'wireframe',
      ({
        set: this._setWireframe.bind(this),
      }: Object)
    );

    Object.defineProperty(
      this.props,
      'texture',
      ({
        set: this._setTexture.bind(this),
      }: Object)
    );

    Object.defineProperty(
      this.style,
      'color',
      ({
        set: this._setColor.bind(this),
      }: Object)
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
      if (this._texture && this._textureURL) {
        textureCache.removeReference(this._textureURL);
      }
      this._texture = null;
      // Remove texture from textured materials
      this._litMaterial.map = null;
      this._unlitMaterial.map = null;
      this._litMaterial.needsUpdate = true;
      this._unlitMaterial.needsUpdate = true;
      return;
    }
    const url = extractURL(value);
    if (!url) {
      throw new Error('Invalid value for "texture" property: ' + JSON.stringify(value));
    }
    getTextureForURL(url).then(
      texture => {
        this._textureURL = url;
        this._texture = texture;
        // TODO: Provide props on BaseMesh to control these as well
        texture.wrapS = THREE.ClampToEdgeWrapping;
        texture.wrapT = THREE.ClampToEdgeWrapping;
        texture.minFilter = THREE.LinearFilter;
        this._litMaterial.map = texture;
        this._unlitMaterial.map = texture;
        this._litMaterial.needsUpdate = true;
        this._unlitMaterial.needsUpdate = true;
      },
      err => {
        console.error(err);
      }
    );
  }

  _setLit(flag: boolean) {
    this._lit = flag;
    const mat = flag ? this._litMaterial : this._unlitMaterial;
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
      this.mesh = new THREE.Mesh(geometry, this._lit ? this._litMaterial : this._unlitMaterial);
      this.view.add(this.mesh);
    } else {
      this.mesh.geometry = geometry;
    }
  }

  presentLayout() {
    super.presentLayout();
    if (this.mesh && this.mesh.geometry) {
      this.mesh.geometry.visible = this.YGNode.getDisplay() !== Yoga.DISPLAY_NONE;
    }
  }

  dispose() {
    this._litMaterial.dispose();
    this._unlitMaterial.dispose();
    if (this._texture && this._textureURL) {
      textureCache.removeReference(this._textureURL);
    }
    super.dispose();
    this._geometry = null;
    this._texture = null;
    this.mesh = null;
  }

  static describe() {
    return merge(super.describe(), {
      // register the properties sent from react to runtime
      NativeProps: {
        lit: 'boolean',
        texture: 'object',
        wireframe: 'boolean',
      },
    });
  }
}
