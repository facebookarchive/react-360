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

const width = 4;
const height = 4;

const shuffle = array => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};

const initialState = () => {
  const maxValue = Math.ceil(width * height / 2);
  let values = [...Array(maxValue).keys()]; // [0...maxValue]
  values = values.map(value => -(value + 1)); // [1...-(maxValue + 1)]
  values.push(...values); // [1...-(maxvalue),1...-(maxValue)]
  values = shuffle(values);
  return Array.apply(null, Array(height)).map(() => {
    return values.splice(0, width); // fill row with first width values
  });
};

const copyState = state => {
  return state.slice().map(value => {
    return value.slice();
  });
};

const countValues = (state, value) => {
  return state.reduce((acc, row) => {
    return row.reduce((acc, element) => {
      if (element === value) {
        return acc + 1;
      }
      return acc;
    }, acc);
  }, 0);
};

const score = (scores, client) => ({
  type: 'SCORE',
  client: client,
  score: scores[client] + 1,
});

const hideSquare = (rowIndex, columnIndex, client) => ({
  type: 'HIDE',
  square: {row: rowIndex, column: columnIndex},
  client: client,
  sender: client, // local action, not distributed
});

const gameOver = state => {
  return !state.some(row => row.some(value => value < 0));
};

export const setState = state => ({
  type: 'SET_STATE',
  state: state,
});

const zeroScores = scores => {
  return Object.keys(scores).reduce((acc, key) => {
    acc[key] = 0;
    return acc;
  }, {});
};

// TODO(jimp): split responders like reducers
export const responders = (store, action, master) => {
  const state = store.getState();
  switch (action.type) {
    case 'RESTART':
      // reset game if all pairs shown
      if (master && gameOver(state.board)) {
        store.dispatch(
          setState({
            board: initialState(),
            scores: zeroScores(state.scores),
          })
        );
      }
      return;
    case 'SHOW':
      // generate score if master and pair shown
      if (master) {
        const value = state.board[action.square.row][action.square.column];
        if (countValues(state.board, Math.abs(value)) === 1) {
          // if one half of pair is visible now, both will be after
          // action is reduced, so generate score action.
          store.dispatch(score(state.scores, action.client));
        }
      }

      // schedule local hide action
      setTimeout(() => {
        store.dispatch(hideSquare(action.square.row, action.square.column, action.sender));
      }, 1000);
      return;
  }
};

export default (state = initialState(), action) => {
  let result;
  let value;
  switch (action.type) {
    case 'SHOW':
      result = copyState(state);
      value = state[action.square.row][action.square.column];
      result[action.square.row][action.square.column] = Math.abs(value);
      return result;
    case 'HIDE':
      result = copyState(state);
      value = state[action.square.row][action.square.column];
      if (countValues(state, value) !== 2) {
        result[action.square.row][action.square.column] = -Math.abs(value);
      }
      return result;
    default:
      return state;
  }
};
