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

// TODO: allow ES6 imports in tests...
jest.dontMock('./replicate');
const resyncConsistency = require('./replicate').resyncConsistency;
const replayConsistency = require('./replicate').replayConsistency;
const replayConsistencyState = require('./replicate').replayConsistencyState;
const dumbTerminalConsistency = require('./replicate').dumbTerminalConsistency;

const syncState = state => ({type: 'SYNC_STATE', state: state});
let isMaster;
let isValid;
let send;
let middleware;
let store;
let next;
let state;

// fake reducer which processes sync actions and otherwise increments
// a state counter to allow testing of replayed actions.
const fakeReducer = action => {
  if (action.type === 'SYNC_STATE') {
    state = {...action.state};
  } else {
    state.action += 1;
  }
};

beforeEach(() => {
  isMaster = jest.fn();
  isValid = jest.fn();
  send = jest.fn();
  state = {action: 0};
  store = {getState: () => state, dispatch: jest.fn(action => fakeReducer(action))};
  next = jest.fn(action => fakeReducer(action));
});

describe('resyncConsistency', () => {
  it('should not send or reduce invalid local actions', () => {
    middleware = resyncConsistency(syncState, isMaster, isValid, send);
    middleware(store)(next)({type: 'SOME_ACTION'});
    expect(isValid).toHaveBeenCalled();
    expect(send).not.toHaveBeenCalled();
    expect(next).not.toHaveBeenCalled();
  });
  it('should send and reduce valid local actions to peers', () => {
    isValid = (action, state) => {
      return action;
    };
    middleware = resyncConsistency(syncState, isMaster, isValid, send);
    middleware(store)(next)({type: 'SOME_ACTION'});
    expect(send).toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });
  it('should only reduce valid remote actions', () => {
    isValid = (action, state) => {
      return action;
    };
    middleware = resyncConsistency(syncState, isMaster, isValid, send);
    middleware(store)(next)({type: 'SOME_ACTION', sender: 'SOME-UUID'});
    expect(send).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });
  it('should only send set state on invalid remote actions', () => {
    isMaster = () => true;
    middleware = resyncConsistency(syncState, isMaster, isValid, send);
    middleware(store)(next)({type: 'SOME_ACTION', sender: 'SOME-UUID'});
    expect(send).toHaveBeenCalledWith(syncState({action: 0}));
    expect(next).not.toHaveBeenCalled();
  });
});

describe('dumbTerminalConsistency', () => {
  it('should only send local actions if not master', () => {
    middleware = dumbTerminalConsistency(isMaster, isValid, send);
    middleware(store)(next)({type: 'SOME_ACTION'});
    expect(isValid).not.toHaveBeenCalled();
    expect(send).toHaveBeenCalled();
    expect(next).not.toHaveBeenCalled();
  });
  it('should only reduce actions from master', () => {
    isMaster = sender => {
      return sender === 'SOME-UUID';
    };
    middleware = dumbTerminalConsistency(isMaster, isValid, send);
    middleware(store)(next)({type: 'SOME_ACTION', sender: 'SOME-UUID'});
    expect(isValid).not.toHaveBeenCalled();
    expect(send).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });
  it('should not reduce actions from non-master', () => {
    isMaster = sender => {
      return sender === 'SOME-UUID';
    };
    middleware = dumbTerminalConsistency(isMaster, isValid, send);
    middleware(store)(next)({type: 'SOME_ACTION', sender: 'SOME-OTHER-UUID'});
    expect(isValid).not.toHaveBeenCalled();
    expect(send).not.toHaveBeenCalled();
    expect(next).not.toHaveBeenCalled();
  });
  it('should send and reduce valid local actions if master', () => {
    isMaster = () => true;
    isValid = (action, state) => action;
    middleware = dumbTerminalConsistency(isMaster, isValid, send);
    middleware(store)(next)({type: 'SOME_ACTION'});
    expect(send).toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });
  it('should not send or reduce invalid actions if master', () => {
    isMaster = () => true;
    isValid = (action, state) => null;
    middleware = dumbTerminalConsistency(isMaster, isValid, send);
    middleware(store)(next)({type: 'SOME_ACTION'});
    expect(send).not.toHaveBeenCalled();
    expect(next).not.toHaveBeenCalled();
  });
});

