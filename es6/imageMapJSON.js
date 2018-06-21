'use strict';

const necessary = require('necessary');

const namesUtilities = require('./utilities/names');

const { fileSystemUtilities } = necessary,
      { readDirectory } = fileSystemUtilities,
      { removeHiddenNames, dimensionFromNames } = namesUtilities;

function imageMapJSON(names, imageDirectoryPath, callback) {
	const namesLength = names.length;

	if (namesLength === 0) {
		names = readDirectory(imageDirectoryPath);
	}

	names = removeHiddenNames(names);

	const dimension = dimensionFromNames(names),
        imageMapJSON = names.reduce(function(imageMapJSON, name, index) {
          const left = (index % dimension) / dimension,
                bottom = Math.floor(index / dimension) / dimension,
                width = 1 / dimension,
                height = 1 / dimension;

          imageMapJSON[name] = {
            left,
            bottom,
            width,
            height
          };

          return imageMapJSON;
        }, {});
        
  callback(imageMapJSON);
}

module.exports = imageMapJSON;
