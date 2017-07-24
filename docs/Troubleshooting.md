---
id: troubleshooting
title: Troubleshooting
layout: docs
category: Quick Start
permalink: docs/troubleshooting.html
---

These are some common issues you might encounter setting up React Native. If you encounter something not listed here, try [searching for the issue in GitHub](https://github.com/facebook/react-vr/issues/).

### Port already in use

The React Native packager runs on port 8081. If another process is already using that port (such as McAfee Antivirus on Windows), you can either terminate that process, or change the port that the packager uses.

####Terminating a process on port 8081

On macOS:
1. Run the following command to find the id of the process listening on port 8081:
        $ sudo lsof -n -i4TCP:8081 | grep LISTEN`

1. Then run the following to terminate the process, where <PID> is the process id:
        $ kill -9 <PID>`

On Windows:
You can find the process that is using port 8081 in the [Resource Monitor](https://stackoverflow.com/questions/48198/how-can-you-find-out-which-process-is-listening-on-a-port-on-windows) and then stop it using Task Manager.

### NPM locking error

If you encounter an error such as "npm WARN locking Error: EACCES" while using the React Native CLI, try running the following:

```
sudo chown -R $USER ~/.npm
sudo chown -R $USER /usr/local/lib/node_modules
```
