// This file contains the boilerplate to execute your React app.
// If you want to modify your application's content, start in "index.js"

import {ReactInstance, loadFont, addFontFallback} from 'react-360-web';

const fallbackFonts = {
  './static_assets/fonts/cjk_0.fnt': './static_assets/fonts/cjk_0_sdf.png',
  './static_assets/fonts/cjk_1.fnt': './static_assets/fonts/cjk_1_sdf.png',
  './static_assets/fonts/cjk_2.fnt': './static_assets/fonts/cjk_2_sdf.png'
};
var font = loadFont();
var count = 0;
const fontSource=[
  {fnt:'./static_assets/fonts/cjk_0.fnt',png:'./static_assets/fonts/cjk_0_sdf.png'},
  {fnt:'./static_assets/fonts/cjk_1.fnt',png:'./static_assets/fonts/cjk_1_sdf.png'},
  {fnt:'./static_assets/fonts/cjk_2.fnt',png:'./static_assets/fonts/cjk_2_sdf.png'},
]
// function init(bundle, parent, options = {}) {
//   function addFallback(fallbackFont){
//     addFontFallback(font,fallbackFont);
//     count--;
//     if(count === 0){
//       const r360 = new ReactInstance(bundle, parent, {
//         // Add custom options here
//         font:font,
//         fullScreen: true,
//         ...options,
//       });
    
//       // Render your app content to the default cylinder surface
//       r360.renderToSurface(
//         r360.createRoot('Language', { /* initial props */ }),
//         r360.getDefaultSurface()
//       );
    
//       // Load the initial environment
//       r360.compositor.setBackground(r360.getAssetURL('360_world.jpg'));
//     }
//   }

//   for (var key in fallbackFonts) {
//     count++;
//     loadFont(key, fallbackFonts[key])
//       .then((fallbackFont) => {
//         addFallback(fallbackFont);
//       });
//   }

// }
function init(bundle,parent,options={}){
  Promise.all([
    loadFont(fontSource[0].fnt,fontSource[0].png),
    loadFont(fontSource[1].fnt,fontSource[1].png),
    loadFont(fontSource[2].fnt,fontSource[2].png),
  ]).then(([lobsterFont,fontAwesome])=>{
    addFontFallback(lobsterFont,fontAwesome)

    const r360 = new ReactInstance(bundle,parent,{
      font: lobsterFont,
      fullScreen:true,
      ...options
    })
    r360.renderToSurface(
      r360.createRoot('Language',{}),
      r360.getDefaultSurface()
    )
    r360.compositor.setBackground(r360.getAssetURL('360_world.jpg'))
  })

}

window.React360 = {init};
