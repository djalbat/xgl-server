# Jiggles

Server side components and utilities for [Jiggle](https://github.com/djalbat/Jiggle).

Since [WebGL](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API) supports texture mapping, so does Jiggle. WebGL allows only six images per shader, a serious drawback. One way around this is to use multiple shaders but this can become cumbersome. Another, and standard way around is to use image compositing, essentially tiling several images to produce an image map. Jiggles provides this functionality by way of two methods that can be utilised in a [Node.js](https://nodejs.org) application. The reason for Node.js is that they depend on [Sharp](http://sharp.pixelplumbing.com/), which only runs on Node.js and not in the browser.

# Installation

You can clone the repository with [Git](https://git-scm.com/)...

    git clone https://github.com/djalbat/Jiggles.git

...and then install the necessary modules with [npm](https://www.npmjs.com/) from within the project's root directory:

    npm install
    
# Usage

## Compiling from source

Automation is done with [npm scripts](https://docs.npmjs.com/misc/scripts), have a look at the `package.json` file. The pertinent commands are:

    npm run build-debug
    npm run watch-debug
    
## Contact

- james.smith@djalbat.com
- http://djalbat.com
