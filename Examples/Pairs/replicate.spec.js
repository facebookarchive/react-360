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
const clientPredictionConsistency = require('./replicate').clientPredictionConsistency;
const dumbTerminalConsistency = require('./replicate').dumbTerminalConsistency;

const syncState = () => ({type: 'SYNC_STATE'});
let isMaster;
let isValid;
let send;
let middleware;
let store;
let next;

beforeEach(() => {
  isMaster = jest.fn();
  isValid = jest.fn();
  send = jest.fn();
  store = {getState: () => ({})};
  next = jest.fn();
});

describe('clientPredictionConsistency', () => {
  it('should not send or reduce invalid local actions', () => {
    middleware = clientPredictionConsistency(syncState, isMaster, isValid, send);
    middleware(store)(next)({type: 'SOME_ACTION'});
    expect(isValid).toHaveBeenCalled();
    expect(send).not.toHaveBeenCalled();
    expect(next).not.toHaveBeenCalled();
  });
  it('should send and reduce valid local actions to peers', () => {
    isValid = (action, state) => {
      return action;
    };
    middleware = clientPredictionConsistency(syncState, isMaster, isValid, send);
    middleware(store)(next)({type: 'SOME_ACTION'});
    expect(send).toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });
  it('should only reduce valid remote actions', () => {
    isValid = (action, state) => {
      return action;
    };
    middleware = clientPredictionConsistency(syncState, isMaster, isValid, send);
    middleware(store)(next)({type: 'SOME_ACTION', sender: 'SOME-UUID'});
    expect(send).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });
  it('should only send set state on invalid remote actions', () => {
    isMaster = () => true;
    middleware = clientPredictionConsistency(syncState, isMaster, isValid, send);
    middleware(store)(next)({type: 'SOME_ACTION', sender: 'SOME-UUID'});
    expect(send).toHaveBeenCalledWith(syncState());
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
