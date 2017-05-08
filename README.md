# React VR [![npm version](https://badge.fury.io/js/react-vr.svg)](https://badge.fury.io/js/react-vr) [![Circle CI](https://circleci.com/gh/facebook/react-vr.svg?style=shield)](https://circleci.com/gh/facebook/react-vr)

React VR is a framework for the creation of VR applications that run in your web browser. It pairs modern APIs like WebGL and WebVR with the declarative power of React, producing experiences that can be consumed through a variety of devices. Leveraging web technologies and the existing React ecosystem, React VR aims to simplify the construction of 360 experiences and democratize the creation of VR content. If you're familiar with React, you can now build in VR – learn once, write anywhere.

## Getting Started

We've designed the React VR developer experience to get your first project up and running in only a few minutes. Before installing the developer tools, you'll need to make sure that you have two prerequisites installed:

- Node.js version 6.0.0 or higher
- `yarn` or `npm` (>= v3.0.0) package managers

Next, install the React VR CLI – a command-line tool that generates the basic layout of new projects.

```
npm install -g react-vr-cli
```

Or

```
yarn global add react-vr-cli
```

You'll only need to install this CLI once. It will alert you when it's out of date, and provide instruction on how to update it.

Once installed, the CLI can be used to create a new project by running

```
react-vr init PROJECT_NAME
```

where `PROJECT_NAME` is the name of your new application. Once it's been created and the dependencies are installed, change your working directory to `PROJECT_NAME`, and start the application server by running `npm start` (or `yarn start`).

When the server has booted, you can access your application by navigating to `http://localhost:8081/vr/` in your web browser. Your application's code can be found in `index.vr.js`, and you can learn more about available framework features by diving into our documentation.

## Will My Web Browser Support My VR Headset?

The WebVR spec is currently in development, and it will be some time before browsers like Chrome, Firefox, and Edge begin supporting it in stable releases. Recent experimental browsers, and some versions of Chrome for Android, have begun to support the spec. You can follow the tables at [https://webvr.rocks](https://webvr.rocks/) to track support for WebVR.

## Getting Help

Please use these community resources for getting help. We use the GitHub issues for tracking bugs and feature requests and have limited bandwidth to address them.

 - Ask a question on [StackOverflow](https://stackoverflow.com) and tag it with `react-vr`
 - Chat with fellow developers on [Reactiflux](https://discord.gg/0ZcbPKXt5bWJVmUY) in `#react-vr`
 - If it turns out that you may have found a bug, please open an issue

## Opening Issues

If you encounter a bug with React VR, let us know. Search the existing issues and try to make sure your problem doesn't already exist before opening a new issue. It's helpful if you include the version of React VR, Browser, and OS you're using. Please include a stack trace and reduced repro case where appropriate.

React VR is open source software, and we welcome contribution from the wider community. If you are able to fix your bug, or find a way to fix another existing issue, we encourage you to submit a PR to address it.

## Contributing

For more information about contributing to React VR, see our [Contributor Guidelines](https://github.com/facebook/react-vr/blob/master/CONTRIBUTING.md).

## License

React VR is [BSD licensed](./LICENSE). We also provide an additional [patent grant](./PATENTS).

React documentation is [Creative Commons licensed](./LICENSE-docs).

Examples provided in this repository and in the documentation are [separately licensed](./LICENSE-examples).
