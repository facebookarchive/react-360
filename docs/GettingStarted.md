---
id: quick-start-getting-started
title: Getting Started
layout: docs
category: The Basics
permalink: docs/getting-started.html
next: tutorial
---

Before starting your first React VR project, you have to install the dependencies used to build and manage React VR apps: **Node.js** and the **React VR CLI**.

####Installing Node.js

If you already have Node.js installed, make sure it is at least version 4.0.

* **Mac**: On Mac, we recommend installing Node.js through [Homebrew](http://brew.sh/).

* **Windows**: Get the Windows installer from the [nodejs.org download page](https://nodejs.org/en/download/).

* **Linux**: Go to the [nodejs.org package manager page](https://nodejs.org/en/download/package-manager/) to find specific instructions for your Linux distribution.

#### Creating your first project

We can use the React VR command line interface tool to generate a new project called “WelcomeToVR.” The tool creates a new folder containing the skeleton for a React VR project and fetches all the necessary external dependencies.

1. If you are still running **npm** in your terminal window, press `CTRL+C` to stop it.

1. Navigate to a directory where you want to put your new project.

1. Install the React VR CLI tool. Enter:
        npm install -g react-vr-cli

1. Use the React VR CLI tool to create a new application under a `WelcomeToVR` folder and install the required dependencies. Enter:
        react-vr init WelcomeToVR

1. Change directory to your new **WelcomeToVR** project directory.
        cd WelcomeToVR

1. Use the start command to initialize your local development server. Enter:
        npm start

1. Open your browser to http://localhost:8081/vr/index.html. You should see something similar to the following: ![](img/hellovr.jpg)

#### Hello!
Click and drag around the world in your browser or open it up on your mobile device to see more.

If you're using a web browser that supports WebVR such as [Oculus Browser](https://www.oculus.com/experiences/gear-vr/1257988667656584/), you should be able to put on your headset and explore the world in full VR. For more information on VR capable browsers, see the [VR Browsers](docs/vrbrowsers.html) topic.

Our next topic explores the code that brings this scene to life.
