"use strict";

const express = require("express");

const imageMapHandler = require("../handler/imageMap"),
      indexPageHandler = require("../handler/page/index");

const { IMAGE_MAP_PATH, INDEX_PAGE_PATH } = require("../paths");

const defaultRouter = express.Router();

defaultRouter.get(IMAGE_MAP_PATH, imageMapHandler);

defaultRouter.get(INDEX_PAGE_PATH, indexPageHandler);

module.exports = defaultRouter;
