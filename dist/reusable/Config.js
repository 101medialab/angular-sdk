import { Inject } from "@angular/core";
var Config = /** @class */ (function () {
    function Config(_a) {
        var resourceName = _a.resourceName, pluralResourceName = _a.pluralResourceName, ResourceClass = _a.ResourceClass;
        this._API_DOMAIN_URL = '';
        this.resourceName = '';
        this.pluralResourceName = '';
        this.ResourceClass = null;
        this.resourceName = resourceName;
        this.pluralResourceName = pluralResourceName;
        this.ResourceClass = ResourceClass;
        if (resourceName != '' && pluralResourceName === '') {
            this.pluralResourceName = resourceName + 's';
        }
        this._API_DOMAIN_URL = (resourceName && resourceName != '' ? this.pluralResourceName : '');
    }
    Object.defineProperty(Config, "baseTemplateUrl", {
        get: function () {
            return '/bundles/hypebeastwiki/scripts/templates/';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Config, "templateSuffix", {
        get: function () {
            return '.tpl.html';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Config.prototype, "API_DOMAIN_URL", {
        get: function () {
            return this._API_DOMAIN_URL;
        },
        enumerable: true,
        configurable: true
    });
    Config.getTemplateUrl = function (url, free) {
        if (free === void 0) { free = false; }
        return Config.baseTemplateUrl + url + (free ? '' : Config.templateSuffix) + '?' + window._hypebeast.version;
    };
    Config.prototype.getResourceName = function (isCapitalize) {
        if (isCapitalize === void 0) { isCapitalize = false; }
        return isCapitalize ?
            this.resourceName.capitalize() :
            this.resourceName;
    };
    Config.prototype.getPluralResourceName = function (isCapitalize) {
        if (isCapitalize === void 0) { isCapitalize = false; }
        return isCapitalize ?
            this.pluralResourceName.capitalize() :
            this.pluralResourceName;
    };
    /** @nocollapse */
    Config.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [{},] },] },
    ]; };
    return Config;
}());
export { Config };
//# sourceMappingURL=Config.js.map