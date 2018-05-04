# `react-360-web`

`react-360-web` is the runtime environment for React 360 that allows applications
to render in a web browser. It renders to a web canvas, and uses the WebVR API
in supporting browsers to communicate with VR headsets.

The runtime contains code for initializing a React application in a Web Worker,
handles asynchronous communication between the window and that application, and
implements the primitives needed to render React 360 applications.
