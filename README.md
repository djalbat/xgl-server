# Jiggles

Image compositing for [Jiggle](https://github.com/djalbat/Jiggle).

Since [WebGL](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API) supports image mapping, so does Jiggle. A drawback of WebGL is that it allows only six textures per shader. One way around this is to use multiple shaders but this can become cumbersome. Another way is image compositing, essentially tiling several images to produce an image map. Jiggles provides image compositing for [Node.js](https://nodejs.org) applications. The reason is that it depends on [Sharp](http://sharp.pixelplumbing.com/), which only runs on Node.js and not in the browser.

# Installation

You can clone the repository with [Git](https://git-scm.com/)...

    git clone https://github.com/djalbat/Jiggles.git

...and then install the necessary modules with [npm](https://www.npmjs.com/) from within the project's root directory:

    npm install

You will need to do this if you want to look at the example.

# Example

There is a small Node.js application which can be run from the root of the respository:

    node ./bin/main.js

This provides two endpoints. The `http://localhost/imageMap` endpoint will serve the example image map whilst the `http://localhost/` endpoint has a blank HTML file with the image map's JSON description embedded within it.
    
# Usage

Both [Express](https://expressjs.com/) and [Necessary](https://github.com/djalbat/Necessary) have been used in the example application. It might be possible to manage without Express if the `response` object provided to the `png()` method explained below supports a `setHeader()` method and can be passed to a `pipe()` method. It is certainly possible to do without Necessary.

Two routes have been set up to provide the aforementioned endpoints.
```js
const imageMapURI = ...,
      indexPageURL = ...
      indexPageFilePath = ...,
      overlayImageSize = ...,
      imageDirectoryPath = ...;

router.get(imageMapURI, function(request, response, next) {
  imageMap.png(imageDirectoryPath, overlayTextureSize, response);
});

router.get(indexPageURI, function(request, response, next) {
  let imageMapJSON = imageMap.json(imageDirectoryPath);

  imageMapJSON = JSON.stringify(imageMapJSON, null, '\t'); ///

  const filePath = `${templateDirectoryPath}${indexPageFilePath}`,
        args = {
          imageMapJSON: imageMapJSON
        },
        html = parseFile(filePath, args);

  response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});

  response.end(html);
});
```
The first `imageDirectoryPath` argument of both the `png()` and `json()` methods should be the path of the directory containing the textures. The second `overlayTextureSize` argument of the `png()` method specifies the size of the textures as they appear in the image map. Choose a power of two, for example 64 or 128. The third `response` argument should be the response object. The `png()` method will set the header and then pipe the image to this object.

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
Embedding the image map JSON description in the HTML this way will make it available as a property of the global object in any script run in the browser. If you think this approach is questionable, you could provide the JSON in the response to an Ajax request. In the remainder of this section it is assumed that JSON has been embedded, however.

## Compiling from source

Automation is done with [npm scripts](https://docs.npmjs.com/misc/scripts), have a look at the `package.json` file. The pertinent commands are:

    npm run build-debug
    npm run watch-debug
    
## Contact

- james.smith@djalbat.com
- http://djalbat.com
