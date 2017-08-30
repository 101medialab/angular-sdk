export declare type RenderTypeCompatible = 'text' | 'email' | 'number' | 'hidden' | 'radio' | 'checkbox' | 'textarea' | 'select';
export interface IBaseFormConfig {
    label?: string;
    defaultValue?: any;
    hints?: string;
    validators?: any;
    useValidators?: Array<string>;
    renderType?: RenderTypeCompatible;
}
export declare const FormConfigSymbol: symbol;
export declare function FormConfig(options: IBaseFormConfig): {
    (target: Function): void;
    (target: Object, propertyKey: string | symbol): void;
};
