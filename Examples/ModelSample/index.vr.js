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

'use strict';

/**
 * ModelSample loads and displays a spinning model in React VR.
 *
 * To do this, object model is loaded and placed in the scene with the <Model> tag; it
 * is also illuminated with a <PointLight>. Rotation is achieved based on a React state
 * variable that is applied as a rotation transform.
 */

import React from 'react';
import {AppRegistry, asset, Model, Pano, PointLight, Text, View} from 'react-vr';

class ModelSample extends React.Component {
  constructor() {
    super();
    this.state = {rotation: 0};
    this.lastUpdate = Date.now();
    this.rotate = this.rotate.bind(this);
  }

  /**
   * After kickoff in componentDidMount(), rotate is called every frame through
   * requestAnimationFrame. It updates the state.rotation variable used to rotate
   * the model based om on time measurement; this is important to account for
   * different VR headset framerates.
   */
  rotate() {
    const now = Date.now();
    const delta = now - this.lastUpdate;
    this.lastUpdate = now;

    this.setState({rotation: this.state.rotation + delta / 20});
    this.frameHandle = requestAnimationFrame(this.rotate);
  }

  componentDidMount() {
    this.rotate();
  }

  componentWillUnmount() {
    if (this.frameHandle) {
      cancelAnimationFrame(this.frameHandle);
      this.frameHandle = null;
    }
  }

  render() {
    // We build the scene out of three elements:
    //   - A model that displays a rotating object
    //   - A point light, useful for adding color to the model material which would otherwise be dark.
    //   - Text message positioned above the creature
    // A chain of transformations is applied to the model, which are executed from right to left.
    // In out case, the model was too large for the scene and oriented sideways, so we scaled it and
    // rotated it into place. This would not be necessary if your object had correct size ot begin with.
    // We are also applying a new rotation around the Y axis every frame to produce the desired animation.
    return (
      <View>
        <Pano source={asset('chess-world.jpg')} />
        <Model
          style={{
            transform: [
              {translate: [0, -15, -70]},
              {scale: 0.1},
              {rotateY: this.state.rotation},
              {rotateX: -90},
            ],
          }}
          source={{
            obj: asset('creature.obj'),
            mtl: asset('creature.mtl'),
          }}
          lit={true}
        />
        <PointLight style={{color: 'white', transform: [{translate: [0, 400, 700]}]}} />
        <Text
          style={{
            backgroundColor: 'grey',
            padding: 0.1,
            textAlign: 'center',
            textAlignVertical: 'center',
            fontSize: 0.4,
            position: 'absolute',
            transform: [{translate: [0, -2.5, -7]}],
            layoutOrigin: [0.5, 0.5],
          }}
        >
          Creature
        </Text>
      </View>
    );
  }
}

AppRegistry.registerComponent('ModelSample', () => ModelSample);
