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
'use strict';

const AnimatedImplementation = require('AnimatedImplementation');
const processColor = require('processColor');
const Pano = require('Pano');

/**
 * An array of animated values for driving animations
 */
class AnimatedValueArray extends AnimatedImplementation.ValueComposite {
  _array: Array<Object>;

  constructor(valueArray: Array<Object>) {
    super();
    this._array = valueArray;
  }

  getArrayElement(index) {
    return this._array[index];
  }

  __getValue(): Array<Object> {
    return this._array.map(value => {
      if (value instanceof AnimatedImplementation.ValueBase) {
        return value.__getValue();
      } else {
        return value;
      }
    });
  }

  __getAnimatedValue(): Array<Object> {
    return this._array.map(value => {
      if (value instanceof AnimatedImplementation.ValueBase) {
        return value.__getAnimatedValue();
      } else {
        return value;
      }
    });
  }

  __attach(): void {
    this._array.forEach(value => {
      if (value instanceof AnimatedImplementation.ValueBase) {
        value.__addChild(this);
      }
    });
  }

  __detach(): void {
    this._array.forEach(value => {
      if (value instanceof AnimatedImplementation.ValueBase) {
        value.__removeChild(this);
      }
    });
  }
}

const ColorArrayFromHexARGB = function(hex) {
  hex = Math.floor(hex);
  return [
    ((hex >> 24) & 255) / 255, // a
    ((hex >> 16) & 255) / 255, // r
    ((hex >> 8) & 255) / 255, // g
    (hex & 255) / 255, //b
  ];
};

const ColorArrayToHexRGBA = function(color) {
  return (
    (((color[1] * 255) << 24) ^
      ((color[2] * 255) << 16) ^
      ((color[3] * 255) << 8) ^
      ((color[0] * 255) << 0)) >>>
    0
  );
};

class AnimatedValueColor extends AnimatedImplementation.ValueComposite {
  _color: Array<AnimatedImplementation.value>;

  constructor(color: number | string) {
    super();
    const colorArray = ColorArrayFromHexARGB(processColor(color));
    this._color = colorArray.map(value => {
      return new AnimatedImplementation.Value(value);
    });
  }

  setValue(color: number | string) {
    const colorArray = ColorArrayFromHexARGB(processColor(color));
    for (let i = 0; i < colorArray.length; i++) {
      this._color[i].setValue(colorArray[i]);
    }
  }

  getColor(index) {
    return this._color;
  }

  __getValue(): number {
    const colorArray = this._color.map(value => {
      return value.__getValue();
    });
    return ColorArrayToHexRGBA(colorArray);
  }

  __getAnimatedValue(): number {
    const colorArray = this._color.map(value => {
      return value.__getAnimatedValue();
    });
    return ColorArrayToHexRGBA(colorArray);
  }

  __attach(): void {
    this._color.forEach(value => {
      if (value instanceof AnimatedImplementation.ValueBase) {
        value.__addChild(this);
      }
    });
  }

  __detach(): void {
    this._color.forEach(value => {
      if (value instanceof AnimatedImplementation.ValueBase) {
        value.__removeChild(this);
      }
    });
  }
}

const colorAnim = function(
  value: AnimatedValueColor,
  config: Object,
  anim: (value: AnimatedValue, config: Object) => CompositeAnimation
): ?CompositeAnimation {
  const toValueArray = config.toValue
    ? ColorArrayFromHexARGB(processColor(config.toValue))
    : undefined;
  const color = value.getColor();
  const ainmArray = [];
  for (let i = 0; i < color.length; i++) {
    const colorConfig = {...config};
    if (toValueArray) {
      colorConfig.toValue = toValueArray[i];
    }
    ainmArray.push(anim(color[i], colorConfig));
  }
  return AnimatedImplementation.parallel(ainmArray, {stopTogether: false});
};

const colorSpring = function(
  value: AnimatedValueColor,
  config: SpringAnimationConfig
): CompositeAnimation {
  return colorAnim(value, config, AnimatedImplementation.spring);
};

const colorTiming = function(
  value: AnimatedValueColor,
  config: SpringAnimationConfig
): CompositeAnimation {
  return colorAnim(value, config, AnimatedImplementation.timing);
};

const colorDecay = function(
  value: AnimatedValueColor,
  config: SpringAnimationConfig
): CompositeAnimation {
  return colorAnim(value, config, AnimatedImplementation.decay);
};

module.exports = {
  Pano: AnimatedImplementation.createAnimatedComponent(Pano),

  ValueArray: AnimatedValueArray,
  ValueColor: AnimatedValueColor,

  colorSpring,
  colorTiming,
  colorDecay,
};
