'use strict';

const express = require('express'),
      necessary = require('necessary');

const routes = require('./routes'),
			constants = require('./constants');

const { miscellaneousUtilities } = necessary,
      { onETX, rc } = miscellaneousUtilities,
			{ argv, exit } = process,
			{ imageMap, indexPage } = routes,
			{ IMAGE_MAP_URI, INDEX_PAGE_URI } = constants;

rc(argv);

const server = express(), ///
      router = express.Router(),
      { port } = rc,
      imageMapURI = IMAGE_MAP_URI,
      indexPageURI = INDEX_PAGE_URI;

router.get(imageMapURI, imageMap);

router.get(indexPageURI, indexPage);

server.use(router);

server.listen(port);

onETX(exit);
