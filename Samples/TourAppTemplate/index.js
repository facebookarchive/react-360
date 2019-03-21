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
import TourHotspot from 'TourHotspot.react';
import TourCylinderHotspot from 'TourCylinderHotspot.react';

const Hotspot = (props) => {
  const {useDynamicSurface, mainSurfaceWidth, ...otherProps} = props;
  if (useDynamicSurface) {
    return <TourHotspot {...otherProps} />
  } else {
    return <TourCylinderHotspot {...otherProps} mainSurfaceWidth={mainSurfaceWidth} />
  }
};

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

    const {useDynamicSurface, mainSurfaceWidth, mainSurfaceHeight} = this.props;
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
      const nextPhotoData = (nextLocationId && data.photos[nextLocationId]) || null;
      const nextRotation =
        data.firstPhotoRotation + ((nextPhotoData && nextPhotoData.rotationOffset) || 0);
      Environment.setBackgroundImage(
        asset(data.photos[nextLocationId].uri),
        {
          format: '2D',
          transition: ENV_TRANSITION_TIME,
          // rotate the background image to the rotation offset so we are smoothly
          // transiting from one to another
          rotateTransform: [{rotateY: `${-nextRotation}deg`}],
        });
      this._loadingTimeout = setTimeout(() => {
        this._loadingTimeout = null;
        this.setState({
          // Now that ths new photo is loaded, update the locationId.
          locationId: nextLocationId,
        });
      }, ENV_TRANSITION_TIME);
    }

    return (
    <View style={{
      width: mainSurfaceWidth,
      height: mainSurfaceHeight,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      {tooltips &&
        tooltips.map((tooltip, index) => {
          let rotationY = tooltip.rotationY + rotation;
          rotationY = (rotationY + 360) % 360; 
          const showOnLeft = !useDynamicSurface && rotationY > 180 && rotationY < 210;
          // Iterate through items related to this location, creating either
          // info buttons, which show tooltip on hover, or nav buttons, which
          // change the current location in the tour.
          if (tooltip.type) {
            return (
              // Rotate the hotspot surface to the right hotspot position
              // We centered the view so the hotspot icon is on the right position
              <Hotspot
                key={index}
                useDynamicSurface={useDynamicSurface}
                mainSurfaceWidth={mainSurfaceWidth}
                rotationY={rotationY}>
                <TourInfoButton
                  onEnterSound={asset(soundEffects.navButton.onEnter.uri)}
                  showOnLeft={showOnLeft}
                  source={asset('info_icon.png')}
                  tooltip={tooltip}
                />
              </Hotspot>
            );
          }
          return (
            // Rotate the hotspot surface to the right hotspot position
            // We centered the view so the hotspot icon is on the right position
            <Hotspot
              key={tooltip.linkedPhotoId}
              useDynamicSurface={useDynamicSurface}
              mainSurfaceWidth={mainSurfaceWidth}
              rotationY={rotationY}>
              <TourNavButton
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
                showOnLeft={showOnLeft}
                source={asset(data.nav_icon)}
                textLabel={tooltip.text}
              />
            </Hotspot>
          );
        })}
      </View>
    );
  }
}

// defining StyleSheet
const styles = StyleSheet.create({
  spinner: {
    width: 50,
    height: 50,
  },
});

// register the root component
// this will be used from client.js by r360.createRoot('TourAppTemplate' ...)
AppRegistry.registerComponent('TourAppTemplate', () => TourAppTemplate);
