'use strict';

const jiggle = require('../index'), ///
      express = require('express'),
      necessary = require('necessary');

const constants = require('./constants'),
      examplePage = require('./page/example');

const { imageMap } = jiggle,
      { arrayUtilities, miscellaneousUtilities } = necessary,
      { first } = arrayUtilities,
      { rc } = miscellaneousUtilities,
      { EXAMPLE_PAGE_URI, IMAGE_MAP_URI, OVERLAY_IMAGE_SIZE } = constants;

function createRouter() {
  const router = express.Router();

  router.get(EXAMPLE_PAGE_URI, function(request, response, next) {
    const { query } = request,
          keys = Object.keys(query),
          firstKey = first(keys),
          example = firstKey, ///
          html = examplePage.html(example);

    response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});

    response.end(html);
  });

  router.get(IMAGE_MAP_URI, function(request, response, next) {
    const { imageDirectoryPath } = rc,
          overlayImageSize = OVERLAY_IMAGE_SIZE;

    imageMap.png(imageDirectoryPath, overlayImageSize, response);
  });

  return router;
}

module.exports = {
  createRouter: createRouter
};
