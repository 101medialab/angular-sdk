import { NonPrimitiveTypeMeta, ObjectAttributeTypeExtractor as Extractor } from '../ObjectAttributeTypeExtractor';
import * as JSONEditorTypes from './JSONEditorType';
import 'json-editor/dist/jsoneditor.js';
var JSONEditorFactory = /** @class */ (function () {
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
        return this.generateSchemaByAttributeTypeObject(Extractor.generateMapping(obj, options), resolveTypeAny);
    };
    JSONEditorFactory.generateSchemaByAttributeTypeObject = function (attrMappingObj, resolveTypeAny, resolveTypeUndefined) {
        if (resolveTypeAny === void 0) { resolveTypeAny = null; }
        if (resolveTypeUndefined === void 0) { resolveTypeUndefined = null; }
        var schema = {}, attrMapping = attrMappingObj instanceof NonPrimitiveTypeMeta ? attrMappingObj.mapping : attrMappingObj, defaultValue = {}, i = 1;
        for (var key in attrMapping) {
            if (['id'].indexOf(key) === -1) {
                var titleCase = key.replace(/([A-Z]+)/g, " $1").replace(/_/g, ' ').capitalize();
                if (['object', 'array'].indexOf(attrMapping[key].type) > -1) {
                    var type = attrMapping[key].type, schemaTemp = void 0;
                    if ('type' in attrMapping[key].mapping) {
                        // For primitive type array
                        schemaTemp = {
                            type: attrMapping[key].mapping.type,
                        };
                        if ('value' in attrMapping[key].mapping) {
                            schemaTemp['default'] = attrMapping[key].mapping.value;
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
                else if (attrMapping[key].type !== 'any') {
                    if (attrMapping[key] !== 'undefined' && attrMapping[key].type != 'undefined') {
                        schema[key] = new JSONEditorTypes[attrMapping[key].type.capitalize() + 'Type'](titleCase);
                        schema[key]['default'] = attrMapping[key].value;
                        defaultValue[key] = attrMapping[key].value;
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