/**
 * The examples provided by Oculus are for non-commercial testing and
 * evaluation purposes only.
 *
 * Oculus reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL
 * OCULUS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN
 * AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * Example ReactVR app that allows a simple tour using linked 360 photos.
 */
'use strict';

import React from 'react';
import {AppRegistry, asset, Image, Pano, Text, Sound, View} from 'react-vr';

import InfoButton from './InfoButton';
import NavButton from './NavButton';
import LoadingSpinner from './LoadingSpinner';

import CylindricalPanel from 'CylindricalPanel';

// Web VR is only able to support a maxiumum texture resolution of 4096 px
const MAX_TEXTURE_WIDTH = 4096;
const MAX_TEXTURE_HEIGHT = 720;
// Cylinder is a 2D surface a fixed distance from the camera.
// It uses pixes instead of meters for positioning components.
// pixels = degrees/360 * density, negative to rotate in expected direction.
const degreesToPixels = degrees => -(degrees / 360) * MAX_TEXTURE_WIDTH;
// PPM = 1/(2*PI*Radius) * density. Radius of cylinder is 3 meters.
const PPM = 1 / (2 * Math.PI * 3) * MAX_TEXTURE_WIDTH;

/**
 * ReactVR component that allows a simple tour using linked 360 photos.
 * Tour includes nav buttons, activated by gaze-and-fill or direct selection,
 * that move between tour locations and info buttons that display tooltips with
 * text and/or images. Tooltip data and photo URLs are read from a JSON file.
 */
class TourSample extends React.Component {
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

    const locationId = this.state.locationId;
    const photoData = (locationId && this.state.data.photos[locationId]) || null;
    const tooltips = (photoData && photoData.tooltips) || null;
    const rotation =
      this.state.data.firstPhotoRotation + ((photoData && photoData.rotationOffset) || 0);
    const isLoading = this.state.nextLocationId !== this.state.locationId;
    const soundEffects = this.state.data.soundEffects;
    const ambient = this.state.data.soundEffects.ambient;

    return (
      <View>
        <View style={{transform: [{rotateY: rotation}]}}>
          {ambient &&
            <Sound
              // Background audio that plays throughout the tour.
              source={asset(ambient.uri)}
              autoPlay={true}
              loop={ambient.loop}
              volume={ambient.volume}
            />}
          <Pano
            // Place pano in world, and by using position absolute it does not
            // contribute to the layout of other views.
            style={{
              position: 'absolute',
              tintColor: isLoading ? 'grey' : 'white',
            }}
            onLoad={() => {
              const data = this.state.data;
              this.setState({
                // Now that ths new photo is loaded, update the locationId.
                locationId: this.state.nextLocationId,
              });
            }}
            source={asset(this.state.data.photos[this.state.nextLocationId].uri)}
          />
          <CylindricalPanel
            layer={{
              width: MAX_TEXTURE_WIDTH,
              height: MAX_TEXTURE_HEIGHT,
              density: MAX_TEXTURE_WIDTH,
            }}
            style={{position: 'absolute'}}>
            <View
              style={{
                // View covering the cyldiner. Center so contents appear in middle of cylinder.
                alignItems: 'center',
                justifyContent: 'center',
                width: MAX_TEXTURE_WIDTH,
                height: MAX_TEXTURE_HEIGHT,
              }}>
              {/* Need container view, else using absolute position on buttons removes them from cylinder */}
              <View>
                {tooltips &&
                  tooltips.map((tooltip, index) => {
                    // Iterate through items related to this location, creating either
                    // info buttons, which show tooltip on hover, or nav buttons, which
                    // change the current location in the tour.
                    if (tooltip.type) {
                      return (
                        <InfoButton
                          key={index}
                          onEnterSound={asset(soundEffects.navButton.onEnter.uri)}
                          pixelsPerMeter={PPM}
                          source={asset('info_icon.png')}
                          tooltip={tooltip}
                          translateX={degreesToPixels(tooltip.rotationY)}
                        />
                      );
                    }
                    return (
                      <NavButton
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
                        pixelsPerMeter={PPM}
                        source={asset(this.state.data.nav_icon)}
                        textLabel={tooltip.text}
                        translateX={degreesToPixels(tooltip.rotationY)}
                      />
                    );
                  })}
                {locationId == null &&
                  // Show a spinner while first pano is loading.
                  <LoadingSpinner
                    style={{layoutOrigin: [0.5, 0.5]}}
                    pixelsPerMeter={PPM}
                    // Undo the rotation so spinner is centered
                    translateX={degreesToPixels(rotation) * -1}
                  />}
              </View>
            </View>
          </CylindricalPanel>
        </View>
      </View>
    );
  }
}

// Name used to create module, via reactNativeContext.createRootView('TourSample')
AppRegistry.registerComponent('TourSample', () => TourSample);
module.exports = TourSample;
