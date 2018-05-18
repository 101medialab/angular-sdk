import { Component, Input } from '@angular/core';
import { Bindable } from '../Bindable';
var Backdrop = /** @class */ (function () {
    function Backdrop() {
        this.mode = 'screen';
    }
    Backdrop.decorators = [
        { type: Component, args: [{
                    selector: 'backdrop',
                    template: "\n        <div [ngClass]=\"{'cover-screen': mode === 'screen', 'cover-container': mode === 'container' }\"\n             [hidden]=\"!data.value\" (click)=\"data.value = false\"></div>\n     "
                },] },
    ];
    /** @nocollapse */
    Backdrop.ctorParameters = function () { return []; };
    Backdrop.propDecorators = {
        "data": [{ type: Input, args: ['showWhen',] },],
        "mode": [{ type: Input, args: ['mode',] },],
    };
    return Backdrop;
}());
export { Backdrop };
//# sourceMappingURL=Backdrop.cpn.js.map