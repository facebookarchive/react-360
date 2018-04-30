import {ReactVRInstance} from 'react-vr-web';

function init(bundle, parent, options = {}) {
  const vr = new ReactVRInstance(bundle, parent, {
    fullScreen: true,
    ...options,
  });

  vr.renderToSurface(
    vr.createRoot('SlideshowSample', {
      photos: [
        {uri: './static_assets/360_world.jpg', title: '360 World', format: '2D'},
        // Add your own 180 / 360 photos to this array,
        // with an associated title and format
      ],
    }),
    vr.getDefaultSurface(),
  );
}

window.ReactVR = {init};
