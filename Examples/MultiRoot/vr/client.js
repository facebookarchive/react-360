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

import {VRInstance} from 'react-vr-web';

function init(bundle, parent, options) {
  const vr = new VRInstance(bundle, 'MultiRootExample', parent, {
    // Add custom options here
    ...options,
  });
  vr.render = function() {
    // Any custom behavior you want to perform on each frame goes here
  };

  // Custom code begins here!!!

  // We need to add the camera to our scene in order for its children to be
  // rendered.
  // Alternatively, we could add a <Scene> element to our main React tree, which
  // also attaches the camera to the scene graph.
  vr.scene.add(vr.camera());
  // Mount the <HUD> component, with some initial props, to the camera object.
  // This means that our component will move as the camera moves.
  vr.mountComponent('HUD', {message: 'Hello'}, vr.camera());

  // Begin the animation loop
  vr.start();
  return vr;
}

window.ReactVR = {init};
