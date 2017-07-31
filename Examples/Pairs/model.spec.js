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

const createStore = require('redux').createStore;
const applyMiddleware = require('redux').applyMiddleware;
const clientPredictionConsistency = require('./replicate').clientPredictionConsistency;
const app = require('./reducers').default;
const isValid = require('./reducers/validate').isValid;
const syncState = require('./actions').syncState;
const connect = require('./actions').connect;
const showSquare = require('./actions').showSquare;
const hideSquare = require('./actions').hideSquare;
const scoreSquare = require('./actions').scoreSquare;
const filterUnknownSenderActions = require('./middleware').filterUnknownSenderActions;
const replicateNonHandshakeActions = require('./middleware').replicateNonHandshakeActions;

const fakeIsMaster = () => true;
const fakeSender = (action, sender) => {
  action.sender = sender;
  return action;
};

const setPairToValue = (state, value, pair) => {
  state.board[pair][0] = value;
  state.board[pair][1] = value;
  return state;
};

const scorePair = (state, client, value) => {
  if (state.scores[client]) {
    state.scores[client].push(value);
  } else {
    state.scores[client] = [value];
  }
  return state;
};

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
    )
  );

  store.dispatch(connect(masterId));
  store.dispatch(connect(aClientId));
  store.dispatch(connect(bClientId));
});

describe('optimistic show consistency', () => {
  it('clients should send and reduce local show actions', () => {
    const value = store.getState().board[0][0];
    const showAction = showSquare(0, 0, masterId);
    store.dispatch(showAction);
    expect(fakeSend).toHaveBeenCalledWith(showAction);
    expect(store.getState().board[0][0]).toEqual(Math.abs(value));
  });
  it('client show reduction should be idempotent', () => {
    const value = store.getState().board[0][0];
    const showAction = fakeSender(showSquare(0, 0, aClientId), aClientId);
    store.dispatch(showAction);
    expect(store.getState().board[0][0]).toEqual(Math.abs(value));
    store.dispatch(showAction);
    expect(store.getState().board[0][0]).toEqual(Math.abs(value));
    expect(fakeSend).toHaveBeenCalledTimes(3); // connect actions only.
  });
});

describe('optimistic hide consistency', () => {
  it('clients should send and reduce local hide actions for unscored squares', () => {
    const value = store.getState().board[0][0];
    const showAction = showSquare(0, 0, masterId);
    store.dispatch(showAction);
    expect(store.getState().board[0][0]).toEqual(Math.abs(value));
    const hideAction = hideSquare(showAction);
    store.dispatch(hideAction);
    expect(fakeSend).toHaveBeenCalledWith(hideAction);
    expect(store.getState().board[0][0]).toEqual(value);
  });
  it('client hide reduction should be idempotent', () => {
    const value = store.getState().board[0][0];
    const showAction = fakeSender(showSquare(0, 0, aClientId), aClientId);
    store.dispatch(showAction);
    expect(store.getState().board[0][0]).toEqual(Math.abs(value));
    const hideAction = fakeSender(hideSquare(showAction), aClientId);
    store.dispatch(hideAction);
    expect(store.getState().board[0][0]).toEqual(value);
    store.dispatch(hideAction);
    expect(store.getState().board[0][0]).toEqual(value);
    expect(fakeSend).toHaveBeenCalledTimes(3); // connect actions only.
  });
});

describe('optimistic score consistency', () => {
  it('clients should send and reduce local score actions', () => {
    store.dispatch(syncState(setPairToValue(store.getState(), 42, 0)));
    const scoreAction = scoreSquare(masterId, 42);
    store.dispatch(scoreAction);
    expect(fakeSend).toHaveBeenCalledWith(scoreAction);
    expect(store.getState().scores[masterId]).toEqual([42]);
  });
  it('clients should reduce score actions that do not conflict', () => {
    store.dispatch(syncState(setPairToValue(setPairToValue(store.getState(), 42, 0), 1337, 1)));
    store.dispatch(fakeSender(scoreSquare(aClientId, 42), aClientId));
    expect(store.getState().scores[aClientId]).toEqual([42]);
    store.dispatch(fakeSender(scoreSquare(bClientId, 1337), bClientId));
    expect(store.getState().scores[bClientId]).toEqual([1337]);
    expect(fakeSend).toHaveBeenCalledTimes(4); // connect and sync actions only.
  });
  it('client score reduction should be idempotent', () => {
    store.dispatch(syncState(setPairToValue(store.getState(), 42, 0)));
    store.dispatch(fakeSender(scoreSquare(aClientId, 42), aClientId));
    expect(store.getState().scores[aClientId]).toEqual([42]);
    store.dispatch(fakeSender(scoreSquare(aClientId, 42), bClientId));
    expect(store.getState().scores[aClientId]).toEqual([42]);
    expect(fakeSend).toHaveBeenCalledTimes(4); // connect and sync actions only.
  });
  it('master should not reduce conflicting score and should send sync', () => {
    store.dispatch(syncState(setPairToValue(store.getState(), 42, 0)));
    store.dispatch(scoreSquare(aClientId, 42));
    expect(store.getState().scores[aClientId]).toEqual([42]);
    const syncAction = syncState(store.getState());
    store.dispatch(scoreSquare(bClientId, 42));
    expect(fakeSend).toHaveBeenCalledWith(syncAction);
    expect(store.getState().scores[bClientId]).toEqual([]);
  });
});
