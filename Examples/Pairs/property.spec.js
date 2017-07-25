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

// Model integration test: actions, validators, reducers and middleware.

jest.dontMock('redux');
jest.dontMock('./replicate');
jest.dontMock('./reducers');
jest.dontMock('./reducers/board');
jest.dontMock('./reducers/scores');
jest.dontMock('./reducers/validate');
jest.dontMock('./actions');
jest.dontMock('./middleware');

require('jasmine-check').install();
const createStore = require('redux').createStore;
const applyMiddleware = require('redux').applyMiddleware;
const clientPredictionConsistency = require('./replicate').clientPredictionConsistency;
const app = require('./reducers').default;
const isValid = require('./reducers/validate').isValid;
const countEquals = require('./reducers/validate').countEquals;
const syncState = require('./actions').syncState;
const connect = require('./actions').connect;
const showSquare = require('./actions').showSquare;
const hideSquare = require('./actions').hideSquare;
const scoreSquare = require('./actions').scoreSquare;
const filterUnknownSenderActions = require('./middleware').filterUnknownSenderActions;
const replicateNonHandshakeActions = require('./middleware').replicateNonHandshakeActions;
//const logActions = require('./middleware').logActions;
const width = require('./reducers/board').width;
const height = require('./reducers/board').height;

const fakeIsMaster = () => true;

const masterId = '0000-UUID';
const aClientId = 'AAAA-UUID';
const bClientId = 'BBBB-UUID';

let fakeSend;
let replicateActions;
let store;

beforeEach(() => {
  fakeSend = jest.fn();
  replicateActions = clientPredictionConsistency(syncState, fakeIsMaster, isValid, fakeSend);
  store = createStore(
    app,
    applyMiddleware(
      filterUnknownSenderActions,
      replicateNonHandshakeActions(fakeSend, replicateActions)
      //logActions(masterId)
    )
  );
  store.dispatch(connect(masterId));
  store.dispatch(connect(aClientId));
  store.dispatch(connect(bClientId));
});

const clients = [masterId, aClientId, bClientId];
const genShow = gen.posInt.then(n => {
  const row = n % height;
  const column = Math.floor(n / height) % width;
  return gen.oneOf(clients).then(client => {
    return showSquare(row, column, client);
  });
});
const genHide = genShow.then(showAction => {
  return hideSquare(showAction);
});
const genScore = gen.posInt.then(n => {
  const value = n % (width * height / 2);
  return gen.oneOf(clients).then(client => {
    return scoreSquare(client, value);
  });
});
const genAction = gen.oneOf([genShow, genHide, genScore]);

describe('optimistic consistency', () => {
  check.it('scores match pairs shown', gen.array(genAction), actions => {
    actions.forEach(action => {
      store.dispatch(action);
    });
    const state = store.getState();
    Object.keys(state.scores).forEach(client => {
      state.scores[client].forEach(value => {
        expect(countEquals(state.board, value)).toEqual(2);
      });
    });
  });
});
