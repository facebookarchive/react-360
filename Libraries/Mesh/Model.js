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
const PropTypes = require('react/lib/ReactPropTypes');
const React = require('React');
const ReactNativeViewAttributes = require('ReactNativeViewAttributes');
const View = require('View');
const StyleSheetPropType = require('StyleSheetPropType');
const LayoutAndTransformColorPropTypes = require('LayoutAndTransformColorPropTypes');
const requireNativeComponent = require('requireNativeComponent');
const resolveAssetSource = require('resolveAssetSource');

/**
 * Model allows you to render 3D objects in React VR.
 *
 * At the moment, React VR supports the Wavefront OBJ file format, a common
 * representation for 3D models. In the future, we hope to expand this with
 * the ability to initialize custom loaders at runtime.
 *
 * The external resource (or resources) containing the model's information are
 * provided using a `source` attribute, which is an object of key-value pairs
 * mapping resource types to their locations.
 *
 * The following properties are currently supported:
 *   - `obj` - Location of an OBJ-formatted model
 *   - `mtl` - Location of a MTL-formatted material (the companion to OBJ)
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
 * overrides any settings from a MTL file.
 * If `texture` is specified, React VR will look up the corresponding image
 * and use it to texture the Model. The texture will only be used if a MTL file
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

const Model = React.createClass({
  mixins: [NativeMethodsMixin],

  propTypes: {
    ...View.propTypes,
    style: StyleSheetPropType(LayoutAndTransformColorPropTypes),

    /**
     * The lit property specifies if the Model will be affected by lights placed in the scene.
     */
    lit: PropTypes.bool,

    /**
     * set material parameters in three.js
     */
    materialParameters: PropTypes.object,

    /**
     * `obj` is a string representing the resource identifier for the Model, this will be
     * an http address
     * The source properties will enable future expansion to support additional formats
     */
    source: PropTypes.object,

    /**
     * `texture` is a string specifying the url of the texture to be used for the Model, this will be
     * an http address
     * If this si not specified the `mtl` of the source model will be used
     */
    texture: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.object]),

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
