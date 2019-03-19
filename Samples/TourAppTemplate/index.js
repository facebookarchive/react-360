import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  asset,
  Environment,
  NativeModules,
} from 'react-360';
import TourNavButton from 'TourNavButton.react';
import TourInfoButton from 'TourInfoButton.react';
import TourLoadingSpinner from 'TourLoadingSpinner.react';

const AudioModule = NativeModules.AudioModule;
const ENV_TRANSITION_TIME = 1000;

class TourAppTemplate extends React.Component {
  static defaultProps = {
    tourSource: 'tourOfTheChester.json',
  };

  constructor(props) {
    super(props);
    this.state = {
      data: null,
      locationId: null,
      nextLocationId: null,
      rotation: null,
    };
  }

  componentDidMount() {
    fetch(asset(this.props.tourSource).uri)
      .then(response => response.json())
      .then(responseData => {
        this.init(responseData);
      })
      .done();
  }

  init(tourConfig) {
    // Initialize the tour based on data file.
    this.setState({
      data: tourConfig,
      locationId: null,
      nextLocationId: tourConfig.firstPhotoId,
      rotation: tourConfig.firstPhotoRotation +
        (tourConfig.photos[tourConfig.firstPhotoId].rotationOffset || 0),
    });
  }

  render() {
    if (!this.state.data) {
      return null;
    }

    const {locationId, nextLocationId, data} = this.state;
    const photoData = (locationId && data.photos[locationId]) || null;
    const tooltips = (photoData && photoData.tooltips) || null;
    const rotation =
      data.firstPhotoRotation + ((photoData && photoData.rotationOffset) || 0);
    const isLoading = nextLocationId !== locationId;
    const soundEffects = data.soundEffects;
    const ambient = data.soundEffects.ambient;

    if (ambient) {
      // play an environmental audio
      AudioModule.playEnvironmental({
        source: asset(ambient.uri),
        volume: ambient.volume,
      });
    } else {
      AudioModule.stopEnvironmental();
    }

    if (nextLocationId !== locationId && this._loadingTimeout == null) {
      Environment.setBackgroundImage(asset(data.photos[nextLocationId].uri), {format: '2D', transition: ENV_TRANSITION_TIME});
      this._loadingTimeout = setTimeout(() => {
        this._loadingTimeout = null;
        this.setState({
          // Now that ths new photo is loaded, update the locationId.
          locationId: nextLocationId,
        });
      }, ENV_TRANSITION_TIME);
    }

    return (
    <View style={styles.panel}>
      {tooltips &&
        tooltips.map((tooltip, index) => {
          // Iterate through items related to this location, creating either
          // info buttons, which show tooltip on hover, or nav buttons, which
          // change the current location in the tour.
          if (tooltip.type) {
            return (
              <TourInfoButton
                key={index}
                onEnterSound={asset(soundEffects.navButton.onEnter.uri)}
                source={asset('info_icon.png')}
                tooltip={tooltip}
              />
            );
          }
          return (
            <TourNavButton
              key={tooltip.linkedPhotoId}
              isLoading={isLoading}
              onClickSound={asset(soundEffects.navButton.onClick.uri)}
              onEnterSound={asset(soundEffects.navButton.onEnter.uri)}
              onInput={() => {
                // Update nextLocationId, not locationId, so tooltips match
                // the currently visible pano; pano will update locationId
                // after loading the new image.
                this.setState({
                  nextLocationId: tooltip.linkedPhotoId,
                });
              }}
              source={asset(data.nav_icon)}
              textLabel={tooltip.text}
            />
          );
        })}
        {locationId == null &&
          // Show a spinner while first pano is loading.
          <TourLoadingSpinner style={styles.spinner} />}
      </View>
    );
  }
}

// defining StyleSheet
const styles = StyleSheet.create({
  panel: {
    width: 1000,
    height: 600,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  spinner: {
    width: 50,
    height: 50,
  },
});

// register the root component
// this will be used from client.js by r360.createRoot('TourAppTemplate' ...)
AppRegistry.registerComponent('TourAppTemplate', () => TourAppTemplate);
