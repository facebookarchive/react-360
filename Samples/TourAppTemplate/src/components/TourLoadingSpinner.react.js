/**
 * @providesModule TourLoadingSpinner.react
 */
'use strict';

import React from 'react';
import {Animated, asset, Image, View} from 'react-360';
import Easing from 'Easing';

/**
 * Displays a spinning loading indicator. Fades in after a configurable delay,
 * which looks nice and prevents spinner from appearing when loading is quick.
 */
class TourLoadingSpinner extends React.Component {
  _rotationAnimation = null;
  static defaultProps = {
    delay: 500,
    source: asset('circle_ramp.png'),
    speed: 1500,
  };

  constructor(props) {
    super();
    this.state = {
      rotationAnim: new Animated.Value(0),
      opacityAnim: new Animated.Value(0),
    };
  }

  _rotationAnimate() {
    this.state.rotationAnim.setValue(0);
    this._rotationAnimation = Animated.timing(this.state.rotationAnim, {
      duration: this.props.speed,
      easing: Easing.linear,
      toValue: -360,
    }).start(status => {
      status.finished && this._rotationAnimate();
    });
  }

  componentDidMount() {
    Animated.timing(this.state.opacityAnim, {
      delay: this.props.delay,
      duration: this.props.speed,
      easing: Easing.linear,
      toValue: 1,
    }).start();
    this._rotationAnimate();
  }

  componentWillUnmount() {
    this._rotationAnimation && this._rotationAnimation.stop();
  }

  render() {
    const {style, source} = this.props;
    return (
      <Animated.Image
        style={[
          style,
          {
            opacity: this.state.opacityAnim,
            transform: [
              // Use transform to rotate the view, rotateZ means
              // it rotate along z-axis (z-axis is on the normal of screen)
              // Use an animated value to animate the rotation
              {rotateZ: this.state.rotationAnim},
            ],
          },
        ]}
        source={source}
      />
    );
  }
}

module.exports = TourLoadingSpinner;
