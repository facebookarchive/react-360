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
import uuid from 'uuid';
import Board from './components/Board';
import Scores from './components/Scores';
import {syncState, heartbeat, connect, disconnect} from './actions';
import {clientPredictionConsistency} from './replicate';
import app from './reducers';
import isValid from './reducers/validate';
import {
  timestampActions,
  logActions,
  filterUnknownSenderActions,
  replicateNonHandshakeActions,
} from './middleware';
import {randomActions} from './random';

// set up web socket connection to relay
const Location = NativeModules.Location;
const relayUrl = Location.hash ? Location.hash.substring(1) : 'ws://localhost:4000';
const ws = new window.WebSocket(relayUrl);

// generate a unique id for local client
const localClient = uuid();

// add local client to action as sender and send action to peers
const send = action => {
  action.sender = localClient;
  ws.send(JSON.stringify(action));
};

const replicateActions = clientPredictionConsistency(syncState, isMaster, isValid, send);
// const replicateActions = dumbTerminalConsistency(isMaster, isValid, send),

const store = createStore(
  app,
  applyMiddleware(
    filterUnknownSenderActions,
    timestampActions(localClient),
    replicateNonHandshakeActions(send, replicateActions),
    logActions(localClient)
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

  if (Location.search.substring(1) === 'random') {
    setTimeout(() => {
      randomActions(store, localClient);
    }, 3000);
  }
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
