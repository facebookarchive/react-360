---
id: example-multisurface
title: Example: Multi-Surface and 3D
sidebar_label: Multi-Surface and 3D
---

A demonstration of how to build React 360 applications that share code across multiple 2D panels and 3D roots. It combines fetching from the Google Poly API with a demonstration of basic 3D rendering.

![Multi-Surface Example](/react-360/img/example_multisurface.jpg)

## Exploring the Sample

The code for this sample is found [here](https://github.com/facebook/react-360/tree/master/Samples/MultiRoot). To test it out for yourself, create a new project with the React 360 CLI, and copy over the files from the repository into your project directory. Before going further, you will need your own API Key to access Google's Poly API – a service for sharing 3D models. Acquiring these credentials is covered [in this Google documentation](https://developers.google.com/poly/develop/api). Once you have your API Key, copy it into `index.js`, within the `Store.initialize()` call. Next, start up the server and load http://localhost:8081/index.html. You should see two panels in space which quickly initialize with data from some of the top curated Google Poly posts. This data changes constantly, so you will see different results at different times.

When you click an entry in the left-hand panel, it should show its title, author, and description on the right side. React 360 will reach out to Google's servers and download a copy of the 3D model as well, displaying it in the center and rotating it so you can see it from all sides.

**NOTE:** because you are pulling in data from an external source API, there are no guarantees about the files your app pulls in. They may be scaled too large or small, or may be improperly formatted. The purpose of this simple example is to show how to share data across 2D and 3D surfaces, but it may not account for all the validation a real application might want to perform.

## The Code

The code for this application is composed of four parts: two React components that render the left and right panels, a React component that fetches and displays the 3D model, and a global data store that synchronizes all of the components. In a real application, you'd want to use a proven global store like Redux, but for the sake of simplifying this example, we've implemented a trivial version of a Redux-like API. Our store contains a list of data from the top curated Poly posts, as well as the currently-viewed index. This allows us to synchronize data across all of our React roots.

The placement of these different components is handled in `client.js`. It creates the two panels for the left and right sides, as well as a location for the 3D models, and then mounts all React nodes into the scene.

The left panel renders the list of posts once they are available. When the user clicks a post, it updates the store's field containing the current index. This update then causes the other two React roots to update, reflecting the information from the post the user has just selected.
