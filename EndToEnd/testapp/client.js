import {VRInstance} from 'react-vr-web';

function init(bundle, parent, options) {
  const vr = new VRInstance(bundle, 'End2End', parent, {
    ...options,
  });
  vr.render = function() {};
  // Begin the animation loop
  vr.start();
  window.vr = vr;
  return vr;
}

window.ReactVR = {init};
