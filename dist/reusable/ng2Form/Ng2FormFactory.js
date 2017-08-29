import { FormGroup, FormControl, FormArray, Validators, } from '@angular/forms';
import { NonPrimitiveTypeMeta, ObjectAttributeTypeExtractor as Extractor } from '../ObjectAttributeTypeExtractor';
var Ng2FormFactory = (function () {
    function Ng2FormFactory() {
    }
    Ng2FormFactory.generateFormGroupByObject = function (formBuilder, object, resolveTypeAny, options) {
        if (resolveTypeAny === void 0) { resolveTypeAny = null; }
        if (options === void 0) { options = {}; }
        return Ng2FormFactory.generateFormGroupByOATMapping(formBuilder, Extractor.generateMapping(object, options), resolveTypeAny);
    };
    Ng2FormFactory.generateLabel = function (key) {
        return key.replace(/([A-Z]+)/g, " $1").replace(/_/g, ' ').capitalize();
    };
    Ng2FormFactory.generateFormGroupByOATMapping = function (formBuilder, attributeMappingObject, // Yet all attributes inside should be typeof ExtractorResultType
        resolveTypeAny, resolveTypeUndefined) {
        if (resolveTypeAny === void 0) { resolveTypeAny = null; }
        if (resolveTypeUndefined === void 0) { resolveTypeUndefined = null; }
        var result = {
            ngFormControl: {},
            templateConfig: {},
        };
        var attrMapping = attributeMappingObject instanceof NonPrimitiveTypeMeta ?
            attributeMappingObject.mapping : attributeMappingObject;
        for (var key in attrMapping) {
            // TODO: Skip attributes should be configurable
            if (['id'].indexOf(key) > -1)
                continue;
            var resolved = null;
            var currentTemplateConfig = null;
            var current = attrMapping[key];
            // Object or Array
            if (['object', 'array'].indexOf(current._type) > -1) {
                if (current._type === 'array') {
                    resolved = Ng2FormFactory.handleArray(current, key, formBuilder);
                }
                else {
                    // Handle Object
                    var child = Ng2FormFactory.prepareAndCreateChildTemplateConfig(current, key, formBuilder)();
                    resolved = {
                        groupType: 'object',
                        control: new FormGroup(child.ngFormControl),
                        children: child.templateConfig
                    };
                }
            }
            else if (current._type !== 'any') {
                if (current !== 'undefined' && typeof current._type != 'undefined') {
                    var validator = current.validator ? current.validator : [], valueNotEmpty = current._value !== undefined;
                    if (valueNotEmpty)
                        validator.push(Validators.required);
                    currentTemplateConfig = {
                        type: current._type,
                        control: new FormControl(valueNotEmpty ? current._value : '', validator)
                    };
                }
                else {
                    resolved = resolveTypeUndefined ? resolveTypeUndefined(current, key) : null; // Resolve as null first
                }
            }
            else {
                resolved = resolveTypeAny ? resolveTypeAny(current, key) : null; // Resolve as null first
            }
            // If resolved is still null, set it to default
            if (!currentTemplateConfig && !resolved) {
                resolved = {
                    type: 'string',
                    renderType: 'text',
                    control: new FormControl('')
                };
            }
            // FIXME: this checking might be redundant
            if (resolved) {
                currentTemplateConfig = resolved;
            }
            currentTemplateConfig.label = Ng2FormFactory.generateLabel(key);
            currentTemplateConfig.setValue = Ng2FormFactory.setValueToTemplate.bind(currentTemplateConfig);
            Ng2FormFactory.resolveTemplateConfigByType(current, currentTemplateConfig);
            result.ngFormControl[key] = currentTemplateConfig.control;
            result.templateConfig[key] = currentTemplateConfig;
        }
        result.templateConfig.setValue = Ng2FormFactory.setValueToTemplate.bind(result.templateConfig);
        return result;
    };
    Ng2FormFactory.prepareAndCreateChildTemplateConfig = function (current, key, formBuilder) {
        var schemaTemp = null;
        if ('type' in current._mapping) {
            // For primitive type array
            var control = new FormControl('value' in current._mapping ? current._mapping.value : '', [Validators.required]), templateConfig = {};
            templateConfig[key] = {
                label: Ng2FormFactory.generateLabel(key),
                type: current._mapping.type,
                control: control,
            };
            schemaTemp = {
                ngFormControl: control,
                templateConfig: templateConfig
            };
            Ng2FormFactory.resolveTemplateConfigByType(current._mapping, templateConfig[key]);
        }
        else {
            // For reference type array or object
            schemaTemp = Ng2FormFactory.generateFormGroupByOATMapping(formBuilder, current._mapping);
        }
        schemaTemp.templateConfig.setValue = Ng2FormFactory.setValueToTemplate.bind(schemaTemp.templateConfig);
        var result = {
            ngFormControl: schemaTemp.ngFormControl instanceof FormControl || current.type === 'object' ?
                schemaTemp.ngFormControl :
                // For reference type array
                new FormGroup(schemaTemp.ngFormControl),
            templateConfig: schemaTemp.templateConfig
        };
        return function () { return result; };
    };
    Ng2FormFactory.handleArray = function (current, key, formBuilder) {
        var ngFormArrayControl = new FormArray([]);
        var init = Ng2FormFactory.prepareAndCreateChildTemplateConfig(current, key, formBuilder);
        var children = [], add = function () {
            var childConfig = init();
            var control = ngFormArrayControl;
            control.push(childConfig.ngFormControl);
            children.push(childConfig.templateConfig);
        }, remove = function (i) {
            var control = ngFormArrayControl;
            control.removeAt(i);
            children.splice(i, 1);
        };
        add();
        var arrayType = 'type' in current._mapping ? ('arrayType' in current ?
            current.arrayType :
            'primitive') :
            'object';
        var result = {
            groupType: 'array',
            arrayType: arrayType,
            add: add,
            remove: remove,
            control: ngFormArrayControl,
            children: children
        };
        Ng2FormFactory.setTemplatePreset(current, result);
        return result;
    };
    Ng2FormFactory.setValueToTemplate = function (value) {
        var _loop_1 = function () {
            var target = this_1.groupType ? this_1.children : this_1;
            if (key in target) {
                if (target[key].type) {
                    if (typeof value[key] != 'object') {
                        target[key].control.setValue(String(value[key]));
                    }
                }
                else {
                    // For Object
                    if (target[key].groupType === 'object') {
                        // Let FormGroup to handle value setting
                        target[key].setValue(value[key]);
                    }
                    else {
                        // Array
                        while (target[key].control.controls.length > 0) {
                            target[key].remove(0);
                        }
                        var i_1 = 0;
                        value[key].forEach(function (each) {
                            target[key].add();
                            var fixForPrimitiveArray = {};
                            fixForPrimitiveArray[key] = each;
                            target[key].children[i_1].setValue(target[key].arrayType !== 'object' ? fixForPrimitiveArray : each);
                            i_1++;
                        });
                    }
                }
            }
        };
        var this_1 = this;
        for (var key in value) {
            _loop_1();
        }
    };
    Ng2FormFactory.resolveTemplateConfigByType = function (attrMapping, templateObj) {
        if (attrMapping.type === 'boolean') {
            templateObj.renderType = attrMapping.expandOptions ? 'radio' : 'checkbox';
        }
        else if (attrMapping.options) {
            if (attrMapping.options.length > 2 && attrMapping.maxChoices) {
                templateObj.renderType = attrMapping.expandOptions ? (attrMapping.maxChoices == 1 ?
                    'radio' : 'checkbox') : 'select';
            }
            else {
                templateObj.renderType = attrMapping.expandOptions ? 'radio' : 'checkbox';
            }
        }
        else {
            templateObj.renderType = attrMapping.type;
            if (templateObj.type === 'string')
                templateObj.renderType = 'text';
        }
        Ng2FormFactory.setTemplatePreset(attrMapping, templateObj);
    };
    // Copy setting from OAT to templateConfig object
    Ng2FormFactory.setTemplatePreset = function (attrMapping, templateObj) {
        [
            'label',
            'type',
            'maxChoices',
            'expandOptions',
            'options',
            'option',
            'renderType',
            'optionsTemplate'
        ].forEach(function (each) {
            if (attrMapping.formFactory && attrMapping.formFactory[each]) {
                templateObj[each] = attrMapping[each];
            }
        });
    };
    return Ng2FormFactory;
}());
export { Ng2FormFactory };
//# sourceMappingURL=Ng2FormFactory.js.map