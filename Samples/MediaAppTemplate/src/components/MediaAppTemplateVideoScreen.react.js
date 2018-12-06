/**
 * @providesModule MediaAppTemplateVideoScreen.react
 */
'use strict';

import React from 'react';
import {
  View,
  Environment,
} from 'react-360';
import {UIManager, findNodeHandle} from 'react-native';


class MediaAppTemplateVideoScreen extends React.Component {
  static defaultProps = {
    screenId: 'default',
    player: 'default',
    visible: true,
  };
  _surface = 'default';
  _videoBound = { x:0, y:0, width:1, height: 1};

  _setVideoBound = (videoPlaceholder) => {
    if (!videoPlaceholder) {
      return;
    }
    const tag = findNodeHandle(videoPlaceholder);
    setTimeout(() => {
      UIManager.getViewRootID(tag).then(surface => {
        this._surface = surface;
        // You can get the window coordinate of a view in the surface
        // by calling measureInWindow
        UIManager.measureInWindow(tag, (x, y, width, height) => {
          this._videoBound = {x, y, width, height};
        });
      });
    });
  };

  render() {
    const {x, y, width, height} = this._videoBound;
    if (this.props.visible) {
      // Calling `Environment.setScreen` to place the video screen in the surface.
      // By using the coordinates of this view, the video will
      // show at exactly same position as this view. Do notice when a screen is
      // attached to a surface, it's always rendered behind all the other react
      // components.
      // Calling it with a player id will attach the video texture to the screen
      Environment.setScreen(
          this.props.screenId,
          this.props.player,
          this._surface,
          x, y, width, height);
    } else {
      // Calling `Environment.setScreen` with player=null will detach the video
      // texture from the screen.
      Environment.setScreen(
          this.props.screenId,
          null,
          this._surface,
          x, y, width, height);
    }
        
    return (
      <View
        ref={this._setVideoBound} 
        style={this.props.style} />
    );
  }
}

module.exports = MediaAppTemplateVideoScreen;
