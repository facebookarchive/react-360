/**
 * @providesModule TourNavButton.react
 */
'use strict';

import React from 'react';
import {Animated, Image, Text, View, VrButton, StyleSheet, NativeModules} from 'react-360';
import TourTooltip from 'TourTooltip.react';
import Easing from 'Easing';
import TourLoadingSpinner from 'TourLoadingSpinner.react';

const {AudioModule} = NativeModules;

const TRANSPARENT_COLOR = 'rgba(255, 255, 255, 0.0)';
const FILL_COLOR = 'rgba(255, 255, 255, 0.8)';
const RING_WIDTH = 5;

/**
 * NavButton is activated either by selecting or by prolonged hovering.
 * On hover, a text label appears, and a fill-circle exapnds around the button.
 * Once selected, the button disappears and a loading spinner takes its place.
 */
class TourNavButton extends React.Component {
  _lastTimeoutId = 0;
  static defaultProps = {
    delay: 2000,
    size: 60,
    isLoading: false,
    onInput: null,
    scaleFactor: 1.5,
    textLabel: 'go',
    showOnLeft: false,
  };

  constructor(props) {
    super();
    this._initialBorderWidth =
      (props.size * (props.scaleFactor -1)) / 2 - RING_WIDTH;
    this.state = {
      borderWidthAnim: new Animated.Value(this._initialBorderWidth),
      hasFocus: false,
    };
  }

  componentWillUnmount() {
    // Make sure timeout and animation needs to be cleared
    // Before unmount, otherwise it will cause memory leak
    this._cancelGazeToClickTimeout();
  }

  _startGazeToClickTimeout() {
    // Cancel previous timeout and animation.
    this._cancelGazeToClickTimeout()
    // Setting timeout to be "clicked"
    this._lastTimeoutId = setTimeout(() => 
      {
        // Play click sound on gaze timeout. Audio was loaded by VrButton.
        this.props.onClickSound && AudioModule.playOneShot({source: this.props.onClickSound});
        this._onSelected();
      },
      this.props.delay,
    );
    // Start filling animation
    Animated.timing(this.state.borderWidthAnim, {
      toValue: RING_WIDTH / 2,
      easing: Easing.linear,
      duration: this.props.delay,
    }).start();
  }

  _cancelGazeToClickTimeout() {
    // Cancel previous timeout
    if (this._lastTimeoutId) {
      clearTimeout(this._lastTimeoutId);
      this._lastTimeoutId = 0;
    }
    // Cancel previous animation
    this.state.borderWidthAnim.stopAnimation();
    this.state.borderWidthAnim.setValue(this._initialBorderWidth);
  }

  _onSelected = () => {
    // Disable focus once button is selected.
    this.setState({hasFocus: false});
    this.props.onInput && this.props.onInput();
  };

  _onEnter = () => {
    if (!this.props.isLoading) {
      this.setState({hasFocus: true});
      this._startGazeToClickTimeout();
    }
  };

  _onExit = () => {
    this.setState({hasFocus: false});
    this._cancelGazeToClickTimeout();
  };

  render() {
    const {
      size, 
      scaleFactor,
      onClickSound,
      onEnterSound,
      onExitSound,
      onLongClickSound,
      isLoading,
      source,
      showOnLeft,
      textLabel,
    } = this.props;
    const outerWidth = size * scaleFactor;

    return (
      <VrButton
        style={styles.container}
        ignoreLongClick={true}
        onClick={this._onSelected}
        onEnter={this._onEnter}
        onExit={this._onExit}
        onClickSound={onClickSound}
        onEnterSound={onEnterSound}
        onExitSound={onExitSound}
        onLongClickSound={onLongClickSound}>
        <View
          // Make ring, using rounded borders, which appears on hover.
          style={[
            styles.outer,
            {
              borderColor: this.state.hasFocus ? 'white' : TRANSPARENT_COLOR,
              borderRadius: outerWidth / 2,
              height: outerWidth,
              width: outerWidth,
            },
          ]}>
          {!isLoading &&
            <View>
              <Animated.View
                // This view has a border that appears on hover to fill the space
                // between the ring and the image. Animation decreases the border
                // width for a gaze-and-fill effect.
                style={[
                  styles.inner,
                  {
                    borderColor: this.state.hasFocus ? FILL_COLOR : TRANSPARENT_COLOR,
                    borderRadius: outerWidth / 2,
                    borderWidth: this.state.borderWidthAnim,
                  },
                ]}
              >
               <Image
                  style={{height: size, width: size}}
                  source={source}
               />
              </Animated.View>
            </View>}
          {
            isLoading && 
              <TourLoadingSpinner 
                style={{width: outerWidth, height: outerWidth}}
              />
          }
        </View>
        {this.state.hasFocus &&
          <Text
            style={[
              styles.focusText,
              {
                fontSize: size * 0.7, 
                height: size, 
                top: (outerWidth - size) / 2,
              },
              showOnLeft ? {right: outerWidth + 10} : {left: outerWidth + 10},
            ]}>
            {textLabel}
          </Text>}
      </VrButton>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  outer: {
    alignItems: 'center',
    borderWidth: RING_WIDTH,
    justifyContent: 'center'
  },
  inner: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  focusText: {
    position: 'absolute',
    backgroundColor: 'black',
    borderRadius: 5,
    color: 'white',
    padding: 20,
    textAlign: 'center',
    textAlignVertical: 'auto',
  }
});

module.exports = TourNavButton;
