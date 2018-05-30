import {ReactInstance} from 'react-360-web';
import BrowserInfoModule from './BrowserInfoModule';

function init(bundle, parent, options = {}) {
  const r360 = new ReactInstance(bundle, parent, {
    // Add custom options here
    fullScreen: true,
    nativeModules: [
      ctx => new BrowserInfoModule(ctx),
    ],
    ...options,
  });

  r360.renderToSurface(
    r360.createRoot('NativeModulesSample', {}),
    r360.getDefaultSurface(),
  );

  r360.compositor.setBackground('./static_assets/360_world.jpg');
}

window.React360 = {init};
