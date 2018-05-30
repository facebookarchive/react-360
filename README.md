# React 360 [![npm version](https://badge.fury.io/js/react-360.svg)](https://badge.fury.io/js/react-360) [![Circle CI](https://circleci.com/gh/facebook/react-360.svg?style=shield)](https://circleci.com/gh/facebook/react-360)

React 360 is a framework for the creation of interactive 360 experiences that run in your web browser. It pairs modern APIs like WebGL and WebVR with the declarative power of React, producing applications that can be consumed through a variety of devices. Leveraging web technologies and the existing React ecosystem, React 360 aims to simplify the construction of cross-platform 360 experiences.

## Getting Started

We've designed the React 360 developer experience to get your first project up and running in only a few minutes. Before installing the developer tools, you'll need to make sure that you have two prerequisites installed:

- Node.js version 6.0.0 or higher
- `yarn` or `npm` (>= v3.0.0) package managers

Next, install the React 360 CLI – a command-line tool that generates the basic layout of new projects.

```
npm install -g react-360-cli
```

Or

```
yarn global add react-360-cli
```

You'll only need to install this CLI once. It will alert you when it's out of date, and provide instruction on how to update it.

Once installed, the CLI can be used to create a new project by running

```
react-360 init PROJECT_NAME
```

where `PROJECT_NAME` is the name of your new application. Once it's been created and the dependencies are installed, change your working directory to `PROJECT_NAME`, and start the application server by running `npm start` (or `yarn start`).

When the server has booted, you can access your application by navigating to `http://localhost:8081/` in your web browser. Your application's code can be found in `index.js`, and you can learn more about available framework features by diving into our documentation.

## Opening Issues

If you encounter a bug with React 360, let us know. Search the existing issues and try to make sure your problem doesn't already exist before opening a new issue. It's helpful if you include the version of React 360, Browser, and OS you're using. Please include a stack trace and reduced repro case where appropriate.

React 360 is open source software, and we welcome contribution from the wider community. If you are able to fix your bug, or find a way to fix another existing issue, we encourage you to submit a PR to address it.

If you find a documentation typo, please don't file an issue – just create a pull request containing the fix and we will pull it into the documentation.

## Contributing

For more information about contributing to React 360, see our [Contributor Guidelines](https://github.com/facebook/react-360/blob/master/CONTRIBUTING.md).

## License

React 360 is [BSD licensed](./LICENSE). We also provide an additional [patent grant](./PATENTS).

React documentation is [Creative Commons licensed](./LICENSE-docs).

Examples provided in this repository and in the documentation are [separately licensed](./LICENSE-examples).
