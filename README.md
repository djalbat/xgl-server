# Jiggles

Server side components and utilities for [Jiggle](https://github.com/djalbat/Jiggle).

Since [WebGL](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API) supports texture mapping, so does Jiggle. However, WebGL allows only six textures per shader. One way around this is to use multiple shaders but this can become cumbersome. Another way around is compositing, essentially tiling several textures to produce a texture map. Jiggles provides this functionality for [Node.js](https://nodejs.org) applications. The reason is that the compositing uses [Sharp](http://sharp.pixelplumbing.com/), which only runs on Node.js and not in the browser.

# Installation

You can clone the repository with [Git](https://git-scm.com/)...

    git clone https://github.com/djalbat/Jiggles.git

...and then install the necessary modules with [npm](https://www.npmjs.com/) from within the project's root directory:

    npm install
    
# Usage

In the example that follows, [Express](https://expressjs.com/) and [Necessary](https://github.com/djalbat/Necessary) have been used to set up a simple server.
```js
const jiggles = require('jiggles'),
      express = require('express'),
      necessary = require('necessary');

const { templateUtilities } = necessary,
      { parseFile } = templateUtilities,
      { textureMap } = jiggles,
      ...

const router = express.Router();

...

server.use(router);
```
It might be possible to do without Express if the `response` object provided to the `png()` method explained below supports a `setHeader()` method and can be passed to a `pipe()` method. It is also certainly possible to do without Necessary.

Two routes need to be set up. One for the texture map in PNG format, provided by the `png()` method; and one for an HTML page with a corresponding JSON description, provided by the `json()` method.
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
The first `textureDirectoryPath` argument of both the `png()` and `json()` methods is the path of the directory containing the textures. The second `overlayTextureSize` argument of the `png()` method specifies the size of the textures as they appear in the texture map. Choose a power of two, for example 64 or 128. The third `response` argument should be the response object returned by the Express `get()` method. The `png()` method will both set the correct header and pipe the image to this object.

Alongside providing a PNG texture map, you must provide a JSON object describing which texture appears where in the texture map.
```js

```js
const jiggles = require('jiggles'),
      express = require('express'),
      router = express.Router(),
      textureMapURI = ...,
      overlaytextureSize = ...,
      textureDirectoryPath = ...;

router.get(textureMapURI, function(request, response, next) {
  textureMap.png(textureDirectoryPath, overlayTextureSize, response);
});
```
The first `textureDirectoryPath` argument to the `png()` method is the path of the directory containing the textures. The second `overlayTextureSize` argument specifies the size of the textures as they appear in the texture map. Choose a power of two, for example 64 or 128. The third `response` argument should be the response object returned by the Express `get()` method. The `png()` method will both set the correct header and pipe the image to this object.

Alongside providing a PNG texture map, you must provide a JSON object describing which texture appears where in the texture map.
```js
const jiggles = require('jiggles'),
      express = require('express'),
      router = express.Router(),
      { textureMap } = jiggles,
      indexPageURI = ...,
      textureDirectoryPath = ...;


```

## Compiling from source

Automation is done with [npm scripts](https://docs.npmjs.com/misc/scripts), have a look at the `package.json` file. The pertinent commands are:

    npm run build-debug
    npm run watch-debug
    
## Contact

- james.smith@djalbat.com
- http://djalbat.com
