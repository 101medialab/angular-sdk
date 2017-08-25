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
import 'core-js/es7/reflect';
var TypeMeta = (function () {
    function TypeMeta(_type) {
        this._type = _type;
    }
    Object.defineProperty(TypeMeta.prototype, "type", {
        get: function () {
            return this._type;
        },
        enumerable: true,
        configurable: true
    });
    return TypeMeta;
}());
export { TypeMeta };
var PrimitiveTypeMeta = (function (_super) {
    __extends(PrimitiveTypeMeta, _super);
    function PrimitiveTypeMeta(_value) {
        var _this = _super.call(this, ([
            'string',
            'number',
            'boolean'
        ].indexOf(typeof _value) > -1 ? typeof _value : 'any')) || this;
        _this._value = _value;
        return _this;
    }
    Object.defineProperty(PrimitiveTypeMeta.prototype, "value", {
        get: function () {
            return this._value;
        },
        enumerable: true,
        configurable: true
    });
    return PrimitiveTypeMeta;
}(TypeMeta));
export { PrimitiveTypeMeta };
var NonPrimitiveTypeMeta = (function (_super) {
    __extends(NonPrimitiveTypeMeta, _super);
    function NonPrimitiveTypeMeta(type, _mapping, _value) {
        if (_mapping === void 0) { _mapping = null; }
        if (_value === void 0) { _value = null; }
        var _this = _super.call(this, type) || this;
        _this._mapping = _mapping;
        _this._value = _value;
        return _this;
    }
    Object.defineProperty(NonPrimitiveTypeMeta.prototype, "mapping", {
        get: function () {
            return this._mapping;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NonPrimitiveTypeMeta.prototype, "value", {
        get: function () {
            return this._value;
        },
        enumerable: true,
        configurable: true
    });
    return NonPrimitiveTypeMeta;
}(TypeMeta));
export { NonPrimitiveTypeMeta };
var ObjectAttributeTypeExtractor = (function () {
    function ObjectAttributeTypeExtractor() {
    }
    ObjectAttributeTypeExtractor.generateMapping = function (input, options) {
        if (options === void 0) { options = {}; }
        options = Object.assign({
            keyNamingStrategy: 'camelCase',
            stripUnderscore: false
        }, options);
        var result = {};
        // input is an array already, analyze the first one
        if (input instanceof Array) {
            return Extractor.generateMapping(input[0], options);
        }
        else {
            // Analyze attributes inside input object
            for (var key in input) {
                if (typeof input[key] !== 'function') {
                    var resolvedMeta = {};
                    // Array or Object
                    if (typeof input[key] === 'object') {
                        resolvedMeta = Extractor.generateObjectTypeMapping(input, key, options);
                        // Any primitive type
                    }
                    else if (typeof input[key] !== 'function') {
                        resolvedMeta = new PrimitiveTypeMeta(input[key]);
                    }
                    // Finished, set resolved attribute metadata to result
                    result[Extractor.resolveAttributeKey(options, key, input)] = resolvedMeta;
                }
            }
        }
        return result;
    };
    ObjectAttributeTypeExtractor.generateObjectTypeMapping = function (object, key, options) {
        var resolvedMeta = null;
        // Mark type as any if value is null
        if (object[key] === null) {
            resolvedMeta = 'any';
            // For Array
        }
        else if (object[key] instanceof Array) {
            var target = object[key];
            // For Primitive Array
            if (typeof target[0] !== 'object') {
                resolvedMeta = new NonPrimitiveTypeMeta('array', new PrimitiveTypeMeta(target[0]));
                // For Object Array
            }
            else {
                resolvedMeta = new NonPrimitiveTypeMeta('array', Extractor.generateMapping(target, options));
            }
            // For Date
        }
        else if (object[key] instanceof Date) {
            resolvedMeta = new NonPrimitiveTypeMeta('date', null, object[key]);
            // For Object
        }
        else {
            resolvedMeta = new NonPrimitiveTypeMeta('object', Extractor.generateMapping(object[key], options));
        }
        return resolvedMeta;
    };
    ObjectAttributeTypeExtractor.resolveAttributeKey = function (options, key, object) {
        var setterKey = key;
        // if set function exists, rename _attr to attr
        if (options.stripUnderscore && key.charAt(0) === '_') {
            var trimmedKey = key.substr(1, key.length);
            if (trimmedKey in object) {
                setterKey = trimmedKey;
            }
        }
        // Some serializer serialize data with snake_case but JS Entity Classes name attributes with camelCase
        if (options.keyNamingStrategy === 'snake_case') {
            setterKey = setterKey.toSnakecase();
        }
        return setterKey;
    };
    // For naming convention changing. Not really related to this extractor
    ObjectAttributeTypeExtractor.fixObjectAttributesNamingConvention = function (data, options) {
        var result = null;
        options = Object.assign({
            keyNamingStrategy: 'camelCase',
            stripUnderscore: false
        }, options);
        if (data instanceof Array) {
            result = [];
            data.forEach(function (obj) {
                result.push(Extractor.fixObjectAttributesNamingConvention(obj, options));
            });
        }
        else if (typeof data === 'object') {
            result = {};
            for (var key in data) {
                if (!options.stripUnderscore || key.charAt(0) !== '_') {
                    var finalKey = key;
                    if (options.keyNamingStrategy === 'snake_case') {
                        finalKey = key.toSnakecase();
                    }
                    if (typeof data[key] === 'object') {
                        result[finalKey] = Extractor.fixObjectAttributesNamingConvention(data[key], options);
                    }
                    else {
                        result[finalKey] = data[key];
                    }
                }
            }
        }
        return result;
    };
    // For JSON editor only. Should be extracted.
    ObjectAttributeTypeExtractor.convertDataToString = function (data, callbacks) {
        if (callbacks === void 0) { callbacks = {}; }
        var result = null;
        if (data instanceof Array) {
            result = [];
            data.forEach(function (obj) {
                result.push(Extractor.convertDataToString(obj));
            });
        }
        else if (typeof data === 'object') {
            result = {};
            for (var key in data) {
                if (typeof data[key] === 'object') {
                    if (data[key] instanceof Date) {
                        result[key] = 'date' in callbacks && callbacks.date instanceof Function ? callbacks.date(data[key]) : data[key].yyyymmdd('-');
                    }
                    else {
                        result[key] = Extractor.convertDataToString(data[key]);
                    }
                }
                else if (typeof data[key] !== 'function') {
                    result[key] = data[key];
                }
            }
        }
        return result;
    };
    return ObjectAttributeTypeExtractor;
}());
export { ObjectAttributeTypeExtractor };
var Extractor = ObjectAttributeTypeExtractor;
//# sourceMappingURL=ObjectAttributeTypeExtractor.js.map