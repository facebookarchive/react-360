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
import {syncState} from '../index.vr';

const renderSquare = (value, rowIndex, columnIndex, state, onSquareClick) =>
  <VrButton
    onClick={() => onSquareClick(rowIndex, columnIndex, value, state)}
    key={rowIndex + ':' + columnIndex}>
    <View style={styles.square}>
      <Text style={styles.text}>
        {value > 0 ? value : ''}
      </Text>
    </View>
  </VrButton>;

const renderRow = (row, rowIndex, state, onSquareClick) =>
  <View style={styles.row} key={row}>
    {row.map((column, columnIndex) =>
      renderSquare(state.board[rowIndex][columnIndex], rowIndex, columnIndex, state, onSquareClick)
    )}
  </View>;

const renderBoard = ({state, onSquareClick}) =>
  <View style={styles.board}>
    {state.board.map((row, rowIndex) => renderRow(row, rowIndex, state, onSquareClick))}
  </View>;

const mapStateToProps = state => ({
  state: state,
});

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

export const countValues = (state, test) => {
  return state.reduce((acc, row) => {
    return row.reduce((acc, value) => {
      if (test(value)) {
        return acc + 1;
      }
      return acc;
    }, acc);
  }, 0);
};

export const countEquals = (state, value) => {
  return countValues(state, x => {
    return x === value;
  });
};

const zeroScores = scores => {
  return Object.keys(scores).reduce((acc, key) => {
    acc[key] = [];
    return acc;
  }, {});
};

const scorer = (value, scores) => {
  let result = null;
  Object.keys(scores).some(key => {
    if (scores[key].indexOf(value) >= 0) {
      result = key;
      return true;
    }
    return false;
  });
  return result;
};

const gameOver = board => {
  return !board.some(row => row.some(value => value < 0));
};

// true if action can be reduced given state
// TODO(jimp): pass store instead of state to allow dispatch during validation?
export const isValid = (action, state) => {
  switch (action.type) {
    case 'SCORE':
      // score action can be reduced if state and action agree on scorer
      const currentScorer = scorer(action.value, state.scores);
      return currentScorer === null || currentScorer === action.client;
    case 'SHOW':
      // show action is idempotent, so can always be reduced
      return true;
    case 'HIDE':
      // hide action can be reduced if value not scored
      const value = state.board[action.square.row][action.square.column];
      return scorer(value, state.scores) === null;
  }
  return null;
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

export const Board = connect(mapStateToProps, mapDispatchToProps)(renderBoard);
