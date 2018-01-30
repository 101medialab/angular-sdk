// Copied from https://angular.io/docs/ts/latest/guide/router.html#!#can-deactivate-guard
import { Injectable } from '@angular/core';
var CanDeactivateGuard = (function () {
    function CanDeactivateGuard() {
    }
    CanDeactivateGuard.prototype.canDeactivate = function (component) {
        return component.canDeactivate ? component.canDeactivate(component) : true;
    };
    CanDeactivateGuard.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    CanDeactivateGuard.ctorParameters = function () { return []; };
    return CanDeactivateGuard;
}());
export { CanDeactivateGuard };
//# sourceMappingURL=CanDeactivateGuard.js.map