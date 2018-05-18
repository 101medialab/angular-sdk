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
            var current = attrMapping[key];
            if (['id'].indexOf(key) === -1) {
                var titleCase = key.replace(/([A-Z]+)/g, " $1").replace(/_/g, ' ').capitalize();
                if (['object', 'array'].indexOf(current.type) > -1) {
                    var type = current.type, schemaTemp = void 0;
                    if (current.type == 'array') {
                        if ('type' in current.mapping && current.mapping.type != 'object') {
                            // For primitive type array
                            schemaTemp = {
                                type: current.mapping.type,
                            };
                            if ('value' in current.mapping) {
                                schemaTemp['default'] = current.mapping.value;
                            }
                        }
                        else {
                            // For reference type array
                            schemaTemp = this.generateSchemaByAttributeTypeObject(current.mapping);
                        }
                    }
                    else {
                        schemaTemp = this.generateSchemaByAttributeTypeObject(current.mapping);
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
                else if (current.type !== 'any') {
                    if (current !== 'undefined' && current.type != 'undefined') {
                        schema[key] = new JSONEditorTypes[current.type.capitalize() + 'Type'](titleCase);
                        schema[key]['default'] = current.value;
                        defaultValue[key] = current.value;
                    }
                    else {
                        //console.error(`current ${key} is undefined`);
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