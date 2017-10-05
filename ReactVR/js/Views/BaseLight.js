/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

/**
 * Defines RTCBaseLight which maintains an common properties for light objects
 * @class RCTBaseLight
 * @extends RCTBaseView
 */

import RCTBaseView from './BaseView';
import merge from '../Utils/merge';

type ShadowOptions = {
  cast: boolean,
  receive: boolean,
};

function _setDeeply(base, props) {
  for (const prop in props) {
    if (typeof props[prop] === 'object') {
      _setDeeply(base[prop], props[prop]);
    } else {
      base[prop] = props[prop];
    }
  }

  return base;
}

export default class RCTBaseLight extends RCTBaseView {
  /**
   * constructor: allocates the required resources and sets defaults
   */
  constructor() {
    super();

    // In "physically correct" mode, the product of color * intensity is
    // interpreted as luminous intensity measured in candelas.
    Object.defineProperty(
      this.props,
      'intensity',
      ({
        set: this._setIntensity.bind(this),
      }: Object)
    );

    Object.defineProperty(
      this.props,
      'shadow',
      ({
        set: this._setShadow.bind(this),
      }: Object)
    );
  }

  _setShadow(value: ShadowOptions) {
    const {cast, receive, ...restShadowValues} = value;

    this.light.castShadow = cast;
    this.light.receiveShadow = receive;

    if (Object.keys(restShadowValues).length !== 0) {
      _setDeeply(this.light.shadow, restShadowValues);
    }
  }

  _setIntensity(value: number) {
    this.light.intensity = value;
  }

  /**
   * Describes the properties representable by this view type and merges
   * with super type
   */
  static describe() {
    return merge(super.describe(), {
      // declare the native props sent from react to runtime
      NativeProps: {
        intensity: 'number',
        shadow: 'object',
      },
    });
  }
}
