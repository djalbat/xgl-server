'use strict';

var necessary = require('necessary');

var namesUtilities = require('./utilities/names');

var fileSystemUtilities = necessary.fileSystemUtilities,
    readDirectory = fileSystemUtilities.readDirectory,
    dimensionFromNames = namesUtilities.dimensionFromNames;


function imageMapJSON(imageDirectoryPath, callback) {
      var names = readDirectory(imageDirectoryPath),
          dimension = dimensionFromNames(names),
          imageMapJSON = names.reduce(function (imageMapJSON, name, index) {
            var left = index % dimension / dimension,
                bottom = Math.floor(index / dimension) / dimension,
                width = 1 / dimension,
                height = 1 / dimension;

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

module.exports = imageMapJSON;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9pbWFnZU1hcEpTT04uanMiXSwibmFtZXMiOlsibmVjZXNzYXJ5IiwicmVxdWlyZSIsIm5hbWVzVXRpbGl0aWVzIiwiZmlsZVN5c3RlbVV0aWxpdGllcyIsInJlYWREaXJlY3RvcnkiLCJkaW1lbnNpb25Gcm9tTmFtZXMiLCJpbWFnZU1hcEpTT04iLCJpbWFnZURpcmVjdG9yeVBhdGgiLCJjYWxsYmFjayIsIm5hbWVzIiwiZGltZW5zaW9uIiwicmVkdWNlIiwibmFtZSIsImluZGV4IiwibGVmdCIsImJvdHRvbSIsIk1hdGgiLCJmbG9vciIsIndpZHRoIiwiaGVpZ2h0IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUEsSUFBTUEsWUFBWUMsUUFBUSxXQUFSLENBQWxCOztBQUVBLElBQU1DLGlCQUFpQkQsUUFBUSxtQkFBUixDQUF2Qjs7QUFFTSxJQUFFRSxtQkFBRixHQUEwQkgsU0FBMUIsQ0FBRUcsbUJBQUY7QUFBQSxJQUNFQyxhQURGLEdBQ29CRCxtQkFEcEIsQ0FDRUMsYUFERjtBQUFBLElBRUVDLGtCQUZGLEdBRXlCSCxjQUZ6QixDQUVFRyxrQkFGRjs7O0FBSU4sU0FBU0MsWUFBVCxDQUFzQkMsa0JBQXRCLEVBQTBDQyxRQUExQyxFQUFvRDtBQUNsRCxVQUFNQyxRQUFRTCxjQUFjRyxrQkFBZCxDQUFkO0FBQUEsVUFDTUcsWUFBWUwsbUJBQW1CSSxLQUFuQixDQURsQjtBQUFBLFVBRU1ILGVBQWVHLE1BQU1FLE1BQU4sQ0FBYSxVQUFTTCxZQUFULEVBQXVCTSxJQUF2QixFQUE2QkMsS0FBN0IsRUFBb0M7QUFDOUQsZ0JBQU1DLE9BQVFELFFBQVFILFNBQVQsR0FBc0JBLFNBQW5DO0FBQUEsZ0JBQ01LLFNBQVNDLEtBQUtDLEtBQUwsQ0FBV0osUUFBUUgsU0FBbkIsSUFBZ0NBLFNBRC9DO0FBQUEsZ0JBRU1RLFFBQVEsSUFBSVIsU0FGbEI7QUFBQSxnQkFHTVMsU0FBUyxJQUFJVCxTQUhuQjs7QUFLQUoseUJBQWFNLElBQWIsSUFBcUI7QUFDbkJFLHdCQUFNQSxJQURhO0FBRW5CQywwQkFBUUEsTUFGVztBQUduQkcseUJBQU9BLEtBSFk7QUFJbkJDLDBCQUFRQTtBQUpXLGFBQXJCOztBQU9BLG1CQUFPYixZQUFQO0FBQ0QsT0FkYyxFQWNaLEVBZFksQ0FGckI7O0FBa0JBRSxlQUFTRixZQUFUO0FBQ0Q7O0FBRURjLE9BQU9DLE9BQVAsR0FBaUJmLFlBQWpCIiwiZmlsZSI6ImltYWdlTWFwSlNPTi5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuY29uc3QgbmVjZXNzYXJ5ID0gcmVxdWlyZSgnbmVjZXNzYXJ5Jyk7XG5cbmNvbnN0IG5hbWVzVXRpbGl0aWVzID0gcmVxdWlyZSgnLi91dGlsaXRpZXMvbmFtZXMnKTtcblxuY29uc3QgeyBmaWxlU3lzdGVtVXRpbGl0aWVzIH0gPSBuZWNlc3NhcnksXG4gICAgICB7IHJlYWREaXJlY3RvcnkgfSA9IGZpbGVTeXN0ZW1VdGlsaXRpZXMsXG4gICAgICB7IGRpbWVuc2lvbkZyb21OYW1lcyB9ID0gbmFtZXNVdGlsaXRpZXM7XG5cbmZ1bmN0aW9uIGltYWdlTWFwSlNPTihpbWFnZURpcmVjdG9yeVBhdGgsIGNhbGxiYWNrKSB7XG4gIGNvbnN0IG5hbWVzID0gcmVhZERpcmVjdG9yeShpbWFnZURpcmVjdG9yeVBhdGgpLFxuICAgICAgICBkaW1lbnNpb24gPSBkaW1lbnNpb25Gcm9tTmFtZXMobmFtZXMpLFxuICAgICAgICBpbWFnZU1hcEpTT04gPSBuYW1lcy5yZWR1Y2UoZnVuY3Rpb24oaW1hZ2VNYXBKU09OLCBuYW1lLCBpbmRleCkge1xuICAgICAgICAgIGNvbnN0IGxlZnQgPSAoaW5kZXggJSBkaW1lbnNpb24pIC8gZGltZW5zaW9uLFxuICAgICAgICAgICAgICAgIGJvdHRvbSA9IE1hdGguZmxvb3IoaW5kZXggLyBkaW1lbnNpb24pIC8gZGltZW5zaW9uLFxuICAgICAgICAgICAgICAgIHdpZHRoID0gMSAvIGRpbWVuc2lvbixcbiAgICAgICAgICAgICAgICBoZWlnaHQgPSAxIC8gZGltZW5zaW9uO1xuXG4gICAgICAgICAgaW1hZ2VNYXBKU09OW25hbWVdID0ge1xuICAgICAgICAgICAgbGVmdDogbGVmdCxcbiAgICAgICAgICAgIGJvdHRvbTogYm90dG9tLFxuICAgICAgICAgICAgd2lkdGg6IHdpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0OiBoZWlnaHRcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgcmV0dXJuIGltYWdlTWFwSlNPTjtcbiAgICAgICAgfSwge30pO1xuICAgICAgICBcbiAgY2FsbGJhY2soaW1hZ2VNYXBKU09OKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbWFnZU1hcEpTT047XG4iXX0=