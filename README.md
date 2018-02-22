# Jiggles

Server side components and utilities for [Jiggle](https://github.com/djalbat/Jiggle).

Since [WebGL](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API) supports texture mapping, so does Jiggle. A drawback of WebGL is that it allows only six textures per shader. One way around this is to use multiple shaders but this can become cumbersome. Another way around is compositing, essentially tiling several textures to produce a texture map. Jiggles provides this functionality for [Node.js](https://nodejs.org) applications. The reason is that the compositing uses [Sharp](http://sharp.pixelplumbing.com/), which only runs on Node.js and not in the browser.

# Installation

You can clone the repository with [Git](https://git-scm.com/)...

    git clone https://github.com/djalbat/Jiggles.git

...and then install the necessary modules with [npm](https://www.npmjs.com/) from within the project's root directory:

    npm install

You will need to do this if you want to look at the example.

# Example

There is a small Node.js application which can be run from the root of the respository:

    node ./bin/main.js

This will provide two endpoints. The `http://localhost/textureMap` endpoint will serve the example texture map whilst the `http://localhost/` endpoint will provide a blank HTML file with the texture map JSON description embedded in it.

There is presently no client side component to the example, partly to keep the dependencies down to a minimum. However, the necessary client side code to make use of the texture map is given in the usage section that follows.
    
# Usage

In what follows, [Express](https://expressjs.com/) and [Necessary](https://github.com/djalbat/Necessary) have been used to set up a simple server. It might be possible to manage without Express if the `response` object provided to the `png()` method explained below supports a `setHeader()` method and can be passed to a `pipe()` method. It is certainly possible to do without Necessary.
```js
const jiggles = require('jiggles'),
      express = require('express'),
      necessary = require('necessary');

const { templateUtilities } = necessary,
      { parseFile } = templateUtilities,
      { textureMap } = jiggles;

const router = express.Router();

...

server.use(router);
```
Two routes need to be set up. One for the texture map itself in PNG format, provided by the `png()` method; and one for an HTML page with a corresponding JSON description provided by the `json()` method embedded in it.
```js
const textureMapURI = ...,
      indexPageURL = ...
      indexPageFilePath = ...,
      overlaytextureSize = ...,
      textureDirectoryPath = ...;

router.get(textureMapURI, function(request, response, next) {
  textureMap.png(textureDirectoryPath, overlayTextureSize, response);
});

router.get(indexPageURI, function(request, response, next) {
  let textureMapJSON = textureMap.json(textureDirectoryPath);

  textureMapJSON = JSON.stringify(textureMapJSON, null, '\t'); ///

  const filePath = `${templateDirectoryPath}${indexPageFilePath}`,
        args = {
          textureMapJSON: textureMapJSON
        },
        html = parseFile(filePath, args);

  response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});

  response.end(html);
});
```
The first `textureDirectoryPath` argument of both the `png()` and `json()` methods is the path of the directory containing the textures. The second `overlayTextureSize` argument of the `png()` method specifies the size of the textures as they appear in the texture map. Choose a power of two, for example 64 or 128. The third `response` argument should be the response object. The `png()` method will set the header and then pipe the image to this object.

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
Embedding the texture map JSON description in the HTML this way will make it available as a property of the global object in any script run in the browser. If you think this approach is questionable, return the JSON in response to an Ajax request. In the remainder of this usage example it is assumed that JSON has been embedded.

## Compiling from source

Automation is done with [npm scripts](https://docs.npmjs.com/misc/scripts), have a look at the `package.json` file. The pertinent commands are:

    npm run build-debug
    npm run watch-debug
    
## Contact

- james.smith@djalbat.com
- http://djalbat.com
