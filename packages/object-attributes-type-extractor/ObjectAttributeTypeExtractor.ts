export type AttributeType = 'string' | 'number' | 'boolean' | 'date' | 'array' | 'object' | 'any';

export class TypeMeta {
    constructor(protected _type: AttributeType) {}

    get type(): AttributeType {
        return this._type;
    }
}

export class PrimitiveTypeMeta extends TypeMeta {
    constructor(
        protected _value: any
    ) {
        super(
            <AttributeType>([
                'string',
                'number',
                'boolean'
            ].indexOf(typeof _value) > -1 ? typeof _value : 'any')
        );
    }

    get value(): any {
        return this._value;
    }
}

export class NonPrimitiveTypeMeta extends TypeMeta {
    constructor(
        type: 'object' | 'array' | 'date',
        private _mapping: any = null, // All attributes should be type of ExtractorResultType
        private _value: any = null
    ) {
        super(type);
    }

    get mapping(): ExtractorResultType {
        return this._mapping;
    }

    get value(): any {
        return this._value;
    }
}

export type ExtractorResultType = NonPrimitiveTypeMeta | PrimitiveTypeMeta;

const OnOATResolvedSymbol = Symbol('OnOATResolved');

export function OnOATResolved(cb: (target: any, key: string, resolved: any) => void) {
    return Reflect.metadata(OnOATResolvedSymbol, cb);
}

export class ObjectAttributeTypeExtractor {
    static generateMapping(
        input: any,
        options: {
            keyNamingStrategy?: 'camelCase' | 'snake_case',
            stripUnderscore?: boolean,
            onResolved?: (target: any, key?: string, resolved?: any) => void
        } = {}
    ): any {
        options = Object.assign({
            keyNamingStrategy: 'camelCase',
            stripUnderscore: false
        }, options);

        let mapping: any = {};
        let result: any = null;

        // input is an array, analyze the first cell only
        if (input instanceof Array) {
            mapping = new NonPrimitiveTypeMeta(
                'array',
                Extractor.generateMapping(input[0], options)
            );
        } else {
            // Analyze attributes inside input object
            for (let key in input) {
                if (typeof input[key] !== 'function') {
                    let resolvedMeta: any = {};

                    // Array or Object
                    if (typeof input[key] === 'object') {
                        resolvedMeta = Extractor.generateObjectTypeMapping(input, key, options);

                    // Any primitive type
                    } else if (typeof input[key] !== 'function') {
                        resolvedMeta = new PrimitiveTypeMeta(input[key]);
                    }

                    if (Reflect.hasMetadata(OnOATResolvedSymbol, input, key)) {
                        Reflect.getMetadata(
                            OnOATResolvedSymbol, input, key
                        )(
                            input, key, resolvedMeta
                        );
                    } else if (typeof options.onResolved === 'function') {
                        options.onResolved(input, key, resolvedMeta);
                    }

                    // Finished, set resolved attribute metadata to result
                    mapping[
                        Extractor.resolveAttributeKey(options, key, input)
                    ] = resolvedMeta;
                }
            }
        }

        if (
            typeof input === 'object'
        ) {
            if (!(input instanceof Date) && !(input instanceof Array)) {
                result = new NonPrimitiveTypeMeta('object', mapping);
            } else {
                result = mapping;
            }
        } else {
            result = { mapping };
        }

        if (Reflect.hasMetadata(OnOATResolvedSymbol, input.constructor)) {
            Reflect.getMetadata(
                OnOATResolvedSymbol, input.constructor
            )(
                input.constructor, null, result
            );
        } else if (typeof options.onResolved === 'function') {
            options.onResolved(input, null, result);
        }

        return result
    }

    static generateObjectTypeMapping(object: any, key, options: any) {
        let resolvedMeta = null;

        // Mark type as any if value is null
        if (object[key] === null) {
            resolvedMeta = new PrimitiveTypeMeta(null);

        // For Array
        } else if (object[key] instanceof Array) {
            let target = object[key];
            // For Primitive Array
            if (typeof target[0] !== 'object') {
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
    }

    static resolveAttributeKey(options: any, key, object: any) {
        let setterKey = key;

        // if set function exists, rename _attr to attr
        if (options.stripUnderscore && key.charAt(0) === '_') {
            let trimmedKey = key.substr(1, key.length);

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
    }

    // For naming convention changing. Not really related to this extractor
    static fixNamingConvention(data: any, options: any) {
        let result = null;
        options = Object.assign({
            keyNamingStrategy: 'camelCase',
            stripUnderscore: false
        }, options);

        if (data instanceof Array) {
            result = [];

            data.forEach((obj) => {
                result.push(Extractor.fixNamingConvention(obj, options));
            });
        } else if (typeof data === 'object') {
            result = {};

            for (let key in data) {
                if (!options.stripUnderscore || key.charAt(0) !== '_') {
                    let finalKey = key;

                    if (options.keyNamingStrategy === 'snake_case') {
                        finalKey = key.replace(/([A-Z]+)/g, "_$1").toLowerCase();
                    }

                    if (typeof data[key] === 'object') {
                        result[finalKey] = Extractor.fixNamingConvention(data[key], options);
                    } else {
                        result[finalKey] = data[key];
                    }
                }
            }
        }

        return result;
    }

    // For JSON editor only. Should be extracted.
    static convertDataToString(data: any, callbacks: any = {}) {
        let result = null;

        if (data instanceof Array) {
            result = [];

            data.forEach((obj) => {
                result.push(Extractor.convertDataToString(obj));
            });
        } else if (typeof data === 'object') {
            result = {};

            for (let key in data) {
                if (typeof data[key] === 'object') {
                    if (data[key] instanceof Date) {
                        result[key] =
                            'date' in callbacks &&
                            callbacks.date instanceof Function ?
                                callbacks.date(data[key]) : data[key].yyyymmdd('-');
                    } else {
                        result[key] = Extractor.convertDataToString(data[key]);
                    }
                } else if (typeof data[key] !== 'function') {
                    result[key] = data[key];
                }
            }
        }

        return result;
    }
}

var Extractor = ObjectAttributeTypeExtractor;