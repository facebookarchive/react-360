import {ReactVRInstance} from 'react-vr-web';
import BrowserInfoModule from './BrowserInfoModule';

function init(bundle, parent, options = {}) {
  const vr = new ReactVRInstance(bundle, parent, {
    // Add custom options here
    fullScreen: true,
    nativeModules: [
      ctx => new BrowserInfoModule(ctx),
    ],
    ...options,
  });

  vr.renderToSurface(
    vr.createRoot('NativeModulesSample', {}),
    vr.getDefaultSurface(),
  );

  vr.compositor.setBackground('./static_assets/360_world.jpg');
}

window.ReactVR = {init};
