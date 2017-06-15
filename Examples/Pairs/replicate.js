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

// handshake actions always need to be applied to establish master client
// even when conservative consistency policies are used
export const isHandshake = action => {
  const types = ['CONNECT', 'SYNC_STATE', 'HEARTBEAT', 'DISCONNECT'];
  return types.indexOf(action.type) >= 0;
};

// true if action has been generated locally and so does not yet have a sender
export const isLocal = action => {
  return !('sender' in action);
};

// conservative consistency policy which only applies actions which have been
// validated by the master client to the local store. clients are always
// consistent at the cost of adding a round trip to the master client to the
// latency of all actions.
export const dumbTerminalConsistency = (isMaster, isValid, send) => store => next => action => {
  // send local actions and master validated actions to peers
  const handshake = isHandshake(action);
  const local = isLocal(action);
  const master = isMaster();
  const valid = master && isValid(action, store.getState());
  if ((handshake && local) || (!master && local) || valid) {
    send(action);
  }

  // only apply handshake actions or those validated by master to local store
  if (handshake || valid || (!local && isMaster(action.sender))) {
    return next(action);
  }
};

// optimistic constency policy which applies valid actions immediately to local
// store. the master client generates actions to fix inconsistencies when
// conflicting actions are detected. the effects of actions are seen as soon as
// possible at the cost of sometimes seeing the effects of actions roll back.
// prettier-ignore
export const clientPredictionConsistency = (syncState, isMaster, isValid, send) => store => next => action => {
  // apply valid actions immediately to local store
  if (isHandshake(action) || isValid(action, store.getState())) {
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
