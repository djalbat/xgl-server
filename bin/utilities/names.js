'use strict';

function removeHiddenNames(names) {
  names = names.reduce(function(names, name) {
    const nameHiddenName = /^\./.test(name);

    if (!nameHiddenName) {
      names.push(name);
    }

    return names;
  }, []);

  return names;
}

function dimensionFromNames(names) {
  const namesLength = names.length,
        dimension = Math.ceil(Math.sqrt(namesLength)); ///

  return dimension;
}

module.exports = {
  removeHiddenNames,
  dimensionFromNames
};
