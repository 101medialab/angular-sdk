"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var Config_1 = require('../../reusable/Config');
var NavItem_1 = require("../../Entity/NavItem");
var Config = (function (_super) {
    __extends(Config, _super);
    function Config(resourceName, pluralResourceName, ResourceClass) {
        if (resourceName === void 0) { resourceName = ''; }
        if (pluralResourceName === void 0) { pluralResourceName = ''; }
        _super.call(this, {
            resourceName: resourceName,
            pluralResourceName: pluralResourceName,
            ResourceClass: ResourceClass,
            apiBaseUrl: '/api'
        });
        this.route = {};
        this.routeTypes = [
            this.ROUTE_TYPE_MAIN,
            this.ROUTE_TYPE_CREATE,
            this.ROUTE_TYPE_LIST,
            this.ROUTE_TYPE_VIEW,
            this.ROUTE_TYPE_UPDATE
        ];
        this.generateRouteNames();
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
        //var name = this.getPluralResourceName(true);
        //
        //this.routeTypes.forEach((routeType) => {
        //    this.route[routeType] = name + routeType.capitalize();
        //});
    };
    Config.getProfileTemplateUrl = function (ProfileName) {
        return Config.getTemplateUrl('profile/' + ProfileName);
    };
    Config.prototype.getDomainTemplateUrl = function (url) {
        return Config.getTemplateUrl('/' + this.getPluralResourceName() + '/' + url);
    };
    Config.prototype.getBaseDomainBreadcrumb = function () {
        return [
            new NavItem_1.NavItem('Home', 'Home'),
            new NavItem_1.NavItem(this.getPluralResourceName(true), this.route.main),
        ];
    };
    Config.prototype.getProfileBreadcrumbStack = function (profile, routeType) {
        if (routeType === void 0) { routeType = ''; }
        var base = this.getBaseDomainBreadcrumb();
        base.push(new NavItem_1.NavItem(profile.name, this.route.view, {
            slug: profile.slug
        }));
        if ([this.ROUTE_TYPE_CREATE, this.ROUTE_TYPE_UPDATE].indexOf(routeType) > -1) {
            base.push(new NavItem_1.NavItem(routeType.capitalize(), this.route[routeType], this.ROUTE_TYPE_UPDATE ? {
                slug: profile.slug
            } : null));
        }
        return base;
    };
    Config.prototype.generateHTMLTitle = function (name) {
        if (name === void 0) { name = null; }
        return (name ? name + ' | ' : '') + this.getPluralResourceName(true) + ' | HypeDB';
    };
    Config = __decorate([
        core_1.Injectable()
    ], Config);
    return Config;
}(Config_1.Config));
exports.Config = Config;
//# sourceMappingURL=Config.js.map