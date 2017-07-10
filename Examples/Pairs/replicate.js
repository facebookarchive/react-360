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
export const dumbTerminalConsistency = (isMaster, isValid, send) => store => next => action => {
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
// A limitation of clientPredictionConsistency is that only conflicts detected
// by the master result in a resync. A consequence of this is that if an ordering
// of actions result in isValid returning false, every ordering of those actions
// must cause isValid to return false, otherwise the master may apply actions
// in a valid order, another client may apply then in an invalid order and the
// clients will not end up eventually consistent.
// prettier-ignore
export const clientPredictionConsistency = (syncState, isMaster, isValid, send) => store => next => action => {

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
