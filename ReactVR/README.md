# `react-vr-web`

`react-vr-web` is the runtime environment for React VR that allows applications
to render in a web browser. Using the OVRUI library, it renders to a web canvas,
and uses the WebVR API in supporting browsers to communicate with VR headsets.

The runtime contains code for initializing a React application in a Web Worker,
handles asynchronous communication between the window and that application, and
implements the primitives needed to render React VR applications.
