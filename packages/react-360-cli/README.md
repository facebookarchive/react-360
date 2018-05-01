# React 360 CLI

React 360 is distributed as two packages, `react-360` and `react-360-cli`. The
first one contains all of the code necessary to build interactive 360 applications,
and is installed as part of your project's dependencies. This directory contains
the code for the second one: a command-line tool that should be installed
globally (`npm install -g react-360-cli`) and which allows you to quickly
initialize React 360 projects.

## Using the CLI

Once the CLI has been globally installed, you can use it to generate new
projects. Running the command:

```
react-360 init MyProject
```

will create a new project directory called `MyProject`. It will create all of
the files necessary to get started with React 360, and will automatically run
`npm install` to fetch your project's dependencies.

Once a project has been generated, you can run `npm start` to launch the
packager and begin running your application.

## Generators

The React 360 CLI creates the starter project based upon the files found in the
`generators` directory. These are very simple JavaScript modules that produce
files from string templates. Configuration variables can be passed from the CLI
to these generators, which return an object containing two keys: `filename` and
`content`. Together, these are used to create a file at the generator's relative
location. For example, a generator located in `generators/subdir` will produce a
file in `$PROJECT_DIRECTORY/subdir/`.
