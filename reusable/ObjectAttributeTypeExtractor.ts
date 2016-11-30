export class ObjectAttributeTypeExtractor {
    private _mapping: {};

    constructor(obj: {} = null, options: {} = {}) {
        if (obj) {
            this._mapping = ObjectAttributeTypeExtractor.generateMapping(obj, options);
        }
    }

    get mapping(): {} {
        return this._mapping;
    }

    static generateMapping(obj: {}, options: {} = {}) {
        var types = {};
        options = $.extend({
            keyNamingStrategy: 'camelCase',
            stripUnderscore: false
        }, options);

        if (obj instanceof Array) {
            return new ObjectAttributeTypeExtractor(obj[0], options);
        } else {
            for (var key in obj) {
                if (typeof obj[key] !== 'function') {
                    var type = {};

                    if (typeof obj[key] === 'object') {
                        if (obj[key] === null) {
                            type = 'any';
                        } else if (obj[key] instanceof Array) {
                            var target = obj[key];

                            if (typeof target[0] !== 'object') {
                                target = target[0];

                                type = {
                                    _mapping: {
                                        _type: typeof target,
                                        _value: target
                                    }
                                };
                            } else {
                                type = (new ObjectAttributeTypeExtractor(target, options))._mapping;
                            }

                            type['_type'] = 'array';
                        } else if (obj[key] instanceof Date) {
                            type = {
                                _type: 'date',
                                _value: obj[key]
                            };
                        } else {
                            type = (new ObjectAttributeTypeExtractor(obj[key], options));
                            type['_type'] = 'object';
                        }
                    } else if (typeof obj[key] !== 'function') {
                        type = {
                            _type: typeof obj[key],
                            _value: obj[key]
                        };
                    }

                    // if set function exists, rename _attr to attr
                    if (options.stripUnderscore && key.charAt(0) === '_') {
                        var setterKey = key.substr(1, key.length);

                        if (setterKey in obj) {
                            key = setterKey;
                        }
                    }

                    // JMSSerializer serializes data with snake_case but JS Entity Classes name attributes with camelCase
                    if (options.keyNamingStrategy === 'snake_case') {
                        key = key.toSnakecase();
                    }

                    types[key] = type;
                }
            }
        }

        return types;
    }

    static fixObjectAttrs(data: any, options: {}) {
        var result = null;
        options = $.extend({
            keyNamingStrategy: 'camelCase',
            stripUnderscore: false
        }, options);

        if (data instanceof Array) {
            result = [];

            data.forEach((obj) => {
                result.push(ObjectAttributeTypeExtractor.fixObjectAttrs(obj, options));
            });
        } else if (typeof data === 'object') {
            result = {};

            for (var key in data) {
                if (!options.stripUnderscore || key.charAt(0) !== '_') {
                    var finalKey = key;

                    if (options.keyNamingStrategy === 'snake_case') {
                        finalKey = key.toSnakecase();
                    }

                    if (typeof data[key] === 'object') {
                        result[finalKey] = ObjectAttributeTypeExtractor.fixObjectAttrs(data[key], options);
                    } else {
                        result[finalKey] = data[key];
                    }
                }
            }
        }

        return result;
    }

    static convertDataToString(data: any, callbacks: {} = {}) {
        var result = null;

        if (data instanceof Array) {
            result = [];

            data.forEach((obj) => {
                result.push(ObjectAttributeTypeExtractor.convertDataToString(obj));
            });
        } else if (typeof data === 'object') {
            result = {};

            for (var key in data) {
                if (typeof data[key] === 'object') {
                    if (data[key] instanceof Date) {
                        result[key] = 'date' in callbacks && callbacks.date instanceof Function ? callbacks.date(data[key]) : data[key].yyyymmdd('-');
                    } else {
                        result[key] = ObjectAttributeTypeExtractor.convertDataToString(data[key]);
                    }
                } else if (typeof data[key] !== 'function') {
                    result[key] = data[key];
                }
            }
        }

        return result;
    }
}