describe('replayConsistency', () => {
  it('master should send and reduce valid local actions', () => {
    isMaster = action => true;
    isValid = (action, state) => true;
    middleware = replayConsistency(syncState, isMaster, isValid, send);
    middleware(store)(next)({type: 'SOME_ACTION'});
    expect(send).toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });
  it('master should send and reduce valid remote actions', () => {
    isMaster = action => true;
    isValid = (action, state) => true;
    middleware = replayConsistency(syncState, isMaster, isValid, send);
    middleware(store)(next)({type: 'SOME_ACTION', sender: 'SOME-UUID'});
    expect(send).toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });
  it('master should not send or reduce invalid local actions', () => {
    isMaster = action => true;
    isValid = (action, state) => false;
    middleware = replayConsistency(syncState, isMaster, isValid, send);
    middleware(store)(next)({type: 'SOME_ACTION'});
    expect(send).not.toHaveBeenCalled();
    expect(next).not.toHaveBeenCalled();
  });
  it('master should not send or reduce invalid remote actions', () => {
    isMaster = action => true;
    isValid = (action, state) => false;
    middleware = replayConsistency(syncState, isMaster, isValid, send);
    middleware(store)(next)({type: 'SOME_ACTION', sender: 'SOME-UUID'});
    expect(send).not.toHaveBeenCalled();
    expect(next).not.toHaveBeenCalled();
  });
  it('non-master should reduce valid master actions', () => {
    isMaster = action => action; // non-master, action from master
    isValid = (action, state) => true;
    middleware = replayConsistency(syncState, isMaster, isValid, send);
    middleware(store)(next)({type: 'SOME_ACTION', sender: 'SOME-UUID'});
    expect(send).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });
  it('non-master should reduce invalid master actions', () => {
    isMaster = action => action; // non-master, action from master
    isValid = (action, state) => false;
    middleware = replayConsistency(syncState, isMaster, isValid, send);
    middleware(store)(next)({type: 'SOME_ACTION', sender: 'SOME-UUID'});
    expect(send).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });
  it('non-master should not send or reduce valid non-master actions', () => {
    isMaster = action => false;
    isValid = (action, state) => true;
    middleware = replayConsistency(syncState, isMaster, isValid, send);
    middleware(store)(next)({type: 'SOME_ACTION', sender: 'SOME-UUID'});
    expect(send).not.toHaveBeenCalled();
    expect(next).not.toHaveBeenCalled();
  });
  it('non-master should not send or reduce invalid non-master actions', () => {
    isMaster = action => false;
    isValid = (action, state) => false;
    middleware = replayConsistency(syncState, isMaster, isValid, send);
    middleware(store)(next)({type: 'SOME_ACTION', sender: 'SOME-UUID'});
    expect(send).not.toHaveBeenCalled();
    expect(next).not.toHaveBeenCalled();
  });
  it('non-master should send, reduce and append valid local actions to predictions', () => {
    isMaster = action => false;
    isValid = (action, state) => true;
    const prediction = {start: {}, actions: []};
    middleware = replayConsistencyState(syncState, isMaster, isValid, send, prediction);
    const action = {type: 'SOME_ACTION'};
    middleware(store)(next)(action);
    expect(send).toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
    expect(prediction.actions).toEqual([action]);
    expect(prediction.start).toEqual({});
  });
  it('non-master should not send or reduce invalid local actions', () => {
    isMaster = action => false;
    isValid = (action, state) => false;
    const prediction = {start: {}, actions: []};
    middleware = replayConsistencyState(syncState, isMaster, isValid, send, prediction);
    const action = {type: 'SOME_ACTION'};
    middleware(store)(next)(action);
    expect(send).not.toHaveBeenCalled();
    expect(next).not.toHaveBeenCalled();
    expect(prediction.actions).toEqual([]);
  });
  it('non-master should reapply predictions after valid master actions if they remain valid', () => {
    isMaster = action => action; // non-master, action from master
    isValid = (action, state) => true;
    const predictedAction = {type: 'SOME_PREDICTION', time: 1};
    const prediction = {start: {action: -1}, actions: [predictedAction]};
    middleware = replayConsistencyState(syncState, isMaster, isValid, send, prediction);
    const action = {type: 'SOME_ACTION', sender: 'MASTER-UUID', time: 2};
    middleware(store)(next)(action);
    expect(send).not.toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalledWith({
      type: 'SYNC_STATE',
      state: {action: -1},
      replay: true,
    });
    expect(next).toHaveBeenCalledWith(action);
    expect(store.dispatch).toHaveBeenCalledWith(predictedAction);
    expect(state).toEqual({action: 1});
    expect(prediction.actions).toEqual([predictedAction]); // prediction still valid
    expect(prediction.start).toEqual({action: 0});
  });
  it('non-master should reapply predictions after invalid master actions if they remain valid', () => {
    isMaster = action => action; // non-master, action from master
    isValid = (action, state) => action.type === 'SOME_PREDICTION'; // master action invalid
    const predictedAction = {type: 'SOME_PREDICTION', time: 1};
    const prediction = {start: {action: -1}, actions: [predictedAction]};
    middleware = replayConsistencyState(syncState, isMaster, isValid, send, prediction);
    const action = {type: 'SOME_ACTION', sender: 'MASTER-UUID', time: 2};
    middleware(store)(next)(action);
    expect(send).not.toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalledWith({
      type: 'SYNC_STATE',
      state: {action: -1},
      replay: true,
    });
    expect(next).toHaveBeenCalledWith(action); // master actions always applied
    expect(store.dispatch).toHaveBeenCalledWith(predictedAction);
    expect(state).toEqual({action: 1});
    expect(prediction.actions).toEqual([predictedAction]); // prediction still valid
    expect(prediction.start).toEqual({action: 0});
  });
  it('non-master should not reapply predictions after valid master actions if they become invalid', () => {
    isMaster = action => action; // non-master, action from master
    isValid = (action, state) => action.type === 'SOME_ACTION'; // prediction becomes invalid
    const predictedAction = {type: 'SOME_PREDICTION', time: 1};
    const prediction = {start: {action: -1}, actions: [predictedAction]};
    middleware = replayConsistencyState(syncState, isMaster, isValid, send, prediction);
    const action = {type: 'SOME_ACTION', sender: 'MASTER-UUID', time: 2};
    middleware(store)(next)(action);
    expect(send).not.toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalledWith({
      type: 'SYNC_STATE',
      state: {action: -1},
      replay: true,
    });
    expect(next).toHaveBeenCalledWith(action);
    expect(store.dispatch).not.toHaveBeenCalledWith(predictedAction);
    expect(state).toEqual({action: 0});
    expect(prediction.actions).toEqual([]); // prediction invalidated
    expect(prediction.start).toEqual(null); // prediction invalidated
  });
  it('non-master should not reapply predictions after valid master actions if they become invalid', () => {
    isMaster = action => action; // non-master, action from master
    isValid = (action, state) => false; // prediction and action invalid
    const predictedAction = {type: 'SOME_PREDICTION', time: 1};
    const prediction = {start: {action: -1}, actions: [predictedAction]};
    middleware = replayConsistencyState(syncState, isMaster, isValid, send, prediction);
    const action = {type: 'SOME_ACTION', sender: 'MASTER-UUID', time: 2};
    middleware(store)(next)(action);
    expect(send).not.toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalledWith({
      type: 'SYNC_STATE',
      state: {action: -1},
      replay: true,
    });
    expect(next).toHaveBeenCalledWith(action); // master actions always applied
    expect(store.dispatch).not.toHaveBeenCalledWith(predictedAction);
    expect(state).toEqual({action: 0});
    expect(prediction.actions).toEqual([]); // prediction invalidated
    expect(prediction.start).toEqual(null); // prediction invalidated
  });
});
