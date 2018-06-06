'use strict';

const necessary = require('necessary');

const namesUtilities = require('./utilities/names');

const { fileSystemUtilities } = necessary,
      { readDirectory } = fileSystemUtilities,
      { removeHiddenNames, dimensionFromNames } = namesUtilities;

function imageMapJSON(imageDirectoryPath, callback) {
	let names = readDirectory(imageDirectoryPath);

	names = removeHiddenNames(names);

	const dimension = dimensionFromNames(names),
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
