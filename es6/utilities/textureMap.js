'use strict';

function preloadTextureMap(textureMapURI, callback) {
  const src = textureMapURI; ///

  preloadTexture(src, callback);
}

function getTextureDetails(textureName) {
  const { textureMapJSON } = runtimeConfiguration,
        textureDetails = textureMapJSON[textureName];

  return textureDetails;
}

module.exports = {
  preloadTextureMap: preloadTextureMap,
  getTextureDetails: getTextureDetails
};

function preloadTexture(src, callback) {
  const image = new Image(),
        texture = image,  ///
        onload = function() {
          callback(texture);
        }

  Object.assign(texture, {
    src: src,
    onload: onload
  });
}
