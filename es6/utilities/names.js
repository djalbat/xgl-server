'use strict';

function dimensionFromNames(names) {
  const namesLength = names.length,
        dimension = Math.ceil(Math.sqrt(namesLength)); ///

  return dimension;
}

module.exports = {
  dimensionFromNames: dimensionFromNames
};
