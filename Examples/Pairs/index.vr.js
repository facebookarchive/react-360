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

import React from 'react';
import {AppRegistry, View} from 'react-vr';
import {NativeModules} from 'react-vr';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import {Board, isValid} from './components/Board';
import Scores from './components/Scores';
import {isLocal, clientPredictionConsistency} from './replicate';
import app from './reducers';
import uuid from 'uuid';
//import {randomActions} from './random';

// set up web socket connection to relay
const Location = NativeModules.Location;
const relayUrl = Location.hash ? Location.hash.substring(1) : 'ws://localhost:4000';
const ws = new window.WebSocket(relayUrl);

// generate a unique id for local client
const localClient = uuid();

// handshake actions used to establish master localClient and initial state
export const connect = client => ({
  type: 'CONNECT',
  client: client,
});

const heartbeat = () => ({
  type: 'HEARTBEAT',
});

const disconnect = client => ({
  type: 'DISCONNECT',
  client: client,
});

export const syncState = state => ({
  type: 'SYNC_STATE',
  state: state,
});

// add local client to action as sender and send action to peers
const send = action => {
  action.sender = localClient;
  ws.send(JSON.stringify(action));
};

// add timestamps to local actions
const timestampActions = store => next => action => {
  if (!('time' in action)) {
    action.time = new Date().getTime();
    action.origin = localClient;
  }
  return next(action);
};

// log locally applied actions
const logActions = store => next => action => {
  console.log(action);
  if ('time' in action && action.origin === localClient) {
    console.log('(' + (new Date().getTime() - action.time) + 'ms latency)');
  }
  return next(action);
};

// handshake actions always need to be applied to establish master client
// even when conservative consistency policies are used
const isHandshake = action => {
  const types = ['CONNECT', 'SYNC_STATE', 'HEARTBEAT', 'DISCONNECT'];
  return types.indexOf(action.type) >= 0;
};

// filter non-handshake actions from unknown senders
const filterUnknownSenderActions = store => next => action => {
  if (isLocal(action) || isHandshake(action) || action.sender in store.getState().scores) {
    return next(action);
  }
};

// send local handshake actions, replicate non-handshake actions
const replicateNonHandshakeActions = replicate => store => next => action => {
  if (isHandshake(action)) {
    if (isLocal(action)) {
      send(action);
    }
    return next(action);
  } else {
    return replicate(store)(next)(action);
  }
};

const replicateActions = clientPredictionConsistency(syncState, isMaster, isValid, send);
// const replicateActions = dumbTerminalConsistency(isMaster, isValid, send),

const store = createStore(
  app,
  applyMiddleware(
    filterUnknownSenderActions,
    timestampActions,
    replicateNonHandshakeActions(replicateActions),
    logActions
  )
);

// true if master client known and either local or given client is master
function isMaster(client) {
  client = client || localClient;
  const clients = store.getState().scores;
  if (!clients || Object.keys(clients).length === 0) {
    return false;
  }
  return client === Object.keys(clients).sort()[0];
}

// send heartbeats while connected
const heartbeatInterval = 3000;
setInterval(() => {
  send(heartbeat());
}, heartbeatInterval);

// timeout clients if heartbeats not received
const clientTimeouts = {};
const resetTimeout = client => {
  if (clientTimeouts[client]) {
    clearTimeout(clientTimeouts[client]);
    delete clientTimeouts[client];
  }
  clientTimeouts[client] = setTimeout(() => {
    store.dispatch(disconnect(client));
  }, heartbeatInterval * 2);
};

const isConnect = action => {
  return action.type === 'CONNECT';
};

const isDisconnect = action => {
  return action.type === 'DISCONNECT';
};

// read actions from network and dispatch locally
ws.onmessage = evt => {
  const action = JSON.parse(evt.data);

  // clear timeout on disconnect for client to minimise multiple disconnect
  // actions for the same client
  if (isDisconnect(action)) {
    clearTimeout(clientTimeouts[action.client]);
  }

  // reset timeout for sender
  resetTimeout(action.sender);

  // existing master client sends state to other clients after processing connect
  const master = isMaster();

  // dispatch action locally
  store.dispatch(action);

  // sync state if existing master and connect or new master due to disconnect
  if ((master && isConnect(action)) || (isDisconnect(action) && isMaster())) {
    send(syncState(store.getState()));
  }
};

// dispatch initial connect action when websocket is ready
ws.onopen = evt => {
  store.dispatch(connect(localClient));

  // uncomment to randomly generate actions after connection
  /*
  setTimeout(() => {
    randomActions(store, localClient);
  }, 3000);
  */
};

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View>
          <Board client={localClient} />
          <Scores client={localClient} />
        </View>
      </Provider>
    );
  }
}

AppRegistry.registerComponent('pairs', () => App);
