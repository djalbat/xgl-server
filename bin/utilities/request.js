"use strict";

import { charaters } from "necessary";

const { COMMA_CHARACTER } = charaters;

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
