# `TourAppTemplate`

`TourAppTemplate` is a sample app code template for a tour like app with React360.
There're also inline comments to guide, how each part of the sample code works.
This Template includes:
- Basic UI and interactions and Animations
- Loading Data via network
- Display 360 scenes and hotspots
This sample is designed for use in Facebook Instant Games using the [Instant Games SDK](https://developers.facebook.com/docs/games/instant-games)."

`TourAppTemplate` provides two examples of ways to place hotspots, which you can switch by settings 
`useDynamicSurface` to true/false in `insdex.html`
1. Uses dynamic surface: (`useDynamicSurface = true`):
   - This is recommended for most cases, it has less limitations and allows us to place hotspots on any positions(e.g. on the top or bottom). From performance wise, less than 8 hotspots per scene should work fine on mobile devices.
   - Each hotspots will be rendered on a different surface, and surface will be place on the right position dynamically by the hotspot settings.
   - You don't need to care about the creating, destroying, placing the surface. TourHotspot uses a custom native view "WorkInProgressSurface", which allows you to create and rotate a surface from react's side by using this view.
   - "RCTWorkInProgressSurface" provides a custom native view to create a surface and place it in 3D space from react side.
2. Use one cylinder surface: (`useDynamicSurface = false`)
   - If all of your hotspots are in the place, that a cylinder surface can cover. Then you want a simpler layout logic of hotspots that just maps positions from 2D space of cylinder layer to the world. You can try/implement this method.
   - It has two limitations: 
    1. You can't place a hotspot outside of the edge of the cylinder surface, otherwise it will be cropped. 
    2. There's an edge of cylinder surface on the back, if a hotspot is placed across the edge, it will also get cropped. (This is template solves this by placing tooltip of a hotspot on the left if it's close to right edge).
   - It uses the translation on X direction on cylinder layer space to map hotspots' rotation to 3D space.
   - If you want to go with this way, you can remove the `RCTWorkInProgressSurface` and `WorkInProgressSurface` related codes-snipptes.


