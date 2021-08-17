"use strict";

const { COMMA } = require("../constants");

function namesFromRequest(request) {
  const { query } = request;

  let { names } = query;

  names = names ? ////
            names.split(COMMA) :
              [];

  return names;
}

module.exports = {
  namesFromRequest
};
