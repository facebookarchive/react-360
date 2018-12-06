// This file contains the boilerplate to execute your React app.
// If you want to modify your application's content, start in "index.js"

import {ReactInstance, Surface} from 'react-360-web';

function init(bundle, parent, options = {}) {

  // initialise instant game
  if (FBInstant) {
    FBInstant.initializeAsync()
    .then(function() {
      FBInstant.setLoadingProgress(100);
      FBInstant.startGameAsync();
    });
  }

  const subtitleSurface = new Surface(600, 800, Surface.SurfaceShape.Flat);
  subtitleSurface.setRadius(6);
  const r360 = new ReactInstance(bundle, parent, {
    // Add custom options here
    fullScreen: true,
    frame: () => {
      // This will makes the subtitle surface always in front of user
      // Please be careful about the design of any this kind of HMD-like surface.
      // It will be really hard to view and interact with the content in VR
      // if it's placed in a corner position.
      const cameraQuat = r360.getCameraQuaternion();
      subtitleSurface.recenter(cameraQuat, 'all');
    },
    ...options,
  });

  // Render your app content to the default cylinder surface
  r360.renderToSurface(
    r360.createRoot('MediaAppTemplate', { /* initial props */ }),
    r360.getDefaultSurface()
  );

  // Render the subtitle content to a flat surface
  r360.renderToSurface(
    r360.createRoot('MediaAppTemplateSubtitle', { /* initial props */ }),
    subtitleSurface,
  );
}

window.React360 = {init};
