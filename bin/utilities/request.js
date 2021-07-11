"use strict";

function namesFromRequest(request) {
  const { query } = request;

  let { names } = query;

  names = names ? ////
            names.split(",") :
              [];

  return names;
}

module.exports = {
  namesFromRequest
};
