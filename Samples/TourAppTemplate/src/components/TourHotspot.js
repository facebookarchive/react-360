/**
 * @providesModule TourHotspot.react
 */
'use strict';

import React from 'react';
import {asset, Text, Image, View, StyleSheet} from 'react-360';
import WorkInProgressSurface from '../customViews/WorkInProgressSurface';

const TOUR_HOTSPOT_DISTANCE = 4;

/**
 * A simple container to wrap it's children and place it in the 
 * WorkInProgressSurface as hotspot
 */
class TourHotspot extends React.Component {
  static defaultProps = {
    width: 1200,
    height: 600,
  };

  render() {
    const {width, height, children, rotationY} = this.props;
    return (
     <WorkInProgressSurface
        surfaceWidth={width}
        surfaceHeight={height}
        style={{transform: [{rotateY: `${rotationY}deg`}, {translate: [0, 0, -TOUR_HOTSPOT_DISTANCE]}]}}>
        <View style={[styles.hotspot, {width: width, height: height}]}>
          {children}
        </View>
      </WorkInProgressSurface>
    );
  }
}

const styles = StyleSheet.create({
  hotspot:{
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
});

module.exports = TourHotspot;
