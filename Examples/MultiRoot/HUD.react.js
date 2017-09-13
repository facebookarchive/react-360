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
import {Text, View} from 'react-vr';

/**
 * Simple component designed to be mounted directly to the camera
 */

export default class HUD extends React.Component {
  render() {
    return (
      <View
        style={{
        }}>
        <Text
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
            fontSize: 0.1,
            fontWeight: '400',
            layoutOrigin: [0.5, 0],
            paddingLeft: 0.2,
            paddingRight: 0.2,
            textAlign: 'center',
            textAlignVertical: 'center',
            transform: [{translate: [0, 0.5, -1]}],
          }}>
          HUD ({this.props.message})
        </Text>
      </View>
    );
  }
}
