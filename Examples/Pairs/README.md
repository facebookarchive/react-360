# pairs

A real-time, multiplayer virtual reality matching pairs game built with
[ReactVR](https://facebookincubator.github.io/react-vr/),
[Redux](http://redux.js.org/) and
[websockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API).

To play pairs on your local host:

1. Run ```npm run-script relay``` to start a wsrelay websocket relay server.
2. Run ```npm start``` in a second shell to serve the ReactVR application.
3. Open ```http://localhost:8081/Examples/Pairs/vr/``` in multiple web browsers to play pairs.

To play pairs over the internet:

1. Run ```npm run-script relay``` to start a wsrelay websocket relay server.
2. Run ```ngrok http 4000``` to create an [ngrok](https://ngrok.com/) tunnel to your relay server.
3. Run ```npm start``` in a shell on each machine to serve the ReactVR application.
4. Open ```http://localhost:8081/Examples/Pairs/vr/#ws://...ngrok.io``` in a web browser on each machine (set the hash fragment to the forwarding address from ngrok) to play pairs.
