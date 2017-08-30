import {
    FormBuilder,
    FormGroup,
    FormControl,
    FormArray,
    Validators,
} from '@angular/forms';
import {
    NonPrimitiveTypeMeta,
    ObjectAttributeTypeExtractor as Extractor
} from '../ObjectAttributeTypeExtractor';

export * from './NgFormFactoryAnnotations';
export class Ng2FormFactory {
    static generateFormGroupByObject(
        formBuilder: FormBuilder,
        object: any,
        resolveTypeAny: () => {
            ngFormControl: any,
            templateConfig: any
        } = null,
        options: any = {}
    ) {
        return Ng2FormFactory.generateFormGroupByOATMapping(
            formBuilder, Extractor.generateMapping(object, options), resolveTypeAny
        );
    }

    static generateLabel(key) {
        return key.replace(/([A-Z]+)/g, " $1").replace(/_/g, ' ').capitalize();
    }

    static generateFormGroupByOATMapping(
        formBuilder: FormBuilder,
        attributeMappingObject: any, // Yet all attributes inside should be typeof ExtractorResultType
        resolveTypeAny: (attrMapping, key: string) => { ngFormControl: any, templateConfig: any } = null,
        resolveTypeUndefined: (attrMapping, key: string) => { ngFormControl: any, templateConfig: any } = null
    ) {
        let result: any = {
            ngFormControl: {},
            templateConfig: {},
        };
        let attrMapping = attributeMappingObject instanceof NonPrimitiveTypeMeta ?
                attributeMappingObject.mapping : attributeMappingObject;

        for (let key in attrMapping) {
            // TODO: Skip attributes should be configurable
            if (['id'].indexOf(key) > -1) continue;

            let resolved = null;
            let currentTemplateConfig = null;
            let current = attrMapping[key];

            // Object or Array
            if (['object', 'array'].indexOf(current._type) > -1) {
                if (current._type === 'array') {
                    resolved = Ng2FormFactory.handleArray(current, key, formBuilder);
                } else {
                    // Handle Object
                    let child = Ng2FormFactory.prepareAndCreateChildTemplateConfig(current, key, formBuilder)();

                    resolved = {
                        groupType: 'object',
                        control: child.ngFormControl instanceof FormGroup ? child.ngFormControl : new FormGroup(child.ngFormControl),
                        children: child.templateConfig
                    };
                }
            }
            // Primitive type and date
            else if (current._type !== 'any') {
                if (current !== 'undefined' && typeof current._type != 'undefined') {
                    let validator = current.validator ? current.validator : [],
                        valueNotEmpty = current._value !== undefined;

                    if (valueNotEmpty) validator.push(Validators.required);

                    currentTemplateConfig = {
                        type: current._type,
                        control: new FormControl(valueNotEmpty ? current._value : '', validator)
                    };
                } else {
                    resolved = resolveTypeUndefined ? resolveTypeUndefined(current, key) : null; // Resolve as null first
                }
            }
            // Last case: Null value => any
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
            Ng2FormFactory.resolveTemplateConfigByType(
                current, currentTemplateConfig
            );

            result.ngFormControl[key] = currentTemplateConfig.control;
            result.templateConfig[key] = currentTemplateConfig;
        }

        result.templateConfig.setValue = Ng2FormFactory.setValueToTemplate.bind(result.templateConfig);

        return result;
    }

