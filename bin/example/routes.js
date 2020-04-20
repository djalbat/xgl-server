"use strict";

const xglServer = require("../../index"), ///
      necessary = require("necessary");

const constants = require("./constants");

const { templateUtilities } = necessary,
      { parseFile } = templateUtilities,
      { imageMapPNG, imageMapJSON } = xglServer,
      { IMAGE_MAP_URI, OVERLAY_IMAGE_SIZE, INDEX_PAGE_FILE_PATH, IMAGE_DIRECTORY_PATH, TEMPLATE_DIRECTORY_PATH, TEXT_HTML_CHARSET_UTF8_CONTENT_TYPE } = constants;

function imageMap(request, response) {
  const names = namesFromRequest(request),
        overlayImageSize = OVERLAY_IMAGE_SIZE,
        imageDirectoryPath  = IMAGE_DIRECTORY_PATH;

  imageMapPNG(names, imageDirectoryPath, overlayImageSize, response);
}

function indexPage(request, response) {
  const names = namesFromRequest(request),
        overlayImageSize = OVERLAY_IMAGE_SIZE,
        indexPageFilePath = INDEX_PAGE_FILE_PATH,
        imageDirectoryPath = IMAGE_DIRECTORY_PATH,
        templateDirectoryPath = TEMPLATE_DIRECTORY_PATH;

  imageMapJSON(names, imageDirectoryPath, overlayImageSize, function (imageMapJSON) {
    imageMapJSON = JSON.stringify(imageMapJSON, null, "  ");

    const imageMapURI = IMAGE_MAP_URI,
          filePath = `${templateDirectoryPath}${indexPageFilePath}`,
          args = {
            imageMapURI,
            imageMapJSON
          },
          contentType = TEXT_HTML_CHARSET_UTF8_CONTENT_TYPE,
          html = parseFile(filePath, args);

    response.writeHead(200, {"Content-Type": contentType});

    response.end(html);
  });
}

module.exports = {
  imageMap,
  indexPage
};

function namesFromRequest(request) {
  const { query } = request;

  let { names } = query;

  names = names ? ////
            names.split(",") :
              [];

  return names;
}
