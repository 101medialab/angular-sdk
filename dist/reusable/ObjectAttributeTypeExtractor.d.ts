export declare class ObjectAttributeTypeExtractor {
    private _mapping;
    constructor(obj?: any, options?: any);
    readonly mapping: any;
    static generateMapping(obj: any, options?: any): any;
    static fixObjectAttrs(data: any, options: any): any;
    static convertDataToString(data: any, callbacks?: any): any;
}
