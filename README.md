# XGL Server

Image compositing for [XGL](https://github.com/djalbat/xgl).

Since [WebGL](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API) supports texture mapping, so does XGL. A drawback of WebGL, however, is that it only allows six textures per shader. One way around this problem is to use multiple shaders, but this can become cumbersome. A better solution is to use image compositing, tiling several textures to produce a [texture atlas](https://en.wikipedia.org/wiki/Texture_atlas), or what is called here an image map. This is what XGL Server does, as well as providing a corresponding JSON representation of the image map that can be used to configure XGL's shaders to extract specific textures.

Because XGL Server depends on [Sharp](http://sharp.pixelplumbing.com/), it runs on the server and not in the browser. So the best way to make image maps and their corresponding JSON representations available to XGL applications running in a browser is by way of a small [Express](https://expressjs.com/) application implementing endpoints for each. This repository includes an example application that does just that, and an explanation is given below.

## Installation

You can clone the repository with [Git](https://git-scm.com/)...

    git clone https://github.com/djalbat/xgl-server.git

...and then install the dependencies with [npm](https://www.npmjs.com/) from within the project's root directory:

    npm install

You will need to do this if you want to look at the example.

## Usage

```
const xglServer = require("xgl-server");

const { imageMapPNG, imageMapJSON } = xglServer;

...
```
Only these two functions are exported. It is recommended that you familiarise yourself with the example application before attempting to make use of them.

There is a small Node.js application which can be run from the root of the repository:

    node ./bin/example/main.js

This provides two endpoints. This endpoint will serve the example image map...

* http://localhost:8888/image-map

...whilst the following endpoint serves a blank HTML file with the corresponding JSON representation embedded within it:

* http://localhost:8888/

Four example images of differing formats can be found in the `image` directory (for technical reasons they are referred to as images rather than textures from now on). You can specify which images make up the image map with a suitable query string for both endpoints. For example:

* http://localhost:8888/imageMap?names=blue.jpg,green.png,red.jpg

If you do not specify any names, all of the images will be used.

Two routes have been set up in the [main.js](https://github.com/djalbat/xgl-server/blob/master/bin/main.js) file in order to provide the aforementioned endpoints, and each makes use of one of the two main functions provided by XGL Server. The blank HTML file is in turn generated from a template HTML file in the repository's `template` directory:

```
<!DOCTYPE html>
<html>
  <head>
  </head>
  <body>
    <script>

      window.__configuration__ = {
        imageMapURI: ${imageMapURI},
        imageMapJSON: ${imageMapJSON}
      };

    </script>
  </body>
</html>
```

Embedding the image map JSON within the HTML in this way will make it available to any JavaScript running in the browser. The following `configuration.js` file is suggested:

```
const configuration = window.__configuration__; ///

export default configuration;
```

Now you can get hold of both the image map URI and JSON thus:

```
import configuration from "./configuration";

const { imageMapURI, imageMapJSON } = configuration;

...
```

If you think this approach is questionable, you could add a route to provide the JSON by way of an Ajax request.

Finally, the signatures of the two main functions that XGL Server provides:

```
function imageMapPNG(names, imageDirectoryPath, overlayImageSize, response) {
  ...
}

function imageMapJSON(names, imageDirectoryPath, overlayImageSize, callback) {
  ...
}
```
Note that the `imageMapPNG(...)` function pipes the image directly to a `response` object rather than returning it via a callback.

For further explanation, see the usage section in the XGL readme.

## Contact

- james.smith@djalbat.com
