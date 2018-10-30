import {
  View,
  Text,
  RawText,
  Image,
  SDFTextImplementation,
  TextureManager,
  restack,
  setStyle,
} from 'webgl-ui';
import * as THREE from 'three';

const textImpl = new SDFTextImplementation();
const textureManager = new TextureManager();

const rootView = new View();
const scene = new THREE.Scene();
scene.add(rootView.view.getNode());

// Camera should be set up according to your desired output size
const panelWidth = 600;
const panelHeight = 400;
const camera = new THREE.OrthographicCamera(0, panelWidth, 0, panelHeight, -1000, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(panelWidth, panelHeight, true);

const rootView = new View();
setStyle(rootView, {
  // ...
});
const scene = new THREE.Scene();
scene.add(rootView.view.getNode());

// run each frame
function frame() {
  // Update the geometry of any view that was resized
  rootView.updateLayoutAndGeometry();
  restack(rootView);

  // render scene to a canvas or render target using the orthographic camera
  renderer.render(scene, camera);
  // schedule next frame
  requestAnimationFrame(frame);
}

// initialize your UI by constructing nodes and adding them to the rootView
// ...

// and run
document.body.appendChild(renderer.domElement);
requestAnimationFrame(frame);
