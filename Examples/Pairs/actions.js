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

export const showSquare = (rowIndex, columnIndex, client) => ({
  type: 'SHOW',
  square: {row: rowIndex, column: columnIndex},
  client: client,
});

export const scoreSquare = (client, value) => ({
  type: 'SCORE',
  client: client,
  value: value,
});

export const hideSquare = showAction => ({
  type: 'HIDE',
  square: showAction.square,
  client: showAction.client,
});

// handshake actions used to establish master localClient and initial state
export const connect = client => ({
  type: 'CONNECT',
  client: client,
});

export const heartbeat = () => ({
  type: 'HEARTBEAT',
});

export const disconnect = client => ({
  type: 'DISCONNECT',
  client: client,
});

export const syncState = state => ({
  type: 'SYNC_STATE',
  state: state,
});
