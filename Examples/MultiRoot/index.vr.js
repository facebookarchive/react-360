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
 */

import React from 'react';
import {AppRegistry, Text, View} from 'react-vr';
import HUD from './HUD.react';

/**
 * This example demonstrates how to add multiple React roots to your 3D scene.
 * Beyond the initial root of your React tree, it is possible to mount other
 * components to elements of your scene, as long as they have been registered
 * in the AppRegistry.
 * These components can be added to any element of your scene; this is useful
 * when you need to attach a component to an object that is controlled outside
 * of React, such as a controller or an object with physics.
 *
 * Look at vr/client.js to see how the HUD component is mounted to the camera.
 */

class MultiRootExample extends React.Component {
  render() {
    return (
      <View>
        <Text
          style={{
            backgroundColor: '#777879',
            fontSize: 0.8,
            fontWeight: '400',
            layoutOrigin: [0.5, 0.5],
            paddingLeft: 0.2,
            paddingRight: 0.2,
            textAlign: 'center',
            textAlignVertical: 'center',
            transform: [{translate: [0, 0, -3]}],
          }}>
          Main Scene
        </Text>
      </View>
    );
  }
}

// Make the HUD component available to mount
AppRegistry.registerComponent('HUD', () => HUD);
AppRegistry.registerComponent('MultiRootExample', () => MultiRootExample);
