/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.OnOATResolved = OnOATResolved;
var __extends = undefined && undefined.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) {
            if (b.hasOwnProperty(p)) d[p] = b[p];
        }
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
var TypeMeta = function () {
    function TypeMeta(_type) {
        this._type = _type;
    }
    Object.defineProperty(TypeMeta.prototype, "type", {
        get: function get() {
            return this._type;
        },
        enumerable: true,
        configurable: true
    });
    return TypeMeta;
}();
exports.TypeMeta = TypeMeta;

var PrimitiveTypeMeta = function (_super) {
    __extends(PrimitiveTypeMeta, _super);
    function PrimitiveTypeMeta(_value) {
        var _this = _super.call(this, ['string', 'number', 'boolean'].indexOf(typeof _value === 'undefined' ? 'undefined' : _typeof(_value)) > -1 ? typeof _value === 'undefined' ? 'undefined' : _typeof(_value) : 'any') || this;
        _this._value = _value;
        return _this;
    }
    Object.defineProperty(PrimitiveTypeMeta.prototype, "value", {
        get: function get() {
            return this._value;
        },
        enumerable: true,
        configurable: true
    });
    return PrimitiveTypeMeta;
}(TypeMeta);
exports.PrimitiveTypeMeta = PrimitiveTypeMeta;

