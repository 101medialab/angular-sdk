import { ExtractorResultType, NonPrimitiveTypeMeta, ObjectAttributeTypeExtractor as Extractor } from '../ObjectAttributeTypeExtractor';
import * as JSONEditorTypes from './JSONEditorType';
import 'json-editor/dist/jsoneditor.js';

export class JSONEditorFactory {
    private config: any = {
        disable_collapse: true,
        disable_edit_json: true,
        disable_properties: true,
        required_by_default: true
    };
    private schema: any;
    private data: any;
    private elem;
    private _instance = null;

    constructor({config, schema, data}) {
        this.config = $.extend(this.config, config);
        this.schema = schema;
        this.data = data;
    }

    static generateSchemaByObject(obj: any, resolveTypeAny: () => void = null, options: any = {}) {
        return this.generateSchemaByAttributeTypeObject(Extractor.generateMapping(obj, options), resolveTypeAny);
    }

    static generateSchemaByAttributeTypeObject(
        attrMappingObj: Extractor,
        resolveTypeAny: (JSONEditorTypes) => void = null,
        resolveTypeUndefined: (attrMapping, key) => void = null
    ): any {
        let schema = {},
            attrMapping = attrMappingObj instanceof NonPrimitiveTypeMeta ? attrMappingObj.mapping : attrMappingObj,
            defaultValue = {},
            i = 1;

        for (let key in attrMapping) {
            let current = attrMapping[key];

            if (['id'].indexOf(key) === -1) {
                let titleCase = key.replace(/([A-Z]+)/g, " $1").replace(/_/g, ' ').capitalize();

                if (['object', 'array'].indexOf(current.type) > -1) {
                    let type = current.type,
                        schemaTemp;

                    if (current.type == 'array') {
                        if ('type' in current.mapping && current.mapping.type != 'object') {
                            // For primitive type array
                            schemaTemp = {
                                type: current.mapping.type,
                            };

                            if ('value' in current.mapping) {
                                schemaTemp['default'] = current.mapping.value;
                            }
                        } else {
                            // For reference type array
                            schemaTemp = this.generateSchemaByAttributeTypeObject(current.mapping);
                        }
                    } else {
                        schemaTemp = this.generateSchemaByAttributeTypeObject(current.mapping);
                    }

                    if (type === 'array') {
                        schemaTemp.title = false;
                        schema[key] = new JSONEditorTypes.ArrayType(titleCase, schemaTemp);
                    } else {
                        schemaTemp.title = titleCase;
                        schema[key] = schemaTemp;
                    }
                } else if (current.type !== 'any') {
                    if (current !== 'undefined' && current.type != 'undefined') {
                        schema[key] = new JSONEditorTypes[current.type.capitalize() + 'Type'](titleCase);
                        schema[key]['default'] = current.value;

                        defaultValue[key] = current.value;
                    } else {
                        //console.error(`current ${key} is undefined`);

                        schema[key] = resolveTypeUndefined ? resolveTypeUndefined(attrMapping, key) : new JSONEditorTypes.StringType(titleCase, {'default': ''});
                    }
                } else {
                    schema[key] = resolveTypeAny ? resolveTypeAny(JSONEditorTypes) : new JSONEditorTypes.StringType(titleCase, {'default': ''});
                }

                schema[key]['propertyOrder'] = i * 100;
            }

            i++;
        }

        return new JSONEditorTypes.ObjectType(' ', schema, {
            'default': defaultValue
        });
    }

    setElement(elem) {
        this.elem = elem;

        return this;
    }

    get instance() {
        return this._instance;
    }

    init() {
        this.config.schema = this.schema;

        this._instance = new window.JSONEditor(this.elem, this.config);
        this._instance.setValue(this.data);
    }
}