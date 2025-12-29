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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbWFnZU1hcFBORy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IGppbXAgZnJvbSBcImppbXBcIjtcblxuaW1wb3J0IHsgYXN5bmNocm9ub3VzVXRpbGl0aWVzLCBmaWxlU3lzdGVtVXRpbGl0aWVzIH0gZnJvbSBcIm5lY2Vzc2FyeVwiO1xuXG5pbXBvcnQgeyBUUkFOU1BBUkVOVCwgQ09OVEVOVF9UWVBFIH0gZnJvbSBcIi4vY29uc3RhbnRzXCI7XG5pbXBvcnQgeyByZW1vdmVIaWRkZW5OYW1lcywgZGltZW5zaW9uRnJvbU5hbWVzIH0gZnJvbSBcIi4vdXRpbGl0aWVzL25hbWVzXCI7XG5cbmNvbnN0IHsgd2hpbHN0IH0gPSBhc3luY2hyb25vdXNVdGlsaXRpZXMsXG4gICAgICB7IHJlYWREaXJlY3RvcnkgfSA9IGZpbGVTeXN0ZW1VdGlsaXRpZXM7XG5cbmNvbnN0IEltYWdlID0gamltcDsgLy8vXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGltYWdlTWFwUE5HKG5hbWVzLCBpbWFnZURpcmVjdG9yeVBhdGgsIG92ZXJsYXlJbWFnZVNpemUsIHJlc3BvbnNlKSB7XG4gIGNvbnN0IG5hbWVzTGVuZ3RoID0gbmFtZXMubGVuZ3RoO1xuXG4gIGlmIChuYW1lc0xlbmd0aCA9PT0gMCkge1xuICAgIG5hbWVzID0gcmVhZERpcmVjdG9yeShpbWFnZURpcmVjdG9yeVBhdGgpO1xuICB9XG5cbiAgbmFtZXMgPSByZW1vdmVIaWRkZW5OYW1lcyhuYW1lcyk7XG5cbiAgY29uc3QgZGltZW5zaW9uID0gZGltZW5zaW9uRnJvbU5hbWVzKG5hbWVzKTtcblxuICBjcmVhdGVJbWFnZU1hcChkaW1lbnNpb24sIG92ZXJsYXlJbWFnZVNpemUsIChpbWFnZU1hcCkgPT4ge1xuICAgIGNvbnN0IGNvbnRleHQgPSB7XG4gICAgICBkaW1lbnNpb24sXG4gICAgICBuYW1lcyxcbiAgICAgIGltYWdlTWFwLFxuICAgICAgb3ZlcmxheUltYWdlU2l6ZSxcbiAgICAgIGltYWdlRGlyZWN0b3J5UGF0aFxuICAgIH07XG5cbiAgICB3aGlsc3QoY29tcG9zaXRlQ2FsbGJhY2ssICgpID0+IHtcbiAgICAgIGNvbnN0IHsgTUlNRV9QTkcgfSA9IGppbXAsXG4gICAgICAgICAgICB7IGltYWdlTWFwIH0gPSBjb250ZXh0O1xuXG4gICAgICBpbWFnZU1hcC5nZXRCdWZmZXIoTUlNRV9QTkcsIChlcnJvciwgYnVmZmVyKSA9PiB7XG4gICAgICAgIHJlc3BvbnNlLnNldChDT05URU5UX1RZUEUsIE1JTUVfUE5HKTtcblxuICAgICAgICByZXNwb25zZS5zZW5kKGJ1ZmZlcik7XG4gICAgICB9KTtcbiAgICB9LCBjb250ZXh0KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUltYWdlTWFwKGRpbWVuc2lvbiwgb3ZlcmxheUltYWdlU2l6ZSwgY2FsbGJhY2spIHtcbiAgY29uc3Qgc2l6ZSA9IGRpbWVuc2lvbiAqIG92ZXJsYXlJbWFnZVNpemUsXG4gICAgICAgIHdpZHRoID0gc2l6ZSxcdC8vL1xuICAgICAgICBoZWlnaHQgPSBzaXplLFx0Ly8vXG4gICAgICAgIGJhY2tncm91bmQgPSBUUkFOU1BBUkVOVDtcblxuICAgIG5ldyBJbWFnZSh3aWR0aCwgaGVpZ2h0LCBiYWNrZ3JvdW5kLCAoZXJyb3IsIGltYWdlTWFwKSA9PiB7XG4gICAgICBjYWxsYmFjayhpbWFnZU1hcCk7XG4gICAgfSk7XG4gIH1cblxuZnVuY3Rpb24gY29tcG9zaXRlQ2FsbGJhY2sobmV4dCwgZG9uZSwgY29udGV4dCwgaW5kZXgpIHtcbiAgY29uc3QgeyBuYW1lcywgZGltZW5zaW9uLCBpbWFnZU1hcCwgb3ZlcmxheUltYWdlU2l6ZSwgaW1hZ2VEaXJlY3RvcnlQYXRoIH0gPSBjb250ZXh0LFxuICAgICAgICBuYW1lc0xlbmd0aCA9IG5hbWVzLmxlbmd0aCxcbiAgICAgICAgbGFzdEluZGV4ID0gbmFtZXNMZW5ndGggLSAxO1xuXG4gIGlmIChpbmRleCA+IGxhc3RJbmRleCkge1xuICAgIGRvbmUoKTtcblxuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IG5hbWUgPSBuYW1lc1tpbmRleF0sXG4gICAgICAgIHBhdGggPSBgJHtpbWFnZURpcmVjdG9yeVBhdGh9LyR7bmFtZX1gO1xuXG4gIGppbXAucmVhZChwYXRoLCAoZXJyb3IsIG92ZXJsYXlJbWFnZSkgPT4ge1xuICAgIHJlc2l6ZU92ZXJsYXlJbWFnZShvdmVybGF5SW1hZ2UsIG92ZXJsYXlJbWFnZVNpemUsIChvdmVybGF5SW1hZ2UpID0+IHtcbiAgICAgIGNvbnN0IHggPSAoaW5kZXggJSBkaW1lbnNpb24pICogb3ZlcmxheUltYWdlU2l6ZSxcbiAgICAgICAgICAgIHkgPSAoKGRpbWVuc2lvbiAtIDEpIC0gTWF0aC5mbG9vcihpbmRleCAvIGRpbWVuc2lvbikpICogb3ZlcmxheUltYWdlU2l6ZTtcblxuICAgICAgaW1hZ2VNYXAuY29tcG9zaXRlKG92ZXJsYXlJbWFnZSwgeCwgeSwgKGVycm9yLCBpbWFnZU1hcCkgPT4ge1xuICAgICAgICBPYmplY3QuYXNzaWduKGNvbnRleHQsIHtcbiAgICAgICAgICBpbWFnZU1hcFxuICAgICAgICB9KTtcblxuICAgICAgICBuZXh0KCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHJlc2l6ZU92ZXJsYXlJbWFnZShpbWFnZSwgb3ZlcmxheUltYWdlU2l6ZSwgY2FsbGJhY2spIHtcbiAgY29uc3Qgd2lkdGggPSBvdmVybGF5SW1hZ2VTaXplLCAvLy9cbiAgICAgICAgaGVpZ2h0ID0gb3ZlcmxheUltYWdlU2l6ZTsgIC8vL1xuXG4gIGltYWdlLnJlc2l6ZSh3aWR0aCwgaGVpZ2h0LCAoZXJyb3IsIG92ZXJsYXlJbWFnZSkgPT4ge1xuICAgIGNhbGxiYWNrKG92ZXJsYXlJbWFnZSk7XG4gIH0pO1xufVxuIl0sIm5hbWVzIjpbImltYWdlTWFwUE5HIiwid2hpbHN0IiwiYXN5bmNocm9ub3VzVXRpbGl0aWVzIiwicmVhZERpcmVjdG9yeSIsImZpbGVTeXN0ZW1VdGlsaXRpZXMiLCJJbWFnZSIsImppbXAiLCJuYW1lcyIsImltYWdlRGlyZWN0b3J5UGF0aCIsIm92ZXJsYXlJbWFnZVNpemUiLCJyZXNwb25zZSIsIm5hbWVzTGVuZ3RoIiwibGVuZ3RoIiwicmVtb3ZlSGlkZGVuTmFtZXMiLCJkaW1lbnNpb24iLCJkaW1lbnNpb25Gcm9tTmFtZXMiLCJjcmVhdGVJbWFnZU1hcCIsImltYWdlTWFwIiwiY29udGV4dCIsImNvbXBvc2l0ZUNhbGxiYWNrIiwiTUlNRV9QTkciLCJnZXRCdWZmZXIiLCJlcnJvciIsImJ1ZmZlciIsInNldCIsIkNPTlRFTlRfVFlQRSIsInNlbmQiLCJjYWxsYmFjayIsInNpemUiLCJ3aWR0aCIsImhlaWdodCIsImJhY2tncm91bmQiLCJUUkFOU1BBUkVOVCIsIm5leHQiLCJkb25lIiwiaW5kZXgiLCJsYXN0SW5kZXgiLCJuYW1lIiwicGF0aCIsInJlYWQiLCJvdmVybGF5SW1hZ2UiLCJyZXNpemVPdmVybGF5SW1hZ2UiLCJ4IiwieSIsIk1hdGgiLCJmbG9vciIsImNvbXBvc2l0ZSIsIk9iamVjdCIsImFzc2lnbiIsImltYWdlIiwicmVzaXplIl0sIm1hcHBpbmdzIjoiQUFBQTs7OzsrQkFjQTs7O2VBQXdCQTs7OzJEQVpQO3lCQUUwQzt5QkFFakI7cUJBQ1k7Ozs7OztBQUV0RCxJQUFNLEFBQUVDLFNBQVdDLGdDQUFxQixDQUFoQ0QsUUFDRixBQUFFRSxnQkFBa0JDLDhCQUFtQixDQUFyQ0Q7QUFFUixJQUFNRSxRQUFRQyxhQUFJLEVBQUUsR0FBRztBQUVSLFNBQVNOLFlBQVlPLEtBQUssRUFBRUMsa0JBQWtCLEVBQUVDLGdCQUFnQixFQUFFQyxRQUFRO0lBQ3ZGLElBQU1DLGNBQWNKLE1BQU1LLE1BQU07SUFFaEMsSUFBSUQsZ0JBQWdCLEdBQUc7UUFDckJKLFFBQVFKLGNBQWNLO0lBQ3hCO0lBRUFELFFBQVFNLElBQUFBLHdCQUFpQixFQUFDTjtJQUUxQixJQUFNTyxZQUFZQyxJQUFBQSx5QkFBa0IsRUFBQ1I7SUFFckNTLGVBQWVGLFdBQVdMLGtCQUFrQixTQUFDUTtRQUMzQyxJQUFNQyxVQUFVO1lBQ2RKLFdBQUFBO1lBQ0FQLE9BQUFBO1lBQ0FVLFVBQUFBO1lBQ0FSLGtCQUFBQTtZQUNBRCxvQkFBQUE7UUFDRjtRQUVBUCxPQUFPa0IsbUJBQW1CO1lBQ3hCLElBQU0sQUFBRUMsV0FBYWQsYUFBSSxDQUFqQmMsVUFDRixBQUFFSCxhQUFhQyxRQUFiRDtZQUVSQSxXQUFTSSxTQUFTLENBQUNELFVBQVUsU0FBQ0UsT0FBT0M7Z0JBQ25DYixTQUFTYyxHQUFHLENBQUNDLHVCQUFZLEVBQUVMO2dCQUUzQlYsU0FBU2dCLElBQUksQ0FBQ0g7WUFDaEI7UUFDRixHQUFHTDtJQUNMO0FBQ0Y7QUFFQSxTQUFTRixlQUFlRixTQUFTLEVBQUVMLGdCQUFnQixFQUFFa0IsUUFBUTtJQUMzRCxJQUFNQyxPQUFPZCxZQUFZTCxrQkFDbkJvQixRQUFRRCxNQUNSRSxTQUFTRixNQUNURyxhQUFhQyxzQkFBVztJQUU1QixJQUFJM0IsTUFBTXdCLE9BQU9DLFFBQVFDLFlBQVksU0FBQ1QsT0FBT0w7UUFDM0NVLFNBQVNWO0lBQ1g7QUFDRjtBQUVGLFNBQVNFLGtCQUFrQmMsSUFBSSxFQUFFQyxJQUFJLEVBQUVoQixPQUFPLEVBQUVpQixLQUFLO0lBQ25ELElBQVE1QixRQUFxRVcsUUFBckVYLE9BQU9PLFlBQThESSxRQUE5REosV0FBV0csV0FBbURDLFFBQW5ERCxVQUFVUixtQkFBeUNTLFFBQXpDVCxrQkFBa0JELHFCQUF1QlUsUUFBdkJWLG9CQUNoREcsY0FBY0osTUFBTUssTUFBTSxFQUMxQndCLFlBQVl6QixjQUFjO0lBRWhDLElBQUl3QixRQUFRQyxXQUFXO1FBQ3JCRjtRQUVBO0lBQ0Y7SUFFQSxJQUFNRyxPQUFPOUIsS0FBSyxDQUFDNEIsTUFBTSxFQUNuQkcsT0FBTyxBQUFDLEdBQXdCRCxPQUF0QjdCLG9CQUFtQixLQUFRLE9BQUw2QjtJQUV0Qy9CLGFBQUksQ0FBQ2lDLElBQUksQ0FBQ0QsTUFBTSxTQUFDaEIsT0FBT2tCO1FBQ3RCQyxtQkFBbUJELGNBQWMvQixrQkFBa0IsU0FBQytCO1lBQ2xELElBQU1FLElBQUksQUFBQ1AsUUFBUXJCLFlBQWFMLGtCQUMxQmtDLElBQUksQUFBQyxDQUFBLEFBQUM3QixZQUFZLElBQUs4QixLQUFLQyxLQUFLLENBQUNWLFFBQVFyQixVQUFTLElBQUtMO1lBRTlEUSxTQUFTNkIsU0FBUyxDQUFDTixjQUFjRSxHQUFHQyxHQUFHLFNBQUNyQixPQUFPTDtnQkFDN0M4QixPQUFPQyxNQUFNLENBQUM5QixTQUFTO29CQUNyQkQsVUFBQUE7Z0JBQ0Y7Z0JBRUFnQjtZQUNGO1FBQ0Y7SUFDRjtBQUNGO0FBRUEsU0FBU1EsbUJBQW1CUSxLQUFLLEVBQUV4QyxnQkFBZ0IsRUFBRWtCLFFBQVE7SUFDM0QsSUFBTUUsUUFBUXBCLGtCQUNScUIsU0FBU3JCLGtCQUFtQixHQUFHO0lBRXJDd0MsTUFBTUMsTUFBTSxDQUFDckIsT0FBT0MsUUFBUSxTQUFDUixPQUFPa0I7UUFDbENiLFNBQVNhO0lBQ1g7QUFDRiJ9