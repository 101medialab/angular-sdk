import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Status } from '../reusable/modules/status.svc';
var CanActivateGuard = /** @class */ (function () {
    function CanActivateGuard(router, status) {
        this.router = router;
        this.status = status;
        this.defaultLoginUrl = 'login';
    }
    CanActivateGuard.prototype.canActivate = function (route, state) {
        if (!(this.status.getCurrentUser())) {
            this.status.redirectToOnceLoggedIn = state.url;
            this.router.navigateByUrl(this.defaultLoginUrl);
            return false;
        }
        return true;
    };
    CanActivateGuard.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    CanActivateGuard.ctorParameters = function () { return [
        { type: Router, },
        { type: Status, },
    ]; };
    return CanActivateGuard;
}());
export { CanActivateGuard };
//# sourceMappingURL=CanActivateGuard.js.map