/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule Entity
 * @flow
 */

import * as React from 'react';
import ReactNative from 'ReactNative';
import requireNativeComponent from 'requireNativeComponent';
import resolveAssetSource from 'resolveAssetSource';

import type {ViewProps} from 'ViewPropTypes';

type EntitySource =
  | {
      gltf2: string,
    }
  | {
      obj: string | number,
    }
  | {
      mtl: string | number,
      obj: string | number,
    };

type Props = ViewProps & {
  source: EntitySource,
};

/**
 * Entity allows you to render 3D objects.
 *
 * Entity currently supports the Wavefront OBJ file format, a common
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
 * // Entity with a material
 * <Entity
 *   source={{
 *     obj: asset('sculpture.obj'),
 *     mtl: asset('sculpture.mtl'),
 *   }}
 * />
 *
 * // Entity without a material
 * <Entity
 *   source={{
 *     obj: asset('standalone.obj'),
 *   }}
 * />
 * ```
 */

const RCTEntity = requireNativeComponent('Model', null, {
  nativeOnly: {},
});

export default class Entity extends ReactNative.NativeComponent<Props> {
  render() {
    const {source, ...rest} = this.props;
    if (source) {
      if (typeof source.mtl === 'number') {
        source.mtl = resolveAssetSource(source.mtl);
      }
      if (typeof source.obj === 'number') {
        source.obj = resolveAssetSource(source.obj);
      }
    }
    rest.style = rest.style || {};
    if (!rest.style.position) {
      rest.style.position = 'absolute';
    }
    // default meshes to being a render group
    if (!rest.style.renderGroup) {
      rest.style.renderGroup = true;
    }
    return <RCTEntity {...rest} source={source} />;
  }
}
