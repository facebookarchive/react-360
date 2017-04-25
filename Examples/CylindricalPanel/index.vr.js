'use strict';

import React from 'react';
import {AppRegistry, asset, Pano, Text, Image, View} from 'react-vr';
const VrButton = require('VrButton');

import CylindricalPanel from 'CylindricalPanel';

class Button extends React.Component {
  constructor(props) {
    super(props);
    this.state = {open: false};
  }
  render() {
    return (
      <VrButton
        onClick={() => {
          this.setState({open: !this.state.open});
        }}
      >
        <Image
          style={{
            borderRadius: 20,
            height: this.state.open ? 120 : 60,
            margin: 10,
            width: this.state.open ? 200 : 100}}
          source={{
            uri: 'https://facebook.github.io/react/img/logo_og.png',
          }}
        />
      </VrButton>
    );
  }
}

class CylindricalPanelDemo extends React.Component {
  render() {
    return (
      <View>
        <Pano source={asset('chess-world.jpg')} />
        <CylindricalPanel layer={{width: 2000, height: 720}} style={{position: 'absolute'}}>
          <View
            style={{
              opacity: 1,
              width: 2000,
              height: 720,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                margin: 10,
                fontSize: 70,
                fontWeight: '300',
                borderRadius: 20,
                backgroundColor: 'grey',
              }}
            >
              Hello
            </Text>

            <Image
              style={{
                borderRadius: 20,
                backgroundColor: 'red',
                borderWidth: 10,
                width: 600,
                height: 315,
              }}
              source={{
                uri: 'https://facebook.github.io/react/img/logo_og.png',
              }}
            />
            <Button />
          </View>
        </CylindricalPanel>
      </View>
    );
  }
}

AppRegistry.registerComponent('CylindricalPanelDemo', () => CylindricalPanelDemo);