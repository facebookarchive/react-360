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

export const width = 4;
export const height = 4;

const shuffle = array => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};

export const initialState = () => {
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
      result[action.square.row][action.square.column] = -Math.abs(value);
      return result;
    default:
      return state;
  }
};
