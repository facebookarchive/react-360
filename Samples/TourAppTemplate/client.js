// This file contains the boilerplate to execute your React app.
// If you want to modify your application's content, start in "index.js"

import {ReactInstance} from 'react-360-web';
import RCTWorkInProgressSurface from './RCTWorkInProgressSurface'

function init(bundle, parent, options = {}) {

  // initialise instant game
  if (FBInstant) {
    FBInstant.initializeAsync()
    .then(function() {
      FBInstant.setLoadingProgress(100);
      FBInstant.startGameAsync();
    });
  }

  const r360 = new ReactInstance(bundle, parent, {
    // Add custom options here
    fullScreen: true,
    customViews: [
      {
        // Add custom native view "RCTSurface" to support surface control
        name: 'RCTWorkInProgressSurface',
        view: RCTWorkInProgressSurface,
      },
    ],
    ...options,
  });

  RCTWorkInProgressSurface.__reactInstance = r360;

  // Render your app content to the default cylinder surface
  r360.renderToSurface(
    r360.createRoot('TourAppTemplate', { /* initial props */ }),
    r360.getDefaultSurface()
  );
}

window.React360 = {init};
