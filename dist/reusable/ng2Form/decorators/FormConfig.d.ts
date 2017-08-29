export declare type RenderTypeCompatible = 'text' | 'textarea' | 'select';
export interface IBaseFormConfig {
    label?: string;
    defaultValue?: any;
    hints?: string;
    validators?: any;
    useValidators?: Array<string>;
}
export declare const FormConfigSymbol: symbol;
export declare function FormConfig(options: IBaseFormConfig): {
    (target: Function): void;
    (target: Object, propertyKey: string | symbol): void;
};
