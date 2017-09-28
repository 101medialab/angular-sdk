export declare class JSONEditorType {
    type: string;
    title: string;
    constructor(type: string, title?: string, config?: any);
}
export declare class StringType extends JSONEditorType {
    constructor(title: string, config?: any);
}
export declare class ObjectType extends JSONEditorType {
    properties: any;
    constructor(title: any, properties?: any, config?: any);
}
export declare class ArrayType extends JSONEditorType {
    items: any;
    format: string;
    constructor(title: any, items?: any, format?: string, config?: any);
}
export declare class BooleanType extends JSONEditorType {
    format: string;
    constructor(title: any, format?: string, config?: any);
}
export declare class DateType extends StringType {
    constructor(title: string, config?: any);
}
export declare class NumberType extends StringType {
    constructor(title: string, config?: any);
}
