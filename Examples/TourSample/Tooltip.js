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
 *
 */
'use strict';

import React from 'react';
import {asset, Image, MediaPlayerState, Text, Video, VideoControl, View} from 'react-vr';

/**
 * Tooltip encapsulates the different tooltip types used with the InfoButton
 * and renders either an image, image with text overlay, or text block.
 *
 * When using with CylinderLayer, set pixelsPerMeter to convert units, otherise
 * set translateZ to specify distance between camera and tooltip. 
 */
class Tooltip extends React.Component {
  static defaultProps = {
    pixelsPerMeter: 1,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const tooltip = this.props.tooltip;
    const PPM = this.props.pixelsPerMeter;

    switch (this.props.tooltip.type) {
      case 'image':
        return <ImageTooltip tooltip={tooltip} pixelsPerMeter={PPM} />;
      case 'panelimage':
        return <PanelImageTooltip tooltip={tooltip} pixelsPerMeter={PPM} />;
      case 'textblock':
        return <TextBlockTooltip tooltip={tooltip} pixelsPerMeter={PPM} />;
      case 'video':
        return <VideoTooltip tooltip={tooltip} pixelsPerMeter={PPM} />;
      default:
        return <Text style={{backgroundColor: 'red'}}>Missing Tooltip</Text>;
    }
  }
}

class ImageTooltip extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const tooltip = this.props.tooltip;
    const PPM = this.props.pixelsPerMeter;
    const fontSize = {
      attrib: 0.05 * PPM,
    };

    return (
      <Image
        style={{
          borderColor: '#777879',
          borderWidth: 0.01 * PPM,
          height: tooltip.height * PPM,
          justifyContent: 'flex-end',
          width: tooltip.width * PPM,
        }}
        source={asset(tooltip.source)}>
        {tooltip.attribution &&
          <Text
            style={{
              fontSize: fontSize.attrib,
              right: 0.02 * PPM,
              textAlign: 'right',
              textAlignVertical: 'bottom',
            }}>
            {tooltip.attribution}
          </Text>}
      </Image>
    );
  }
}

class PanelImageTooltip extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const tooltip = this.props.tooltip;
    const PPM = this.props.pixelsPerMeter;
    const fontSize = {
      attrib: 0.05 * PPM,
      text: 0.1 * PPM,
      title: 0.15 * PPM,
    };
    const margin = 0.05 * PPM;
    const titleOpacity = 0.60;

    return (
      <View
        style={{
          borderColor: '#777879',
          borderWidth: 0.01 * PPM,
        }}>
        <Image
          style={{
            height: tooltip.height * PPM,
            width: tooltip.width * PPM,
            justifyContent: 'flex-end',
          }}
          source={asset(tooltip.source)}>

          {tooltip.title &&
            <View>
              <View
                style={{
                  backgroundColor: 'black',
                  // Lower this transparent view so it appears behind the title.
                  bottom: -fontSize.title - margin,
                  height: fontSize.title + margin,
                  opacity: titleOpacity,
                  position: 'relative',
                }}
              />
              <Text
                style={{
                  color: 'white',
                  fontSize: fontSize.title,
                  flex: 1,
                  height: fontSize.title + margin,
                  marginLeft: margin,
                  marginRight: margin,
                  textAlignVertical: 'bottom',
                }}>
                {tooltip.title}
              </Text>
            </View>}
        </Image>

        <View
          style={{
            backgroundColor: 'black',
            // Place attribution in bottom margin.
            paddingBottom: tooltip.attribution ? 0 : margin,
            paddingLeft: margin,
            paddingRight: margin,
            paddingTop: 0,
            width: tooltip.width * PPM,
          }}>
          <Text
            style={{
              color: 'white',
              fontSize: fontSize.text,
              textAlignVertical: 'center',
            }}>
            {tooltip.text}
          </Text>
          {tooltip.attribution &&
            <Text
              style={{
                fontSize: fontSize.attrib,
                right: -margin + 0.02 * PPM,
                textAlign: 'right',
              }}>
              {tooltip.attribution}
            </Text>}
        </View>
      </View>
    );
  }
}

class TextBlockTooltip extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const tooltip = this.props.tooltip;
    const PPM = this.props.pixelsPerMeter;
    const fontSize = {
      attrib: 0.05 * PPM,
      text: 0.1 * PPM,
      title: 0.15 * PPM,
    };

    return (
      <View
        style={{
          backgroundColor: 'black',
          padding: 0.1 * PPM,
        }}>
        <Text
          style={{
            color: 'white',
            fontSize: fontSize.title,
            width: tooltip.width * PPM,
          }}>
          {tooltip.title}
        </Text>
        {tooltip.title &&
          <View
            style={{
              // If we have a title, make thin line to separate title and text.
              backgroundColor: '#777879',
              height: 0.01 * PPM,
              width: tooltip.width * PPM,
            }}
          />}
        <Text
          style={{
            color: 'white',
            fontSize: fontSize.text,
            width: tooltip.width * PPM,
          }}>
          {tooltip.text}
        </Text>
        {tooltip.attribution &&
          <Text
            style={{
              fontSize: fontSize.attrib,
              right: 0.02 * PPM,
              textAlign: 'right',
            }}>
            {tooltip.attribution}
          </Text>}
      </View>
    );
  }
}

class VideoTooltip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerState: new MediaPlayerState({autoPlay: true, muted: true}),
    };
  }

  render() {
    const tooltip = this.props.tooltip;
    const PPM = this.props.pixelsPerMeter;

    return (
      <View>
        <Video
          style={{
            height: tooltip.height * PPM,
            width: tooltip.width * PPM,
          }}
          source={asset(tooltip.source)}
          playerState={this.state.playerState}
        />
        <VideoControl
          style={{
            height: 0.2 * PPM,
            width: tooltip.width * PPM,
          }}
          fontSize={18}
          playerState={this.state.playerState}
        />
      </View>
    );
  }
}

module.exports = Tooltip;
