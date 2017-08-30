export type RenderTypeCompatible = 'text' | 'email' | 'number' | 'hidden' | 'radio' | 'checkbox' | 'textarea' | 'select';

export interface IBaseFormConfig {
    label?: string;
    defaultValue?: any;
    hints?: string;
    validators?: any;
    useValidators?: Array<string>;
    renderType?: RenderTypeCompatible;
    hide?: boolean;
}

export const FormConfigSymbol = Symbol('FormConfig');

export function FormConfig(options: IBaseFormConfig) {
    return Reflect.metadata(FormConfigSymbol, options);
}
