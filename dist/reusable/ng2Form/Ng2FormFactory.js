import { FormGroup, FormControl, FormArray, Validators, } from '@angular/forms';
import { ObjectAttributeTypeExtractor } from '../ObjectAttributeTypeExtractor';
var Ng2FormFactory = (function () {
    function Ng2FormFactory() {
    }
    Ng2FormFactory.generateFormGroupByObject = function (formBulider, obj, resolveTypeAny, options) {
        if (resolveTypeAny === void 0) { resolveTypeAny = null; }
        if (options === void 0) { options = {}; }
        return Ng2FormFactory.generateFormGroupByAttributeTypeObject(formBulider, new ObjectAttributeTypeExtractor(obj, options), resolveTypeAny);
    };
    Ng2FormFactory.generateFormGroupByAttributeTypeObject = function (formBulider, attrMappingObj, resolveTypeAny, resolveTypeUndefined) {
        if (resolveTypeAny === void 0) { resolveTypeAny = null; }
        if (resolveTypeUndefined === void 0) { resolveTypeUndefined = null; }
        var form = {
            template: {},
            ngForm: {},
        }, attrMapping = attrMappingObj instanceof ObjectAttributeTypeExtractor ? attrMappingObj.mapping : attrMappingObj;
        var _loop_1 = function (key) {
            if (['id'].indexOf(key) === -1) {
                var titleCase_1 = key.replace(/([A-Z]+)/g, " $1").replace(/_/g, ' ').capitalize();
                if (['object', 'array'].indexOf(attrMapping[key]._type) > -1) {
                    var type_1 = attrMapping[key]._type, arrayType = '_type' in attrMapping[key]._mapping ?
                        ('arrayType' in attrMapping[key] ? attrMapping[key].arrayType : 'primitive') : 'object', init_1 = function () {
                        var schemaTemp = null;
                        if ('_type' in attrMapping[key]._mapping) {
                            // For primitive type array
                            var control = new FormControl('_value' in attrMapping[key]._mapping ? attrMapping[key]._mapping._value : '', [Validators.required]), template = {};
                            template[key] = {
                                label: titleCase_1,
                                type: attrMapping[key]._mapping._type,
                                control: control,
                            };
                            schemaTemp = {
                                ngForm: control,
                                template: template
                            };
                            Ng2FormFactory.resolveTemplateConfigByType(attrMapping[key]._mapping, template[key]);
                        }
                        else {
                            // For reference type array or object
                            schemaTemp = Ng2FormFactory.generateFormGroupByAttributeTypeObject(formBulider, attrMapping[key].mapping);
                        }
                        schemaTemp.template.setValue = Ng2FormFactory.setValueToTemplate.bind(schemaTemp.template);
                        return {
                            ngForm: schemaTemp.ngForm instanceof FormControl || type_1 === 'object' ?
                                schemaTemp.ngForm :
                                // For reference type array
                                new FormGroup(schemaTemp.ngForm),
                            template: schemaTemp.template
                        };
                    };
                    if (type_1 === 'array') {
                        form.ngForm[key] = new FormArray([]);
                        var children_1 = [], add = function () {
                            var _a = init_1(), ngForm = _a.ngForm, template = _a.template;
                            var control = form.ngForm[key];
                            control.push(ngForm);
                            children_1.push(template);
                        }, remove = function (i) {
                            var control = form.ngForm[key];
                            control.removeAt(i);
                            children_1.splice(i, 1);
                        };
                        add();
                        form.template[key] = {
                            groupType: 'array',
                            arrayType: arrayType,
                            label: titleCase_1,
                            add: add,
                            remove: remove,
                            control: form.ngForm[key],
                            children: children_1
                        };
                        Ng2FormFactory.setTemplatePreset(attrMapping[key], form.template[key]);
                    }
                    else {
                        var _a = init_1(), ngForm = _a.ngForm, template = _a.template;
                        form.ngForm[key] = new FormGroup(ngForm);
                        form.template[key] = {
                            label: titleCase_1,
                            groupType: 'object',
                            control: form.ngForm[key],
                            children: template
                        };
                    }
                }
                else if (attrMapping[key]._type !== 'any') {
                    if (attrMapping[key] !== 'undefined' && typeof attrMapping[key]._type != 'undefined') {
                        var validator = attrMapping[key].validator ? attrMapping[key].validator : [], valueNotEmpty = attrMapping[key]._value !== undefined;
                        if (valueNotEmpty)
                            validator.push(Validators.required);
                        form.ngForm[key] = new FormControl(valueNotEmpty ? attrMapping[key]._value : '', validator);
                        form.template[key] = {
                            label: titleCase_1,
                            type: attrMapping[key]._type,
                            control: form.ngForm[key]
                        };
                    }
                    else {
                        resolveTypeUndefined ?
                            Ng2FormFactory.handleResolvedResult(form, key, resolveTypeUndefined(attrMapping, key)) :
                            Ng2FormFactory.setupDefaultFormControl(form, key, titleCase_1);
                    }
                    Ng2FormFactory.resolveTemplateConfigByType(attrMapping[key], form.template[key]);
                }
                else {
                    resolveTypeAny ?
                        Ng2FormFactory.handleResolvedResult(form, key, resolveTypeAny(attrMapping, key)) :
                        Ng2FormFactory.setupDefaultFormControl(form, key, titleCase_1);
                    Ng2FormFactory.resolveTemplateConfigByType(attrMapping[key], form.template[key]);
                }
                form.template[key].setValue = Ng2FormFactory.setValueToTemplate.bind(form.template[key]);
            }
        };
        for (var key in attrMapping) {
            _loop_1(key);
        }
        form.template.setValue = Ng2FormFactory.setValueToTemplate.bind(form.template);
        return form;
    };
    Ng2FormFactory.setupDefaultFormControl = function (form, key, titleCase) {
        form.ngForm[key] = new FormControl('');
        form.template[key] = {
            label: titleCase,
            type: 'text',
            control: form.ngForm[key]
        };
    };
    Ng2FormFactory.handleResolvedResult = function (form, key, resolved) {
        form.ngForm[key] = resolved.ngForm;
        form.template[key] = resolved.template;
        form.template[key].control = form.ngForm[key];
    };
    Ng2FormFactory.setValueToTemplate = function (value) {
        var _loop_2 = function () {
            var target = this_1.groupType ? this_1.children : this_1;
            if (key in target) {
                if (target[key].type) {
                    if (typeof value[key] != 'object') {
                        target[key].control.setValue(String(value[key]));
                    }
                }
                else {
                    if (target[key].groupType === 'object') {
                        target[key].setValue(value[key]);
                    }
                    else {
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
            _loop_2();
        }
    };
    Ng2FormFactory.resolveTemplateConfigByType = function (attrMapping, templateObj) {
        if (attrMapping._type === 'boolean') {
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
            templateObj.renderType = attrMapping._type;
            if (templateObj.renderType === 'string')
                templateObj.renderType = 'text';
        }
        Ng2FormFactory.setTemplatePreset(attrMapping, templateObj);
    };
    Ng2FormFactory.setTemplatePreset = function (attrMapping, templateObj) {
        ['maxChoices', 'expandOptions', 'options', 'option', 'renderType', 'optionsTemplate'].forEach(function (each) {
            if (attrMapping[each]) {
                templateObj[each] = attrMapping[each];
            }
        });
    };
    return Ng2FormFactory;
}());
export { Ng2FormFactory };
//# sourceMappingURL=Ng2FormFactory.js.map