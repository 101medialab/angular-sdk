import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Status } from "./status.svc";
var LogoutComponent = /** @class */ (function () {
    function LogoutComponent(status, router) {
        this.status = status;
        this.router = router;
    }
    LogoutComponent.prototype.logout = function () {
        var oldUser = Object.assign({}, this.status.getCurrentUser());
        this.status.reset();
        this.onLoggedOut(oldUser);
    };
    LogoutComponent.prototype.onLoggedOut = function (oldUser) {
        this.router.navigateByUrl('');
    };
    LogoutComponent.decorators = [
        { type: Component, args: [{
                    selector: 'hb-logout',
                    template: "\n        <a class=\"btn btn-warning\" href=\"javascript: void(0);\" (click)=\"logout()\">Logout</a>\n    "
                },] },
    ];
    /** @nocollapse */
    LogoutComponent.ctorParameters = function () { return [
        { type: Status, },
        { type: Router, },
    ]; };
    return LogoutComponent;
}());
export { LogoutComponent };
//# sourceMappingURL=logout.cpn.js.map