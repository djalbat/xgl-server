"use strict";

import { fileSystemUtilities } from "necessary";

import { removeHiddenNames, dimensionFromNames } from "./utilities/names";

const { readDirectory } = fileSystemUtilities;

export default function imageMapJSON(names, imageDirectoryPath, overlayImageSize, callback) {
  const namesLength = names.length;

  if (namesLength === 0) {
    names = readDirectory(imageDirectoryPath);
  }

  names = removeHiddenNames(names);

  const dimension = dimensionFromNames(names),
        length = dimension * overlayImageSize,
        imageMapJSON = names.reduce((imageMapJSON, name, index) => {
          let left = (index % dimension) / dimension,
              bottom = Math.floor(index / dimension) / dimension,
              width = 1 / dimension,
              height = 1 / dimension,
              offset = 0.5; ///

          left = ((left * length) + offset) / length; ///
          bottom = ((bottom * length) + offset) / length; ///
          width = ((width * length) - offset) / length; ///
          height = ((height * length) - offset) / length; ///

          imageMapJSON[name] = {
            left,
            bottom,
            width,
            height
          };

          return imageMapJSON;
        }, {});
        
  callback(imageMapJSON);
}
