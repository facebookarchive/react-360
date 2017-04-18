// Auto-generated content.
import {VRInstance} from 'react-vr-web';
import {MouseRayCaster} from 'ovrui';
import * as THREE from 'three';

import ThreeDOFRayCaster from '../../inputs/3dof/ThreeDOFRayCaster';

function init(bundle, parent, options) {
  const scene = new THREE.Scene();
  const vr = new VRInstance(bundle, 'ControllerDemo', parent, {
    // Add custom options here
    raycasters: [new ThreeDOFRayCaster(scene), new MouseRayCaster()],
    cursorVisibility: 'auto',
    scene: scene,
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
