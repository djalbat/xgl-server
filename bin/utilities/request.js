"use strict";

const { characters } = require("necessary");

const { COMMA_CHARACTER } = characters;

function namesFromRequest(request) {
  const { query } = request;

  let { names } = query;

  names = names ? ////
            names.split(COMMA_CHARACTER) :
              [];

  return names;
}

module.exports = {
  namesFromRequest
};
