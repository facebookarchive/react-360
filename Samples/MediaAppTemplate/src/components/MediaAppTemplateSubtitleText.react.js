/**
 * @providesModule MediaAppTemplateSubtitleText.react
 */
'use strict';

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-360';

export const MediaAppTemplateSubtitleText = (props) => (
  <View style={styles.container}>
    <Text style={styles.text}>
      {props.text}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 30,
    color: '#ffffff',
    textAlign: 'center',
  },
});

module.exports = MediaAppTemplateSubtitleText;
