"use strict";

const { imageMapJSON } = require("../../../index"), ///
      { headers, contentTypes, statusCodes, templateUtilities } = require("necessary");

const { IMAGE_MAP_PATH } = require("../../paths"),
      { namesFromRequest } = require("../../utilities/request"),
      { DOUBLE_SPACE,
        OVERLAY_IMAGE_SIZE,
        INDEX_PAGE_FILE_PATH,
        IMAGE_DIRECTORY_PATH,
        TEMPLATE_DIRECTORY_PATH } = require("../../constants");

const { parseFile } = templateUtilities,
      { OK_200_STATUS_CODE } = statusCodes,
      { CONTENT_TYPE_HEADER } = headers,
      { TEXT_HTML_CHARSET_UTF8_CONTENT_TYPE } = contentTypes;

function indexPageHandler(request, response) {
  const names = namesFromRequest(request),
        overlayImageSize = OVERLAY_IMAGE_SIZE,
        indexPageFilePath = INDEX_PAGE_FILE_PATH,
        imageDirectoryPath = IMAGE_DIRECTORY_PATH,
        templateDirectoryPath = TEMPLATE_DIRECTORY_PATH;

  imageMapJSON(names, imageDirectoryPath, overlayImageSize, function (imageMapJSON) {
    imageMapJSON = JSON.stringify(imageMapJSON, null, DOUBLE_SPACE);

    const imageMapURI = IMAGE_MAP_PATH,
          filePath = `${templateDirectoryPath}${indexPageFilePath}`,
          args = {
            imageMapURI,
            imageMapJSON
          },
          html = parseFile(filePath, args),
          headers = {},
          statusCode = OK_200_STATUS_CODE;

    headers[CONTENT_TYPE_HEADER] = TEXT_HTML_CHARSET_UTF8_CONTENT_TYPE;

    response.writeHead(statusCode, headers);

    response.end(html);
  });
}

module.exports = indexPageHandler;
