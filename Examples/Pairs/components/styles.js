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

import {StyleSheet} from 'react-vr';

const styles = StyleSheet.create({
  board: {
    transform: [{translate: [-1.1, 1.1, -3]}],
  },
  row: {
    flex: 0,
    flexDirection: 'row',
  },
  square: {
    width: 0.45,
    height: 0.45,
    borderWidth: 0.01,
    borderColor: 'white',
    margin: 0.05,
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 0.2,
    textAlignVertical: 'center',
  },
  grayText: {
    fontSize: 0.2,
    textAlignVertical: 'center',
    color: 'gray',
  },
});

export default styles;
