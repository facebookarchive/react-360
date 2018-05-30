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

/**
 * NativeModules example demonstrates how to implement a custom Native Module
 *
 * Native Modules are used to interface with the code in your web browser.
 * Look at the code in BrowserInfo.js to see the available methods.
 */

import React from 'react';
import {
  AppRegistry,
  NativeModules,
  StyleSheet,
  Text,
  View,
  VrButton,
} from 'react-vr';

// Extract our custom native module
const BrowserInfo = NativeModules.BrowserInfo;

class NativeModuleSample extends React.Component {
  constructor() {
    super();

    this.state = {
      batteryLevel: null,
      lastConfirmation: null,
    };

    this.titleCount = 0;

    this.incrementTitle = this.incrementTitle.bind(this);
    this.getConfirmation = this.getConfirmation.bind(this);
  }

  componentDidMount() {
    // When the component initializes, request the battery level from the module
    // The callback is triggered on the other side when that data is available
    BrowserInfo.getBatteryLevel(level => {
      this.setState({batteryLevel: level});
    });
  }

  incrementTitle() {
    this.titleCount++;
    // Set the window title to reflect the latest count
    BrowserInfo.setTitle('Count: ' + this.titleCount);
  }

  getConfirmation() {
    // Display a confirmation dialog, and set the local state based upon
    // the end state of the returned Promise.
    BrowserInfo
      .getConfirmation('Resolve the Promise?')
      .then(() => {
        // Resolved
        this.setState({lastConfirmation: true});
      }, () => {
        // Rejected
        this.setState({lastConfirmation: false});
      });
  }

  render() {
    const {batteryLevel, lastConfirmation} = this.state;
    return (
      <View style={styles.table}>
        <View style={styles.row}>
          <View style={styles.left}>
            <Text style={styles.label}>Battery:</Text>
          </View>

          <View style={styles.right}>
            <Text style={styles.value}>
              {this.state.batteryLevel === null ? 'Unknown' : ((batteryLevel * 100) | 0) + '%'}
            </Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.left}>
            <Text style={styles.label}>Title Bar:</Text>
          </View>

          <View style={styles.right}>
            <VrButton
              style={styles.button}
              onClick={this.incrementTitle}>
              <Text>Increment</Text>
            </VrButton>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.left}>
            <Text style={styles.label}>Confirmation:</Text>
          </View>

          <View style={styles.right}>
            <VrButton
              style={styles.button}
              onClick={this.getConfirmation}>
              <Text>Request</Text>
            </VrButton>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.left}>
            <Text style={styles.label}>Last Value:</Text>
          </View>

          <View style={styles.right}>
            <Text style={styles.value}>
              {lastConfirmation === null ? 'None' : (lastConfirmation ? 'Resolved' : 'Rejected')}
            </Text>
          </View>
        </View>

        <View style={styles.userAgent}>
          <Text style={styles.userAgentString}>
            {BrowserInfo.userAgent}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  table: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#2196f3',
    transform: [{translate: [0, 0, -2]}],
    layoutOrigin: [0.5, 0.5],
    padding: 0.1,
  },

  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 0.1,
  },

  left: {
    width: 0.8,
    backgroundColor: 'white',
    marginRight: 0.1,
    paddingLeft: 0.05,
  },

  right: {
    width: 0.5,
  },

  label: {
    color: 'black',
    textAlign: 'left',
  },

  value: {
    textAlign: 'right',
  },

  button: {
    backgroundColor: 'green',
  },

  userAgent: {
    backgroundColor: 'white',
    width: 1.4,
  },

  userAgentString: {
    color: 'black',
    fontSize: 0.06,
  },
});

AppRegistry.registerComponent('NativeModuleSample', () => NativeModuleSample);
