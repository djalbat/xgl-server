'use strict';

const jiggleImageMap = require('../../index'),  ///
      necessary = require('necessary');

const constants = require('../constants');

const { imageMap } = jiggleImageMap,
      { templateUtilities, miscellaneousUtilities } = necessary,
      { parseFile } = templateUtilities,
      { rc } = miscellaneousUtilities,
      { EXAMPLE_PAGE_FILE_PATH } = constants;

function html(example) {
  const { imageDirectoryPath } = rc;

  let imageMapJSON = imageMap.json(imageDirectoryPath);

  imageMapJSON = JSON.stringify(imageMapJSON, null, '\t'); ///

  const { templateDirectoryPath } = rc,
        filePath = `${templateDirectoryPath}${EXAMPLE_PAGE_FILE_PATH}`,
        args = {
          example: example,
          imageMapJSON: imageMapJSON
        },
        html = parseFile(filePath, args);

  return html;
}

module.exports = {
  html: html
};
