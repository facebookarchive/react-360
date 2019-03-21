/**
 * @providesModule TourTooltip.react
 */
'use strict';

import React from 'react';
import {asset, Text, Image, View, StyleSheet} from 'react-360';
import {VideoPlayer} from 'react-360-common-ui';

const FONT_SIZE_ATTR = 10;
const FONT_SIZE_TEXT = 20;
const FONT_SIZE_TITLE = 30;
const TITLE_OPACITY = 0.6;
const TOOLTIP_MARGIN = 10;
const BORDER_COLOR = '#777879';

class TourTooltip extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {tooltip, visible} = this.props;

    switch (this.props.tooltip.type) {
      case 'image':
        return <ImageTooltip tooltip={tooltip} />;
      case 'panelimage':
        return <PanelImageTooltip tooltip={tooltip} />;
      case 'textblock':
        return <TextBlockTooltip tooltip={tooltip} />;
      case 'video':
        return <VideoTooltip tooltip={tooltip} visible={visible} />;
      default:
        return <Text style={styles.missingTooltip}>Missing Tooltip</Text>;
    }
  }
}

class ImageTooltip extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {tooltip} = this.props;

    return (
      <Image
        style={[
          styles.imageTooltip,
          {height: tooltip.height, width: tooltip.width}
        ]}
        source={asset(tooltip.source)}>
        {tooltip.attribution &&
          <Text
            style={styles.imageTooltipText}>
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
    const {tooltip} = this.props;

    return (
      <View
        style={styles.panelTooltipContainer, {width: tooltip.width}}>
        <Image
          style={[
            styles.panelTooltipImage,
            {height: tooltip.height, width: tooltip.width}
          ]}
          source={asset(tooltip.source)}>
          {tooltip.title &&
            <View>
              <View
                style={styles.panelTooltipTitleContainer}
              />
              <Text
                style={styles.panelTooltipTitleText}>
                {tooltip.title}
              </Text>
            </View>}
        </Image>

        <View
          style={[
            styles.panelTooltipTextContainer,
            {paddingBottom: tooltip.attribution ? 0 : TOOLTIP_MARGIN}
          ]}>
          <Text
            style={styles.panelTooltipText}>
            {tooltip.text}
          </Text>
          {tooltip.attribution &&
            <Text
              style={styles.panelTooltipTextAttr}>
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
    const {tooltip} = this.props;

    return (
      <View
        style={[
          styles.blockTooltipContainer,
          {height: tooltip.height, width: tooltip.width}
        ]}>
        <Text
          style={styles.blockTooltipTitleText}>
          {tooltip.title}
        </Text>
        {tooltip.title &&
          <View
            style={styles.blockTooltipSeparator}
          />}
        <Text
          style={styles.blockTooltipText}>
          {tooltip.text}
        </Text>
        {tooltip.attribution &&
          <Text
            style={styles.blockTooltipTextAttr}>
            {tooltip.attribution}
          </Text>}
      </View>
    );
  }
}

class VideoTooltip extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {tooltip, visible} = this.props;

    return (
      <VideoPlayer
        source={{url: asset(tooltip.source).uri}}
        stereo={'2D'}
        style={{height: tooltip.height, width: tooltip.width}}
        visible={visible}
      />
    );
  }
}

const styles = StyleSheet.create({
  imageTooltip: {
    borderColor: BORDER_COLOR,
    borderWidth: 2,
    justifyContent: 'flex-end',
  },
  imageTooltipText: {
    right: 4,
    textAlign: 'right',
    textAlignVertical: 'bottom',
    fontSize: FONT_SIZE_ATTR,
  },
  panelTooltipContainer: {
    borderColor: BORDER_COLOR,
    borderWidth: 2,
  },
  panelTooltipImage: {
    justifyContent: 'flex-end',
  },
  panelTooltipTitleContainer: {
    backgroundColor: 'black',
    bottom: -FONT_SIZE_TITLE - TOOLTIP_MARGIN,
    height: FONT_SIZE_TITLE + TOOLTIP_MARGIN,
    opacity: TITLE_OPACITY,
  },
  panelTooltipTitleText: {
    color: 'white',
    fontSize: FONT_SIZE_TITLE,
    flex: 1,
    height: FONT_SIZE_TITLE + TOOLTIP_MARGIN,
    marginLeft: TOOLTIP_MARGIN,
    marginRight: TOOLTIP_MARGIN,
    textAlignVertical: 'bottom',
  },
  panelTooltipTextContainer: {
    backgroundColor: 'black',
    paddingLeft: TOOLTIP_MARGIN,
    paddingRight: TOOLTIP_MARGIN,
    paddingTop: 0,
    width: '100%',
  },
  panelTooltipText: {
    color: 'white',
    fontSize: FONT_SIZE_TEXT,
    textAlignVertical: 'center',
  },
  panelTooltipTextAttr: {
    fontSize: FONT_SIZE_ATTR,
    right: -TOOLTIP_MARGIN + 4,
    textAlign: 'right',
  },
  blockTooltipContainer: {
    backgroundColor: 'black',
    padding: 2,
  },
  blockTooltipTitleText: {
    color: 'white',
    fontSize: FONT_SIZE_TITLE,
    width: '100%',
  },
  blockTooltipSeparator: {
    backgroundColor: BORDER_COLOR,
    height: 2,
    width: '100%',
  },
  blockTooltipText: {
    color: 'white',
    fontSize: FONT_SIZE_TEXT,
    width: '100%',
  },
  blockTooltipTextAttr: {
    fontSize: FONT_SIZE_ATTR,
    right: 4,
    textAlign: 'right',
  },
  missingTooltip: {
    backgroundColor: 'red'
  },
});

module.exports = TourTooltip;
