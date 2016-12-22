import { FormBuilder } from '@angular/forms';
import { ObjectAttributeTypeExtractor } from '../ObjectAttributeTypeExtractor';
export declare class Ng2FormFactory {
    static generateFormGroupByObject(formBulider: FormBuilder, obj: any, resolveTypeAny?: () => {
        ngForm: any;
        template: any;
    }, options?: any): any;
    static generateFormGroupByAttributeTypeObject(formBulider: FormBuilder, attrMappingObj: ObjectAttributeTypeExtractor | {
        each: any;
    }, resolveTypeAny?: (attrMapping, key: string) => {
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
