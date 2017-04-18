---
id: troubleshooting
title: Troubleshooting
layout: docs
category: Quick Start
permalink: docs/troubleshooting.html
---

These are some common issues you may run into while setting up React Native. If you encounter something that is not listed here, try [searching for the issue in GitHub](https://github.com/facebook/react-vr/issues/).

### Port already in use

The React Native packager runs on port 8081. If another process is already using that port (such as McAfee Antivirus on Windows), you can either terminate that process, or change the port that the packager uses.

#### Terminating a process on port 8081

Run the following command on a Mac to find the id for the process that is listening on port 8081:

`$ sudo lsof -n -i4TCP:8081 | grep LISTEN`

Then run the following to terminate the process:

`$ kill -9 <PID>`

On Windows you can find the process using port 8081 using [Resource Monitor](https://stackoverflow.com/questions/48198/how-can-you-find-out-which-process-is-listening-on-a-port-on-windows) and stop it using Task Manager.

### NPM locking error

If you encounter an error such as "npm WARN locking Error: EACCES" while using the React Native CLI, try running the following:

```
sudo chown -R $USER ~/.npm
sudo chown -R $USER /usr/local/lib/node_modules
```

