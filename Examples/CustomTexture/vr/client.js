import {VRInstance} from 'react-vr-web';

function init(bundle, parent, options) {
  const vr = new VRInstance(bundle, 'CustomTexture', parent, {
    // Add custom options here
    ...options,
  });
  // Create a custom canvas texture we update each frame
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  let last = 0;
  let sum = 0;
  let count = 0;
  const bars = [];
  const cx = canvas.getContext('2d');
  // Register our custom canvas texture
  vr.registerTextureSource('fps', canvas, {updateOnFrame: true}); // Needs an update each frame
  vr.render = function(ms) {
    if (last !== 0) {
      const delta = ms - last;
      // Only update every 30 frames, averaging across those
      if (count < 30) {
        sum += delta;
        count++;
        last = ms;
      } else {
        const fps = count * 1000 / sum;
        sum = 0;
        count = 0;
        bars.push(fps);
        if (bars.length > 32) {
          bars.shift();
        }
        // clear canvas
        canvas.width = 256;
        cx.fillStyle = '#ffffff';
        cx.fillRect(0, 0, 256, 256);
        // draw fps bars
        cx.fillStyle = '#2255ff';
        for (let i = 0; i < bars.length; i++) {
          const height = bars[i] / 60 * 100;
          cx.fillRect(8 * i, 256 - height, 8, height);
        }
        // draw fps rate
        cx.font = '40px Arial';
        cx.fillStyle = '#000000';
        cx.fillText(Math.round(fps), 20, 50);
      }
    }
    last = ms;
  };
  // Begin the animation loop
  vr.start();
  return vr;
}

window.ReactVR = {init};
