/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule Model
 */
'use strict';

const NativeMethodsMixin = require('NativeMethodsMixin');
const PropTypes = require('prop-types');
const React = require('React');
const ReactNativeViewAttributes = require('ReactNativeViewAttributes');
const View = require('View');
const StyleSheetPropType = require('StyleSheetPropType');
const LayoutAndTransformColorPropTypes = require('LayoutAndTransformColorPropTypes');

const createReactClass = require('create-react-class');
const requireNativeComponent = require('requireNativeComponent');
const resolveAssetSource = require('resolveAssetSource');

/**
 * Model allows you to render 3D objects in React VR.
 *
 * React VR currently supports the Wavefront OBJ file format, a common
 * representation for 3D models. In the future, we hope to expand this with
 * the ability to initialize custom loaders at runtime.
 *
 * The external resource (or resources) containing the model information is
 * provided using a `source` attribute, which is an object of key-value pairs
 * mapping resource types to their locations.
 *
 * The following properties are currently supported:
 *
 *   * `obj` - Location of an OBJ-formatted model.
 *   * `mtl` - Location of a MTL-formatted material (the companion to OBJ)
 *
 * These values can be static strings, asset() calls, or require() statements.
 *
 * ```
 * // Model with a material
 * <Model
 *   source={{
 *     obj: asset('sculpture.obj'),
 *     mtl: asset('sculpture.mtl'),
 *   }}
 * />
 *
 * // Model without a material
 * <Model
 *   source={{
 *     obj: asset('standalone.obj'),
 *   }}
 * />
 * ```
 *
 * Like the 3D primitives, Model also supports the `lit` and `texture` props.
 * If `lit` is true, the Model's materials are affected by scene lighting. This
 * overrides any settings from an MTL file.
 * If `texture` is specified, React VR looks up the corresponding image
 * and uses it to texture the Model. The texture is only used if an MTL file
 * is not specified. This can be a string, an asset() call, or a require().
 *
 * <Model
 *   source={{
 *     obj: asset('barrel.obj'),
 *   }}
 *   lit={true}
 *   texture={asset('barrel.png')}
 * />
 */

const Model = createReactClass({
  mixins: [NativeMethodsMixin],

  propTypes: {
    ...View.propTypes,
    style: StyleSheetPropType(LayoutAndTransformColorPropTypes),

    /**
     * The lit property specifies if the Model will be affected by lights placed in the scene.
     */
    lit: PropTypes.bool,

    /**
     * Set material parameters in three.js
     */
    materialParameters: PropTypes.object,

    /**
     * `obj` is a string representing the resource identifier for the Model, this must be
     * an http address.
     * The source properties will enable future expansion to support additional formats
     */
    source: PropTypes.object,

    /**
     * The texture property specifies the url of the texture to be used for the Model.
     * To make texture repeat, pass an object with `repeat` property, for example:
     * `texture={{ ...asset('path/to/texture.jpg'), repeat: [4, 4] }}`
     *
     * First and second element in `repeat` sets how many times texture is repeated
     * in x and y directions.
     */
    texture: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
      PropTypes.shape({
        uri: PropTypes.string.isRequired,
        repeat: PropTypes.arrayOf(PropTypes.number),
      }),
    ]),

    /**
     * Specifying true for this property will cause the object to be displayed as a wireframe
     */
    wireframe: PropTypes.bool,
  },

  viewConfig: {
    uiViewClassName: 'Model',
    validAttributes: {
      ...ReactNativeViewAttributes.RCTView,
    },
  },

  getDefaultProps() {
    return {};
  },

  render() {
    let {texture, source, ...rest} = this.props;

    if (source) {
      // Temporary forwarding of props until deprecation is complete
      if (source.hasOwnProperty('lit')) {
        console.warn(
          '"lit" is now a top-level property of Model, and no longer part of "source". ' +
            'Please review the documentation for the latest API'
        );
        rest.lit = source.lit;
      }
      if (source.mesh) {
        console.warn(
          'source.mesh has been renamed to source.obj for OBJ files. ' +
            'Please review the documentation for the latest API'
        );
        source.obj = source.mesh;
        delete source.mesh;
      }
      // End prop forwarding

      if (typeof source.mtl === 'number') {
        source.mtl = resolveAssetSource(source.mtl);
      }
      if (typeof source.obj === 'number') {
        source.obj = resolveAssetSource(source.obj);
      }
    }

    if (typeof texture === 'number') {
      texture = resolveAssetSource(texture);
    }
    rest.style = rest.style || {};
    if (!rest.style.position) {
      rest.style.position = 'absolute';
    }
    // default meshes to being a render group
    if (!rest.style.renderGroup) {
      rest.style.renderGroup = true;
    }
    return (
      <RKModel
        {...rest}
        texture={texture}
        source={source}
        onStartShouldSetResponder={() => true}
        onResponderTerminationRequest={() => false}
      />
    );
  },
});

const RKModel = requireNativeComponent('Model', Model, {});

module.exports = Model;
