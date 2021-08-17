"use strict";

const jimp = require("jimp");

const { asynchronousUtilities, fileSystemUtilities } = require("necessary");

const { TRANSPARENT, CONTENT_TYPE } = require("./constants"),
      { removeHiddenNames, dimensionFromNames } = require("./utilities/names");

const { whilst } = asynchronousUtilities,
      { readDirectory } = fileSystemUtilities;

const Image = jimp; ///

function imageMapPNG(names, imageDirectoryPath, overlayImageSize, response) {
  const namesLength = names.length;

  if (namesLength === 0) {
    names = readDirectory(imageDirectoryPath);
  }

  names = removeHiddenNames(names);

  const dimension = dimensionFromNames(names);

  createImageMap(dimension, overlayImageSize, (imageMap) => {
    const context = {
      dimension,
      names,
      imageMap,
      overlayImageSize,
      imageDirectoryPath
    };

    whilst(compositeCallback, () => {
      const { MIME_PNG } = jimp,
            { imageMap } = context;

      imageMap.getBuffer(MIME_PNG, (error, buffer) => {
        response.set(CONTENT_TYPE, MIME_PNG);

        response.send(buffer);
      });
    }, context);
  });
}

module.exports = imageMapPNG;

function createImageMap(dimension, overlayImageSize, callback) {
  const size = dimension * overlayImageSize,
        width = size,	///
        height = size,	///
        background = TRANSPARENT;

    new Image(width, height, background, (error, imageMap) => {
      callback(imageMap);
    });
  }

function compositeCallback(next, done, context, index) {
  const { names, dimension, imageMap, overlayImageSize, imageDirectoryPath } = context,
        namesLength = names.length,
        lastIndex = namesLength - 1;

  if (index > lastIndex) {
    done();

    return;
  }

  const name = names[index],
        path = `${imageDirectoryPath}/${name}`;

  jimp.read(path, (error, overlayImage) => {
    resizeOverlayImage(overlayImage, overlayImageSize, (overlayImage) => {
      const x = (index % dimension) * overlayImageSize,
            y = ((dimension - 1) - Math.floor(index / dimension)) * overlayImageSize;

      imageMap.composite(overlayImage, x, y, (error, imageMap) => {
        Object.assign(context, {
          imageMap
        });

        next();
      });
    });
  });

}

function resizeOverlayImage(image, overlayImageSize, callback) {
  const width = overlayImageSize, ///
        height = overlayImageSize;  ///

  image.resize(width, height, (error, overlayImage) => {
    callback(overlayImage);
  });
}
