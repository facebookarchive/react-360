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

import {combineReducers} from 'redux';
import board from './board';
import scores from './scores';
import {scorer} from './validate';

const reducers = combineReducers({
  board,
  scores,
});

const app = (state, action) => {
  switch (action.type) {
    case 'SYNC_STATE':
      return {...action.state};
    case 'HIDE':
      const value = state.board[action.square.row][action.square.column];
      if (scorer(value, state.scores)) {
        return state; // Don't hide scored squares.
      }
  }

  if (action.type === 'SYNC_STATE') {
    return {...action.state};
  }
  return reducers(state, action);
};

export default app;
