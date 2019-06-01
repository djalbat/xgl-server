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
				length = dimension * overlayImageSize,
				imageMapJSON = names.reduce(function(imageMapJSON, name, index) {
          let left = (index % dimension) / dimension,
							bottom = Math.floor(index / dimension) / dimension,
							width = 1 / dimension,
							height = 1 / dimension;

          left = ((left * length) + 0.5) / length;
					bottom = ((bottom * length) + 0.5) / length;
					width = ((width * length) - 0.5) / length;
					height = ((height * length) - 0.5) / length;

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
