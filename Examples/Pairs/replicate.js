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

// true if action has been generated locally and so does not yet have a sender
export const isLocal = action => {
  return !('sender' in action);
};

// conservative consistency policy which only applies actions which have been
// validated by the master client to the local store. clients are always
// consistent at the cost of adding a round trip to the master client to the
// latency of all actions.
// prettier-ignore
export const dumbTerminalConsistency =
  (isMaster, isValid, send) => store => next => action => {
  // send local actions and master validated actions to peers
  const local = isLocal(action);
  const master = isMaster();
  const valid = master && isValid(action, store.getState());
  if ((!master && local) || valid) {
    send(action);
  }

  // only apply handshake actions or those validated by master to local store
  if (valid || (!local && isMaster(action.sender))) {
    return next(action);
  }
};

// optimistic constency policy which applies valid actions immediately to local
// store. the master client generates actions to fix inconsistencies when
// conflicting actions are detected. the effects of actions are seen as soon as
// possible at the cost of sometimes seeing the effects of actions roll back.
// A limitation of resyncConsistency is that only conflicts detected
// by the master result in a resync. A consequence of this is that if an ordering
// of actions result in isValid returning false, every ordering of those actions
// must cause isValid to return false, otherwise the master may apply actions
// in a valid order, another client may apply then in an invalid order and the
// clients will not end up eventually consistent.
// prettier-ignore
export const resyncConsistency =
  (syncState, isMaster, isValid, send) => store => next => action => {

  // apply valid actions immediately to local store
  if (isValid(action, store.getState())) {
    // send local actions to peers
    if (isLocal(action)) {
      send(action);
    }
    return next(action);
  }

  // reset to master state if conflict detected by master
  if (isMaster()) {
    send(syncState(store.getState()));
  }
};

const isEqual = (a, b) => a.time === b.time && a.origin === b.origin;

const deepCopy = object => JSON.parse(JSON.stringify(object));

// reset state to prediction start, reduce action, reduce valid predictions
const updatePredictions = (syncState, isValid, store, next, prediction, action) => {
  // if action is being replayed or there is no current prediction, just reduce
  if (action.replay === true || prediction.start === null) {
    next(action);
    return;
  }

  // reset state to prediction start, mark sync as a replay action and
  // dispatch to allow other middleware to process replay actions if required
  store.dispatch({...syncState(prediction.start), replay: true});

  // reduce new action
  next(action);

  // store new prediction start state
  const newStart = deepCopy(store.getState()); // avoid deep copy?...

  // filter predictions invalidated by new action
  const newActions = [];
  prediction.actions.forEach(a => {
    if (!isEqual(a, action) && isValid(a, store.getState())) {
      // mark action as a replay and dispatch to allow
      // other middleware to process replay actions if required
      a.replay = true;
      store.dispatch(a);
      newActions.push(a);
    }
  });

  // update prediction
  prediction.actions = newActions;
  if (newActions.length === 0) {
    prediction.start = null;
  } else {
    prediction.start = newStart;
  }
};

// append action to predictions
const appendPrediction = (store, prediction, action) => {
  if (prediction.start === null) {
    prediction.start = deepCopy(store.getState()); // avoid deep copy?...
  }
  prediction.actions.push(action);
};

// optimistic constency policy which applies valid local actions immediately.
// each time an event is received from the master the local predictions
// are reapplied after reducing the new event until the predictions are
// invalidated and discarded or returned from the master after validation. the
// effects of actions are seen as soon as possible at the cost of sometimes
// seeing the effects of predicted actions roll back.
export const replayConsistency = (syncState, isMaster, isValid, send) => {
  const prediction = {
    start: null,
    actions: [],
  };
  return replayConsistencyState(syncState, isMaster, isValid, send, prediction);
};

// internal replayConsistency implementation which takes the current
// prediction state as a parameter is visible for testing
// prettier-ignore
export const replayConsistencyState =
  (syncState, isMaster, isValid, send, prediction) => store => next => action => {
  if (isMaster()) {
    // send and reduce valid local or remote actions
    if (isValid(action, store.getState())) {
      send(action);
      return next(action);
    }
  } else {
    if (isLocal(action)) {
      // immediately send, reduce and append valid local actions to predictions
      if (isValid(action, store.getState())) {
        send(action);
        appendPrediction(store, prediction, action);
        return next(action);
      }
    } else if (isMaster(action.sender)) {
      // update predictions based on new actions from master
      updatePredictions(syncState, isValid, store, next, prediction, action);
    }
  }
};
