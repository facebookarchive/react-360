/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

var Hero = require('Hero');
var Prism = require('Prism');
var React = require('React');
var Site = require('Site');

var index = React.createClass({
  render: function() {
    return (
      <Site>
        <Hero title="React VR" subtitle="Build VR websites and interactive 360 experiences with React">
          <div className="buttons-unit">
            <a href="docs/getting-started.html#content" className="button">Get started with React VR</a>
          </div>
        </Hero>

        <section className="content wrap">

          <div style={{margin: '40px auto', maxWidth: 800}}>

            <p>
              React VR lets you build VR apps using only JavaScript. It uses the same design as React, letting you compose a rich VR world and UI from declarative components.
            </p>

            <Prism>

{`import React from 'react';
import {AppRegistry, Pano, Text, View} from 'react-vr';

class WelcomeToVR extends React.Component {
  render() {
    // Displays "hello" text on top of a loaded 360 panorama image.
    // Text is 0.8 meters in size and is centered three meters in front of you.
    return (
      <View>
        <Pano source={asset('chess-world.jpg')}/>
        <Text
          style={{
            fontSize: 0.8,
            layoutOrigin: [0.5, 0.5],
            transform: [{translate: [0, 0, -3]}],
          }}>
          hello
        </Text>
      </View>
    );
  }
};

AppRegistry.registerComponent('WelcomeToVR', () => WelcomeToVR);`}
            </Prism>

          </div>

          <section className="home-get-started-section">
            <div className="buttons-unit">
              <a href="docs/getting-started.html#content" className="button">Get started with React VR</a>
            </div>
          </section>
        </section>
      </Site>
    );
  }
});

module.exports = index;
