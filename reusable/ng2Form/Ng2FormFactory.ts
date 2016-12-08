import {
    FormBuilder,
    FormGroup,
    FormControl,
    FormArray,
    Validators,
} from '@angular/forms';
import ObjectAttributeTypeExtractor from '../ObjectAttributeTypeExtractor';

export default class Ng2FormFactory {
    private _form: FormGroup = null;

    static generateFormGroupByObject(formBulider: FormBuilder, obj: {}, resolveTypeAny: () => {ngForm: any, template: any} = null, options: {} = {}) {
        return Ng2FormFactory.generateFormGroupByAttributeTypeObject(
            formBulider, new ObjectAttributeTypeExtractor(obj, options), resolveTypeAny
        );
    }

    static generateFormGroupByAttributeTypeObject(
        formBulider: FormBuilder,
        attrMappingObj: ObjectAttributeTypeExtractor,
        resolveTypeAny: (key: string) => {ngForm: any, template: any} = null,
        resolveTypeUndefined: (attrMapping, key) => {ngForm: any, template: any} = null
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
                        schemaTemp;
                    
                    if ('_type' in attrMapping[key]._mapping) {
                        console.log(attrMapping[key]._mapping);

                        // For primitive type array
                        schemaTemp = {
                            type: attrMapping[key]._mapping._type,
                        };

                        if ('_value' in attrMapping[key]._mapping) {
                            schemaTemp['default'] = attrMapping[key]._mapping._value;
                        }

                        schemaTemp = {
                            ngForm: new FormControl('', [Validators.required]),
                            template: {

                            }
                        }
                    } else {
                        console.log(attrMapping[key].mapping);

                        // For reference type array
                        schemaTemp = Ng2FormFactory.generateFormGroupByAttributeTypeObject(formBulider, attrMapping[key].mapping);
                    }

                    let init = () => {
                        return formBulider.group(schemaTemp);
                    };

                    if (type === 'array') {
                        console.log('array');
                        console.log(schemaTemp);

                        form.ngForm[key] = new FormArray(schemaTemp.ngForm);

                        let add = () => {
                            const control = <FormArray>form.ngForm[key].controls[key];
                            control.push(init());
                        }, remove = (i: number) => {
                            const control = <FormArray>form.ngForm[key].controls[key];
                            control.removeAt(i);
                        };

                        form.template[key] = {
                            groupType: 'array',
                            add,
                            remove
                        }
                    } else {
                        // schemaTemp.title = titleCase;
                        form.ngForm[key] = init();
                        // form.template[key] = {
                        //     groupType: 'group'
                        // };
                    }
                } else if (attrMapping[key]._type !== 'any') {
                    if (attrMapping[key] !== 'undefined' && attrMapping[key]._type != 'undefined') {
                        form.ngForm[key] = attrMapping[key]._value === undefined ? [
                                ''
                            ] : [
                                attrMapping[key]._value, [Validators.required]
                            ]
                        ;

                        // attrMapping[key]._type.capitalize() + '(\'' + titleCase + '\')');
                        form.template[key] = {
                            label: titleCase,
                            type: Ng2FormFactory.resolveDefaultTemplateConfigByType(attrMapping[key]._type)
                        };
                    } else {
                        if (resolveTypeUndefined) {
                            let resolved = resolveTypeUndefined(attrMapping, key);
                            form.ngForm[key] = resolved.ngForm;
                            form.template[key] = resolved.template;
                        } else {
                            form.ngForm[key] = new FormControl(['']);
                            form.template[key] = {
                                label: titleCase,
                                type: 'text',
                            };
                        }
                    }
                } else {
                    if (resolveTypeAny) {
                        let resolved = resolveTypeAny(key);
                        form.ngForm[key] = resolved.ngForm;
                        form.template[key] = resolved.template;
                    } else {
                        form.ngForm[key] = [''];
                        form.template[key] = {
                            label: titleCase,
                            type: 'text'
                        };
                    }
                }
            }
        }

        form.ngForm = formBulider.group(form.ngForm);

        return form;
    }

    static resolveDefaultTemplateConfigByType(type) {
        let result = null;

        switch (type) {
            default:
                result = 'text';
        }

        return result;
    }
}