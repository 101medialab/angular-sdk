import { ObjectAttributeTypeExtractor } from '../ObjectAttributeTypeExtractor';
import 'json-editor/dist/jsoneditor.js';
export declare class JSONEditorFactory {
    private config;
    private schema;
    private data;
    private elem;
    private _instance;
    constructor({config, schema, data}: {
        config: any;
        schema: any;
        data: any;
    });
    static generateSchemaByObject(obj: any, resolveTypeAny?: () => void, options?: any): any;
    static generateSchemaByAttributeTypeObject(attrMappingObj: ObjectAttributeTypeExtractor, resolveTypeAny?: (JSONEditorTypes) => void, resolveTypeUndefined?: (attrMapping, key) => void): any;
    setElement(elem: any): this;
    readonly instance: any;
    init(): void;
}
