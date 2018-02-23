'use strict';

const sharp = require('sharp'),
      necessary = require('necessary');

const { miscellaneousUtilities, asynchronousUtilities, fileSystemUtilities } = necessary,
      { rc } = miscellaneousUtilities,
      { whilst } = asynchronousUtilities,
      { readDirectory } = fileSystemUtilities;

function png(imageDirectoryPath, overlayImageSize, response) {
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

function json(imageDirectoryPath) {
  const names = readDirectory(imageDirectoryPath),
        dimension = dimensionFromNames(names),
        json = names.reduce(function(json, name, index) {
          const left = (index % dimension) / dimension,
                bottom = Math.floor(index / dimension) / dimension,
                width = 1 / dimension,
                height = 1 / dimension;

          json[name] = {
            left: left,
            bottom: bottom,
            width: width,
            height: height
          };

          return json;
        }, {});
        
  return json;
}

module.exports = {
  png: png,
  json: json
};

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
        textureMap = sharp({
          create: options ///
        });

  textureMap
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

function dimensionFromNames(names) {
  const namesLength = names.length,
        dimension = Math.ceil(Math.sqrt(namesLength)); ///

  return dimension;
}
