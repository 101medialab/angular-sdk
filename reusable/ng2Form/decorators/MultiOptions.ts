import { IBaseFormConfig, RenderTypeCompatible } from './FormConfig';

export interface IMultipleOptionsFormConfig extends IBaseFormConfig {
    maxChoices: number;
    expandOptions: boolean;
    options: Array<any>;
    option: string;
    renderType: RenderTypeCompatible;
    optionsTemplate: string;
}

export const MultiOptionsSymbol = Symbol('IMultipleOptionsFormConfig');

export function MultiOptions(options: IBaseFormConfig) {
    return Reflect.metadata(
        MultiOptionsSymbol, 
        Object.assign(
            <IMultipleOptionsFormConfig>{
            expandOptions: true
        }, options)
    );
}