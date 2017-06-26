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

jest.dontMock('./scores');
const reducer = require('./scores').default;

describe('scores reducer', () => {
  it('should return the initial state', () => {
    const state = undefined;
    const action = {};
    const result = {};
    expect(reducer(state, action)).toEqual(result);
  });
  it('should add a player on CONNECT', () => {
    const state = {};
    const action = {type: 'CONNECT', client: 'SOME-UUID'};
    const result = {'SOME-UUID': []};
    expect(reducer(state, action)).toEqual(result);
  });
  it('should remove a player on DISCONNECT', () => {
    const state = {'SOME-UUID': []};
    const action = {type: 'DISCONNECT', client: 'SOME-UUID'};
    const result = {};
    expect(reducer(state, action)).toEqual(result);
  });
  it('should be idempotent on DISCONNECT', () => {
    const state = {'SOME-UUID': []};
    const action = {type: 'DISCONNECT', client: 'SOME-UUID'};
    const result = {};
    expect(reducer(state, action)).toEqual(result);
    expect(reducer(state, action)).toEqual(result);
  });
  it('should add a pair on SCORE', () => {
    const state = {'SOME-UUID': []};
    const action = {type: 'SCORE', client: 'SOME-UUID', value: 42};
    const result = {'SOME-UUID': [42]};
    expect(reducer(state, action)).toEqual(result);
  });
  it('should be idempotent on SCORE', () => {
    const state = {'SOME-UUID': []};
    const action = {type: 'SCORE', client: 'SOME-UUID', value: 42};
    const result = {'SOME-UUID': [42]};
    expect(reducer(state, action)).toEqual(result);
    expect(reducer(state, action)).toEqual(result);
  });
});
