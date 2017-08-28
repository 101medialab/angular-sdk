export type RenderTypeCompatible = 'text' | 'textarea' | 'select';

export interface IBaseFormConfig {
    label?: string;
    defaultValue?: any;
    hints?: string;
    validators: any;
    useValidators?: Array<string>
}

export const FormConfigSymbol = Symbol('FormConfig');

export function FormConfig(options: IBaseFormConfig) {
    return Reflect.metadata(FormConfigSymbol, options);
}
