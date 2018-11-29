# `CustomPlayerSample`

`CustomPlayerSample` is a sample code for using custom video player with `react-360`
Generally what you need to is simply
- Write a custom video player implement VideoPlayerImplementaion, you can simply extend `BrowserVideoPlayer` to reuse most of the video control codes. `DashVideoPlayer` in the sample is simple example.
- Add your custom video players as `customVideoPlayers` option when initializing ReactInstance.
- The Video module is react-360 will choose in the order of custom players to find the first player that supports the fileFormat of video source.

The dash video assets is large so we don't include it in github, to try out this sample, please download it from https://www.dropbox.com/s/4h5iuryd3myfha8/asset.tar.gz?dl=1 and extract to `static_assets/` folder
 