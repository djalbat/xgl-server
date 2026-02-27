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
const _necessary = require("necessary");
const _names = require("./utilities/names");
const { readDirectory } = _necessary.fileSystemUtilities;
function imageMapJSON(names, imageDirectoryPath, overlayImageSize, callback) {
    const namesLength = names.length;
    if (namesLength === 0) {
        names = readDirectory(imageDirectoryPath);
    }
    names = (0, _names.removeHiddenNames)(names);
    const dimension = (0, _names.dimensionFromNames)(names), length = dimension * overlayImageSize, imageMapJSON = names.reduce((imageMapJSON, name, index)=>{
        let left = index % dimension / dimension, bottom = Math.floor(index / dimension) / dimension, width = 1 / dimension, height = 1 / dimension, offset = 0.5; ///
        left = (left * length + offset) / length; ///
        bottom = (bottom * length + offset) / length; ///
        width = (width * length - offset) / length; ///
        height = (height * length - offset) / length; ///
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbWFnZU1hcEpTT04uanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7IGZpbGVTeXN0ZW1VdGlsaXRpZXMgfSBmcm9tIFwibmVjZXNzYXJ5XCI7XG5cbmltcG9ydCB7IHJlbW92ZUhpZGRlbk5hbWVzLCBkaW1lbnNpb25Gcm9tTmFtZXMgfSBmcm9tIFwiLi91dGlsaXRpZXMvbmFtZXNcIjtcblxuY29uc3QgeyByZWFkRGlyZWN0b3J5IH0gPSBmaWxlU3lzdGVtVXRpbGl0aWVzO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpbWFnZU1hcEpTT04obmFtZXMsIGltYWdlRGlyZWN0b3J5UGF0aCwgb3ZlcmxheUltYWdlU2l6ZSwgY2FsbGJhY2spIHtcbiAgY29uc3QgbmFtZXNMZW5ndGggPSBuYW1lcy5sZW5ndGg7XG5cbiAgaWYgKG5hbWVzTGVuZ3RoID09PSAwKSB7XG4gICAgbmFtZXMgPSByZWFkRGlyZWN0b3J5KGltYWdlRGlyZWN0b3J5UGF0aCk7XG4gIH1cblxuICBuYW1lcyA9IHJlbW92ZUhpZGRlbk5hbWVzKG5hbWVzKTtcblxuICBjb25zdCBkaW1lbnNpb24gPSBkaW1lbnNpb25Gcm9tTmFtZXMobmFtZXMpLFxuICAgICAgICBsZW5ndGggPSBkaW1lbnNpb24gKiBvdmVybGF5SW1hZ2VTaXplLFxuICAgICAgICBpbWFnZU1hcEpTT04gPSBuYW1lcy5yZWR1Y2UoKGltYWdlTWFwSlNPTiwgbmFtZSwgaW5kZXgpID0+IHtcbiAgICAgICAgICBsZXQgbGVmdCA9IChpbmRleCAlIGRpbWVuc2lvbikgLyBkaW1lbnNpb24sXG4gICAgICAgICAgICAgIGJvdHRvbSA9IE1hdGguZmxvb3IoaW5kZXggLyBkaW1lbnNpb24pIC8gZGltZW5zaW9uLFxuICAgICAgICAgICAgICB3aWR0aCA9IDEgLyBkaW1lbnNpb24sXG4gICAgICAgICAgICAgIGhlaWdodCA9IDEgLyBkaW1lbnNpb24sXG4gICAgICAgICAgICAgIG9mZnNldCA9IDAuNTsgLy8vXG5cbiAgICAgICAgICBsZWZ0ID0gKChsZWZ0ICogbGVuZ3RoKSArIG9mZnNldCkgLyBsZW5ndGg7IC8vL1xuICAgICAgICAgIGJvdHRvbSA9ICgoYm90dG9tICogbGVuZ3RoKSArIG9mZnNldCkgLyBsZW5ndGg7IC8vL1xuICAgICAgICAgIHdpZHRoID0gKCh3aWR0aCAqIGxlbmd0aCkgLSBvZmZzZXQpIC8gbGVuZ3RoOyAvLy9cbiAgICAgICAgICBoZWlnaHQgPSAoKGhlaWdodCAqIGxlbmd0aCkgLSBvZmZzZXQpIC8gbGVuZ3RoOyAvLy9cblxuICAgICAgICAgIGltYWdlTWFwSlNPTltuYW1lXSA9IHtcbiAgICAgICAgICAgIGxlZnQsXG4gICAgICAgICAgICBib3R0b20sXG4gICAgICAgICAgICB3aWR0aCxcbiAgICAgICAgICAgIGhlaWdodFxuICAgICAgICAgIH07XG5cbiAgICAgICAgICByZXR1cm4gaW1hZ2VNYXBKU09OO1xuICAgICAgICB9LCB7fSk7XG4gICAgICAgIFxuICBjYWxsYmFjayhpbWFnZU1hcEpTT04pO1xufVxuIl0sIm5hbWVzIjpbImltYWdlTWFwSlNPTiIsInJlYWREaXJlY3RvcnkiLCJmaWxlU3lzdGVtVXRpbGl0aWVzIiwibmFtZXMiLCJpbWFnZURpcmVjdG9yeVBhdGgiLCJvdmVybGF5SW1hZ2VTaXplIiwiY2FsbGJhY2siLCJuYW1lc0xlbmd0aCIsImxlbmd0aCIsInJlbW92ZUhpZGRlbk5hbWVzIiwiZGltZW5zaW9uIiwiZGltZW5zaW9uRnJvbU5hbWVzIiwicmVkdWNlIiwibmFtZSIsImluZGV4IiwibGVmdCIsImJvdHRvbSIsIk1hdGgiLCJmbG9vciIsIndpZHRoIiwiaGVpZ2h0Iiwib2Zmc2V0Il0sIm1hcHBpbmdzIjoiQUFBQTs7OzsrQkFRQTs7O2VBQXdCQTs7OzJCQU5ZO3VCQUVrQjtBQUV0RCxNQUFNLEVBQUVDLGFBQWEsRUFBRSxHQUFHQyw4QkFBbUI7QUFFOUIsU0FBU0YsYUFBYUcsS0FBSyxFQUFFQyxrQkFBa0IsRUFBRUMsZ0JBQWdCLEVBQUVDLFFBQVE7SUFDeEYsTUFBTUMsY0FBY0osTUFBTUssTUFBTTtJQUVoQyxJQUFJRCxnQkFBZ0IsR0FBRztRQUNyQkosUUFBUUYsY0FBY0c7SUFDeEI7SUFFQUQsUUFBUU0sSUFBQUEsd0JBQWlCLEVBQUNOO0lBRTFCLE1BQU1PLFlBQVlDLElBQUFBLHlCQUFrQixFQUFDUixRQUMvQkssU0FBU0UsWUFBWUwsa0JBQ3JCTCxlQUFlRyxNQUFNUyxNQUFNLENBQUMsQ0FBQ1osY0FBY2EsTUFBTUM7UUFDL0MsSUFBSUMsT0FBTyxBQUFDRCxRQUFRSixZQUFhQSxXQUM3Qk0sU0FBU0MsS0FBS0MsS0FBSyxDQUFDSixRQUFRSixhQUFhQSxXQUN6Q1MsUUFBUSxJQUFJVCxXQUNaVSxTQUFTLElBQUlWLFdBQ2JXLFNBQVMsS0FBSyxHQUFHO1FBRXJCTixPQUFPLEFBQUMsQ0FBQSxBQUFDQSxPQUFPUCxTQUFVYSxNQUFLLElBQUtiLFFBQVEsR0FBRztRQUMvQ1EsU0FBUyxBQUFDLENBQUEsQUFBQ0EsU0FBU1IsU0FBVWEsTUFBSyxJQUFLYixRQUFRLEdBQUc7UUFDbkRXLFFBQVEsQUFBQyxDQUFBLEFBQUNBLFFBQVFYLFNBQVVhLE1BQUssSUFBS2IsUUFBUSxHQUFHO1FBQ2pEWSxTQUFTLEFBQUMsQ0FBQSxBQUFDQSxTQUFTWixTQUFVYSxNQUFLLElBQUtiLFFBQVEsR0FBRztRQUVuRFIsWUFBWSxDQUFDYSxLQUFLLEdBQUc7WUFDbkJFO1lBQ0FDO1lBQ0FHO1lBQ0FDO1FBQ0Y7UUFFQSxPQUFPcEI7SUFDVCxHQUFHLENBQUM7SUFFVk0sU0FBU047QUFDWCJ9