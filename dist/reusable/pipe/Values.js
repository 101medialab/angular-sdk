import { Pipe } from '@angular/core';
var Values = /** @class */ (function () {
    function Values() {
    }
    Values.prototype.transform = function (value, args) {
        if (args === void 0) { args = null; }
        return !value ? value : Object.keys(value).map(function (key) { return value[key]; });
    };
    Values.decorators = [
        { type: Pipe, args: [{
                    name: 'values', pure: false
                },] },
    ];
    /** @nocollapse */
    Values.ctorParameters = function () { return []; };
    return Values;
}());
export { Values };
//# sourceMappingURL=Values.js.map