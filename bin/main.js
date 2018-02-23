'use strict';

const jiggles = require('../index'), ///
      express = require('express'),
      necessary = require('necessary');

const constants = require('./constants');

const { templateUtilities, miscellaneousUtilities } = necessary,
      { onETX, rc } = miscellaneousUtilities,
      { parseFile } = templateUtilities,
      { argv, exit } = process,
      { imageMapPNG, imageMapJSON } = jiggles,
      { IMAGE_MAP_URI, OVERLAY_IMAGE_SIZE, INDEX_PAGE_URI, INDEX_PAGE_FILE_PATH } = constants;

onETX(exit);

rc(argv);

createServer();

function createServer() {
  const server = express(), ///
        router = express.Router(),
        { port, imageDirectoryPath, templateDirectoryPath } = rc,
        imageMapURI = IMAGE_MAP_URI,
        indexPageURI = INDEX_PAGE_URI,
        overlayImageSize = OVERLAY_IMAGE_SIZE,
        indexPageFilePath = INDEX_PAGE_FILE_PATH;

    router.get(imageMapURI, function(request, response, next) {
      imageMapPNG(imageDirectoryPath, overlayImageSize, response);
    });
        
    router.get(indexPageURI, function(request, response, next) {
      imageMapJSON(imageDirectoryPath, function(imageMapJSON) {
        imageMapJSON = JSON.stringify(imageMapJSON, null, '\t'); ///
    
        const filePath = `${templateDirectoryPath}${indexPageFilePath}`,
              args = {
                imageMapJSON: imageMapJSON
              },
              html = parseFile(filePath, args);
      
        response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
  
        response.end(html);
      });
    });

  server.use(router);

  server.listen(port);
}
