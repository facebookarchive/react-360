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

// Hack for react-dom to work, otherwise the console spits out
// a `process is not defined error`, in what looks like react's initialization:
// if (process.env.NODE_ENV === 'production') {
//   module.exports = require('./cjs/react.production.min.js');
// } else {
//   module.exports = require('./cjs/react.development.js');
// }
window.process = {
  env: {
    NODE_ENV: 'production',
  },
};

if (__DEV__) {
  window.process.env.NODE_ENV = 'development';
}
