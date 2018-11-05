/**
 * @providesModule MediaAppTemplateScenePage.react
 */
'use strict';

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  asset,
  NativeModules,
  Environment,
  VrButton,
} from 'react-360';
import {UIManager, findNodeHandle} from 'react-native';
import {default as VideoModule, VideoPlayerInstance, 
  type VideoStatusEvent} from 'VideoModule';
import MediaAppTemplateInfoButton from "MediaAppTemplateInfoButton.react";
import MediaAppTemplateVideoScreen from 'MediaAppTemplateVideoScreen.react';

const {AudioModule} = NativeModules;

type Players = {
  scene: VideoPlayerInstance,
  screen: VideoPlayerInstance,
};

const TRANSITION_TIME = 2000;

class MediaAppTemplateScenePage extends React.Component {
  _players: Players;
  _nextPlayers: Players;
  _preloadJob: ?Promise<void>;
  _preloading: boolean = false;
  state = {
    inTransition: false,
  };

  componentWillMount() {
    this._players = { 
      scene: VideoModule.createPlayer(), 
      screen: VideoModule.createPlayer(),
    };
    this._nextPlayers = { 
      scene: VideoModule.createPlayer(), 
      screen: VideoModule.createPlayer(),
    };
    this._renderScene(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this._renderScene(nextProps);
  }

  _preloadVideo(player, source) {
    // Video can be preloaded by calling `play()`
    // on a video player that is not attached to the environment or a screen
    // with `muted=true` and `autoPlay=false`.
    // Here we are swaping two sets of video players, one set for displaying
    // another set for preloading.
    // You can listen to the 'onVideoStatusChanged' event to check when
    // the loading is done.
    return new Promise((resolve, reject) => {
      const onVideoLoadedSubscription =
        player.addListener('onVideoStatusChanged', (event: VideoStatusEvent) => {
          if (event.status === 'ready') {
            player.removeSubscription(onVideoLoadedSubscription);
            resolve();
          }
        });
      player.play({
        source: source,
        muted: true,
        autoPlay: false,
      });
    });
  }

  _preloadScene(data) {
    const promises = [];
    if (data.type == 'photo') {
      // Preload the background 360 photo
      // Calling setBackgroundImage while the photo is still preloading is fine,
      // it will keep on loading and display the background image when it's done.
      Environment.preloadBackgroundImage(data.source, {format: '2D'});
      promises.push(Promise.resolve());
    } else {
      // Preload the background 360 video
      promises.push(this._preloadVideo(this._nextPlayers.scene, data.source));
    }

    if (data.screen) {
      // Preload the rectilinear video on the screen.
      promises.push(this._preloadVideo(this._nextPlayers.screen, data.screen));
    }

    return Promise.all(promises);
  }

  _renderScene(nextProps) {
    const data = nextProps.currentScene;
    this._preloading = true;
    const loadScene = () => {
      this._preloading = false;
      // video player clean up work
      this._players.scene.stop();
      this._players.screen.stop();
      // swap the players for next preload
      const temp = this._players;
      this._players = this._nextPlayers;
      this._nextPlayers = temp;

      // render current scene
      if (data.type == 'photo') {
        // display background 360 photo
        Environment.setBackgroundImage(data.source, {format: '2D', transition: TRANSITION_TIME});
      } else {
        // calling resume will start playing the already preloaded video
        this._players.scene.resume();
        Environment.setBackgroundVideo(this._players.scene._player, {transition: TRANSITION_TIME});
      }

      this.setState({inTransition: true});
      setTimeout(() => { this.setState({inTransition: false}); }, TRANSITION_TIME);

      if (data.screen) {
        this._players.screen.resume();
      }

      if (data.audio) {
        // play an environmental audio
        AudioModule.playEnvironmental({
          source: data.audio,
          volume: 0.5,
        });
      } else {
        AudioModule.stopEnvironmental();
      }

      // preload next scene
      const nextData = nextProps.nextScene;
      this._preloadJob = this._preloadScene(nextData);
    };

    if (this._preloadJob != null) {
      this._preloadJob.then(loadScene);
    } else {
      this._preloadScene(data).then(loadScene);
    }
  }

  _onClickNext = () => {
    this.props.onClickNext && this.props.onClickNext();
  }

  render() {
    const currentTitle = this.props.currentScene.title;
    const nextTitle = this.props.nextScene.title;
    const showScreen = !!(!this._preloading
      && !this.state.inTransition
      && this.props.currentScene.screen);
  
    return (
      <View style={[styles.container, this.state.inTransition && {opacity: 0}]}>
        <Text style={styles.title}>
          {currentTitle}
        </Text>
        <MediaAppTemplateVideoScreen
          player={this._players.screen._player}
          style={styles.screen}
          visible={showScreen}
        />
        <MediaAppTemplateInfoButton
          onClick={this._onClickNext}
          text={`Go To: ${nextTitle}`} 
          width={300}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    color: '#ffffff',
    textAlign: 'center',
  },
  screen: {
    width: 480,
    height: 320,
  }
});

module.exports = MediaAppTemplateScenePage;
