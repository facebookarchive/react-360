---
id: setup
title: Setting up Tools, and Creating Your First Project
sidebar_label: Create Your First Project
---

This guide will help you install the tools necessary for creating your first interactive experience with React 360. 

Before getting started, you'll need to install Node.js. While React 360 runs in your web browser, the build pipeline that bundles up your code relies on Node.

 * **Mac:** On Mac, we recommend installing Node.js through [Homebrew](http://brew.sh/).
 * **Windows:** Get the Windows installer from the [nodejs.org download page](https://nodejs.org/en/download/).
 * **Linux:** Go to the [nodejs.org package manager page](https://nodejs.org/en/download/package-manager/) to find specific instructions for your Linux distribution.

Once Node has been installed, you can fetch the **React 360 CLI**, a tool that lets you create and manage your React 360 projects. Open a terminal and run the following command.

```bash
npm install -g react-360-cli
```

This fetches the latest version of the CLI and installs it on your system. After installation, we can use it to generate the initial code for our first project. Start by navigating to a directory where you would like to put your new project, and run the command to create a new project called **Hello360**.

```bash
react-360 init Hello360
```

This creates a new directory called **Hello360**, with all of the files needed to run your project. Enter the directory to view them.

```bash
cd Hello360
```

When we build React 360 applications, we have a number of source code and library files that need to be bundled into a single file for a web browser to load. You may have encountered some of these tools if you're familiar with web development; React 360 ships with its own. [Metro](https://github.com/facebook/metro) is the JS bundler used by projects like React 360 and React Native, and is designed to meet their needs.

During development, the bundler runs a local server that allows you to access your project. It serves up the files for your project, doing any necessary compilation or processing at request time. When you're ready to publish your project, you can instruct the bundler to build production versions of these files, so you can place them on any web server. For now, start the development server with the following command.

```bash
npm start
```

The server will inspect your project and gather all the data it needs to serve up your JavaScript files. To see your project, open your web browser and navigate to http://localhost:8081/index.html. It may take some time to load at first – the bundler is doing some initial crawling of the filesystem. After the first load, successive loads are much faster, even when you change your code. You can watch the progress in the terminal where you started your server, and once the app has loaded you should see something like this in your browser:

![Starter Project](/react-360/img/starter_project.jpg)

