var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { BaseComponent } from '../../HbComponent/BaseComponent';
var LoginComponent = /** @class */ (function (_super) {
    __extends(LoginComponent, _super);
    function LoginComponent(status, router, authHttp, mainStatus) {
        var _this = _super.call(this, status) || this;
        _this.status = status;
        _this.router = router;
        _this.authHttp = authHttp;
        _this.mainStatus = mainStatus;
        _this.username = '';
        _this.password = '';
        _this.loginBaseUrl = _this.status.resource.baseUrl + '/auth/';
        return _this;
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.username = '';
        this.password = '';
    };
    LoginComponent.prototype.resolveLoginPayload = function () {
        return {
            '_username': this.username,
            '_password': this.password
        };
    };
    LoginComponent.prototype.resolveLoginOptions = function () {
        return null;
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        this.authHttp.post(this.loginBaseUrl, this.resolveLoginPayload(), this.resolveLoginOptions()).subscribe(function (res) {
            if (_this.resolveIsLoggedIn(res)) {
                _this.password = '';
                _this.status.setCurrentUser(_this.username);
                _this.onLoggedIn(res);
            }
            else {
                _this.onLoginFailed(res);
            }
        }, function (res) {
            _this.onLoginFailed(res);
        });
        return false;
    };
    LoginComponent.prototype.resolveIsLoggedIn = function (res) {
        return true;
    };
    LoginComponent.prototype.onLoggedIn = function (res) {
        var url = this.status.redirectToOnceLoggedIn;
        url = url && url != '' ? url : this.status.redirectToOnceLoggedInDefault;
        if (url)
            this.router.navigateByUrl(url);
        this.emit('HB.user.LOGGED_IN');
    };
    LoginComponent.prototype.onLoginFailed = function (res) {
        this.emit('HB.user.LOGIN_FAILED');
    };
    return LoginComponent;
}(BaseComponent));
export { LoginComponent };
//# sourceMappingURL=login.cpn.js.map