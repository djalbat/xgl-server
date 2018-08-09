'use strict';

const sharp = require('sharp'),
      necessary = require('necessary');

const constants = require('./constants'),
			namesUtilities = require('./utilities/names');

const { asynchronousUtilities, fileSystemUtilities } = necessary,
      { whilst } = asynchronousUtilities,
      { readDirectory } = fileSystemUtilities,
      { removeHiddenNames, dimensionFromNames } = namesUtilities,
			{ RED, BLUE, GREEN, ALPHA, CHANNELS } = constants;

function imageMapPNG(names, imageDirectoryPath, overlayImageSize, response) {
	const namesLength = names.length;

	if (namesLength === 0) {
		names = readDirectory(imageDirectoryPath);
	}

	names = removeHiddenNames(names);

	const dimension = dimensionFromNames(names);

	createImageMap(dimension, overlayImageSize, function(imageBuffer) {
    const context = {
      names,
      dimension,
      imageBuffer,
      overlayImageSize,
      imageDirectoryPath
    };
    
    whilst(overlayCallback, function() {
      response.writeHead(200, {'Content-Type': 'image/png; charset=utf-8'});

      const { imageBuffer } = context;

      sharp(imageBuffer).pipe(response);
    }, context);
  });
}

module.exports = imageMapPNG;

function createImageMap(dimension, overlayImageSize, callback) {
  const size = dimension * overlayImageSize,
				width = size,	///
        height = size,	///
			  alpha = ALPHA,
        channels = CHANNELS,
			  r = RED,	///
			  g = GREEN,	///
			  b = BLUE,	///
        background = {
  	      r,
	        g,
	        b,
	        alpha
        },
        options = {
          width,
          height,
          channels,
          background
        },
			  create = options, ///
        imageMap = sharp({
          create
        });

  imageMap
    .png()
    .toBuffer()
    .then(function(imageBuffer) {
      callback(imageBuffer)
    });
}

function overlayCallback(next, done, context, index) {
  const { names, dimension, imageBuffer, overlayImageSize, imageDirectoryPath } = context,
        namesLength = names.length,
        lastIndex = namesLength - 1;

  if (index > lastIndex) {
    done();
    
    return;
  }
  
  const name = names[index],
        path = `${imageDirectoryPath}/${name}`;

  resizeImage(path, overlayImageSize, function(resizedImageBuffer) {
    const top = ((dimension - 1) - Math.floor(index / dimension)) * overlayImageSize,
          left = (index % dimension) * overlayImageSize,
          options = {
            top,
            left
          };

    sharp(imageBuffer)
      .overlayWith(resizedImageBuffer, options)
      .toBuffer()
      .then(function(imageBuffer) {
        Object.assign(context, {
          imageBuffer
        });

        next();
      });
  });
}

function resizeImage(path, overlayImageSize, callback) {
  const width = overlayImageSize, ///
        height = overlayImageSize;  ///
  
  sharp(path)
    .resize(width, height)
    .toBuffer()
    .then(function(imageBuffer) {
      const resizedImageBuffer = imageBuffer; ///

      callback(resizedImageBuffer);
    });
}
