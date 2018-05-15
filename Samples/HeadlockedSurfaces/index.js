import * as React from 'react';
import {AppRegistry, StyleSheet, Text, View} from 'react-360';

const HorizontalPanel = () => (
  <View style={styles.panel}>
    <Text style={styles.panelText}>{'Follows Horizontally'}</Text>
  </View>
);

const HVPanel = () => (
  <View style={styles.panel}>
    <Text style={styles.panelText}>{'Follows Horizontally\nand Vertically'}</Text>
  </View>
);

const styles = StyleSheet.create({
  panel: {
    width: 300,
    height: 300,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  panelText: {
    color: '#000000',
    fontSize: 30,
    textAlign: 'center',
  }
});

AppRegistry.registerComponent('HorizontalPanel', () => HorizontalPanel);
AppRegistry.registerComponent('HVPanel', () => HVPanel);
