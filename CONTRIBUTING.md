# Contributing to React 360

React 360 is actively being developed by Oculus and Facebook, and is used to power a growing number of internal and external applications. We've put together this document to help make the public contribution process clearer and answer any questions you may have.

## Code of Conduct

Facebook has adopted a Code of Conduct that we expect project participants to adhere to. Please [read the full text](https://code.facebook.com/pages/876921332402685/open-source-code-of-conduct) so that you can understand what actions will and will not be tolerated.

## Pull Requests

Our core team will be monitoring for pull requests. New pull requests will automatically run against our continuous integration suite, which should detect the majority of formatting and testing issues. After this, one of our team members will run some Facebook-specific integration tests on it, to make sure it doesn't break any of our applications. Once that has completed, one member of the team will sign off on the changes and merge the pull request. Any API changes might require us to fix internal uses, which could cause some delay. We'll do our best to provide updates and feedback in a timely manner throughout the process.

Before submitting a pull request, please make sure you have done the following:

1. Fork the repository and fork your working branch from master
2. Describe your test plan in your Pull Request
    - If you've added new features, cover them with tests
    - If you've changed APIs, update the appropriate documentation
3. Ensure all test suites pass (`npm test`)
4. Ensure the linter doesn't return any errors (`npm run lint`)
5. Ensure that Flow typechecking is sound (`npm run flow`)
6. Make sure you've completed the CLA.

## Copyright Notice for Files

Copy and paste this to the top of your new files:

```
/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant * of patent rights can be found in the PATENTS file in the same directory.
 */
```

## Contributor License Agreement (CLA)

In order to accept your pull request, we need you to submit a CLA. You only need to do this once, so if you've done this for another Facebook open source project, you're good to go. If you are submitting a pull request for the first time, just let us know that you have completed the CLA and we can cross-check with your GitHub username.

[Complete your CLA here](https://code.facebook.com/cla)

## License

By contributing to React, you agree that your contributions will be licensed under its BSD license.
