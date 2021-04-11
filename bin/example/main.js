"use strict";

const express = require("express");

const { IMAGE_MAP_PATH, INDEX_PAGE_PATH } = require("./paths"),
      { imageMapHandler, indexPageHandler } = require("./handlers");

const server = express(), ///
      router = express.Router();

router.get(IMAGE_MAP_PATH, imageMapHandler);

router.get(INDEX_PAGE_PATH, indexPageHandler);

server.use(router);

server.listen(8888);
