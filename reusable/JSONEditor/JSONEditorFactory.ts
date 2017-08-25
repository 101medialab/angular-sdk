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
            if (['id'].indexOf(key) === -1) {
                let titleCase = key.replace(/([A-Z]+)/g, " $1").replace(/_/g, ' ').capitalize();

                if (['object', 'array'].indexOf(attrMapping[key].type) > -1) {
                    let type = attrMapping[key].type,
                        schemaTemp;

                    if ('type' in attrMapping[key].mapping) {
                        // For primitive type array
                        schemaTemp = {
                            type: attrMapping[key].mapping.type,
                        };

                        if ('value' in attrMapping[key].mapping) {
                            schemaTemp['default'] = attrMapping[key].mapping.value;
                        }
                    } else {
                        // For reference type array
                        schemaTemp = this.generateSchemaByAttributeTypeObject(attrMapping[key].mapping);
                    }

                    if (type === 'array') {
                        schemaTemp.title = false;
                        schema[key] = new JSONEditorTypes.ArrayType(titleCase, schemaTemp);
                    } else {
                        schemaTemp.title = titleCase;
                        schema[key] = schemaTemp;
                    }
                } else if (attrMapping[key].type !== 'any') {
                    if (attrMapping[key] !== 'undefined' && attrMapping[key].type != 'undefined') {
                        schema[key] = new JSONEditorTypes[attrMapping[key].type.capitalize() + 'Type'](titleCase);
                        schema[key]['default'] = attrMapping[key].value;

                        defaultValue[key] = attrMapping[key].value;
                    } else {
                        //console.error(`attrMapping[key] ${key} is undefined`);

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