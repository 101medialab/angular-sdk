import { IBaseFormConfig, RenderTypeCompatible } from './FormConfig';
export interface IMultipleOptionsFormConfig extends IBaseFormConfig {
    maxChoices: number;
    expandOptions: boolean;
    options: Array<any>;
    option: string;
    renderType: RenderTypeCompatible;
    optionsTemplate: string;
}
export declare const MultiOptionsSymbol: symbol;
export declare function MultiOptions(options: IBaseFormConfig): {
    (target: Function): void;
    (target: Object, propertyKey: string | symbol): void;
};
