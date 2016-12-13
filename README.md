# React VR Pre-Release

React VR is a framework for the creation of VR applications that run in your web browser. It pairs modern APIs like WebGL and WebVR with the declarative power of [React](https://facebook.github.io/react), producing experiences that can be consumed through a variety of devices. **Please note that this project is currently an alpha release, and APIs are subject to change.**

There's no code here yet—we're only releasing a very early preview for now—but we want to gather community feedback as soon as possible. In the meantime, we're using the issues tracker on this repository to get your input on bugs and documentation as we prepare for a full release. It may be a bit unorthodox, but we want to get this preview in the hands of developers as soon as possible, and GitHub issues are a great way to collect feedback from the community. On our end, we're actively working to solidify APIs, improve the developer experience, and prepare for external contributions. Our hope is that within a short span of time, we'll have a production-ready product that you can use to deliver VR experiences on the web.

## Getting Started with React VR

The best way to get started is by downloading sample projects and documentation from [Oculus](https://s3.amazonaws.com/static.oculus.com/reactvr/React_VR_Prerelease.zip).

If you already have Node.js (≥4.0) installed, you can also fetch the React VR command line tool from npm:

```
npm install -g react-vr-cli
```

Once this is installed, you can create a new VR project by running

```
react-vr init PROJECT_NAME
```

where `PROJECT_NAME` is the name of your new application. Once it's been created and the dependencies are installed, start the application server by running

```
npm start
```

When the server has booted, you can access your application by navigating to `http://localhost:8081/vr/` in your web browser. Your application's code can be found in `index.vr.js`, and you can learn more about available framework features by diving into our documentation.

## Will My Web Browser Support My VR Headset?

The [WebVR spec](https://w3c.github.io/webvr/) is currently in development, and it will be some time before browsers like Chrome, Firefox, and Edge begin supporting it in stable releases. In the meantime, you can download the [Carmel Developer Preview](https://www.oculus.com/experiences/gear-vr/1290985657630933/) from Oculus on a Samsung device supporting Gear VR or an [experimental build of Chrome or Firefox](https://webvr.info/) on your Windows PC.
