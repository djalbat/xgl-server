'use strict';

const necessary = require('necessary');

const namesUtilities = require('./utilities/names');

const { fileSystemUtilities } = necessary,
      { readDirectory } = fileSystemUtilities,
      { dimensionFromNames } = namesUtilities;

function imageMapJSON(imageDirectoryPath, callback) {
  const names = readDirectory(imageDirectoryPath),
        dimension = dimensionFromNames(names),
        imageMapJSON = names.reduce(function(imageMapJSON, name, index) {
          const left = (index % dimension) / dimension,
                bottom = Math.floor(index / dimension) / dimension,
                width = 1 / dimension,
                height = 1 / dimension;

          imageMapJSON[name] = {
            left: left,
            bottom: bottom,
            width: width,
            height: height
          };

          return imageMapJSON;
        }, {});
        
  callback(imageMapJSON);
}

module.exports = imageMapJSON;
