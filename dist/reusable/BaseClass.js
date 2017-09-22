var BaseClass = /** @class */ (function () {
    function BaseClass() {
    }
    BaseClass.prototype.log = function () {
        console.log(arguments);
    };
    BaseClass.isDefinedNotNull = function (obj) {
        return typeof obj !== 'undefined' && obj != null;
    };
    BaseClass.prototype.isDefinedNotNull = function (obj) {
        return BaseClass.isDefinedNotNull(obj);
    };
    BaseClass.prototype.typeof = function (obj) {
        return typeof obj;
    };
    return BaseClass;
}());
export { BaseClass };
//# sourceMappingURL=BaseClass.js.map