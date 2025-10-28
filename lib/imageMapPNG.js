"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return imageMapPNG;
    }
});
var _jimp = /*#__PURE__*/ _interop_require_default(require("jimp"));
var _necessary = require("necessary");
var _constants = require("./constants");
var _names = require("./utilities/names");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
var whilst = _necessary.asynchronousUtilities.whilst, readDirectory = _necessary.fileSystemUtilities.readDirectory;
var Image = _jimp.default; ///
function imageMapPNG(names, imageDirectoryPath, overlayImageSize, response) {
    var namesLength = names.length;
    if (namesLength === 0) {
        names = readDirectory(imageDirectoryPath);
    }
    names = (0, _names.removeHiddenNames)(names);
    var dimension = (0, _names.dimensionFromNames)(names);
    createImageMap(dimension, overlayImageSize, function(imageMap) {
        var context = {
            dimension: dimension,
            names: names,
            imageMap: imageMap,
            overlayImageSize: overlayImageSize,
            imageDirectoryPath: imageDirectoryPath
        };
        whilst(compositeCallback, function() {
            var MIME_PNG = _jimp.default.MIME_PNG, _$imageMap = context.imageMap;
            _$imageMap.getBuffer(MIME_PNG, function(error, buffer) {
                response.set(_constants.CONTENT_TYPE, MIME_PNG);
                response.send(buffer);
            });
        }, context);
    });
}
function createImageMap(dimension, overlayImageSize, callback) {
    var size = dimension * overlayImageSize, width = size, height = size, background = _constants.TRANSPARENT;
    new Image(width, height, background, function(error, imageMap) {
        callback(imageMap);
    });
}
function compositeCallback(next, done, context, index) {
    var names = context.names, dimension = context.dimension, imageMap = context.imageMap, overlayImageSize = context.overlayImageSize, imageDirectoryPath = context.imageDirectoryPath, namesLength = names.length, lastIndex = namesLength - 1;
    if (index > lastIndex) {
        done();
        return;
    }
    var name = names[index], path = "".concat(imageDirectoryPath, "/").concat(name);
    _jimp.default.read(path, function(error, overlayImage) {
        resizeOverlayImage(overlayImage, overlayImageSize, function(overlayImage) {
            var x = index % dimension * overlayImageSize, y = (dimension - 1 - Math.floor(index / dimension)) * overlayImageSize;
            imageMap.composite(overlayImage, x, y, function(error, imageMap) {
                Object.assign(context, {
                    imageMap: imageMap
                });
                next();
            });
        });
    });
}
function resizeOverlayImage(image, overlayImageSize, callback) {
    var width = overlayImageSize, height = overlayImageSize; ///
    image.resize(width, height, function(error, overlayImage) {
        callback(overlayImage);
    });
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbWFnZU1hcFBORy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IGppbXAgZnJvbSBcImppbXBcIjtcblxuaW1wb3J0IHsgYXN5bmNocm9ub3VzVXRpbGl0aWVzLCBmaWxlU3lzdGVtVXRpbGl0aWVzIH0gZnJvbSBcIm5lY2Vzc2FyeVwiO1xuXG5pbXBvcnQgeyBUUkFOU1BBUkVOVCwgQ09OVEVOVF9UWVBFIH0gZnJvbSBcIi4vY29uc3RhbnRzXCI7XG5pbXBvcnQgeyByZW1vdmVIaWRkZW5OYW1lcywgZGltZW5zaW9uRnJvbU5hbWVzIH0gZnJvbSBcIi4vdXRpbGl0aWVzL25hbWVzXCI7XG5cbmNvbnN0IHsgd2hpbHN0IH0gPSBhc3luY2hyb25vdXNVdGlsaXRpZXMsXG4gICAgICB7IHJlYWREaXJlY3RvcnkgfSA9IGZpbGVTeXN0ZW1VdGlsaXRpZXM7XG5cbmNvbnN0IEltYWdlID0gamltcDsgLy8vXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGltYWdlTWFwUE5HKG5hbWVzLCBpbWFnZURpcmVjdG9yeVBhdGgsIG92ZXJsYXlJbWFnZVNpemUsIHJlc3BvbnNlKSB7XG4gIGNvbnN0IG5hbWVzTGVuZ3RoID0gbmFtZXMubGVuZ3RoO1xuXG4gIGlmIChuYW1lc0xlbmd0aCA9PT0gMCkge1xuICAgIG5hbWVzID0gcmVhZERpcmVjdG9yeShpbWFnZURpcmVjdG9yeVBhdGgpO1xuICB9XG5cbiAgbmFtZXMgPSByZW1vdmVIaWRkZW5OYW1lcyhuYW1lcyk7XG5cbiAgY29uc3QgZGltZW5zaW9uID0gZGltZW5zaW9uRnJvbU5hbWVzKG5hbWVzKTtcblxuICBjcmVhdGVJbWFnZU1hcChkaW1lbnNpb24sIG92ZXJsYXlJbWFnZVNpemUsIChpbWFnZU1hcCkgPT4ge1xuICAgIGNvbnN0IGNvbnRleHQgPSB7XG4gICAgICBkaW1lbnNpb24sXG4gICAgICBuYW1lcyxcbiAgICAgIGltYWdlTWFwLFxuICAgICAgb3ZlcmxheUltYWdlU2l6ZSxcbiAgICAgIGltYWdlRGlyZWN0b3J5UGF0aFxuICAgIH07XG5cbiAgICB3aGlsc3QoY29tcG9zaXRlQ2FsbGJhY2ssICgpID0+IHtcbiAgICAgIGNvbnN0IHsgTUlNRV9QTkcgfSA9IGppbXAsXG4gICAgICAgICAgICB7IGltYWdlTWFwIH0gPSBjb250ZXh0O1xuXG4gICAgICBpbWFnZU1hcC5nZXRCdWZmZXIoTUlNRV9QTkcsIChlcnJvciwgYnVmZmVyKSA9PiB7XG4gICAgICAgIHJlc3BvbnNlLnNldChDT05URU5UX1RZUEUsIE1JTUVfUE5HKTtcblxuICAgICAgICByZXNwb25zZS5zZW5kKGJ1ZmZlcik7XG4gICAgICB9KTtcbiAgICB9LCBjb250ZXh0KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUltYWdlTWFwKGRpbWVuc2lvbiwgb3ZlcmxheUltYWdlU2l6ZSwgY2FsbGJhY2spIHtcbiAgY29uc3Qgc2l6ZSA9IGRpbWVuc2lvbiAqIG92ZXJsYXlJbWFnZVNpemUsXG4gICAgICAgIHdpZHRoID0gc2l6ZSxcdC8vL1xuICAgICAgICBoZWlnaHQgPSBzaXplLFx0Ly8vXG4gICAgICAgIGJhY2tncm91bmQgPSBUUkFOU1BBUkVOVDtcblxuICAgIG5ldyBJbWFnZSh3aWR0aCwgaGVpZ2h0LCBiYWNrZ3JvdW5kLCAoZXJyb3IsIGltYWdlTWFwKSA9PiB7XG4gICAgICBjYWxsYmFjayhpbWFnZU1hcCk7XG4gICAgfSk7XG4gIH1cblxuZnVuY3Rpb24gY29tcG9zaXRlQ2FsbGJhY2sobmV4dCwgZG9uZSwgY29udGV4dCwgaW5kZXgpIHtcbiAgY29uc3QgeyBuYW1lcywgZGltZW5zaW9uLCBpbWFnZU1hcCwgb3ZlcmxheUltYWdlU2l6ZSwgaW1hZ2VEaXJlY3RvcnlQYXRoIH0gPSBjb250ZXh0LFxuICAgICAgICBuYW1lc0xlbmd0aCA9IG5hbWVzLmxlbmd0aCxcbiAgICAgICAgbGFzdEluZGV4ID0gbmFtZXNMZW5ndGggLSAxO1xuXG4gIGlmIChpbmRleCA+IGxhc3RJbmRleCkge1xuICAgIGRvbmUoKTtcblxuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IG5hbWUgPSBuYW1lc1tpbmRleF0sXG4gICAgICAgIHBhdGggPSBgJHtpbWFnZURpcmVjdG9yeVBhdGh9LyR7bmFtZX1gO1xuXG4gIGppbXAucmVhZChwYXRoLCAoZXJyb3IsIG92ZXJsYXlJbWFnZSkgPT4ge1xuICAgIHJlc2l6ZU92ZXJsYXlJbWFnZShvdmVybGF5SW1hZ2UsIG92ZXJsYXlJbWFnZVNpemUsIChvdmVybGF5SW1hZ2UpID0+IHtcbiAgICAgIGNvbnN0IHggPSAoaW5kZXggJSBkaW1lbnNpb24pICogb3ZlcmxheUltYWdlU2l6ZSxcbiAgICAgICAgICAgIHkgPSAoKGRpbWVuc2lvbiAtIDEpIC0gTWF0aC5mbG9vcihpbmRleCAvIGRpbWVuc2lvbikpICogb3ZlcmxheUltYWdlU2l6ZTtcblxuICAgICAgaW1hZ2VNYXAuY29tcG9zaXRlKG92ZXJsYXlJbWFnZSwgeCwgeSwgKGVycm9yLCBpbWFnZU1hcCkgPT4ge1xuICAgICAgICBPYmplY3QuYXNzaWduKGNvbnRleHQsIHtcbiAgICAgICAgICBpbWFnZU1hcFxuICAgICAgICB9KTtcblxuICAgICAgICBuZXh0KCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG5cbn1cblxuZnVuY3Rpb24gcmVzaXplT3ZlcmxheUltYWdlKGltYWdlLCBvdmVybGF5SW1hZ2VTaXplLCBjYWxsYmFjaykge1xuICBjb25zdCB3aWR0aCA9IG92ZXJsYXlJbWFnZVNpemUsIC8vL1xuICAgICAgICBoZWlnaHQgPSBvdmVybGF5SW1hZ2VTaXplOyAgLy8vXG5cbiAgaW1hZ2UucmVzaXplKHdpZHRoLCBoZWlnaHQsIChlcnJvciwgb3ZlcmxheUltYWdlKSA9PiB7XG4gICAgY2FsbGJhY2sob3ZlcmxheUltYWdlKTtcbiAgfSk7XG59XG4iXSwibmFtZXMiOlsiaW1hZ2VNYXBQTkciLCJ3aGlsc3QiLCJhc3luY2hyb25vdXNVdGlsaXRpZXMiLCJyZWFkRGlyZWN0b3J5IiwiZmlsZVN5c3RlbVV0aWxpdGllcyIsIkltYWdlIiwiamltcCIsIm5hbWVzIiwiaW1hZ2VEaXJlY3RvcnlQYXRoIiwib3ZlcmxheUltYWdlU2l6ZSIsInJlc3BvbnNlIiwibmFtZXNMZW5ndGgiLCJsZW5ndGgiLCJyZW1vdmVIaWRkZW5OYW1lcyIsImRpbWVuc2lvbiIsImRpbWVuc2lvbkZyb21OYW1lcyIsImNyZWF0ZUltYWdlTWFwIiwiaW1hZ2VNYXAiLCJjb250ZXh0IiwiY29tcG9zaXRlQ2FsbGJhY2siLCJNSU1FX1BORyIsImdldEJ1ZmZlciIsImVycm9yIiwiYnVmZmVyIiwic2V0IiwiQ09OVEVOVF9UWVBFIiwic2VuZCIsImNhbGxiYWNrIiwic2l6ZSIsIndpZHRoIiwiaGVpZ2h0IiwiYmFja2dyb3VuZCIsIlRSQU5TUEFSRU5UIiwibmV4dCIsImRvbmUiLCJpbmRleCIsImxhc3RJbmRleCIsIm5hbWUiLCJwYXRoIiwicmVhZCIsIm92ZXJsYXlJbWFnZSIsInJlc2l6ZU92ZXJsYXlJbWFnZSIsIngiLCJ5IiwiTWF0aCIsImZsb29yIiwiY29tcG9zaXRlIiwiT2JqZWN0IiwiYXNzaWduIiwiaW1hZ2UiLCJyZXNpemUiXSwibWFwcGluZ3MiOiJBQUFBOzs7OytCQWNBOzs7ZUFBd0JBOzs7MkRBWlA7eUJBRTBDO3lCQUVqQjtxQkFDWTs7Ozs7O0FBRXRELElBQU0sQUFBRUMsU0FBV0MsZ0NBQXFCLENBQWhDRCxRQUNGLEFBQUVFLGdCQUFrQkMsOEJBQW1CLENBQXJDRDtBQUVSLElBQU1FLFFBQVFDLGFBQUksRUFBRSxHQUFHO0FBRVIsU0FBU04sWUFBWU8sS0FBSyxFQUFFQyxrQkFBa0IsRUFBRUMsZ0JBQWdCLEVBQUVDLFFBQVE7SUFDdkYsSUFBTUMsY0FBY0osTUFBTUssTUFBTTtJQUVoQyxJQUFJRCxnQkFBZ0IsR0FBRztRQUNyQkosUUFBUUosY0FBY0s7SUFDeEI7SUFFQUQsUUFBUU0sSUFBQUEsd0JBQWlCLEVBQUNOO0lBRTFCLElBQU1PLFlBQVlDLElBQUFBLHlCQUFrQixFQUFDUjtJQUVyQ1MsZUFBZUYsV0FBV0wsa0JBQWtCLFNBQUNRO1FBQzNDLElBQU1DLFVBQVU7WUFDZEosV0FBQUE7WUFDQVAsT0FBQUE7WUFDQVUsVUFBQUE7WUFDQVIsa0JBQUFBO1lBQ0FELG9CQUFBQTtRQUNGO1FBRUFQLE9BQU9rQixtQkFBbUI7WUFDeEIsSUFBTSxBQUFFQyxXQUFhZCxhQUFJLENBQWpCYyxVQUNGLEFBQUVILGFBQWFDLFFBQWJEO1lBRVJBLFdBQVNJLFNBQVMsQ0FBQ0QsVUFBVSxTQUFDRSxPQUFPQztnQkFDbkNiLFNBQVNjLEdBQUcsQ0FBQ0MsdUJBQVksRUFBRUw7Z0JBRTNCVixTQUFTZ0IsSUFBSSxDQUFDSDtZQUNoQjtRQUNGLEdBQUdMO0lBQ0w7QUFDRjtBQUVBLFNBQVNGLGVBQWVGLFNBQVMsRUFBRUwsZ0JBQWdCLEVBQUVrQixRQUFRO0lBQzNELElBQU1DLE9BQU9kLFlBQVlMLGtCQUNuQm9CLFFBQVFELE1BQ1JFLFNBQVNGLE1BQ1RHLGFBQWFDLHNCQUFXO0lBRTVCLElBQUkzQixNQUFNd0IsT0FBT0MsUUFBUUMsWUFBWSxTQUFDVCxPQUFPTDtRQUMzQ1UsU0FBU1Y7SUFDWDtBQUNGO0FBRUYsU0FBU0Usa0JBQWtCYyxJQUFJLEVBQUVDLElBQUksRUFBRWhCLE9BQU8sRUFBRWlCLEtBQUs7SUFDbkQsSUFBUTVCLFFBQXFFVyxRQUFyRVgsT0FBT08sWUFBOERJLFFBQTlESixXQUFXRyxXQUFtREMsUUFBbkRELFVBQVVSLG1CQUF5Q1MsUUFBekNULGtCQUFrQkQscUJBQXVCVSxRQUF2QlYsb0JBQ2hERyxjQUFjSixNQUFNSyxNQUFNLEVBQzFCd0IsWUFBWXpCLGNBQWM7SUFFaEMsSUFBSXdCLFFBQVFDLFdBQVc7UUFDckJGO1FBRUE7SUFDRjtJQUVBLElBQU1HLE9BQU85QixLQUFLLENBQUM0QixNQUFNLEVBQ25CRyxPQUFPLEFBQUMsR0FBd0JELE9BQXRCN0Isb0JBQW1CLEtBQVEsT0FBTDZCO0lBRXRDL0IsYUFBSSxDQUFDaUMsSUFBSSxDQUFDRCxNQUFNLFNBQUNoQixPQUFPa0I7UUFDdEJDLG1CQUFtQkQsY0FBYy9CLGtCQUFrQixTQUFDK0I7WUFDbEQsSUFBTUUsSUFBSSxBQUFDUCxRQUFRckIsWUFBYUwsa0JBQzFCa0MsSUFBSSxBQUFDLENBQUEsQUFBQzdCLFlBQVksSUFBSzhCLEtBQUtDLEtBQUssQ0FBQ1YsUUFBUXJCLFVBQVMsSUFBS0w7WUFFOURRLFNBQVM2QixTQUFTLENBQUNOLGNBQWNFLEdBQUdDLEdBQUcsU0FBQ3JCLE9BQU9MO2dCQUM3QzhCLE9BQU9DLE1BQU0sQ0FBQzlCLFNBQVM7b0JBQ3JCRCxVQUFBQTtnQkFDRjtnQkFFQWdCO1lBQ0Y7UUFDRjtJQUNGO0FBRUY7QUFFQSxTQUFTUSxtQkFBbUJRLEtBQUssRUFBRXhDLGdCQUFnQixFQUFFa0IsUUFBUTtJQUMzRCxJQUFNRSxRQUFRcEIsa0JBQ1JxQixTQUFTckIsa0JBQW1CLEdBQUc7SUFFckN3QyxNQUFNQyxNQUFNLENBQUNyQixPQUFPQyxRQUFRLFNBQUNSLE9BQU9rQjtRQUNsQ2IsU0FBU2E7SUFDWDtBQUNGIn0=