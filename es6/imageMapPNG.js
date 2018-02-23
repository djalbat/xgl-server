'use strict';

const sharp = require('sharp'),
      necessary = require('necessary');

const namesUtilities = require('./utilities/names');

const { asynchronousUtilities, fileSystemUtilities } = necessary,
      { whilst } = asynchronousUtilities,
      { readDirectory } = fileSystemUtilities,
      { dimensionFromNames } = namesUtilities;

function imageMapPNG(imageDirectoryPath, overlayImageSize, response) {
  const names = readDirectory(imageDirectoryPath),
        dimension = dimensionFromNames(names);

  createImageMap(dimension, overlayImageSize, function(imageBuffer) {
    const context = {
      names: names,
      dimension: dimension,
      imageBuffer: imageBuffer,
      overlayImageSize: overlayImageSize,
      imageDirectoryPath: imageDirectoryPath
    };
    
    whilst(overlayCallback, function() {
      response.writeHead(200, {'Content-Type': 'image/png; charset=utf-8'});

      const { imageBuffer } = context;

      sharp(imageBuffer).pipe(response);
    }, context);
  });
}

module.exports = imageMapPNG;

function createImageMap(dimension, overlayImageSize,  callback) {
  const width = dimension * overlayImageSize,
        height = dimension * overlayImageSize,
        channels = 4,
        background = { r: 0, g: 0, b: 0, alpha: 0 },
        options = {
          width: width,
          height: height,
          channels: channels,
          background: background
        },
        imageMap = sharp({
          create: options ///
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
    const top = ((dimension - 1) - Math.floor(index / dimension) ) * overlayImageSize,
          left = (index % dimension) * overlayImageSize,
          options = {
            top: top,
            left: left
          };

    sharp(imageBuffer)
      .overlayWith(resizedImageBuffer, options)
      .toBuffer()
      .then(function(imageBuffer) {
        Object.assign(context, {
          imageBuffer: imageBuffer
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
