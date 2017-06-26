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

const scorer = (value, scores) => {
  let result = null;
  Object.keys(scores).some(key => {
    if (scores[key].indexOf(value) >= 0) {
      result = key;
      return true;
    }
    return false;
  });
  return result;
};

// true if action can be reduced given state
// TODO(jimp): pass store instead of state to allow dispatch during validation?
export const isValid = (action, state) => {
  switch (action.type) {
    case 'SCORE':
      // score action can be reduced if state and action agree on scorer
      const currentScorer = scorer(action.value, state.scores);
      return currentScorer === null || currentScorer === action.client;
    case 'SHOW':
      // show action is idempotent, so can always be reduced
      return true;
    case 'HIDE':
      // hide action can be reduced if value not scored
      const value = state.board[action.square.row][action.square.column];
      return scorer(value, state.scores) === null;
  }
  return null;
};

export default isValid;
