"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get dimensionFromNames () {
        return dimensionFromNames;
    },
    get removeHiddenNames () {
        return removeHiddenNames;
    }
});
function removeHiddenNames(names) {
    names = names.reduce(function(names, name) {
        var nameHiddenName = /^\./.test(name);
        if (!nameHiddenName) {
            names.push(name);
        }
        return names;
    }, []);
    return names;
}
function dimensionFromNames(names) {
    var namesLength = names.length, dimension = Math.ceil(Math.sqrt(namesLength)); ///
    return dimension;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlsaXRpZXMvbmFtZXMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVIaWRkZW5OYW1lcyhuYW1lcykge1xuICBuYW1lcyA9IG5hbWVzLnJlZHVjZSgobmFtZXMsIG5hbWUpID0+IHtcbiAgICBjb25zdCBuYW1lSGlkZGVuTmFtZSA9IC9eXFwuLy50ZXN0KG5hbWUpO1xuXG4gICAgaWYgKCFuYW1lSGlkZGVuTmFtZSkge1xuICAgICAgbmFtZXMucHVzaChuYW1lKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmFtZXM7XG4gIH0sIFtdKTtcblxuICByZXR1cm4gbmFtZXM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkaW1lbnNpb25Gcm9tTmFtZXMobmFtZXMpIHtcbiAgY29uc3QgbmFtZXNMZW5ndGggPSBuYW1lcy5sZW5ndGgsXG4gICAgICAgIGRpbWVuc2lvbiA9IE1hdGguY2VpbChNYXRoLnNxcnQobmFtZXNMZW5ndGgpKTsgLy8vXG5cbiAgcmV0dXJuIGRpbWVuc2lvbjtcbn1cbiJdLCJuYW1lcyI6WyJkaW1lbnNpb25Gcm9tTmFtZXMiLCJyZW1vdmVIaWRkZW5OYW1lcyIsIm5hbWVzIiwicmVkdWNlIiwibmFtZSIsIm5hbWVIaWRkZW5OYW1lIiwidGVzdCIsInB1c2giLCJuYW1lc0xlbmd0aCIsImxlbmd0aCIsImRpbWVuc2lvbiIsIk1hdGgiLCJjZWlsIiwic3FydCJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7O1FBZ0JnQkE7ZUFBQUE7O1FBZEFDO2VBQUFBOzs7QUFBVCxTQUFTQSxrQkFBa0JDLEtBQUs7SUFDckNBLFFBQVFBLE1BQU1DLE1BQU0sQ0FBQyxTQUFDRCxPQUFPRTtRQUMzQixJQUFNQyxpQkFBaUIsTUFBTUMsSUFBSSxDQUFDRjtRQUVsQyxJQUFJLENBQUNDLGdCQUFnQjtZQUNuQkgsTUFBTUssSUFBSSxDQUFDSDtRQUNiO1FBRUEsT0FBT0Y7SUFDVCxHQUFHLEVBQUU7SUFFTCxPQUFPQTtBQUNUO0FBRU8sU0FBU0YsbUJBQW1CRSxLQUFLO0lBQ3RDLElBQU1NLGNBQWNOLE1BQU1PLE1BQU0sRUFDMUJDLFlBQVlDLEtBQUtDLElBQUksQ0FBQ0QsS0FBS0UsSUFBSSxDQUFDTCxlQUFlLEdBQUc7SUFFeEQsT0FBT0U7QUFDVCJ9