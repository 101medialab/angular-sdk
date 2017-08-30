import { IBaseFormConfig, RenderTypeCompatible } from './FormConfig';

export interface IMultipleOptionsFormConfig extends IBaseFormConfig {
    maxChoices: number;
    expandOptions: boolean;
    options: Array<{
        name: string,
        value: any
    }>;
    option: string;
    renderType: RenderTypeCompatible;
    optionsTemplate: string;
}

export const MultiOptionsSymbol = Symbol('IMultipleOptionsFormConfig');

export function MultiOptions(options: IMultipleOptionsFormConfig) {
    return Reflect.metadata(
        MultiOptionsSymbol,
        Object.assign(
            <IMultipleOptionsFormConfig>{
                expandOptions: true
            }, options
        )
    );
}