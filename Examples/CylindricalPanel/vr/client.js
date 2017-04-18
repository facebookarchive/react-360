// Auto-generated content.
import {VRInstance} from 'react-vr-web';

function init(bundle, parent, options) {
  const vr = new VRInstance(bundle, 'CylindricalPanelDemo', parent, {
    // Add custom options here
    ...options,
  });
  vr.render = function() {
    // Any custom behavior you want to perform on each frame goes here
  };
  // Begin the animation loop
  vr.start();
  return vr;
}

window.ReactVR = {init};
