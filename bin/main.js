"use strict";

const express = require("express");

const defaultRouter = require("./router/default");

const server = express(); ///

server.use(defaultRouter);

server.listen(8888);
