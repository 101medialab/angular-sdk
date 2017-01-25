import {ObjectAttributeTypeExtractor} from '../ObjectAttributeTypeExtractor';
import * as JSONEditorTypes from './JSONEditorType';
import * as JSONEditor from 'json-editor';

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
    private _instance: JSONEditor = null;

    constructor({config, schema, data}) {
        this.config = $.extend(this.config, config);
        this.schema = schema;
        this.data = data;
    }

    static generateSchemaByObject(obj: any, resolveTypeAny: () => void = null, options: any = {}) {
        return this.generateSchemaByAttributeTypeObject(new ObjectAttributeTypeExtractor(obj, options), resolveTypeAny);
    }

    static generateSchemaByAttributeTypeObject(
        attrMappingObj: ObjectAttributeTypeExtractor,
        resolveTypeAny: (JSONEditorTypes) => void = null,
        resolveTypeUndefined: (attrMapping, key) => void = null
    ): any {
        let schema = {},
            attrMapping = attrMappingObj instanceof ObjectAttributeTypeExtractor ? attrMappingObj.mapping : attrMappingObj,
            defaultValue = {},
            i = 1;

        for (let key in attrMapping) {
            if (['id'].indexOf(key) === -1) {
                let titleCase = key.replace(/([A-Z]+)/g, " $1").replace(/_/g, ' ').capitalize();

                if (['object', 'array'].indexOf(attrMapping[key]._type) > -1) {
                    let type = attrMapping[key]._type,
                        schemaTemp;

                    if ('_type' in attrMapping[key]._mapping) {
                        // For primitive type array
                        schemaTemp = {
                            type: attrMapping[key]._mapping._type,
                        };

                        if ('_value' in attrMapping[key]._mapping) {
                            schemaTemp['default'] = attrMapping[key]._mapping._value;
                        }
                    } else {
                        // For reference type array
                        schemaTemp = this.generateSchemaByAttributeTypeObject(attrMapping[key].mapping);
                    }

                    if (type === 'array') {
                        schemaTemp.title = false;
                        schema[key] = new JSONEditorTypes.Array(titleCase, schemaTemp);
                    } else {
                        schemaTemp.title = titleCase;
                        schema[key] = schemaTemp;
                    }
                } else if (attrMapping[key]._type !== 'any') {
                    if (attrMapping[key] !== 'undefined' && attrMapping[key]._type != 'undefined') {
                        schema[key] = eval('new JSONEditorTypes.' + attrMapping[key]._type.capitalize() + '(\'' + titleCase + '\')');
                        schema[key]['default'] = attrMapping[key]._value;

                        defaultValue[key] = attrMapping[key]._value;
                    } else {
                        //console.error(`attrMapping[key] ${key} is undefined`);

                        schema[key] = resolveTypeUndefined ? resolveTypeUndefined(attrMapping, key) : new JSONEditorTypes.String(titleCase, {'default': ''});
                    }
                } else {
                    schema[key] = resolveTypeAny ? resolveTypeAny(JSONEditorTypes) : new JSONEditorTypes.String(titleCase, {'default': ''});
                }

                schema[key]['propertyOrder'] = i * 100;
            }

            i++;
        }

        return new JSONEditorTypes.Object(' ', schema, {
            'default': defaultValue
        });
    }

    setElement(elem) {
        this.elem = elem;

        return this;
    }

    get instance(): JSONEditor {
        return this._instance;
    }

    init() {
        this.config.schema = this.schema;

        this._instance = new window.JSONEditor(this.elem, this.config);
        this._instance.setValue(this.data);
    }
}