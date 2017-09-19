import { Pipe } from "@angular/core";
var MapToIterable = /** @class */ (function () {
    function MapToIterable() {
    }
    MapToIterable.prototype.transform = function (object) {
        var result = [];
        for (var key in object) {
            if (object.hasOwnProperty(key)) {
                result.push({ key: key, val: object[key] });
            }
        }
        return result;
    };
    MapToIterable.decorators = [
        { type: Pipe, args: [{
                    name: 'mapToIterable'
                },] },
    ];
    /** @nocollapse */
    MapToIterable.ctorParameters = function () { return []; };
    return MapToIterable;
}());
export { MapToIterable };
//# sourceMappingURL=MapToIterable.js.map