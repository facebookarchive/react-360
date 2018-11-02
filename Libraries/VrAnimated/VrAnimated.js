/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule VrAnimated
 * @flow
 */

/* eslint-disable no-bitwise,import/no-commonjs */

import AnimatedNode from 'AnimatedNode';
import AnimatedWithChildren from 'AnimatedWithChildren';

/**
 * An array of animated values for driving animations
 */
class AnimatedValueArray extends AnimatedWithChildren {
  _array: Array<Object>;

  constructor(valueArray: Array<Object>) {
    super();
    this._array = valueArray;
  }

  getArrayElement(index: number) {
    return this._array[index];
  }

  __getValue(): Array<Object> {
    return this._array.map(value => {
      if (value instanceof AnimatedNode) {
        return value.__getValue();
      } else {
        return value;
      }
    });
  }

  __getAnimatedValue(): Array<Object> {
    return this._array.map(value => {
      if (value instanceof AnimatedNode) {
        return value.__getAnimatedValue();
      } else {
        return value;
      }
    });
  }

  __attach(): void {
    this._array.forEach(value => {
      if (value instanceof AnimatedNode) {
        value.__addChild(this);
      }
    });
  }

  __detach(): void {
    this._array.forEach(value => {
      if (value instanceof AnimatedNode) {
        value.__removeChild(this);
      }
    });
  }
}

module.exports = {
  ValueArray: AnimatedValueArray,
};