    private static prepareAndCreateChildTemplateConfig(currentInput: any, key: string, formBuilder: FormBuilder, isRaw:boolean = false) {
        return () => {
            let current = null;

            if (isRaw) {
                current = new NonPrimitiveTypeMeta(
                    'array',
                    Extractor.generateMapping(
                        new currentInput()
                    )
                );
            } else {
                current = currentInput;
            }

            let schemaTemp = null;

            if ('type' in current._mapping && typeof current._mapping.type === 'string') {
                // For primitive type array
                let control = new FormControl(
                    'value' in current._mapping ? current._mapping.value : '',
                    [Validators.required]
                ), templateConfig = {};

                templateConfig[key] = {
                    label: Ng2FormFactory.generateLabel(key),
                    type: current._mapping.type,
                    control,
                };

                schemaTemp = {
                    ngFormControl: control,
                    templateConfig
                };

                Ng2FormFactory.resolveTemplateConfigByType(
                    current._mapping, templateConfig[key]
                );
            } else {
                // For reference type array or object
                schemaTemp = Ng2FormFactory.generateFormGroupByOATMapping(formBuilder, current._mapping);
            }

            schemaTemp.templateConfig.setValue = Ng2FormFactory.setValueToTemplate.bind(schemaTemp.templateConfig);

            return {
                ngFormControl:
                    schemaTemp.ngFormControl instanceof FormControl || current.type === 'object' ?
                        schemaTemp.ngFormControl :
                        // For reference type array
                        new FormGroup(schemaTemp.ngFormControl),
                templateConfig: schemaTemp.templateConfig
            };
        };
    }

    private static handleArray(current: any, key: string, formBuilder: FormBuilder) {
        let ngFormArrayControl = new FormArray([]);
        let initChildren = [];
        let arrayType = null;

        let result = {
            groupType: 'array',
            arrayType:
                current.formFactory && current.formFactory.arrayType ?
                    arrayType :
                    'type' in current._mapping ?
                        'primitive' : 'object'
            ,
            control: ngFormArrayControl,
            children: [],
            childrenConfigName:[],
            useConfig: 0,
            add: null,
            remove: null
        };

        if (current.formFactory && current.formFactory.objectDefinitions) {
            let i = 0;
            current.formFactory.objectDefinitions.forEach((each) => {
                initChildren[i] = Ng2FormFactory.prepareAndCreateChildTemplateConfig({
                    _mapping: each.structure
                }, '', formBuilder);
                result.childrenConfigName[i] = each.label;
                i += 1;
            });
        } else {
            initChildren[0] = Ng2FormFactory.prepareAndCreateChildTemplateConfig(current, key, formBuilder)
        }

        let add = () => {
                let childConfig = initChildren[result.useConfig]();

                const control = <FormArray>ngFormArrayControl;
                control.push(childConfig.ngFormControl);
                result.children.push(childConfig.templateConfig);
            },
            remove = (i: number) => {
                const control = <FormArray>ngFormArrayControl;
                control.removeAt(i);
                result.children.splice(i, 1);
            };

        result.add = add;
        result.remove = remove;

        Ng2FormFactory.setTemplatePreset(current, result);

        return result;
    }

    static setValueToTemplate(value) {
        for (var key in value) {
            let target = (this as any).groupType ? (this as any).children : this;

            if (key in target) {
                if (target[key].type) {
                    if (typeof value[key] != 'object') {
                        target[key].control.setValue(
                            String(value[key])
                        );
                    }
                } else {
                    // For Object
                    if (target[key].groupType === 'object') {
                        // Let FormGroup to handle value setting
                        target[key].setValue(value[key]);
                    } else {
                        // Array
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
        if (attrMapping.type === 'boolean') {
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
            templateObj.renderType = attrMapping.type;
            if (templateObj.type === 'string') templateObj.renderType = 'text';
        }

        Ng2FormFactory.setTemplatePreset(attrMapping, templateObj);
    }

    // Copy setting from OAT to templateConfig object
    static setTemplatePreset(attrMapping, templateObj) {
        [
            'label',
            'type',
            'maxChoices',
            'expandOptions',
            'options',
            'option',
            'renderType',
            'optionsTemplate',
            'arrayType'
        ].forEach(function (each) {
            if (attrMapping.formFactory && each in attrMapping.formFactory) {
                templateObj[each] = attrMapping.formFactory[each];
            }
        });
    }
}