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
import {
  AppRegistry,
  asset,
  NativeModules,
  Pano,
  StyleSheet,
  Text,
  View,
  VrButton,
  VrHeadModel,
} from 'react-vr';

import TextboxVr from './TextboxVr';

const domTextboxContent = {
  header: 'This is a DOM Overlay!',
  description: 'A dom overlay is a 2D window that takes over the 3D world, allowing for better interactivity and content consumption outside of VR. DOM Overlays are implemented as Native Modules, for more info on native modules, check the following links:',
  links: [
    {
      text: 'Native Modules docs',
      url: 'https://facebook.github.io/react-vr/docs/native-modules.html',
    },
    {
      text: 'Native Modules Github Sample',
      url: 'https://github.com/facebook/react-vr/tree/master/Examples/NativeModules',
    },
  ],
};

const vrTextboxContent =
  'This is a React VR textbox! This is how you would show text in VR, where DOM Overlay is not accessible.';

export default class DomOverlaySample extends React.Component {
  constructor() {
    super();

    this.state = {
      renderVrTextbox: false,
    };

    this._toggleDisplay = this.toggleDisplay.bind(this);
  }

  // This method shows an example of how to determine whether some content should be
  // displayed on the dom overlay, or as a react vr component. We use VrHeadModel's inVR
  // API to determine whether to render the content on the overlay or on a VR-friendly manner.
  toggleDisplay() {
    if (VrHeadModel.inVR()) {
      this.setState({renderVrTextbox: !this.state.renderVrTextbox});
    } else {
      // Not in VR, so let's use the dom overlay!
      NativeModules.DomOverlayModule.openOverlay(domTextboxContent);
    }
  }

  render() {
    return (
      <View style={styles.rootView}>
        <Pano source={asset('chess-world.jpg')} />
        <View style={styles.triggerContainer}>
          <VrButton style={styles.triggerButton} onClick={this._toggleDisplay}>
            <Text style={styles.triggerText}>Click Me!</Text>
          </VrButton>
        </View>
        {this.state.renderVrTextbox && <TextboxVr text={vrTextboxContent} />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  rootView: {
    layoutOrigin: [0.5, 0.5],
    position: 'absolute',
  },
  triggerContainer: {
    transform: [{rotateY: 0}, {translateZ: -3}],
  },
  triggerButton: {
    borderRadius: 0.05,
    height: 1,
    width: 1,
    backgroundColor: '#F00',
    justifyContent: 'center',
  },
  triggerText: {
    alignSelf: 'center',
    fontSize: 0.2,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
AppRegistry.registerComponent('DomOverlaySample', () => DomOverlaySample);
