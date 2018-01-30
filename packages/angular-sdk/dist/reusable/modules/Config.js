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
import { Inject, Injectable } from '@angular/core';
import { Config as BaseConfig } from '../Config';
import { NavItem } from '../../HbComponent/NavItem';
var Config = (function (_super) {
    __extends(Config, _super);
    function Config(resourceName, pluralResourceName, ResourceClass) {
        if (resourceName === void 0) { resourceName = ''; }
        if (pluralResourceName === void 0) { pluralResourceName = ''; }
        var _this = _super.call(this, {
            resourceName: resourceName,
            pluralResourceName: pluralResourceName,
            ResourceClass: ResourceClass
        }) || this;
        _this.route = { base: '', main: '' };
        _this.routeTypes = [
            _this.ROUTE_TYPE_MAIN,
            _this.ROUTE_TYPE_CREATE,
            _this.ROUTE_TYPE_LIST,
            _this.ROUTE_TYPE_VIEW,
            _this.ROUTE_TYPE_UPDATE
        ];
        _this.generateRouteNames();
        return _this;
    }
    Object.defineProperty(Config.prototype, "ROUTE_TYPE_MAIN", {
        get: function () {
            return 'main';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Config.prototype, "ROUTE_TYPE_CREATE", {
        get: function () {
            return 'create';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Config.prototype, "ROUTE_TYPE_LIST", {
        get: function () {
            return 'list';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Config.prototype, "ROUTE_TYPE_VIEW", {
        get: function () {
            return 'view';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Config.prototype, "ROUTE_TYPE_UPDATE", {
        get: function () {
            return 'update';
        },
        enumerable: true,
        configurable: true
    });
    Config.prototype.generateRouteNames = function () {
        this.route.base = '/' + this.getPluralResourceName();
        //let name = this.getPluralResourceName(true);
        //
        //this.routeTypes.forEach((routeType) => {
        //    this.route[routeType] = name + routeType.capitalize();
        //});
    };
    Config.prototype.getDomainTemplateUrl = function (url) {
        return Config.getTemplateUrl('/' + this.getPluralResourceName() + '/' + url);
    };
    Config.prototype.getBaseDomainBreadcrumb = function () {
        return [
            new NavItem('Home', 'Home'),
            new NavItem(this.getPluralResourceName(true), this.route.main),
        ];
    };
    Config.prototype.generateHTMLTitle = function (name) {
        if (name === void 0) { name = null; }
        return (name ? name + ' | ' : '') + this.getPluralResourceName(true) + ' | HypeDB';
    };
    Config.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    Config.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: ['',] },] },
        { type: undefined, decorators: [{ type: Inject, args: ['',] },] },
        { type: undefined, decorators: [{ type: Inject, args: [{},] },] },
    ]; };
    return Config;
}(BaseConfig));
export { Config };
//# sourceMappingURL=Config.js.map