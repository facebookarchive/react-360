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
import ReactDOM from 'react-dom';
import {Module} from 'react-vr-web';

import TextboxOverlay from './TextboxOverlay';

// Example implementation of a dom overlay. This is useful on web and mobile,
// whenever a regular, 2D interaction makes more sense than dealing with a 360 scene.
// The key in this module is having a dom element (created in client.js) where our overlay will be rendered.
// What you render is up to you, and you could render as many different overlays as you want from a single module,
// or have multiple native modules, each taking care of a single overlay.
export default class DomOverlayModule extends Module {
  constructor(overlayContainer) {
    super('DomOverlayModule');

    this._closeOverlay = this.closeOverlay.bind(this);
    this._overlayContainer = overlayContainer;
  }

  // This method call opens up the overlay for display.
  openOverlay(props) {
    ReactDOM.render(
      <TextboxOverlay {...props} onClose={this._closeOverlay} />,
      this._overlayContainer
    );
  }

  closeOverlay() {
    ReactDOM.unmountComponentAtNode(this._overlayContainer);
  }
}
