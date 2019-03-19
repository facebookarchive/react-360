/**
 * This is the correspond js view of RCTWorkInProgressSurface native view.
 * It's children will render to the surface it defines.
 * So you can easily create a surface subview like following:
 *  <View>   --- parent view
 *    <WorkInProgressSurface>  --- definition of surface
 *      <View />  --- sub views rendered to the surface
 *    </WorkInProgressSurface>
 *  </View>
 */
'use strict';

import React from 'React';
import ReactNative from 'ReactNative';
import requireNativeComponent from 'requireNativeComponent';

import type {ViewProps} from 'ViewPropTypes';

export type Shape =
  | {type: 'quad'} // A flat quad
  | {type: 'cylinder', radius: number}; // A cylinder shape, curvature is defined by the radius

export type Props = ViewProps & {
  /**
   * The shape of the surface. This can be quad, cylinder, etc...
   */
  shape: Shape,

  /**
   * The height of the surface measured in device independent pixels
   */
  surfaceHeight: number,

  /**
   * The width of the surface measured in device independent pixels
   */
  surfaceWidth: number,
};

export default class WorkInProgressSurface extends ReactNative.NativeComponent<Props> {
  render() {
    const {style, ...props} = this.props;
    return <RKSurface {...props} style={[style, {position: 'absolute'}]} />;
  }
}

const cfg = {
  nativeOnly: {
  },
};
const RKSurface = requireNativeComponent('RCTWorkInProgressSurface', WorkInProgressSurface, cfg);
