# Jiggles

Image compositing for [Jiggle](https://github.com/djalbat/Jiggle).

Since [WebGL](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API) supports image mapping, so does Jiggle. A drawback of WebGL is that it allows only six textures per shader. One way around this is to use multiple shaders but this can become cumbersome. Another way is image compositing, essentially tiling several images to produce an image map. Jiggles provides this functionality for [Node.js](https://nodejs.org) applications, the reason being that it depends on [Sharp](http://sharp.pixelplumbing.com/), which only runs on Node.js and not in the browser.

## Installation

You can clone the repository with [Git](https://git-scm.com/)...

    git clone https://github.com/djalbat/Jiggles.git

...and then install the necessary modules with [npm](https://www.npmjs.com/) from within the project's root directory:

    npm install

You will need to do this if you want to look at the example.

## Example

There is a small Node.js application which can be run from the root of the repository:

    node ./bin/main.js

This provides two endpoints. The `http://localhost:8000/imageMap` endpoint will serve the example image map whilst the `http://localhost:8000/` endpoint has a blank HTML file with the image map's description embedded within it.
    
## Usage

Two routes have been set up to provide the aforementioned endpoints. Each makes use of one of the two functions provided by Jiggles. The `imageMapPNG()` function supplies the image map in PNG format whilst the `imageMapJSON()` function provides its description in JSON format.
```js
const jiggles = require('jiggles');

const { imageMapPNG, imageMapJSON } = jiggles;

const imageMapURI = ...,
      indexPageURL = ...
      overlayImageSize = ...,
      indexPageFilePath = ...,
      imageDirectoryPath = ...;

router.get(imageMapURI, function(request, response, next) {
  imageMapPNG(imageDirectoryPath, overlayImageSize, response);
});

router.get(indexPageURI, function(request, response, next) {
  imageMapJSON(imageDirectoryPath, function(imageMapJSON) {
    imageMapJSON = JSON.stringify(imageMapJSON, null, '\t'); ///

    const filePath = `${templateDirectoryPath}${indexPageFilePath}`,
          args = {
            imageMapJSON: imageMapJSON
          },
          html = parseFile(filePath, args);

    response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});

    response.end(html);
  });
});
```
The first `imageDirectoryPath` argument of both functions should be the path of the directory containing the images. Hidden files on unixy systems, that is those starting with a period `.`, are removed. The second `overlayImageSize` argument of the `imageMapPNG()` function specifies the size of the images as they appear in the image map. Choose a power of two, for example 64 or 128. The third `response` argument should be the response object. The `imageMapPNG()` function will set the HTTP header and then pipe the image via this object.

The template HTML file should look something like the following:
```html
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
Embedding the image map JSON within the HTML in this way will make it available as a property of the global object in any JavaScript run in the browser. If you think this approach is questionable, you could provide the JSON by way of a response to an Ajax request.

## Compiling from source

Automation is done with [npm scripts](https://docs.npmjs.com/misc/scripts), have a look at the `package.json` file. The pertinent commands are:

    npm run build-debug
    npm run watch-debug
    
## Contact

- james.smith@djalbat.com
- http://djalbat.com
