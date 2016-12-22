import { ObjectAttributeTypeExtractor } from '../ObjectAttributeTypeExtractor';
import * as JSONEditorTypes from './JSONEditorType';
import 'json-editor/dist/jsoneditor.js';
var JSONEditorFactory = (function () {
    function JSONEditorFactory(_a) {
        var config = _a.config, schema = _a.schema, data = _a.data;
        this.config = {
            disable_collapse: true,
            disable_edit_json: true,
            disable_properties: true,
            required_by_default: true
        };
        this._instance = null;
        this.config = $.extend(this.config, config);
        this.schema = schema;
        this.data = data;
    }
    JSONEditorFactory.generateSchemaByObject = function (obj, resolveTypeAny, options) {
        if (resolveTypeAny === void 0) { resolveTypeAny = null; }
        if (options === void 0) { options = {}; }
        return this.generateSchemaByAttributeTypeObject(new ObjectAttributeTypeExtractor(obj, options), resolveTypeAny);
    };
    JSONEditorFactory.generateSchemaByAttributeTypeObject = function (attrMappingObj, resolveTypeAny, resolveTypeUndefined) {
        if (resolveTypeAny === void 0) { resolveTypeAny = null; }
        if (resolveTypeUndefined === void 0) { resolveTypeUndefined = null; }
        var schema = {}, attrMapping = attrMappingObj instanceof ObjectAttributeTypeExtractor ? attrMappingObj.mapping : attrMappingObj, defaultValue = {}, i = 1;
        for (var key in attrMapping) {
            if (['id'].indexOf(key) === -1) {
                var titleCase = key.replace(/([A-Z]+)/g, " $1").replace(/_/g, ' ').capitalize();
                if (['object', 'array'].indexOf(attrMapping[key]._type) > -1) {
                    var type = attrMapping[key]._type, schemaTemp = void 0;
                    if ('_type' in attrMapping[key]._mapping) {
                        // For primitive type array
                        schemaTemp = {
                            type: attrMapping[key]._mapping._type,
                        };
                        if ('_value' in attrMapping[key]._mapping) {
                            schemaTemp['default'] = attrMapping[key]._mapping._value;
                        }
                    }
                    else {
                        // For reference type array
                        schemaTemp = this.generateSchemaByAttributeTypeObject(attrMapping[key].mapping);
                    }
                    if (type === 'array') {
                        schemaTemp.title = false;
                        schema[key] = new JSONEditorTypes.ArrayType(titleCase, schemaTemp);
                    }
                    else {
                        schemaTemp.title = titleCase;
                        schema[key] = schemaTemp;
                    }
                }
                else if (attrMapping[key]._type !== 'any') {
                    if (attrMapping[key] !== 'undefined' && attrMapping[key]._type != 'undefined') {
                        schema[key] = new JSONEditorTypes[attrMapping[key]._type.capitalize() + 'Type'](titleCase);
                        schema[key]['default'] = attrMapping[key]._value;
                        defaultValue[key] = attrMapping[key]._value;
                    }
                    else {
                        //console.error(`attrMapping[key] ${key} is undefined`);
                        schema[key] = resolveTypeUndefined ? resolveTypeUndefined(attrMapping, key) : new JSONEditorTypes.StringType(titleCase, { 'default': '' });
                    }
                }
                else {
                    schema[key] = resolveTypeAny ? resolveTypeAny(JSONEditorTypes) : new JSONEditorTypes.StringType(titleCase, { 'default': '' });
                }
                schema[key]['propertyOrder'] = i * 100;
            }
            i++;
        }
        return new JSONEditorTypes.ObjectType(' ', schema, {
            'default': defaultValue
        });
    };
    JSONEditorFactory.prototype.setElement = function (elem) {
        this.elem = elem;
        return this;
    };
    Object.defineProperty(JSONEditorFactory.prototype, "instance", {
        get: function () {
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    JSONEditorFactory.prototype.init = function () {
        this.config.schema = this.schema;
        this._instance = new window.JSONEditor(this.elem, this.config);
        this._instance.setValue(this.data);
    };
    return JSONEditorFactory;
}());
export { JSONEditorFactory };
//# sourceMappingURL=JSONEditorFactory.js.map