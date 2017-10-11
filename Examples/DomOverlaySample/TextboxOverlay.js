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

// A simple textbox overlay that takes over the screen and displays some text.
// The component will get its props via the DOMOverlayModule and use those to render
// the content.
const TextboxOverlay = props => {
  return (
    <div className="container">
      <div className="content">
        <div className="close" onClick={props.onClose} />
        <div>
          <h2>{props.header}</h2>
          <p>{props.description}</p>
          <ul>
            {props.links &&
              props.links.map((link, index) => {
                return <li><a href={link.url} target="_blank">{link.text}</a></li>;
              })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TextboxOverlay;
