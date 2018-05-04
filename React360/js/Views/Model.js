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

import {createModelInstance} from '../Loaders/ModelLoaderRegistry';
import merge from '../Utils/merge';

import type GuiSys from '../OVRUI/UIView/GuiSys';
import type {MeshInstance} from '../Loaders/ModelLoaderRegistry';
import type {ReactNativeContext} from '../ReactNativeContext';
import RCTBaseMesh from './BaseMesh';

export default class RCTModel extends RCTBaseMesh {
  instance: MeshInstance | null;

  constructor(guiSys: GuiSys, rnctx: ReactNativeContext) {
    super(guiSys, rnctx);
    this.instance = null;

    Object.defineProperty(
      this.props,
      'source',
      ({
        set: this._setSource.bind(this),
      }: Object),
    );
  }

  _setSource(value: {[key: string]: string}) {
    if (this.instance) {
      // attempt to update the current instance
      if (this.instance.update(value)) {
        return;
      } else {
        // can't update dispose and then recreate
        this.instance && this.instance.dispose();
      }
    }
    this.instance = createModelInstance(
      value,
      this.view,
      this._litMaterial,
      this._unlitMaterial,
    );
    this.instance && this.instance.setLit(this._lit);
  }

  _setLit(flag: boolean) {
    this._lit = flag;

    if (!this.instance) {
      return;
    }
    this.instance.setLit(flag);
  }

  frame(timeStamp: number, deltaTime: number) {
    if (!this.instance) {
      return;
    }
    this.instance.frame(timeStamp, deltaTime);
  }

  dispose() {
    if (this.instance) {
      this.instance.dispose();
    }
    this.instance = null;
    super.dispose();
  }

  static describe() {
    return merge(super.describe(), {
      // register the properties sent from react to runtime
      NativeProps: {
        source: 'object',
      },
    });
  }
}
