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
                        // For primitive type array
                        let control = new FormControl(
                            '_value' in attrMapping[key]._mapping ? attrMapping[key]._mapping._value : '',
                            [Validators.required]
                        ), template = {};

                        template[key] = {
                            label: titleCase,
                            type: attrMapping[key]._mapping._type,
                            control
                        };

                        schemaTemp = {
                            ngForm: control,
                            template
                        }
                    } else {
                        // For reference type array
                        schemaTemp = Ng2FormFactory.generateFormGroupByAttributeTypeObject(formBulider, attrMapping[key].mapping);
                    }

                    let init = () => {
                        return schemaTemp.ngForm;
                    };

                    if (type === 'array') {
                        form.ngForm[key] = new FormArray([init()]);

                        let add = () => {
                            const control = <FormArray>form.ngForm.controls[key];
                            control.push(init());
                        }, remove = (i: number) => {
                            const control = <FormArray>form.ngForm.controls[key];
                            control.removeAt(i);
                        };

                        form.template[key] = {
                            groupType: 'array',
                            label: titleCase,
                            add,
                            remove,
                            children: schemaTemp.template
                        }
                    } else {
                        form.ngForm[key] = new FormGroup(init());
                        form.template[key] = {
                            label: titleCase,
                            groupType: 'object',
                            children: schemaTemp.template,
                            control: form.ngForm[key]
                        };
                    }
                } else if (attrMapping[key]._type !== 'any') {
                    if (attrMapping[key] !== 'undefined' && attrMapping[key]._type != 'undefined') {
                        form.ngForm[key] = attrMapping[key]._value === undefined ?
                            new FormControl('') : new FormControl(attrMapping[key]._value, [Validators.required]);

                        // attrMapping[key]._type.capitalize() + '(\'' + titleCase + '\')');
                        form.template[key] = {
                            label: titleCase,
                            type: Ng2FormFactory.resolveDefaultTemplateConfigByType(attrMapping[key]._type),
                            control: form.ngForm[key]
                        };
                    } else {
                        if (resolveTypeUndefined) {
                            let resolved = resolveTypeUndefined(attrMapping, key);
                            form.ngForm[key] = resolved.ngForm;
                            form.template[key] = resolved.template;
                            form.template[key].control = form.ngForm[key];
                        } else {
                            form.ngForm[key] = new FormControl('');
                            form.template[key] = {
                                label: titleCase,
                                type: 'text',
                                control: form.ngForm[key]
                            };
                        }
                    }
                } else {
                    if (resolveTypeAny) {
                        let resolved = resolveTypeAny(key);
                        form.ngForm[key] = resolved.ngForm;
                        form.template[key] = resolved.template;
                        form.template[key].control = form.ngForm[key];
                    } else {
                        form.ngForm[key] = new FormControl('');
                        form.template[key] = {
                            label: titleCase,
                            type: 'text',
                            control: form.ngForm[key]
                        };
                    }
                }
            }
        }

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