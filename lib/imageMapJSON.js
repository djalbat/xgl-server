"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return imageMapJSON;
    }
});
var _necessary = require("necessary");
var _names = require("./utilities/names");
var readDirectory = _necessary.fileSystemUtilities.readDirectory;
function imageMapJSON(names, imageDirectoryPath, overlayImageSize, callback) {
    var namesLength = names.length;
    if (namesLength === 0) {
        names = readDirectory(imageDirectoryPath);
    }
    names = (0, _names.removeHiddenNames)(names);
    var dimension = (0, _names.dimensionFromNames)(names), length = dimension * overlayImageSize, imageMapJSON = names.reduce(function(imageMapJSON, name, index) {
        var left = index % dimension / dimension, bottom = Math.floor(index / dimension) / dimension, width = 1 / dimension, height = 1 / dimension, offset = 0.5; ///
        left = (left * length + offset) / length; ///
        bottom = (bottom * length + offset) / length; ///
        width = (width * length - offset) / length; ///
        height = (height * length - offset) / length; ///
        imageMapJSON[name] = {
            left: left,
            bottom: bottom,
            width: width,
            height: height
        };
        return imageMapJSON;
    }, {});
    callback(imageMapJSON);
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbWFnZU1hcEpTT04uanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7IGZpbGVTeXN0ZW1VdGlsaXRpZXMgfSBmcm9tIFwibmVjZXNzYXJ5XCI7XG5cbmltcG9ydCB7IHJlbW92ZUhpZGRlbk5hbWVzLCBkaW1lbnNpb25Gcm9tTmFtZXMgfSBmcm9tIFwiLi91dGlsaXRpZXMvbmFtZXNcIjtcblxuY29uc3QgeyByZWFkRGlyZWN0b3J5IH0gPSBmaWxlU3lzdGVtVXRpbGl0aWVzO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpbWFnZU1hcEpTT04obmFtZXMsIGltYWdlRGlyZWN0b3J5UGF0aCwgb3ZlcmxheUltYWdlU2l6ZSwgY2FsbGJhY2spIHtcbiAgY29uc3QgbmFtZXNMZW5ndGggPSBuYW1lcy5sZW5ndGg7XG5cbiAgaWYgKG5hbWVzTGVuZ3RoID09PSAwKSB7XG4gICAgbmFtZXMgPSByZWFkRGlyZWN0b3J5KGltYWdlRGlyZWN0b3J5UGF0aCk7XG4gIH1cblxuICBuYW1lcyA9IHJlbW92ZUhpZGRlbk5hbWVzKG5hbWVzKTtcblxuICBjb25zdCBkaW1lbnNpb24gPSBkaW1lbnNpb25Gcm9tTmFtZXMobmFtZXMpLFxuICAgICAgICBsZW5ndGggPSBkaW1lbnNpb24gKiBvdmVybGF5SW1hZ2VTaXplLFxuICAgICAgICBpbWFnZU1hcEpTT04gPSBuYW1lcy5yZWR1Y2UoKGltYWdlTWFwSlNPTiwgbmFtZSwgaW5kZXgpID0+IHtcbiAgICAgICAgICBsZXQgbGVmdCA9IChpbmRleCAlIGRpbWVuc2lvbikgLyBkaW1lbnNpb24sXG4gICAgICAgICAgICAgIGJvdHRvbSA9IE1hdGguZmxvb3IoaW5kZXggLyBkaW1lbnNpb24pIC8gZGltZW5zaW9uLFxuICAgICAgICAgICAgICB3aWR0aCA9IDEgLyBkaW1lbnNpb24sXG4gICAgICAgICAgICAgIGhlaWdodCA9IDEgLyBkaW1lbnNpb24sXG4gICAgICAgICAgICAgIG9mZnNldCA9IDAuNTsgLy8vXG5cbiAgICAgICAgICBsZWZ0ID0gKChsZWZ0ICogbGVuZ3RoKSArIG9mZnNldCkgLyBsZW5ndGg7IC8vL1xuICAgICAgICAgIGJvdHRvbSA9ICgoYm90dG9tICogbGVuZ3RoKSArIG9mZnNldCkgLyBsZW5ndGg7IC8vL1xuICAgICAgICAgIHdpZHRoID0gKCh3aWR0aCAqIGxlbmd0aCkgLSBvZmZzZXQpIC8gbGVuZ3RoOyAvLy9cbiAgICAgICAgICBoZWlnaHQgPSAoKGhlaWdodCAqIGxlbmd0aCkgLSBvZmZzZXQpIC8gbGVuZ3RoOyAvLy9cblxuICAgICAgICAgIGltYWdlTWFwSlNPTltuYW1lXSA9IHtcbiAgICAgICAgICAgIGxlZnQsXG4gICAgICAgICAgICBib3R0b20sXG4gICAgICAgICAgICB3aWR0aCxcbiAgICAgICAgICAgIGhlaWdodFxuICAgICAgICAgIH07XG5cbiAgICAgICAgICByZXR1cm4gaW1hZ2VNYXBKU09OO1xuICAgICAgICB9LCB7fSk7XG4gICAgICAgIFxuICBjYWxsYmFjayhpbWFnZU1hcEpTT04pO1xufVxuIl0sIm5hbWVzIjpbImltYWdlTWFwSlNPTiIsInJlYWREaXJlY3RvcnkiLCJmaWxlU3lzdGVtVXRpbGl0aWVzIiwibmFtZXMiLCJpbWFnZURpcmVjdG9yeVBhdGgiLCJvdmVybGF5SW1hZ2VTaXplIiwiY2FsbGJhY2siLCJuYW1lc0xlbmd0aCIsImxlbmd0aCIsInJlbW92ZUhpZGRlbk5hbWVzIiwiZGltZW5zaW9uIiwiZGltZW5zaW9uRnJvbU5hbWVzIiwicmVkdWNlIiwibmFtZSIsImluZGV4IiwibGVmdCIsImJvdHRvbSIsIk1hdGgiLCJmbG9vciIsIndpZHRoIiwiaGVpZ2h0Iiwib2Zmc2V0Il0sIm1hcHBpbmdzIjoiQUFBQTs7OzsrQkFRQTs7O2VBQXdCQTs7O3lCQU5ZO3FCQUVrQjtBQUV0RCxJQUFNLEFBQUVDLGdCQUFrQkMsOEJBQW1CLENBQXJDRDtBQUVPLFNBQVNELGFBQWFHLEtBQUssRUFBRUMsa0JBQWtCLEVBQUVDLGdCQUFnQixFQUFFQyxRQUFRO0lBQ3hGLElBQU1DLGNBQWNKLE1BQU1LLE1BQU07SUFFaEMsSUFBSUQsZ0JBQWdCLEdBQUc7UUFDckJKLFFBQVFGLGNBQWNHO0lBQ3hCO0lBRUFELFFBQVFNLElBQUFBLHdCQUFpQixFQUFDTjtJQUUxQixJQUFNTyxZQUFZQyxJQUFBQSx5QkFBa0IsRUFBQ1IsUUFDL0JLLFNBQVNFLFlBQVlMLGtCQUNyQkwsZUFBZUcsTUFBTVMsTUFBTSxDQUFDLFNBQUNaLGNBQWNhLE1BQU1DO1FBQy9DLElBQUlDLE9BQU8sQUFBQ0QsUUFBUUosWUFBYUEsV0FDN0JNLFNBQVNDLEtBQUtDLEtBQUssQ0FBQ0osUUFBUUosYUFBYUEsV0FDekNTLFFBQVEsSUFBSVQsV0FDWlUsU0FBUyxJQUFJVixXQUNiVyxTQUFTLEtBQUssR0FBRztRQUVyQk4sT0FBTyxBQUFDLENBQUEsQUFBQ0EsT0FBT1AsU0FBVWEsTUFBSyxJQUFLYixRQUFRLEdBQUc7UUFDL0NRLFNBQVMsQUFBQyxDQUFBLEFBQUNBLFNBQVNSLFNBQVVhLE1BQUssSUFBS2IsUUFBUSxHQUFHO1FBQ25EVyxRQUFRLEFBQUMsQ0FBQSxBQUFDQSxRQUFRWCxTQUFVYSxNQUFLLElBQUtiLFFBQVEsR0FBRztRQUNqRFksU0FBUyxBQUFDLENBQUEsQUFBQ0EsU0FBU1osU0FBVWEsTUFBSyxJQUFLYixRQUFRLEdBQUc7UUFFbkRSLFlBQVksQ0FBQ2EsS0FBSyxHQUFHO1lBQ25CRSxNQUFBQTtZQUNBQyxRQUFBQTtZQUNBRyxPQUFBQTtZQUNBQyxRQUFBQTtRQUNGO1FBRUEsT0FBT3BCO0lBQ1QsR0FBRyxDQUFDO0lBRVZNLFNBQVNOO0FBQ1gifQ==