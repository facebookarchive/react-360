## Equirect2cubemap Tool

This tool converts equirectangular images to cube map format. If you want to learn more about cube mapping, Wikipedia has a good starting point [here](https://en.wikipedia.org/wiki/Cube_mapping).

### Requirements

To be able to get and run this tool you will need cmake installed and available in your CLI's path.

### Building the binary

1. Clone repo.
2. From your terminal:
  1. `cd` to this directory, where the eq2cm source code is
  2. Run `cmake .`
  3. Run `make`

If all steps were completed successfully, there should be an `eq2cm` binary ready for you to use.

### Usage

Running `./eq2cm` on your CLI will display the following:

```
eq2cm: Equirect to CubeMap conversion
usage:
eq2cm <eqr-image> <bbc-edge-length> <cm-basename>
```

As seen above, there are three arguments that need to be provided to the tool, these are:

| Arg name| Description | Required? |
|---|---|---|
| eqr-image | Source image to be converted to cubemap format. | Y |
| bbc-edge-length | Size of the cubemap edges. For example, a value of 1536 will lead to each of the six faces of the cube being 1536 by 1536 pixels. | Y |
| cm-basename | Base name to use for output files. See `Output` section for more details. | Y |

#### A note on cubemap edge length:
If unsure about what size to use for cube map edge size, at the time of writing we recommend it to be around 1536 for most content as a starting point. For big sized equirectangular images (>10k), reducing the quality to ~10k and converting will help prefilter the content and reduce aliasing.

That said, edge sizes for cubemaps are somewhat related to the display size. Ignoring download concerns, they need to be large enough so that quality is as high as possible, but not too large that the texture aliases, i.e. the device skips rendering pixels as the head rotates around.

### Output

Let's take the following usage example:

```
./eq2cm input.jpg 1536 output
```

The tool will transform the equirectangular `input.jpg` file and output 6 files to the current working directory, one per face of the cube, named:

```
- output0.png // for Positive X (+X) face
- output1.png // for Negative X (-X) face
- output2.png // for Positive Y (+Y) face
- output3.png // for Negative Y (-Y) face
- output4.png // for Positive Z (+Z) face
- output5.png // for Negative Z (-Z) face
```

#### A note on output format:

Generated cubemap images are in **png** format, to leave compression at the user's discretion. We recommend looking into compressing these to **jpeg** format prior to consumption, and find the right quality/size tradeoff for your app.

### Integrating cubemaps into your React VR app

Once your cubemaps are ready to be integrated to the app, check the documentation on [Pano](https://facebook.github.io/react-vr/docs/pano.html#source) for how to do so.
