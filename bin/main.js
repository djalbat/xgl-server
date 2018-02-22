'use strict';

const jiggles = require('../index'), ///
      express = require('express'),
      necessary = require('necessary');

const constants = require('./constants');

const { templateUtilities, miscellaneousUtilities } = necessary,
      { onETX, rc } = miscellaneousUtilities,
      { parseFile } = templateUtilities,
      { argv, exit } = process,
      { textureMap } = jiggles,
      { TEXTURE_MAP_URI, OVERLAY_TEXTURE_SIZE, INDEX_PAGE_URI, INDEX_PAGE_FILE_PATH } = constants;

onETX(exit);

rc(argv);

createServer();

function createServer() {
  const server = express(), ///
        router = express.Router(),
        { port, textureDirectoryPath, templateDirectoryPath } = rc,
        textureMapURI = TEXTURE_MAP_URI,
        indexPageURI = INDEX_PAGE_URI,
        indexPageFilePath = INDEX_PAGE_FILE_PATH,
        overlayTextureSize = OVERLAY_TEXTURE_SIZE;

    router.get(textureMapURI, function(request, response, next) {
      textureMap.png(textureDirectoryPath, overlayTextureSize, response);
    });
        
    router.get(indexPageURI, function(request, response, next) {
      let textureMapJSON = textureMap.json(textureDirectoryPath);
    
      textureMapJSON = JSON.stringify(textureMapJSON, null, '\t'); ///
    
      const filePath = `${templateDirectoryPath}${indexPageFilePath}`,
            args = {
              textureMapJSON: textureMapJSON
            },
            html = parseFile(filePath, args);
    
      response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});

      response.end(html);
    });

  server.use(router);

  server.listen(port);
}
