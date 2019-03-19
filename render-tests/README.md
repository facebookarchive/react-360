# WebGL Rendering Tests

These tests launch a headless Chrome instance and execute WebGL tests, manually
testing the output or comparing it to an expected snapshot.

## Setup

To prepare the tests, first install all dependencies and build the test runner.

```
yarn
yarn build
```

Webpack will build a bundle containing the test runner, all tests, and their
dependencies.

Next, you need to run a web server serving files from this root directory.
Ideally, this runs on port `:4444`, but the local hostname + port can be
configured by setting the `RENDER_TEST_HOST` environment variable.

With the server running, execute tests by running

```
yarn test
```
