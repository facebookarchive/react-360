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
import {Text, View} from 'react-vr';
import {connect} from 'react-redux';
import styles from './styles';

const renderScore = (key, score, local) =>
  <View style={styles.square} key={key}>
    <Text style={local ? styles.text : styles.grayText}>
      {score}
    </Text>
  </View>;

// TODO(jimp): fix layout to show all scores rather than first 4.
const renderScores = ({scores, id}) =>
  <View style={styles.board}>
    <View style={styles.row}>
      {Object.keys(scores)
        .sort()
        .slice(0, 4)
        .map((key, index) => renderScore(key, scores[key].length, key === id))}
    </View>
  </View>;

const mapStateToProps = (state, ownProps) => ({
  scores: state.scores,
  id: ownProps.client,
});

const mapDispatchToProps = dispatch => ({});

const Scores = connect(mapStateToProps, mapDispatchToProps)(renderScores);

export default Scores;
