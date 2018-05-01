/**
 * Copyright (c) 2016-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

// UIViewUtil is a helper for UIView.
// Initialize parameters for an object using its setter methods. If setter doesn't exist,
// report error. Used to avoid sequence of setter function calls.
// example:
//   setParams(myObject, {'key': 'value', 'keyTwo': 2});  would resolve to...
//   myObject.setKey('value'); myObject.setKeyTwo(2);
//
export function setParams(object, params) {
  if (params === undefined) {
    return;
  }

  for (const key in params) {
    const func = `set${key.charAt(0).toUpperCase()}${key.slice(1)}`; // capitalize first letter
    if (typeof object[func] !== 'function') {
      console.warn(`"${func}" is not a function of UIView.`);
      continue;
    }

    const newValue = params[key];
    object[func](newValue);
  }
}

/*
 * Scale type performs calculations for doing Image Resize for UIView.
 * Call getScaleParams to get scale parameters for FourByFourRectGeometry
 */

// Scale the image so that both dimensions of the image will be equal to or less than
// the view dimension. This maintains the image's aspect ratio.
// Inset is disabled in this scale type.
const ScaleFitCenter = {
  getScaleParams: function(dims, textureDim, inset, insetSize, borderWidth) {
    dims = dims || [1, 1];
    textureDim = textureDim || [0, 0];
    let scaledDims = [...dims];
    if (dims[0] > 0 && dims[1] > 0 && textureDim[0] > 0 && textureDim[1] > 0) {
      const scale = [dims[0] / textureDim[0], dims[1] / textureDim[1]];
      const minScale = Math.min(scale[0], scale[1]);
      scaledDims = [textureDim[0] * minScale, textureDim[1] * minScale];
    }
    return {
      dims: scaledDims,
      border: {
        cssBorderWidth: borderWidth,
        originalDim: dims,
      },
      cropUV: [0, 0, 1, 1],
    };
  },
};

// Scale the images width and height independently, this may change the aspect ratio.
// Inset is enabled in this scale type.
const ScaleFixXY = {
  getScaleParams: function(dims, textureDim, inset, insetSize, borderWidth) {
    dims = dims || [1, 1];
    textureDim = textureDim || [0, 0];
    return {
      dims: dims,
      border: {
        texture: inset,
        factor: [
          insetSize[0] / dims[0],
          insetSize[1] / dims[1],
          insetSize[2] / dims[0],
          insetSize[3] / dims[1],
        ],
        cssBorderWidth: borderWidth,
      },
      cropUV: [0, 0, 1, 1],
    };
  },
};

// Scale the image so that both dimensions of the image will be equal to or larger  than
// the view dimension. Pixels outside view will be cropped. This maintains the image's
// aspect ratio.
// Inset is disabled in this scale type.
const ScaleCenterCrop = {
  getScaleParams: function(dims, textureDim, inset, insetSize, borderWidth) {
    dims = dims || [1, 1];
    textureDim = textureDim || [0, 0];
    let cropOffset = [0, 0];
    if (dims[0] > 0 && dims[1] > 0 && textureDim[0] > 0 && textureDim[1] > 0) {
      const scale = [textureDim[0] / dims[0], textureDim[1] / dims[1]];
      const minScale = Math.min(scale[0], scale[1]);
      cropOffset = [
        (1 - dims[0] * minScale / textureDim[0]) / 2,
        (1 - dims[1] * minScale / textureDim[1]) / 2,
      ];
    }
    return {
      dims: dims,
      border: {
        cssBorderWidth: borderWidth,
      },
      cropUV: [
        cropOffset[0],
        cropOffset[1],
        1 - cropOffset[0],
        1 - cropOffset[1],
      ],
    };
  },
};

export const ScaleType = {
  FIT_CENTER: ScaleFitCenter,
  FIT_XY: ScaleFixXY,
  CENTER_CROP: ScaleCenterCrop,
};

// In VR spec, FIT_XY is default
export function defaultScaleType() {
  return ScaleType.FIT_XY;
}

// Convert resizeMode to scale type
export function resizeModetoScaleType(resizeModeValue) {
  if (resizeModeValue === 'contain') {
    return ScaleType.FIT_CENTER;
  } else if (resizeModeValue === 'cover') {
    return ScaleType.CENTER_CROP;
  } else if (resizeModeValue === 'stretch') {
    return ScaleType.FIT_XY;
  } else if (resizeModeValue === 'center') {
    // center does not make sence in VR spec, fallback to contain
    return ScaleType.FIT_CENTER;
  } else if (resizeModeValue == null) {
    // When null or undefined, use the default.
    return defaultScaleType();
  } else {
    console.error(`Invalid resize mode: '${resizeModeValue}'`);
    return defaultScaleType();
  }
}

/*
 * PointerEvents defines how the uiview accept hit event and intercept its subviews's hit event
 * auto: the view and its subviews can be target of hit events
 * none: the view and its subviews can never be the target of hit events.
 * box-none: the view is never the target of hit events but it's subviews can be
 * box-only: the view can be the target of hit events but it's subviews cannot be
 */

export const PointerEvents = {
  AUTO: 'auto',
  NONE: 'none',
  BOX_NONE: 'box-none',
  BOX_ONLY: 'box-only',
};
