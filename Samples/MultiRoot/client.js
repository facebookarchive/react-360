import {ReactVRInstance, Location, Surface} from 'react-vr-web';

function init(bundle, parent, options = {}) {
  const vr = new ReactVRInstance(bundle, parent, {
    fullScreen: true,
    ...options,
  });

  // Create three roots: two flat panels on the left and the right, and a Location
  // to mount rendered models in 3D space
  const leftPanel = new Surface(300, 600, Surface.SurfaceShape.Flat);
  leftPanel.setAngle(-0.6, 0);
  const rightPanel = new Surface(300, 600, Surface.SurfaceShape.Flat);
  rightPanel.setAngle(0.6, 0);
  vr.renderToSurface(
    vr.createRoot('TopPosts'),
    leftPanel,
  );
  vr.renderToSurface(
    vr.createRoot('CurrentPost'),
    rightPanel,
  );
  vr.renderToLocation(
    vr.createRoot('ModelView'),
    new Location([0, -2, -10]),
  );

  vr.compositor.setBackground('./static_assets/360_world.jpg');
}

window.ReactVR = {init};
