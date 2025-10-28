"use strict";

const { imageMapPNG } = require("../../lib/index"); ///

const { namesFromRequest } = require("../utilities/request"),
      { OVERLAY_IMAGE_SIZE, IMAGE_DIRECTORY_PATH } = require("../constants");

function imageMapHandler(request, response) {
  const names = namesFromRequest(request),
        overlayImageSize = OVERLAY_IMAGE_SIZE,
        imageDirectoryPath  = IMAGE_DIRECTORY_PATH;

  imageMapPNG(names, imageDirectoryPath, overlayImageSize, response);
}

module.exports = imageMapHandler;
