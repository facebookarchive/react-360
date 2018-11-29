// This file contains the boilerplate to execute your React app.
// If you want to modify your application's content, start in "index.js"

import {ReactInstance} from 'react-360-web';
import DashVideoPlayer from './DashVideoPlayer';

function init(bundle, parent, options = {}) {
  const r360 = new ReactInstance(bundle, parent, {
    fullScreen: true,
    customVideoPlayers: [DashVideoPlayer],
    ...options,
  });

  r360.renderToSurface(
    r360.createRoot('CustomPlayerSample', { /* initial props */ }),
    r360.getDefaultSurface()
  );

  r360.compositor.setBackground(r360.getAssetURL('chess-world.jpg'));
}

window.React360 = {init};
