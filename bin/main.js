'use strict';

const express = require('express'),
      necessary = require('necessary');

const routes = require('./routes');

const { miscellaneousUtilities } = necessary,
      { onETX, rc } = miscellaneousUtilities,
      { createRouter } = routes,
      { argv, exit } = process;

onETX(exit);

rc(argv);

createServer();

function createServer() {
  const server = express(), ///
        router = createRouter(),
        { port, publicDirectoryPath } = rc;

  server.use(router);

  server.use(express.static(publicDirectoryPath));

  server.listen(port);
}
