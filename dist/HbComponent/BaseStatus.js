import { Injectable } from '@angular/core';
import { EventDispatcher } from './EventDispatcher';
import { BaseResource } from './BaseResource';
var BaseStatus = (function () {
    function BaseStatus(_evtDispatcher, _resource) {
        if (_resource === void 0) { _resource = null; }
        this._evtDispatcher = _evtDispatcher;
        this._resource = _resource;
        this._redirectToOnceLoggedIn = '';
        this._current = {
            username: null,
        };
    }
    BaseStatus.prototype.reset = function () {
        this._current.username = null;
    };
    Object.defineProperty(BaseStatus.prototype, "current", {
        get: function () {
            return this._current;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseStatus.prototype, "evtDispatcher", {
        get: function () {
            return this._evtDispatcher;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseStatus.prototype, "resource", {
        get: function () {
            return this._resource;
        },
        enumerable: true,
        configurable: true
    });
    BaseStatus.prototype.setCurrentUser = function (value) {
        this.current.username = value;
    };
    BaseStatus.prototype.getCurrentUser = function () {
        return this.current.username;
    };
    Object.defineProperty(BaseStatus.prototype, "redirectToOnceLoggedIn", {
        get: function () {
            return this._redirectToOnceLoggedIn;
        },
        set: function (value) {
            this._redirectToOnceLoggedIn = value;
        },
        enumerable: true,
        configurable: true
    });
    BaseStatus.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    BaseStatus.ctorParameters = function () { return [
        { type: EventDispatcher, },
        { type: BaseResource, },
    ]; };
    return BaseStatus;
}());
export { BaseStatus };
//# sourceMappingURL=BaseStatus.js.map