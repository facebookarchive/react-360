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

export const Image = 'image';
export const Text = 'text';
export const Quad = 'quad';
export const View = 'quad';

export type Color = number | string;

export type Align = 'auto' | 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
export type Justify = 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around';
export type Transform = [number, number, number, number, number, number, number, number, number];
export type ShadowViewStyles = {|
  alignContent?: ?Align,
  alignItems?: ?Align,
  alignSelf?: ?Align,
  aspectRatio?: ?number,
  borderBottomWidth?: ?number,
  borderLeftWidth?: ?number,
  borderRightWidth?: ?number,
  borderTopWidth?: ?number,
  borderWidth?: ?number,
  bottom?: ?number,
  display?: 'flex' | 'none',
  flex?: ?number,
  flexBasis?: ?number,
  flexDirection?: 'row' | 'column',
  flexGrow?: ?number,
  flexShrink?: ?number,
  flexWrap?: 'wrap' | 'nowrap',
  height?: ?number,
  justifyContent?: ?Justify,
  left?: ?number,
  margin?: ?number,
  marginBottom?: ?number,
  marginHorizontal?: ?number,
  marginLeft?: ?number,
  marginRight?: ?number,
  marginTop?: ?number,
  marginVertical?: ?number,
  maxHeight?: ?number,
  maxWidth?: ?number,
  minHeight?: ?number,
  minWidth?: ?number,
  overflow?: 'visible' | 'hidden' | 'scroll',
  padding?: ?number,
  paddingBottom?: ?number,
  paddingHorizontal?: ?number,
  paddingLeft?: ?number,
  paddingRight?: ?number,
  paddingTop?: ?number,
  paddingVertical?: ?number,
  position?: 'absolute' | 'relative',
  right?: ?number,
  top?: ?number,
  transform?: ?Transform,
  width?: ?number,
|};

export type ShadowViewWebGLStyles = {|
  ...ShadowViewStyles,
  backgroundColor?: ?Color,
  borderBottomLeftRadius?: ?number,
  borderBottomRightRadius?: ?number,
  borderColor?: ?Color,
  borderRadius?: ?number,
  borderTopLeftRadius?: ?number,
  borderTopRightRadius?: ?number,
  cursor?: ?string,
  gradientColorA?: ?Color,
  gradientColorB?: ?Color,
  gradientAngle?: ?string,
  opacity?: ?number,
  zIndex?: ?number,
|};

export type ViewStyles = {|
  ...ShadowViewWebGLStyles,
|};
