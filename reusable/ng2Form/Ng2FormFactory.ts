import {
    FormBuilder,
    FormGroup,
    FormControl,
    FormArray,
    Validators,
} from '@angular/forms';
import ObjectAttributeTypeExtractor from '../ObjectAttributeTypeExtractor';

export default class Ng2FormFactory {
    static generateFormGroupByObject(formBulider: FormBuilder, obj: {}, resolveTypeAny: () => {ngForm: any, template: any} = null, options: {} = {}) {
        return Ng2FormFactory.generateFormGroupByAttributeTypeObject(
            formBulider, new ObjectAttributeTypeExtractor(obj, options), resolveTypeAny
        );
    }

    static generateFormGroupByAttributeTypeObject(
        formBulider: FormBuilder,
        attrMappingObj: ObjectAttributeTypeExtractor,
        resolveTypeAny: (attrMapping, key: string) => {ngForm: any, template: any} = null,
        resolveTypeUndefined: (attrMapping, key: string) => {ngForm: any, template: any} = null
    ) {
        let form = {
                template: {},
                ngForm: {},
            },
            attrMapping = attrMappingObj instanceof ObjectAttributeTypeExtractor ? attrMappingObj.mapping : attrMappingObj;

        for (let key in attrMapping) {
            if (['id'].indexOf(key) === -1) {
                let titleCase = key.replace(/([A-Z]+)/g, " $1").replace(/_/g, ' ').capitalize();

                if (['object', 'array'].indexOf(attrMapping[key]._type) > -1) {
                    let type = attrMapping[key]._type,
                        arrayType = '_type' in attrMapping[key]._mapping ?
                            ('arrayType' in attrMapping[key] ? attrMapping[key].arrayType : 'primitive') : 'object',
                        init = () => {
                            let schemaTemp = null;

                            if ('_type' in attrMapping[key]._mapping) {
                                // For primitive type array
                                let control = new FormControl(
                                    '_value' in attrMapping[key]._mapping ? attrMapping[key]._mapping._value : '',
                                    [Validators.required]
                                ), template = {};

                                template[key] = {
                                    label: titleCase,
                                    type: attrMapping[key]._mapping._type,
                                    control,
                                };

                                schemaTemp = {
                                    ngForm: control,
                                    template
                                };

                                Ng2FormFactory.resolveTemplateConfigByType(
                                    attrMapping[key]._mapping, template[key]
                                );
                            } else {
                                // For reference type array or object
                                schemaTemp = Ng2FormFactory.generateFormGroupByAttributeTypeObject(formBulider, attrMapping[key].mapping);
                            }

                            schemaTemp.template.setValue = Ng2FormFactory.setValueToTemplate.bind(schemaTemp.template);

                            return {
                                ngForm: schemaTemp.ngForm instanceof FormControl || type === 'object' ?
                                    schemaTemp.ngForm :

                                    // For reference type array
                                    new FormGroup(schemaTemp.ngForm),
                                template: schemaTemp.template
                            };
                        };

                    if (type === 'array') {
                        form.ngForm[key] = new FormArray([]);

                        let children = [],
                            add = () => {
                                let {ngForm, template} = init();

                                const control = <FormArray>form.ngForm[key];
                                control.push(ngForm);
                                children.push(template);
                            }, remove = (i: number) => {
                                const control = <FormArray>form.ngForm[key];
                                control.removeAt(i);
                                children.splice(i, 1);
                            };

                        add();

                        form.template[key] = {
                            groupType: 'array',
                            arrayType,
                            label: titleCase,
                            add,
                            remove,
                            control: form.ngForm[key],
                            children
                        };

                        Ng2FormFactory.setTemplatePreset(attrMapping[key], form.template[key]);
                    } else {
                        let {ngForm, template} = init();

                        form.ngForm[key] = new FormGroup(ngForm);
                        form.template[key] = {
                            label: titleCase,
                            groupType: 'object',
                            control: form.ngForm[key],
                            children: template
                        };
                    }
                } else if (attrMapping[key]._type !== 'any') {
                    if (attrMapping[key] !== 'undefined' && typeof attrMapping[key]._type != 'undefined') {
                        let validator = attrMapping[key].validator ? attrMapping[key].validator : [],
                            valueNotEmpty = attrMapping[key]._value !== undefined;

                        if (valueNotEmpty) validator.push(Validators.required);

                        form.ngForm[key] = new FormControl(valueNotEmpty ? attrMapping[key]._value : '', validator);
                        form.template[key] = {
                            label: titleCase,
                            type: attrMapping[key]._type,
                            control: form.ngForm[key]
                        };
                    } else {
                        resolveTypeUndefined ?
                            Ng2FormFactory.handleResolvedResult(form, key, resolveTypeUndefined(attrMapping, key)) :
                            Ng2FormFactory.setupDefaultFormControl(form, key, titleCase);
                    }

                    Ng2FormFactory.resolveTemplateConfigByType(
                        attrMapping[key], form.template[key]
                    );
                } else {
                    resolveTypeAny ?
                        Ng2FormFactory.handleResolvedResult(form, key, resolveTypeAny(attrMapping, key)) :
                        Ng2FormFactory.setupDefaultFormControl(form, key, titleCase);

                    Ng2FormFactory.resolveTemplateConfigByType(
                        attrMapping[key], form.template[key]
                    );
                }

                form.template[key].setValue = Ng2FormFactory.setValueToTemplate.bind(form.template[key]);
            }
        }

        form.template.setValue = Ng2FormFactory.setValueToTemplate.bind(form.template);

        return form;
    }

