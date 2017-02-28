# React VR Pre-Release

React VR is a framework for the creation of VR applications that run in your web browser. It pairs modern APIs like WebGL and WebVR with the declarative power of [React](https://facebook.github.io/react), producing experiences that can be consumed through a variety of devices. **Please note that this project is currently an alpha release, and APIs are subject to change.**

> There's no code here yet—we're only releasing a very early preview for now—but we want to gather community feedback as soon as possible.  We're actively working to solidify APIs and prepare for external contributions prior to open-sourcing.

## Prerequisites

You must have [npm](https://www.npmjs.com/) installed and the version must be `3.0` or above.

You can check your npm version by running:

```
npm -v
```

If your version number is less than `3.0`, you can update by running:

```
npm update npm -g
```

## Getting Started with React VR

### Samples

To get started, download the [React VR Prerelease.zip](https://s3.amazonaws.com/static.oculus.com/reactvr/React_VR_Prerelease.zip) from Oculus. It contains sample projects, documentation, and a `package.json` config file for fetching React VR from npm, just navigate to the root folder of the package on your file system and run

```
npm install
```

When completed you can start the server to view the content

```
npm start
```

Now point your browser at `http://localhost:8081/Samples/`

Once you have finished exploring the samples it is time to create your first project. First stop your packager and then navigate to a folder outside of preview under which you will place your project.

### Your first project

You must now install the react-vr-cli

```
npm install -g react-vr-cli
```

Once installed, use the cli to create a new VR project by running

```
react-vr init PROJECT_NAME
```

where `PROJECT_NAME` is the name of your new application. Once it's been created and the dependencies are installed, change your working directory to `PROJECT_NAME` and start the application server by running

```
npm start
```

When the server has booted, you can access your application by navigating to `http://localhost:8081/vr/` in your web browser. Your application's code can be found in `index.vr.js`, and you can learn more about available framework features by diving into our [documentation](https://facebookincubator.github.io/react-vr/).

## Opening Issues

If you encounter a bug with React VR we would like to hear about it. Search the [existing issues](https://github.com/facebookincubator/react-vr/issues) and try to make sure your problem doesn’t already exist before opening a new issue.  It’s helpful if you include the version of React VR, Browser, and OS you’re using. Please include a stack trace and reduced repro case when appropriate.

## Will My Web Browser Support My VR Headset?

The [WebVR spec](https://w3c.github.io/webvr/) is currently in development, and it will be some time before browsers like Chrome, Firefox, and Edge begin supporting it in stable releases. In the meantime, you can download the [Carmel Developer Preview](https://www.oculus.com/experiences/gear-vr/1290985657630933/) from Oculus on a Samsung device supporting Gear VR or an [experimental build of Chrome or Firefox](https://webvr.info/) on your Windows PC.
