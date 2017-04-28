  var orderBasics = [
    'GettingStarted.md', //basics
    'Tutorial.md', //basics
    'ProjectConfiguration.md', //basics
    'Publishing.md',
    'ReactVROverview.md', //basics
    'ComponentsPropsAndState.md', //basics
    'LayoutAndStyle.md', //basics
    '3DCoordinatesAndTransforms.md', //basics
    'Input.md',
    'Fonts.md',
    'VRBrowsers.md', //basics
    'DevTools.md', //basics
    'ReleaseChangeLog.md'
    ];
  var orderGuides = [
    'Animations.md', //guides
    'Colors.md', //guides
    'Debugging.md', //guides
    'Images.md', //guides
    'Timers.md', //guides
    'NativeModules.md',
    'PlatformSpecificInformation.md', //guides
    'VideoPlayer.md', //guides
    ];
  var markdownOrder = orderBasics.concat(orderGuides);

  function findCategory(file) {
    for (var i=0; i<orderBasics.length; i++) {
      if (orderBasics[i] === file) {
        return 'The Basics';
      }
    }
    return 'Guides';
  }

  function findIndex(file) {
    for (var i=0; i<markdownOrder.length; i++) {
      if (markdownOrder[i] === file) {
        return i;
      }
    }
    return -1;
  }

  module.exports = {
    markdownOrder : markdownOrder,
    findCategory : findCategory,
    findIndex : findIndex
  };
