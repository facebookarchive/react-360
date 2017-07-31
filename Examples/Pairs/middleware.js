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

import {isLocal} from './replicate';

// add timestamps to local actions
export const timestampActions = localClient => store => next => action => {
  if (!('time' in action)) {
    action.time = new Date().getTime();
    action.origin = localClient;
  }
  return next(action);
};

// log locally applied actions
export const logActions = localClient => store => next => action => {
  console.log(action);
  if ('time' in action && action.origin === localClient) {
    console.log('(' + (new Date().getTime() - action.time) + 'ms latency)');
  }
  return next(action);
};

// log state
export const logState = store => next => action => {
  const result = next(action);
  const state = store.getState();
  console.log(state.board);
  console.log(state.scores);
  return result;
};

// filter non-handshake actions from unknown senders
export const filterUnknownSenderActions = store => next => action => {
  if (isLocal(action) || isHandshake(action) || action.sender in store.getState().scores) {
    return next(action);
  }
};

// handshake actions always need to be applied to establish master client
// even when conservative consistency policies are used
const isHandshake = action => {
  const types = ['CONNECT', 'SYNC_STATE', 'HEARTBEAT', 'DISCONNECT'];
  return types.indexOf(action.type) >= 0;
};

// send local handshake actions, replicate non-handshake actions
export const replicateNonHandshakeActions = (send, replicate) => store => next => action => {
  if (isHandshake(action)) {
    if (isLocal(action)) {
      send(action);
    }
    return next(action);
  } else {
    return replicate(store)(next)(action);
  }
};
