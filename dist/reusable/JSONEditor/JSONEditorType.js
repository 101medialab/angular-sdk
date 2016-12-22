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
var JSONEditorType = (function () {
    function JSONEditorType(type, title, config) {
        if (title === void 0) { title = ''; }
        if (config === void 0) { config = null; }
        this.type = type;
        this.title = title;
        if (config) {
            for (var key in config) {
                if (!(key in this)) {
                    this[key] = config[key];
                }
            }
        }
    }
    return JSONEditorType;
}());
export { JSONEditorType };
var StringType = (function (_super) {
    __extends(StringType, _super);
    function StringType(title, config) {
        if (config === void 0) { config = null; }
        return _super.call(this, 'string', title, config) || this;
    }
    return StringType;
}(JSONEditorType));
export { StringType };
var ObjectType = (function (_super) {
    __extends(ObjectType, _super);
    function ObjectType(title, properties, config) {
        if (properties === void 0) { properties = {}; }
        if (config === void 0) { config = null; }
        var _this = _super.call(this, 'object', title, config) || this;
        _this.properties = properties;
        return _this;
    }
    return ObjectType;
}(JSONEditorType));
export { ObjectType };
var ArrayType = (function (_super) {
    __extends(ArrayType, _super);
    function ArrayType(title, items, format, config) {
        if (items === void 0) { items = {}; }
        if (format === void 0) { format = 'tabs'; }
        if (config === void 0) { config = null; }
        var _this = _super.call(this, 'array', title, config) || this;
        _this.items = items;
        _this.format = format;
        return _this;
    }
    return ArrayType;
}(JSONEditorType));
export { ArrayType };
var BooleanType = (function (_super) {
    __extends(BooleanType, _super);
    function BooleanType(title, format, config) {
        if (format === void 0) { format = 'checkbox'; }
        if (config === void 0) { config = null; }
        var _this = _super.call(this, 'boolean', title, config) || this;
        _this.format = format;
        return _this;
    }
    return BooleanType;
}(JSONEditorType));
export { BooleanType };
var DateType = (function (_super) {
    __extends(DateType, _super);
    function DateType(title, config) {
        if (config === void 0) { config = {}; }
        var _this = this;
        config.format = 'date';
        _this = _super.call(this, title, config) || this;
        return _this;
    }
    return DateType;
}(StringType));
export { DateType };
var NumberType = (function (_super) {
    __extends(NumberType, _super);
    function NumberType(title, config) {
        if (config === void 0) { config = {}; }
        var _this = this;
        config.format = 'number';
        _this = _super.call(this, title, config) || this;
        return _this;
    }
    return NumberType;
}(StringType));
export { NumberType };
//# sourceMappingURL=JSONEditorType.js.map