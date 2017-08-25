import 'core-js/es7/reflect';
export declare type AttributeType = 'string' | 'number' | 'boolean' | 'date' | 'array' | 'object' | 'any';
export declare class TypeMeta {
    protected _type: AttributeType;
    constructor(_type: AttributeType);
    readonly type: AttributeType;
}
export declare class PrimitiveTypeMeta extends TypeMeta {
    protected _value: any;
    constructor(_value: any);
    readonly value: any;
}
export declare class NonPrimitiveTypeMeta extends TypeMeta {
    private _mapping;
    private _value;
    constructor(type: 'object' | 'array' | 'date', _mapping?: ExtractorResultType, _value?: any);
    readonly mapping: ExtractorResultType;
    readonly value: any;
}
export declare type ExtractorResultType = NonPrimitiveTypeMeta | PrimitiveTypeMeta;
export declare class ObjectAttributeTypeExtractor {
    static generateMapping(input: any, options?: {
        keyNamingStrategy?: 'camelCase' | 'snake_case';
        stripUnderscore?: boolean;
    }): any;
    static generateObjectTypeMapping(object: any, key: any, options: any): any;
    static resolveAttributeKey(options: any, key: any, object: any): any;
    static fixObjectAttributesNamingConvention(data: any, options: any): any;
    static convertDataToString(data: any, callbacks?: any): any;
}
