"use strict";

const express = require("express");

const { imageMap, indexPage } = require("./routes"),
      { IMAGE_MAP_URI, INDEX_PAGE_URI } = require("./constants");

const server = express(), ///
      router = express.Router();

router.get(IMAGE_MAP_URI, imageMap);

router.get(INDEX_PAGE_URI, indexPage);

server.use(router);

server.listen(8888);
