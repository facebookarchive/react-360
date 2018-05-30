# Multi-Root Sample

This example demonstrates how to share data between multiple surfaces and 3D roots
to create a complex application. This particular demo reads the Google Poly (https://poly.google.com/)
API, fetching the top five curated posts so that the user can browse them in VR.

## About the sample

The sample shows how to create an application that includes multiple surfaces.
In this case, there are two Flat Surfaces, and a 3D mount point for the rendered
model. Data is synchronized between all of these with a global store, similar to
Redux. For the sake of simplifying this demo, we implement our own Redux-like
store, but you can import your own favorite data management library into your
own apps.

When the app loads, it goes out to Google Poly and fetches the required data on
the top 5 curated posts. It uses their metadata to render a list that the user
can browse, selecting individual posts to view them. When a post is selected,
its metadata is displayed on the right panel, and the model itself is rendered
in 3D space.

## Running the demo

To use this demo, you'll need your own API Key for Google Poly. Follow
[this guide](https://developers.google.com/poly/develop/api) to acquire one.
Once you have your key, you can add it to the `Store.initialize()` call in
`index.js`. Run your app's server with `npm start`, and load
`http://localhost:8081/` to view it!
