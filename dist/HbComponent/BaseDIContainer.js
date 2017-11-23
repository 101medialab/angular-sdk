import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Status as MainStatus } from '../reusable/modules/status.svc';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';
var BaseDIContainer = (function () {
    function BaseDIContainer(router, titleService, mainStatus, ngGA) {
        this._router = router;
        this._titleService = titleService;
        this._mainStatus = mainStatus;
        this._ngGA = ngGA;
    }
    Object.defineProperty(BaseDIContainer.prototype, "router", {
        get: function () {
            return this._router;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseDIContainer.prototype, "titleService", {
        get: function () {
            return this._titleService;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseDIContainer.prototype, "mainStatus", {
        get: function () {
            return this._mainStatus;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseDIContainer.prototype, "ngGA", {
        get: function () {
            return this._ngGA;
        },
        enumerable: true,
        configurable: true
    });
    BaseDIContainer.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    BaseDIContainer.ctorParameters = function () { return [
        { type: Router, },
        { type: Title, },
        { type: MainStatus, },
        { type: Angulartics2GoogleAnalytics, },
    ]; };
    return BaseDIContainer;
}());
export { BaseDIContainer };
//# sourceMappingURL=BaseDIContainer.js.map