import {Math as VRMath, ReactInstance, Surface} from 'react-360-web';

function init(bundle, parent, options = {}) {
  const horizontalPanel = new Surface(300, 300, Surface.SurfaceShape.Flat);
  const hvPanel = new Surface(300, 300, Surface.SurfaceShape.Flat);

  horizontalPanel.setAngle(0, -0.5);

  const cameraDirection = [0, 0, -1];

  const r360 = new ReactInstance(bundle, parent, {
    fullScreen: true,
    frame: () => {
      const cameraQuat = r360.getCameraQuaternion();
      cameraDirection[0] = 0;
      cameraDirection[1] = 0;
      cameraDirection[2] = -1;
      // cameraDirection will point out from the view of the camera,
      // we can use it to compute surface angles
      VRMath.rotateByQuaternion(cameraDirection, cameraQuat);
      const cx = cameraDirection[0];
      const cy = cameraDirection[1];
      const cz = cameraDirection[2];
      const horizAngle = Math.atan2(cx, -cz);
      const vertAngle = Math.asin(cy / Math.sqrt(cx * cx + cy * cy + cz * cz));
      horizontalPanel.setAngle(horizAngle, -0.5);
      hvPanel.setAngle(horizAngle, vertAngle);
    },
    ...options,
  });

  r360.renderToSurface(r360.createRoot('HorizontalPanel'), horizontalPanel);
  r360.renderToSurface(r360.createRoot('HVPanel'), hvPanel);

  r360.compositor.setBackground('./static_assets/360_world.jpg');
}

window.React360 = {init};
