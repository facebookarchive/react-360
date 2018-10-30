import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  asset,
  Environment,
} from 'react-360';
import InfoButton from 'InfoButton.react';
import ScenePage from 'ScenePage.react';

// referencing an asset from 'static_assets' directory
const INFO_BUTTON_IMAGE = asset('info_icon.png');
const SCENE_COUNT = 3;

// The root react component of the app
export default class BasicAppTemplate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
    };
  }

  _onClick = (index) => {
    this.setState({index: index});
  };

  render() {
    const sceneButtons = [];
    for (const i = 0; i < SCENE_COUNT; i++) {
      sceneButtons.push(
        <InfoButton
          key={i}
          style={styles.button}
          source={INFO_BUTTON_IMAGE}
          text={`Scene ${i}`}
          onClick={() => { this._onClick(i); }}
        />)
    }
    return (
      <View style={styles.panel}>
        <View style={styles.section}>
          {sceneButtons}
        </View>
        <View style={styles.scenePage}>
          <ScenePage
            index={this.state.index} />
        </View>
      </View>
    );
  }
};

// defining StyleSheet
const styles = StyleSheet.create({
  panel: {
    width: 1000,
    height: 600,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  section: {
    padding: 5,
    width: 750,
    backgroundColor: '#000000',
    borderColor: '#639dda',
    borderWidth: 2,
    flexDirection: 'row',
  },
  button: {
    marginLeft: 5,
    marginRight: 5,
  },
  scenePage: {
    padding: 5,
    width: 600,
    height: 300,
    backgroundColor: 'grey',
    borderRadius: 5,
  }
});

// register the root component
// this will be used from client.js by r360.createRoot('BasicAppTemplate' ...)
AppRegistry.registerComponent('BasicAppTemplate', () => BasicAppTemplate);
