"use strict";

const express = require("express");

const { imageMap, indexPage } = require("./routes"),
      { IMAGE_MAP_PATH, INDEX_PAGE_PATH } = require("./paths");

const server = express(), ///
      router = express.Router();

router.get(IMAGE_MAP_PATH, imageMap);

router.get(INDEX_PAGE_PATH, indexPage);

server.use(router);

server.listen(8888);
