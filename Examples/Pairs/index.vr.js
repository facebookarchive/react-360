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
import Board from './components/Board';
import Scores from './components/Scores';
import app from './reducers';
import {responders, setState} from './reducers/board';
import uuid from 'uuid';

const client = uuid();

// master is client with first sorted client id
const isMasterClient = clients => {
  if (!clients) {
    return false;
  }
  return client === Object.keys(clients).sort()[0];
};

const connect = client => ({
  type: 'CONNECT',
  client: client,
});

const Location = NativeModules.Location;
const relayUrl = Location.hash ? Location.hash.substring(1) : 'ws://localhost:4000';
const ws = new window.WebSocket(relayUrl);

// respond to actions received over network
const respondToAction = store => next => action => {
  const state = store.getState();
  responders(store, action, isMasterClient(state.scores));
  return next(action);
};

// send actions to other clients if not received over network
const sendAction = store => next => action => {
  if (!('sender' in action)) {
    action.sender = client;
    ws.send(JSON.stringify(action));
  }

  return next(action);
};

const store = createStore(app, applyMiddleware(respondToAction, sendAction));

const heartbeat = () => ({
  type: 'HEARTBEAT',
});

const disconnect = client => ({
  type: 'DISCONNECT',
  client: client,
});

// send heartbeats while connected
const heartbeatInterval = 3000;
setInterval(() => {
  store.dispatch(heartbeat());
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

// read actions from network and dispatch locally
ws.onmessage = evt => {
  const action = JSON.parse(evt.data);
  console.log(action);

  // clear timeout on disconnect for client to minimise multiple disconnect
  // actions for the same client
  if (action.type === 'DISCONNECT') {
    clearTimeout(clientTimeouts[action.client]);
  }

  // reset timeout for sender
  resetTimeout(action.sender);

  // existing master client sends state to other clients after processing connect
  const master = isMasterClient(store.getState().scores);

  // dispatch action locally
  store.dispatch(action);

  // sync state if existing master and connect or new master due to disconnect
  // TODO(jimp): only send state to new client on connect...
  if (
    (master && action.type === 'CONNECT') ||
    (!master && isMasterClient(store.getState().scores))
  ) {
    ws.send(JSON.stringify(setState(store.getState())));
  }
};

// send initial connect action when websocket is ready
ws.onopen = evt => {
  store.dispatch(connect(client));
};

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View>
          <Board client={client} />
          <Scores client={client} />
        </View>
      </Provider>
    );
  }
}

AppRegistry.registerComponent('pairs', () => App);
