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

const renderSquare = (value, rowIndex, columnIndex, onSquareClick) => (
  <VrButton
    onClick={() => onSquareClick(rowIndex, columnIndex, value)}
    key={rowIndex + ':' + columnIndex}>
    <View style={styles.square}>
      <Text style={styles.text}>
        {value > 0 ? value : ''}
      </Text>
    </View>
  </VrButton>
);

const renderRow = (row, rowIndex, board, onSquareClick) => (
  <View style={styles.row} key={row}>
    {row.map((column, columnIndex) =>
      renderSquare(board[rowIndex][columnIndex], rowIndex, columnIndex, onSquareClick)
    )}
  </View>
);

const renderBoard = ({board, onSquareClick}) => (
  <View style={styles.board}>
    {board.map((row, rowIndex) => renderRow(row, rowIndex, board, onSquareClick))}
  </View>
);

const mapStateToProps = state => ({
  board: state.board,
});

const showSquare = (rowIndex, columnIndex, client) => ({
  type: 'SHOW',
  square: {row: rowIndex, column: columnIndex},
  client: client,
});

const restart = () => ({
  type: 'RESTART',
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onSquareClick: (rowIndex, columnIndex, value) => {
    if (value > 0) {
      dispatch(restart());
    }
    dispatch(showSquare(rowIndex, columnIndex, ownProps.client));
  },
});

const Board = connect(mapStateToProps, mapDispatchToProps)(renderBoard);

export default Board;
