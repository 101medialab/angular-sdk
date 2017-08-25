import { FormBuilder } from '@angular/forms';
export declare class Ng2FormFactory {
    static generateFormGroupByObject(formBuilder: FormBuilder, object: any, resolveTypeAny?: () => {
        ngForm: any;
        template: any;
    }, options?: any): any;
    static generateFormGroupByAttributeTypeObject(formBuilder: FormBuilder, attributeMappingObject: any, resolveTypeAny?: (attrMapping, key: string) => {
        ngForm: any;
        template: any;
    }, resolveTypeUndefined?: (attrMapping, key: string) => {
        ngForm: any;
        template: any;
    }): any;
    private static setupDefaultFormControl(form, key, titleCase);
    private static handleResolvedResult(form, key, resolved);
    static setValueToTemplate(value: any): void;
    static resolveTemplateConfigByType(attrMapping: any, templateObj: any): void;
    static setTemplatePreset(attrMapping: any, templateObj: any): void;
}
