"use strict";

const express = require("express"),
      necessary = require("necessary");

const routes = require("./routes"),
      constants = require("./constants");

const { miscellaneousUtilities } = necessary,
      { onETX, rc } = miscellaneousUtilities,
      { argv, exit } = process,
      { imageMap, indexPage } = routes,
      { IMAGE_MAP_URI, INDEX_PAGE_URI } = constants;

rc(argv);

const server = express(), ///
      router = express.Router(),
      { port } = rc;

router.get(IMAGE_MAP_URI, imageMap);

router.get(INDEX_PAGE_URI, indexPage);

server.use(router);

server.listen(port);

onETX(exit);
