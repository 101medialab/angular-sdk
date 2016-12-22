import { Inject, Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { ExtendedAuthHttp } from '../reusable/ExtendedAuthHttp';
import { EventDispatcher } from './EventDispatcher';
var BaseResource = (function () {
    function BaseResource(http, _baseUrl, headers, eventDispatcher) {
        if (headers === void 0) { headers = []; }
        this.http = http;
        this._baseUrl = _baseUrl;
        this.eventDispatcher = eventDispatcher;
        this._isCancelIfLoading = true;
        this.headers = new Headers();
        this.cache = new Map();
        this.currentLoading = new Map();
        this.headers = new Headers();
        this.addDefaultHeaders(headers);
    }
    BaseResource.prototype.createOne = function () {
    };
    BaseResource.prototype.addDefaultHeader = function (header) {
        this.headers.append(header.name, header.value);
        return this;
    };
    BaseResource.prototype.addDefaultHeaders = function (headers) {
        var _this = this;
        headers.forEach(function (header) { return _this.addDefaultHeader(header); });
        return this;
    };
    BaseResource.prototype.removeDefaultHeader = function (header) {
        this.headers.delete(typeof header === 'string' ? header : header.name);
        return this;
    };
    BaseResource.prototype.removeDefaultHeaders = function (headers) {
        var _this = this;
        headers.forEach(function (header) { return _this.removeDefaultHeader(header); });
        return this;
    };
    Object.defineProperty(BaseResource.prototype, "baseUrl", {
        get: function () {
            return this._baseUrl;
        },
        set: function (value) {
            this._baseUrl = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseResource.prototype, "isCancelIfLoading", {
        get: function () {
            return this._isCancelIfLoading;
        },
        set: function (value) {
            this._isCancelIfLoading = value;
        },
        enumerable: true,
        configurable: true
    });
    BaseResource.prototype.isLoading = function () {
        return this.currentLoading.size > 0;
    };
    BaseResource.prototype.cancelIfLoading = function (url) {
        if (this.isLoading() && this.currentLoading.has(url)) {
            this.cancelCurrentLoading(url);
        }
    };
    BaseResource.prototype.get = function (url, headers, forceReload, noLoadingScreen) {
        var _this = this;
        if (headers === void 0) { headers = []; }
        if (forceReload === void 0) { forceReload = false; }
        if (noLoadingScreen === void 0) { noLoadingScreen = false; }
        var reqHeaders = this.extendBaseHeader(headers), requestUrl = this._baseUrl + url;
        if (this.isCancelIfLoading) {
            this.cancelIfLoading(url);
        }
        if (!forceReload && this.cache.has(requestUrl)) {
            return new Promise(function (resolve, reject) {
                setTimeout(function () {
                    resolve(_this.cache.get(requestUrl));
                    _this.eventDispatcher.emit('HB.resource.LOAD_DONE');
                }, 250);
            });
        }
        return new Promise(function (resolve, reject) {
            if (!noLoadingScreen) {
                _this.eventDispatcher.emit('HB.resource.LOAD_BEGIN');
            }
            var containQuestionMark = requestUrl.indexOf('?') > -1, request = _this.http.get(requestUrl + (forceReload ? (containQuestionMark ? '&' : '?') + 'force=1&_cache_busting=' + Date.now() : ''), { headers: reqHeaders });
            request
                .subscribe(function (res) {
                res = res.json();
                var notCancelYet = _this.currentLoading.has(requestUrl);
                _this.currentLoading.delete(requestUrl);
                _this.cache.set(requestUrl, res);
                resolve(res);
                if (!noLoadingScreen && notCancelYet) {
                    _this.eventDispatcher.emit('HB.resource.LOAD_DONE');
                }
            }, function (error) {
                reject(error);
            });
            _this.currentLoading.set(requestUrl, { request: request, resolve: resolve, reject: reject });
        });
    };
    BaseResource.prototype.post = function (url, body, headers) {
        if (headers === void 0) { headers = []; }
        return this.send('post', url, body, headers);
    };
    BaseResource.prototype.send = function (action, url, body, headers, skipJSONConverting) {
        var _this = this;
        if (headers === void 0) { headers = []; }
        if (skipJSONConverting === void 0) { skipJSONConverting = false; }
        var reqHeaders = this.extendBaseHeader(headers), reqBody = typeof body === 'object' ? JSON.stringify(body) : body;
        if (this.isCancelIfLoading) {
            this.cancelIfLoading(url);
        }
        return new Promise(function (resolve, reject) {
            var request = _this.http[action](_this._baseUrl + url, reqBody, { headers: reqHeaders })
                .subscribe(function (res) {
                if (!skipJSONConverting) {
                    res = res.json();
                }
                _this.currentLoading.delete(url);
                resolve(res);
            });
            _this.currentLoading.set(url, { request: request, resolve: resolve, reject: reject });
        });
    };
    // This function might over kill some requests.
    // TODO: Currently when component destroys, it will call this method to prevent any callback to component no longer exist(as destroyed)
    //       However this method will trigger `EXCEPTION: Error: Uncaught (in promise): undefined` error, may be it need to terminate L83 and L109's promises by calling promise.done();
    //       http://stackoverflow.com/questions/28001722/how-to-catch-uncaught-exception-in-promise
    BaseResource.prototype.cancelAllCurrentLoading = function () {
        var _this = this;
        this.currentLoading.forEach(function (currentLoading, url) {
            _this.cancelCurrentLoading(url);
        });
    };
    BaseResource.prototype.cancelCurrentLoading = function (url) {
        var currentLoading = this.currentLoading.get(url);
        currentLoading.reject(new Error('BaseResource is cancelling loading. URL: ' + this.baseUrl + url));
    };
    BaseResource.prototype.extendBaseHeader = function (headers) {
        var reqHeaders = new Headers(this.headers);
        headers.forEach(function (header) { return reqHeaders.append(header.name, header.value); });
        return reqHeaders;
    };
    ;
    BaseResource.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    BaseResource.ctorParameters = function () { return [
        { type: ExtendedAuthHttp, decorators: [{ type: Inject, args: [ExtendedAuthHttp,] },] },
        { type: undefined, decorators: [{ type: Inject, args: ['',] },] },
        { type: Array, decorators: [{ type: Inject, args: [[],] },] },
        { type: EventDispatcher, decorators: [{ type: Inject, args: [EventDispatcher,] },] },
    ]; };
    return BaseResource;
}());
export { BaseResource };
//# sourceMappingURL=BaseResource.js.map