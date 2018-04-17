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

const TextboxVr = props => {
  return (
    <View
      style={{
        alignSelf: 'center',
        position: 'absolute',
        transform: [{rotateX: -20}, {translateZ: -3}],
        height: 0.8,
        width: 4,
        backgroundColor: '#000',
      }}>
      <Text
        style={{
          alignSelf: 'center',
          fontSize: 0.2,
          textAlign: 'center',
          textAlignVertical: 'center',
        }}>
        {props.text}
      </Text>
    </View>
  );
};

export default TextboxVr;