    private static setupDefaultFormControl(form: {template: {}; ngForm: {}}, key, titleCase: any) {
        form.ngForm[key] = new FormControl('');
        form.template[key] = {
            label: titleCase,
            type: 'text',
            control: form.ngForm[key]
        };
    }

    private static handleResolvedResult(form: {template: {}; ngForm: {}}, key, resolved: {ngForm: any; template: any}) {
        form.ngForm[key] = resolved.ngForm;
        form.template[key] = resolved.template;
        form.template[key].control = form.ngForm[key];
    }

    static setValueToTemplate(value) {
        for (var key in value) {
            let target = this.groupType ? this.children : this;

            if (key in target) {
                if (target[key].type) {
                    if (typeof value[key] != 'object') {
                        target[key].control.setValue(
                            String(value[key])
                        );
                    }
                } else {
                    if (target[key].groupType === 'object') {
                        target[key].setValue(value[key]);
                    } else {
                        while (target[key].control.controls.length > 0) {
                            target[key].remove(0);
                        }

                        let i = 0;

                        value[key].forEach((each) => {
                            target[key].add();

                            let fixForPrimitiveArray = {};
                            fixForPrimitiveArray[key] = each;

                            target[key].children[i].setValue(
                                target[key].arrayType !== 'object' ? fixForPrimitiveArray : each
                            );

                            i++;
                        });
                    }
                }
            }
        }
    }

    static resolveTemplateConfigByType(attrMapping, templateObj) {
        if (attrMapping._type === 'boolean') {
            templateObj.renderType = attrMapping.expandOptions ? 'radio' : 'checkbox';
        } else if (attrMapping.options) {
            if (attrMapping.options.length > 2 && attrMapping.maxChoices) {
                templateObj.renderType = attrMapping.expandOptions ? (
                        attrMapping.maxChoices == 1 ?
                            'radio' : 'checkbox'
                    ) : 'select';
            } else {
                templateObj.renderType = attrMapping.expandOptions ? 'radio' : 'checkbox';
            }
        } else {
            templateObj.renderType = attrMapping._type;
            if (templateObj.renderType === 'string') templateObj.renderType = 'text';
        }

        Ng2FormFactory.setTemplatePreset(attrMapping, templateObj);
    }

    static setTemplatePreset(attrMapping, templateObj) {
        ['maxChoices', 'expandOptions', 'options', 'option', 'renderType', 'optionsTemplate'].forEach(function (each) {
            if (attrMapping[each]) {
                templateObj[each] = attrMapping[each];
            }
        });
    }
}