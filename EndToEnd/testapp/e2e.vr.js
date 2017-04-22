'use strict';

import React from 'react';
import {AppRegistry, NativeModules, Text, View} from 'react-vr';

window.NativeModules = NativeModules;

class End2End extends React.Component {
  render() {
    return (
      <View>
        <Text
          style={{
            backgroundColor: '#777879',
            fontSize: 0.8,
            layoutOrigin: [0.5, 0.5],
            paddingLeft: 0.2,
            paddingRight: 0.2,
            textAlign: 'center',
            textAlignVertical: 'center',
            transform: [{translate: [0, 0, -3]}],
          }}>
          hello
        </Text>
      </View>
    );
  }
}

AppRegistry.registerComponent('End2End', () => End2End);
