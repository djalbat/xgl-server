'use strict';

const necessary = require('necessary');

const namesUtilities = require('./utilities/names');

const { fileSystemUtilities } = necessary,
      { readDirectory } = fileSystemUtilities,
      { removeHiddenNames, dimensionFromNames } = namesUtilities;

function imageMapJSON(names, imageDirectoryPath, overlayImageSize, callback) {
	const namesLength = names.length;

	if (namesLength === 0) {
		names = readDirectory(imageDirectoryPath);
	}

	names = removeHiddenNames(names);

	const dimension = dimensionFromNames(names),
				size = dimension * overlayImageSize,
				imageMapJSON = names.reduce(function(imageMapJSON, name, index) {
          let left = (index % dimension) / dimension,
							bottom = Math.floor(index / dimension) / dimension,
							width = 1 / dimension,
							height = 1 / dimension;

          left = ((left * size) + 0.5) / size;
					bottom = ((bottom * size) + 0.5) / size;
					width = ((width * size) - 1.0) / size;
					height = ((height * size) - 1.0) / size;

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
