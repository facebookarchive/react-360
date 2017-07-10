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
import {Text, View, VrButton} from 'react-vr';
import {connect} from 'react-redux';
import styles from './styles';
import {initialState} from '../reducers/board';
import {countEquals} from '../reducers/validate';
import {showSquare, hideSquare, scoreSquare, syncState} from '../actions';

const renderSquare = (value, rowIndex, columnIndex, state, onSquareClick) => (
  <VrButton
    onClick={() => onSquareClick(rowIndex, columnIndex, value, state)}
    key={rowIndex + ':' + columnIndex}>
    <View style={styles.square}>
      <Text style={styles.text}>
        {value > 0 ? value : ''}
      </Text>
    </View>
  </VrButton>
);

const renderRow = (row, rowIndex, state, onSquareClick) => (
  <View style={styles.row} key={row}>
    {row.map((column, columnIndex) =>
      renderSquare(state.board[rowIndex][columnIndex], rowIndex, columnIndex, state, onSquareClick)
    )}
  </View>
);

const renderBoard = ({state, onSquareClick}) => (
  <View style={styles.board}>
    {state.board.map((row, rowIndex) => renderRow(row, rowIndex, state, onSquareClick))}
  </View>
);

const mapStateToProps = state => ({
  state: state,
});

const zeroScores = scores => {
  return Object.keys(scores).reduce((acc, key) => {
    acc[key] = [];
    return acc;
  }, {});
};

const gameOver = board => {
  return !board.some(row => row.some(value => value < 0));
};

export const dispatchShowActions = (row, column, client, state, dispatch, delay) => {
  // dispatch show action
  const showAction = showSquare(row, column, client);
  dispatch(showAction);

  // dispatch score action if one half of pair currently shown
  const value = state.board[row][column];
  if (countEquals(state.board, Math.abs(value)) === 1) {
    dispatch(scoreSquare(client, Math.abs(value)));
  }

  // dispatch hide after delay
  setTimeout(() => {
    dispatch(hideSquare(showAction));
  }, delay);
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  onSquareClick: (row, column, value, state) => {
    // reset game if game over
    if (gameOver(state.board)) {
      dispatch(syncState({board: initialState(), scores: zeroScores(state.scores)}));
      return;
    }

    // otherwise dispatch show, score and hide actions
    dispatchShowActions(row, column, ownProps.client, state, dispatch, 1000);
  },
});

const Board = connect(mapStateToProps, mapDispatchToProps)(renderBoard);

export default Board;
