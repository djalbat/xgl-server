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
const _jimp = /*#__PURE__*/ _interop_require_default(require("jimp"));
const _necessary = require("necessary");
const _constants = require("./constants");
const _names = require("./utilities/names");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const { whilst } = _necessary.asynchronousUtilities, { readDirectory } = _necessary.fileSystemUtilities;
const Image = _jimp.default; ///
function imageMapPNG(names, imageDirectoryPath, overlayImageSize, response) {
    const namesLength = names.length;
    if (namesLength === 0) {
        names = readDirectory(imageDirectoryPath);
    }
    names = (0, _names.removeHiddenNames)(names);
    const dimension = (0, _names.dimensionFromNames)(names);
    createImageMap(dimension, overlayImageSize, (imageMap)=>{
        const context = {
            dimension,
            names,
            imageMap,
            overlayImageSize,
            imageDirectoryPath
        };
        whilst(compositeCallback, ()=>{
            const { MIME_PNG } = _jimp.default, { imageMap } = context;
            imageMap.getBuffer(MIME_PNG, (error, buffer)=>{
                response.set(_constants.CONTENT_TYPE, MIME_PNG);
                response.send(buffer);
            });
        }, context);
    });
}
function createImageMap(dimension, overlayImageSize, callback) {
    const size = dimension * overlayImageSize, width = size, height = size, background = _constants.TRANSPARENT;
    new Image(width, height, background, (error, imageMap)=>{
        callback(imageMap);
    });
}
function compositeCallback(next, done, context, index) {
    const { names, dimension, imageMap, overlayImageSize, imageDirectoryPath } = context, namesLength = names.length, lastIndex = namesLength - 1;
    if (index > lastIndex) {
        done();
        return;
    }
    const name = names[index], path = `${imageDirectoryPath}/${name}`;
    _jimp.default.read(path, (error, overlayImage)=>{
        resizeOverlayImage(overlayImage, overlayImageSize, (overlayImage)=>{
            const x = index % dimension * overlayImageSize, y = (dimension - 1 - Math.floor(index / dimension)) * overlayImageSize;
            imageMap.composite(overlayImage, x, y, (error, imageMap)=>{
                Object.assign(context, {
                    imageMap
                });
                next();
            });
        });
    });
}
function resizeOverlayImage(image, overlayImageSize, callback) {
    const width = overlayImageSize, height = overlayImageSize; ///
    image.resize(width, height, (error, overlayImage)=>{
        callback(overlayImage);
    });
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbWFnZU1hcFBORy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IGppbXAgZnJvbSBcImppbXBcIjtcblxuaW1wb3J0IHsgYXN5bmNocm9ub3VzVXRpbGl0aWVzLCBmaWxlU3lzdGVtVXRpbGl0aWVzIH0gZnJvbSBcIm5lY2Vzc2FyeVwiO1xuXG5pbXBvcnQgeyBUUkFOU1BBUkVOVCwgQ09OVEVOVF9UWVBFIH0gZnJvbSBcIi4vY29uc3RhbnRzXCI7XG5pbXBvcnQgeyByZW1vdmVIaWRkZW5OYW1lcywgZGltZW5zaW9uRnJvbU5hbWVzIH0gZnJvbSBcIi4vdXRpbGl0aWVzL25hbWVzXCI7XG5cbmNvbnN0IHsgd2hpbHN0IH0gPSBhc3luY2hyb25vdXNVdGlsaXRpZXMsXG4gICAgICB7IHJlYWREaXJlY3RvcnkgfSA9IGZpbGVTeXN0ZW1VdGlsaXRpZXM7XG5cbmNvbnN0IEltYWdlID0gamltcDsgLy8vXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGltYWdlTWFwUE5HKG5hbWVzLCBpbWFnZURpcmVjdG9yeVBhdGgsIG92ZXJsYXlJbWFnZVNpemUsIHJlc3BvbnNlKSB7XG4gIGNvbnN0IG5hbWVzTGVuZ3RoID0gbmFtZXMubGVuZ3RoO1xuXG4gIGlmIChuYW1lc0xlbmd0aCA9PT0gMCkge1xuICAgIG5hbWVzID0gcmVhZERpcmVjdG9yeShpbWFnZURpcmVjdG9yeVBhdGgpO1xuICB9XG5cbiAgbmFtZXMgPSByZW1vdmVIaWRkZW5OYW1lcyhuYW1lcyk7XG5cbiAgY29uc3QgZGltZW5zaW9uID0gZGltZW5zaW9uRnJvbU5hbWVzKG5hbWVzKTtcblxuICBjcmVhdGVJbWFnZU1hcChkaW1lbnNpb24sIG92ZXJsYXlJbWFnZVNpemUsIChpbWFnZU1hcCkgPT4ge1xuICAgIGNvbnN0IGNvbnRleHQgPSB7XG4gICAgICBkaW1lbnNpb24sXG4gICAgICBuYW1lcyxcbiAgICAgIGltYWdlTWFwLFxuICAgICAgb3ZlcmxheUltYWdlU2l6ZSxcbiAgICAgIGltYWdlRGlyZWN0b3J5UGF0aFxuICAgIH07XG5cbiAgICB3aGlsc3QoY29tcG9zaXRlQ2FsbGJhY2ssICgpID0+IHtcbiAgICAgIGNvbnN0IHsgTUlNRV9QTkcgfSA9IGppbXAsXG4gICAgICAgICAgICB7IGltYWdlTWFwIH0gPSBjb250ZXh0O1xuXG4gICAgICBpbWFnZU1hcC5nZXRCdWZmZXIoTUlNRV9QTkcsIChlcnJvciwgYnVmZmVyKSA9PiB7XG4gICAgICAgIHJlc3BvbnNlLnNldChDT05URU5UX1RZUEUsIE1JTUVfUE5HKTtcblxuICAgICAgICByZXNwb25zZS5zZW5kKGJ1ZmZlcik7XG4gICAgICB9KTtcbiAgICB9LCBjb250ZXh0KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUltYWdlTWFwKGRpbWVuc2lvbiwgb3ZlcmxheUltYWdlU2l6ZSwgY2FsbGJhY2spIHtcbiAgY29uc3Qgc2l6ZSA9IGRpbWVuc2lvbiAqIG92ZXJsYXlJbWFnZVNpemUsXG4gICAgICAgIHdpZHRoID0gc2l6ZSxcdC8vL1xuICAgICAgICBoZWlnaHQgPSBzaXplLFx0Ly8vXG4gICAgICAgIGJhY2tncm91bmQgPSBUUkFOU1BBUkVOVDtcblxuICAgIG5ldyBJbWFnZSh3aWR0aCwgaGVpZ2h0LCBiYWNrZ3JvdW5kLCAoZXJyb3IsIGltYWdlTWFwKSA9PiB7XG4gICAgICBjYWxsYmFjayhpbWFnZU1hcCk7XG4gICAgfSk7XG4gIH1cblxuZnVuY3Rpb24gY29tcG9zaXRlQ2FsbGJhY2sobmV4dCwgZG9uZSwgY29udGV4dCwgaW5kZXgpIHtcbiAgY29uc3QgeyBuYW1lcywgZGltZW5zaW9uLCBpbWFnZU1hcCwgb3ZlcmxheUltYWdlU2l6ZSwgaW1hZ2VEaXJlY3RvcnlQYXRoIH0gPSBjb250ZXh0LFxuICAgICAgICBuYW1lc0xlbmd0aCA9IG5hbWVzLmxlbmd0aCxcbiAgICAgICAgbGFzdEluZGV4ID0gbmFtZXNMZW5ndGggLSAxO1xuXG4gIGlmIChpbmRleCA+IGxhc3RJbmRleCkge1xuICAgIGRvbmUoKTtcblxuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IG5hbWUgPSBuYW1lc1tpbmRleF0sXG4gICAgICAgIHBhdGggPSBgJHtpbWFnZURpcmVjdG9yeVBhdGh9LyR7bmFtZX1gO1xuXG4gIGppbXAucmVhZChwYXRoLCAoZXJyb3IsIG92ZXJsYXlJbWFnZSkgPT4ge1xuICAgIHJlc2l6ZU92ZXJsYXlJbWFnZShvdmVybGF5SW1hZ2UsIG92ZXJsYXlJbWFnZVNpemUsIChvdmVybGF5SW1hZ2UpID0+IHtcbiAgICAgIGNvbnN0IHggPSAoaW5kZXggJSBkaW1lbnNpb24pICogb3ZlcmxheUltYWdlU2l6ZSxcbiAgICAgICAgICAgIHkgPSAoKGRpbWVuc2lvbiAtIDEpIC0gTWF0aC5mbG9vcihpbmRleCAvIGRpbWVuc2lvbikpICogb3ZlcmxheUltYWdlU2l6ZTtcblxuICAgICAgaW1hZ2VNYXAuY29tcG9zaXRlKG92ZXJsYXlJbWFnZSwgeCwgeSwgKGVycm9yLCBpbWFnZU1hcCkgPT4ge1xuICAgICAgICBPYmplY3QuYXNzaWduKGNvbnRleHQsIHtcbiAgICAgICAgICBpbWFnZU1hcFxuICAgICAgICB9KTtcblxuICAgICAgICBuZXh0KCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHJlc2l6ZU92ZXJsYXlJbWFnZShpbWFnZSwgb3ZlcmxheUltYWdlU2l6ZSwgY2FsbGJhY2spIHtcbiAgY29uc3Qgd2lkdGggPSBvdmVybGF5SW1hZ2VTaXplLCAvLy9cbiAgICAgICAgaGVpZ2h0ID0gb3ZlcmxheUltYWdlU2l6ZTsgIC8vL1xuXG4gIGltYWdlLnJlc2l6ZSh3aWR0aCwgaGVpZ2h0LCAoZXJyb3IsIG92ZXJsYXlJbWFnZSkgPT4ge1xuICAgIGNhbGxiYWNrKG92ZXJsYXlJbWFnZSk7XG4gIH0pO1xufVxuIl0sIm5hbWVzIjpbImltYWdlTWFwUE5HIiwid2hpbHN0IiwiYXN5bmNocm9ub3VzVXRpbGl0aWVzIiwicmVhZERpcmVjdG9yeSIsImZpbGVTeXN0ZW1VdGlsaXRpZXMiLCJJbWFnZSIsImppbXAiLCJuYW1lcyIsImltYWdlRGlyZWN0b3J5UGF0aCIsIm92ZXJsYXlJbWFnZVNpemUiLCJyZXNwb25zZSIsIm5hbWVzTGVuZ3RoIiwibGVuZ3RoIiwicmVtb3ZlSGlkZGVuTmFtZXMiLCJkaW1lbnNpb24iLCJkaW1lbnNpb25Gcm9tTmFtZXMiLCJjcmVhdGVJbWFnZU1hcCIsImltYWdlTWFwIiwiY29udGV4dCIsImNvbXBvc2l0ZUNhbGxiYWNrIiwiTUlNRV9QTkciLCJnZXRCdWZmZXIiLCJlcnJvciIsImJ1ZmZlciIsInNldCIsIkNPTlRFTlRfVFlQRSIsInNlbmQiLCJjYWxsYmFjayIsInNpemUiLCJ3aWR0aCIsImhlaWdodCIsImJhY2tncm91bmQiLCJUUkFOU1BBUkVOVCIsIm5leHQiLCJkb25lIiwiaW5kZXgiLCJsYXN0SW5kZXgiLCJuYW1lIiwicGF0aCIsInJlYWQiLCJvdmVybGF5SW1hZ2UiLCJyZXNpemVPdmVybGF5SW1hZ2UiLCJ4IiwieSIsIk1hdGgiLCJmbG9vciIsImNvbXBvc2l0ZSIsIk9iamVjdCIsImFzc2lnbiIsImltYWdlIiwicmVzaXplIl0sIm1hcHBpbmdzIjoiQUFBQTs7OzsrQkFjQTs7O2VBQXdCQTs7OzZEQVpQOzJCQUUwQzsyQkFFakI7dUJBQ1k7Ozs7OztBQUV0RCxNQUFNLEVBQUVDLE1BQU0sRUFBRSxHQUFHQyxnQ0FBcUIsRUFDbEMsRUFBRUMsYUFBYSxFQUFFLEdBQUdDLDhCQUFtQjtBQUU3QyxNQUFNQyxRQUFRQyxhQUFJLEVBQUUsR0FBRztBQUVSLFNBQVNOLFlBQVlPLEtBQUssRUFBRUMsa0JBQWtCLEVBQUVDLGdCQUFnQixFQUFFQyxRQUFRO0lBQ3ZGLE1BQU1DLGNBQWNKLE1BQU1LLE1BQU07SUFFaEMsSUFBSUQsZ0JBQWdCLEdBQUc7UUFDckJKLFFBQVFKLGNBQWNLO0lBQ3hCO0lBRUFELFFBQVFNLElBQUFBLHdCQUFpQixFQUFDTjtJQUUxQixNQUFNTyxZQUFZQyxJQUFBQSx5QkFBa0IsRUFBQ1I7SUFFckNTLGVBQWVGLFdBQVdMLGtCQUFrQixDQUFDUTtRQUMzQyxNQUFNQyxVQUFVO1lBQ2RKO1lBQ0FQO1lBQ0FVO1lBQ0FSO1lBQ0FEO1FBQ0Y7UUFFQVAsT0FBT2tCLG1CQUFtQjtZQUN4QixNQUFNLEVBQUVDLFFBQVEsRUFBRSxHQUFHZCxhQUFJLEVBQ25CLEVBQUVXLFFBQVEsRUFBRSxHQUFHQztZQUVyQkQsU0FBU0ksU0FBUyxDQUFDRCxVQUFVLENBQUNFLE9BQU9DO2dCQUNuQ2IsU0FBU2MsR0FBRyxDQUFDQyx1QkFBWSxFQUFFTDtnQkFFM0JWLFNBQVNnQixJQUFJLENBQUNIO1lBQ2hCO1FBQ0YsR0FBR0w7SUFDTDtBQUNGO0FBRUEsU0FBU0YsZUFBZUYsU0FBUyxFQUFFTCxnQkFBZ0IsRUFBRWtCLFFBQVE7SUFDM0QsTUFBTUMsT0FBT2QsWUFBWUwsa0JBQ25Cb0IsUUFBUUQsTUFDUkUsU0FBU0YsTUFDVEcsYUFBYUMsc0JBQVc7SUFFNUIsSUFBSTNCLE1BQU13QixPQUFPQyxRQUFRQyxZQUFZLENBQUNULE9BQU9MO1FBQzNDVSxTQUFTVjtJQUNYO0FBQ0Y7QUFFRixTQUFTRSxrQkFBa0JjLElBQUksRUFBRUMsSUFBSSxFQUFFaEIsT0FBTyxFQUFFaUIsS0FBSztJQUNuRCxNQUFNLEVBQUU1QixLQUFLLEVBQUVPLFNBQVMsRUFBRUcsUUFBUSxFQUFFUixnQkFBZ0IsRUFBRUQsa0JBQWtCLEVBQUUsR0FBR1UsU0FDdkVQLGNBQWNKLE1BQU1LLE1BQU0sRUFDMUJ3QixZQUFZekIsY0FBYztJQUVoQyxJQUFJd0IsUUFBUUMsV0FBVztRQUNyQkY7UUFFQTtJQUNGO0lBRUEsTUFBTUcsT0FBTzlCLEtBQUssQ0FBQzRCLE1BQU0sRUFDbkJHLE9BQU8sR0FBRzlCLG1CQUFtQixDQUFDLEVBQUU2QixNQUFNO0lBRTVDL0IsYUFBSSxDQUFDaUMsSUFBSSxDQUFDRCxNQUFNLENBQUNoQixPQUFPa0I7UUFDdEJDLG1CQUFtQkQsY0FBYy9CLGtCQUFrQixDQUFDK0I7WUFDbEQsTUFBTUUsSUFBSSxBQUFDUCxRQUFRckIsWUFBYUwsa0JBQzFCa0MsSUFBSSxBQUFDLENBQUEsQUFBQzdCLFlBQVksSUFBSzhCLEtBQUtDLEtBQUssQ0FBQ1YsUUFBUXJCLFVBQVMsSUFBS0w7WUFFOURRLFNBQVM2QixTQUFTLENBQUNOLGNBQWNFLEdBQUdDLEdBQUcsQ0FBQ3JCLE9BQU9MO2dCQUM3QzhCLE9BQU9DLE1BQU0sQ0FBQzlCLFNBQVM7b0JBQ3JCRDtnQkFDRjtnQkFFQWdCO1lBQ0Y7UUFDRjtJQUNGO0FBQ0Y7QUFFQSxTQUFTUSxtQkFBbUJRLEtBQUssRUFBRXhDLGdCQUFnQixFQUFFa0IsUUFBUTtJQUMzRCxNQUFNRSxRQUFRcEIsa0JBQ1JxQixTQUFTckIsa0JBQW1CLEdBQUc7SUFFckN3QyxNQUFNQyxNQUFNLENBQUNyQixPQUFPQyxRQUFRLENBQUNSLE9BQU9rQjtRQUNsQ2IsU0FBU2E7SUFDWDtBQUNGIn0=