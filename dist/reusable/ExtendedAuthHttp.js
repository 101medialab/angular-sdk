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
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AuthHttp, AuthConfig, JwtHelper } from 'angular2-jwt';
var ExtendedAuthHttpConfig = (function () {
    function ExtendedAuthHttpConfig(baseUrl, authHttpConfig, APIs, refreshTokenAPI, JWToken, refreshBeforeExpire) {
        if (authHttpConfig === void 0) { authHttpConfig = {}; }
        if (APIs === void 0) { APIs = new Map(); }
        if (refreshTokenAPI === void 0) { refreshTokenAPI = ''; }
        if (JWToken === void 0) { JWToken = null; }
        if (refreshBeforeExpire === void 0) { refreshBeforeExpire = 60; }
        this.baseUrl = baseUrl;
        this.authHttpConfig = authHttpConfig;
        this.APIs = APIs;
        this.refreshTokenAPI = refreshTokenAPI;
        this.JWToken = JWToken;
        this.refreshBeforeExpire = refreshBeforeExpire;
    }
    return ExtendedAuthHttpConfig;
}());
export { ExtendedAuthHttpConfig };
var ExtendedAuthHttp = (function (_super) {
    __extends(ExtendedAuthHttp, _super);
    function ExtendedAuthHttp(extendedAuthHttpConfig, http, option) {
        var _this = _super.call(this, new AuthConfig(Object.assign(extendedAuthHttpConfig.authHttpConfig, {
            tokenGetter: function () { return _this.getToken(); },
            noJwtError: true
        })), http, option) || this;
        _this.extendedAuthHttpConfig = extendedAuthHttpConfig;
        _this.currentAPIid = null;
        _this.httpClient = http;
        _this.jwtHelper = new JwtHelper();
        _this.setToken(_this.extendedAuthHttpConfig.JWToken || '');
        return _this;
    }
    ExtendedAuthHttp.prototype.use = function (id) {
        this.currentAPIid = id;
        return this;
    };
    ExtendedAuthHttp.prototype.getCurrentAPIBaseUrl = function () {
        return this.extendedAuthHttpConfig.APIs.has(this.currentAPIid) ? this.extendedAuthHttpConfig.APIs.get(this.currentAPIid) : '';
    };
    ExtendedAuthHttp.prototype.get = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return this.__call('get', args);
    };
    ExtendedAuthHttp.prototype.post = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return this.__call('post', args);
    };
    ExtendedAuthHttp.prototype.put = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return this.__call('put', args);
    };
    ExtendedAuthHttp.prototype.patch = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return this.__call('patch', args);
    };
    ExtendedAuthHttp.prototype.delete = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return this.__call('delete', args);
    };
    ExtendedAuthHttp.prototype.__call = function (action, args) {
        args[0] =
            !/^(https?:\/\/|\/\/)/.test(args[0]) ?
                this.extendedAuthHttpConfig.baseUrl + this.getCurrentAPIBaseUrl() + (args[0] !== '' ? '/' + args[0] : '') :
                args[0];
        return _super.prototype[action].apply(this, args);
    };
    ExtendedAuthHttp.prototype.isTokenNeedToRefresh = function () {
        return !this.token || this.jwtHelper.isTokenExpired(this.token, this.extendedAuthHttpConfig.refreshBeforeExpire);
    };
    ExtendedAuthHttp.prototype.getToken = function () {
        return this.token;
    };
    ExtendedAuthHttp.prototype.setToken = function (token) {
        if (token && !this.jwtHelper.isTokenExpired(token))
            this.token = token;
        if (this.token) {
            if (this.isTokenNeedToRefresh()) {
                this.refreshToken();
            }
            this.refreshTokenBeforeExpire();
        }
    };
    ExtendedAuthHttp.prototype.refreshTokenBeforeExpire = function (seconds) {
        var _this = this;
        if (seconds === void 0) { seconds = 0; }
        seconds = seconds === 0 ? this.extendedAuthHttpConfig.refreshBeforeExpire : seconds;
        if (this.refreshTimeoutId) {
            clearTimeout(this.refreshTimeoutId);
        }
        var now = (new Date()).getTime(), then = this.jwtHelper.getTokenExpirationDate(this.token).getTime(), diff = Math.max((then - now), 0);
        this.refreshTimeoutId = setTimeout(function () { return _this.refreshToken(); }, (diff > 0x7FFFFFFF ? 0x7FFFFFFF : diff) - seconds * 1000);
    };
    ExtendedAuthHttp.prototype.refreshToken = function () {
        var _this = this;
        this.httpClient.get(this.extendedAuthHttpConfig.refreshTokenAPI, {
            headers: new Headers({
                "Authorization": "Bearer " + this.getToken()
            })
        }).subscribe(function (res) {
            _this.setToken(res.json()['token']);
        }, function () {
            console.error('ExtendedAuthHttp: Token refresh fails.');
        });
    };
    ExtendedAuthHttp.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    ExtendedAuthHttp.ctorParameters = function () { return [
        { type: ExtendedAuthHttpConfig, },
        { type: Http, },
        { type: RequestOptions, },
    ]; };
    return ExtendedAuthHttp;
}(AuthHttp));
export { ExtendedAuthHttp };
//# sourceMappingURL=ExtendedAuthHttp.js.map