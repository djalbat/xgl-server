'use strict';

function preloadImageMap(imageMapURI, callback) {
  const src = imageMapURI; ///

  preloadImage(src, callback);
}

function getImageDetails(imageName) {
  const { imageMapJSON } = runtimeConfiguration,
        imageDetails = imageMapJSON[imageName];

  return imageDetails;
}

module.exports = {
  preloadImageMap: preloadImageMap,
  getImageDetails: getImageDetails
};

function preloadImage(src, callback) {
  const image = new Image();

  image.onload = function() {
    callback(image);
  };

  Object.assign(image, {
    src: src
  });
}
