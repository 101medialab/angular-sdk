import { Pipe } from '@angular/core';
var Default = /** @class */ (function () {
    function Default() {
    }
    Default.prototype.transform = function (value, args) {
        if (args === void 0) { args = null; }
        return value ? value : args[0] ? args[0] : '';
    };
    Default.decorators = [
        { type: Pipe, args: [{
                    name: 'default'
                },] },
    ];
    /** @nocollapse */
    Default.ctorParameters = function () { return []; };
    return Default;
}());
export { Default };
//# sourceMappingURL=Default.js.map