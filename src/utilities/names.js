"use strict";

export function removeHiddenNames(names) {
  names = names.reduce((names, name) => {
    const nameHiddenName = /^\./.test(name);

    if (!nameHiddenName) {
      names.push(name);
    }

    return names;
  }, []);

  return names;
}

export function dimensionFromNames(names) {
  const namesLength = names.length,
        dimension = Math.ceil(Math.sqrt(namesLength)); ///

  return dimension;
}
