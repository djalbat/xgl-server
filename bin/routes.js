'use strict';

const jiggles = require('../index'), ///
      necessary = require('necessary');

const constants = require('./constants');

const { templateUtilities, miscellaneousUtilities } = necessary,
      { rc } = miscellaneousUtilities,
      { parseFile } = templateUtilities,
      { imageMapPNG, imageMapJSON } = jiggles,
      { IMAGE_MAP_URI, OVERLAY_IMAGE_SIZE, INDEX_PAGE_FILE_PATH } = constants;

function imageMap(request, response) {
	const { imageDirectoryPath } = rc,
				names = namesFromRequest(request),
				overlayImageSize = OVERLAY_IMAGE_SIZE;

	imageMapPNG(names, imageDirectoryPath, overlayImageSize, response);
}

function indexPage(request, response) {
	const { imageDirectoryPath, templateDirectoryPath } = rc,
				names = namesFromRequest(request),
				indexPageFilePath = INDEX_PAGE_FILE_PATH,
				overlayImageSize = OVERLAY_IMAGE_SIZE;

	imageMapJSON(names, imageDirectoryPath, overlayImageSize, function (imageMapJSON) {
		imageMapJSON = JSON.stringify(imageMapJSON, null, '\t'); ///

		const imageMapURI = IMAGE_MAP_URI,
          filePath = `${templateDirectoryPath}${indexPageFilePath}`,
					args = {
            imageMapURI,
						imageMapJSON
					},
					html = parseFile(filePath, args);

		response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});

		response.end(html);
	});
}

module.exports = {
	imageMap,
	indexPage
};

function namesFromRequest(request) {
	const { query } = request;

	let { names } = query;

	names = names ? ////
					  names.split(',') :
							[];

	return names;
}
