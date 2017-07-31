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

export const scorer = (value, scores) => {
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

export const countValues = (state, test) => {
  return state.reduce((acc, row) => {
    return row.reduce((acc, value) => {
      if (test(value)) {
        return acc + 1;
      }
      return acc;
    }, acc);
  }, 0);
};

export const countEquals = (state, value) => {
  return countValues(state, x => {
    return x === value;
  });
};

// true if action can be reduced given state
// TODO(jimp): pass store instead of state to allow dispatch during validation?
export const isValid = (action, state) => {
  switch (action.type) {
    case 'SCORE':
      // score can be reduced if state and action agree on scorer
      const currentScorer = scorer(action.value, state.scores);
      return currentScorer === null || currentScorer === action.client;
    case 'SHOW':
      // show action is idempotent, so can always be reduced
      return true;
    case 'HIDE':
      // hide action is idempotent, so can always be reduced
      return true;
  }
  return false;
};

export default isValid;
