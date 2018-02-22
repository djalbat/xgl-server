'use strict';

const jiggles = require('../index'), ///
      express = require('express'),
      necessary = require('necessary');

const constants = require('./constants');

const { templateUtilities, miscellaneousUtilities } = necessary,
      { onETX, rc } = miscellaneousUtilities,
      { parseFile } = templateUtilities,
      { argv, exit } = process,
      { imageMap } = jiggles,
      { IMAGE_MAP_URI, OVERLAY_IMAGE_SIZE, INDEX_PAGE_URI, INDEX_PAGE_FILE_PATH } = constants;

onETX(exit);

rc(argv);

createServer();

function createServer() {
  const server = express(), ///
        router = express.Router(),
        { port, imageDirectoryPath, templateDirectoryPath } = rc;

    router.get(IMAGE_MAP_URI, function(request, response, next) {
      const { imageDirectoryPath } = rc,
            overlayImageSize = OVERLAY_IMAGE_SIZE;
  
      imageMap.png(imageDirectoryPath, overlayImageSize, response);
    });
        
    router.get(INDEX_PAGE_URI, function(request, response, next) {
      let imageMapJSON = imageMap.json(imageDirectoryPath);
    
      imageMapJSON = JSON.stringify(imageMapJSON, null, '\t'); ///
    
      const filePath = `${templateDirectoryPath}${INDEX_PAGE_FILE_PATH}`,
            args = {
              imageMapJSON: imageMapJSON
            },
            html = parseFile(filePath, args);
    
      response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});

      response.end(html);
    });

  server.use(router);

  server.listen(port);
}
