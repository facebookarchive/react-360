/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';

const path = require('path');
const rn = path.resolve(require.resolve('react-native'), '..', '..', '..'); // Get to the root of the package

const coreComponents = [
'../Libraries/Components/View/View.js',
'../Libraries/VRReactOverrides/Image.vr.js',
path.join(rn, 'Libraries/Text/Text.js'),
];

const components = [
'../Libraries/Lights/AmbientLight.js',
'../Libraries/Mesh/Box.js',
'../Libraries/Camera/LiveEnvCamera.js',
'../Libraries/Mesh/Cylinder.js',
'../Libraries/VRLayers/CylindricalPanel.js',
'../Libraries/Lights/DirectionalLight.js',
'../Libraries/Mesh/Model.js',
'../Libraries/Pano/Pano.js',
'../Libraries/Mesh/Plane.js',
'../Libraries/Lights/PointLight.js',
'../Libraries/Scene/Scene.js',
'../Libraries/Sound/Sound.js',
'../Libraries/Mesh/Sphere.js',
'../Libraries/Lights/SpotLight.js',
'../Libraries/Video/Video.js',
'../Libraries/Video/VideoControl.js',
'../Libraries/VideoPano/VideoPano.js',
'../Libraries/VrButton/VrButton.js',
];

const apis = [
  path.join(rn, 'Libraries/Animated/src/AnimatedImplementation.js'),
  path.join(rn, 'Libraries/ReactNative/AppRegistry.js'),
  path.join(rn, 'Libraries/AppState/AppState.js'),
  path.join(rn, 'Libraries/Storage/AsyncStorage.js'),
  '../Libraries/VRModules/ControllerInfo.js',
  path.join(rn, 'Libraries/Animated/src/Easing.js'),
  '../Libraries/VRModules/ExternalAssets.js',
  // '../Libraries/VRModules/GlyphTextures.js', // No jsdocs
  path.join(rn, 'Libraries/Geolocation/Geolocation.js'),
  '../Libraries/VRModules/History.js',
  path.join(rn, 'Libraries/Linking/Linking.js'),
  '../Libraries/VRModules/Location.js',
  //'../Libraries/VRModules/ReactVRConstants.js', // No jsdocs
  path.join(rn, 'Libraries/StyleSheet/StyleSheet.js'),
  '../Libraries/Video/MediaPlayerState.js',
  '../Libraries/VRModules/RCTVideoModule.js',
  '../Libraries/Utilities/VrHeadModel.js',
  '../Libraries/Utilities/VrSoundEffects.js',
];

const stylesWithPermalink = [
  '../Libraries/StyleSheet/LayoutPropTypes.vr.js',
  path.join(rn, 'Libraries/StyleSheet/TransformPropTypes.js'),
];

const stylesForEmbed = [
  path.join(rn, 'Libraries/Image/ImageStylePropTypes.js'),
  '../Libraries/StyleSheet/LayoutAndTransformColorPropTypes.js',
  '../Libraries/StyleSheet/LayoutAndTransformTintPropTypes.js',
  '../Libraries/StyleSheet/LayoutAndTransformOpacityPropTypes.js',
  '../Libraries/StyleSheet/LayoutAndTransformPropTypes.js',
  '../Libraries/StyleSheet/LayoutPropTypes.vr.js',
  path.join(rn, 'Libraries/Components/View/ViewStylePropTypes.js'),
  path.join(rn, 'Libraries/Text/TextStylePropTypes.js'),
];

const viewPropTypes = path.join(rn, 'Libraries/Components/View/ViewPropTypes.js');

module.exports = {
  coreComponents,
  components,
  apis,
  stylesWithPermalink,
  stylesForEmbed,
  viewPropTypes,
};
