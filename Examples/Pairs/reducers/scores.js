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

const initialState = () => ({});

export default (state = initialState(), action) => {
  let result;
  switch (action.type) {
    case 'CONNECT':
      result = {...state};
      result[action.client] = 0;
      return result;
    case 'SCORE':
      result = {...state};
      result[action.client] = action.score;
      return result;
    case 'DISCONNECT':
      result = {...state};
      delete result[action.client];
      return result;
    default:
      return state;
  }
};
