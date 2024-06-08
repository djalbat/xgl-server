# XGL Server

Image compositing for [XGL](https://github.com/djalbat/xgl).

## Contents

* [Introduction](#introduction)
* [Installation](#installation)
* [Acknowledgements](#acknowledgements)

## Introduction

[WebGL](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API) supports texture mapping, but a drawback is that it only allows six textures per shader. One way around this problem is to use multiple shaders, but this can become cumbersome. A better solution is to use image compositing, tiling several textures to produce what is called [texture atlas](https://en.wikipedia.org/wiki/Texture_atlas) or image map. This is what XGL Server does, as well as providing a corresponding JSON representation of the image map that can be used to configure XGL's shaders to extract specific textures.

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

* http://localhost:8888/image-map?names=blue.jpg,green.png,red.jpg

If you do not specify any names, all of the images will be used.

Two routes have been set up in order to provide the aforementioned endpoints, and each makes use of one of the two main functions provided by XGL Server. The blank HTML file is in turn generated from a template HTML file in the repository's `template` directory:

```
<!DOCTYPE html>
<html>
  <head>
  </head>
  <body>
    <script>

      var imageMapJSON = ${imageMapJSON};

    </script>
  </body>
</html>
```

Embedding the image map JSON within the HTML in this way will make it available to any JavaScript running in the browser.
Specifically, if you want to get hold of the `imageMapJSON` variable then you can destructure the `globalThis` object:

```
const { imageMapJSON } = globalThis;
```

Finally, here are the signatures of the two main functions that XGL Server provides:

```
function imageMapPNG(names, imageDirectoryPath, overlayImageSize, response) {
  ...
}

function imageMapJSON(names, imageDirectoryPath, overlayImageSize, callback) {
  ...
}
```

Note that the `imageMapPNG(...)` function pipes the image directly to a `response` object rather than returning it via a callback.

For further explanation, see the preload utilities section in the XGL readme file.

## Contact

* james.smith@djalbat.com
