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
import { ExtendedAuthHttp } from '../ExtendedAuthHttp';
import { EventDispatcher } from '../../HbComponent/EventDispatcher';
import { BaseResource } from '../../HbComponent/BaseResource';
import { HttpHeader } from '../../HbComponent/HttpHeader';
import { Config } from './Config';
var Resource = /** @class */ (function (_super) {
    __extends(Resource, _super);
    function Resource(http, config, eventDispatcher) {
        var _this = _super.call(this, http, config.API_DOMAIN_URL, [
            new HttpHeader('Accept', 'application/json'),
            new HttpHeader('Content-Type', 'application/json')
        ], eventDispatcher) || this;
        _this.config = config;
        return _this;
    }
    Resource.prototype.createOne = function () {
        return new this.config.ResourceClass();
    };
    Resource.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    Resource.ctorParameters = function () { return [
        { type: ExtendedAuthHttp, },
        { type: Config, },
        { type: EventDispatcher, },
    ]; };
    return Resource;
}(BaseResource));
export { Resource };
//# sourceMappingURL=resource.svc.js.map