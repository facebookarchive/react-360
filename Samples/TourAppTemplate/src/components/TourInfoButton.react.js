/**
 * @providesModule TourInfoButton.react
 */
'use strict';

import React from 'react';
import {Animated, Image, View, VrButton} from 'react-360';
import TourTooltip from 'TourTooltip.react';

/**
 * On hover the InfoButton fades in a Tooltip component, and then fades it out
 * when the cursor leaves both the button and the Tooltip. 
 */
class TourInfoButton extends React.Component {
  static defaultProps = {
    fadeIn: 500,
    fadeOut: 500,
    height: 60,
    onInput: null,
    width: 60,
    showOnLeft: false,
  };

  constructor(props) {
    super();
    this.state = {
      hasFocus: false,
      opacityAnim: new Animated.Value(0),
    };
  }

  _fadeIn = () => {
    Animated.timing(this.state.opacityAnim, {
      toValue: 1,
      duration: this.props.fadeIn,
    }).start();
    this.setState({hasFocus: true});
  };

  _fadeOut = () => {
    Animated.timing(this.state.opacityAnim, {
      toValue: 0,
      duration: this.props.fadeOut,
    }).start();
    this.setState({hasFocus: false});
  };

  render() {
    const {
      height, 
      width,
      onInput,
      onClickSound,
      onEnterSound,
      onExitSound,
      onLongClickSound,
      source,
      showOnLeft,
      tooltip,
    } = this.props;
    return (
      <VrButton
        ignoreLongClick={true}
        onInput={onInput}
        onExit={this._fadeOut}
        onClickSound={onClickSound}
        onEnterSound={onEnterSound}
        onExitSound={onExitSound}
        onLongClickSound={onLongClickSound}>
        <Image
          style={{
            height: height,
            width: width,
            flexDirection: 'row',
            alignItems: 'center',
          }}
          onEnter={this._fadeIn}
          source={source}>
          <Animated.View
            // Use animation on opacity to fade in/out the tooltip
            // When opacity is 0, the tooltip is invisible, and 
            // also not interactable.
            style={[
              {
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                opacity: this.state.opacityAnim,
                position: 'absolute',
              },
              showOnLeft ? {right: 80} : {left: 80},
            ]}
            onEnter={this.state.hasFocus ? this._fadeIn : undefined}>
            <TourTooltip tooltip={tooltip} visible={this.state.hasFocus} />
          </Animated.View>
        </Image>
      </VrButton>
    );
  }
}

module.exports = TourInfoButton;
