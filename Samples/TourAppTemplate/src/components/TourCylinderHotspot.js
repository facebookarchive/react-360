/**
 * @providesModule TourCylinderHotspot.react
 */
'use strict';

import React from 'react';
import {asset, Text, Image, View, StyleSheet} from 'react-360';
import WorkInProgressSurface from '../customViews/WorkInProgressSurface';

function rotationYToCylinderTranslate(rotationY, mainSurfaceWidth) {
  let normalizeY = (rotationY + 360) % 360;
  if (normalizeY > 180) {
    normalizeY = normalizeY - 360;
  }
  return -normalizeY / 360 * mainSurfaceWidth;
}

/**
 * A simple container to wrap it's children and place it in the 
 * full circle cylinder surface as hotspot
 */
class TourCylinderHotspot extends React.Component {
  render() {
    const {width, height, children, rotationY, mainSurfaceWidth} = this.props;
    return (
     <View style={[
        styles.hotspot, 
        {transform: [{translateX: rotationYToCylinderTranslate(rotationY, mainSurfaceWidth)}]},
      ]}>
      {children}
     </View>
    );
  }
}

const styles = StyleSheet.create({
  hotspot:{
    alignItems: 'center',
    justifyContent: 'center',
    layoutOrigin: [0.5, 0.5],
    position: 'absolute',
  },
});

module.exports = TourCylinderHotspot;
