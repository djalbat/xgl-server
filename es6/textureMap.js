'use strict';

const sharp = require('sharp'),
      necessary = require('necessary');

const { miscellaneousUtilities, asynchronousUtilities, fileSystemUtilities } = necessary,
      { rc } = miscellaneousUtilities,
      { whilst } = asynchronousUtilities,
      { readDirectory } = fileSystemUtilities;

function png(textureDirectoryPath, overlayTextureSize, response) {
  const names = readDirectory(textureDirectoryPath),
        dimension = dimensionFromNames(names);

  createTextureMap(dimension, overlayTextureSize, function(buffer) {
    const context = {
      buffer: buffer,
      names: names,
      dimension: dimension,
      overlayTextureSize: overlayTextureSize,
      textureDirectoryPath: textureDirectoryPath
    };
    
    whilst(overlayCallback, function() {
      response.writeHead(200, {'Content-Type': 'image/png; charset=utf-8'});

      const { buffer } = context;

      sharp(buffer).pipe(response);
    }, context);
  });
}

function json(textureDirectoryPath) {
  const names = readDirectory(textureDirectoryPath),
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

function createTextureMap(dimension, overlayTextureSize,  callback) {
  const width = dimension * overlayTextureSize,
        height = dimension * overlayTextureSize,
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
    .then(function(buffer) {
      callback(buffer)
    });
}

function overlayCallback(next, done, context, index) {
  const { names, buffer, dimension, overlayTextureSize, textureDirectoryPath } = context,
        namesLength = names.length,
        lastIndex = namesLength - 1;

  if (index > lastIndex) {
    done();
    
    return;
  }
  
  const name = names[index],
        path = `${textureDirectoryPath}/${name}`;

  resizeTexture(path, overlayTextureSize, function(resizedTextureBuffer) {
    const top = ((dimension - 1) - Math.floor(index / dimension) ) * overlayTextureSize,
          left = (index % dimension) * overlayTextureSize,
          options = {
            top: top,
            left: left
          };

    sharp(buffer)
      .overlayWith(resizedTextureBuffer, options)
      .toBuffer()
      .then(function(buffer) {
        Object.assign(context, {
          buffer: buffer
        });

        next();
      });
  });
}

function resizeTexture(path, overlayTextureSize, callback) {
  const width = overlayTextureSize, ///
        height = overlayTextureSize;  ///
  
  sharp(path)
    .resize(width, height)
    .toBuffer()
    .then(function(buffer) {
      const resizedTextureBuffer = buffer; ///
      
      callback(resizedTextureBuffer);
    });
}

function dimensionFromNames(names) {
  const namesLength = names.length,
        dimension = Math.ceil(Math.sqrt(namesLength)); ///

  return dimension;
}
