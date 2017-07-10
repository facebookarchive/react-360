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

import {dispatchShowActions} from './components/Board';
import {width, height} from './reducers/board';
import {countValues} from './reducers/validate';

// return a random integer between 0 and max
const randomInt = max => {
  return Math.floor(Math.random() * (max + 1));
};

// dispatch randomly generated actions
const delay = 200;
export const randomActions = (store, client) => {
  const interval = setInterval(() => {
    const row = randomInt(height - 1);
    const column = randomInt(width - 1);
    const state = store.getState();
    if (state.board[row][column] < 0) {
      dispatchShowActions(row, column, client, state, store.dispatch, delay * 2);
    }

    // cancel interval if no squares hidden
    const countHidden = countValues(store.getState().board, value => {
      return value < 0;
    });
    if (countHidden <= 0) {
      clearInterval(interval);
    }
  }, delay);
};