var NonPrimitiveTypeMeta = function (_super) {
    __extends(NonPrimitiveTypeMeta, _super);
    function NonPrimitiveTypeMeta(type, _mapping, // All attributes should be type of ExtractorResultType
    _value) {
        if (_mapping === void 0) {
            _mapping = null;
        }
        if (_value === void 0) {
            _value = null;
        }
        var _this = _super.call(this, type) || this;
        _this._mapping = _mapping;
        _this._value = _value;
        return _this;
    }
    Object.defineProperty(NonPrimitiveTypeMeta.prototype, "mapping", {
        get: function get() {
            return this._mapping;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NonPrimitiveTypeMeta.prototype, "value", {
        get: function get() {
            return this._value;
        },
        enumerable: true,
        configurable: true
    });
    return NonPrimitiveTypeMeta;
}(TypeMeta);
exports.NonPrimitiveTypeMeta = NonPrimitiveTypeMeta;

var OnOATResolvedSymbol = Symbol('OnOATResolved');
function OnOATResolved(cb) {
    return Reflect.metadata(OnOATResolvedSymbol, cb);
}
var ObjectAttributeTypeExtractor = function () {
    function ObjectAttributeTypeExtractor() {}
    ObjectAttributeTypeExtractor.generateMapping = function (input, options) {
        if (options === void 0) {
            options = {};
        }
        options = Object.assign({
            keyNamingStrategy: 'camelCase',
            stripUnderscore: false
        }, options);
        var mapping = {};
        var result = null;
        // input is an array, analyze the first cell only
        if (input instanceof Array) {
            mapping = new NonPrimitiveTypeMeta('array', Extractor.generateMapping(input[0], options));
        } else {
            // Analyze attributes inside input object
            for (var key in input) {
                if (typeof input[key] !== 'function') {
                    var resolvedMeta = {};
                    // Array or Object
                    if (_typeof(input[key]) === 'object') {
                        resolvedMeta = Extractor.generateObjectTypeMapping(input, key, options);
                        // Any primitive type
                    } else if (typeof input[key] !== 'function') {
                        resolvedMeta = new PrimitiveTypeMeta(input[key]);
                    }
                    if (Reflect.hasMetadata(OnOATResolvedSymbol, input, key)) {
                        Reflect.getMetadata(OnOATResolvedSymbol, input, key)(input, key, resolvedMeta);
                    } else if (typeof options.onResolved === 'function') {
                        options.onResolved(input, key, resolvedMeta);
                    }
                    // Finished, set resolved attribute metadata to result
                    mapping[Extractor.resolveAttributeKey(options, key, input)] = resolvedMeta;
                }
            }
        }
        if ((typeof input === 'undefined' ? 'undefined' : _typeof(input)) === 'object') {
            if (!(input instanceof Date) && !(input instanceof Array)) {
                result = new NonPrimitiveTypeMeta('object', mapping);
            } else {
                result = mapping;
            }
        } else {
            result = { mapping: mapping };
        }
        if (Reflect.hasMetadata(OnOATResolvedSymbol, input.constructor)) {
            Reflect.getMetadata(OnOATResolvedSymbol, input.constructor)(input.constructor, null, result);
        } else if (typeof options.onResolved === 'function') {
            options.onResolved(input, null, result);
        }
        return result;
    };
    ObjectAttributeTypeExtractor.generateObjectTypeMapping = function (object, key, options) {
        var resolvedMeta = null;
        // Mark type as any if value is null
        if (object[key] === null) {
            resolvedMeta = new PrimitiveTypeMeta(null);
            // For Array
        } else if (object[key] instanceof Array) {
            var target = object[key];
            // For Primitive Array
            if (_typeof(target[0]) !== 'object') {
                resolvedMeta = new NonPrimitiveTypeMeta('array', new PrimitiveTypeMeta(target[0]));
                // For Object Array
            } else {
                resolvedMeta = Extractor.generateMapping(target, options);
            }
            // For Date
        } else if (object[key] instanceof Date) {
            resolvedMeta = new NonPrimitiveTypeMeta('date', null, object[key]);
            // For Object
        } else {
            resolvedMeta = Extractor.generateMapping(object[key], options);
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
        // Some serializer serialize data with snake_case
        // but JS Entity Classes name attributes with camelCase
        if (options.keyNamingStrategy === 'snake_case') {
            setterKey = setterKey.toSnakecase();
        }
        return setterKey;
    };
    // For naming convention changing. Not really related to this extractor
    ObjectAttributeTypeExtractor.fixNamingConvention = function (data, options) {
        var result = null;
        options = Object.assign({
            keyNamingStrategy: 'camelCase',
            stripUnderscore: false
        }, options);
        if (data instanceof Array) {
            result = [];
            data.forEach(function (obj) {
                result.push(Extractor.fixNamingConvention(obj, options));
            });
        } else if ((typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object') {
            result = {};
            for (var key in data) {
                if (!options.stripUnderscore || key.charAt(0) !== '_') {
                    var finalKey = key;
                    if (options.keyNamingStrategy === 'snake_case') {
                        finalKey = key.replace(/([A-Z]+)/g, "_$1").toLowerCase();
                    }
                    if (_typeof(data[key]) === 'object') {
                        result[finalKey] = Extractor.fixNamingConvention(data[key], options);
                    } else {
                        result[finalKey] = data[key];
                    }
                }
            }
        }
        return result;
    };
    // For JSON editor only. Should be extracted.
    ObjectAttributeTypeExtractor.convertDataToString = function (data, callbacks) {
        if (callbacks === void 0) {
            callbacks = {};
        }
        var result = null;
        if (data instanceof Array) {
            result = [];
            data.forEach(function (obj) {
                result.push(Extractor.convertDataToString(obj));
            });
        } else if ((typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object') {
            result = {};
            for (var key in data) {
                if (_typeof(data[key]) === 'object') {
                    if (data[key] instanceof Date) {
                        result[key] = 'date' in callbacks && callbacks.date instanceof Function ? callbacks.date(data[key]) : data[key].yyyymmdd('-');
                    } else {
                        result[key] = Extractor.convertDataToString(data[key]);
                    }
                } else if (typeof data[key] !== 'function') {
                    result[key] = data[key];
                }
            }
        }
        return result;
    };
    return ObjectAttributeTypeExtractor;
}();
exports.ObjectAttributeTypeExtractor = ObjectAttributeTypeExtractor;

var Extractor = ObjectAttributeTypeExtractor;

/***/ })
/******/ ]);